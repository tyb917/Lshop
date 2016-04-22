<?php

namespace App\DataTables;

use Yajra\Datatables\Services\DataTable;
use App\Models\Catalog\Product\ProductAttribute;
use App\Repositories\Backend\Catalog\ProductEttributeContract;

class ProductAttributeSearchDataTable extends DataTable
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
                if ($request->has('attribute_code')) {
                    $query->where('eav_attribute.attribute_code', 'like', "%{$request->get('attribute_code')}%");
                }
                if ($request->has('frontend_label')) {
                    $query->where('eav_attribute.frontend_label', 'like', "%{$request->get('frontend_label')}%");
                }
            })
            ->editColumn('is_required',function($attributes){
                if($attributes->is_required){
                    return '是';
                }else{
                    return '否';
                }
            })
            ->editColumn('is_user_defined',function($attributes){
                if($attributes->is_user_defined){
                    return '是';
                }else{
                    return '否';
                }
            })
            ->editColumn('is_visible_in_grid',function($attributes){
                if($attributes->is_visible_in_grid){
                    return '是';
                }else{
                    return '否';
                }
            })
            ->editColumn('is_global',function($attributes){
                if($attributes->is_global==1){
                    return '全局';
                }else if($attributes->is_global==2){
                    return '网页';
                }else{
                    return '商店视图';
                }
            })
            ->editColumn('is_searchable',function($attributes){
                if($attributes->is_searchable){
                    return '是';
                }else{
                    return '否';
                }
            })
            ->editColumn('is_filterable',function($attributes){
                if($attributes->is_filterable==1){
                    return '滤过性的(结果)';
                }else if($attributes->is_filterable==1){
                    return '滤过性的(没有结果)';
                }else{
                    return '否';
                }
            })
            ->editColumn('is_comparable',function($attributes){
                if($attributes->is_comparable){
                    return '是';
                }else{
                    return '否';
                }
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
        $attributes = ProductAttribute::join('eav_attribute','eav_attribute.attribute_id','=','catalog_eav_attribute.attribute_id')
        ->where('is_visible','=',1)
        ->where('eav_attribute.entity_type_id','=',4);
        return $this->applyScopes($attributes);
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
            'attribute_code',
            'frontend_label',
            'is_required',
            'is_user_defined',
            'is_visible_in_grid',
            'is_global',
            'is_searchable',
            'is_filterable',
            'is_comparable',
        ];
    }

    /**
     * @return string
     */
    protected function filename()
    {
        return 'attribute';
    }
}
