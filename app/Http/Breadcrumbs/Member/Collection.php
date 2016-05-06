<?php
/*会员中心首页导航*/
Breadcrumbs::register('member.dashboard', function ($breadcrumbs) {
    $breadcrumbs->push(trans('breadcrumbs.member.dashboard'), route('member.dashboard'));
});
require __DIR__ . '/User.php';