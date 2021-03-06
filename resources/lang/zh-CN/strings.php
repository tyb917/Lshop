<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Strings Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines are used in strings throughout the system.
    | Regardless where it is placed, a string can be listed here so it is easily
    | found in a intuitive way.
    |
    */

    'backend' => [
        'access' => [
            'permissions' => [
                'edit_explanation' => 'If you performed operations in the hierarchy section without refreshing this page, you will need to refresh to reflect the changes here.',

                'groups' => [
                    'hierarchy_saved' => 'Hierarchy successfully saved.',
                ],

                'sort_explanation' => 'This section allows you to organize your permissions into groups to stay organized. Regardless of the group, the permissions are still individually assigned to each role.',
            ],

            'users' => [
                'delete_user_confirm' => 'Are you sure you want to delete this user permanently? Anywhere in the application that references this user\'s id will most likely error. Proceed at your own risk. This can not be un-done.',
                'if_confirmed_off' => '(如果需要激活)',
                'restore_user_confirm' => 'Restore this user to its original state?',
            ],
        ],

        'category' => [
            'title' => '产品分类',
            'management' => '分类管理',
            'create' => '新建分类'
        ],

        'dashboard' => [
            'title' => '管理员面板',
            'welcome' => '欢迎',
        ],

        'general' => [
            'all_rights_reserved' => 'All Rights Reserved.',
            'are_you_sure' => 'Are you sure?',
            'boilerplate_link' => 'Laravel 5 Boilerplate',
            'continue' => 'Continue',
            'member_since' => 'Member since',
            'search_placeholder' => 'Search...',

            'see_all' => [
                'messages' => 'See all messages',
                'notifications' => 'View all',
                'tasks' => 'View all tasks',
            ],

            'status' => [
                'online' => 'Online',
                'offline' => 'Offline',
            ],

            'you_have' => [
                'messages' => '{0} You don\'t have messages|{1} You have 1 message|[2,Inf] You have :number messages',
                'notifications' => '{0} You don\'t have notifications|{1} You have 1 notification|[2,Inf] You have :number notifications',
                'tasks' => '{0} You don\'t have tasks|{1} You have 1 task|[2,Inf] You have :number tasks',
            ],
        ],
    ],

    'emails' => [
        'auth' => [
            'password_reset_subject' => 'Your Password Reset Link',
            'reset_password' => 'Click here to reset your password',
        ],
    ],

    'frontend' => [
        'email' => [
            'confirm_account' => 'Click here to confirm your account:',
        ],

        'test' => 'Test',

        'tests' => [
            'based_on' => [
                'permission' => 'Permission Based - ',
                'role' => 'Role Based - ',
            ],

            'js_injected_from_controller' => 'Javascript Injected from a Controller',

            'using_blade_extensions' => 'Using Blade Extensions',

            'using_access_helper' => [
                'array_permissions' => 'Using Access Helper with Array of Permission Names or ID\'s where the user does have to possess all.',
                'array_permissions_not' => 'Using Access Helper with Array of Permission Names or ID\'s where the user does not have to possess all.',
                'array_roles' => 'Using Access Helper with Array of Role Names or ID\'s where the user does have to possess all.',
                'array_roles_not' => 'Using Access Helper with Array of Role Names or ID\'s where the user does not have to possess all.',
                'permission_id' => 'Using Access Helper with Permission ID',
                'permission_name' => 'Using Access Helper with Permission Name',
                'role_id' => 'Using Access Helper with Role ID',
                'role_name' => 'Using Access Helper with Role Name',
            ],

            'view_console_it_works' => 'View console, you should see \'it works!\' which is coming from FrontendController@index',
            'you_can_see_because' => 'You can see this because you have the role of \':role\'!',
            'you_can_see_because_permission' => 'You can see this because you have the permission of \':permission\'!',
        ],

        'user' => [
            'avatar_updated' => '头像更新成功。',
            'profile_updated' => '个人资料更新成功。',
            'password_updated' => '密码修改成功。',
        ],

        'welcome_to' => 'Welcome to :place',
    ],
];