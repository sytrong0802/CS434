<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TinDangTienIchStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'tin_dang_id' => 'required|integer|exists:tin_dang,id',
            'tien_ich_id' => 'required|integer|exists:tien_ich,id',
        ];
    }

    public function messages(): array
    {
        return [
            'tin_dang_id.required' => 'Mã bài đăng không được để trống.',
            'tin_dang_id.integer' => 'Mã bài đăng phải là số nguyên.',
            'tin_dang_id.exists' => 'Bài đăng không tồn tại.',
            'tien_ich_id.required' => 'Mã tiện ích không được để trống.',
            'tien_ich_id.integer' => 'Mã tiện ích phải là số nguyên.',
            'tien_ich_id.exists' => 'Tiện ích không tồn tại.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
