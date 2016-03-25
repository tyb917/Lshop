<?php

Route::group([
    'namespace'  => 'Catalog',
    'middleware' => 'access.routeNeedsPermission:view-access-management',
], function() {
    Route::resource('catalog/categories', 'CategoryController',['except' => 'show']);
    Route::get('catalog/categories/children', 'CategoryController@children')->name('admin.catalog.categories.children');
    Route::post('catalog/categories/move', 'CategoryController@move')->name('admin.catalog.categories.move');
    Route::post('catalog/categories/copy', 'CategoryController@copy')->name('admin.catalog.categories.copy');
});