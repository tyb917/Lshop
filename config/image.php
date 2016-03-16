<?php

return array(

    /*
    |--------------------------------------------------------------------------
    | Image Driver
    |--------------------------------------------------------------------------
    |
    | Intervention Image supports "GD Library" and "Imagick" to process images
    | internally. You may choose one of them according to your PHP
    | configuration. By default PHP's "GD Library" implementation is used.
    |
    | Supported: "gd", "imagick"
    |
    */

    'driver' => 'gd',
    'tmp' => 'media/tmp',
    'avatar' => array(
        'paths' => array(
            'input'  => 'media/avatar/data',
        ),
        'sizes' => array(
            'small' => array(
                'width'  => 30,
                'height' => 30
            ),
            'medium' => array(
                'width'  => 65,
                'height' => 65
            ),
            'large' => array(
                'width'  => 180,
                'height' => 180
            )
        ),
        'placeholder' => 'media/avatar/placeholder'
    ),
    'product' => array(
        'paths' => array(
            'input'  => 'media/catalog/product/data',
            'output' => 'media/catalog/product/cache',
        ),
        'attributename' => array(
            'small_image',
            'thumbnail',
            'image'
        ),
        'placeholder' => 'media/catalog/product/placeholder'
    ),
    'category' => array(
        'paths' => array(
            'input'  => 'media/catalog/category/data',
            'output' => 'media/catalog/category/cache',
        ),
        'attributename' => array(
            'small_image',
            'thumbnail',
            'image'
        )
    )
);
