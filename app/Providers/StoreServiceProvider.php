<?php

namespace App\Providers;

use Validator;
use Illuminate\Support\ServiceProvider;
use App\Repositories\Backend\Store\EloquentCategoryRepository;
use App\Repositories\Backend\Store\EloquentProductRepository;

class StoreServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        Validator::extend('alpha_dash_first', function ($attribute, $value, $parameters)
        {
            if (!preg_match('/^[a-z]+[a-z0-9_]*$/',$value)) {
                return false;
            }
            return true;
        });
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            \App\Repositories\Backend\Store\StoreRepositoryContract::class,
            \App\Repositories\Backend\Store\EloquentStoreRepository::class
        );

        $this->app->bind(
            \App\Repositories\Backend\Store\GroupRepositoryContract::class,
            \App\Repositories\Backend\Store\EloquentGroupRepository::class
        );

        $this->app->bind(
            \App\Repositories\Backend\Store\WebsiteRepositoryContract::class,
            \App\Repositories\Backend\Store\EloquentWebsiteRepository::class
        );
    }
}
