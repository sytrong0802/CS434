<?php

namespace App\Http\Controllers;

use App\Models\TinhThanh;
use Illuminate\Http\JsonResponse;

class TinhThanhController
{
    public function index(): JsonResponse
    {
        $data = TinhThanh::all();

        return response()->json([
            'status' => 1,
            'data' => $data,
        ], 200);
    }
}
