<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('phuong_xa', function (Blueprint $table) {
            $table->string('id', 10)->primary();
            $table->string('quan_huyen_id', 10);
            $table->string('ten_xa', 150);
            $table->foreign('quan_huyen_id')->references('id')->on('quan_huyen');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('phuong_xa');
    }
};
