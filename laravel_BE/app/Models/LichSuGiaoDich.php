<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LichSuGiaoDich extends Model
{
    protected $table = 'lich_su_giao_dich';

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'loai_giao_dich',
        'so_tien',
        'so_du_cuoi',
        'ma_giao_dich_doi_tac',
        'mo_ta',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'so_tien' => 'decimal:0',
            'so_du_cuoi' => 'decimal:0',
            'tao_luc' => 'datetime',
        ];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * @return HasMany<LichSuMuaGoiTinDang, $this>
     */
    public function lichSuMuaGois(): HasMany
    {
        return $this->hasMany(LichSuMuaGoiTinDang::class, 'giao_dich_id', 'id');
    }
}
