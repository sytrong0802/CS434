<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hinh_anh_tin_dang', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tin_dang_id');
            $table->string('url_anh', 500);
            $table->dateTime('tao_luc')->useCurrent();
            $table->foreign('tin_dang_id')->references('id')->on('tin_dang')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hinh_anh_tin_dang');
    }
};
