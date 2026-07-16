<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DanhGia extends Model
{
    protected $table = 'danh_gia';

    public $timestamps = false;

    protected $fillable = [
        'khach_hang_id',
        'tin_dang_id',
        'so_sao',
        'binh_luan',
        'trang_thai',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'so_sao' => 'integer',
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
     * @return BelongsTo<TinDang, $this>
     */
    public function tinDang(): BelongsTo
    {
        return $this->belongsTo(TinDang::class, 'tin_dang_id', 'id');
    }
}
