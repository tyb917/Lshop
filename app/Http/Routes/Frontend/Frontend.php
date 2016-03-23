<?php

/**
 * Frontend Controllers
 */
Route::get('/', 'FrontendController@index')->name('frontend.index');

Route::get('img/{path}' ,function(League\Glide\Server $server, Illuminate\Http\Request $request){
    $server->outputImage($request->path(), $request->all());
})->where('path','.+');