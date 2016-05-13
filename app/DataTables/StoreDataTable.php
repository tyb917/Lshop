<?php

namespace App\DataTables;

use App\Models\Store\Website;
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
                if ($request->has('website_title')) {
                    $query->where('store_website.name', 'like', "%{$request->get('website_title')}%");
                }
                if ($request->has('group_title')) {
                    $query->where('group_title', 'like', "%{$request->get('group_title')}%");
                }
                if ($request->has('store_title')) {
                    $query->where('store_title', 'like', "%{$request->get('store_title')}%");
                }
            })
            ->editColumn('website_title', function($website){
                $link = $website->getWebsiteButtonAttribute();
                return $link;
            })
            ->editColumn('group_title', function($website){
                $link = $website->getGroupButtonAttribute();
                return $link;
            })
            ->editColumn('store_title', function($website){
                $link = $website->getStoreButtonAttribute();
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
        $websites = Website::select('store_website.*', 'store_group.group_id', 'store_group.name AS group_title', 'store.store_id', 'store.name AS store_title')
            ->leftJoin('store_group AS store_group','store_website.website_id','=','store_group.website_id')
            ->leftJoin('store AS store','store_group.group_id','=','store.group_id')
            ->where('store_website.website_id','>',0)
            ->orderBy('store_group.name','ASC')
            ->orderBy(DB::raw('CASE WHEN `store`.`store_id` = 0 THEN 0 ELSE 1 END'),'ASC')
            ->orderBy('store.sort_order','ASC')
            ->orderBy('store.name','ASC');
        return $this->applyScopes($websites);
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
