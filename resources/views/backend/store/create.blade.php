@extends ('backend.layouts.master')

@section ('title', trans('backend/store/store.labels.management'))

@section('content')
    <div class="box box-success">
        <div class="box-header with-border">
            <h3 class="box-title">{{ trans('backend/store/store.labels.title') }}</h3>
            <div class="box-tools pull-right">
                <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            </div>
        </div>
        <!-- /.box-header -->

        <div class="box-body form-group store-add">
            {!! Form::open(['url' => 'admin/store/store','id'=>'edit_form','class'=>'form-horizontal', 'method' => 'post']) !!}
            <div class="box-tools pull-right">
                <a href="{{URL::previous()}}" class="margin-bottom-10 btn btn-default">{{trans('global/buttons.back')}}</a>
                <input type="button" class="margin-bottom-10 btn btn-default reset" value="{{trans('global/buttons.reset')}}">
                <input type="submit" class="margin-bottom-10 btn btn-danger" value="{{trans('backend/store/store.labels.save')}}">
            </div>
            <div class="clearfix"></div>

            <div class="field form-group">
                <label class="col-xs-2 control-label">
                    商店
                    <span class="required">*</span>
                </label>
                <div class="col-xs-2">
                    {!! Form::select('group_id',['1'=>'是','0'=>'否'],0,['id'=>'store_group_id','class' => 'form-control select2','title'=>'商店']) !!}
                </div>
            </div>
            <div class="field form-group ">

                <label class="col-xs-2 control-label">
                    名称
                    <span class="required">*</span>
                </label>
                <div class="col-xs-6">
                    {!! Form::text('name',null,['id' => 'store_name','class' => 'form-control']) !!}
                </div>
            </div>
            <div class="field form-group ">
                <label class="col-xs-2 control-label">
                    代码
                    <span class="required">*</span>
                </label>
                <div class="col-xs-6">
                    {!! Form::text('code',null,['id' => 'store_code','class' => 'form-control']) !!}
                </div>
            </div>
            <div class="field form-group">
                <label class="col-xs-2 control-label">
                    状态
                    <span class="required">*</span>
                </label>
                <div class="col-xs-2">
                    {!! Form::select('is_active',['1'=>'是','0'=>'否'],0,['id'=>'store_is_active','class' => 'form-control select2']) !!}
                </div>
            </div>
            <div class="field form-group ">
                <label class="col-xs-2 control-label">
                    排序次序
                </label>
                <div class="col-xs-6">
                    {!! Form::text('sort_order',null,['id' => 'store_sort_order','class' => 'form-control']) !!}
                </div>
            </div>
            {!! Form::close() !!}
        </div><!-- /.box-body -->
    </div><!--box-->
@stop

@section('js')
    @include('vendor.datatables.global')
    <script>
        $(function() {
        })
    </script>
@stop