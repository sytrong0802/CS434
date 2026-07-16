<?php

namespace Database\Seeders;

use App\Models\GoiDichVu;
use Illuminate\Database\Seeder;

class GoiDichVuSeeder extends Seeder
{
    public function run(): void
    {
        GoiDichVu::create([
            'id' => 1,
            'ten_goi' => 'Gói Tin Thường',
            'mo_ta' => 'Hiển thị cơ bản dưới các tin VIP',
            'gia_tien' => 0,
            'so_ngay_hieu_luc' => 30,
            'do_uu_tien' => 0,
            'trang_thai' => 'HOAT_DONG',
        ]);

        GoiDichVu::create([
            'id' => 2,
            'ten_goi' => 'Gói VIP Bạc',
            'mo_ta' => 'Hiển thị trên tin thường, lượt xem tốt',
            'gia_tien' => 50000,
            'so_ngay_hieu_luc' => 7,
            'do_uu_tien' => 1,
            'trang_thai' => 'HOAT_DONG',
        ]);

        GoiDichVu::create([
            'id' => 3,
            'ten_goi' => 'Gói VIP Vàng',
            'mo_ta' => 'Hiển thị trên cùng, tiếp cận khách hàng tối đa',
            'gia_tien' => 150000,
            'so_ngay_hieu_luc' => 7,
            'do_uu_tien' => 2,
            'trang_thai' => 'HOAT_DONG',
        ]);
    }
}
