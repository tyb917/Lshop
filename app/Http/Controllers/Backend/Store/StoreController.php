<?php

namespace App\Http\Controllers\Backend\Store;

use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\DataTables\WebsiteDataTable;
use App\Http\Requests\Backend\Store\StoreRequest;
use App\Repositories\Backend\Store\WebsiteRepositoryContract;
use App\Repositories\Backend\Store\GroupRepositoryContract;

class StoreController extends Controller
{

    protected $websites;
    protected $groups;

    public function __construct(
        WebsiteRepositoryContract $websites,
        GroupRepositoryContract $groups

    )
    {
        $this->websites = $websites;
        $this->groups = $groups;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(WebsiteDataTable $datatable)
    {
        $websites = $this->websites->getAllWebsites();
        return $datatable->render('backend.store.index',['websites' => $websites]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $allwebsites = $this->websites->getAllWebsites();
        $allgroups = $this->groups->getAllGroups();
        $group_ids = [];
        foreach ($allwebsites as $singletonwebsite) {
            $values = [];
            foreach ($allgroups as $singletongroup) {
                if ($singletongroup->website_id == $singletonwebsite->website_id) {
                    $values[$singletongroup->group_id] = $singletongroup->name;
                }
            }
            $group_ids[$singletonwebsite->name] = $values;
        }
        return view('backend.store.create',compact('group_ids'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRequest $request)
    {

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        dd($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
