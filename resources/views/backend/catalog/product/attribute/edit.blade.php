@extends ('backend.layouts.master')

@section ('title', trans('backend/catalog/product/attribute.labels.management'))

@section('content')
<div class="box box-success">
    <div class="box-header with-border">
        <h3 class="box-title">{{ trans('backend/catalog/product/attribute.labels.edit') }}</h3>
        <div class="box-tools pull-right">
            <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
        </div>
    </div>
    <!-- /.box-header -->
    编辑
</div><!--box-->
@stop

@section('js')
@include('vendor.datatables.global')
<script>

</script>
@stop