<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class KhachHangCreateRequest extends FormRequest
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
            'vai_tro' => 'sometimes|string|in:KHACH_HANG,CHU_TRO,ADMIN',
            'so_du' => 'sometimes|numeric|min:0',
            'trang_thai' => 'sometimes|string|in:HOAT_DONG,BI_KHOA,CHO_XAC_THUC,DA_XOA',
        ];
    }

    public function message(): array
    {
        return [
            'ho_ten.required' => 'Họ tên không được để trống',
            'ho_ten.string' => 'Họ tên phải là chuỗi',
            'ho_ten.max' => 'Họ tên không được vượt quá 255 ký tự',
            'email.required' => 'Email không được để trống',
            'email.email' => 'Email không hợp lệ',
            'email.unique' => 'Email đã tồn tại',
            'so_dien_thoai.string' => 'Số điện thoại phải là chuỗi',
            'so_dien_thoai.max' => 'Số điện thoại không được vượt quá 20 ký tự',
            'so_dien_thoai.unique' => 'Số điện thoại đã tồn tại',
            'mat_khau.required' => 'Mật khẩu không được để trống',
            'mat_khau.string' => 'Mật khẩu phải là chuỗi',
            'mat_khau.min' => 'Mật khẩu phải có ít nhất 6 ký tự',
            'avatar_url.string' => 'Avatar URL phải là chuỗi',
            'avatar_url.max' => 'Avatar URL không được vượt quá 500 ký tự',
            'vai_tro.in' => 'Vai trò không hợp lệ',
            'so_du.numeric' => 'Số dư phải là số',
            'so_du.min' => 'Số dư phải lớn hơn hoặc bằng 0',
            'trang_thai.in' => 'Trạng thái không hợp lệ',
        ];
    }
}
