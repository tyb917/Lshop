<?php
/*商店*/
Route::group([
    'namespace'  => 'Store',
    'middleware' => 'access.routeNeedsPermission:view-store-management',
    'prefix' => 'store'
], function() {
    /*商店视图信息*/
    Route::resource('store', 'StoreController');
    /*商店信息*/
    Route::resource('group', 'GroupController');
    /*网页信息*/
    Route::resource('website', 'WebSiteController');
});


