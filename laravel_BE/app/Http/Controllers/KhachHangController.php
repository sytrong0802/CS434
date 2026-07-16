<?php

namespace App\Http\Controllers;

use App\Http\Requests\KhachHangChangeStatusRequest;
use App\Http\Requests\KhachHangCreateRequest;
use App\Http\Requests\KhachHangUpdateRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class KhachHangController
{
    public function index(): JsonResponse
    {
        $data = User::where('vai_tro', 'KHACH_HANG')
            ->where('trang_thai', '!=', 'DA_XOA')
            ->get();

        return response()->json([
            'status' => 1,
            'data' => $data,
        ], 200);
    }

    public function store(KhachHangCreateRequest $request): JsonResponse
    {
        $data = User::create([
            'ho_ten' => $request->ho_ten,
            'email' => $request->email,
            'so_dien_thoai' => $request->so_dien_thoai,
            'password' => Hash::make($request->mat_khau),
            'avatar_url' => $request->avatar_url,
            'vai_tro' => $request->input('vai_tro', 'KHACH_HANG'),
            'so_du' => $request->input('so_du', 0),
            'trang_thai' => $request->input('trang_thai', 'HOAT_DONG'),
        ]);

        return response()->json([
            'status' => 1,
            'data' => $data,
            'message' => 'Thêm khách hàng thành công',
        ], 200);
    }

    public function update(KhachHangUpdateRequest $request): JsonResponse
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
            ->where('vai_tro', 'KHACH_HANG')
            ->update($updateData);

        return response()->json([
            'status' => 1,
            'message' => 'Cập nhật khách hàng thành công',
        ], 200);
    }

    public function destroy(Request $request, string $id): JsonResponse
    {
        $data = User::where('id', $id)
            ->where('vai_tro', 'KHACH_HANG')
            ->first();

        if (! $data) {
            return response()->json([
                'status' => 0,
                'message' => 'Không tìm thấy khách hàng',
            ], 404);
        }

        $data->update([
            'trang_thai' => 'DA_XOA',
        ]);

        return response()->json([
            'status' => 1,
            'message' => 'Xóa khách hàng thành công',
        ], 200);
    }

    public function changeStatus(KhachHangChangeStatusRequest $request): JsonResponse
    {
        $data = User::where('id', $request->id)
            ->where('vai_tro', 'KHACH_HANG')
            ->first();

        if (! $data) {
            return response()->json([
                'status' => 0,
                'message' => 'Không tìm thấy khách hàng',
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
            'message' => 'Cập nhật trạng thái khách hàng thành công',
        ], 200);
    }
}
