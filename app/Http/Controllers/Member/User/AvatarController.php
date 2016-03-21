<?php

namespace App\Http\Controllers\Member\User;

use Config;
use Illuminate\Support\Facades\File;
use App\Http\Requests\AvatarRequest;
use App\Http\Controllers\Controller;
use App\Helper\Avatar\Image;
use App\Repositories\Frontend\User\UserContract;

class AvatarController extends Controller
{
    /**
     * @param UserContract $user
     * @param $id
     * @param $size
     * @return mixed
     */
    public function index(UserContract $user, $userid , $size,Image $image)
    {
        $url = $image->getAvatar($userid,$size);
        return $url;
    }

    /**
     * @param  UserContract         $user
     * @param  UpdateProfileRequest $request
     * @return mixed
     */
    public function update(UserContract $user, AvatarRequest $request,Image $image)
    {
        $avatar = $image->upload($request['avatar_file'],$request['avatar_data']);
        if($avatar->state=='200'){
            $oldavatar = access()->user()->avatar;
            $file = explode('.',$oldavatar);
            $updateavatar = $user->updateAvatar(access()->id(), ['avatar'=>$avatar->avatar]);
            if($updateavatar){
                File::delete(public_path(Config::get('avatar.upload').DS.access()->id().DS.$file[0].'_'.Config::get('avatar.small.size').'.'.$file[1]));
                File::delete(public_path(Config::get('avatar.upload').DS.access()->id().DS.$file[0].'_'.Config::get('avatar.medium.size').'.'.$file[1]));
                File::delete(public_path(Config::get('avatar.upload').DS.access()->id().DS.$file[0].'_'.Config::get('avatar.large.size').'.'.$file[1]));
            }
        }
        $response = array(
            'state' => $avatar->state,
            'message' => $avatar->getMsg(),
            'result' => $avatar->getNewFile() ? $avatar->geturl() : null
        );
        echo json_encode($response);
    }
}
