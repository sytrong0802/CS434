<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EmailOtp extends Model
{
    protected $table = 'email_otp';

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'ma_xac_nhan_hash',
        'muc_dich',
        'so_lan_nhap_sai',
        'ip_tao',
        'het_han_luc',
        'da_dung_luc',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'so_lan_nhap_sai' => 'integer',
            'het_han_luc' => 'datetime',
            'da_dung_luc' => 'datetime',
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
