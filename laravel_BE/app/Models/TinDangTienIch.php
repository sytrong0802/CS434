<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TinDangTienIch extends Model
{
    protected $table = 'tin_dang_tien_ich';

    public $timestamps = false;

    protected $fillable = [
        'tin_dang_id',
        'tien_ich_id',
    ];
}
