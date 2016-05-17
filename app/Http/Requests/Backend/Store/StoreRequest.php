<?php

namespace App\Http\Requests\Backend\Store;

use App\Http\Requests\Request;

class StoreRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'group_id'    => 'required',
            'name' => 'required',
            'code' => 'required|alpha_dash_first',
            'is_active' => 'required'
        ];
    }

}
