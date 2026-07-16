<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NguoiOPhong extends Model
{
    protected $table = 'nguoi_o_phong';

    public $timestamps = false;

    protected $fillable = [
        'phong_tro_id',
        'khach_hang_id',
        'ho_ten',
        'so_dien_thoai',
        'gioi_tinh',
        'ngay_vao',
        'ngay_roi',
        'trang_thai',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'ngay_vao' => 'date',
            'ngay_roi' => 'date',
            'tao_luc' => 'datetime',
            'cap_nhat_luc' => 'datetime',
        ];
    }

    /**
     * @return BelongsTo<PhongTro, $this>
     */
    public function phongTro(): BelongsTo
    {
        return $this->belongsTo(PhongTro::class, 'phong_tro_id', 'id');
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function khachHang(): BelongsTo
    {
        return $this->belongsTo(User::class, 'khach_hang_id', 'id');
    }
}
