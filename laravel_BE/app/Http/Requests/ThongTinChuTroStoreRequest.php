<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ThongTinChuTroStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->user()?->id;

        return [
            'so_cccd_passport' => 'required|string|max:20|unique:thong_tin_chu_tro,so_cccd_passport,'.$userId.',user_id',
            'ho_ten_khai_sinh' => 'required|string|max:255',
            'ngay_cap' => 'required|date',
            'noi_cap' => 'required|string|max:255',
            'anh_cccd_mat_truoc' => 'required|string|max:500',
            'anh_cccd_mat_sau' => 'required|string|max:500',
            'anh_chan_dung_hop_dong' => 'nullable|string|max:500',
            'ten_ngan_hang' => 'required|string|max:100',
            'so_tai_khoan' => 'required|string|max:50',
            'ten_chu_tai_khoan' => 'required|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'so_cccd_passport.required' => 'Số CCCD/Passport không được để trống.',
            'so_cccd_passport.string' => 'Số CCCD/Passport phải là chuỗi.',
            'so_cccd_passport.max' => 'Số CCCD/Passport không được vượt quá 20 ký tự.',
            'so_cccd_passport.unique' => 'Số CCCD/Passport này đã được đăng ký xác minh.',
            'ho_ten_khai_sinh.required' => 'Họ tên khai sinh không được để trống.',
            'ho_ten_khai_sinh.string' => 'Họ tên khai sinh phải là chuỗi.',
            'ho_ten_khai_sinh.max' => 'Họ tên khai sinh không được vượt quá 255 ký tự.',
            'ngay_cap.required' => 'Ngày cấp không được để trống.',
            'ngay_cap.date' => 'Ngày cấp phải là ngày hợp lệ.',
            'noi_cap.required' => 'Nơi cấp không được để trống.',
            'noi_cap.string' => 'Nơi cấp phải là chuỗi.',
            'noi_cap.max' => 'Nơi cấp không được vượt quá 255 ký tự.',
            'anh_cccd_mat_truoc.required' => 'Ảnh CCCD mặt trước không được để trống.',
            'anh_cccd_mat_truoc.string' => 'Ảnh CCCD mặt trước phải là chuỗi.',
            'anh_cccd_mat_truoc.max' => 'Ảnh CCCD mặt trước không được vượt quá 500 ký tự.',
            'anh_cccd_mat_sau.required' => 'Ảnh CCCD mặt sau không được để trống.',
            'anh_cccd_mat_sau.string' => 'Ảnh CCCD mặt sau phải là chuỗi.',
            'anh_cccd_mat_sau.max' => 'Ảnh CCCD mặt sau không được vượt quá 500 ký tự.',
            'anh_chan_dung_hop_dong.max' => 'Ảnh chân dung hợp đồng không được vượt quá 500 ký tự.',
            'ten_ngan_hang.required' => 'Tên ngân hàng không được để trống.',
            'ten_ngan_hang.string' => 'Tên ngân hàng phải là chuỗi.',
            'ten_ngan_hang.max' => 'Tên ngân hàng không được vượt quá 100 ký tự.',
            'so_tai_khoan.required' => 'Số tài khoản không được để trống.',
            'so_tai_khoan.string' => 'Số tài khoản phải là chuỗi.',
            'so_tai_khoan.max' => 'Số tài khoản không được vượt quá 50 ký tự.',
            'ten_chu_tai_khoan.required' => 'Tên chủ tài khoản không được để trống.',
            'ten_chu_tai_khoan.string' => 'Tên chủ tài khoản phải là chuỗi.',
            'ten_chu_tai_khoan.max' => 'Tên chủ tài khoản không được vượt quá 255 ký tự.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
