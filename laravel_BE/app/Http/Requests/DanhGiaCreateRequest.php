<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DanhGiaCreateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'tin_dang_id' => 'required|integer|exists:tin_dang,id',
            'so_sao' => 'required|integer|min:1|max:5',
            'binh_luan' => 'nullable|string|max:1000',
        ];
    }

    public function messages(): array
    {
        return [
            'tin_dang_id.required' => 'Mã tin đăng không được để trống.',
            'tin_dang_id.integer' => 'Mã tin đăng phải là số nguyên.',
            'tin_dang_id.exists' => 'Tin đăng không tồn tại.',
            'so_sao.required' => 'Số sao đánh giá không được để trống.',
            'so_sao.integer' => 'Số sao đánh giá phải là số nguyên.',
            'so_sao.min' => 'Số sao đánh giá tối thiểu là 1.',
            'so_sao.max' => 'Số sao đánh giá tối đa là 5.',
            'binh_luan.string' => 'Bình luận phải là chuỗi.',
            'binh_luan.max' => 'Bình luận không được vượt quá 1000 ký tự.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
