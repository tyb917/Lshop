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
            $table->increments('attribute_id')->unsigned()->comment("属性ID");
            $table->integer('entity_type_id')->unsigned()->default(0)->comment("实体类型ID");
            $table->foreign('entity_type_id')->references('entity_type_id')->on('eav_entity_type')->onDelete('cascade')->onUpdate('cascade');
            $table->char('attribute_code')->nullable()->default(null)->comment('属性代码');
            $table->char('attribute_model')->nullable()->default(null)->comment('属性模型');
            $table->char('backend_model')->nullable()->default(null)->comment('后台模型');
            $table->char('backend_type',8)->default('static')->comment('后台类型');
            $table->char('frontend_model')->nullable()->default(null)->comment('前台模型');
            $table->char('frontend_input',50)->nullable()->default(null)->comment('前台输出类型');
            $table->char('frontend_label')->nullable()->default(null)->comment('前台输出名称');
            $table->char('frontend_class')->nullable()->default(null)->comment('前台输入验证');
            $table->char('source_model')->nullable()->default(null)->comment('原始模型');
            $table->smallInteger('is_required')->default(0)->unsigned()->comment('是否必须');
            $table->smallInteger('is_user_defined')->default(0)->unsigned()->comment('是否系统属性');
            $table->text('default_value')->nullable()->comment('默认值');
            $table->smallInteger('is_unique')->default(0)->unsigned()->comment('唯一数值（不与其它产品共享）');
            $table->char('note')->nullable()->default(null)->comment('备注');
            $table->unique(['entity_type_id','attribute_code']);
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
