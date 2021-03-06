@extends ('backend.layouts.master')

@section ('title', trans('backend/store/store.labels.management'))

@section('content')
    <div class="box box-success">
        <div class="box-header with-border">
            <h3 class="box-title">{{ trans('backend/store/store.title') }}</h3>
            <div class="box-tools pull-right">
                <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            </div>
        </div>
        <!-- /.box-header -->

        <div class="box-body form-group attribute-list">
            <div class="box-tools pull-right">
                <a href="{{route('admin.store.store.create')}}" class="margin-bottom-10 btn btn-danger">{{trans('backend/store/store.labels.create')}}</a>
                <a href="{{route('admin.store.group.create')}}" class="margin-bottom-10 btn btn-danger">{{trans('backend/store/group.labels.create')}}</a>
                <a href="{{route('admin.store.website.create')}}" class="margin-bottom-10 btn btn-danger">{{trans('backend/store/website.labels.create')}}</a>
            </div>
            <div class="clearfix"></div>
            <div class="table-container">
                <table class="table table-striped table-bordered table-hover" id="datatable_ajax">
                    <thead>
                    <tr role="row" class="heading">
                        <th>网页</th>
                        <th>商店</th>
                        <th>商店视图</th>
                    </tr>
                    <tr role="row" class="filter">
                        <td>{!! Form::text(null, null, ['class' => 'form-control form-filter']) !!}</td>
                        <td>{!! Form::text(null, null, ['class' => 'form-control form-filter']) !!}</td>
                        <td>{!! Form::text(null, null, ['class' => 'form-control form-filter']) !!}</td>
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
                bFilter:false,
                "language": {
                    "url": "/plugins/datatables/language/Chinese.json"
                },
                "lengthMenu": [[20, 40, 100, -1], [20, 40, 100, "全部"]],
                "pagingType": "bootstrap_extended",
                "oLanguage": {
                    "sProcessing": skFadingCircle()
                },
                "ajax": {
                    "url": "", // ajax source
                },
                columns: [
                    {data: 'website_title', name: 'name'},
                    {data: 'group_title', name: 'group_title'},
                    {data: 'store_title', name: 'store_title'}
                ],
                "orderCellsTop": true,
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