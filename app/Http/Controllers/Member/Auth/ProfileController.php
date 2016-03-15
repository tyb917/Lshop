<?php

namespace App\Http\Controllers\Member\Auth;

use App\Http\Controllers\Controller;
use App\Repositories\Frontend\User\UserContract;
use App\Http\Requests\Frontend\User\UpdateProfileRequest;

/**
 * Class ProfileController
 * @package App\Http\Controllers\Frontend
 */
class ProfileController extends Controller
{
    /**
     * @return mixed
     */
    public function index()
    {
        return view('member.user.profile.index')
            ->withUser(access()->user());
    }

    public function edit()
    {
        return view('member.user.profile.edit')
            ->withUser(access()->user());
    }

    /**
     * @param  UserContract         $user
     * @param  UpdateProfileRequest $request
     * @return mixed
     */
    public function update(UserContract $user, UpdateProfileRequest $request)
    {
        $user->updateProfile(access()->id(), $request->all());
        return redirect()->route('member.user.profile')->withFlashSuccess(trans('strings.frontend.user.profile_updated'));
    }

}