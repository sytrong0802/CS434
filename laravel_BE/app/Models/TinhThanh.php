<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TinhThanh extends Model
{
    protected $table = 'tinh_thanh';

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = [
        'id',
        'ten_tinh',
    ];

    /**
     * @return HasMany<QuanHuyen, $this>
     */
    public function quanHuyen(): HasMany
    {
        return $this->hasMany(QuanHuyen::class, 'tinh_thanh_id', 'id');
    }
}
