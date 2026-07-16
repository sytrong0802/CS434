<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class KhachHangUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->id;

        return [
            'id' => 'required|integer|exists:user,id',
            'ho_ten' => 'required|string|max:255',
            'email' => 'required|email|unique:user,email,'.$id,
            'so_dien_thoai' => 'nullable|string|max:20|unique:user,so_dien_thoai,'.$id,
            'mat_khau' => 'nullable|string|min:6',
            'avatar_url' => 'nullable|string|max:500',
            'trang_thai' => 'required|in:HOAT_DONG,BI_KHOA,CHO_XAC_THUC',
            'ly_do_khoa' => 'required_if:trang_thai,BI_KHOA|nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'id.required' => 'Mã khách hàng không được để trống.',
            'id.integer' => 'Mã khách hàng phải là số nguyên.',
            'id.exists' => 'Khách hàng không tồn tại.',
            'ho_ten.required' => 'Họ tên không được để trống.',
            'ho_ten.string' => 'Họ tên phải là chuỗi.',
            'ho_ten.max' => 'Họ tên không được vượt quá 255 ký tự.',
            'email.required' => 'Email không được để trống.',
            'email.email' => 'Email không đúng định dạng.',
            'email.unique' => 'Email đã tồn tại trên hệ thống.',
            'so_dien_thoai.max' => 'Số điện thoại không được vượt quá 20 ký tự.',
            'so_dien_thoai.unique' => 'Số điện thoại đã tồn tại trên hệ thống.',
            'mat_khau.min' => 'Mật khẩu phải từ 6 ký tự trở lên.',
            'avatar_url.max' => 'Đường dẫn avatar không được vượt quá 500 ký tự.',
            'trang_thai.required' => 'Trạng thái không được để trống.',
            'trang_thai.in' => 'Trạng thái không hợp lệ.',
            'ly_do_khoa.required_if' => 'Lý do khóa là bắt buộc khi trạng thái là bị khóa.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
