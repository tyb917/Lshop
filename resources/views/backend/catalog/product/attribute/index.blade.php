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
                            <th>网格可见</th>
                            <th>范围</th>
                            <th>可搜索</th>
                            <th>分类属性导航</th>
                            <th>可比较的</th>
                        </tr>
                        <tr role="row" class="filter">
                            <td>{!! Form::text(null, null, ['class' => 'form-control form-filter']) !!}</td>
                            <td>{!! Form::text(null, null, ['class' => 'form-control form-filter']) !!}</td>
                            <td>{!! Form::select(null,[''=>'请选择',1=>'是',0=>'否'], null,['class' => 'form-control form-filter select2']) !!}</td>
                            <td>{!! Form::select(null,[''=>'请选择',1=>'是',0=>'否'], null,['class' => 'form-control form-filter select2']) !!}</td>
                            <td>{!! Form::select(null,[''=>'请选择',1=>'是',0=>'否'], null,['class' => 'form-control form-filter select2']) !!}</td>
                            <td>{!! Form::select(null,[''=>'请选择',2=>'网页',1=>'全局',0=>'商店视图'], null,['class' => 'form-control form-filter select2']) !!}</td>
                            <td>{!! Form::select(null,[''=>'请选择',1=>'是',0=>'否'], null,['class' => 'form-control form-filter select2']) !!}</td>
                            <td>{!! Form::select(null,[''=>'请选择',2=>'滤过性的(没有结果)',1=>'滤过性的(结果)',0=>'否'], null,['class' => 'form-control form-filter select2']) !!}</td>
                            <td>{!! Form::select(null,[''=>'请选择',1=>'是',0=>'否'], null,['class' => 'form-control form-filter select2']) !!}</td>
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
                "bFilter": true,
                "language": {
                    "url": "/plugins/datatables/language/Chinese.json"
                },
                "lengthMenu": [[20, 40, 100, -1], [20, 40, 100, "全部"]],
                "pagingType": "bootstrap_extended",
                "ajax": {
                    "url": "", // ajax source
                },
                columns: [
                    {data: 'attribute_code', name: 'eav_attribute.attribute_code'},
                    {data: 'frontend_label', name: 'eav_attribute.frontend_label'},
                    {data: 'is_required', name: 'is_required'},
                    {data: 'is_user_defined', name: 'is_user_defined'},
                    {data: 'is_visible_in_grid', name: 'is_visible_in_grid'},
                    {data: 'is_global', name: 'is_global'},
                    {data: 'is_searchable', name: 'is_searchable'},
                    {data: 'is_filterable', name: 'is_filterable'},
                    {data: 'is_comparable', name: 'is_comparable'}
                ],
                "dom":"<'row'<'col-sm-6'l><'col-sm-6 text-right'B>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-5'i><'col-sm-7'p>>",
                "buttons": [],
                "orderCellsTop": true,
                "fnRowCallback": function( nRow, aData) {
                    var id = aData.attribute_id;
                    $(nRow).attr("data-id", id).addClass('clickable');
                    return nRow;
                },
                "fnDrawCallback": function() {
                    $('#datatable_ajax tbody').on('click', 'tr', function () {
                        var id = $(this).attr("data-id");
                        window.location = '{!! url('admin/catalog/product_attribute') !!}' + '/' + id + '/edit';
                    })
                },
                "initComplete": function () {
                    oTable.columns().every(function (colIdx) {
                        var column = this;
                        $('.filter td:eq('+colIdx+') input').on('keyup', function () {
                            if(event.keyCode == "13") column.search($(this).val()).draw();
                        });

                        $('.filter td:eq('+colIdx+') select').on('change', function () {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );
                            column.search( val ? '^'+val+'$' : '', true, false ).draw();
                        });
                    });
                }
            });
        })
    </script>
@stop