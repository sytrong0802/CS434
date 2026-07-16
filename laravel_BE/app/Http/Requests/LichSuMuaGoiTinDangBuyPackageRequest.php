<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LichSuMuaGoiTinDangBuyPackageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'tin_dang_id' => 'required|integer|exists:tin_dang,id',
            'goi_dich_vu_id' => 'required|integer|exists:goi_dich_vu,id',
        ];
    }

    public function messages(): array
    {
        return [
            'tin_dang_id.required' => 'Mã tin đăng không được để trống.',
            'tin_dang_id.integer' => 'Mã tin đăng phải là số nguyên.',
            'tin_dang_id.exists' => 'Tin đăng không tồn tại.',
            'goi_dich_vu_id.required' => 'Mã gói dịch vụ không được để trống.',
            'goi_dich_vu_id.integer' => 'Mã gói dịch vụ phải là số nguyên.',
            'goi_dich_vu_id.exists' => 'Gói dịch vụ không tồn tại.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
