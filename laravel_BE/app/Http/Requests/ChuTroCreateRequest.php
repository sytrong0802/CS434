<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ChuTroCreateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'ho_ten' => 'required|string|max:255',
            'email' => 'required|email|unique:user,email',
            'so_dien_thoai' => 'nullable|string|max:20|unique:user,so_dien_thoai',
            'mat_khau' => 'required|string|min:6',
            'avatar_url' => 'nullable|string|max:500',
        ];
    }

    public function messages(): array
    {
        return [
            'ho_ten.required' => 'Họ tên không được để trống.',
            'ho_ten.string' => 'Họ tên phải là chuỗi.',
            'ho_ten.max' => 'Họ tên không được vượt quá 255 ký tự.',
            'email.required' => 'Email không được để trống.',
            'email.email' => 'Email không đúng định dạng.',
            'email.unique' => 'Email đã tồn tại trên hệ thống.',
            'so_dien_thoai.max' => 'Số điện thoại không được vượt quá 20 ký tự.',
            'so_dien_thoai.unique' => 'Số điện thoại đã tồn tại trên hệ thống.',
            'mat_khau.required' => 'Mật khẩu không được để trống.',
            'mat_khau.string' => 'Mật khẩu phải là chuỗi.',
            'mat_khau.min' => 'Mật khẩu phải từ 6 ký tự trở lên.',
            'avatar_url.max' => 'Đường dẫn avatar không được vượt quá 500 ký tự.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
