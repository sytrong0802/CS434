<?php

namespace App\Http\Controllers;

use App\Http\Requests\GoiDichVuCreateRequest;
use App\Http\Requests\GoiDichVuUpdateRequest;
use App\Models\GoiDichVu;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GoiDichVuController
{
    public function index(): JsonResponse
    {
        $data = GoiDichVu::where('trang_thai', 'HOAT_DONG')
            ->orderBy('do_uu_tien', 'desc')
            ->get();

        return response()->json([
            'status' => 1,
            'data' => $data,
        ], 200);
    }

    public function create(GoiDichVuCreateRequest $request): JsonResponse
    {
        $user = $request->user();
        if (! $user || $user->vai_tro !== 'ADMIN') {
            return response()->json([
                'status' => 0,
                'message' => 'Không có quyền thực hiện chức năng này',
            ], 403);
        }

        $data = GoiDichVu::create([
            'ten_goi' => $request->ten_goi,
            'mo_ta' => $request->mo_ta,
            'gia_tien' => $request->gia_tien,
            'so_ngay_hieu_luc' => $request->so_ngay_hieu_luc,
            'do_uu_tien' => $request->do_uu_tien,
            'trang_thai' => 'HOAT_DONG',
        ]);

        return response()->json([
            'status' => 1,
            'data' => $data,
            'message' => 'Thêm gói dịch vụ thành công',
        ], 200);
    }

    public function update(GoiDichVuUpdateRequest $request): JsonResponse
    {
        $user = $request->user();
        if (! $user || $user->vai_tro !== 'ADMIN') {
            return response()->json([
                'status' => 0,
                'message' => 'Không có quyền thực hiện chức năng này',
            ], 403);
        }

        GoiDichVu::where('id', $request->id)->update([
            'ten_goi' => $request->ten_goi,
            'mo_ta' => $request->mo_ta,
            'gia_tien' => $request->gia_tien,
            'so_ngay_hieu_luc' => $request->so_ngay_hieu_luc,
            'do_uu_tien' => $request->do_uu_tien,
            'trang_thai' => $request->trang_thai,
        ]);

        return response()->json([
            'status' => 1,
            'message' => 'Cập nhật gói dịch vụ thành công',
        ], 200);
    }

    public function delete(Request $request, string $id): JsonResponse
    {
        $user = $request->user();
        if (! $user || $user->vai_tro !== 'ADMIN') {
            return response()->json([
                'status' => 0,
                'message' => 'Không có quyền thực hiện chức năng này',
            ], 403);
        }

        $data = GoiDichVu::find($id);
        if (! $data) {
            return response()->json([
                'status' => 0,
                'message' => 'Không tìm thấy gói dịch vụ',
            ], 404);
        }

        $data->update([
            'trang_thai' => 'NGUNG_CUNG_CAP',
        ]);

        return response()->json([
            'status' => 1,
            'message' => 'Ngừng cung cấp gói dịch vụ thành công',
        ], 200);
    }
}
