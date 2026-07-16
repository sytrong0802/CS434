<?php

namespace App\Http\Controllers;

use App\Http\Requests\TienIchCreateRequest;
use App\Http\Requests\TienIchUpdateRequest;
use App\Models\TienIch;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TienIchController
{
    public function index(): JsonResponse
    {
        $data = TienIch::all();

        return response()->json([
            'status' => 1,
            'data' => $data,
        ], 200);
    }

    public function create(TienIchCreateRequest $request): JsonResponse
    {
        $data = TienIch::create([
            'ten_tien_ich' => $request->ten_tien_ich,
            'bieu_tuong' => $request->bieu_tuong,
        ]);

        return response()->json([
            'status' => 1,
            'data' => $data,
            'message' => 'Thêm tiện ích thành công',
        ], 200);
    }

    public function update(TienIchUpdateRequest $request): JsonResponse
    {
        TienIch::where('id', $request->id)->update([
            'ten_tien_ich' => $request->ten_tien_ich,
            'bieu_tuong' => $request->bieu_tuong,
        ]);

        return response()->json([
            'status' => 1,
            'message' => 'Cập nhật tiện ích thành công',
        ], 200);
    }

    public function delete(Request $request, string $id): JsonResponse
    {
        $data = TienIch::find($id);

        if (! $data) {
            return response()->json([
                'status' => 0,
                'message' => 'Không tìm thấy tiện ích',
            ], 404);
        }

        $data->delete();

        return response()->json([
            'status' => 1,
            'message' => 'Xóa tiện ích thành công',
        ], 200);
    }
}
