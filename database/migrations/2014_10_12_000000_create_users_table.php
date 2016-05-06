<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('truename');
            $table->string('email')->unique();
            $table->string('telephone')->unique()->nullable();
            $table->string('password', 60)->nullable();
            $table->string('payword', 60)->nullable();
            $table->string('avatar');
            $table->timestamp('last_login')->default('0000-00-00 00:00');
            $table->boolean('login_num')->default(false);
            $table->boolean('is_active')->default(false);
            $table->string('confirmation_code');
            $table->boolean('confirmed')->default(config('access.users.confirm_email') ? false : true);
            $table->rememberToken();
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->default('0000-00-00 00:00');
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
        Schema::drop('users');
    }
}
