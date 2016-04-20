<?php

namespace App\Repositories\Backend\Catalog;

use App\Models\Catalog\Product\ProductAttribute;
use App\Exceptions\GeneralException;

/**
 * Class EloquentProductEttributeRepository
 * @package App\Repositories\Catalog
 */
class EloquentProductEttributeRepository implements ProductEttributeContract
{
    public function getAllAttributes($order_by = 'attribute_id', $sort = 'asc')
    {
        return ProductAttribute::with('attributes')
            ->orderBy($order_by, $sort)
            ->get();
    }
}
