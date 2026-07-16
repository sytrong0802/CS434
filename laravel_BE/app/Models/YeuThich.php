<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class YeuThich extends Model
{
    protected $table = 'yeu_thich';

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'tin_dang_id',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'tao_luc' => 'datetime',
        ];
    }
}
