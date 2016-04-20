@extends ('backend.layouts.master')

@section ('title', trans('labels.backend.access.users.management'))

@section('content')
    <div class="box box-success">
        <div class="box-header with-border">
            <h3 class="box-title">{{ trans('labels.backend.access.users.active') }}</h3>
            <div class="box-tools pull-right">
                <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            </div>
        </div>
        <!-- /.box-header -->

        <div class="box-body form-group user-list">
            <div class="table-container">
                <table class="table table-striped table-bordered table-hover" id="datatable_ajax">
                    <thead>
                    <tr role="row" class="heading">
                        <th>属性代码</th>
                        <th>默认名称</th>
                        <th>必须项</th>
                        <th>系统</th>
                        <th>可见的</th>
                        <th>范围</th>
                        <th>可搜索</th>
                        <th>分类属性导航</th>
                        <th>可比较的</th>
                    </tr>
                    <tr role="row" class="filter">
                        <td>{!! Form::text('name', null, ['class' => 'form-control form-filter']) !!}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>

            <div class="clearfix"></div>
        </div><!-- /.box-body -->
    </div><!--box-->
@stop

@section('js')
    @include('vendor.datatables.global')
    <script>
        $(function() {
            var oTable = $('#datatable_ajax').DataTable({
                processing: true,
                serverSide: true,
                "bFilter": false,
                "bStateSave": true,
                "language": {
                    "url": "/plugins/datatables/language/Chinese.json"
                },
                "lengthMenu": [[20, 40, 100, -1], [20, 40, 100, "全部"]],
                "ajax": {
                    "url": "", // ajax source
                },
                columns: [
                    {data: 'attribute_code', name: 'eav_attribute.attribute_code'},
                    {data: 'frontend_label', name: 'eav_attribute.frontend_label'},
                    {data: 'is_required', name: 'is_required'},
                    {data: 'is_user_defined', name: 'is_user_defined'},
                    {data: 'is_visible', name: 'is_visible'},
                    {data: 'is_global', name: 'is_global'},
                    {data: 'is_searchable', name: 'is_searchable'},
                    {data: 'is_filterable', name: 'is_filterable'},
                    {data: 'is_comparable', name: 'is_comparable'}
                ],
                "orderCellsTop": true,
                "fnRowCallback": function( nRow, aData) {
                    var id = aData.id;
                    $(nRow).attr("data-id", id);
                    return nRow;
                },
                "fnDrawCallback": function() {
                    $('.select2').select2({
                        minimumResultsForSearch: Infinity
                    });
                    $('#users-table tbody').on('click', 'tr', function () {
                        var id = $(this).attr("data-id");
                        window.location = id + '/edit';
                    })
                }
            });
        })
    </script>
@stop