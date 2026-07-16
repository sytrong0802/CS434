<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PhongTro extends Model
{
    protected $table = 'phong_tro';

    public $timestamps = false;

    protected $fillable = [
        'nha_tro_id',
        'tin_dang_id',
        'ten_phong',
        'gia_thue',
        'dien_tich',
        'trang_thai',
        'suc_chua_toi_da',
        'gioi_tinh_duoc_thue',
        'tinh_trang_noi_that',
        'ghi_chu',
        'anh_dai_dien',
        'tien_ich_ids',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'gia_thue' => 'decimal:0',
            'dien_tich' => 'decimal:2',
            'suc_chua_toi_da' => 'integer',
            'tien_ich_ids' => 'array',
            'tao_luc' => 'datetime',
            'cap_nhat_luc' => 'datetime',
        ];
    }

    /**
     * @return BelongsTo<NhaTro, $this>
     */
    public function nhaTro(): BelongsTo
    {
        return $this->belongsTo(NhaTro::class, 'nha_tro_id', 'id');
    }

    /**
     * @return BelongsTo<TinDang, $this>
     */
    public function tinDang(): BelongsTo
    {
        return $this->belongsTo(TinDang::class, 'tin_dang_id', 'id');
    }

    /**
     * @return HasMany<NguoiOPhong, $this>
     */
    public function nguoiOPhongs(): HasMany
    {
        return $this->hasMany(NguoiOPhong::class, 'phong_tro_id', 'id');
    }

    /**
     * @return HasMany<LichHenXemPhong, $this>
     */
    public function lichHens(): HasMany
    {
        return $this->hasMany(LichHenXemPhong::class, 'phong_tro_id', 'id');
    }
}
