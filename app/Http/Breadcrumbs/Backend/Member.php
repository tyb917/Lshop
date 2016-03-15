<?php
Breadcrumbs::register('member.dashboard', function ($breadcrumbs) {
    $breadcrumbs->push(trans('breadcrumbs.member.dashboard'), route('member.dashboard'));
});

Breadcrumbs::register('member.user.profile', function ($breadcrumbs) {
    $breadcrumbs->parent('member.dashboard');
    $breadcrumbs->push(trans('breadcrumbs.member.user.profile'), route('member.user.profile'));
});

Breadcrumbs::register('member.ocean.index', function ($breadcrumbs) {
    $breadcrumbs->parent('member.dashboard');
    $breadcrumbs->push(trans('breadcrumbs.member.ocean'), route('member.ocean.index'));
});