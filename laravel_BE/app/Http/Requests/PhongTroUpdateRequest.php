<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PhongTroUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id' => 'required|integer|exists:phong_tro,id',
            'ten_phong' => 'required|string|max:255',
            'gia_thue' => 'required|numeric|min:0',
            'dien_tich' => 'required|numeric|min:0',
            'trang_thai' => 'required|in:CON_TRONG,DANG_SUA_CHUA,HET_PHONG',
            'suc_chua_toi_da' => 'required|integer|min:1',
            'gioi_tinh_duoc_thue' => 'required|in:NAM,NU,KHONG_GIOI_HAN',
            'tinh_trang_noi_that' => 'required|in:TRONG,CO_BAN,DAY_DU,CAO_CAP',
            'ghi_chu' => 'nullable|string',
            'anh_dai_dien' => 'nullable|string',
            'tien_ich_ids' => 'nullable|array',
            'tien_ich_ids.*' => 'integer|exists:tien_ich,id',
        ];
    }

    public function messages(): array
    {
        return [
            'id.required' => 'Mã phòng trọ không được để trống.',
            'id.integer' => 'Mã phòng trọ phải là số nguyên.',
            'id.exists' => 'Phòng trọ không tồn tại.',
            'ten_phong.required' => 'Tên phòng không được để trống.',
            'ten_phong.string' => 'Tên phòng phải là chuỗi.',
            'ten_phong.max' => 'Tên phòng không được vượt quá 255 ký tự.',
            'gia_thue.required' => 'Giá thuê không được để trống.',
            'gia_thue.numeric' => 'Giá thuê phải là số.',
            'gia_thue.min' => 'Giá thuê tối thiểu là 0.',
            'dien_tich.required' => 'Diện tích không được để trống.',
            'dien_tich.numeric' => 'Diện tích phải là số.',
            'dien_tich.min' => 'Diện tích tối thiểu là 0.',
            'trang_thai.required' => 'Trạng thái phòng không được để trống.',
            'trang_thai.in' => 'Trạng thái phòng không hợp lệ.',
            'suc_chua_toi_da.required' => 'Sức chứa tối đa không được để trống.',
            'suc_chua_toi_da.integer' => 'Sức chứa tối đa phải là số nguyên.',
            'suc_chua_toi_da.min' => 'Sức chứa tối đa tối thiểu là 1 người.',
            'gioi_tinh_duoc_thue.required' => 'Giới tính được thuê không được để trống.',
            'gioi_tinh_duoc_thue.in' => 'Giới tính được thuê không hợp lệ.',
            'tinh_trang_noi_that.required' => 'Tình trạng nội thất không được để trống.',
            'tinh_trang_noi_that.in' => 'Tình trạng nội thất không hợp lệ.',
            'ghi_chu.string' => 'Ghi chú phải là chuỗi.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
