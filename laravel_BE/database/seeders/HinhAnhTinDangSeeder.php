<?php

namespace Database\Seeders;

use App\Models\HinhAnhTinDang;
use Illuminate\Database\Seeder;

class HinhAnhTinDangSeeder extends Seeder
{
    public function run(): void
    {
        HinhAnhTinDang::create(['tin_dang_id' => 1, 'url_anh' => 'https://example.com/tin-dang/phong-tro-1-1.jpg']);
        HinhAnhTinDang::create(['tin_dang_id' => 1, 'url_anh' => 'https://example.com/tin-dang/phong-tro-1-2.jpg']);
        HinhAnhTinDang::create(['tin_dang_id' => 2, 'url_anh' => 'https://example.com/tin-dang/phong-tro-2-1.jpg']);
    }
}
