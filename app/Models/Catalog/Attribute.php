<?php

namespace App\Models\Catalog;

use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    protected $table='eav_attribute';

    protected $primaryKey = 'attribute_id';

    protected $guarded =  ['id','entity_type_id'];

}
