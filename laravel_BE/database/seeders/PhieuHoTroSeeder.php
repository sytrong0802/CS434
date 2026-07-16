<?php

namespace Database\Seeders;

use App\Models\PhieuHoTro;
use Illuminate\Database\Seeder;

class PhieuHoTroSeeder extends Seeder
{
    public function run(): void
    {
        PhieuHoTro::create([
            'user_id' => 2,
            'tieu_de' => 'Lỗi nạp tiền ví điện tử',
            'noi_dung' => 'Tôi đã nạp tiền qua ví VNPay và bị trừ tiền ngân hàng nhưng tài khoản app vẫn chưa được cộng số dư.',
            'trang_thai' => 'MOI',
        ]);

        PhieuHoTro::create([
            'user_id' => 5,
            'tieu_de' => 'Tài khoản bị khóa chức năng bình luận',
            'noi_dung' => 'Tôi viết đánh giá trung thực nhưng nhận được thông báo bị khóa.',
            'trang_thai' => 'DANG_XU_LY',
        ]);
    }
}
