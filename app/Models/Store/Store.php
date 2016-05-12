<?php

namespace App\Models\Store;

use Illuminate\Database\Eloquent\Model;
use App\Models\Store\Traits\Attribute\StoreAttribute;

class Store extends Model
{
    use StoreAttribute;
    protected $table='store';
}
