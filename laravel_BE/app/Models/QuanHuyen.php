<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class QuanHuyen extends Model
{
    protected $table = 'quan_huyen';

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = [
        'id',
        'tinh_thanh_id',
        'ten_quan',
    ];

    /**
     * @return BelongsTo<TinhThanh, $this>
     */
    public function tinhThanh(): BelongsTo
    {
        return $this->belongsTo(TinhThanh::class, 'tinh_thanh_id', 'id');
    }

    /**
     * @return HasMany<PhuongXa, $this>
     */
    public function phuongXa(): HasMany
    {
        return $this->hasMany(PhuongXa::class, 'quan_huyen_id', 'id');
    }
}
