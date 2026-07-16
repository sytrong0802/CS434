<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quan_huyen', function (Blueprint $table) {
            $table->string('id', 10)->primary();
            $table->string('tinh_thanh_id', 10);
            $table->string('ten_quan', 150);
            $table->foreign('tinh_thanh_id')->references('id')->on('tinh_thanh');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quan_huyen');
    }
};
