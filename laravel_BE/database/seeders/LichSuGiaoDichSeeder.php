<?php

namespace Database\Seeders;

use App\Models\LichSuGiaoDich;
use Illuminate\Database\Seeder;

class LichSuGiaoDichSeeder extends Seeder
{
    public function run(): void
    {
        LichSuGiaoDich::create([
            'id' => 1,
            'user_id' => 2,
            'loai_giao_dich' => 'NAP_TIEN',
            'so_tien' => 2000000,
            'so_du_cuoi' => 2000000,
            'ma_giao_dich_doi_tac' => 'VNP123456',
            'mo_ta' => 'Nạp tiền qua VNPay',
        ]);

        LichSuGiaoDich::create([
            'id' => 2,
            'user_id' => 2,
            'loai_giao_dich' => 'TRU_TIEN_MUA_GOI',
            'so_tien' => 500000,
            'so_du_cuoi' => 1500000,
            'ma_giao_dich_doi_tac' => 'BUY001',
            'mo_ta' => 'Thanh toán gói dịch vụ VIP',
        ]);

        LichSuGiaoDich::create([
            'id' => 3,
            'user_id' => 3,
            'loai_giao_dich' => 'NAP_TIEN',
            'so_tien' => 500000,
            'so_du_cuoi' => 500000,
            'ma_giao_dich_doi_tac' => 'VNP789012',
            'mo_ta' => 'Nạp tiền ví Momo',
        ]);
    }
}
