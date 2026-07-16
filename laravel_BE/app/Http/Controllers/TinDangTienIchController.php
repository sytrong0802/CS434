<?php

namespace App\Http\Controllers;

use App\Http\Requests\TinDangTienIchDeleteRequest;
use App\Http\Requests\TinDangTienIchIndexRequest;
use App\Http\Requests\TinDangTienIchStoreRequest;
use App\Models\TinDang;
use App\Models\TinDangTienIch;
use Illuminate\Http\JsonResponse;

class TinDangTienIchController
{
    public function index(TinDangTienIchIndexRequest $request): JsonResponse
    {
        $data = TinDangTienIch::where('tin_dang_id', $request->tin_dang_id)->get();

        return response()->json([
            'status' => 1,
            'data' => $data,
        ], 200);
    }

    public function store(TinDangTienIchStoreRequest $request): JsonResponse
    {
        $user = $request->user();
        $tinDang = TinDang::find($request->tin_dang_id);

        if ($user->vai_tro !== 'ADMIN' && $tinDang->chu_tro_id !== $user->id) {
            return response()->json([
                'status' => 0,
                'message' => 'Không có quyền thực hiện',
            ], 403);
        }

        $data = TinDangTienIch::firstOrCreate([
            'tin_dang_id' => $request->tin_dang_id,
            'tien_ich_id' => $request->tien_ich_id,
        ]);

        return response()->json([
            'status' => 1,
            'data' => $data,
            'message' => 'Thêm tiện ích cho bài viết thành công',
        ], 200);
    }

    public function delete(TinDangTienIchDeleteRequest $request): JsonResponse
    {
        $user = $request->user();
        $tinDang = TinDang::find($request->tin_dang_id);

        if ($user->vai_tro !== 'ADMIN' && $tinDang->chu_tro_id !== $user->id) {
            return response()->json([
                'status' => 0,
                'message' => 'Không có quyền thực hiện',
            ], 403);
        }

        TinDangTienIch::where('tin_dang_id', $request->tin_dang_id)
            ->where('tien_ich_id', $request->tien_ich_id)
            ->delete();

        return response()->json([
            'status' => 1,
            'message' => 'Xóa tiện ích của bài viết thành công',
        ], 200);
    }
}
