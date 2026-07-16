<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LichHenXemPhong extends Model
{
    protected $table = 'lich_hen_xem_phong';

    public $timestamps = false;

    protected $fillable = [
        'khach_hang_id',
        'chu_tro_id',
        'tin_dang_id',
        'phong_tro_id',
        'thoi_gian_hen',
        'loi_nhan',
        'trang_thai',
        'ly_do_tu_choi',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'thoi_gian_hen' => 'datetime',
            'tao_luc' => 'datetime',
            'cap_nhat_luc' => 'datetime',
        ];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function khachHang(): BelongsTo
    {
        return $this->belongsTo(User::class, 'khach_hang_id', 'id');
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function chuTro(): BelongsTo
    {
        return $this->belongsTo(User::class, 'chu_tro_id', 'id');
    }

    /**
     * @return BelongsTo<TinDang, $this>
     */
    public function tinDang(): BelongsTo
    {
        return $this->belongsTo(TinDang::class, 'tin_dang_id', 'id');
    }

    /**
     * @return BelongsTo<PhongTro, $this>
     */
    public function phongTro(): BelongsTo
    {
        return $this->belongsTo(PhongTro::class, 'phong_tro_id', 'id');
    }
}
