<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OperatinoLogRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'operation_cd' => 'required',
        ];
    }

    /**
     * Get the validation attributes that apply to the request.
     *
     * @return array
     */
    public function attributes()
    {
        return [
            'operation_cd' => '操作コード',
        ];
    }
}
