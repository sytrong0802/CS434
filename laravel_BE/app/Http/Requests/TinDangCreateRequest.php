<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TinDangCreateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'tieu_de' => 'required|string|max:255',
            'mo_ta' => 'nullable|string',
            'dia_chi_chi_tiet' => 'required|string|max:500',
            'phuong_xa_id' => 'required|string|exists:phuong_xa,id',
            'quan_huyen_id' => 'required|string|exists:quan_huyen,id',
            'tinh_thanh_id' => 'required|string|exists:tinh_thanh,id',
            'gia_thue_min' => 'required|numeric|min:0',
            'dien_tich_min' => 'nullable|numeric|min:0',
            'loai_phong' => 'required|in:PHONG_TRO,CHUNG_CU_MINI,NHA_NGUYEN_CAN,KY_TUC_XA,CAN_HO_DICH_VU',
            'tinh_trang_noi_that' => 'required|in:TRONG,CO_BAN,DAY_DU,CAO_CAP',
            'anh_dai_dien' => 'nullable|string|max:500',
            'vi_do' => 'nullable|numeric',
            'kinh_do' => 'nullable|numeric',
            'ten_lien_he' => 'nullable|string|max:255',
            'so_dien_thoai_lien_he' => 'nullable|string|max:20',
            'tien_ich_ids' => 'nullable|array',
            'tien_ich_ids.*' => 'integer|exists:tien_ich,id',
            'phong_tro_id' => 'nullable|integer|exists:phong_tro,id',
        ];
    }

    public function messages(): array
    {
        return [
            'tieu_de.required' => 'Tiêu đề không được để trống.',
            'tieu_de.string' => 'Tiêu đề phải là chuỗi.',
            'tieu_de.max' => 'Tiêu đề không được vượt quá 255 ký tự.',
            'mo_ta.string' => 'Mô tả phải là chuỗi.',
            'dia_chi_chi_tiet.required' => 'Địa chỉ chi tiết không được để trống.',
            'dia_chi_chi_tiet.string' => 'Địa chỉ chi tiết phải là chuỗi.',
            'dia_chi_chi_tiet.max' => 'Địa chỉ chi tiết không được vượt quá 500 ký tự.',
            'phuong_xa_id.required' => 'Phường/Xã không được để trống.',
            'phuong_xa_id.exists' => 'Phường/Xã không tồn tại.',
            'quan_huyen_id.required' => 'Quận/Huyện không được để trống.',
            'quan_huyen_id.exists' => 'Quận/Huyện không tồn tại.',
            'tinh_thanh_id.required' => 'Tỉnh/Thành phố không được để trống.',
            'tinh_thanh_id.exists' => 'Tỉnh/Thành phố không tồn tại.',
            'gia_thue_min.required' => 'Giá thuê tối thiểu không được để trống.',
            'gia_thue_min.numeric' => 'Giá thuê tối thiểu phải là số.',
            'gia_thue_min.min' => 'Giá thuê tối thiểu phải từ 0 trở lên.',
            'dien_tich_min.numeric' => 'Diện tích tối thiểu phải là số.',
            'dien_tich_min.min' => 'Diện tích tối thiểu phải từ 0 trở lên.',
            'loai_phong.required' => 'Loại phòng không được để trống.',
            'loai_phong.in' => 'Loại phòng không hợp lệ.',
            'tinh_trang_noi_that.required' => 'Tình trạng nội thất không được để trống.',
            'tinh_trang_noi_that.in' => 'Tình trạng nội thất không hợp lệ.',
            'anh_dai_dien.max' => 'Ảnh đại diện không được vượt quá 500 ký tự.',
            'vi_do.numeric' => 'Vĩ độ phải là số.',
            'kinh_do.numeric' => 'Kinh độ phải là số.',
            'ten_lien_he.max' => 'Tên liên hệ không được vượt quá 255 ký tự.',
            'so_dien_thoai_lien_he.max' => 'Số điện thoại liên hệ không được vượt quá 20 ký tự.',
            'tien_ich_ids.array' => 'Danh sách tiện ích phải là mảng.',
            'tien_ich_ids.*.integer' => 'Mã tiện ích phải là số nguyên.',
            'tien_ich_ids.*.exists' => 'Tiện ích không tồn tại.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
