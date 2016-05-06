<?php

Route::group(['middleware' => 'web'], function() {
    /**
     * 语言选择路由
     */
    Route::group(['namespace' => 'Language'], function () {
        require (__DIR__ . '/Routes/Language/Language.php');
    });

    /**
     * 前台路由
     */
    Route::group(['namespace' => 'Frontend'], function () {
        require(__DIR__ . '/Routes/Frontend/Collection.php');
    });
    /**
     * 会员中心路由
     */
    Route::group(['namespace' => 'Member'], function () {
        Route::group(['middleware' => 'auth'], function () {
            require(__DIR__ . '/Routes/Member/Collection.php');
        });
    });

    /**
     * 后台路由
     */
    Route::group(['namespace' => 'Backend'], function () {
        Route::group(['prefix' => 'admin', 'middleware' => 'auth'], function () {
            require(__DIR__ . '/Routes/Backend/Collection.php');
        });
    });
});