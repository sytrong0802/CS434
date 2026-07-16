<?php

namespace App\Http\Controllers;

use App\Http\Requests\NhaTroCreateRequest;
use App\Http\Requests\NhaTroUpdateRequest;
use App\Models\NhaTro;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NhaTroController
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        if ($user && $user->vai_tro === 'ADMIN') {
            $data = NhaTro::with(['tinhThanh', 'quanHuyen', 'phuongXa'])->get();
        } else {
            $data = NhaTro::where('chu_tro_id', $user->id)
                ->with(['tinhThanh', 'quanHuyen', 'phuongXa'])
                ->get();
        }

        return response()->json([
            'status' => 1,
            'data' => $data,
        ], 200);
    }

    public function create(NhaTroCreateRequest $request): JsonResponse
    {
        $user = $request->user();

        $data = NhaTro::create([
            'chu_tro_id' => $user->id,
            'ten_nha_tro' => $request->ten_nha_tro,
            'dia_chi_chi_tiet' => $request->dia_chi_chi_tiet,
            'phuong_xa_id' => $request->phuong_xa_id,
            'quan_huyen_id' => $request->quan_huyen_id,
            'tinh_thanh_id' => $request->tinh_thanh_id,
            'vi_do' => $request->vi_do,
            'kinh_do' => $request->kinh_do,
        ]);

        return response()->json([
            'status' => 1,
            'data' => $data,
            'message' => 'Thêm nhà trọ thành công',
        ], 200);
    }

    public function update(NhaTroUpdateRequest $request): JsonResponse
    {
        $user = $request->user();

        $nhaTro = NhaTro::where('id', $request->id);
        if ($user->vai_tro !== 'ADMIN') {
            $nhaTro->where('chu_tro_id', $user->id);
        }

        $affected = $nhaTro->update([
            'ten_nha_tro' => $request->ten_nha_tro,
            'dia_chi_chi_tiet' => $request->dia_chi_chi_tiet,
            'phuong_xa_id' => $request->phuong_xa_id,
            'quan_huyen_id' => $request->quan_huyen_id,
            'tinh_thanh_id' => $request->tinh_thanh_id,
            'vi_do' => $request->vi_do,
            'kinh_do' => $request->kinh_do,
        ]);

        if (! $affected) {
            return response()->json([
                'status' => 0,
                'message' => 'Cập nhật nhà trọ thất bại hoặc không có quyền',
            ], 403);
        }

        return response()->json([
            'status' => 1,
            'message' => 'Cập nhật nhà trọ thành công',
        ], 200);
    }

    public function delete(Request $request, string $id): JsonResponse
    {
        $user = $request->user();
        $nhaTro = NhaTro::where('id', $id);
        if ($user->vai_tro !== 'ADMIN') {
            $nhaTro->where('chu_tro_id', $user->id);
        }

        $data = $nhaTro->first();
        if (! $data) {
            return response()->json([
                'status' => 0,
                'message' => 'Không tìm thấy nhà trọ hoặc không có quyền xóa',
            ], 404);
        }

        if ($data->phongTros()->count() > 0) {
            return response()->json([
                'status' => 0,
                'message' => 'Không thể xóa nhà trọ này vì vẫn còn phòng trọ bên trong',
            ], 400);
        }

        $data->delete();

        return response()->json([
            'status' => 1,
            'message' => 'Xóa nhà trọ thành công',
        ], 200);
    }
}
