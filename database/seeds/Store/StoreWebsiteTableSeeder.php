<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StoreWebsiteTableSeeder extends Seeder
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
            DB::table('store_website')->truncate();
        } elseif (env('DB_CONNECTION') == 'sqlite') {
            DB::statement('DELETE FROM store_website');
        } elseif (env('DB_CONNECTION') == 'mongodb') {
            DB::collection('store_website')->delete();
        } else {
            //For PostgreSQL or anything else
            DB::statement('TRUNCATE TABLE store_website CASCADE');
        }

        $store_website = [
            [
                'website_id'             => '0',
                'code'             => 'admin',
                'name'             => '管理者',
                'sort_order'          => '0',
                'default_group_id'          => '0',
                'is_default'          => '0'
            ],
            [
                'website_id'             => '1',
                'code'             => 'base',
                'name'             => '主网站',
                'sort_order'          => '0',
                'default_group_id'          => '1',
                'is_default'          => '1'
            ],
        ];

        DB::table('store_website')->insert($store_website);
        
        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}
