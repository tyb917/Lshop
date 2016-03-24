@extends ('backend.layouts.master')

@section ('title', trans('labels.backend.category.management'))

@section('css')
    <link rel="stylesheet" href="{{asset('plugins/jstree/dist/themes/default/style.min.css')}}">
@stop

@section('content')
<div class="row">
    <div class="col-xs-2">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">{{ trans('strings.backend.category.management') }}</h3>
                <div class="box-tools pull-right">
                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                </div>
            </div>
            <div class="box-body">
                <div id="category_tree"></div>
            </div>
        </div>
    </div>

    <div class="col-xs-10 category-product">
        <div class="nav-tabs-custom">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active">
                    <a href="#roles_1" data-toggle="tab">
                        {{ trans('labels.backend.category.general') }}
                    </a>
                </li>
                <li role="presentation">
                    <a href="#roles_2" data-toggle="tab">
                        {{ trans('labels.backend.category.product') }}
                    </a>
                </li>
            </ul><!-- Tab panes -->
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="roles_1">
                    {!! Form::model($categories,['route' => ['admin.categories.update', $categories->id], 'id' => 'category','class'=>'form-horizontal','method' => 'PATCH','enctype'=>'multipart/form-data']) !!}
                    <div class="form-group">
                        <label class="col-xs-2 control-label">名称</label>
                        <div class="col-xs-7">
                            <input type="text" class="form-control" placeholder="名称" value="{!! $categories->name !!}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-2 control-label">激活</label>
                        <div class="col-xs-7">
                            {!! Form::select('is_active', [1=>'是',0=>'否'], null, ['class' => 'select2 form-control','style'=>'width: 100%']) !!}
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-2 control-label">链接</label>
                        <div class="col-xs-7">
                            {!! Form::text('url', $categories->url, ['class' => 'form-control','placeholder'=>'链接']) !!}
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-2 control-label">描述</label>
                        <div class="col-xs-7">
                            {!! Form::textarea('description', $categories->description, ['class' => 'form-control','id' => 'editor','placeholder'=>'描述','rows'=>'4']) !!}
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-2 control-label">图像</label>
                        <div class="col-xs-7">
                            @if($categories->image)
                                <a href="http://www.testmagento.com/media/catalog/category/d38b5d479d2ff00dd23714e1793f6a0b.png" onclick="imagePreview('group_4image_image'); return false;"><img src="http://www.testmagento.com/media/catalog/category/d38b5d479d2ff00dd23714e1793f6a0b.png" id="group_4image_image" title="d38b5d479d2ff00dd23714e1793f6a0b.png" alt="d38b5d479d2ff00dd23714e1793f6a0b.png" height="22" width="22" class="small-image-preview v-middle"></a>
                            @endif
                            {!! Form::file('image', ['class' => 'category-img','placeholder'=>'图像']) !!}
                            @if($categories->image)
                                {!! Form::hidden('general[image][value]',$categories->image) !!}
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" name="general[image][delete]" value="1"> 删除图像
                                    </label>
                                </div>
                            @endif
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-2 control-label">页面标题</label>
                        <div class="col-xs-7">
                            {!! Form::text('meta_title', $categories->meta_title, ['class' => 'form-control','placeholder'=>'页面标题']) !!}
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-2 control-label">页面关键词</label>
                        <div class="col-xs-7">
                            {!! Form::textarea('meta_keywords', $categories->meta_keywords, ['class' => 'form-control','placeholder'=>'页面关键词','rows'=>'4']) !!}
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-2 control-label">页面描述</label>
                        <div class="col-xs-7">
                            {!! Form::textarea('meta_description', $categories->meta_description, ['class' => 'form-control','placeholder'=>'页面描述','rows'=>'4']) !!}
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-xs-7 col-xs-offset-2">
                        <button href="{{route('admin.categories.destroy', $categories->id)}}" data-method="delete" class="btn btn-danger" data-toggle="tooltip" data-placement="top" type="button">
                            {{trans('buttons.general.crud.delete')}}
                        </button>
                        <input class="btn btn-primary" value="确认" type="submit">
                        </div>
                    </div>
                    {!! Form::close() !!}
                </div>
                <div role="tabpanel" class="tab-pane" id="roles_2">
                    roles_2
                </div>
            </div>
        </div>
    </div>
</div>
@stop

@section('js')
    @include('UEditor::head');
    <script src="{{asset('plugins/jstree/dist/jstree.min.js')}}"></script>
    <script>
        $(function () {
            $("#category_tree").jstree({
                core: {
                    themes: {
                        responsive: !1
                    },
                    check_callback: !0,
                    data: {
                        url: function(e) {
                            return "{{ route('admin.categories.children') }}"
                        },
                        data: function(e) {
                            return {
                                parent: e.id
                            }
                        }
                    }
                },
                'force_text' : true,
                plugins: ["dnd", "state", "types","unique",'contextmenu','wholerow'],
                "contextmenu":{
                    "items": function($node) {
                        var tree = $("#category_tree").jstree(true);
                        return {
                            "Create": {
                                "separator_before": false,
                                "separator_after": false,
                                "label": "创建分类",
                                "action": function (obj) {
                                    $node = tree.create_node($node);
                                    tree.edit($node);
                                }
                            },
                            "Rename": {
                                "separator_before": false,
                                "separator_after": false,
                                "label": "重命名",
                                "action": function (obj) {
                                    tree.edit($node);
                                }
                            },
                            "Delete": {
                                "separator_before": false,
                                "separator_after": false,
                                "label": "删除分类",
                                "action": function (obj) {
                                    tree.delete_node($node);
                                }
                            },
                            "Move": {
                                "separator_before": false,
                                "separator_after": false,
                                "label": "移动分类",
                                "action": function (obj) {
                                    tree.move_node($node);
                                }
                            }
                        };
                    }
                }
            })
            .on('delete_node.jstree', function (e, data) {
                $.post("/admin/categories/"+data.node.id, { '_method' : 'delete', '_token' : '{{ csrf_token() }}' })
                        .fail(function () {
                            data.instance.refresh();
                        });
            })
            .on('create_node.jstree', function (e, data) {
                $.post("{{ route('admin.categories.store') }}", { 'id' : data.node.parent, 'name' : data.node.text, '_token' : '{{ csrf_token() }}' })
                        .done(function (d) {
                            data.instance.set_id(data.node, d.id);
                        })
                        .fail(function () {
                            data.instance.refresh();
                        });
            })
            .on('rename_node.jstree', function (e, data) {
                $.post("/admin/categories/"+data.node.id, { 'name' : data.text, '_token' : '{{ csrf_token() }}','_method':'PATCH' })
                        .fail(function () {
                            data.instance.refresh();
                        });
            })
            .on('move_node.jstree', function (e, data) {
                $.post("{{ route('admin.categories.move') }}", { 'id' : data.node.id, 'parent' : data.parent, '_token' : '{{ csrf_token() }}' })
                        .fail(function () {
                            data.instance.refresh();
                        });
            })
            .on('changed.jstree', function (e, data) {
                if(data && data.selected && data.selected.length) {
                    $.get('?id=' + data.selected.join(':'), function (d) {
                        $('.category-product').html($(d).find('.category-product').html());
                        addDeleteForms();
                    });
                }
            })
        })

        /*实例化编辑器*/
        var ue = UE.getEditor('editor',{
            initialFrameHeight:350,//设置编辑器高度
            scaleEnabled:true
        });
        ue.ready(function() {
            ue.execCommand('serverparam', '_token', '{{ csrf_token() }}');//此处为支持laravel5 csrf ,根据实际情况修改,目的就是设置 _token 值.
        });
    </script>
@stop