<?php

use Carbon\Carbon as Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class UserTableSeeder
 */
class EavAttributeTableSeeder extends Seeder
{
    public function run()
    {
        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
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

        $eav = [
            [
                
                'created_at'        => Carbon::now(),
                'updated_at'        => Carbon::now(),
            ],
            [

                'created_at'        => Carbon::now(),
                'updated_at'        => Carbon::now(),
            ],
        ];

        DB::table('eav_attribute')->insert($eav);

        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}