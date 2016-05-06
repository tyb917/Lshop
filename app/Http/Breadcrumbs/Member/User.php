<?php
Breadcrumbs::register('member.user.profile', function ($breadcrumbs) {
    $breadcrumbs->parent('member.dashboard');
    $breadcrumbs->push(trans('breadcrumbs.member.user.profile'), route('member.user.profile'));
});