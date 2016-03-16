<?php

namespace App\Helper\Catalog;

use Config;
use App\Models\Product;
use App\Helper\Image as CatalogImages;

class Image extends CatalogImages
{
    /**
     * Current model
     *
     */
    protected $model;

    /**
     * Scheduled for resize image
     *
     * @var bool
     */
    protected $scheduleResize = false;

    /**
     * Scheduled for rotate image
     *
     * @var bool
     */
    protected $scheduleRotate = false;

    /**
     * Angle
     *
     * @var int
     */
    protected $angle;

    /**
     * Watermark file name
     *
     * @var string
     */
    protected $watermark;

    /**
     * Watermark Position
     *
     * @var string
     */
    protected $watermarkPosition;

    /**
     * Watermark Size
     *
     * @var string
     */
    protected $watermarkSize;

    /**
     * Watermark Image opacity
     *
     * @var int
     */
    protected $watermarkImageOpacity;

    /**
     * Current Product
     *
     * @var Mage_Catalog_Model_Product
     */
    protected $product;

    /**
     * Image File
     *
     * @var string
     */
    protected $imageFile;

    /**
     * Image Placeholder
     *
     * @var string
     */
    protected $placeholder;

    /**
     * @return $this
     */

    protected function reset()
    {
        $this->model = null;
        $this->scheduleResize = false;
        $this->scheduleRotate = false;
        $this->angle = null;
        $this->watermark = null;
        $this->watermarkPosition = null;
        $this->watermarkSize = null;
        $this->watermarkImageOpacity = null;
        $this->product = null;
        $this->imageFile = null;
        return $this;
    }

    public function init($product, $attributeName, $imageFile=null)
    {
        $this->reset();
        return $this;
    }

    public function setBaseFile($file)
    {
        $this->isBaseFilePlaceholder = false;

        if (($file) && (0 !== strpos($file, '/', 0))) {
            $file = '/' . $file;
        }
        
        $baseDir = Config::get('image.product.paths.input');
            
        if ($file) {
            if ((!$this->fileExists($baseDir . $file)) || !$this->checkMemory($baseDir . $file)) {
                $file = null;
            }
        }
        if (!$file) {
            // check if placeholder defined in config
            $isConfigPlaceholder = Mage::getStoreConfig("catalog/placeholder/{$this->getDestinationSubdir()}_placeholder");
            $configPlaceholder   = '/placeholder/' . $isConfigPlaceholder;
            if ($isConfigPlaceholder && $this->fileExists($baseDir . $configPlaceholder)) {
                $file = $configPlaceholder;
            }
            else {
                // replace file with skin or default skin placeholder
                $skinBaseDir     = Mage::getDesign()->getSkinBaseDir();
                $skinPlaceholder = "/images/catalog/product/placeholder/{$this->getDestinationSubdir()}.jpg";
                $file = $skinPlaceholder;
                if (file_exists($skinBaseDir . $file)) {
                    $baseDir = $skinBaseDir;
                }
                else {
                    $baseDir = Mage::getDesign()->getSkinBaseDir(array('_theme' => 'default'));
                    if (!file_exists($baseDir . $file)) {
                        $baseDir = Mage::getDesign()->getSkinBaseDir(array('_theme' => 'default', '_package' => 'base'));
                    }
                }
            }
            $this->isBaseFilePlaceholder = true;
        }

        $baseFile = $baseDir . $file;

        if ((!$file) || (!file_exists($baseFile))) {
            throw new Exception(Mage::helper('catalog')->_('Image file was not found.'));
        }

        $this->baseFile = $baseFile;

        // build new filename (most important params)
        $path = array(
            Mage::getSingleton('catalog/product_media_config')->getBaseMediaPath(),
            'cache',
            Mage::app()->getStore()->getId(),
            $path[] = $this->getDestinationSubdir()
        );
        if((!empty($this->width)) || (!empty($this->height)))
            $path[] = "{$this->width}x{$this->height}";

        // add misk params as a hash
        $miscParams = array(
            ($this->keepAspectRatio  ? '' : 'non') . 'proportional',
            ($this->keepFrame        ? '' : 'no')  . 'frame',
            ($this->keepTransparency ? '' : 'no')  . 'transparency',
            ($this->constrainOnly ? 'do' : 'not')  . 'constrainonly',
            $this->rgbToString($this->backgroundColor),
            'angle' . $this->angle,
            'quality' . $this->quality
        );

        // if has watermark add watermark params to hash
        if ($this->getWatermarkFile()) {
            $miscParams[] = $this->getWatermarkFile();
            $miscParams[] = $this->getWatermarkImageOpacity();
            $miscParams[] = $this->getWatermarkPosition();
            $miscParams[] = $this->getWatermarkWidth();
            $miscParams[] = $this->getWatermarkHeigth();
        }

        $path[] = md5(implode('_', $miscParams));

        // append prepared filename
        $this->newFile = implode('/', $path) . $file; // the $file contains heading slash

        return $this;
    }

    public function clearCache()
    {
        $directory = public_path(Config::get('image.avatar.paths.output'));
        File::deleteDirectory($directory);
    }
}