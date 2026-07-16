<?php

namespace Database\Seeders;

use App\Models\NguoiOPhong;
use Illuminate\Database\Seeder;

class NguoiOPhongSeeder extends Seeder
{
    public function run(): void
    {
        NguoiOPhong::create([
            'phong_tro_id' => 2,
            'khach_hang_id' => 4,
            'ho_ten' => 'Phạm Văn Khách Hàng',
            'so_dien_thoai' => '0904444444',
            'gioi_tinh' => 'NAM',
            'ngay_vao' => '2023-01-01',
            'trang_thai' => 'DANG_O',
        ]);

        NguoiOPhong::create([
            'phong_tro_id' => 1,
            'khach_hang_id' => null,
            'ho_ten' => 'Trần Văn X',
            'so_dien_thoai' => '0988777666',
            'gioi_tinh' => 'NAM',
            'ngay_vao' => '2022-05-10',
            'ngay_roi' => '2022-12-31',
            'trang_thai' => 'DA_ROI',
        ]);
    }
}
