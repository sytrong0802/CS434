<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('thong_bao', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('tieu_de');
            $table->text('noi_dung')->nullable();
            $table->string('loai_thong_bao', 100)->nullable();
            $table->boolean('da_doc')->default(false);
            $table->dateTime('tao_luc')->useCurrent();

            $table->foreign('user_id')->references('id')->on('user')->onDelete('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('thong_bao');
    }
};
