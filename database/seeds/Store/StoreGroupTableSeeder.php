<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StoreGroupTableSeeder extends Seeder
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
            DB::table('store_group')->truncate();
        } elseif (env('DB_CONNECTION') == 'sqlite') {
            DB::statement('DELETE FROM store_group');
        } elseif (env('DB_CONNECTION') == 'mongodb') {
            DB::collection('store_group')->delete();
        } else {
            //For PostgreSQL or anything else
            DB::statement('TRUNCATE TABLE store_group CASCADE');
        }

        $store_group = [
            [
                'group_id'              => '0',
                'website_id'             => '0',
                'name'             => '默认商店',
                'root_category_id'          => '0',
                'default_store_id'          => '0'
            ],
            [
                'group_id'              => '1',
                'website_id'             => '1',
                'name'             => '主网站商店',
                'root_category_id'          => '2',
                'default_store_id'          => '1'
            ],
        ];

        DB::table('store_group')->insert($store_group);

        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}
