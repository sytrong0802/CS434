<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ThongBaoReadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id' => 'required|integer|exists:thong_bao,id',
        ];
    }

    public function messages(): array
    {
        return [
            'id.required' => 'Mã thông báo không được để trống.',
            'id.integer' => 'Mã thông báo phải là số nguyên.',
            'id.exists' => 'Thông báo không tồn tại.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
