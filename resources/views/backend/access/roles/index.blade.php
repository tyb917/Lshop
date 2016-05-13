@extends ('backend.layouts.master')

@section ('title', trans('labels.backend.access.permissions.management'))

@section('page-header')
    <h1>{{ trans('labels.backend.access.permissions.management') }}</h1>
@endsection

@section('after-styles-end')
    {!! Html::style('css/backend/plugin/nestable/jquery.nestable.css') !!}
@stop

@section('content')
    <div class="box box-success">
        <div class="box-header with-border">
            <h3 class="box-title">{{ trans('labels.backend.access.permissions.management') }}</h3>
            <div class="box-tools pull-right">
                <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            </div>
        </div><!-- /.box-header -->
        <div class="box-body roles-list">
            @permission(['create-roles','create-permission-groups', 'create-permissions'])
            <div class="box-tools pull-right">
                <div class="btn-group">
                    <button type="button" class="btn btn-danger dropdown-toggle create-role" data-toggle="dropdown" aria-expanded="false">
                        {{ trans('menus.backend.access.roles.main') }}<i class="fa fa-angle-down"></i>
                    </button>
                    <ul class="dropdown-menu pull-right" role="menu">
                        @permission('create-roles')
                        <li><a href="{{ route('admin.access.roles.create') }}">{{ trans('menus.backend.access.roles.create') }}</a></li>
                        @endauth

                        @permission('create-permission-groups')
                        <li><a href="{{ route('admin.access.roles.permission-group.create') }}">{{ trans('menus.backend.access.permissions.groups.create') }}</a></li>
                        @endauth

                        @permission('create-permissions')
                        <li><a href="{{ route('admin.access.roles.permissions.create') }}">{{ trans('menus.backend.access.permissions.create') }}</a></li>
                        @endauth
                    </ul>
                </div><!--btn group-->
            </div>
            <div class="clearfix"></div>
            @endauth
            <div>
                <!-- Nav tabs -->
                <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active">
                        <a href="#roles" aria-controls="roles" role="tab" data-toggle="tab">
                            {{ trans('labels.backend.access.permissions.tabs.roles') }}
                        </a>
                    </li>
                    <li role="presentation">
                        <a href="#groups" aria-controls="groups" role="tab" data-toggle="tab">
                            {{ trans('labels.backend.access.permissions.tabs.groups') }}
                        </a>
                    </li>
                    <li role="presentation">
                        <a href="#permissions" aria-controls="permissions" role="tab" data-toggle="tab">
                            {{ trans('labels.backend.access.permissions.tabs.permissions') }}
                        </a>
                    </li>
                </ul><!-- Tab panes -->
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active" id="roles" style="padding-top:20px">

                        <div class="table-responsive">
                            <table class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>{{ trans('labels.backend.access.roles.table.role') }}</th>
                                    <th>{{ trans('labels.backend.access.roles.table.permissions') }}</th>
                                    <th>{{ trans('labels.backend.access.roles.table.number_of_users') }}</th>
                                    <th>{{ trans('labels.backend.access.roles.table.sort') }}</th>
                                    <th>{{ trans('labels.general.actions') }}</th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach ($roles as $role)
                                    <tr>
                                        <td>{!! $role->name !!}</td>
                                        <td>
                                            @if ($role->all)
                                                <span class="label label-success">All</span>
                                            @else
                                                @if (count($role->permissions) > 0)
                                                    <div style="font-size:.7em">
                                                        @foreach ($role->permissions as $permission)
                                                            {!! $permission->display_name !!}<br/>
                                                        @endforeach
                                                    </div>
                                                @else
                                                    <span class="label label-danger">{{ trans('labels.general.none') }}</span>
                                                @endif
                                            @endif
                                        </td>
                                        <td>{!! $role->users()->count() !!}</td>
                                        <td>{!! $role->sort !!}</td>
                                        <td>{!! $role->action_buttons !!}</td>
                                    </tr>
                                @endforeach
                                </tbody>
                            </table>
                        </div>

                        <div class="pull-left">
                            {{ $roles->total() }} {{ trans('labels.backend.access.roles.table.total') }}
                        </div>

                        <div class="pull-right">
                            {{ $roles->render() }}
                        </div>

                        <div class="clearfix">
                        </div><!--roles-->
                    </div>
                    <div role="tabpanel" class="tab-pane" id="groups" style="padding-top:20px">

                        <div class="row">
                            <div class="col-lg-6">

                                <div class="alert alert-info">
                                    <i class="fa fa-info-circle"></i> {{ trans('strings.backend.access.permissions.sort_explanation') }}
                                </div><!--alert info-->

                                <div class="dd permission-hierarchy">
                                    <ol class="dd-list">
                                        @foreach ($groups as $group)
                                            <li class="dd-item" data-id="{!! $group->id !!}">
                                                <div class="dd-handle">{!! $group->name !!} <span
                                                            class="pull-right">{!! $group->permissions->count() !!} {{ trans('labels.backend.access.permissions.label') }}</span>
                                                </div>

                                                @if ($group->children->count())
                                                    <ol class="dd-list">
                                                        @foreach($group->children as $child)
                                                            <li class="dd-item" data-id="{!! $child->id !!}">
                                                                <div class="dd-handle">{!! $child->name !!} <span
                                                                            class="pull-right">{!! $child->permissions->count() !!} {{ trans('labels.backend.access.permissions.label') }}</span>
                                                                </div>
                                                            </li>
                                                        @endforeach
                                                    </ol>
                                            </li>
                                            @else
                                            </li>
                                            @endif
                                        @endforeach
                                    </ol>
                                </div><!--master-list-->
                            </div><!--col-lg-4-->

                            <div class="col-lg-6">

                                <div class="alert alert-info">
                                    <i class="fa fa-info-circle"></i> {{ trans('strings.backend.access.permissions.edit_explanation') }}
                                </div><!--alert info-->

                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead>
                                        <tr>
                                            <th>{{ trans('labels.backend.access.permissions.groups.table.name') }}</th>
                                            <th>{{ trans('labels.general.actions') }}</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        @foreach ($groups as $group)
                                            <tr>
                                                <td>
                                                    {!! $group->name !!}

                                                    @if ($group->permissions->count())
                                                        <div style="padding-left:40px;font-size:.8em">
                                                            @foreach ($group->permissions as $permission)
                                                                {!! $permission->display_name !!}<br/>
                                                            @endforeach
                                                        </div>
                                                    @endif
                                                </td>
                                                <td>{!! $group->action_buttons !!}</td>
                                            </tr>

                                            @if ($group->children->count())
                                                @foreach ($group->children as $child)
                                                    <tr>
                                                        <td style="padding-left:40px">
                                                            <em>{!! $child->name !!}</em>

                                                            @if ($child->permissions->count())
                                                                <div style="padding-left:40px;font-size:.8em">
                                                                    @foreach ($child->permissions as $permission)
                                                                        {!! $permission->display_name !!}<br/>
                                                                    @endforeach
                                                                </div>
                                                            @endif
                                                        </td>
                                                        <td>{!! $child->action_buttons !!}</td>
                                                    </tr>
                                                @endforeach
                                            @endif
                                        @endforeach
                                        </tbody>
                                    </table>
                                </div>
                            </div><!--col-lg-8-->
                        </div><!--row-->

                    </div><!--groups-->

                    @inject('roles', 'App\Repositories\Backend\Role\RoleRepositoryContract')
                    <div role="tabpanel" class="tab-pane" id="permissions" style="padding-top:20px">

                        <div class="table-responsive">
                            <table class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>{{ trans('labels.backend.access.permissions.table.permission') }}</th>
                                    <th>{{ trans('labels.backend.access.permissions.table.name') }}</th>
                                    <th>{{ trans('labels.backend.access.permissions.table.dependencies') }}</th>
                                    <th>{{ trans('labels.backend.access.permissions.table.users') }}</th>
                                    <th>{{ trans('labels.backend.access.permissions.table.roles') }}</th>
                                    <th>{{ trans('labels.backend.access.permissions.table.group') }}</th>
                                    <th>{{ trans('labels.backend.access.permissions.table.group-sort') }}</th>
                                    <th>{{ trans('labels.backend.access.permissions.table.system') }}</th>
                                    <th>{{ trans('labels.general.actions') }}</th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach ($permissions as $permission)
                                    <tr>
                                        <td>{!! $permission->name !!}</td>
                                        <td>{!! $permission->display_name !!}</td>
                                        <td>
                                            @if (count($permission->dependencies))
                                                @foreach($permission->dependencies as $dependency)
                                                    {!! $dependency->permission->display_name !!}<br/>
                                                @endforeach
                                            @else
                                                <span class="label label-success">{{ trans('labels.general.none') }}</span>
                                            @endif
                                        </td>
                                        <td>
                                            @if (count($permission->users))
                                                @foreach($permission->users as $user)
                                                    {!! $user->name !!}<br/>
                                                @endforeach
                                            @else
                                                <span class="label label-danger">{{ trans('labels.general.none') }}</span>
                                            @endif
                                        </td>
                                        <td>
                                            {!! $roles->findOrThrowException(1)->name !!}<br/>
                                            @if (count($permission->roles))
                                                @foreach($permission->roles as $role)
                                                    {!! $role->name !!}<br/>
                                                @endforeach
                                            @endif
                                        </td>
                                        <td>
                                            @if ($permission->group)
                                                {!! $permission->group->name !!}
                                            @else
                                                <span class="label label-danger">{{ trans('labels.general.none') }}</span>
                                            @endif
                                        </td>
                                        <td>{!! $permission->sort !!}</td>
                                        <td>{!! $permission->system_label !!}</td>
                                        <td>{!! $permission->action_buttons !!}</td>
                                    </tr>
                                @endforeach
                                </tbody>
                            </table>
                        </div>

                        <div class="pull-left">
                            {{ $permissions->total() }} {{ trans('labels.backend.access.permissions.table.total') }}
                        </div>

                        <div class="pull-right">
                            {{ $permissions->render() }}
                        </div>

                        <div class="clearfix"></div>

                    </div><!--permissions-->
                </div>
            </div>
        </div><!--permission tabs-->
    </div><!-- /.box-body -->
    </div><!--box-->
@stop

@section('after-scripts-end')
    {!! Html::script('js/backend/plugin/nestable/jquery.nestable.js') !!}

    <script>
        $(function() {
            var hierarchy = $('.permission-hierarchy');
            hierarchy.nestable({maxDepth:2});

            hierarchy.on('change', function() {
                @permission('sort-permission-groups')
                    $.ajax({
                    url : "{!! route('admin.access.roles.groups.update-sort') !!}",
                    type: "post",
                    data : {data:hierarchy.nestable('serialize')},
                    success: function(data) {
                        if (data.status == "OK")
                            toastr.success("{{ trans('strings.backend.access.permissions.groups.hierarchy_saved') }}");
                        else
                            toastr.error("{{ trans('auth.unknown') }}.");
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        toastr.error("{{ trans('auth.unknown') }}: " + errorThrown);
                    }
                });
                @else
                    toastr.error("{{ trans('auth.general_error') }}");
                @endauth
            });
        });
    </script>
@stop
