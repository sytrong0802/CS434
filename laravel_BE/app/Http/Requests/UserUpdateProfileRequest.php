<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->user()?->id;

        return [
            'ho_ten' => 'sometimes|required|string|max:255',
            'so_dien_thoai' => 'sometimes|nullable|string|max:20|unique:user,so_dien_thoai,'.$userId,
            'avatar_url' => 'sometimes|nullable|string|max:500',
        ];
    }

    public function messages(): array
    {
        return [
            'ho_ten.required' => 'Họ tên không được để trống.',
            'ho_ten.string' => 'Họ tên phải là chuỗi.',
            'ho_ten.max' => 'Họ tên không được vượt quá 255 ký tự.',
            'so_dien_thoai.max' => 'Số điện thoại không được vượt quá 20 ký tự.',
            'so_dien_thoai.unique' => 'Số điện thoại đã tồn tại trên hệ thống.',
            'avatar_url.max' => 'Đường dẫn avatar không được vượt quá 500 ký tự.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
