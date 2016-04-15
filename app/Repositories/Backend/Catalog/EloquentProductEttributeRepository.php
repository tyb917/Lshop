<?php

namespace App\Repositories\Backend\Catalog;

use App\Models\Catalog\Attribute;
use App\Exceptions\GeneralException;

/**
 * Class EloquentProductEttributeRepository
 * @package App\Repositories\Catalog
 */
class EloquentProductEttributeRepository implements ProductEttributeContract
{
    public function getAllAttributes($order_by = 'attribute_id', $sort = 'asc')
    {
        return Attribute::orderBy($order_by, $sort)
            ->get();
    }
}
