<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserChangePasswordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'mat_khau_cu' => 'required|string',
            'mat_khau_moi' => 'required|string|min:6',
        ];
    }

    public function messages(): array
    {
        return [
            'mat_khau_cu.required' => 'Mật khẩu cũ không được để trống.',
            'mat_khau_cu.string' => 'Mật khẩu cũ phải là chuỗi.',
            'mat_khau_moi.required' => 'Mật khẩu mới không được để trống.',
            'mat_khau_moi.string' => 'Mật khẩu mới phải là chuỗi.',
            'mat_khau_moi.min' => 'Mật khẩu mới phải từ 6 ký tự trở lên.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
