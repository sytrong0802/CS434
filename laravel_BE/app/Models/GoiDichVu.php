<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GoiDichVu extends Model
{
    protected $table = 'goi_dich_vu';

    public $timestamps = false;

    protected $fillable = [
        'ten_goi',
        'mo_ta',
        'gia_tien',
        'so_ngay_hieu_luc',
        'do_uu_tien',
        'trang_thai',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'gia_tien' => 'decimal:0',
            'so_ngay_hieu_luc' => 'integer',
            'do_uu_tien' => 'integer',
            'tao_luc' => 'datetime',
        ];
    }

    /**
     * @return HasMany<TinDang, $this>
     */
    public function tinDangs(): HasMany
    {
        return $this->hasMany(TinDang::class, 'goi_dich_vu_id', 'id');
    }

    /**
     * @return HasMany<LichSuMuaGoiTinDang, $this>
     */
    public function lichSuMuaGois(): HasMany
    {
        return $this->hasMany(LichSuMuaGoiTinDang::class, 'goi_dich_vu_id', 'id');
    }
}
