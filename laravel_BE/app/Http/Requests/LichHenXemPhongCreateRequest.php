<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LichHenXemPhongCreateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'tin_dang_id' => 'required|integer|exists:tin_dang,id',
            'phong_tro_id' => 'nullable|integer|exists:phong_tro,id',
            'thoi_gian_hen' => 'required|date|after:now',
            'loi_nhan' => 'nullable|string|max:1000',
        ];
    }

    public function messages(): array
    {
        return [
            'tin_dang_id.required' => 'Mã bài đăng không được để trống.',
            'tin_dang_id.integer' => 'Mã bài đăng phải là số nguyên.',
            'tin_dang_id.exists' => 'Bài đăng không tồn tại.',
            'phong_tro_id.integer' => 'Mã phòng trọ phải là số nguyên.',
            'phong_tro_id.exists' => 'Phòng trọ không tồn tại.',
            'thoi_gian_hen.required' => 'Thời gian hẹn xem phòng không được để trống.',
            'thoi_gian_hen.date' => 'Thời gian hẹn xem phòng phải là ngày giờ hợp lệ.',
            'thoi_gian_hen.after' => 'Thời gian hẹn phải ở tương lai.',
            'loi_nhan.string' => 'Lời nhắn phải là chuỗi.',
            'loi_nhan.max' => 'Lời nhắn không được vượt quá 1000 ký tự.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
