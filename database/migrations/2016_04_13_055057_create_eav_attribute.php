<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEavAttribute extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('eav_attribute', function (Blueprint $table) {
            $table->increments('attribute_id')->comment("属性ID");
            $table->smallInteger('entity_type_id')->nullable()->default(0)->comment("实体类型ID");
            $table->foreign('entity_type_id')->references('entity_type_id')->on('eav_entity_type')->onDelete('cascade')->onUpdate('cascade');
            $table->char('attribute_code')->default(null)->comment('属性代码');
            $table->char('backend_type')->default(null)->comment('后台类型');
            $table->char('frontend_input')->default(null)->comment('前台输出类型');
            $table->char('frontend_label')->default(null)->comment('前台输出名称');
            $table->char('frontend_class')->default(null)->comment('前台输入验证');
            $table->smallInteger('is_required')->nullable()->default(0)->unsigned()->comment('是否必须');
            $table->Integer('is_user_defined')->nullable()->default(0)->unsigned()->comment('是否系统属性');
            $table->text('default_value')->comment('默认值');
            $table->smallInteger('is_unique')->nullable()->default(0)->unsigned()->comment('唯一数值（不与其它产品共享）');
            $table->char('note')->default(null)->comment('备注');
            $table->unique(['attribute_id','entity_type_id']);
            $table->index('entity_type_id');
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
        Schema::drop('eav_attribute');
    }
}
