<?php

namespace App\Helper\Avatar;

use Config;
use App\Helper\Image as AvatarImages;
use App\Exceptions\GeneralException;
use File;

class Image extends AvatarImages
{
    protected $inDri;
    protected $outDri;
    protected $placeholderDri;
    protected $baseFile;

    function reset(){
        $this->inDir = Config::get('image.avatar.paths');
        $this->baseFile = null;
        return $this;
    }

    public function init($imageFile,$attributeName='medium')
    {
        $this->reset();
        $this->setDestinationSubdir($attributeName);
        $this->setBaseFile($imageFile);

        return $this;
    }

    public function size($file=null,$attributeName='medium')
    {
        $this->reset();
        if($file){
            $baseFile = public_path($this->inDir.$file);
        }else{
            $file = DS .$attributeName.'.jpg';
            $baseFile = public_path($this->placeholderDir.$file);
        }
        return $baseFile;
    }
}