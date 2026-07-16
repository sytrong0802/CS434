<?php

namespace Database\Seeders;

use App\Models\ThongTinChuTro;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class ThongTinChuTroSeeder extends Seeder
{
    public function run(): void
    {
        ThongTinChuTro::create([
            'user_id' => 2,
            'so_cccd_passport' => '001090123456',
            'ho_ten_khai_sinh' => 'NGUYỄN VĂN CHỦ TRỌ',
            'ngay_cap' => '2020-01-15',
            'noi_cap' => 'Cục Cảnh sát Quản lý hành chính',
            'anh_cccd_mat_truoc' => 'https://example.com/cccd/mat-truoc-1.jpg',
            'anh_cccd_mat_sau' => 'https://example.com/cccd/mat-sau-1.jpg',
            'anh_chan_dung_hop_dong' => 'https://example.com/cccd/chan-dung-1.jpg',
            'ten_ngan_hang' => 'Vietcombank',
            'so_tai_khoan' => '1012345678',
            'ten_chu_tai_khoan' => 'NGUYEN VAN CHU TRO',
            'trang_thai_kyc' => 'DA_XAC_MINH',
            'duyet_kyc_boi' => 1,
            'duyet_kyc_luc' => Carbon::now(),
        ]);

        ThongTinChuTro::create([
            'user_id' => 3,
            'so_cccd_passport' => '002090123456',
            'ho_ten_khai_sinh' => 'LÊ THỊ CHỦ TRỌ',
            'ngay_cap' => '2021-05-20',
            'noi_cap' => 'Cục Cảnh sát Quản lý hành chính',
            'anh_cccd_mat_truoc' => 'https://example.com/cccd/mat-truoc-2.jpg',
            'anh_cccd_mat_sau' => 'https://example.com/cccd/mat-sau-2.jpg',
            'anh_chan_dung_hop_dong' => 'https://example.com/cccd/chan-dung-2.jpg',
            'ten_ngan_hang' => 'Techcombank',
            'so_tai_khoan' => '190123456789',
            'ten_chu_tai_khoan' => 'LE THI CHU TRO',
            'trang_thai_kyc' => 'CHO_DUYET',
        ]);
    }
}
