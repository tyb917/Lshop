<?php

namespace App\Repositories\Backend\Store;

use App\Exceptions\GeneralException;

/**
 * Class EloquentStoreRepository
 * @package App\Repositories\Store
 */
class EloquentStoreRepository implements StoreRepositoryContract
{

    public function getStoresPaginated($per_page, $order_by = 'sort', $sort = 'asc')
    {

    }

    public function getAllStores($order_by = 'sort', $sort = 'asc', $withPermissions = false)
    {

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
