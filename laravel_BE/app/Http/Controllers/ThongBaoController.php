<?php

namespace App\Http\Controllers;

use App\Http\Requests\ThongBaoReadRequest;
use App\Models\ThongBao;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ThongBaoController
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        if (! $user) {
            return response()->json([
                'status' => 0,
                'message' => 'Chưa đăng nhập',
            ], 401);
        }

        $data = ThongBao::where('user_id', $user->id)
            ->orderBy('id', 'desc')
            ->get();

        return response()->json([
            'status' => 1,
            'data' => $data,
        ], 200);
    }

    public function read(ThongBaoReadRequest $request): JsonResponse
    {
        $user = $request->user();
        $thongBao = ThongBao::find($request->id);

        if (! $thongBao || $thongBao->user_id !== $user->id) {
            return response()->json([
                'status' => 0,
                'message' => 'Không tìm thấy thông báo hoặc không có quyền truy cập',
            ], 404);
        }

        $thongBao->update([
            'da_doc' => true,
        ]);

        return response()->json([
            'status' => 1,
            'message' => 'Đã đọc thông báo',
        ], 200);
    }

    public function readAll(Request $request): JsonResponse
    {
        $user = $request->user();
        if (! $user) {
            return response()->json([
                'status' => 0,
                'message' => 'Chưa đăng nhập',
            ], 401);
        }

        ThongBao::where('user_id', $user->id)
            ->where('da_doc', false)
            ->update(['da_doc' => true]);

        return response()->json([
            'status' => 1,
            'message' => 'Đã đọc toàn bộ thông báo',
        ], 200);
    }
}
