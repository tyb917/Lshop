<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStoreTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('store', function (Blueprint $table) {
            $table->smallIncrements('store_id')->comment('商店ID');
            $table->char('code',30)->nullable()->default(null)->comment('代码');
            $table->unsignedsmallInteger('website_id')->default(0)->comment('网站ID');
            $table->foreign('website_id')->references('website_id')->on('store_website')->onDelete('cascade')->onUpdate('restrict');
            $table->unsignedsmallInteger('group_id')->default(0)->comment('分组ID');
            $table->foreign('group_id')->references('group_id')->on('store_group')->onDelete('cascade')->onUpdate('restrict');
            $table->char('name')->comment('名称');
            $table->unsignedSmallInteger('sort_order')->default(0)->comment('商店排序');
            $table->unsignedSmallInteger('is_active')->default(0)->comment('商店激活');
            $table->unique(['code']);
            $table->index(['website_id']);
            $table->index(['is_active','sort_order']);
            $table->index(['group_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('store', function (Blueprint $table) {
            //
        });
    }
}
