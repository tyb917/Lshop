<?php

/**
 * Frontend Controllers
 */
Route::get('/', 'FrontendController@index')->name('frontend.index');

/**
 * These frontend controllers require the user to be logged in
 */