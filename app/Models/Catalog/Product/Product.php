<?php

namespace App\Models\Catalog\Product;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';

    public function categories() {
        return $this->belongsToMany('Category', 'products_categories');
    }

    /**
     * @param $query
     * @param Category|null $category
     * @return mixed
     */
    public function scopeCategorized($query, Category $category=null) {
        if ( is_null($category) ) return $query->with('categories');

        $categoryIds = $category->getDescendantsAndSelf()->lists('id');

        return $query->with('categories')
            ->join('products_categories', 'products_categories.product_id', '=', 'products.id')
            ->whereIn('products_categories.category_id', $categoryIds);
    }
}
