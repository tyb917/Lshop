<?php

namespace App\Helper\Avatar;

use File;
use Config;
use App\Helper\Image as AvatarImages;
use App\Models\Access\User\User;
use App\Exceptions\GeneralException;

class Image extends AvatarImages
{
    public function __construct()
    {
        $this->inDir = public_path(Config::get('avatar.upload').DS.access()->id());
        $this->medium = Config::get('avatar.medium.size');
        $this->small = Config::get('avatar.small.size');
        $this->large = Config::get('avatar.large.size');
    }

    public function upload($file,$data){
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
                        if($data->rotate){
                            $this->rotate(-($data->rotate));
                        }
                        $this->crop($data->width,$data->height,$data->x,$data->y);
                        $this->newFile = $this->inDir.DS.md5($clientName).'_'.$this->small.".".$extension;
                        $this->resize($this->small,$this->small);
                        $this->newFile = $this->inDir.DS.md5($clientName).'_'.$this->medium.".".$extension;
                        $this->resize($this->medium,$this->medium);
                        $this->newFile = $this->inDir.DS.md5($clientName).'_'.$this->large.".".$extension;
                        $this->resize($this->large,$this->large);
                        File::delete($this->baseFile);
                        $this->avatar = str_replace($this->inDir.DS,'',$this->baseFile);
                        $this->state = 200;
                        $this->msg = '保存成功！';
                    } else {
                        $this->state = 400;
                        $this->msg = '保存失败！';
                    }
                }else{
                    $this->state = 400;
                    $this->msg = '允许上传的图片格式为JPG, PNG, GIF';
                }
            }else{
                $this->state = 400;
                $this->msg = '请上传图片';
            }
            return $this;
        }else{
            $this->state = 599;
            return $this->msg = $file->getErrorMessage();
        }
    }

    public function getAvatar($userid,$size)
    {
        $user = User::find($userid);
        $avatar = $user->avatar;
        $file = explode('.',$avatar);
        $newFile = public_path(Config::get('avatar.upload').DS.access()->id().DS.$file[0].'_'.Config::get('avatar.'.$size.'.size').'.'.$file[1]);
        return Image::cache(function($image) use ($newFile) {
           $image->make($newFile)->greyscale();
        }, 10, true);
    }

    public function deleteAvatar($avatar)
    {
        $file = explode('.',$avatar);
        File::delete(public_path(Config::get('avatar.upload').DS.access()->id().DS.$file[0].'_'.Config::get('avatar.small.size').'.'.$file[1]));
        File::delete(public_path(Config::get('avatar.upload').DS.access()->id().DS.$file[0].'_'.Config::get('avatar.medium.size').'.'.$file[1]));
        File::delete(public_path(Config::get('avatar.upload').DS.access()->id().DS.$file[0].'_'.Config::get('avatar.large.size').'.'.$file[1]));
    }

}