<?php

namespace Database\Seeders;

use App\Models\TinDang;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class TinDangSeeder extends Seeder
{
    public function run(): void
    {
        TinDang::create([
            'id' => 1,
            'chu_tro_id' => 2,
            'goi_dich_vu_id' => 3,
            'tieu_de' => 'Phòng trọ cao cấp trung tâm Cầu Giấy full nội thất',
            'mo_ta' => 'Phòng trọ khép kín, đầy đủ điều hòa, nóng lạnh, giường tủ, máy giặt riêng, giờ giấc tự do không chung chủ.',
            'dia_chi_chi_tiet' => 'Số 15 ngõ 102 Trần Thái Tông',
            'phuong_xa_id' => '00166',
            'quan_huyen_id' => '005',
            'tinh_thanh_id' => '01',
            'gia_thue_min' => 3500000,
            'dien_tich_min' => 25.00,
            'loai_phong' => 'PHONG_TRO',
            'tinh_trang_noi_that' => 'DAY_DU',
            'diem_danh_gia' => 4.5,
            'luot_danh_gia' => 2,
            'anh_dai_dien' => 'https://example.com/tin-dang/phong-tro-1.jpg',
            'vi_do' => 21.0278,
            'kinh_do' => 105.7890,
            'ten_lien_he' => 'Anh Nguyễn Văn A',
            'so_dien_thoai_lien_he' => '0902222222',
            'ngay_het_han_goi' => Carbon::now()->addDays(7),
            'trang_thai' => 'HIEN_THI',
            'duyet_boi' => 1,
            'duyet_luc' => Carbon::now(),
        ]);

        TinDang::create([
            'id' => 2,
            'chu_tro_id' => 2,
            'goi_dich_vu_id' => 2,
            'tieu_de' => 'Chung cư mini Thanh Xuân gần các trường đại học lớn',
            'mo_ta' => 'Căn hộ dịch vụ tiện nghi, thoáng mát, thang máy, ban công phơi đồ rộng rãi, khu vực an ninh tốt.',
            'dia_chi_chi_tiet' => 'Số 45 ngõ 203 Vũ Tông Phan',
            'phuong_xa_id' => '00343',
            'quan_huyen_id' => '009',
            'tinh_thanh_id' => '01',
            'gia_thue_min' => 4500000,
            'dien_tich_min' => 32.50,
            'loai_phong' => 'CHUNG_CU_MINI',
            'tinh_trang_noi_that' => 'CAO_CAP',
            'diem_danh_gia' => 5.0,
            'luot_danh_gia' => 1,
            'anh_dai_dien' => 'https://example.com/tin-dang/phong-tro-2.jpg',
            'vi_do' => 20.9984,
            'kinh_do' => 105.8122,
            'ten_lien_he' => 'Anh Nguyễn Văn A',
            'so_dien_thoai_lien_he' => '0902222222',
            'ngay_het_han_goi' => Carbon::now()->addDays(7),
            'trang_thai' => 'HIEN_THI',
            'duyet_boi' => 1,
            'duyet_luc' => Carbon::now(),
        ]);

        TinDang::create([
            'id' => 3,
            'chu_tro_id' => 3,
            'goi_dich_vu_id' => 1,
            'tieu_de' => 'Nhà nguyên căn 3 tầng Quận 1 tiện làm văn phòng hoặc ở ghép',
            'mo_ta' => 'Cho thuê nhà nguyên căn 3 tầng rộng rãi, hẻm xe hơi tránh nhau, đầy đủ tiện ích xung quanh.',
            'dia_chi_chi_tiet' => '12/8 Lê Thánh Tôn',
            'phuong_xa_id' => '26740',
            'quan_huyen_id' => '760',
            'tinh_thanh_id' => '79',
            'gia_thue_min' => 25000000,
            'dien_tich_min' => 120.00,
            'loai_phong' => 'NHA_NGUYEN_CAN',
            'tinh_trang_noi_that' => 'CO_BAN',
            'diem_danh_gia' => 0.0,
            'luot_danh_gia' => 0,
            'anh_dai_dien' => 'https://example.com/tin-dang/phong-tro-3.jpg',
            'vi_do' => 10.7782,
            'kinh_do' => 106.7021,
            'ten_lien_he' => 'Chị Lê Thị B',
            'so_dien_thoai_lien_he' => '0903333333',
            'trang_thai' => 'CHO_XU_LY',
        ]);
    }
}
