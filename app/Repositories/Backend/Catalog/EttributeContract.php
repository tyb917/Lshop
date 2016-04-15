<?php

namespace App\Repositories\Backend\Catalog;

interface EttributeContract
{
    public function getAllAttributes($order_by = 'attribute_id', $sort = 'asc');
}