<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GoiDichVuCreateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'ten_goi' => 'required|string|max:100',
            'mo_ta' => 'nullable|string',
            'gia_tien' => 'required|numeric|min:0',
            'so_ngay_hieu_luc' => 'required|integer|min:1',
            'do_uu_tien' => 'required|integer|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'ten_goi.required' => 'Tên gói dịch vụ không được để trống.',
            'ten_goi.string' => 'Tên gói dịch vụ phải là chuỗi.',
            'ten_goi.max' => 'Tên gói dịch vụ không được vượt quá 100 ký tự.',
            'mo_ta.string' => 'Mô tả phải là chuỗi.',
            'gia_tien.required' => 'Giá tiền không được để trống.',
            'gia_tien.numeric' => 'Giá tiền phải là số.',
            'gia_tien.min' => 'Giá tiền tối thiểu là 0.',
            'so_ngay_hieu_luc.required' => 'Số ngày hiệu lực không được để trống.',
            'so_ngay_hieu_luc.integer' => 'Số ngày hiệu lực phải là số nguyên.',
            'so_ngay_hieu_luc.min' => 'Số ngày hiệu lực phải tối thiểu là 1 ngày.',
            'do_uu_tien.required' => 'Độ ưu tiên không được để trống.',
            'do_uu_tien.integer' => 'Độ ưu tiên phải là số nguyên.',
            'do_uu_tien.min' => 'Độ ưu tiên tối thiểu là 0.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
