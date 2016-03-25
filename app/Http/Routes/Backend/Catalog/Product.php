<?php

Route::group([
    'namespace'  => 'Catalog',
    'middleware' => 'access.routeNeedsPermission:view-access-management',
], function() {
    Route::resource('catalog/products', 'ProductController');
});