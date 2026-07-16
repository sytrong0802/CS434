<?php

namespace Database\Seeders;

use App\Models\TinhThanh;
use Illuminate\Database\Seeder;

class TinhThanhSeeder extends Seeder
{
    public function run(): void
    {

        // Đọc dữ liệu hành chính từ file JSON
        $jsonPath = database_path('data/dvhcvn.json');
        if (file_exists($jsonPath)) {
            $jsonData = json_decode(file_get_contents($jsonPath), true);
            $provinces = [];

            foreach ($jsonData['data'] as $province) {
                $provinces[] = [
                    'id' => $province['level1_id'],
                    'ten_tinh' => $province['name'],
                ];
            }

            TinhThanh::insertOrIgnore($provinces);
        }
    }
}
