<?php

namespace App\Models;

use Baum\Node;

class Category extends Node
{
    protected $guarded =  ['id','general'];

    public function products() {
        return $this->belongsToMany('Product', 'products_categories');
    }
}
