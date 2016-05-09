<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStoreGroupTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('store_group', function (Blueprint $table) {
            $table->smallIncrements('group_id')->comment('分组ID');
            $table->unsignedSmallInteger('website_id')->default(0)->comment('网站ID');
            $table->foreign('website_id')->references('website_id')->on('store_website')->onDelete('cascade')->onUpdate('restrict');
            $table->char('name')->comment('商店分组名称');
            $table->unsignedInteger('root_category_id')->default(0)->comment('根目录ID');
            $table->unsignedSmallInteger('default_store_id')->default(0)->comment('默认商店ID');
            $table->index(['website_id','default_store_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('store_group', function (Blueprint $table) {
            //
        });
    }
}
