<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEavEntityType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('eav_entity_type', function (Blueprint $table) {
            $table->increments('entity_type_id')->unsigned();
            $table->char('entity_type_code')->comment('实体类型代码');
            $table->char('entity_model')->comment('实体模型');
            $table->char('attribute_model')->nullable()->comment('属性模型');
            $table->char('entity_table')->nullable()->comment('实体表');
            $table->char('value_table_prefix')->nullable()->comment('值表前缀');
            $table->char('entity_id_field')->nullable()->comment('实体ID字段');
            $table->smallInteger('is_data_sharing')->unsigned()->default(1)->comment('定义是否数据共享');
            $table->char('data_sharing_key',100)->nullable()->default('default')->comment('数据共享密匙');
            $table->smallInteger('default_attribute_set_id')->unsigned()->default(0)->comment('默认属性设置ID');
            $table->char('increment_model')->nullable()->comment('增量模型');
            $table->smallInteger('increment_per_store')->unsigned()->default(0)->comment('增量/存储');
            $table->smallInteger('increment_pad_length')->unsigned()->default(8)->comment('增量填充长度');
            $table->char('increment_pad_char',1)->default(0)->comment('增量填充字符');
            $table->char('additional_attribute_table')->nullable()->comment('额外属性表');
            $table->char('entity_attribute_collection')->nullable()->comment('实体属性集合');
            $table->index('entity_type_code');
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
        Schema::drop('eav_entity_type');
    }
}
