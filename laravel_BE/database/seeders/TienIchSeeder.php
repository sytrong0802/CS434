<?php

namespace Database\Seeders;

use App\Models\TienIch;
use Illuminate\Database\Seeder;

class TienIchSeeder extends Seeder
{
    public function run(): void
    {
        TienIch::create(['id' => 1, 'ten_tien_ich' => 'Wifi miễn phí', 'bieu_tuong' => 'wifi']);
        TienIch::create(['id' => 2, 'ten_tien_ich' => 'Điều hòa nhiệt độ', 'bieu_tuong' => 'air-con']);
        TienIch::create(['id' => 3, 'ten_tien_ich' => 'Máy giặt đồ', 'bieu_tuong' => 'washing-machine']);
        TienIch::create(['id' => 4, 'ten_tien_ich' => 'Có chỗ để xe', 'bieu_tuong' => 'parking']);
    }
}
