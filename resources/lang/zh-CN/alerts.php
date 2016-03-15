<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Alert Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain alert messages for various scenarios
    | during CRUD operations. You are free to modify these language lines
    | according to your application's requirements.
    |
    */

    'backend' => [
        'permissions' => [
            'created' => '创建权限成功。',
            'deleted' => '删除权限成功。',

            'groups'  => [
                'created' => '组权限创建成功。',
                'deleted' => '组权限删除成功。',
                'updated' => '组权限更新成功。',
            ],

            'updated' => '权限更新成功。',
        ],

        'roles' => [
            'created' => '创建角色成功。',
            'deleted' => '删除角色成功。',
            'updated' => '更新角色成功。',
        ],

        'users' => [
            'confirmation_email' => '已经发送一份确认邮件到新地址。',
            'created' => '创建用户成功。',
            'deleted' => '删除用户成功。',
            'deleted_permanently' => '用户被永久删除。',
            'restored' => '用户已成功恢复。',
            'updated' => '用户已更新成功。',
            'updated_password' => "用户的密码已更新成功。",
        ],

        'categories' => [
            'updated' => '分类更新成功。',
            'deleted' => '分类删除成功。'
        ]
    ],
];