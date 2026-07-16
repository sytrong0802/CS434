<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ThongTinChuTroUpdateStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id' => 'required|integer|exists:thong_tin_chu_tro,user_id',
            'trang_thai_kyc' => 'required|in:DA_XAC_MINH,BI_TU_CHOI',
            'ly_do_tu_choi' => 'required_if:trang_thai_kyc,BI_TU_CHOI|nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.required' => 'Mã người dùng không được để trống.',
            'user_id.integer' => 'Mã người dùng phải là số nguyên.',
            'user_id.exists' => 'Thông tin xác minh của chủ trọ không tồn tại.',
            'trang_thai_kyc.required' => 'Trạng thái KYC không được để trống.',
            'trang_thai_kyc.in' => 'Trạng thái KYC không hợp lệ.',
            'ly_do_tu_choi.required_if' => 'Lý do từ chối là bắt buộc khi từ chối KYC.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
