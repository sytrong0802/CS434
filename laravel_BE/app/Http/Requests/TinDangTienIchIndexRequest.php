<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TinDangTienIchIndexRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'tin_dang_id' => 'required|integer|exists:tin_dang,id',
        ];
    }

    public function messages(): array
    {
        return [
            'tin_dang_id.required' => 'Mã bài đăng không được để trống.',
            'tin_dang_id.integer' => 'Mã bài đăng phải là số nguyên.',
            'tin_dang_id.exists' => 'Bài đăng không tồn tại.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
