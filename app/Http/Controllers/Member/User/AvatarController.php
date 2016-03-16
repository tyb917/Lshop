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
    public function index(UserContract $user, $userid , $size)
    {
        $users = $user->find($userid);
        $filepath = Config::get('image.images.avatar.paths.input') . $users->avatar;
        $newfile = Config::get('image.images.avatar.paths.output') . $users->avatar;
        $file = str_replace( strrchr($newfile,'/') , '' , $newfile);
        if(!file_exists($newfile)){
            if(!file_exists($file)){
                mkdir($file,0777,true);
            }
            $img = Image::make($filepath)->resize($size, $size);
            $img->save($newfile,90);
        }
        return $img->response('jpg');
    }

    /**
     * @param  UserContract         $user
     * @param  UpdateProfileRequest $request
     * @return mixed
     */
    public function update(UserContract $user, AvatarRequest $request,Image $image)
    {
        dd($image->upload($request['avatar_file'],$request['avatar_data']));
        $src = isset($request['avatar_src']) ? $request['avatar_src'] : null;
        $data = isset($request['avatar_data']) ? $request['avatar_data'] : null;
        $file = isset($request['avatar_file']) ? $request['avatar_file'] : null;
        $crop = new Avatar($src,$data,$file);
        $avatarPath  = $crop->getAvatar();
        $oldavatar = access()->user()->avatar;
        $updateavatar = $user->updateAvatar(access()->id(), ['avatar'=>$avatarPath]);
        if($updateavatar) File::delete(public_path(Config::get('image.images.avatar.paths.input').$oldavatar));
        $response = array(
            'state' => 200,
            'message' => $crop->getMsg(),
            'result' => $crop->getResult()
        );
        echo json_encode($response);
    }
}
