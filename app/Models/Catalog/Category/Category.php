<?php

namespace App\Models\Catalog\Category;

use Baum\Node;

class Category extends Node
{
    protected $guarded =  ['id','general'];

    public function products() {
        return $this->belongsToMany('Product', 'products_categories');
    }
}
