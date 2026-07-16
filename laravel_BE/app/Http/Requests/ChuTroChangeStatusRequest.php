<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ChuTroChangeStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id' => 'required|integer|exists:user,id',
            'trang_thai' => 'required|in:HOAT_DONG,BI_KHOA,CHO_XAC_THUC',
            'ly_do_khoa' => 'required_if:trang_thai,BI_KHOA|nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'id.required' => 'Mã người dùng không được để trống.',
            'id.integer' => 'Mã người dùng phải là số nguyên.',
            'id.exists' => 'Người dùng không tồn tại.',
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
