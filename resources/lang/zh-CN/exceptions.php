<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Exception Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines are used in Exceptions thrown throughout the system.
    | Regardless where it is placed, a button can be listed here so it is easily
    | found in a intuitive way.
    |
    */

    'backend' => [
        'access' => [
            'permissions' => [
                'create_error' => 'There was a problem creating this permission. Please try again.',
                'delete_error' => 'There was a problem deleting this permission. Please try again.',

                'groups' => [
                    'associated_permissions' => 'You can not delete this group because it has associated permissions.',
                    'has_children' => 'You can not delete this group because it has child groups.',
                    'name_taken' => 'There is already a group with that name',
                ],

                'not_found' => 'That permission does not exist.',
                'system_delete_error' => 'You can not delete a system permission.',
                'update_error' => 'There was a problem updating this permission. Please try again.',
            ],

            'roles' => [
                'already_exists' => 'That role already exists. Please choose a different name.',
                'cant_delete_admin' => 'You can not delete the Administrator role.',
                'create_error' => 'There was a problem creating this role. Please try again.',
                'delete_error' => 'There was a problem deleting this role. Please try again.',
                'has_users' => 'You can not delete a role with associated users.',
                'needs_permission' => '你必须为这个角色选择一个权限。',
                'not_found' => 'That role does not exist.',
                'update_error' => 'There was a problem updating this role. Please try again.',
            ],

            'users' => [
                'cant_deactivate_self' => 'You can not do that to yourself.',
                'cant_delete_self' => 'You can not delete yourself.',
                'create_error' => 'There was a problem creating this user. Please try again.',
                'delete_error' => 'There was a problem deleting this user. Please try again.',
                'email_error' => 'That email address belongs to a different user.',
                'mark_error' => 'There was a problem updating this user. Please try again.',
                'not_found' => 'That user does not exist.',
                'restore_error' => 'There was a problem restoring this user. Please try again.',
                'role_needed_create' => 'You must choose at lease one role. User has been created but deactivated.',
                'role_needed' => '你必须选择一个角色。',
                'update_error' => 'There was a problem updating this user. Please try again.',
                'update_password_error' => 'There was a problem changing this users password. Please try again.',
            ],
        ],
        'category' => [
            'cant_permission_delete' => '没有删除分类的权限',
            'delete_error' => '删除失败'
        ],
    ],

    'frontend' => [
        'auth' => [
            'confirmation' => [
                'already_confirmed' => '您的账户已确认。',
                'confirm' => '确认您的账户！',
                'created_confirm' => '您的账户已创建成功。 我们已经发送了一份邮件,来确认您的帐户。',
                'mismatch' => '您的确认代码不匹配',
                'not_found' => '确认代码不存在。',
                'resend' => '您的账户还没有确认. 请到您的注册邮箱中点击确认链接, 或者 <a href="' . route('account.confirm.resend', ':token') . '">点击这里</a> 重新发送确认邮件',
                'success' => '您的帐户已确认成功！',
                'resent' => '一个新的确认邮件已经发送到注册邮箱中。',
            ],

            'deactivated' => '您的帐户已被停用。',
            'email_taken' => '这个电子邮件已存在！',

            'password' => [
                'change_mismatch' => '旧密码错误.',
            ],


        ],
    ],
];