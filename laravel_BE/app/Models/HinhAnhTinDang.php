<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HinhAnhTinDang extends Model
{
    protected $table = 'hinh_anh_tin_dang';

    public $timestamps = false;

    protected $fillable = [
        'tin_dang_id',
        'url_anh',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
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
}
