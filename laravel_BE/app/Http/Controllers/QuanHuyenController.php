<?php

namespace App\Http\Controllers;

use App\Http\Requests\QuanHuyenIndexRequest;
use App\Models\QuanHuyen;
use Illuminate\Http\JsonResponse;

class QuanHuyenController
{
    public function index(QuanHuyenIndexRequest $request): JsonResponse
    {
        $data = QuanHuyen::where('tinh_thanh_id', $request->tinh_thanh_id)->get();

        return response()->json([
            'status' => 1,
            'data' => $data,
        ], 200);
    }
}
