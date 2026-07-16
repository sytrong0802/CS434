<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class NhaTro extends Model
{
    protected $table = 'nha_tro';

    public $timestamps = false;

    protected $fillable = [
        'chu_tro_id',
        'ten_nha_tro',
        'dia_chi_chi_tiet',
        'phuong_xa_id',
        'quan_huyen_id',
        'tinh_thanh_id',
        'vi_do',
        'kinh_do',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'vi_do' => 'decimal:7',
            'kinh_do' => 'decimal:7',
            'tao_luc' => 'datetime',
            'cap_nhat_luc' => 'datetime',
        ];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function chuTro(): BelongsTo
    {
        return $this->belongsTo(User::class, 'chu_tro_id', 'id');
    }

    /**
     * @return BelongsTo<PhuongXa, $this>
     */
    public function phuongXa(): BelongsTo
    {
        return $this->belongsTo(PhuongXa::class, 'phuong_xa_id', 'id');
    }

    /**
     * @return BelongsTo<QuanHuyen, $this>
     */
    public function quanHuyen(): BelongsTo
    {
        return $this->belongsTo(QuanHuyen::class, 'quan_huyen_id', 'id');
    }

    /**
     * @return BelongsTo<TinhThanh, $this>
     */
    public function tinhThanh(): BelongsTo
    {
        return $this->belongsTo(TinhThanh::class, 'tinh_thanh_id', 'id');
    }

    /**
     * @return HasMany<PhongTro, $this>
     */
    public function phongTros(): HasMany
    {
        return $this->hasMany(PhongTro::class, 'nha_tro_id', 'id');
    }
}
