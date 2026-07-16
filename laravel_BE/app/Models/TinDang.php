<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TinDang extends Model
{
    protected $table = 'tin_dang';

    public $timestamps = false;

    protected $fillable = [
        'chu_tro_id',
        'goi_dich_vu_id',
        'tieu_de',
        'mo_ta',
        'dia_chi_chi_tiet',
        'phuong_xa_id',
        'quan_huyen_id',
        'tinh_thanh_id',
        'gia_thue_min',
        'dien_tich_min',
        'loai_phong',
        'tinh_trang_noi_that',
        'diem_danh_gia',
        'luot_danh_gia',
        'anh_dai_dien',
        'vi_do',
        'kinh_do',
        'ten_lien_he',
        'so_dien_thoai_lien_he',
        'ngay_het_han_goi',
        'trang_thai',
        'ly_do_tu_choi',
        'duyet_boi',
        'duyet_luc',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'gia_thue_min' => 'decimal:0',
            'dien_tich_min' => 'decimal:2',
            'diem_danh_gia' => 'decimal:1',
            'luot_danh_gia' => 'integer',
            'vi_do' => 'decimal:7',
            'kinh_do' => 'decimal:7',
            'ngay_het_han_goi' => 'datetime',
            'duyet_luc' => 'datetime',
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
     * @return BelongsTo<GoiDichVu, $this>
     */
    public function goiDichVu(): BelongsTo
    {
        return $this->belongsTo(GoiDichVu::class, 'goi_dich_vu_id', 'id');
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function nguoiDuyet(): BelongsTo
    {
        return $this->belongsTo(User::class, 'duyet_boi', 'id');
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
     * @return HasMany<LichSuMuaGoiTinDang, $this>
     */
    public function lichSuMuaGois(): HasMany
    {
        return $this->hasMany(LichSuMuaGoiTinDang::class, 'tin_dang_id', 'id');
    }

    /**
     * @return HasMany<HinhAnhTinDang, $this>
     */
    public function hinhAnhs(): HasMany
    {
        return $this->hasMany(HinhAnhTinDang::class, 'tin_dang_id', 'id');
    }

    /**
     * @return BelongsToMany<TienIch, $this>
     */
    public function tienIchs(): BelongsToMany
    {
        return $this->belongsToMany(TienIch::class, 'tin_dang_tien_ich', 'tin_dang_id', 'tien_ich_id');
    }

    /**
     * @return BelongsToMany<User, $this>
     */
    public function nguoiYeuThich(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'yeu_thich', 'tin_dang_id', 'user_id');
    }

    /**
     * @return HasMany<PhongTro, $this>
     */
    public function phongTros(): HasMany
    {
        return $this->hasMany(PhongTro::class, 'tin_dang_id', 'id');
    }

    /**
     * @return HasMany<LichHenXemPhong, $this>
     */
    public function lichHens(): HasMany
    {
        return $this->hasMany(LichHenXemPhong::class, 'tin_dang_id', 'id');
    }

    /**
     * @return HasMany<DanhGia, $this>
     */
    public function danhGias(): HasMany
    {
        return $this->hasMany(DanhGia::class, 'tin_dang_id', 'id');
    }

    /**
     * @return HasMany<BaoCaoViPham, $this>
     */
    public function baoCaosViPham(): HasMany
    {
        return $this->hasMany(BaoCaoViPham::class, 'tin_dang_id', 'id');
    }
}
