<?php

namespace App\Repositories\Backend\Store;

/**
 * Interface WebsiteRepositoryContract
 * @package App\Repositories\Website
 */
interface WebsiteRepositoryContract
{
    public function getWebsitesPaginated($per_page, $order_by = 'sort_order', $sort = 'asc');

    /**
     * @param  string  $order_by
     * @param  string  $sort
     * @param  bool    $withPermissions
     * @return mixed
     */
    public function getAllWebsites($order_by = 'sort_order', $sort = 'asc');

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
    public function getDefaultWebsite();
}
