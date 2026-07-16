<?php

namespace App\Http\Controllers;

use App\Http\Requests\HinhAnhTinDangIndexRequest;
use App\Http\Requests\HinhAnhTinDangStoreRequest;
use App\Models\HinhAnhTinDang;
use App\Models\TinDang;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HinhAnhTinDangController
{
    public function index(HinhAnhTinDangIndexRequest $request): JsonResponse
    {
        $data = HinhAnhTinDang::where('tin_dang_id', $request->tin_dang_id)->get();

        return response()->json([
            'status' => 1,
            'data' => $data,
        ], 200);
    }

    public function store(HinhAnhTinDangStoreRequest $request): JsonResponse
    {
        $user = $request->user();
        $tinDang = TinDang::find($request->tin_dang_id);

        if ($user->vai_tro !== 'ADMIN' && $tinDang->chu_tro_id !== $user->id) {
            return response()->json([
                'status' => 0,
                'message' => 'Không có quyền thêm hình ảnh cho bài đăng này',
            ], 403);
        }

        $data = HinhAnhTinDang::create([
            'tin_dang_id' => $request->tin_dang_id,
            'url_anh' => $request->url_anh,
        ]);

        return response()->json([
            'status' => 1,
            'data' => $data,
            'message' => 'Thêm hình ảnh thành công',
        ], 200);
    }

    public function delete(Request $request, string $id): JsonResponse
    {
        $hinhAnh = HinhAnhTinDang::find($id);

        if (! $hinhAnh) {
            return response()->json([
                'status' => 0,
                'message' => 'Không tìm thấy hình ảnh',
            ], 404);
        }

        $user = $request->user();
        $tinDang = TinDang::find($hinhAnh->tin_dang_id);

        if ($user->vai_tro !== 'ADMIN' && $tinDang->chu_tro_id !== $user->id) {
            return response()->json([
                'status' => 0,
                'message' => 'Không có quyền xóa hình ảnh này',
            ], 403);
        }

        $hinhAnh->delete();

        return response()->json([
            'status' => 1,
            'message' => 'Xóa hình ảnh thành công',
        ], 200);
    }
}
