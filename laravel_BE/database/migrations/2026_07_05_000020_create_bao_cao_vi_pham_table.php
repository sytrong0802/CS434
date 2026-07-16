<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bao_cao_vi_pham', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('nguoi_bao_cao_id');
            $table->unsignedBigInteger('tin_dang_id');
            $table->enum('ly_do', ['SAI_THONG_TIN', 'PHONG_KHONG_TON_TAI', 'LUA_DAO', 'SAI_GIA', 'SAI_HINH_ANH', 'CHU_TRO_KHONG_PHU_HOP', 'KHAC']);
            $table->text('mo_ta')->nullable();
            $table->enum('trang_thai', ['CHO_XU_LY', 'DA_XU_LY', 'TU_CHOI'])->default('CHO_XU_LY');
            $table->text('ghi_chu_admin')->nullable();
            $table->unsignedBigInteger('xu_ly_boi')->nullable();
            $table->dateTime('xu_ly_luc')->nullable();
            $table->dateTime('tao_luc')->useCurrent();

            $table->foreign('nguoi_bao_cao_id')->references('id')->on('user');
            $table->foreign('tin_dang_id')->references('id')->on('tin_dang');
            $table->foreign('xu_ly_boi')->references('id')->on('user');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bao_cao_vi_pham');
    }
};
