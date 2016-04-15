
<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EavTableSeeder extends Seeder
{
    public function run()
    {
        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        $this->call(EavEntityTypeTableSeeder::class);
        $this->call(EavAttributeTableSeeder::class);
        $this->call(CatalogEavAttributeTableSeeder::class);


        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }

    }
}