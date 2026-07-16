<?php

namespace Database\Seeders;

use App\Models\QuanHuyen;
use Illuminate\Database\Seeder;

class QuanHuyenSeeder extends Seeder
{
    public function run(): void
    {

        // Đọc dữ liệu hành chính từ file JSON
        $jsonPath = database_path('data/dvhcvn.json');
        if (file_exists($jsonPath)) {
            $jsonData = json_decode(file_get_contents($jsonPath), true);
            $districts = [];

            foreach ($jsonData['data'] as $province) {
                if (isset($province['level2s']) && is_array($province['level2s'])) {
                    foreach ($province['level2s'] as $district) {
                        $districts[] = [
                            'id' => $district['level2_id'],
                            'tinh_thanh_id' => $province['level1_id'],
                            'ten_quan' => $district['name'],
                        ];
                    }
                }
            }

            // Chèn theo lô để tối ưu hiệu năng
            $chunks = array_chunk($districts, 500);
            foreach ($chunks as $chunk) {
                QuanHuyen::insertOrIgnore($chunk);
            }
        }
    }
}
