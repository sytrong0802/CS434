<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChuTroChangeStatusRequest;
use App\Http\Requests\ChuTroCreateRequest;
use App\Http\Requests\ChuTroUpdateRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ChuTroController
{
    public function index(): JsonResponse
    {
        $data = User::where('vai_tro', 'CHU_TRO')
            ->where('trang_thai', '!=', 'DA_XOA')
            ->get();

        return response()->json([
            'status' => 1,
            'data' => $data,
        ], 200);
    }

    public function create(ChuTroCreateRequest $request): JsonResponse
    {
        $data = User::create([
            'ho_ten' => $request->ho_ten,
            'email' => $request->email,
            'so_dien_thoai' => $request->so_dien_thoai,
            'password' => Hash::make($request->mat_khau),
            'avatar_url' => $request->avatar_url,
            'vai_tro' => 'CHU_TRO',
            'so_du' => 0,
            'trang_thai' => 'HOAT_DONG',
        ]);

        return response()->json([
            'status' => 1,
            'data' => $data,
            'message' => 'Thêm chủ trọ thành công',
        ], 200);
    }

    public function update(ChuTroUpdateRequest $request): JsonResponse
    {
        $updateData = [
            'ho_ten' => $request->ho_ten,
            'email' => $request->email,
            'so_dien_thoai' => $request->so_dien_thoai,
            'avatar_url' => $request->avatar_url,
            'trang_thai' => $request->trang_thai,
            'ly_do_khoa' => $request->ly_do_khoa,
        ];

        if ($request->filled('mat_khau')) {
            $updateData['password'] = Hash::make($request->mat_khau);
        }

        User::where('id', $request->id)
            ->where('vai_tro', 'CHU_TRO')
            ->update($updateData);

        return response()->json([
            'status' => 1,
            'message' => 'Cập nhật chủ trọ thành công',
        ], 200);
    }

    public function delete(Request $request, string $id): JsonResponse
    {
        $data = User::where('id', $id)
            ->where('vai_tro', 'CHU_TRO')
            ->first();

        if (! $data) {
            return response()->json([
                'status' => 0,
                'message' => 'Không tìm thấy chủ trọ',
            ], 404);
        }

        $data->update([
            'trang_thai' => 'DA_XOA',
        ]);

        return response()->json([
            'status' => 1,
            'message' => 'Xóa chủ trọ thành công',
        ], 200);
    }

    public function changeStatus(ChuTroChangeStatusRequest $request): JsonResponse
    {
        $data = User::where('id', $request->id)
            ->where('vai_tro', 'CHU_TRO')
            ->first();

        if (! $data) {
            return response()->json([
                'status' => 0,
                'message' => 'Không tìm thấy chủ trọ',
            ], 404);
        }

        $data->trang_thai = $request->trang_thai;
        if ($request->trang_thai === 'BI_KHOA') {
            $data->ly_do_khoa = $request->ly_do_khoa;
        } else {
            $data->ly_do_khoa = null;
        }
        $data->save();

        return response()->json([
            'status' => 1,
            'message' => 'Cập nhật trạng thái chủ trọ thành công',
        ], 200);
    }
}
