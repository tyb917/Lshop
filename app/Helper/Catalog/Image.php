<?php

namespace App\Helper\Catalog;

use File;
use Config;
use App\Models\Product;
use App\Exceptions\GeneralException;
use App\Helper\Image as CatalogImages;

class Image extends CatalogImages
{
    public $categoryDir;

    public function __construct()
    {
       return $this->categoryDir = public_path(Config::get('image.category'));
    }

    public function uploadCategoryImage($id,$file)
    {
        if($file->isValid()){
            $type = $file->getMimeType();
            $clientName = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $newName = md5($clientName).'.'.$extension;
            if($type == 'image/jpeg' || $type == 'image/png' || $type == 'image/gif'){
                $file->move($this->categoryDir.DS.$id,$newName);
                return $newName;
            }else{
                throw new GeneralException('允许上传的图片格式为JPG, PNG, GIF');
            }
        }else{
            throw new GeneralException($file->getErrorMessage());
        }
    }

    public function deleteCategoryImage($id,$file)
    {
        File::delete($this->categoryDir.DS.$id.DS.$file);
    }

}