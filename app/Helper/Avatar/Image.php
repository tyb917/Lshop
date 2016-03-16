<?php

namespace App\Helper\Avatar;

use File;
use Config;
use App\Helper\Image as AvatarImages;
use App\Exceptions\GeneralException;

class Image extends AvatarImages
{
    private $msg;

    function __construct()
    {
        $this->inDir = public_path(Config::get('avatar.upload').DS.access()->id());
        $this->medium = Config::get('avatar.medium.size');
        $this->small = Config::get('avatar.small.size');
        $this->large = Config::get('avatar.large.size');
    }

    function upload($file,$data){
        if($file->isValid()){
            $type = $file->getMimeType();
            if ($type) {
                $clientName = $file->getClientOriginalName();
                $extension = $file->getClientOriginalExtension();
                if ($type == 'image/jpeg' || $type == 'image/png' || $type == 'image/gif') {
                    $this->baseFile = $this->inDir.DS.md5($clientName).".".$extension;
                    $result = $file->move($this->inDir, $this->baseFile);
                    if ($result) {
                        $data = json_decode(stripslashes($data));
                        $this->crop($data->width,$data->height,$data->x,$data->y);
                        if($data->rotate){
                            $this->rotate($data->rotate);
                        }
                        $this->newFile = $this->inDir.DS.md5($clientName).'_'.$this->medium.".".$extension;
                        $this->resize($this->medium,$this->medium);
                        $this->newFile = $this->inDir.DS.md5($clientName).'_'.$this->small.".".$extension;
                        $this->resize($this->small,$this->small);
                        $this->newFile = $this->inDir.DS.md5($clientName).'_'.$this->large.".".$extension;
                        $this->resize($this->large,$this->large);
                    } else {
                        $this->msg = '保存失败！';
                    }
                }else{
                    $this->msg = '允许上传的图片格式为JPG, PNG, GIF';
                }
            }else{
                $this->msg = '请上传图片';
            }
        }
    }

}