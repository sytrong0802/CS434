<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BaoCaoViPhamCreateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'tin_dang_id' => 'required|integer|exists:tin_dang,id',
            'ly_do' => 'required|in:SAI_THONG_TIN,PHONG_KHONG_TON_TAI,LUA_DAO,SAI_GIA,SAI_HINH_ANH,CHU_TRO_KHONG_PHU_HOP,KHAC',
            'mo_ta' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'tin_dang_id.required' => 'Mã tin đăng không được để trống.',
            'tin_dang_id.integer' => 'Mã tin đăng phải là số nguyên.',
            'tin_dang_id.exists' => 'Tin đăng không tồn tại.',
            'ly_do.required' => 'Lý do vi phạm không được để trống.',
            'ly_do.in' => 'Lý do vi phạm không hợp lệ.',
            'mo_ta.string' => 'Mô tả phải là chuỗi.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
