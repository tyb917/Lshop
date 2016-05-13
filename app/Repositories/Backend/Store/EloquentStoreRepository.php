<?php

namespace App\Repositories\Backend\Store;

use App\Models\Store\Store;
use App\Exceptions\GeneralException;

/**
 * Class EloquentStoreRepository
 * @package App\Repositories\Store
 */
class EloquentStoreRepository implements StoreRepositoryContract
{

    public function getStoresPaginated($per_page, $order_by = 'sort_order', $sort = 'asc')
    {

    }

    public function getAllStores($order_by = 'sort_order', $sort = 'asc')
    {
        return Store::orderBy($order_by, $sort)
            ->get();
    }

    /**
     * @param  $input
     * @throws GeneralException
     * @return bool
     */

    public function create($input)
    {

    }

    /**
     * @param  $id
     * @param  $input
     * @throws GeneralException
     * @return bool
     */
    public function update($id, $input)
    {

    }

    /**
     * @param  $id
     * @throws GeneralException
     * @return bool
     */
    public function destroy($id)
    {

    }

    /**
     * @return mixed
     */
    public function getDefaultStore()
    {

    }
}
