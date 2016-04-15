<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCatalogEavAttribute extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('catalog_eav_attribute', function (Blueprint $table) {
            $table->increments('attribute_id')->unsigned()->comment("属性ID");
            $table->foreign('attribute_id')->references('attribute_id')->on('eav_attribute')->onDelete('cascade')->onUpdate('cascade');
            $table->char('frontend_input_renderer')->nullable()->default(null)->comment('前端输入渲染');
            $table->smallInteger('is_global')->default(1)->unsigned()->comment('是否全局');
            $table->smallInteger('is_visible')->default(1)->unsigned()->comment('是否可见');
            $table->smallInteger('is_searchable')->default(0)->unsigned()->comment('是否可搜索');
            $table->smallInteger('is_filterable')->default(0)->unsigned()->comment('是否可筛选');
            $table->smallInteger('is_comparable')->default(0)->unsigned()->comment('是否可比较');
            $table->smallInteger('is_visible_on_front')->default(0)->unsigned()->comment('是否前端可见');
            $table->smallInteger('is_html_allowed_on_front')->default(0)->unsigned()->comment('前端是否允许HTML');
            $table->smallInteger('is_used_for_price_rules')->default(0)->unsigned()->comment('是否用于价格规则');
            $table->smallInteger('is_filterable_in_search')->default(0)->unsigned()->comment('是否在搜索中可筛选');
            $table->smallInteger('used_in_product_listing')->default(0)->unsigned()->comment('能否用于在产品列表中');
            $table->smallInteger('used_for_sort_by')->default(0)->unsigned()->comment('是否用于排序');
            $table->char('apply_to')->nullable()->default(null)->comment('适用于');
            $table->smallInteger('is_visible_in_advanced_search')->default(0)->unsigned()->comment('是否在高级搜索中可见');
            $table->integer('position')->default(0)->comment('显示顺序');
            $table->smallInteger('is_wysiwyg_enabled')->default(0)->unsigned()->comment('是否启用所见即得');
            $table->smallInteger('is_used_for_promo_rules')->default(0)->unsigned()->comment('是否用于促销规则');
            $table->smallInteger('is_required_in_admin_store')->default(0)->unsigned()->comment('在管理储存中是否必须');
            $table->smallInteger('is_used_in_grid')->default(0)->unsigned()->comment('是否用于网格中');
            $table->smallInteger('is_visible_in_grid')->default(0)->unsigned()->comment('在网格中是否可见');
            $table->smallInteger('is_filterable_in_grid')->default(0)->unsigned()->comment('在网格中是否过滤');
            $table->float('search_weight',0,0)->nullable()->default(1)->comment('搜索权重');
            $table->text('additional_data')->comment('附加样本属性数据');
            $table->index(['used_for_sort_by']);
            $table->index(['used_in_product_listing']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('catalog_eav_attribute');
    }
}
