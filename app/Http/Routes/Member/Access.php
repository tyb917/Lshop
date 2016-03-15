<?php

/**
 * Frontend Access Controllers
 */

Route::group(['middleware' => 'auth'], function () {
    Route::get('dashboard', 'DashboardController@index')->name('member.dashboard');
});

Route::group(['namespace' => 'Auth'], function () {
    /**
     * These routes require the user to be logged in
     */
    Route::group(['middleware' => 'auth'], function () {
        // profile
        Route::get('profile', 'ProfileController@index')->name('member.user.profile');
        Route::get('profile/edit', 'ProfileController@edit')->name('member.user.profile.edit');
        Route::patch('profile/update', 'ProfileController@update')->name('member.user.profile.update');
    });
});

/**
 * These routes require the user to be logged in
 */
Route::group(['prefix' => 'member','middleware' => 'auth'], function () {
    Route::resource('ocean', 'OceanController');
});

Route::get('avatar/{userid}/{size}', 'AvatarController@index');
Route::post('avatar', 'AvatarController@update')->name('member.user.profile.avatar');


