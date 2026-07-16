<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user', function (Blueprint $table) {
            $table->id();
            $table->string('ho_ten');
            $table->string('email')->unique();
            $table->string('so_dien_thoai', 20)->unique()->nullable();
            $table->string('password');
            $table->string('hash_password')->nullable();
            $table->string('avatar_url', 500)->nullable();
            $table->enum('vai_tro', ['KHACH_HANG', 'CHU_TRO', 'ADMIN'])->default('KHACH_HANG');
            $table->decimal('so_du', 12, 0)->default(0);
            $table->enum('trang_thai', ['HOAT_DONG', 'BI_KHOA', 'CHO_XAC_THUC', 'DA_XOA'])->default('CHO_XAC_THUC');
            $table->text('ly_do_khoa')->nullable();
            $table->dateTime('tao_luc')->useCurrent();
            $table->dateTime('cap_nhat_luc')->useCurrent()->useCurrentOnUpdate();
        });
        if (DB::getDriverName() !== 'sqlite') {
            DB::statement('ALTER TABLE user ADD CONSTRAINT chk_so_du_khong_am CHECK (so_du >= 0)');
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('user');
    }
};
