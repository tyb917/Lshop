<?php

namespace App\Models\Store;

use Illuminate\Database\Eloquent\Model;
use App\Models\Store\Traits\Attribute\WebsiteAttribute;

class Website extends Model
{
    use WebsiteAttribute;
    protected $table='store_website';
}
