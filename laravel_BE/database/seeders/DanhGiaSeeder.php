<?php

namespace Database\Seeders;

use App\Models\DanhGia;
use Illuminate\Database\Seeder;

class DanhGiaSeeder extends Seeder
{
    public function run(): void
    {
        DanhGia::create([
            'khach_hang_id' => 4,
            'tin_dang_id' => 1,
            'so_sao' => 4,
            'binh_luan' => 'Phòng sạch sẽ, chủ nhà thân thiện.',
            'trang_thai' => 'HIEN_THI',
        ]);

        DanhGia::create([
            'khach_hang_id' => 5,
            'tin_dang_id' => 1,
            'so_sao' => 5,
            'binh_luan' => 'Tuyệt vời, đầy đủ tiện ích như mô tả.',
            'trang_thai' => 'HIEN_THI',
        ]);
    }
}
