<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NguoiOPhongUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id' => 'required|integer|exists:nguoi_o_phong,id',
            'ho_ten' => 'required|string|max:255',
            'so_dien_thoai' => 'required|string|max:20',
            'gioi_tinh' => 'required|in:NAM,NU',
            'ngay_vao' => 'required|date',
            'ngay_roi' => 'nullable|date',
            'trang_thai' => 'required|in:DANG_O,DA_ROI',
        ];
    }

    public function messages(): array
    {
        return [
            'id.required' => 'Mã bản ghi không được để trống.',
            'id.integer' => 'Mã bản ghi phải là số nguyên.',
            'id.exists' => 'Bản ghi không tồn tại.',
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
            'ngay_roi.date' => 'Ngày rời phải là ngày hợp lệ.',
            'trang_thai.required' => 'Trạng thái không được để trống.',
            'trang_thai.in' => 'Trạng thái không hợp lệ.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
