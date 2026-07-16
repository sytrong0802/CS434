<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lich_su_giao_dich', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->enum('loai_giao_dich', ['NAP_TIEN', 'TRU_TIEN_MUA_GOI', 'HOAN_TIEN']);
            $table->decimal('so_tien', 12, 0);
            $table->decimal('so_du_cuoi', 12, 0);
            $table->string('ma_giao_dich_doi_tac', 100)->unique()->nullable();
            $table->text('mo_ta')->nullable();
            $table->dateTime('tao_luc')->useCurrent();

            $table->foreign('user_id')->references('id')->on('user')->onDelete('restrict');
        });
        DB::statement('CREATE INDEX idx_lich_su_giao_dich_user ON lich_su_giao_dich(user_id, tao_luc)');
    }

    public function down(): void
    {
        Schema::dropIfExists('lich_su_giao_dich');
    }
};
