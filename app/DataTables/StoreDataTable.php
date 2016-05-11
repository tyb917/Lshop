<?php

namespace App\DataTables;

use App\Models\Store\Store;
use Illuminate\Support\Facades\DB;
use Yajra\Datatables\Services\DataTable;

class StoreDataTable extends DataTable
{
    // protected $printPreview  = 'path.to.print.preview.view';

    /**
     * Display ajax response.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function ajax()
    {
        $request = $this->request();
        return $this->datatables
            ->eloquent($this->query())
            ->filter(function ($query) use ($request) {
                if ($request->has('website_name')) {
                    $query->where('store_website.name', 'like', "%{$request->get('website_name')}%");
                }
                if ($request->has('group_name')) {
                    $query->where('store_group.name', 'like', "%{$request->get('group_name')}%");
                }
                if ($request->has('store_title')) {
                    $query->where('name', 'like', "%{$request->get('name')}%");
                }
            })
            ->editColumn('website_name', function($store){
                $link = $store->getWebsiteButtonAttribute();
                return $link;
            })
            ->editColumn('group_name', function($store){
                $link = $store->getGroupButtonAttribute();
                return $link;
            })
            ->editColumn('name', function($store){
                $link = $store->getStoreButtonAttribute();
                return $link;
            })
            ->make(true);
    }

    /**
     * Get the query object to be processed by datatables.
     *
     * @return \Illuminate\Database\Query\Builder|\Illuminate\Database\Eloquent\Builder
     */
    public function query()
    {
        $stores = Store::join('store_group','store.group_id','=','store_group.group_id')
            ->join('store_website','store.website_id','=','store_website.website_id')
            ->select('store.*', 'store_group.id as group_id', 'store_group.name as group_name', 'store_website.id as website_id', 'store_website.name as website_name')
            ->where('store_id','>',0)
            ->orderBy('store_id');
        return $this->applyScopes($stores);
    }

    /**
     * Optional method if you want to use html builder.
     *
     * @return \Yajra\Datatables\Html\Builder
     */
    public function html()
    {
        return $this->builder()
            ->columns($this->getColumns())
            ->ajax('')
            ->parameters($this->getBuilderParameters());
    }

    /**
     * Get columns.
     *
     * @return array
     */
    private function getColumns()
    {
        return [

        ];
    }

    /**
     * @return string
     */
    protected function filename()
    {
        return 'stores';
    }
}
