<?php

Breadcrumbs::register('admin.dashboard', function ($breadcrumbs) {
    $breadcrumbs->push(trans('breadcrumbs.backend.dashboard'), route('admin.dashboard'));
});

require __DIR__ . '/Access.php';
require __DIR__ . '/LogViewer.php';