<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LichHenXemPhongUpdateStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id' => 'required|integer|exists:lich_hen_xem_phong,id',
            'trang_thai' => 'required|in:DA_CHAP_NHAN,TU_CHOI,DA_HUY,DA_HOAN_THANH',
            'ly_do_tu_choi' => 'required_if:trang_thai,TU_CHOI|nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'id.required' => 'Mã lịch hẹn không được để trống.',
            'id.integer' => 'Mã lịch hẹn phải là số nguyên.',
            'id.exists' => 'Lịch hẹn không tồn tại.',
            'trang_thai.required' => 'Trạng thái không được để trống.',
            'trang_thai.in' => 'Trạng thái không hợp lệ.',
            'ly_do_tu_choi.required_if' => 'Lý do từ chối là bắt buộc khi từ chối lịch hẹn.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
