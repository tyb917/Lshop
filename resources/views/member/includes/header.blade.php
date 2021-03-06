<!-- Main Header -->
<header class="main-header">
    <!-- Logo -->
    <a href="{!! route('frontend.index') !!}" class="logo">{!! app_name() !!}</a>

    <!-- Header Navbar -->
    <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">{{ trans('labels.general.toggle_navigation') }}</span>
        </a>
        <ul class="nav navbar-nav">
            <li class="{{ Active::pattern('member.dashboard') }}">
                <a href="{!! route('member.dashboard') !!}"><span>{{ trans('member/navs.home') }}</span></a>
            </li>
        </ul>
        <!-- Navbar Right Menu -->
        <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">

                <!-- Messages: style can be found in dropdown.less-->
                <li class="dropdown messages-menu">
                    <!-- Menu toggle button -->
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="fa fa-envelope"></i>
                        <span class="label label-success">4</span>
                    </a>
                    <ul class="dropdown-menu">
                        <li class="header">{{ trans_choice('member/strings.general.you_have.messages', 4, ['number' => 4]) }}</li>
                        <li>
                            <!-- inner menu: contains the messages -->
                            <ul class="menu">
                                <li><!-- start message -->
                                    <a href="#">
                                        <div class="pull-left">
                                            <!-- User Image -->
                                            <img src="{{url('avatar/'.access()->id().'/small')}}" class="img-circle" alt="User Image"/>
                                        </div>
                                        <!-- Message title and timestamp -->
                                        <h4>
                                            Support Team
                                            <small><i class="fa fa-clock-o"></i> 5 mins</small>
                                        </h4>
                                        <!-- The message -->
                                        <p>Why not buy a new awesome theme?</p>
                                    </a>
                                </li><!-- end message -->
                            </ul><!-- /.menu -->
                        </li>
                        <li class="footer"><a href="#">{{ trans('member/strings.general.see_all.messages') }}</a></li>
                    </ul>
                </li><!-- /.messages-menu -->

                <!-- Notifications Menu -->
                <li class="dropdown notifications-menu">
                    <!-- Menu toggle button -->
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="fa fa-comments"></i>
                        <span class="label label-warning">0</span>
                    </a>
                    <ul class="dropdown-menu">
                        <li class="header">{{ trans_choice('member/strings.general.you_have.notifications', 0) }}</li>
                        <li>
                            <!-- Inner Menu: contains the notifications -->
                            <ul class="menu">
                                <li><!-- start notification -->
                                    <a href="#">
                                        <i class="fa fa-users text-aqua"></i> 5 new members joined today
                                    </a>
                                </li><!-- end notification -->
                            </ul>
                        </li>
                        <li class="footer"><a href="#">{{ trans('member/strings.general.see_all.notifications') }}</a></li>
                    </ul>
                </li>

                <!-- Tasks Menu -->
                <li class="dropdown tasks-menu">
                    <!-- Menu Toggle Button -->
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="fa fa-tasks"></i>
                        <span class="label label-danger">1</span>
                    </a>
                    <ul class="dropdown-menu">
                        <li class="header">{{ trans_choice('member/strings.general.you_have.tasks', 1) }}</li>
                        <li>
                            <!-- Inner menu: contains the tasks -->
                            <ul class="menu">
                                <li><!-- Task item -->
                                    <a href="#">
                                        <!-- Task title and progress text -->
                                        <h3>
                                            Design some buttons
                                            <small class="pull-right">20%</small>
                                        </h3>
                                        <!-- The progress bar -->
                                        <div class="progress xs">
                                            <!-- Change the css width attribute to simulate progress -->
                                            <div class="progress-bar progress-bar-aqua" style="width: 20%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                <span class="sr-only">20% Complete</span>
                                            </div>
                                        </div>
                                    </a>
                                </li><!-- end task item -->
                            </ul>
                        </li>
                    </ul>
                </li>

                <!-- User Account Menu -->
                <li class="dropdown user user-menu">
                    <!-- Menu Toggle Button -->
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <!-- The user image in the navbar-->
                        <img src="{{url('avatar/'.access()->id().'/small')}}" class="user-image" alt="User Image"/>
                        <!-- hidden-xs hides the username on small devices so only the image appears. -->
                        <span class="hidden-xs">{{ access()->user()->name }}</span>
                        <b class="caret"></b>
                    </a>

                    <ul class="dropdown-menu">
                        <li>{!! link_to_route('member.dashboard', trans('member/navs.dashboard')) !!}</li>

                        <li>
                            <a href="{!! route('member.user.profile') !!}">{{ trans('member/navs.user.my_account') }}</a>
                        </li>

                        @permission('view-backend')
                        <li>{!! link_to_route('admin.dashboard', trans('member/navs.user.administration')) !!}</li>
                        @endauth

                        <li>{!! link_to_route('auth.logout', trans('navs.general.logout')) !!}</li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</header>
