<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('phong_tro', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('nha_tro_id');
            $table->unsignedBigInteger('tin_dang_id')->nullable();
            $table->string('ten_phong');
            $table->decimal('gia_thue', 12, 0)->nullable();
            $table->decimal('dien_tich', 8, 2)->nullable();
            $table->enum('trang_thai', ['CON_TRONG', 'DANG_SUA_CHUA', 'HET_PHONG'])->default('CON_TRONG');
            $table->integer('suc_chua_toi_da')->default(1);
            $table->enum('gioi_tinh_duoc_thue', ['NAM', 'NU', 'KHONG_GIOI_HAN'])->default('KHONG_GIOI_HAN');
            $table->enum('tinh_trang_noi_that', ['TRONG', 'CO_BAN', 'DAY_DU', 'CAO_CAP'])->default('TRONG');
            $table->text('ghi_chu')->nullable();
            $table->dateTime('tao_luc')->useCurrent();
            $table->dateTime('cap_nhat_luc')->useCurrent()->useCurrentOnUpdate();

            $table->foreign('nha_tro_id')->references('id')->on('nha_tro')->onDelete('restrict');
            $table->foreign('tin_dang_id')->references('id')->on('tin_dang')->onDelete('set null');
        });
        DB::statement('CREATE INDEX idx_phong_tro_nha ON phong_tro(nha_tro_id)');
    }

    public function down(): void
    {
        Schema::dropIfExists('phong_tro');
    }
};
