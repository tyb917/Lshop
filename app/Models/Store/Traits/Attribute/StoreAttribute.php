<?php

namespace App\Models\Store\Traits\Attribute;

trait StoreAttribute
{
    public function getWebsiteButtonAttribute()
    {
        return '<a href="'.$this->website_id.'">'.$this->website_name.'</a>';
    }

    public function getGroupButtonAttribute()
    {
        return '<a href="'.$this->group_id.'">'.$this->group_name.'</a>';
    }

    public function getStoreButtonAttribute()
    {
        return '<a href="'.$this->store_id.'">'.$this->name.'</a>';
    }
}