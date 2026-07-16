<?php

namespace Database\Seeders;

use App\Models\TinDangTienIch;
use Illuminate\Database\Seeder;

class TinDangTienIchSeeder extends Seeder
{
    public function run(): void
    {
        TinDangTienIch::create(['tin_dang_id' => 1, 'tien_ich_id' => 1]);
        TinDangTienIch::create(['tin_dang_id' => 1, 'tien_ich_id' => 2]);
        TinDangTienIch::create(['tin_dang_id' => 2, 'tien_ich_id' => 1]);
        TinDangTienIch::create(['tin_dang_id' => 2, 'tien_ich_id' => 3]);
    }
}
