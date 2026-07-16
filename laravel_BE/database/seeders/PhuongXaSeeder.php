<?php

namespace Database\Seeders;

use App\Models\PhuongXa;
use Illuminate\Database\Seeder;

class PhuongXaSeeder extends Seeder
{
    public function run(): void
    {

        // Đọc dữ liệu hành chính từ file JSON
        $jsonPath = database_path('data/dvhcvn.json');
        if (file_exists($jsonPath)) {
            $jsonData = json_decode(file_get_contents($jsonPath), true);
            $wards = [];

            foreach ($jsonData['data'] as $province) {
                if (isset($province['level2s']) && is_array($province['level2s'])) {
                    foreach ($province['level2s'] as $district) {
                        if (isset($district['level3s']) && is_array($district['level3s'])) {
                            foreach ($district['level3s'] as $ward) {
                                $wards[] = [
                                    'id' => $ward['level3_id'],
                                    'quan_huyen_id' => $district['level2_id'],
                                    'ten_xa' => $ward['name'],
                                ];
                            }
                        }
                    }
                }
            }

            // Chèn theo lô (chunks) lớn để tối ưu hóa hiệu năng
            $chunks = array_chunk($wards, 1000);
            foreach ($chunks as $chunk) {
                PhuongXa::insertOrIgnore($chunk);
            }
        }
    }
}
