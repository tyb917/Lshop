<?php

use Carbon\Carbon as Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class UserTableSeeder
 */
class UserTableSeeder extends Seeder
{
    public function run()
    {
        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        if (env('DB_CONNECTION') == 'mysql') {
            DB::table(config('access.users_table'))->truncate();
        } elseif (env('DB_CONNECTION') == 'sqlite') {
            DB::statement('DELETE FROM ' . config('access.users_table'));
        } elseif (env('DB_CONNECTION') == 'mongodb') {
            DB::collection(config('access.users_table'))->delete();
        } else {
            //For PostgreSQL or anything else
            DB::statement('TRUNCATE TABLE ' . config('access.users_table') . ' CASCADE');
        }

        //Add the master administrator, user id of 1
        $users = [
            [
                'name'              => 'Admin Istrator',
                'truename'             => '谭又彬',
                'email'             => '461670819@qq.com',
                'password'          => bcrypt('admin123'),
                'payword'          => bcrypt('admin123'),
                'last_login'        => Carbon::now(),
                'login_num'         => true,
                'is_active'         => true,
                'confirmation_code' => md5(uniqid(mt_rand(), true)),
                'confirmed'         => true,
                'created_at'        => Carbon::now(),
                'updated_at'        => Carbon::now(),
            ],
            [
                'name'              => 'Default User',
                'truename'             => 'xxx',
                'email'             => 'user@user.com',
                'password'          => bcrypt('user123'),
                'payword'          => bcrypt('user123'),
                'last_login'        => Carbon::now(),
                'login_num'         => true,
                'is_active'         => true,
                'confirmation_code' => md5(uniqid(mt_rand(), true)),
                'confirmed'         => true,
                'created_at'        => Carbon::now(),
                'updated_at'        => Carbon::now(),
            ],
        ];

        DB::table(config('access.users_table'))->insert($users);

        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}