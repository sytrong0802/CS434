<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LichSuGiaoDichDepositRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'so_tien' => 'required|numeric|min:10000',
            'ma_giao_dich_doi_tac' => 'required|string|max:100|unique:lich_su_giao_dich,ma_giao_dich_doi_tac',
            'mo_ta' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'so_tien.required' => 'Số tiền nạp không được để trống.',
            'so_tien.numeric' => 'Số tiền nạp phải là số.',
            'so_tien.min' => 'Số tiền nạp tối thiểu là 10,000 VND.',
            'ma_giao_dich_doi_tac.required' => 'Mã giao dịch đối tác không được để trống.',
            'ma_giao_dich_doi_tac.string' => 'Mã giao dịch đối tác phải là chuỗi.',
            'ma_giao_dich_doi_tac.max' => 'Mã giao dịch đối tác không được vượt quá 100 ký tự.',
            'ma_giao_dich_doi_tac.unique' => 'Mã giao dịch này đã tồn tại trên hệ thống.',
            'mo_ta.string' => 'Mô tả phải là chuỗi.',
        ];
    }

    public function message(): array
    {
        return $this->messages();
    }
}
