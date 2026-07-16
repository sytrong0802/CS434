<?php

namespace Database\Seeders;

use App\Models\PhongTro;
use Illuminate\Database\Seeder;

class PhongTroSeeder extends Seeder
{
    public function run(): void
    {
        PhongTro::create([
            'id' => 1,
            'nha_tro_id' => 1,
            'tin_dang_id' => 1,
            'ten_phong' => 'Phòng 101',
            'gia_thue' => 3500000,
            'dien_tich' => 25.00,
            'trang_thai' => 'CON_TRONG',
            'suc_chua_toi_da' => 2,
            'gioi_tinh_duoc_thue' => 'KHONG_GIOI_HAN',
            'tinh_trang_noi_that' => 'DAY_DU',
            'ghi_chu' => 'Phòng tầng 1, thoáng mát',
        ]);

        PhongTro::create([
            'id' => 2,
            'nha_tro_id' => 1,
            'tin_dang_id' => null,
            'ten_phong' => 'Phòng 102',
            'gia_thue' => 3600000,
            'dien_tich' => 26.00,
            'trang_thai' => 'HET_PHONG',
            'suc_chua_toi_da' => 2,
            'gioi_tinh_duoc_thue' => 'KHONG_GIOI_HAN',
            'tinh_trang_noi_that' => 'DAY_DU',
            'ghi_chu' => 'Đã cho thuê lâu dài',
        ]);

        PhongTro::create([
            'id' => 3,
            'nha_tro_id' => 2,
            'tin_dang_id' => 2,
            'ten_phong' => 'Phòng 201',
            'gia_thue' => 4500000,
            'dien_tich' => 32.50,
            'trang_thai' => 'CON_TRONG',
            'suc_chua_toi_da' => 3,
            'gioi_tinh_duoc_thue' => 'NAM',
            'tinh_trang_noi_that' => 'CAO_CAP',
            'ghi_chu' => 'Ban công hướng Đông',
        ]);
    }
}
