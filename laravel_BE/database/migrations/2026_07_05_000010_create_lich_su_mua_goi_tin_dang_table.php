<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lich_su_mua_goi_tin_dang', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tin_dang_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedInteger('goi_dich_vu_id');
            $table->decimal('gia_tien', 12, 0);
            $table->dateTime('bat_dau_luc');
            $table->dateTime('ket_thuc_luc');
            $table->enum('trang_thai', ['DANG_HIEU_LUC', 'HET_HAN', 'DA_HUY', 'HOAN_TIEN'])->default('DANG_HIEU_LUC');
            $table->unsignedBigInteger('giao_dich_id')->nullable();
            $table->dateTime('tao_luc')->useCurrent();

            $table->foreign('tin_dang_id')->references('id')->on('tin_dang');
            $table->foreign('user_id')->references('id')->on('user');
            $table->foreign('goi_dich_vu_id')->references('id')->on('goi_dich_vu');
            $table->foreign('giao_dich_id')->references('id')->on('lich_su_giao_dich');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lich_su_mua_goi_tin_dang');
    }
};
