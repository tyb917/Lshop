<?php

namespace App\Repositories\Backend\Category;

use App\Models\Category;
use App\Exceptions\GeneralException;

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
        if ($category->update($input)) {
            $category->save();
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.category.update_error'));
    }
}
