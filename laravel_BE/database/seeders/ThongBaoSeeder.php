<?php

namespace Database\Seeders;

use App\Models\ThongBao;
use Illuminate\Database\Seeder;

class ThongBaoSeeder extends Seeder
{
    public function run(): void
    {
        ThongBao::create([
            'user_id' => 2,
            'tieu_de' => 'Tin đăng đã được duyệt',
            'noi_dung' => 'Tin đăng "Phòng trọ cao cấp trung tâm Cầu Giấy" của bạn đã hiển thị công khai.',
            'loai_thong_bao' => 'TIN_DANG',
            'da_doc' => false,
        ]);

        ThongBao::create([
            'user_id' => 4,
            'tieu_de' => 'Lịch hẹn xem phòng thành công',
            'noi_dung' => 'Chủ trọ đã chấp nhận lịch xem phòng lúc 19h00 ngày mai.',
            'loai_thong_bao' => 'LICH_HEN',
            'da_doc' => true,
        ]);
    }
}
