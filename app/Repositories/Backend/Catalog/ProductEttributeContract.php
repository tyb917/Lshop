<?php

namespace App\Repositories\Backend\Catalog;

interface ProductEttributeContract
{
    public function getAllAttributes($order_by = 'attribute_id', $sort = 'asc');
}