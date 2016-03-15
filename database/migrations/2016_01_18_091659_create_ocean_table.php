<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOceanTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('oceans', function (Blueprint $table) {
            $table->increments('id');
            $table->tinyInteger('type');
            $table->string('title',20);
            $table->string('origin_port',10);
            $table->string('destination_port',10);
            $table->string('carrier',10);
            $table->string('is_direct',10);
            $table->tinyInteger('transit_time')->nullable();
            $table->float('20gp',10,3);
            $table->float('40gp',10,3);
            $table->float('40hq',10,3);
            $table->timestamp('cy_cvutoff')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('etd')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('validity_from')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('validity_to')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->string('note');
            $table->tinyInteger('status');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('ocean');
    }
}
