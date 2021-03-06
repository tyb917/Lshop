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

            @permission('view-ocean')
                <li class="{{ Active::pattern('member/ocean*') }} treeview">
                    <a href="#">
                        <i class="fa fa-ship"></i><span>{{ trans('member/menus.rates.title') }}</span>
                        <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu {{ Active::pattern('member/ocean*', 'menu-open') }}">
                        <li class="{{ Active::pattern('member/ocean') }}">
                            <a href="{!!url('member/ocean')!!}">{{ trans('member/oceans.index') }}</a>
                        </li>
                    </ul>
                </li>
            @endauth

        </ul><!-- /.sidebar-menu -->
    </section>
    <!-- /.sidebar -->
</aside>