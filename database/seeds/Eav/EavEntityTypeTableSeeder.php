<?php

use Carbon\Carbon as Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class UserTableSeeder
 */
class EavEntityTypeTableSeeder extends Seeder
{
    public function run()
    {
        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        if (env('DB_CONNECTION') == 'mysql') {
            DB::table('eav_entity_type')->truncate();
        } elseif (env('DB_CONNECTION') == 'sqlite') {
            DB::statement('DELETE FROM eav_entity_type');
        } elseif (env('DB_CONNECTION') == 'mongodb') {
            DB::collection('eav_entity_type')->delete();
        } else {
            //For PostgreSQL or anything else
            DB::statement('TRUNCATE TABLE eav_entity_type CASCADE');
        }

        $entity = [
            [
                'entity_type_code' => 'customer',
                'entity_model'     => 'App\Repositories\Backend\User\UserContract',
                'attribute_model'  => 'App\Repositories\Eav\Customer\AttributeContract',
                'entity_table'     => 'customer_entity',
                'additional_attribute_table' => 'customer_eav_attribute',
                'created_at'        => Carbon::now(),
                'updated_at'        => Carbon::now(),
            ],
            [
                'entity_type_code' => 'customer_address',
                'entity_model'     => 'App\Repositories\Backend\User\AddressContract',
                'attribute_model'  => 'App\Repositories\Eav\Customer\AttributeContract',
                'entity_table'     => 'customer_address_entity',
                'additional_attribute_table' => 'customer_eav_attribute',
                'created_at'        => Carbon::now(),
                'updated_at'        => Carbon::now(),
            ],
            [
                'entity_type_code' => 'catalog_category',
                'entity_model'     => 'App\Repositories\Backend\Catalog\CategoryContract',
                'attribute_model'  => 'App\Repositories\Eav\Catalog\AttributeContract',
                'entity_table'     => 'catalog_eav_attribute',
                'additional_attribute_table' => 'catalog_eav_attribute',
                'created_at'        => Carbon::now(),
                'updated_at'        => Carbon::now(),
            ],
            [
                'entity_type_code' => 'catalog_product',
                'entity_model'     => 'App\Repositories\Backend\Catalog\ProductContract',
                'attribute_model'  => 'App\Repositories\Eav\Catalog\AttributeContract',
                'entity_table'     => 'catalog_product_entity',
                'additional_attribute_table' => 'catalog_eav_attribute',
                'created_at'        => Carbon::now(),
                'updated_at'        => Carbon::now(),
            ],
        ];

        DB::table('eav_entity_type')->insert($entity);

        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}