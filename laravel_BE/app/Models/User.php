<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'user';

    public $timestamps = false;

    protected $fillable = [
        'ho_ten',
        'email',
        'so_dien_thoai',
        'password',
        'hash_password',
        'avatar_url',
        'vai_tro',
        'so_du',
        'trang_thai',
        'ly_do_khoa',
    ];

    protected $hidden = [
        'password',
        'hash_password',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'so_du' => 'decimal:0',
            'tao_luc' => 'datetime',
            'cap_nhat_luc' => 'datetime',
        ];
    }

    /**
     * @return HasOne<ThongTinChuTro, $this>
     */
    public function thongTinChuTro(): HasOne
    {
        return $this->hasOne(ThongTinChuTro::class, 'user_id', 'id');
    }

    /**
     * @return HasMany<EmailOtp, $this>
     */
    public function emailOtps(): HasMany
    {
        return $this->hasMany(EmailOtp::class, 'user_id', 'id');
    }

    /**
     * @return HasMany<LichSuGiaoDich, $this>
     */
    public function lichSuGiaoDichs(): HasMany
    {
        return $this->hasMany(LichSuGiaoDich::class, 'user_id', 'id');
    }

    /**
     * @return HasMany<TinDang, $this>
     */
    public function tinDangs(): HasMany
    {
        return $this->hasMany(TinDang::class, 'chu_tro_id', 'id');
    }

    /**
     * @return HasMany<LichSuMuaGoiTinDang, $this>
     */
    public function lichSuMuaGoiTinDangs(): HasMany
    {
        return $this->hasMany(LichSuMuaGoiTinDang::class, 'user_id', 'id');
    }

    /**
     * @return BelongsToMany<TinDang, $this>
     */
    public function yeuThichs(): BelongsToMany
    {
        return $this->belongsToMany(TinDang::class, 'yeu_thich', 'user_id', 'tin_dang_id');
    }

    /**
     * @return HasMany<NhaTro, $this>
     */
    public function nhaTros(): HasMany
    {
        return $this->hasMany(NhaTro::class, 'chu_tro_id', 'id');
    }

    /**
     * @return HasMany<NguoiOPhong, $this>
     */
    public function nguoiOPhongs(): HasMany
    {
        return $this->hasMany(NguoiOPhong::class, 'khach_hang_id', 'id');
    }

    /**
     * @return HasMany<LichHenXemPhong, $this>
     */
    public function lichHensKhachHang(): HasMany
    {
        return $this->hasMany(LichHenXemPhong::class, 'khach_hang_id', 'id');
    }

    /**
     * @return HasMany<LichHenXemPhong, $this>
     */
    public function lichHensChuTro(): HasMany
    {
        return $this->hasMany(LichHenXemPhong::class, 'chu_tro_id', 'id');
    }

    /**
     * @return HasMany<DanhGia, $this>
     */
    public function danhGias(): HasMany
    {
        return $this->hasMany(DanhGia::class, 'khach_hang_id', 'id');
    }

    /**
     * @return HasMany<BaoCaoViPham, $this>
     */
    public function baoCaosViPham(): HasMany
    {
        return $this->hasMany(BaoCaoViPham::class, 'nguoi_bao_cao_id', 'id');
    }

    /**
     * @return HasMany<ThongBao, $this>
     */
    public function thongBaos(): HasMany
    {
        return $this->hasMany(ThongBao::class, 'user_id', 'id');
    }

    /**
     * @return HasMany<PhieuHoTro, $this>
     */
    public function phieuHoTros(): HasMany
    {
        return $this->hasMany(PhieuHoTro::class, 'user_id', 'id');
    }
}
