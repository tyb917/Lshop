<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Backend\Catalog\EloquentCategoryRepository;
use App\Repositories\Backend\Catalog\EloquentProductRepository;

class CatalogServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            \App\Repositories\Backend\Catalog\CategoryContract::class,
            \App\Repositories\Backend\Catalog\EloquentCategoryRepository::class
        );

        $this->app->bind(
            \App\Repositories\Backend\Catalog\ProductContract::class,
            \App\Repositories\Backend\Catalog\EloquentProductRepository::class
        );
    }
}
