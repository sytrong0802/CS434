<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NguoiOPhongIndexRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'phong_tro_id' => 'required|integer|exists:phong_tro,id',
        ];
    }

    public function messages(): array
    {
        return [
            'phong_tro_id.required' => 'Mã phòng trọ không được để trống.',
            'phong_tro_id.integer' => 'Mã phòng trọ phải là số nguyên.',
            'phong_tro_id.exists' => 'Phòng trọ không tồn tại.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
