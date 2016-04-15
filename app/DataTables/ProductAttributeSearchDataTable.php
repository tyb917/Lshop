<?php

namespace App\DataTables;

use App\Models\Catalog\ProductAttribute;
use Yajra\Datatables\Services\DataTable;

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
                if ($request->has('name')) {
                    $query->where('users.name', 'like', "%{$request->get('name')}%");
                }

                if ($request->has('email')) {
                    $query->where('users.email', 'like', "%{$request->get('email')}%");
                }

                if ($request->has('confirmed')) {
                    $query->where('users.confirmed', '=', "{$request->get('confirmed')}");
                }

                if ($request->has('roles')) {
                    $query->where('roles.id', '=', "{$request->get('roles')}");
                }

                if($request->has('userid_from') && !$request->has('userid_to')){
                    $query->where('users.id','>=',"{$request->get('userid_from')}");
                }

                if(!$request->has('userid_from') && $request->has('userid_to')){
                    $query->where('users.id','<=',"{$request->get('userid_to')}");
                }
                if($request->has('userid_from') && $request->has('userid_to')){
                    $query->whereBetween('users.id',["{$request->get('userid_from')}","{$request->get('userid_to')}"]);
                }

                if($request->has('created_from') && !$request->has('created_to')){
                    $query->where('users.created_at','>=',"{$request->get('created_from')}");
                }

                if(!$request->has('created_from') && $request->has('created_to')){
                    $query->where('users.created_at','<=',"{$request->get('created_to')}");
                }

                if($request->has('created_from') && $request->has('created_to')){
                    $query->whereBetween('users.created_at',["{$request->get('created_from')}","{$request->get('created_to')}"]);
                }

                if($request->has('updated_from') && !$request->has('updated_to')){
                    $query->where('users.updated_at','>=',"{$request->get('updated_from')}");
                }

                if(!$request->has('updated_from') && $request->has('updated_to')){
                    $query->where('users.updated_at','<=',"{$request->get('updated_to')}");
                }
                if($request->has('updated_from') && $request->has('updated_to')){
                    $query->whereBetween('users.updated_at',["{$request->get('updated_from')}","{$request->get('updated_to')}"]);
                }
            })
            ->editColumn('email', function($user){
                $link = ''.link_to("mailto:".$user->email, $user->email).'';
                return $link;
            })
            ->editColumn('confirmed', function ($user){
                return $user->confirmed_label;
            })
            ->editColumn('roles', function ($user) {
                $ro = '';
                if ($user->roles()->count() > 0){
                    foreach ($user->roles as $role){
                        $ro .= $role->name.'<br>';
                    }
                }
                else{
                    $ro = trans('labels.general.none');
                }
                return  $ro;
            })
            ->editColumn('other_permissions', function ($user) {
                $pe = '';
                if ($user->permissions()->count() > 0){
                    foreach ($user->permissions as $perm){
                        $pe .= $perm->display_name.'<br>';
                    }
                }else{
                    $pe = trans('labels.general.none');
                }
                return  $pe;
            })
            ->addColumn('action', function ($user) {
                return  $user->action_buttons;
            })
            ->removeColumn('payword','confirmation_code','deleted_at','login_num','last_login','telephone','is_active','status','role_id','sort')

            ->make(true);
    }

    /**
     * Get the query object to be processed by datatables.
     *
     * @return \Illuminate\Database\Query\Builder|\Illuminate\Database\Eloquent\Builder
     */
    public function query()
    {
        Route::currentRouteName()=='admin.access.users.deactivated' ? $result = 0 : $result = 1;
        $users = User::select('*','users.name as name','users.id as id')
            ->join("assigned_roles",'assigned_roles.user_id','=','users.id')
            ->join("roles",'roles.id','=','assigned_roles.role_id')
            ->where('status','=',$result);
        return $this->applyScopes($users);
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
                    ->addAction(['width' => '80px'])
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
            'id',
            'name',
            'email',
            'confirmed',
            'roles',
            'other_permissions',
            'created_at',
            'updated_at',
        ];
    }

    /**
     * Get filename for export.
     *
     * @return string
     */
    protected function filename()
    {
        return 'attribute';
    }
}
