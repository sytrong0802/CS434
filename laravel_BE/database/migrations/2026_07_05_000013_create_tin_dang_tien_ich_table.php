<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tin_dang_tien_ich', function (Blueprint $table) {
            $table->unsignedBigInteger('tin_dang_id');
            $table->unsignedInteger('tien_ich_id');
            $table->primary(['tin_dang_id', 'tien_ich_id']);
            $table->foreign('tin_dang_id')->references('id')->on('tin_dang')->onDelete('cascade');
            $table->foreign('tien_ich_id')->references('id')->on('tien_ich')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tin_dang_tien_ich');
    }
};
