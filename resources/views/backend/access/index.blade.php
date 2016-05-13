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
            <div class="box-tools pull-right">
                @permission('create-users')
                <a href="{{ route('admin.access.users.create') }}"
                   class="btn btn-danger create-user">{{ trans('menus.backend.access.users.create') }}</a>
                @endauth
            </div>
            <div class="clearfix"></div>
            <div class="box-tools pull-right">
                <button class="btn btn-primary fliter-toggle" type="button" data-toggle="collapse"
                        data-target="#collapseExample">
                    <i class="fa fa-filter"></i>筛选
                </button>
            </div>
            <div class="clearfix"></div>
            {!! Form::open(['method' => 'POST','id' => 'user-search','class'=>'form-group']) !!}
                <div class="collapse filter" id="collapseExample">
                <div class="row">
                    <div class="form-group col-xs-3">
                        {!! Form::label('用户名') !!}
                        {!! Form::text('name', null, ['class' => 'form-control']) !!}
                    </div>
                    <div class="form-group col-xs-3">
                        {!! Form::label('邮箱') !!}
                        {!! Form::email('email', null, ['class' => 'form-control']) !!}
                    </div>
                    <div class="form-group col-xs-3">
                        {!! Form::label('激活') !!}
                        {!! Form::select('confirmed', [''=>'请选择',1=>'是',0=>'否'], null, ['class' => 'select2 form-control','style'=>'width: 100%']) !!}
                    </div>
                    <div class="form-group col-xs-3">
                        <label>角色</label>
                        {{ Form::select('roles',$roles, null, array('class' => 'select2 form-control','style'=>'width: 100%;','placeholder'=>'请选择')) }}
                    </div>
                    <div class="form-horizontal">
                        <div class="col-xs-3">
                            <label>ID</label>
                            <div class="form-group">
                                <label class="col-xs-2 control-label">从</label>
                                <div class="col-xs-10">
                                    {!! Form::text('userid[from]', null, ['class' => 'form-control']) !!}
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-2 control-label">到</label>
                                <div class="col-xs-10">
                                    {!! Form::text('userid[to]', null, ['class' => 'form-control']) !!}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-horizontal">
                        <div class="col-xs-3">
                            <label>注册时间</label>
                            <div class="form-group input-daterange datepicker">
                                <label class="col-xs-2 control-label">从</label>
                                {!! Form::text('created_at[from]', null, ['class' => 'form-control','style' => 'width:83.3333333333%;margin-bottom:25px']) !!}
                                <label class="col-xs-2 control-label">到</label>
                                {!! Form::text('created_at[to]', null, ['class' => 'form-control','style' => 'width:83.3333333333%;margin-bottom:25px']) !!}
                            </div>
                        </div>
                    </div>
                    <div class="form-horizontal">
                        <div class="col-xs-3">
                            <label>登录时间</label>
                            <div class="form-group input-daterange datepicker">
                                <label class="col-xs-2 control-label">从</label>
                                {!! Form::text('updated_at[from]', null, ['class' => 'form-control','style' => 'width:83.3333333333%;margin-bottom:25px']) !!}
                                <label class="col-xs-2 control-label">到</label>
                                {!! Form::text('updated_at[to]', null, ['class' => 'form-control','style' => 'width:83.3333333333%;margin-bottom:25px']) !!}
                            </div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="pull-right col-xs-4 text-right">
                        <button class="btn btn-default clearFilter" type="button" data-toggle="collapse" data-target="#collapseExample">
                            取消
                        </button>
                        <button class="btn btn-danger clearFilter" type="button">
                            重置
                        </button>
                        <input class="btn btn-primary" value="确认" type="submit">
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
            {!! Form::close() !!}
            <table class="table table-striped table-bordered table-hover" id="users-table">
                <thead>
                <tr>
                    <th align="center" width="27">{{ trans('labels.backend.access.users.table.id') }}</th>
                    <th>{{ trans('labels.backend.access.users.table.name') }}</th>
                    <th>{{ trans('labels.backend.access.users.table.email') }}</th>
                    <th>{{ trans('labels.backend.access.users.table.confirmed') }}</th>
                    <th>{{ trans('labels.backend.access.users.table.roles') }}</th>
                    <th>{{ trans('labels.backend.access.users.table.other_permissions') }}</th>
                    <th class="visible-lg">{{ trans('labels.backend.access.users.table.created') }}</th>
                    <th class="visible-lg">{{ trans('labels.backend.access.users.table.last_updated') }}</th>
                    <th>{{ trans('labels.general.actions') }}</th>
                </tr>
                </thead>
            </table>

            <div class="clearfix"></div>
        </div><!-- /.box-body -->
    </div><!--box-->
@stop

@section('js')
    @include('vendor.datatables.global')
    <script>
        $(function() {
            var oTable = $('#users-table').DataTable({
                processing: true,
                serverSide: true,
                "bFilter": false,
                ajax: {
                    url: '',
                    data: function (d) {
                        d.name = $('input[name=name]').val();
                        d.email = $('input[name=email]').val();
                        d.confirmed = $('select[name=confirmed]').val();
                        d.roles = $('select[name=roles]').val();
                        d.userid_from = $("input[name='userid[from]']").val();
                        d.userid_to = $("input[name='userid[to]']").val();
                        d.created_from = $("input[name='created_at[from]']").val();
                        d.created_to = $("input[name='created_at[to]']").val();
                        d.updated_from = $("input[name='updated_at[from]']").val();
                        d.updated_to = $("input[name='updated_at[to]']").val();
                    }
                },
                columns: [
                    {data: 'id', name: 'users.id',"orderable": true,"searchable": true},
                    {data: 'name', name: 'users.name',"orderable": true,"searchable": true},
                    {data: 'email', name: 'users.email',"orderable": true,"searchable": true},
                    {data: 'confirmed', name: 'users.confirmed',"orderable": true,"searchable": true},
                    {data: 'roles', name: 'roles.id',"orderable": true,"searchable": true},
                    {data: 'other_permissions', name: 'permissions_id',"orderable": false,"searchable": false},
                    {data: 'created_at', name: 'users.created_at',"orderable": true,"searchable": true},
                    {data: 'updated_at', name: 'users.updated_at',"orderable": true,"searchable": true},
                    {data: 'action', name: 'action', orderable: false, searchable: false}
                ],
                "dom":"<'row'<'col-sm-6'l><'col-sm-6 text-right'B>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-5'i><'col-sm-7'p>>",
                "buttons": ["csv", "excel"],
                "language": {
                    "url": "/js/plugins/datatables/language/Chinese.json"
                },
                "lengthMenu": [[20, 40, 100, -1], [20, 40, 100, "全部"]],
                "fnDrawCallback": function() {
                    $('.select2').select2({
                        minimumResultsForSearch: Infinity
                    });
                    addDeleteForms();
                }
            });
            $('#user-search').on('submit', function(e) {
                oTable.draw();
                e.preventDefault();
            });
            $('.clearFilter').on('click', function(e){
                $('#user-search')[0].reset();
                oTable.ajax.reload();
            });
        })
    </script>
@stop