<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LichSuMuaGoiTinDang extends Model
{
    protected $table = 'lich_su_mua_goi_tin_dang';

    public $timestamps = false;

    protected $fillable = [
        'tin_dang_id',
        'user_id',
        'goi_dich_vu_id',
        'gia_tien',
        'bat_dau_luc',
        'ket_thuc_luc',
        'trang_thai',
        'giao_dich_id',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'gia_tien' => 'decimal:0',
            'bat_dau_luc' => 'datetime',
            'ket_thuc_luc' => 'datetime',
            'tao_luc' => 'datetime',
        ];
    }

    /**
     * @return BelongsTo<TinDang, $this>
     */
    public function tinDang(): BelongsTo
    {
        return $this->belongsTo(TinDang::class, 'tin_dang_id', 'id');
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * @return BelongsTo<GoiDichVu, $this>
     */
    public function goiDichVu(): BelongsTo
    {
        return $this->belongsTo(GoiDichVu::class, 'goi_dich_vu_id', 'id');
    }

    /**
     * @return BelongsTo<LichSuGiaoDich, $this>
     */
    public function giaoDich(): BelongsTo
    {
        return $this->belongsTo(LichSuGiaoDich::class, 'giao_dich_id', 'id');
    }
}
