<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ThongTinChuTro extends Model
{
    protected $table = 'thong_tin_chu_tro';

    protected $primaryKey = 'user_id';

    public $incrementing = false;

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'so_cccd_passport',
        'ho_ten_khai_sinh',
        'ngay_cap',
        'noi_cap',
        'anh_cccd_mat_truoc',
        'anh_cccd_mat_sau',
        'anh_chan_dung_hop_dong',
        'ten_ngan_hang',
        'so_tai_khoan',
        'ten_chu_tai_khoan',
        'trang_thai_kyc',
        'ly_do_tu_choi_kyc',
        'duyet_kyc_boi',
        'duyet_kyc_luc',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'ngay_cap' => 'date',
            'duyet_kyc_luc' => 'datetime',
            'cap_nhat_luc' => 'datetime',
        ];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function nguoiDuyet(): BelongsTo
    {
        return $this->belongsTo(User::class, 'duyet_kyc_boi', 'id');
    }
}
