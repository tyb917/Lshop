<?php

namespace App\Helper;

class Helper
{
    public $app;

    protected $namespace = 'Helper';

    public function __construct($app)
    {
        $this->app = $app;
    }

    public function model($name)
    {
        $path = app_path($this->namespace.'/'.$name.'.php');
        if(file_exists($path)) require $path;
    }
}