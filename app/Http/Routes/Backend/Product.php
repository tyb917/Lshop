<?php

Route::group([
    'namespace'  => 'Product',
    'middleware' => 'access.routeNeedsPermission:view-access-management',
], function() {
    Route::resource('products', 'ProductController');
});