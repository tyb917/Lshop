<?php

namespace App\Repositories\Backend\Catalog;

use File;
use App\Models\Category;
use App\Exceptions\GeneralException;
use App\Helper\Catalog\Image;

/**
 * Class EloquentUserRepository
 * @package App\Repositories\User
 */
class EloquentCategoryRepository implements CategoryContract
{
    public function delete($id){

        if (!access()->hasPermission(['delete-category'])) {
            throw new GeneralException(trans('exceptions.backend.category.cant_permission_delete'));
        }

        $category = Category::findOrFail($id);
        if ($category->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.category.delete_error'));
    }

    public function update($id,$input){

        if (!access()->hasPermission(['update-category'])) {
            throw new GeneralException(trans('exceptions.backend.category.cant_permission_update'));
        }

        $category = Category::findOrFail($id);

        if($input->hasFile('image')){
            $img = new Image();
            $file = $img->uploadCategoryImage($id,$input->file('image'));
            if($file && $category->image){
                $img->deleteCategoryImage($id,$category->image);
            }
        }else{
            if(isset($input['general']['image']['delete'])){
                $input['image'] = '';
            }
            if(!isset($input['image']) && isset($input['general']['image']['value']) && !isset($input['general']['image']['delete'])){
                $input['image'] = $input['general']['image']['value'];
            }
        }

        if ($category->update($input->except('_token'))) {
            if(isset($file)){
                $category->image = $file;
            }
            $category->save();

            return true;
        }

        throw new GeneralException(trans('exceptions.backend.category.update_error'));
    }
}
