<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BaoCaoViPhamUpdateStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id' => 'required|integer|exists:bao_cao_vi_pham,id',
            'trang_thai' => 'required|in:DA_XU_LY,TU_CHOI',
            'ghi_chu_admin' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'id.required' => 'Mã báo cáo không được để trống.',
            'id.integer' => 'Mã báo cáo phải là số nguyên.',
            'id.exists' => 'Báo cáo vi phạm không tồn tại.',
            'trang_thai.required' => 'Trạng thái không được để trống.',
            'trang_thai.in' => 'Trạng thái không hợp lệ.',
            'ghi_chu_admin.string' => 'Ghi chú admin phải là chuỗi.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
