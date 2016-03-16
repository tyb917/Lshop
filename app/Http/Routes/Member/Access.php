<?php

/**
 * Frontend Access Controllers
 * 以下路由需要登录权限
 */
Route::group(['middleware' => 'auth'], function () {
    Route::get('dashboard', 'DashboardController@index')->name('member.dashboard');
    Route::group(['namespace' => 'User'], function () {
        // 个人资料
        Route::get('profile', 'ProfileController@index')->name('member.user.profile');
        Route::get('profile/edit', 'ProfileController@edit')->name('member.user.profile.edit');
        Route::patch('profile/update', 'ProfileController@update')->name('member.user.profile.update');
        // 上传头像
        Route::get('avatar/{userid}/{size}', 'AvatarController@index');
        Route::post('avatar', 'AvatarController@update')->name('member.user.profile.avatar');
    });
    Route::group(['prefix' => 'member'], function () {
        Route::resource('ocean', 'OceanController');
    });
});



