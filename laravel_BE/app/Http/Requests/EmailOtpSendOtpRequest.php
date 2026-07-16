<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmailOtpSendOtpRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => 'required|email|exists:user,email',
            'muc_dich' => 'required|in:DANG_KY,QUEN_MAT_KHAU',
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'Email không được để trống.',
            'email.email' => 'Email không đúng định dạng.',
            'email.exists' => 'Email không tồn tại trên hệ thống.',
            'muc_dich.required' => 'Mục đích không được để trống.',
            'muc_dich.in' => 'Mục đích không hợp lệ.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
