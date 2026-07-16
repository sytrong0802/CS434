<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class QuanHuyenIndexRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'tinh_thanh_id' => 'required|string|exists:tinh_thanh,id',
        ];
    }

    public function messages(): array
    {
        return [
            'tinh_thanh_id.required' => 'Mã tỉnh thành không được để trống.',
            'tinh_thanh_id.exists' => 'Tỉnh thành không tồn tại.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
