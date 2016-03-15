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
            {!! Form::open(['route' => ['admin.access.users.search'],'method' => 'GET','id' => 'users-search']) !!}
            @if(old() && Route::currentRouteName()=='admin.access.users.search')
                <div class="collapse filter in" id="collapseExample">
            @else
                <div class="collapse filter" id="collapseExample">
            @endif
                <div class="row">
                    <div class="form-group col-xs-3">
                        {!! Form::label('用户名') !!}
                        {!! Form::text('username', null, ['class' => 'form-control']) !!}
                    </div>
                    <div class="form-group col-xs-3">
                        {!! Form::label('邮箱') !!}
                        {!! Form::email('email', null, ['class' => 'form-control']) !!}
                    </div>
                    <div class="form-group col-xs-3">
                        {!! Form::label('激活') !!}
                        {!! Form::select('confirmed', [''=>'请选择',1=>'是',0=>'否',], null, ['class' => 'select2 form-control','style'=>'width: 100%']) !!}
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
                        <button class="btn btn-default" type="button" data-toggle="collapse" data-target="#collapseExample">
                            取消
                        </button>
                        <a class="btn btn-danger"  href="{{ route('admin.access.users.index') }}">重置</a>
                        <input class="btn btn-primary" value="确认" type="submit">
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
            {{--<div class="box-tools pull-left form-group">--}}
                {{--<select name="action" class="form-control select2" style="margin-bottom:10px">--}}
                    {{--<option value="">操作</option>--}}
                    {{--<option value="delete">删除</option>--}}
                    {{--<option value="change">停用</option>--}}
                {{--</select>--}}
            {{--</div>--}}
            {{--<div class="clearfix"></div>--}}
            {!! Form::close() !!}
            <div class="table-responsive">
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
                    <tbody>
                    @foreach ($users as $user)
                        <tr>
                            <td align="center">{!! $user->id !!}</td>
                            <td>{!! $user->name !!}</td>
                            <td>{!! link_to("mailto:".$user->email, $user->email) !!}</td>
                            <td>{!! $user->confirmed_label !!}</td>
                            <td>
                                @if ($user->roles()->count() > 0)
                                    @foreach ($user->roles as $role)
                                        {!! $role->name !!}<br/>
                                    @endforeach
                                @else
                                    {{ trans('labels.general.none') }}
                                @endif
                            </td>
                            <td>
                                @if ($user->permissions()->count() > 0)
                                    @foreach ($user->permissions as $perm)
                                        {!! $perm->display_name !!}<br/>
                                    @endforeach
                                @else
                                    {{ trans('labels.general.none') }}
                                @endif
                            </td>
                            <td class="visible-lg">{!! $user->created_at->toDateTimeString() !!}</td>
                            <td class="visible-lg">{!! $user->updated_at->toDateTimeString() !!}</td>
                            <td>{!! $user->action_buttons !!}</td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>

            <div class="pull-left">
                {!! $users->total() !!} {{ trans('labels.backend.access.users.table.total') }}
            </div>

            <div class="pull-right">
                {!! $users->render() !!}
            </div>

            <div class="clearfix"></div>
        </div><!-- /.box-body -->
    </div><!--box-->
@stop

@section('js')
    <link rel="stylesheet" href="/js/buttons/css/buttons.dataTables.css">
    <script src="/js/buttons/js/dataTables.buttons.js"></script>
    <script src="/vendor/datatables/buttons.server-side.js"></script>
    <script>
        $(function() {
            console.log(123);
            var oTable = $('#users-table').DataTable({
                processing: true,
                serverSide: true,
                ajax: {
                    url: '{{ route('admin.access.users.search') }}',
                    data: function (d) {
                        d.name = $('input[name=name]').val();
                        d.email = $('input[name=email]').val();
                        d.confirmed = $('input[name=confirmed]').val();
                        d.roles = $('input[name=roles]').val();
                        d.other_permissions = $('input[name=other_permissions]').val();
                        d.created_at = $('input[name=created_at]').val();
                        d.updated_at = $('input[name=updated_at]').val();
                    }
                },
                columns: [
                    {data: 'id', name: 'id'},
                    {data: 'name', name: 'name'},
                    {data: 'email', name: 'email'},
                    {data: 'confirmed', name: 'confirmed'},
                    {data: 'roles', name: 'roles'},
                    {data: 'other_permissions', name: 'other_permissions'},
                    {data: 'created_at', name: 'created_at'},
                    {data: 'updated_at', name: 'updated_at'},
                    {data: 'action', name: 'action', orderable: false, searchable: false}
                ]
            });
            $('#user-search').on('submit', function(e) {
                oTable.draw();
                e.preventDefault();
            });
        })
    </script>
@stop