<?php

namespace App\Models\Catalog\Product;

use Illuminate\Database\Eloquent\Model;
use App\Models\Catalog\Product\Traits\Relationship\ProductRelationship;

class ProductAttribute extends Model
{
    use ProductRelationship;

    protected $table='catalog_eav_attribute';

    protected $primaryKey = 'attribute_id';

    protected $guarded =  ['attribute_id','entity_type_id'];

}
