<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('yeu_thich', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('tin_dang_id');
            $table->dateTime('tao_luc')->useCurrent();
            $table->primary(['user_id', 'tin_dang_id']);
            $table->foreign('user_id')->references('id')->on('user')->onDelete('cascade');
            $table->foreign('tin_dang_id')->references('id')->on('tin_dang')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('yeu_thich');
    }
};
