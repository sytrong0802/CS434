<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'id' => 1,
            'ho_ten' => 'Admin Hệ Thống',
            'email' => 'admin@phongtro.com',
            'so_dien_thoai' => '0901111111',
            'password' => Hash::make('123456'),
            'vai_tro' => 'ADMIN',
            'trang_thai' => 'HOAT_DONG',
        ]);

        User::create([
            'id' => 2,
            'ho_ten' => 'Nguyễn Văn Chủ Trọ',
            'email' => 'chutro1@phongtro.com',
            'so_dien_thoai' => '0902222222',
            'password' => Hash::make('123456'),
            'vai_tro' => 'CHU_TRO',
            'so_du' => 1500000,
            'trang_thai' => 'HOAT_DONG',
        ]);

        User::create([
            'id' => 3,
            'ho_ten' => 'Lê Thị Chủ Trọ',
            'email' => 'chutro2@phongtro.com',
            'so_dien_thoai' => '0903333333',
            'password' => Hash::make('123456'),
            'vai_tro' => 'CHU_TRO',
            'so_du' => 500000,
            'trang_thai' => 'HOAT_DONG',
        ]);

        User::create([
            'id' => 4,
            'ho_ten' => 'Phạm Văn Khách Hàng',
            'email' => 'khach1@gmail.com',
            'so_dien_thoai' => '0904444444',
            'password' => Hash::make('123456'),
            'vai_tro' => 'KHACH_HANG',
            'trang_thai' => 'HOAT_DONG',
        ]);

        User::create([
            'id' => 5,
            'ho_ten' => 'Trần Thị Khách Hàng',
            'email' => 'khach2@gmail.com',
            'so_dien_thoai' => '0905555555',
            'password' => Hash::make('123456'),
            'vai_tro' => 'KHACH_HANG',
            'trang_thai' => 'HOAT_DONG',
        ]);
    }
}
