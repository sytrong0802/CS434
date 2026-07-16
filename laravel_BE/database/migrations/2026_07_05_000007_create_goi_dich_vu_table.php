<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('goi_dich_vu', function (Blueprint $table) {
            $table->increments('id');
            $table->string('ten_goi', 100);
            $table->text('mo_ta')->nullable();
            $table->decimal('gia_tien', 12, 0);
            $table->integer('so_ngay_hieu_luc');
            $table->integer('do_uu_tien')->default(0);
            $table->enum('trang_thai', ['HOAT_DONG', 'NGUNG_CUNG_CAP'])->default('HOAT_DONG');
            $table->dateTime('tao_luc')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('goi_dich_vu');
    }
};
