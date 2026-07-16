<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NguoiOPhongCreateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'phong_tro_id' => 'required|integer|exists:phong_tro,id',
            'khach_hang_id' => 'nullable|integer|exists:user,id',
            'ho_ten' => 'required|string|max:255',
            'so_dien_thoai' => 'required|string|max:20',
            'gioi_tinh' => 'required|in:NAM,NU',
            'ngay_vao' => 'required|date',
        ];
    }

    public function messages(): array
    {
        return [
            'phong_tro_id.required' => 'Mã phòng trọ không được để trống.',
            'phong_tro_id.integer' => 'Mã phòng trọ phải là số nguyên.',
            'phong_tro_id.exists' => 'Phòng trọ không tồn tại.',
            'khach_hang_id.integer' => 'Mã khách hàng phải là số nguyên.',
            'khach_hang_id.exists' => 'Khách hàng không tồn tại.',
            'ho_ten.required' => 'Họ tên không được để trống.',
            'ho_ten.string' => 'Họ tên phải là chuỗi.',
            'ho_ten.max' => 'Họ tên không được vượt quá 255 ký tự.',
            'so_dien_thoai.required' => 'Số điện thoại không được để trống.',
            'so_dien_thoai.string' => 'Số điện thoại phải là chuỗi.',
            'so_dien_thoai.max' => 'Số điện thoại không được vượt quá 20 ký tự.',
            'gioi_tinh.required' => 'Giới tính không được để trống.',
            'gioi_tinh.in' => 'Giới tính không hợp lệ.',
            'ngay_vao.required' => 'Ngày vào ở không được để trống.',
            'ngay_vao.date' => 'Ngày vào ở phải là ngày hợp lệ.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
