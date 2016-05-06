<?php
/**
 * These routes need view-backend permission
 * (good if you want to allow more than one group in the backend,
 * then limit the backend features by different roles or permissions)
 *
 * Note: Administrator has all permissions so you do not have to specify the administrator role everywhere.
 */
Route::group(['middleware' => 'access.routeNeedsPermission:view-backend'], function () {
    require (__DIR__ .'/Dashboard.php');
    require (__DIR__ .'/Access.php');
    require (__DIR__ .'/LogViewer.php');
    require (__DIR__ .'/Catalog.php');
    require (__DIR__ .'/Store.php');
});