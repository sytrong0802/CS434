<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('danh_gia', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('khach_hang_id');
            $table->unsignedBigInteger('tin_dang_id');
            $table->tinyInteger('so_sao');
            $table->text('binh_luan')->nullable();
            $table->enum('trang_thai', ['HIEN_THI', 'DA_XOA'])->default('HIEN_THI');
            $table->dateTime('tao_luc')->useCurrent();
            $table->dateTime('cap_nhat_luc')->useCurrent()->useCurrentOnUpdate();

            $table->foreign('khach_hang_id')->references('id')->on('user');
            $table->foreign('tin_dang_id')->references('id')->on('tin_dang');
            $table->unique(['khach_hang_id', 'tin_dang_id'], 'uq_khach_tin_danh_gia');
        });
        if (DB::getDriverName() !== 'sqlite') {
            DB::statement('ALTER TABLE danh_gia ADD CONSTRAINT chk_so_sao CHECK (so_sao BETWEEN 1 AND 5)');
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('danh_gia');
    }
};
