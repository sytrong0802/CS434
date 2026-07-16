<?php

namespace Database\Seeders;

use App\Models\BaoCaoViPham;
use Illuminate\Database\Seeder;

class BaoCaoViPhamSeeder extends Seeder
{
    public function run(): void
    {
        BaoCaoViPham::create([
            'nguoi_bao_cao_id' => 4,
            'tin_dang_id' => 2,
            'ly_do' => 'SAI_GIA',
            'mo_ta' => 'Giá hiển thị 4.5 triệu nhưng gọi điện báo 5.5 triệu.',
            'trang_thai' => 'CHO_XU_LY',
        ]);
    }
}
