<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TienIchCreateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'ten_tien_ich' => 'required|string|max:255|unique:tien_ich,ten_tien_ich',
            'bieu_tuong' => 'nullable|string|max:100',
        ];
    }

    public function messages(): array
    {
        return [
            'ten_tien_ich.required' => 'Tên tiện ích không được để trống.',
            'ten_tien_ich.string' => 'Tên tiện ích phải là chuỗi.',
            'ten_tien_ich.max' => 'Tên tiện ích không được vượt quá 255 ký tự.',
            'ten_tien_ich.unique' => 'Tên tiện ích đã tồn tại.',
            'bieu_tuong.string' => 'Biểu tượng phải là chuỗi.',
            'bieu_tuong.max' => 'Biểu tượng không được vượt quá 100 ký tự.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
