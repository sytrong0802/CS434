<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tin_dang', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('chu_tro_id');
            $table->unsignedInteger('goi_dich_vu_id')->nullable();
            $table->string('tieu_de');
            $table->text('mo_ta')->nullable();
            $table->string('dia_chi_chi_tiet', 500);
            $table->string('phuong_xa_id', 10);
            $table->string('quan_huyen_id', 10);
            $table->string('tinh_thanh_id', 10);
            $table->decimal('gia_thue_min', 12, 0);
            $table->decimal('dien_tich_min', 8, 2)->nullable();
            $table->enum('loai_phong', ['PHONG_TRO', 'CHUNG_CU_MINI', 'NHA_NGUYEN_CAN', 'KY_TUC_XA', 'CAN_HO_DICH_VU'])->nullable();
            $table->enum('tinh_trang_noi_that', ['TRONG', 'CO_BAN', 'DAY_DU', 'CAO_CAP'])->default('TRONG');
            $table->decimal('diem_danh_gia', 2, 1)->default(0.0);
            $table->integer('luot_danh_gia')->default(0);
            $table->string('anh_dai_dien', 500)->nullable();
            $table->decimal('vi_do', 10, 7)->nullable();
            $table->decimal('kinh_do', 10, 7)->nullable();
            $table->string('ten_lien_he')->nullable();
            $table->string('so_dien_thoai_lien_he', 20)->nullable();
            $table->dateTime('ngay_het_han_goi')->nullable();
            $table->enum('trang_thai', ['CHO_XU_LY', 'HIEN_THI', 'TU_CHOI', 'AN_HIEN_THI'])->default('CHO_XU_LY');
            $table->text('ly_do_tu_choi')->nullable();
            $table->unsignedBigInteger('duyet_boi')->nullable();
            $table->dateTime('duyet_luc')->nullable();
            $table->dateTime('tao_luc')->useCurrent();
            $table->dateTime('cap_nhat_luc')->useCurrent()->useCurrentOnUpdate();

            $table->foreign('chu_tro_id')->references('id')->on('user')->onDelete('restrict');
            $table->foreign('goi_dich_vu_id')->references('id')->on('goi_dich_vu');
            $table->foreign('duyet_boi')->references('id')->on('user');
            $table->foreign('phuong_xa_id')->references('id')->on('phuong_xa');
            $table->foreign('quan_huyen_id')->references('id')->on('quan_huyen');
            $table->foreign('tinh_thanh_id')->references('id')->on('tinh_thanh');
        });
        if (DB::getDriverName() !== 'sqlite') {
            DB::statement('CREATE FULLTEXT INDEX ft_idx_tin_dang_text_search ON tin_dang(tieu_de, dia_chi_chi_tiet, mo_ta)');
            DB::statement('CREATE INDEX idx_tin_dang_search_filter ON tin_dang(trang_thai, tinh_thanh_id, quan_huyen_id, tinh_trang_noi_that, gia_thue_min, dien_tich_min, diem_danh_gia)');
            DB::statement('CREATE INDEX idx_tin_dang_goi_het_han ON tin_dang(goi_dich_vu_id, ngay_het_han_goi)');
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('tin_dang');
    }
};
