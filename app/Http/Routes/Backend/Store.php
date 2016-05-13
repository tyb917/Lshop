<?php
/*商店*/
Route::group([
    'namespace'  => 'Store',
    'middleware' => 'access.routeNeedsPermission:view-store-management',
    'prefix' => 'store'
], function() {
    Route::get('index', 'StoreController@index')->name('admin.store.index');
    /*商店视图信息*/
    Route::resource('store', 'StoreController',['except'=>'index']);
    /*商店信息*/
    Route::resource('group', 'GroupController');
    /*网页信息*/
    Route::resource('website', 'WebsiteController');
});


