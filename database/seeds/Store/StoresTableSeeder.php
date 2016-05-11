<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StoresTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
            DB::statement('SET SQL_MODE=NO_AUTO_VALUE_ON_ZERO;');
        }

        if (env('DB_CONNECTION') == 'mysql') {
            DB::table('eav_attribute')->truncate();
        } elseif (env('DB_CONNECTION') == 'sqlite') {
            DB::statement('DELETE FROM eav_attribute');
        } elseif (env('DB_CONNECTION') == 'mongodb') {
            DB::collection('eav_attribute')->delete();
        } else {
            //For PostgreSQL or anything else
            DB::statement('TRUNCATE TABLE eav_attribute CASCADE');
        }

        $stores = [
            [
                'store_id'              => '0',
                'code'                  => 'admin',
                'website_id'             => '0',
                'group_id'             => '0',
                'name'             => '管理者',
                'sort_order'          => '0',
                'is_active'          => '1'
            ],
            [
                'store_id'              => '1',
                'code'                  => 'default',
                'website_id'             => '1',
                'group_id'             => '1',
                'name'             => '默认商店界面',
                'sort_order'          => '0',
                'is_active'          => '1'
            ],
        ];

        DB::table('store')->insert($stores);

        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}
