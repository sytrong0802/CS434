<?php

namespace Database\Seeders;

use App\Models\LichHenXemPhong;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class LichHenXemPhongSeeder extends Seeder
{
    public function run(): void
    {
        LichHenXemPhong::create([
            'khach_hang_id' => 4,
            'chu_tro_id' => 2,
            'tin_dang_id' => 1,
            'phong_tro_id' => 1,
            'thoi_gian_hen' => Carbon::now()->addDays(2),
            'loi_nhan' => 'Tôi muốn hẹn xem phòng vào buổi tối thứ 7',
            'trang_thai' => 'CHO_XAC_NHAN',
        ]);

        LichHenXemPhong::create([
            'khach_hang_id' => 5,
            'chu_tro_id' => 2,
            'tin_dang_id' => 2,
            'phong_tro_id' => 3,
            'thoi_gian_hen' => Carbon::now()->subDays(1),
            'loi_nhan' => 'Hẹn xem phòng lúc 3h chiều chủ nhật',
            'trang_thai' => 'DA_HOAN_THANH',
        ]);
    }
}
