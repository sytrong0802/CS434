<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PhieuHoTroUpdateStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id' => 'required|integer|exists:phieu_ho_tro,id',
            'trang_thai' => 'required|in:MOI,DANG_XU_LY,DA_DONG',
        ];
    }

    public function messages(): array
    {
        return [
            'id.required' => 'Mã phiếu hỗ trợ không được để trống.',
            'id.integer' => 'Mã phiếu hỗ trợ phải là số nguyên.',
            'id.exists' => 'Phiếu hỗ trợ không tồn tại.',
            'trang_thai.required' => 'Trạng thái không được để trống.',
            'trang_thai.in' => 'Trạng thái không hợp lệ.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
