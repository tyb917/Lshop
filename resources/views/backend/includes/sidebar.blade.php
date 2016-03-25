<!-- Left side column. contains the logo and sidebar -->
<aside class="main-sidebar">

    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">

        <!-- search form (Optional) -->
        {{--<form action="#" method="get" class="sidebar-form">--}}
            {{--<div class="input-group">--}}
                {{--<input type="text" name="q" class="form-control" placeholder="{{ trans('strings.backend.general.search_placeholder') }}"/>--}}
                  {{--<span class="input-group-btn">--}}
                    {{--<button type='submit' name='search' id='search-btn' class="btn btn-flat"><i class="fa fa-search"></i></button>--}}
                  {{--</span>--}}
            {{--</div>--}}
        {{--</form>--}}
        <!-- /.search form -->

        <!-- Sidebar Menu -->
        <ul class="sidebar-menu">
            <!-- Optionally, you can add icons to the links -->

            @permission('view-access-management')
                <li class="{{ Active::pattern('admin/access/*') }} treeview">
                    <a href="#">
                        <i class="fa fa-users"></i><span>{{ trans('menus.backend.access.title') }}</span>
                        <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu {{ Active::pattern('admin/access/*', 'menu-open') }}" style="display: none; {{ Active::pattern('admin/access/*', 'display: block;') }}">
                        <li class="{{ Active::pattern(['admin/access/users','admin/access/users/create','admin/access/users/*/edit','admin/access/user/*/password/change']) }}">
                            <a href="{!!url('admin/access/users')!!}"><span>{{ trans('menus.backend.access.users.all') }}</span></a>
                        </li>
                        <li class="{{ Active::pattern('admin/access/users/deactivated') }}">
                            <a href="{!!url('admin/access/users/deactivated')!!}"><span>{{ trans('menus.backend.access.users.deactivated') }}</span></a>
                        </li>
                        <li class="{{ Active::pattern('admin/access/roles*') }}">
                            <a href="{!!url('admin/access/roles')!!}"><span>{{ trans('menus.backend.access.permissions.management') }}</span></a>
                        </li>
                    </ul>
                </li>
            @endauth
            @permission(['view-access-management'])
            <li class="{{ Active::pattern(['admin/catalog/products*','admin/catalog/categories*']) }} treeview">
                <a href="#">
                    <i class="fa fa-users"></i><span>{{ trans('menus.backend.catalog.products.title') }}</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu {{ Active::pattern(['admin/catalog/products*','admin/catalog/categories*'], 'menu-open') }}" style="display: none; {{ Active::pattern(['admin/products*','admin/categories*'], 'display: block;') }}">
                    <li class="{{ Active::pattern(['admin/catalog/products/','admin/catalog/products/create','admin/catalog/products/*/edit']) }}">
                        <a href="{!!url('admin/catalog/products')!!}"><span>{{ trans('menus.backend.catalog.products.all') }}</span></a>
                    </li>
                    <li class="{{ Active::pattern('admin/catalog/products/deactivated') }}">
                        <a href="{!!url('admin/catalog/products/deactivated')!!}"><span>{{ trans('menus.backend.catalog.products.deactivated') }}</span></a>
                    </li>
                    <li class="{{ Active::pattern('admin/catalog/categories*') }}">
                        <a href="{!!url('admin/catalog/categories')!!}"><span>{{ trans('menus.backend.catalog.category.management') }}</span></a>
                    </li>
                </ul>
            </li>
            @endauth
            @role('1')
            <li class="{{ Active::pattern('admin/log-viewer*') }} treeview">
                <a href="#">
                    <i class="fa fa-warning"></i><span>{{ trans('menus.backend.log-viewer.main') }}</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu {{ Active::pattern('admin/log-viewer*', 'menu-open') }}" style="display: none; {{ Active::pattern('admin/log-viewer*', 'display: block;') }}">
                    <li class="{{ Active::pattern('admin/log-viewer') }}">
                        <a href="{!! url('admin/log-viewer') !!}">{{ trans('menus.backend.log-viewer.dashboard') }}</a>
                    </li>
                    <li class="{{ Active::pattern('admin/log-viewer/logs') }}">
                        <a href="{!! url('admin/log-viewer/logs') !!}">{{ trans('menus.backend.log-viewer.logs') }}</a>
                    </li>
                </ul>
            </li>
            @endauth

        </ul><!-- /.sidebar-menu -->
    </section>
    <!-- /.sidebar -->
</aside>