<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PhongTroIndexRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nha_tro_id' => 'required|integer|exists:nha_tro,id',
        ];
    }

    public function messages(): array
    {
        return [
            'nha_tro_id.required' => 'Mã nhà trọ không được để trống.',
            'nha_tro_id.integer' => 'Mã nhà trọ phải là số nguyên.',
            'nha_tro_id.exists' => 'Nhà trọ không tồn tại.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
