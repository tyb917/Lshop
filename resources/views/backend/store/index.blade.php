@extends ('backend.layouts.master')

@section ('title', trans('backend/store/store.labels.management'))

@section('content')
    <div class="box box-success">
        <div class="box-header with-border">
            <h3 class="box-title">{{ trans('backend/store/store.labels.attribute') }}</h3>
            <div class="box-tools pull-right">
                <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            </div>
        </div>
        <!-- /.box-header -->

        <div class="box-body form-group attribute-list">
            <div class="box-tools pull-right">
                <a href="{{url('admin/store/store/create')}}" class="margin-bottom-10 btn btn-danger create-attribute">{{trans('backend/store/store.labels.create')}}</a>
            </div>
            <div class="clearfix"></div>
            <div class="table-container">

            </div>

            <div class="clearfix"></div>
        </div><!-- /.box-body -->
    </div><!--box-->
@stop

@section('js')

@stop