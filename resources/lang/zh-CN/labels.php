<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Labels Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines are used in labels throughout the system.
    | Regardless where it is placed, a label can be listed here so it is easily
    | found in a intuitive way.
    |
    */

    'general' => [
        'all' => '所有',
        'actions' => '操作',
        'buttons' => [
            'save' => '保存',
            'update' => '更新',
        ],
        'hide' => '隐藏',
        'none' => '无',
        'show' => '显示',
        'toggle_navigation' => '切换导航',
    ],

    'backend' => [
        'access' => [
            'permissions' => [
                'create' => '创建权限',
                'dependencies' => '停用',
                'edit' => '编辑权限',

                'groups' => [
                    'create' => '创建用户组',
                    'edit' => '编辑用户组',

                    'table' => [
                        'name' => '名称',
                    ],
                ],

                'grouped_permissions' => '分组权限',
                'label' => '权限',
                'management' => '权限管理',
                'no_groups' => '没有权限的组。',
                'no_permissions' => '没有权限可供选择',
                'no_roles' => '没有角色设置',
                'no_ungrouped' => '没有未分组的权限。',

                'table' => [
                    'dependencies' => '停用',
                    'group' => '用户组',
                    'group-sort' => '用户组排序',
                    'name' => '用户名',
                    'permission' => '权限',
                    'roles' => '角色',
                    'system' => '系统',
                    'total' => '权限统计',
                    'users' => '用户',
                ],

                'tabs' => [
                    'roles' => '角色',
                    'general' => '一般的',
                    'groups' => '用户组',
                    'dependencies' => '相关性',
                    'permissions' => '权限',
                ],

                'ungrouped_permissions' => '未分组的权限',
            ],

            'roles' => [
                'create' => '创建角色',
                'edit' => '编辑角色',
                'management' => '角色管理',

                'table' => [
                    'number_of_users' => '用户数量',
                    'permissions' => '权限',
                    'role' => '角色',
                    'sort' => '排序',
                    'total' => '角色统计',
                ],
            ],

            'users' => [
                'active' => '活跃用户',
                'all_permissions' => '所有权限',
                'change_password' => '修改密码',
                'change_password_for' => '为:user更改密码',
                'create' => '创建用户',
                'deactivated' => '停用用户',
                'deleted' => '删除用户',
                'dependencies' => '相关性',
                'edit' => '编辑用户',
                'management' => '用户管理',
                'no_other_permissions' => '没有其他权限',
                'no_permissions' => '没有权限',
                'no_roles' => '没有角色设置。',
                'permissions' => '权限',
                'permission_check' => 'Checking a permission will also check its dependencies, if any.',

                'table' => [
                    'confirmed' => '激活',
                    'created' => '注册时间',
                    'email' => '邮箱',
                    'id' => 'ID',
                    'last_updated' => '最后登录时间',
                    'name' => '用户名',
                    'no_deactivated' => '没有停用用户',
                    'no_deleted' => '没有删除用户',
                    'other_permissions' => '其他权限',
                    'roles' => '角色',
                    'total' => '用户统计',
                ],
            ],
        ],
        'category' => [
            'management' => '分类管理',
            'general' => '常规信息',
            'product' => '分类产品',
        ],
    ],

    'frontend' => [

        'auth' => [
            'login_box_title' => '登录',
            'login_button' => '登录',
            'login_with' => '用 :social_media 登录',
            'register_box_title' => '注册',
            'register_button' => '注册',
            'remember_me' => '记住我',
        ],

        'passwords' => [
            'forgot_password' => '忘记密码？',
            'reset_password_box_title' => '重置密码',
            'reset_password_button' => '重置密码',
            'send_password_reset_link_button' => '发送重置密码链接',
        ],

        'macros' => [
            'country' => [
                'alpha' => 'Country Alpha Codes',
                'alpha2' => 'Country Alpha 2 Codes',
                'alpha3' => 'Country Alpha 3 Codes',
                'numeric' => 'Country Numeric Codes',
            ],

            'macro_examples' => 'Macro Examples',

            'state' => [
                'mexico' => 'Mexico State List',
                'us' => [
                    'us' => 'US States',
                    'outlying' => 'US Outlying Territories',
                    'armed' => 'US Armed Forces',
                ],
            ],

            'territories' => [
                'canada' => 'Canada Province & Territories List',
            ],

            'timezone' => 'Timezone',
        ],

        'user' => [
            'passwords' => [
                'change' => '修改密码',
            ],

            'profile' => [
                'avatar' => '头像',
                'created_at' => '注册时间',
                'edit_information' => '编辑个人资料',
                'email' => '邮箱',
                'last_updated' => '最后登录时间',
                'name' => '用户名',
                'update_information' => '修改资料',
            ],
        ],

    ],
];