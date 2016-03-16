<?php

namespace App\Helper;

class Helper
{
    protected $namespace = 'App\Helper';

    public function model($name)
    {
        $name = ucwords(str_replace('/',' ',$name));
        $name = str_replace(' ',DS,$name);
        $provider = DS.$this->namespace.DS.$name;
        return new $provider;
    }
}