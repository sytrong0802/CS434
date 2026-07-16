<?php

namespace Database\Seeders;

use App\Models\EmailOtp;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;

class EmailOtpSeeder extends Seeder
{
    public function run(): void
    {
        EmailOtp::create([
            'user_id' => 4,
            'ma_xac_nhan_hash' => Hash::make('123456'),
            'muc_dich' => 'DANG_KY',
            'so_lan_nhap_sai' => 0,
            'ip_tao' => '127.0.0.1',
            'het_han_luc' => Carbon::now()->addHours(1),
        ]);

        EmailOtp::create([
            'user_id' => 5,
            'ma_xac_nhan_hash' => Hash::make('654321'),
            'muc_dich' => 'QUEN_MAT_KHAU',
            'so_lan_nhap_sai' => 1,
            'ip_tao' => '127.0.0.1',
            'het_han_luc' => Carbon::now()->addHours(1),
        ]);

        EmailOtp::create([
            'user_id' => 2,
            'ma_xac_nhan_hash' => Hash::make('111111'),
            'muc_dich' => 'DANG_KY',
            'so_lan_nhap_sai' => 0,
            'ip_tao' => '127.0.0.1',
            'het_han_luc' => Carbon::now()->subHours(1),
            'da_dung_luc' => Carbon::now()->subMinutes(55),
        ]);
    }
}
