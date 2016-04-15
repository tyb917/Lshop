<?php

namespace App\Models\Catalog;

use Illuminate\Database\Eloquent\Model;

class ProductAttribute extends Model
{
    protected $table='catalog_eav_attribute';

    protected $guarded =  ['attribute_id','entity_type_id'];

}
