<?php

namespace App\Http\Controllers\Backend\Category;

use File;
use Config;
use App\Http\Requests;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Exceptions\GeneralException;
use App\Repositories\Backend\Category\CategoryContract;

class CategoryController extends Controller
{
    /**
     * @var UserContract
     */
    protected $categories;

    public function __construct(CategoryContract $categories)
    {
        $this->categories = $categories;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
//        生成示例数据
//        $root = Category::create(['name' => 'Root category']);
//        $children = [
//            ['name' => 'TV & Home Theather'],
//            ['name' => 'Tablets & E-Readers'],
//            ['name' => 'Computers', 'children' => [
//                ['name' => 'Laptops', 'children' => [
//                    ['name' => 'PC Laptops'],
//                    ['name' => 'Macbooks (Air/Pro)']
//                ]],
//                ['name' => 'Desktops'],
//                ['name' => 'Monitors']
//            ]],
//            ['name' => 'Cell Phones']
//        ];
//
//        $electronics = Category::where('name', '=', 'Root category')->first();
//        $electronics->makeTree($children);
        $id = $request->id;
        if($id){
            $categories = Category::root()->find($id);
        }else{
            $categories = Category::root();
        }
        return view('backend.category.index',compact('categories'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $id = $request->id;
        $name = $request->name;
        $categories = Category::root()->find($id);
        $children = Category::create(['name' => $name]);
        $children->makeChildOf($categories);
        return ['id'=>$children->id];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
    public function update($id, Request $request)
    {
        if($request->hasFile('image')){
            $file = $request->file('image');
            if($file->isValid()){
                $type = $file->getMimeType();
                $clientName = $file->getClientOriginalName();
                $extension = $file->getClientOriginalExtension();
                $dir = public_path(Config::get('image.category'));
                $newName = md5($clientName).'.'.$extension;
                if($type == 'image/jpeg' || $type == 'image/png' || $type == 'image/gif'){
                    $file->move($dir.DS.$id,$newName);
                }else{
                    throw new GeneralException('允许上传的图片格式为JPG, PNG, GIF');
                }
            }else{
                throw new GeneralException($file->getErrorMessage());
            }
        }
        //$request['image'] = $newName;
        $this->categories->update($id,$request->except('_token'));
        //$this->categories->update($id,['image'=>$newName]);
        return redirect()->route('admin.categories.index')->withFlashSuccess(trans('alerts.backend.categories.updated'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->categories->delete($id);
        return redirect()->route('admin.categories.index')->withFlashSuccess(trans('alerts.backend.categories.deleted'));
    }

    /**
     * @param Request $request
     */
    public function children(Request $request)
    {
        $parent = $request->parent;
        if ($parent == "#") {
            $catetories = Category::root();
            $children = $catetories->children()->get();
            $data[] = array(
                "id" => $catetories->id,
                "text" => $catetories->name,
                "icon" => "fa fa-folder icon-lg icon-state-warning",
                "children" => $children ? true : flase,
                "type" => "root"
            );
        }else{
            $catetories = Category::root()->find($parent)->getImmediateDescendants();
            foreach($catetories as $descendant) {
                $children = $descendant->isLeaf();
                $data[] = array(
                    "id" => $descendant->id,
                    "text" => $descendant->name,
                    "icon" => "fa fa-folder icon-lg icon-state-warning",
                    "children" => !$children ? true : false
                );
            }
        }
        return isset($data) ? $data : null ;
    }

    public function move(Request $request)
    {
        $id = $request->id;
        $parent = $request->parent;
        $catetorie = Category::root()->find($parent);
        $children = Category::root()->find($id);
        $children->makeChildOf($catetorie);
    }

    public function copy(Request $request)
    {
        $id = $request->id;
        $parent = $request->parent;
        $categories = Category::root()->find($parent);
        $childrens = Category::root()->find($id)->getDescendantsAndSelf();
    }
}
