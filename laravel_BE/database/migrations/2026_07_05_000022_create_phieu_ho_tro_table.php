<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('phieu_ho_tro', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('tieu_de');
            $table->text('noi_dung');
            $table->enum('trang_thai', ['MOI', 'DANG_XU_LY', 'DA_DONG'])->default('MOI');
            $table->dateTime('tao_luc')->useCurrent();
            $table->dateTime('cap_nhat_luc')->useCurrent()->useCurrentOnUpdate();

            $table->foreign('user_id')->references('id')->on('user')->onDelete('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('phieu_ho_tro');
    }
};
