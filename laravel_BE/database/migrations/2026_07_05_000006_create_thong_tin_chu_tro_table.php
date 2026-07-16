<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('thong_tin_chu_tro', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->primary();
            $table->string('so_cccd_passport', 20)->unique();
            $table->string('ho_ten_khai_sinh');
            $table->date('ngay_cap');
            $table->string('noi_cap');
            $table->string('anh_cccd_mat_truoc', 500);
            $table->string('anh_cccd_mat_sau', 500);
            $table->string('anh_chan_dung_hop_dong', 500)->nullable();
            $table->string('ten_ngan_hang', 100);
            $table->string('so_tai_khoan', 50);
            $table->string('ten_chu_tai_khoan');
            $table->enum('trang_thai_kyc', ['CHUA_XAC_MINH', 'CHO_DUYET', 'DA_XAC_MINH', 'BI_TU_CHOI'])->default('CHUA_XAC_MINH');
            $table->text('ly_do_tu_choi_kyc')->nullable();
            $table->unsignedBigInteger('duyet_kyc_boi')->nullable();
            $table->dateTime('duyet_kyc_luc')->nullable();
            $table->dateTime('cap_nhat_luc')->useCurrent()->useCurrentOnUpdate();

            $table->foreign('user_id')->references('id')->on('user')->onDelete('restrict');
            $table->foreign('duyet_kyc_boi')->references('id')->on('user');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('thong_tin_chu_tro');
    }
};
