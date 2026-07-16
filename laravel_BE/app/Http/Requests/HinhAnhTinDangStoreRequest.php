<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HinhAnhTinDangStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'tin_dang_id' => 'required|integer|exists:tin_dang,id',
            'url_anh' => 'required|string|max:500',
        ];
    }

    public function messages(): array
    {
        return [
            'tin_dang_id.required' => 'Mã tin đăng không được để trống.',
            'tin_dang_id.integer' => 'Mã tin đăng phải là số nguyên.',
            'tin_dang_id.exists' => 'Tin đăng không tồn tại.',
            'url_anh.required' => 'Đường dẫn ảnh không được để trống.',
            'url_anh.string' => 'Đường dẫn ảnh phải là chuỗi.',
            'url_anh.max' => 'Đường dẫn ảnh không được vượt quá 500 ký tự.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
