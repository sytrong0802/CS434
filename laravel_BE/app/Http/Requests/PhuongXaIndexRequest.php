<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PhuongXaIndexRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'quan_huyen_id' => 'required|string|exists:quan_huyen,id',
        ];
    }

    public function messages(): array
    {
        return [
            'quan_huyen_id.required' => 'Mã quận huyện không được để trống.',
            'quan_huyen_id.exists' => 'Quận huyện không tồn tại.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
