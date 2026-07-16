<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NhaTroCreateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'ten_nha_tro' => 'required|string|max:255',
            'dia_chi_chi_tiet' => 'required|string|max:500',
            'phuong_xa_id' => 'required|string|exists:phuong_xa,id',
            'quan_huyen_id' => 'required|string|exists:quan_huyen,id',
            'tinh_thanh_id' => 'required|string|exists:tinh_thanh,id',
            'vi_do' => 'nullable|numeric',
            'kinh_do' => 'nullable|numeric',
        ];
    }

    public function messages(): array
    {
        return [
            'ten_nha_tro.required' => 'Tên nhà trọ không được để trống.',
            'ten_nha_tro.string' => 'Tên nhà trọ phải là chuỗi.',
            'ten_nha_tro.max' => 'Tên nhà trọ không được vượt quá 255 ký tự.',
            'dia_chi_chi_tiet.required' => 'Địa chỉ chi tiết không được để trống.',
            'dia_chi_chi_tiet.string' => 'Địa chỉ chi tiết phải là chuỗi.',
            'dia_chi_chi_tiet.max' => 'Địa chỉ chi tiết không được vượt quá 500 ký tự.',
            'phuong_xa_id.required' => 'Phường/Xã không được để trống.',
            'phuong_xa_id.exists' => 'Phường/Xã không tồn tại.',
            'quan_huyen_id.required' => 'Quận/Huyện không được để trống.',
            'quan_huyen_id.exists' => 'Quận/Huyện không tồn tại.',
            'tinh_thanh_id.required' => 'Tỉnh/Thành phố không được để trống.',
            'tinh_thanh_id.exists' => 'Tỉnh/Thành phố không tồn tại.',
            'vi_do.numeric' => 'Vĩ độ phải là số.',
            'kinh_do.numeric' => 'Kinh độ phải là số.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
