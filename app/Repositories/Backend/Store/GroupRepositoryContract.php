<?php

namespace App\Repositories\Backend\Store;

/**
 * Interface StoreRepositoryContract
 * @package App\Repositories\Store
 */
interface GroupRepositoryContract
{
    public function getGroupsPaginated($per_page, $order_by = 'group_id', $sort = 'asc');

    /**
     * @param  string  $order_by
     * @param  string  $sort
     * @param  bool    $withPermissions
     * @return mixed
     */
    public function getAllGroups($order_by = 'group_id', $sort = 'asc');

    /**
     * @param  $input
     * @return mixed
     */
    public function create($input);

    /**
     * @param  $id
     * @param  $input
     * @return mixed
     */
    public function update($id, $input);

    /**
     * @param  $id
     * @return mixed
     */
    public function destroy($id);

    /**
     * @return mixed
     */
    public function getDefaultGroup();
}
