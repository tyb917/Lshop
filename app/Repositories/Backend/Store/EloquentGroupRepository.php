<?php

namespace App\Repositories\Backend\Store;

use App\Exceptions\GeneralException;

/**
 * Class EloquentStoreRepository
 * @package App\Repositories\Store
 */
class EloquentGroupRepository implements GroupRepositoryContract
{

    public function getGroupsPaginated($per_page, $order_by = 'group_id', $sort = 'asc')
    {

    }

    public function getAllGroups($order_by = 'group_id', $sort = 'asc')
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
    public function getDefaultGroup()
    {

    }
}
