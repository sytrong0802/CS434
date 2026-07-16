<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('email_otp', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('ma_xac_nhan_hash');
            $table->enum('muc_dich', ['DANG_KY', 'QUEN_MAT_KHAU']);
            $table->integer('so_lan_nhap_sai')->default(0);
            $table->string('ip_tao', 45)->nullable();
            $table->dateTime('het_han_luc');
            $table->dateTime('da_dung_luc')->nullable();
            $table->dateTime('tao_luc')->useCurrent();
            $table->foreign('user_id')->references('id')->on('user')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('email_otp');
    }
};
