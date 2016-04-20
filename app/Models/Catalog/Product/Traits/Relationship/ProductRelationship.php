<?php

namespace App\Models\Catalog\Product\Traits\Relationship;

/**
 * Class UserRelationship
 * @package App\Models\Access\User\Traits\Relationship
 */
trait ProductRelationship
{
    public function attributes()
    {
        return $this->belongsTo('App\Models\Catalog\Attribute','attribute_id','attribute_id');
    }
}