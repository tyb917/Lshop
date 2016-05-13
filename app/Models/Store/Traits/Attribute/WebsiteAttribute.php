<?php

namespace App\Models\Store\Traits\Attribute;

trait WebsiteAttribute
{
    public function getWebsiteButtonAttribute()
    {
        return '<a href="'.$this->website_id.'">'.$this->name.'</a>';
    }

    public function getGroupButtonAttribute()
    {
        return '<a href="'.$this->group_id.'">'.$this->group_title.'</a>';
    }

    public function getStoreButtonAttribute()
    {
        return '<a href="'.$this->store_id.'">'.$this->store_title.'</a>';
    }
}