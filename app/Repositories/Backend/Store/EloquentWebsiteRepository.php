<?php

namespace App\Repositories\Backend\Store;

use App\Models\Store\Website;
use App\Exceptions\GeneralException;

/**
 * Class EloquentWebsiteRepository
 * @package App\Repositories\Website
 */
class EloquentWebsiteRepository implements WebsiteRepositoryContract
{

    public function getWebsitesPaginated($per_page, $order_by = 'sort_order', $sort = 'asc')
    {

    }

    public function getAllWebsites($order_by = 'sort_order', $sort = 'asc')
    {
        return Website::orderBy($order_by, $sort)
            ->where('website_id','>',0)
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
    public function getDefaultWebsite()
    {

    }
}
