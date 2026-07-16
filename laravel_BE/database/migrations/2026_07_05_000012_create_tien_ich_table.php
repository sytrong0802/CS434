<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tien_ich', function (Blueprint $table) {
            $table->increments('id');
            $table->string('ten_tien_ich', 100)->unique();
            $table->string('bieu_tuong', 50)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tien_ich');
    }
};
