<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('nguoi_o_phong', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('phong_tro_id');
            $table->unsignedBigInteger('khach_hang_id')->nullable();
            $table->string('ho_ten');
            $table->string('so_dien_thoai', 20)->nullable();
            $table->enum('gioi_tinh', ['NAM', 'NU']);
            $table->date('ngay_vao');
            $table->date('ngay_roi')->nullable();
            $table->enum('trang_thai', ['DANG_O', 'DA_ROI'])->default('DANG_O');
            $table->dateTime('tao_luc')->useCurrent();
            $table->dateTime('cap_nhat_luc')->useCurrent()->useCurrentOnUpdate();

            $table->foreign('phong_tro_id')->references('id')->on('phong_tro')->onDelete('restrict');
            $table->foreign('khach_hang_id')->references('id')->on('user')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('nguoi_o_phong');
    }
};
