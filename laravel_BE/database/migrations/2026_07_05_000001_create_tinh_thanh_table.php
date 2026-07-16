<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tinh_thanh', function (Blueprint $table) {
            $table->string('id', 10)->primary();
            $table->string('ten_tinh', 150);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tinh_thanh');
    }
};
