<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStoreWebsiteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('store_website', function (Blueprint $table) {
            $table->smallIncrements('website_id')->comment('商店ID');
            $table->char('code',32)->nullable()->default(null)->comment('代码');
            $table->char('name',64)->nullable()->default(null)->comment('网站名称');
            $table->unsignedSmallInteger('sort_order')->default(0)->comment('网站排序');
            $table->unsignedSmallInteger('default_group_id')->default(0)->comment('默认分组ID');
            $table->unsignedSmallInteger('is_default')->nullable()->default(0)->comment('定义为默认网站');
            $table->index('code');
            $table->index('sort_order');
            $table->index('default_group_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('store_website', function (Blueprint $table) {
            //
        });
    }
}
