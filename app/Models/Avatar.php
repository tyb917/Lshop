<?php

namespace App\Models;

use Config;
use Illuminate\Database\Eloquent\Model;

class Avatar extends Model
{
    private $src;
    private $data;
    private $dst;
    private $type;
    private $extension;
    private $msg;

    function __construct($src, $data, $file)
    {
        $this->setSrc($src);
        $this->setData($data);
        $this->setFile($file);
        $this->crop($this->src, $this->path.$this->dst, $this->data);
    }

    private function setSrc($src)
    {
        if (!empty($src)) {
            $type = exif_imagetype($src);

            if ($type) {
                $this->src = $src;
                $this->type = $type;
                $this->extension = image_type_to_extension($type);
                $this->setDst();
            }
        }
    }

    private function setData($data)
    {
        if (!empty($data)) {
            $this->data = json_decode(stripslashes($data));
        }
    }

    private function setFile($file)
    {
        if($file->isValid()){
            $errorCode = $file->getError();

            if ($errorCode === UPLOAD_ERR_OK) {
                $type = $file->getMimeType();

                if ($type) {
                    $clientName = $file->getClientOriginalName();
                    $extension = $file->getClientOriginalExtension();
                    $newName = md5(date('ymdhis').$clientName).".".$extension;

                    $filepath = Config::get('image.images.avatar.paths.tmp');

                    if ($type == 'image/jpeg' || $type == 'image/png' || $type == 'image/gif') {

                        if(!file_exists($filepath)){
                            mkdir($filepath,0777,true);
                        }

                        $result = $file->move($filepath, $newName);

                        if ($result) {
                            $this->src = $result->getRealPath();
                            $this->type = $type;
                            $this->extension = $extension;
                            $this->setDst();
                        } else {
                            $this->msg = '保存失败！';
                        }
                    } else {
                        $this->msg = '允许上传的图片格式为JPG, PNG, GIF';
                    }
                } else {
                    $this->msg = '请上传图片';
                }
            } else {
                $this->msg = $this->codeToMessage($errorCode);
            }
        }
    }

    private function setDst()
    {
        $path = Config::get('image.images.avatar.paths.input');
        $dir = '/'.date('Ymd').'/';
        $filename = md5(date('ymdhis')).'.png';
        if(!file_exists($path.$dir)){
            mkdir($path.$dir,0777,true);
        }
        $this->path = $path;
        $this->dst =  $dir.$filename;
    }

    private function crop($src, $dst, $data)
    {
        if (!empty($src) && !empty($dst) && !empty($data)) {
            switch ($this->type) {
                case 'image/gif':
                    $src_img = imagecreatefromgif($src);
                    break;

                case 'image/jpeg':
                    $src_img = imagecreatefromjpeg($src);
                    break;

                case 'image/png':
                    $src_img = imagecreatefrompng($src);
                    break;
            }

            if (!$src_img) {
                $this->msg = "无法读取文件！";
                return;
            }

            $size = getimagesize($src);

            $size_w = $size[0]; // natural width
            $size_h = $size[1]; // natural height

            $src_img_w = $size_w;
            $src_img_h = $size_h;

            $degrees = $data->rotate;

            // Rotate the source image
            if (is_numeric($degrees) && $degrees != 0) {
                // PHP's degrees is opposite to CSS's degrees
                $new_img = imagerotate($src_img, -$degrees, imagecolorallocatealpha($src_img, 0, 0, 0, 127));

                imagedestroy($src_img);
                $src_img = $new_img;

                $deg = abs($degrees) % 180;
                $arc = ($deg > 90 ? (180 - $deg) : $deg) * M_PI / 180;

                $src_img_w = $size_w * cos($arc) + $size_h * sin($arc);
                $src_img_h = $size_w * sin($arc) + $size_h * cos($arc);

                // Fix rotated image miss 1px issue when degrees < 0
                $src_img_w -= 1;
                $src_img_h -= 1;
            }

            $tmp_img_w = $data->width;
            $tmp_img_h = $data->height;
            $dst_img_w = 180;
            $dst_img_h = 180;

            $src_x = $data->x;
            $src_y = $data->y;

            if ($src_x <= -$tmp_img_w || $src_x > $src_img_w) {
                $src_x = $src_w = $dst_x = $dst_w = 0;
            } else if ($src_x <= 0) {
                $dst_x = -$src_x;
                $src_x = 0;
                $src_w = $dst_w = min($src_img_w, $tmp_img_w + $src_x);
            } else if ($src_x <= $src_img_w) {
                $dst_x = 0;
                $src_w = $dst_w = min($tmp_img_w, $src_img_w - $src_x);
            }

            if ($src_w <= 0 || $src_y <= -$tmp_img_h || $src_y > $src_img_h) {
                $src_y = $src_h = $dst_y = $dst_h = 0;
            } else if ($src_y <= 0) {
                $dst_y = -$src_y;
                $src_y = 0;
                $src_h = $dst_h = min($src_img_h, $tmp_img_h + $src_y);
            } else if ($src_y <= $src_img_h) {
                $dst_y = 0;
                $src_h = $dst_h = min($tmp_img_h, $src_img_h - $src_y);
            }

            // Scale to destination position and size
            $ratio = $tmp_img_w / $dst_img_w;
            $dst_x /= $ratio;
            $dst_y /= $ratio;
            $dst_w /= $ratio;
            $dst_h /= $ratio;

            $dst_img = imagecreatetruecolor($dst_img_w, $dst_img_h);

            // Add transparent background to destination image
            imagefill($dst_img, 0, 0, imagecolorallocatealpha($dst_img, 0, 0, 0, 127));
            imagesavealpha($dst_img, true);

            $result = imagecopyresampled($dst_img, $src_img, $dst_x, $dst_y, $src_x, $src_y, $dst_w, $dst_h, $src_w, $src_h);

            if ($result) {
                if (!imagepng($dst_img, $dst)) {
                    $this->msg = "保存截取图片失败！";
                }
            } else {
                $this->msg = "截取图片失败";
            }
            imagedestroy($src_img);
            imagedestroy($dst_img);
            unlink($src);
        }
    }

    private function codeToMessage($code)
    {
        $errors = array(
            UPLOAD_ERR_INI_SIZE => '上传的文件超过php . ini中最大的文件大小',
            UPLOAD_ERR_FORM_SIZE => '上传的文件超过最大文件大小指令中的HTML表单',
            UPLOAD_ERR_PARTIAL => '上传的文件只有部分上传成功',
            UPLOAD_ERR_NO_FILE => '无上传的文件',
            UPLOAD_ERR_NO_TMP_DIR => '缺少一个临时文件',
            UPLOAD_ERR_CANT_WRITE => '磁盘文件读取失败',
            UPLOAD_ERR_EXTENSION => '扩展阻止了文件上传',
        );

        if (array_key_exists($code, $errors)) {
            return $errors[$code];
        }

        return '未知上传错误';
    }

    public function getAvatar()
    {
        return !empty($this->data) ? $this->dst : $this->src;
    }

    public function getResult()
    {
        return !empty($this->data) ? $this->path.$this->dst : $this->src;
    }

    public function getMsg()
    {
        return $this->msg;
    }
}
