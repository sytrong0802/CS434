<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ThongBao extends Model
{
    protected $table = 'thong_bao';

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'tieu_de',
        'noi_dung',
        'loai_thong_bao',
        'da_doc',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'da_doc' => 'boolean',
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
}
