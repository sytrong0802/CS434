<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lich_hen_xem_phong', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('khach_hang_id');
            $table->unsignedBigInteger('chu_tro_id');
            $table->unsignedBigInteger('tin_dang_id');
            $table->unsignedBigInteger('phong_tro_id')->nullable();
            $table->dateTime('thoi_gian_hen');
            $table->text('loi_nhan')->nullable();
            $table->enum('trang_thai', ['CHO_XAC_NHAN', 'DA_CHAP_NHAN', 'TU_CHOI', 'DA_HUY', 'DA_HOAN_THANH'])->default('CHO_XAC_NHAN');
            $table->text('ly_do_tu_choi')->nullable();
            $table->dateTime('tao_luc')->useCurrent();
            $table->dateTime('cap_nhat_luc')->useCurrent()->useCurrentOnUpdate();

            $table->foreign('khach_hang_id')->references('id')->on('user');
            $table->foreign('chu_tro_id')->references('id')->on('user');
            $table->foreign('tin_dang_id')->references('id')->on('tin_dang');
            $table->foreign('phong_tro_id')->references('id')->on('phong_tro')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lich_hen_xem_phong');
    }
};
