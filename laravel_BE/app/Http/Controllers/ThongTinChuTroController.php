<?php

namespace App\Http\Controllers;

use App\Http\Requests\ThongTinChuTroStoreRequest;
use App\Http\Requests\ThongTinChuTroUpdateStatusRequest;
use App\Models\ThongTinChuTro;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ThongTinChuTroController
{
    public function show(Request $request, string $userId): JsonResponse
    {
        $kyc = ThongTinChuTro::where('user_id', $userId)->first();

        if (! $kyc) {
            return response()->json([
                'status' => 0,
                'message' => 'Không tìm thấy thông tin xác minh của chủ trọ',
            ], 404);
        }

        return response()->json([
            'status' => 1,
            'data' => $kyc,
        ], 200);
    }

    public function store(ThongTinChuTroStoreRequest $request): JsonResponse
    {
        $user = $request->user();

        if (! $user || $user->vai_tro !== 'CHU_TRO') {
            return response()->json([
                'status' => 0,
                'message' => 'Chỉ chủ trọ mới có quyền thực hiện chức năng này',
            ], 403);
        }

        $kyc = ThongTinChuTro::updateOrCreate(
            ['user_id' => $user->id],
            [
                'so_cccd_passport' => $request->so_cccd_passport,
                'ho_ten_khai_sinh' => $request->ho_ten_khai_sinh,
                'ngay_cap' => $request->ngay_cap,
                'noi_cap' => $request->noi_cap,
                'anh_cccd_mat_truoc' => $request->anh_cccd_mat_truoc,
                'anh_cccd_mat_sau' => $request->anh_cccd_mat_sau,
                'anh_chan_dung_hop_dong' => $request->anh_chan_dung_hop_dong,
                'ten_ngan_hang' => $request->ten_ngan_hang,
                'so_tai_khoan' => $request->so_tai_khoan,
                'ten_chu_tai_khoan' => $request->ten_chu_tai_khoan,
                'trang_thai_kyc' => 'CHO_DUYET',
                'ly_do_tu_choi_kyc' => null,
            ]
        );

        return response()->json([
            'status' => 1,
            'message' => 'Gửi thông tin xác minh thành công, vui lòng chờ phê duyệt',
            'data' => $kyc,
        ], 200);
    }

    public function updateStatus(ThongTinChuTroUpdateStatusRequest $request): JsonResponse
    {
        $admin = $request->user();

        if (! $admin || $admin->vai_tro !== 'ADMIN') {
            return response()->json([
                'status' => 0,
                'message' => 'Không có quyền thực hiện chức năng này',
            ], 403);
        }

        $kyc = ThongTinChuTro::where('user_id', $request->user_id)->first();

        if (! $kyc) {
            return response()->json([
                'status' => 0,
                'message' => 'Không tìm thấy thông tin xác minh của chủ trọ',
            ], 404);
        }

        $kyc->trang_thai_kyc = $request->trang_thai_kyc;
        $kyc->duyet_kyc_boi = $admin->id;
        $kyc->duyet_kyc_luc = now();

        if ($request->trang_thai_kyc === 'BI_TU_CHOI') {
            $kyc->ly_do_tu_choi_kyc = $request->ly_do_tu_choi;
        } else {
            $kyc->ly_do_tu_choi_kyc = null;
        }

        $kyc->save();

        return response()->json([
            'status' => 1,
            'message' => 'Cập nhật trạng thái KYC thành công',
            'data' => $kyc,
        ], 200);
    }
}
