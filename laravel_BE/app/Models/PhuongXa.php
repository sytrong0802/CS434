<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PhuongXa extends Model
{
    protected $table = 'phuong_xa';

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = [
        'id',
        'quan_huyen_id',
        'ten_xa',
    ];

    /**
     * @return BelongsTo<QuanHuyen, $this>
     */
    public function quanHuyen(): BelongsTo
    {
        return $this->belongsTo(QuanHuyen::class, 'quan_huyen_id', 'id');
    }

    /**
     * @return HasMany<TinDang, $this>
     */
    public function tinDang(): HasMany
    {
        return $this->hasMany(TinDang::class, 'phuong_xa_id', 'id');
    }

    /**
     * @return HasMany<NhaTro, $this>
     */
    public function nhaTro(): HasMany
    {
        return $this->hasMany(NhaTro::class, 'phuong_xa_id', 'id');
    }
}
