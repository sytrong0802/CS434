<?php

namespace App\Http\Controllers;

use App\Http\Requests\PhuongXaIndexRequest;
use App\Models\PhuongXa;
use Illuminate\Http\JsonResponse;

class PhuongXaController
{
    public function index(PhuongXaIndexRequest $request): JsonResponse
    {
        $data = PhuongXa::where('quan_huyen_id', $request->quan_huyen_id)->get();

        return response()->json([
            'status' => 1,
            'data' => $data,
        ], 200);
    }
}
