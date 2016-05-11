<?php

namespace App\Repositories\Backend\Store;

use App\Exceptions\GeneralException;

/**
 * Class EloquentWebSiteRepository
 * @package App\Repositories\WebSite
 */
class EloquentWebSiteRepository implements WebsiteRepositoryContract
{

    public function getWebSitesPaginated($per_page, $order_by = 'sort', $sort = 'asc')
    {

    }

    public function getAllWebSites($order_by = 'sort', $sort = 'asc', $withPermissions = false)
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
    public function getDefaultWebSite()
    {

    }
}
