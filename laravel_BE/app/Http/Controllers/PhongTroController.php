<?php

namespace App\Http\Controllers;

use App\Http\Requests\PhongTroCreateRequest;
use App\Http\Requests\PhongTroIndexRequest;
use App\Http\Requests\PhongTroUpdateRequest;
use App\Models\NhaTro;
use App\Models\PhongTro;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PhongTroController
{
    public function index(PhongTroIndexRequest $request): JsonResponse
    {
        $user = $request->user();
        $nhaTro = NhaTro::find($request->nha_tro_id);
        if ($user->vai_tro !== 'ADMIN' && $nhaTro->chu_tro_id !== $user->id) {
            return response()->json([
                'status' => 0,
                'message' => 'Không có quyền xem danh sách phòng trọ của nhà trọ này',
            ], 403);
        }

        $data = PhongTro::where('nha_tro_id', $request->nha_tro_id)->get();

        return response()->json([
            'status' => 1,
            'data' => $data,
        ], 200);
    }

    public function create(PhongTroCreateRequest $request): JsonResponse
    {
        $user = $request->user();
        $nhaTro = NhaTro::find($request->nha_tro_id);
        if ($user->vai_tro !== 'ADMIN' && $nhaTro->chu_tro_id !== $user->id) {
            return response()->json([
                'status' => 0,
                'message' => 'Không có quyền thêm phòng vào nhà trọ này',
            ], 403);
        }

        $data = PhongTro::create([
            'nha_tro_id' => $request->nha_tro_id,
            'ten_phong' => $request->ten_phong,
            'gia_thue' => $request->gia_thue,
            'dien_tich' => $request->dien_tich,
            'trang_thai' => 'CON_TRONG',
            'suc_chua_toi_da' => $request->suc_chua_toi_da,
            'gioi_tinh_duoc_thue' => $request->gioi_tinh_duoc_thue,
            'tinh_trang_noi_that' => $request->tinh_trang_noi_that,
            'ghi_chu' => $request->ghi_chu,
            'anh_dai_dien' => $request->anh_dai_dien,
            'tien_ich_ids' => $request->tien_ich_ids,
        ]);

        return response()->json([
            'status' => 1,
            'data' => $data,
            'message' => 'Thêm phòng trọ thành công',
        ], 200);
    }

    public function update(PhongTroUpdateRequest $request): JsonResponse
    {
        $user = $request->user();
        $phongTro = PhongTro::find($request->id);
        $nhaTro = NhaTro::find($phongTro->nha_tro_id);

        if ($user->vai_tro !== 'ADMIN' && $nhaTro->chu_tro_id !== $user->id) {
            return response()->json([
                'status' => 0,
                'message' => 'Không có quyền cập nhật phòng trọ này',
            ], 403);
        }

        $phongTro->update([
            'ten_phong' => $request->ten_phong,
            'gia_thue' => $request->gia_thue,
            'dien_tich' => $request->dien_tich,
            'trang_thai' => $request->trang_thai,
            'suc_chua_toi_da' => $request->suc_chua_toi_da,
            'gioi_tinh_duoc_thue' => $request->gioi_tinh_duoc_thue,
            'tinh_trang_noi_that' => $request->tinh_trang_noi_that,
            'ghi_chu' => $request->ghi_chu,
            'anh_dai_dien' => $request->anh_dai_dien,
            'tien_ich_ids' => $request->tien_ich_ids,
        ]);

        return response()->json([
            'status' => 1,
            'message' => 'Cập nhật phòng trọ thành công',
            'data' => $phongTro,
        ], 200);
    }

    public function delete(Request $request, string $id): JsonResponse
    {
        $user = $request->user();
        $phongTro = PhongTro::find($id);

        if (! $phongTro) {
            return response()->json([
                'status' => 0,
                'message' => 'Không tìm thấy phòng trọ',
            ], 404);
        }

        $nhaTro = NhaTro::find($phongTro->nha_tro_id);
        if ($user->vai_tro !== 'ADMIN' && $nhaTro->chu_tro_id !== $user->id) {
            return response()->json([
                'status' => 0,
                'message' => 'Không có quyền xóa phòng trọ này',
            ], 403);
        }

        if ($phongTro->nguoiOPhongs()->where('trang_thai', 'DANG_O')->count() > 0) {
            return response()->json([
                'status' => 0,
                'message' => 'Không thể xóa phòng trọ này vì đang có người thuê',
            ], 400);
        }

        $phongTro->delete();

        return response()->json([
            'status' => 1,
            'message' => 'Xóa phòng trọ thành công',
        ], 200);
    }

    public function show(Request $request, string $id): JsonResponse
    {
        $user = $request->user();
        $phongTro = PhongTro::with('nhaTro')->find($id);

        if (!$phongTro) {
            return response()->json([
                'status' => 0,
                'message' => 'Không tìm thấy phòng trọ',
            ], 404);
        }

        if ($user->vai_tro !== 'ADMIN' && $phongTro->nhaTro->chu_tro_id !== $user->id) {
            return response()->json([
                'status' => 0,
                'message' => 'Không có quyền xem thông tin phòng trọ này',
            ], 403);
        }

        return response()->json([
            'status' => 1,
            'data' => $phongTro,
        ], 200);
    }
}
