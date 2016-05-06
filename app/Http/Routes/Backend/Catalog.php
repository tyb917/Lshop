<?php
/*分类*/
Route::group([
    'namespace'  => 'Catalog\Category',
    'middleware' => 'access.routeNeedsPermission:view-categories-management',
], function() {
    Route::resource('catalog/categories', 'CategoryController',['except' => 'show']);
    Route::get('catalog/categories/children', 'CategoryController@children')->name('admin.catalog.categories.children');
    Route::post('catalog/categories/move', 'CategoryController@move')->name('admin.catalog.categories.move');
    Route::post('catalog/categories/copy', 'CategoryController@copy')->name('admin.catalog.categories.copy');
});

/*产品*/
Route::group([
    'namespace'  => 'Catalog\Product',
    'middleware' => 'access.routeNeedsPermission:view-products-management',
], function() {
    Route::resource('catalog/products', 'ProductController');
    Route::resource('catalog/product_attribute', 'AttributeController');
});

/*样本*/
Route::group([
    'namespace'  => 'Swatch',
    'middleware' => 'access.routeNeedsPermission:create-swatch',
], function() {
    Route::resource('swatch', 'SwatchController');
});

