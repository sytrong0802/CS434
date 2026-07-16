<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('nha_tro', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('chu_tro_id');
            $table->string('ten_nha_tro');
            $table->string('dia_chi_chi_tiet', 500);
            $table->string('phuong_xa_id', 10);
            $table->string('quan_huyen_id', 10);
            $table->string('tinh_thanh_id', 10);
            $table->decimal('vi_do', 10, 7)->nullable();
            $table->decimal('kinh_do', 10, 7)->nullable();
            $table->dateTime('tao_luc')->useCurrent();
            $table->dateTime('cap_nhat_luc')->useCurrent()->useCurrentOnUpdate();

            $table->foreign('chu_tro_id')->references('id')->on('user')->onDelete('restrict');
            $table->foreign('phuong_xa_id')->references('id')->on('phuong_xa');
            $table->foreign('quan_huyen_id')->references('id')->on('quan_huyen');
            $table->foreign('tinh_thanh_id')->references('id')->on('tinh_thanh');
        });
        DB::statement('CREATE INDEX idx_nha_tro_chu ON nha_tro(chu_tro_id)');
    }

    public function down(): void
    {
        Schema::dropIfExists('nha_tro');
    }
};
