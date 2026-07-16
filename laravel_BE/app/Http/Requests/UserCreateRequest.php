<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserCreateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'ho_ten' => 'required|string|max:100',
            'email' => 'required|email|max:100',
            'so_dien_thoai' => 'required|string|max:20',
            'password' => 'required|string|max:255',
            'avatar_url' => 'required|string|max:255',
            'vai_tro' => 'required|string|max:50',
            'so_du' => 'required|numeric|max:255',
            'trang_thai' => 'required|string|max:50',
            'ly_do_khoa' => 'nullable|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'ho_ten.required' => 'Họ tên là bắt buộc',
            'ho_ten.max' => 'Họ tên không được vượt quá 100 ký tự',
            'email.required' => 'Email là bắt buộc',
            'email.email' => 'Email không hợp lệ',
            'email.max' => 'Email không được vượt quá 100 ký tự',
            'so_dien_thoai.required' => 'Số điện thoại là bắt buộc',
            'so_dien_thoai.max' => 'Số điện thoại không được vượt quá 20 ký tự',
            'password.required' => 'Mật khẩu là bắt buộc',
            'password.max' => 'Mật khẩu không được vượt quá 255 ký tự',
            'avatar_url.required' => 'Avatar là bắt buộc',
            'avatar_url.max' => 'Avatar không được vượt quá 255 ký tự',
            'vai_tro.required' => 'Vai trò là bắt buộc',
            'vai_tro.max' => 'Vai trò không được vượt quá 50 ký tự',
            'so_du.required' => 'Số dư là bắt buộc',
            'so_du.max' => 'Số dư không được vượt quá 255 ký tự',
            'trang_thai.required' => 'Trạng thái là bắt buộc',
            'trang_thai.max' => 'Trạng thái không được vượt quá 50 ký tự',
            'ly_do_khoa.max' => 'Lý do khóa không được vượt quá 255 ký tự',
        ];
    }
}
