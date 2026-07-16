<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmailOtpVerifyOtpRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => 'required|email|exists:user,email',
            'otp' => 'required|string|size:6',
            'muc_dich' => 'required|in:DANG_KY,QUEN_MAT_KHAU',
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'Email không được để trống.',
            'email.email' => 'Email không đúng định dạng.',
            'email.exists' => 'Email không tồn tại trên hệ thống.',
            'otp.required' => 'Mã OTP không được để trống.',
            'otp.string' => 'Mã OTP phải là chuỗi.',
            'otp.size' => 'Mã OTP phải đúng 6 ký tự.',
            'muc_dich.required' => 'Mục đích không được để trống.',
            'muc_dich.in' => 'Mục đích không hợp lệ.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
