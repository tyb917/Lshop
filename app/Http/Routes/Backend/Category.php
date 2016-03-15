<?php

Route::group([
    'namespace'  => 'Category',
    'middleware' => 'access.routeNeedsPermission:view-access-management',
], function() {
    Route::resource('categories', 'CategoryController',['except' => 'show']);
    Route::get('categories/children', 'CategoryController@children')->name('admin.categories.children');
    Route::post('categories/move', 'CategoryController@move')->name('admin.categories.move');
    Route::post('categories/copy', 'CategoryController@copy')->name('admin.categories.copy');
});