<?php

namespace Database\Seeders;

use App\Models\YeuThich;
use Illuminate\Database\Seeder;

class YeuThichSeeder extends Seeder
{
    public function run(): void
    {
        YeuThich::create(['user_id' => 4, 'tin_dang_id' => 1]);
        YeuThich::create(['user_id' => 5, 'tin_dang_id' => 1]);
        YeuThich::create(['user_id' => 4, 'tin_dang_id' => 2]);
    }
}
