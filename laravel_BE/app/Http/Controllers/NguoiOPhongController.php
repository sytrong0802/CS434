<?php

namespace App\Http\Controllers;

use App\Http\Requests\NguoiOPhongCreateRequest;
use App\Http\Requests\NguoiOPhongIndexRequest;
use App\Http\Requests\NguoiOPhongUpdateRequest;
use App\Models\NguoiOPhong;
use App\Models\NhaTro;
use App\Models\PhongTro;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NguoiOPhongController
{
    public function index(NguoiOPhongIndexRequest $request): JsonResponse
    {
        $user = $request->user();
        $phongTro = PhongTro::find($request->phong_tro_id);
        $nhaTro = NhaTro::find($phongTro->nha_tro_id);

        if ($user->vai_tro !== 'ADMIN' && $nhaTro->chu_tro_id !== $user->id) {
            return response()->json([
                'status' => 0,
                'message' => 'Không có quyền xem thông tin người ở phòng này',
            ], 403);
        }

        $data = NguoiOPhong::where('phong_tro_id', $request->phong_tro_id)
            ->with('khachHang')
            ->get();

        return response()->json([
            'status' => 1,
            'data' => $data,
        ], 200);
    }

    public function create(NguoiOPhongCreateRequest $request): JsonResponse
    {
        $user = $request->user();
        $phongTro = PhongTro::find($request->phong_tro_id);
        $nhaTro = NhaTro::find($phongTro->nha_tro_id);

        if ($user->vai_tro !== 'ADMIN' && $nhaTro->chu_tro_id !== $user->id) {
            return response()->json([
                'status' => 0,
                'message' => 'Không có quyền thực hiện chức năng này',
            ], 403);
        }

        $currentTenantsCount = NguoiOPhong::where('phong_tro_id', $request->phong_tro_id)
            ->where('trang_thai', 'DANG_O')
            ->count();

        if ($currentTenantsCount >= $phongTro->suc_chua_toi_da) {
            return response()->json([
                'status' => 0,
                'message' => 'Phòng trọ này đã đạt sức chứa tối đa',
            ], 400);
        }

        $data = NguoiOPhong::create([
            'phong_tro_id' => $request->phong_tro_id,
            'khach_hang_id' => $request->khach_hang_id,
            'ho_ten' => $request->ho_ten,
            'so_dien_thoai' => $request->so_dien_thoai,
            'gioi_tinh' => $request->gioi_tinh,
            'ngay_vao' => $request->ngay_vao,
            'trang_thai' => 'DANG_O',
        ]);

        if ($currentTenantsCount + 1 >= $phongTro->suc_chua_toi_da) {
            $phongTro->update(['trang_thai' => 'HET_PHONG']);
        }

        return response()->json([
            'status' => 1,
            'data' => $data,
            'message' => 'Thêm người ở vào phòng thành công',
        ], 200);
    }

    public function update(NguoiOPhongUpdateRequest $request): JsonResponse
    {
        $user = $request->user();
        $nguoiOPhong = NguoiOPhong::find($request->id);
        $phongTro = PhongTro::find($nguoiOPhong->phong_tro_id);
        $nhaTro = NhaTro::find($phongTro->nha_tro_id);

        if ($user->vai_tro !== 'ADMIN' && $nhaTro->chu_tro_id !== $user->id) {
            return response()->json([
                'status' => 0,
                'message' => 'Không có quyền cập nhật thông tin người ở phòng này',
            ], 403);
        }

        $nguoiOPhong->update([
            'ho_ten' => $request->ho_ten,
            'so_dien_thoai' => $request->so_dien_thoai,
            'gioi_tinh' => $request->gioi_tinh,
            'ngay_vao' => $request->ngay_vao,
            'ngay_roi' => $request->ngay_roi,
            'trang_thai' => $request->trang_thai,
        ]);

        $currentTenantsCount = NguoiOPhong::where('phong_tro_id', $phongTro->id)
            ->where('trang_thai', 'DANG_O')
            ->count();

        if ($currentTenantsCount >= $phongTro->suc_chua_toi_da) {
            $phongTro->update(['trang_thai' => 'HET_PHONG']);
        } else {
            $phongTro->update(['trang_thai' => 'CON_TRONG']);
        }

        return response()->json([
            'status' => 1,
            'message' => 'Cập nhật thông tin thành công',
            'data' => $nguoiOPhong,
        ], 200);
    }

    public function delete(Request $request, string $id): JsonResponse
    {
        $user = $request->user();
        $nguoiOPhong = NguoiOPhong::find($id);

        if (! $nguoiOPhong) {
            return response()->json([
                'status' => 0,
                'message' => 'Không tìm thấy thông tin người ở',
            ], 404);
        }

        $phongTro = PhongTro::find($nguoiOPhong->phong_tro_id);
        $nhaTro = NhaTro::find($phongTro->nha_tro_id);

        if ($user->vai_tro !== 'ADMIN' && $nhaTro->chu_tro_id !== $user->id) {
            return response()->json([
                'status' => 0,
                'message' => 'Không có quyền thực hiện chức năng này',
            ], 403);
        }

        $nguoiOPhong->delete();

        return response()->json([
            'status' => 1,
            'message' => 'Xóa thông tin người ở thành công',
        ], 200);
    }
}
