<?php

namespace Database\Seeders;

use App\Models\NhaTro;
use Illuminate\Database\Seeder;

class NhaTroSeeder extends Seeder
{
    public function run(): void
    {
        NhaTro::create([
            'id' => 1,
            'chu_tro_id' => 2,
            'ten_nha_tro' => 'Nhà trọ Trần Thái Tông',
            'dia_chi_chi_tiet' => 'Số 15 ngõ 102 Trần Thái Tông',
            'phuong_xa_id' => '00166',
            'quan_huyen_id' => '005',
            'tinh_thanh_id' => '01',
            'vi_do' => 21.0278,
            'kinh_do' => 105.7890,
        ]);

        NhaTro::create([
            'id' => 2,
            'chu_tro_id' => 2,
            'ten_nha_tro' => 'Chung cư mini Vũ Tông Phan',
            'dia_chi_chi_tiet' => 'Số 45 ngõ 203 Vũ Tông Phan',
            'phuong_xa_id' => '00343',
            'quan_huyen_id' => '009',
            'tinh_thanh_id' => '01',
            'vi_do' => 20.9984,
            'kinh_do' => 105.8122,
        ]);
    }
}
