<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class TienIch extends Model
{
    protected $table = 'tien_ich';

    public $timestamps = false;

    protected $fillable = [
        'ten_tien_ich',
        'bieu_tuong',
    ];

    /**
     * @return BelongsToMany<TinDang, $this>
     */
    public function tinDangs(): BelongsToMany
    {
        return $this->belongsToMany(TinDang::class, 'tin_dang_tien_ich', 'tien_ich_id', 'tin_dang_id');
    }
}
