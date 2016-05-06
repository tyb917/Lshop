<?php
/*后台首页导航*/
Breadcrumbs::register('admin.dashboard', function ($breadcrumbs) {
    $breadcrumbs->push(trans('breadcrumbs.backend.dashboard'), route('admin.dashboard'));
});
/*权限导航*/
require __DIR__ . '/Access/User.php';
require __DIR__ . '/Access/Role.php';
require __DIR__ . '/Access/Permission.php';
require __DIR__ . '/Access/PermissionGroup.php';

/*日志导航*/
require __DIR__ . '/LogViewer.php';