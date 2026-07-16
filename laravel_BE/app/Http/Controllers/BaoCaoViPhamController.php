<?php

namespace App\Http\Controllers;

use App\Http\Requests\BaoCaoViPhamCreateRequest;
use App\Http\Requests\BaoCaoViPhamUpdateStatusRequest;
use App\Models\BaoCaoViPham;
use App\Models\NguoiOPhong;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BaoCaoViPhamController
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        if (! $user || $user->vai_tro !== 'ADMIN') {
            return response()->json([
                'status' => 0,
                'message' => 'Không có quyền thực hiện chức năng này',
            ], 403);
        }

        $data = BaoCaoViPham::with(['nguoiBaoCao', 'tinDang', 'nguoiXuLy'])
            ->orderBy('id', 'desc')
            ->get();

        return response()->json([
            'status' => 1,
            'data' => $data,
        ], 200);
    }

    public function create(BaoCaoViPhamCreateRequest $request): JsonResponse
    {
        $user = $request->user();
        if (! $user) {
            return response()->json([
                'status' => 0,
                'message' => 'Chưa đăng nhập',
            ], 401);
        }

        // Kiểm tra xem user có phải là người đang thuê thuộc nhà trọ/phòng trọ của tin đăng này hay không
        $nhaTroIds = \App\Models\PhongTro::where('tin_dang_id', $request->tin_dang_id)
            ->pluck('nha_tro_id')
            ->unique();

        $isTenant = \App\Models\NguoiOPhong::where('khach_hang_id', $user->id)
            ->where('trang_thai', 'DANG_O')
            ->whereHas('phongTro', function ($query) use ($nhaTroIds) {
                $query->whereIn('nha_tro_id', $nhaTroIds);
            })->exists();

        if (! $isTenant) {
            return response()->json([
                'status' => 0,
                'message' => 'Bạn phải là người đang thuê thuộc nhà trọ/phòng trọ của tin đăng này mới có quyền báo cáo vi phạm',
            ], 403);
        }



        $data = BaoCaoViPham::create([
            'nguoi_bao_cao_id' => $user->id,
            'tin_dang_id' => $request->tin_dang_id,
            'ly_do' => $request->ly_do,
            'mo_ta' => $request->mo_ta,
            'trang_thai' => 'CHO_XU_LY',
        ]);

        return response()->json([
            'status' => 1,
            'data' => $data,
            'message' => 'Báo cáo vi phạm đã được gửi lên hệ thống',
        ], 200);
    }

    public function updateStatus(BaoCaoViPhamUpdateStatusRequest $request): JsonResponse
    {
        $admin = $request->user();
        if (! $admin || $admin->vai_tro !== 'ADMIN') {
            return response()->json([
                'status' => 0,
                'message' => 'Không có quyền thực hiện chức năng này',
            ], 403);
        }

        $report = BaoCaoViPham::find($request->id);
        $report->update([
            'trang_thai' => $request->trang_thai,
            'ghi_chu_admin' => $request->ghi_chu_admin,
            'xu_ly_boi' => $admin->id,
            'xu_ly_luc' => now(),
        ]);

        return response()->json([
            'status' => 1,
            'message' => 'Cập nhật trạng thái báo cáo vi phạm thành công',
            'data' => $report,
        ], 200);
    }
}
