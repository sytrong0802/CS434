<?php

namespace Database\Seeders;

use App\Models\LichSuMuaGoiTinDang;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class LichSuMuaGoiTinDangSeeder extends Seeder
{
    public function run(): void
    {
        LichSuMuaGoiTinDang::create([
            'tin_dang_id' => 1,
            'user_id' => 2,
            'goi_dich_vu_id' => 3,
            'gia_tien' => 150000,
            'bat_dau_luc' => Carbon::now(),
            'ket_thuc_luc' => Carbon::now()->addDays(7),
            'trang_thai' => 'DANG_HIEU_LUC',
            'giao_dich_id' => 2,
        ]);

        LichSuMuaGoiTinDang::create([
            'tin_dang_id' => 2,
            'user_id' => 2,
            'goi_dich_vu_id' => 2,
            'gia_tien' => 50000,
            'bat_dau_luc' => Carbon::now()->subDays(10),
            'ket_thuc_luc' => Carbon::now()->subDays(3),
            'trang_thai' => 'HET_HAN',
        ]);
    }
}
