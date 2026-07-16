<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('phong_tro', function (Blueprint $table) {
            $table->string('anh_dai_dien')->nullable()->after('ghi_chu');
            $table->json('tien_ich_ids')->nullable()->after('anh_dai_dien');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('phong_tro', function (Blueprint $table) {
            $table->dropColumn(['anh_dai_dien', 'tien_ich_ids']);
        });
    }
};
