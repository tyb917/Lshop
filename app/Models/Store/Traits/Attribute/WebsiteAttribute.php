<?php

namespace App\Models\Store\Traits\Attribute;

trait WebsiteAttribute
{
    public function getWebsiteButtonAttribute()
    {
        if($this->website_id)
        return link_to('admin/store/website/'.$this->website_id.'/edit/',$this->name);
    }

    public function getGroupButtonAttribute()
    {
        if($this->group_id)
        return link_to('admin/store/group/'.$this->group_id.'/edit/',$this->group_title);
    }

    public function getStoreButtonAttribute()
    {
        if($this->store_id)
        return link_to('admin/store/store/'.$this->store_id.'/edit/',$this->store_title);
    }
}