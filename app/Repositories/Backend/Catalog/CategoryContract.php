<?php

namespace App\Repositories\Backend\Catalog;

interface CategoryContract
{
    /**
     * @param $id
     * @return mixed
     */
    public function delete($id);

    /**
     * @param $id
     * @param $name
     * @return mixed
     */
    public function update($id, $input);

}