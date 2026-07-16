<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BaoCaoViPham extends Model
{
    protected $table = 'bao_cao_vi_pham';

    public $timestamps = false;

    protected $fillable = [
        'nguoi_bao_cao_id',
        'tin_dang_id',
        'ly_do',
        'mo_ta',
        'trang_thai',
        'ghi_chu_admin',
        'xu_ly_boi',
        'xu_ly_luc',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'xu_ly_luc' => 'datetime',
            'tao_luc' => 'datetime',
        ];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function nguoiBaoCao(): BelongsTo
    {
        return $this->belongsTo(User::class, 'nguoi_bao_cao_id', 'id');
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
    public function nguoiXuLy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'xu_ly_boi', 'id');
    }
}
