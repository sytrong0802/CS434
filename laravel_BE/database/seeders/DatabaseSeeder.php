<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            TinhThanhSeeder::class,
            QuanHuyenSeeder::class,
            PhuongXaSeeder::class,
            UserSeeder::class,
            EmailOtpSeeder::class,
            ThongTinChuTroSeeder::class,
            GoiDichVuSeeder::class,
            LichSuGiaoDichSeeder::class,
            TinDangSeeder::class,
            LichSuMuaGoiTinDangSeeder::class,
            HinhAnhTinDangSeeder::class,
            TienIchSeeder::class,
            TinDangTienIchSeeder::class,
            YeuThichSeeder::class,
            NhaTroSeeder::class,
            PhongTroSeeder::class,
            NguoiOPhongSeeder::class,
            LichHenXemPhongSeeder::class,
            DanhGiaSeeder::class,
            BaoCaoViPhamSeeder::class,
            ThongBaoSeeder::class,
            PhieuHoTroSeeder::class,
        ]);
    }
}
