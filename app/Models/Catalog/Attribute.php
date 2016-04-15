<?php

namespace App\Models\Catalog;

use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    protected $table='eav_attribute';

    protected $guarded =  ['id','entity_type_id'];

}
