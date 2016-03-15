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
    'images' => array(
        'avatar' => array(
            'paths' => array(
                'input'  => 'uploads/avatar/data',
                'output' => 'uploads/avatar/cache',
                'tmp'    => 'uploads/avatar/data/tmp'
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
            )
        ),
        'product' => array(
            'paths' => array(
                'input'  => '/uploads/product/data',
                'output' => '/uploads/product/cache',
                'tmp'    => '/uploads/avatar/data/tmp'
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
            )
        )
    )
);
