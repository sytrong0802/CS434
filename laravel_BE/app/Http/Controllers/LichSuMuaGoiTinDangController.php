<?php

namespace App\Http\Controllers;

use App\Http\Requests\LichSuMuaGoiTinDangBuyPackageRequest;
use App\Models\GoiDichVu;
use App\Models\LichSuGiaoDich;
use App\Models\LichSuMuaGoiTinDang;
use App\Models\TinDang;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LichSuMuaGoiTinDangController
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

        $query = LichSuMuaGoiTinDang::query();
        if ($user->vai_tro === 'ADMIN') {
            $query->with(['user', 'tinDang', 'goiDichVu']);
        } else {
            $query->where('user_id', $user->id)->with(['tinDang', 'goiDichVu']);
        }

        $data = $query->orderBy('id', 'desc')->get();

        return response()->json([
            'status' => 1,
            'data' => $data,
        ], 200);
    }

    public function buyPackage(LichSuMuaGoiTinDangBuyPackageRequest $request): JsonResponse
    {
        $user = $request->user();
        if (! $user || $user->vai_tro !== 'CHU_TRO') {
            return response()->json([
                'status' => 0,
                'message' => 'Chỉ chủ trọ mới có quyền mua gói tin đăng',
            ], 403);
        }

        $tinDang = TinDang::find($request->tin_dang_id);
        if ($tinDang->chu_tro_id !== $user->id) {
            return response()->json([
                'status' => 0,
                'message' => 'Không có quyền mua gói dịch vụ cho tin đăng của người khác',
            ], 403);
        }

        $goi = GoiDichVu::find($request->goi_dich_vu_id);
        if ($goi->trang_thai !== 'HOAT_DONG') {
            return response()->json([
                'status' => 0,
                'message' => 'Gói dịch vụ này hiện đã ngưng cung cấp',
            ], 400);
        }

        DB::beginTransaction();
        try {
            $userModel = User::lockForUpdate()->find($user->id);

            if ($userModel->so_du < $goi->gia_tien) {
                return response()->json([
                    'status' => 0,
                    'message' => 'Số dư tài khoản không đủ để thanh toán. Vui lòng nạp thêm tiền.',
                ], 400);
            }

            $userModel->so_du -= $goi->gia_tien;
            $userModel->save();

            $giaoDich = LichSuGiaoDich::create([
                'user_id' => $user->id,
                'loai_giao_dich' => 'TRU_TIEN_MUA_GOI',
                'so_tien' => $goi->gia_tien,
                'so_du_cuoi' => $userModel->so_du,
                'mo_ta' => 'Thanh toán mua gói dịch vụ: '.$goi->ten_goi,
            ]);

            $start = now();
            if ($tinDang->ngay_het_han_goi && $tinDang->ngay_het_han_goi->isFuture()) {
                $start = $tinDang->ngay_het_han_goi;
            }
            $end = (clone $start)->addDays($goi->so_ngay_hieu_luc);

            $muaGoi = LichSuMuaGoiTinDang::create([
                'tin_dang_id' => $tinDang->id,
                'user_id' => $user->id,
                'goi_dich_vu_id' => $goi->id,
                'gia_tien' => $goi->gia_tien,
                'bat_dau_luc' => $start,
                'ket_thuc_luc' => $end,
                'trang_thai' => 'DANG_HIEU_LUC',
                'giao_dich_id' => $giaoDich->id,
            ]);

            $tinDang->update([
                'goi_dich_vu_id' => $goi->id,
                'ngay_het_han_goi' => $end,
            ]);

            DB::commit();

            return response()->json([
                'status' => 1,
                'message' => 'Mua gói dịch vụ cho bài đăng thành công',
                'data' => $muaGoi,
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'status' => 0,
                'message' => 'Có lỗi xảy ra trong quá trình thanh toán: '.$e->getMessage(),
            ], 500);
        }
    }
}
