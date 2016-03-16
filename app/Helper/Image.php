<?php

namespace App\Helper;

use File;
use Config;
use App\Exceptions\GeneralException;
use Intervention\Image\Facades\Image as Images;
use App\Repositories\Backend\User\UserContract;

class Image extends Images
{
    protected $width;
    protected $height;
    protected $quality = 90;

    protected $keepAspectRatio  = true;
    protected $keepFrame        = true;
    protected $keepTransparency = true;
    protected $constrainOnly    = false;
    protected $backgroundColor  = array(255, 255, 255);

    protected $baseFile;
    protected $isBaseFilePlaceholder;
    protected $newFile;
    protected $processor;
    protected $destinationSubdir;
    protected $angle;

    protected $watermarkFile;
    protected $watermarkPosition;
    protected $watermarkWidth;
    protected $watermarkHeigth;
    protected $watermarkImageOpacity = 70;

    public function setWidth($width)
    {
        $this->width = $width;
        return $this;
    }

    public function getWidth()
    {
        return $this->width;
    }

    public function setHeight($height)
    {
        $this->height = $height;
        return $this;
    }

    public function getHeight()
    {
        return $this->height;
    }

    /**
     * 设置图片质量 从0到100
     */

    public function setQuality($quality)
    {
        $this->quality = $quality;
        return $this;
    }

    /**
     * 得到图片质量
     *
     * @return int
     */
    public function getQuality()
    {
        return $this->quality;
    }
    /**
     * 保持长宽比
     */
    public function setKeepAspectRatio($keep)
    {
        $this->keepAspectRatio = (bool)$keep;
        return $this;
    }

    /**
     *
     * @param $keep
     * @return $this
     */
    public function setKeepFrame($keep)
    {
        $this->keepFrame = (bool)$keep;
        return $this;
    }

    /**
     * 设置透明度
     * @param $keep
     * @return $this
     */
    public function setKeepTransparency($keep)
    {
        $this->keepTransparency = (bool)$keep;
        return $this;
    }

    public function setConstrainOnly($flag)
    {
        $this->constrainOnly = (bool)$flag;
        return $this;
    }

    /**
     * 设置默认背景色
     * @param array $rgbArray
     * @return $this
     */
    public function setBackgroundColor(array $rgbArray)
    {
        $this->backgroundColor = $rgbArray;
        return $this;
    }

    /**
     * 设置图片高宽
     * @param $size
     * @return $this
     */
    public function setSize($size)
    {
        // determine width and height from string
        list($width, $height) = explode('x', strtolower($size), 2);
        foreach (array('width', 'height') as $wh) {
            $$wh  = (int)$$wh;
            if (empty($$wh))
                $$wh = null;
        }

        // set sizes
        $this->setWidth($width)->setHeight($height);

        return $this;
    }

    protected function checkDirectory($path)
    {
        if (File::isDirectory($path) && File::isWritable($path))
        {
            return true;
        }
        else
        {
            try
            {
                @File::makeDirectory($path, 0777, true);
                return true;
            }
            catch (\Exception $e)
            {
                throw new GeneralException('Image upload found'. $e->getMessage());
            }
        }
    }

    protected function checkMemory($file = null)
    {
        return $this->getMemoryLimit() > ($this->getMemoryUsage() + $this->getNeedMemoryForFile($file)) || $this->getMemoryLimit() == -1;
    }

    protected function getMemoryLimit()
    {
        $memoryLimit = trim(strtoupper(ini_get('memory_limit')));
        if (!isSet($memoryLimit[0])){
            $memoryLimit = "128M";
        }

        if (substr($memoryLimit, -1) == 'K') {
            return substr($memoryLimit, 0, -1) * 1024;
        }
        if (substr($memoryLimit, -1) == 'M') {
            return substr($memoryLimit, 0, -1) * 1024 * 1024;
        }
        if (substr($memoryLimit, -1) == 'G') {
            return substr($memoryLimit, 0, -1) * 1024 * 1024 * 1024;
        }

        return $memoryLimit;
    }

    protected function getMemoryUsage()
    {
        if (function_exists('memory_get_usage')) {
            return memory_get_usage();
        }
        return 0;
    }

    protected function getNeedMemoryForFile($file = null)
    {
        $file = is_null($file) ? $this->getBaseFile() : $file;
        if (!$file) {
            return 0;
        }

        if (!file_exists($file) || !is_file($file)) {
            return 0;
        }

        $imageInfo = getimagesize($file);

        if (!isset($imageInfo[0]) || !isset($imageInfo[1])) {
            return 0;
        }
        if (!isset($imageInfo['channels'])) {
            // if there is no info about this parameter lets set it for maximum
            $imageInfo['channels'] = 4;
        }
        if (!isset($imageInfo['bits'])) {
            // if there is no info about this parameter lets set it for maximum
            $imageInfo['bits'] = 8;
        }
        return round(($imageInfo[0] * $imageInfo[1] * $imageInfo['bits'] * $imageInfo['channels'] / 8 + Pow(2, 16)) * 1.65);
    }

    /**
     * Convert array of 3 items (decimal r, g, b) to string of their hex values
     *
     * @param array $rgbArray
     * @return string
     */
    protected function rgbToString($rgbArray)
    {
        $result = array();
        foreach ($rgbArray as $value) {
            if (null === $value) {
                $result[] = 'null';
            }
            else {
                $result[] = sprintf('%02s', dechex($value));
            }
        }
        return implode($result);
    }

    public function setImageProcessor($processor)
    {
        $this->processor = $processor;
        return $this;
    }

    /**
     * @return Varien_Image
     */
    public function getImageProcessor()
    {
        if( !$this->processor ) {
            $this->processor = Image::make($this->getBaseFile());
        }
        $this->processor->keepAspectRatio($this->keepAspectRatio);
        $this->processor->keepFrame($this->keepFrame);
        $this->processor->keepTransparency($this->keepTransparency);
        $this->processor->constrainOnly($this->constrainOnly);
        $this->processor->backgroundColor($this->backgroundColor);
        $this->processor->quality($this->quality);
        return $this->processor;
    }

    public function setBaseFile($file)
    {
        if ($file) {
            if(0 !== strpos($file, DS, 0)) {
                $file = DS . $file;
            }
            if ((!file_exists($this->inDir . $file)) || !$this->checkMemory($this->inDir . $file)) {
                $file = null;
            }
            $baseFile = public_path($this->inDir . $file);
        }else{
            $file = DS .$this->getDestinationSubdir().'.jpg';
            $baseFile = public_path($this->placeholderDir.$file);
        }

        if ((!$file) || (!file_exists($baseFile))) {
            throw new GeneralException('Image not found');
        }

        $this->baseFile = $baseFile;
        $this->imageFile = $file;

        return $this;
    }

    public function getBaseFile()
    {
        return $this->baseFile;
    }

    public function setNewFile($filePath)
    {
        $this->newFile = $filePath;
        return $this;
    }

    public function getNewFile()
    {
        return $this->newFile;
    }

    public function setImageFile($file)
    {
        $this->imageFile = $file;
        return $this;
    }

    public function getImageFile()
    {
        return $this->imageFile;
    }

    public function crop($width=0, $height=0, $top=0, $right=0){
        $this->checkDirectory(dirname($this->newFile));
        Image::make($this->baseFile)
            ->crop((int)$width, (int)$height, (int)$top,(int)$right)
            ->save($this->newFile,$this->quality);
        return $this;
    }

    public function resize($width, $height=null)
    {
        $this->width = $width;
        $this->height = $height;
        $this->checkDirectory(dirname($this->newFile));
        Image::make($this->baseFile)
            ->resize($this->width, $this->height)
            ->save($this->newFile,$this->quality);
        return $this;
    }

    public function rotate($angle)
    {
        $angle = intval($angle);
        Image::make($this->baseFile)
            ->rotate($angle)
            ->save($this->newFile,$this->quality);
        return $this;
    }

    /**
     * Add watermark to image
     * size param in format 100x200
     *
     * @param string $file
     * @param string $position
     * @param string $size
     * @param int $width
     * @param int $heigth
     * @param int $imageOpacity
     */
    public function setWatermark($file, $position=null, $size=null, $width=null, $heigth=null, $imageOpacity=null)
    {
        if ($this->isBaseFilePlaceholder)
        {
            return $this;
        }

        if ($file) {
            $this->setWatermarkFile($file);
        } else {
            return $this;
        }

        if ($position)
            $this->setWatermarkPosition($position);
        if ($size)
            $this->setWatermarkSize($size);
        if ($width)
            $this->setWatermarkWidth($width);
        if ($heigth)
            $this->setWatermarkHeigth($heigth);
        if ($imageOpacity)
            $this->setImageOpacity($imageOpacity);

        $filePath = $this->getWatermarkFilePath();

        if($filePath) {
            $this->getImageProcessor()
                ->setWatermarkPosition( $this->getWatermarkPosition() )
                ->setWatermarkImageOpacity( $this->getWatermarkImageOpacity() )
                ->setWatermarkWidth( $this->getWatermarkWidth() )
                ->setWatermarkHeigth( $this->getWatermarkHeigth() )
                ->watermark($filePath);
        }

        return $this;
    }

    public function saveFile()
    {
        $baseFile = $this->getBaseFile();
        $newFile = $this->getNewFile();
        Image::make($baseFile)
            ->save($newFile);
        return $this;
    }

    /**
     * @return string
     */
    public function getUrl()
    {
        $baseDir = public_path();
        $path = str_replace($baseDir . DS, "", $this->newFile);
        return asset(str_replace(DS, DS, $path));
    }

    public function push()
    {
        $this->getImageProcessor()->display();
    }

    public function setDestinationSubdir($dir)
    {
        $this->destinationSubdir = $dir;
        return $this;
    }

    /**
     * @return string
     */
    public function getDestinationSubdir()
    {
        return $this->destinationSubdir;
    }

    public function isCached()
    {
        return file_exists($this->newFile);
    }

    /**
     * Set watermark file name
     *
     * @param string $file
     */
    public function setWatermarkFile($file)
    {
        $this->watermarkFile = $file;
        return $this;
    }

    /**
     * Get watermark file name
     *
     * @return string
     */
    public function getWatermarkFile()
    {
        return $this->watermarkFile;
    }

    /**
     * Get relative watermark file path
     * or false if file not found
     *
     * @return string | bool
     */
    protected function _getWatermarkFilePath()
    {
        $filePath = false;

        if (!$file = $this->getWatermarkFile())
        {
            return $filePath;
        }

        $baseDir = Mage::getSingleton('catalog/product_media_config')->getBaseMediaPath();

        if( $this->fileExists($baseDir . '/watermark/stores/' . Mage::app()->getStore()->getId() . $file) ) {
            $filePath = $baseDir . '/watermark/stores/' . Mage::app()->getStore()->getId() . $file;
        } elseif ( $this->fileExists($baseDir . '/watermark/websites/' . Mage::app()->getWebsite()->getId() . $file) ) {
            $filePath = $baseDir . '/watermark/websites/' . Mage::app()->getWebsite()->getId() . $file;
        } elseif ( $this->fileExists($baseDir . '/watermark/default/' . $file) ) {
            $filePath = $baseDir . '/watermark/default/' . $file;
        } elseif ( $this->fileExists($baseDir . '/watermark/' . $file) ) {
            $filePath = $baseDir . '/watermark/' . $file;
        } else {
            $baseDir = Mage::getDesign()->getSkinBaseDir();
            if( $this->fileExists($baseDir . $file) ) {
                $filePath = $baseDir . $file;
            }
        }

        return $filePath;
    }

    /**
     * Set watermark position
     *
     * @param string $position
     */
    public function setWatermarkPosition($position)
    {
        $this->watermarkPosition = $position;
        return $this;
    }

    /**
     * Get watermark position
     *
     * @return string
     */
    public function getWatermarkPosition()
    {
        return $this->watermarkPosition;
    }

    /**
     * Set watermark image opacity
     *
     * @param int $imageOpacity
     */
    public function setWatermarkImageOpacity($imageOpacity)
    {
        $this->watermarkImageOpacity = $imageOpacity;
        return $this;
    }

    /**
     * Get watermark image opacity
     *
     * @return int
     */
    public function getWatermarkImageOpacity()
    {
        return $this->watermarkImageOpacity;
    }

    /**
     * Set watermark size
     *
     * @param array $size
     */
    public function setWatermarkSize($size)
    {
        if( is_array($size) ) {
            $this->setWatermarkWidth($size['width'])
                ->setWatermarkHeigth($size['heigth']);
        }
        return $this;
    }

    /**
     * Set watermark width
     *
     * @param int $width
     */
    public function setWatermarkWidth($width)
    {
        $this->watermarkWidth = $width;
        return $this;
    }

    /**
     * Get watermark width
     *
     * @return int
     */
    public function getWatermarkWidth()
    {
        return $this->watermarkWidth;
    }

    /**
     * Set watermark heigth
     *
     * @param int $heigth
     */
    public function setWatermarkHeigth($heigth)
    {
        $this->watermarkHeigth = $heigth;
        return $this;
    }

    /**
     * Get watermark heigth
     *
     * @return string
     */
    public function getWatermarkHeigth()
    {
        return $this->watermarkHeigth;
    }
}