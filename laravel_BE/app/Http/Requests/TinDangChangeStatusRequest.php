<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TinDangChangeStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id' => 'required|integer|exists:tin_dang,id',
            'trang_thai' => 'required|in:HIEN_THI,TU_CHOI,AN_HIEN_THI',
            'ly_do_tu_choi' => 'required_if:trang_thai,TU_CHOI|nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'id.required' => 'Mã bài đăng không được để trống.',
            'id.integer' => 'Mã bài đăng phải là số nguyên.',
            'id.exists' => 'Bài đăng không tồn tại.',
            'trang_thai.required' => 'Trạng thái bài đăng không được để trống.',
            'trang_thai.in' => 'Trạng thái bài đăng không hợp lệ.',
            'ly_do_tu_choi.required_if' => 'Lý do từ chối là bắt buộc khi từ chối bài đăng.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
