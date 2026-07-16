<?php

namespace App\Http\Controllers;

use App\Http\Requests\LichSuGiaoDichDepositRequest;
use App\Models\LichSuGiaoDich;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LichSuGiaoDichController
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

        $query = LichSuGiaoDich::query();
        if ($user->vai_tro === 'ADMIN') {
            $query->with('user');
        } else {
            $query->where('user_id', $user->id);
        }

        $data = $query->orderBy('id', 'desc')->get();

        return response()->json([
            'status' => 1,
            'data' => $data,
        ], 200);
    }

    public function deposit(LichSuGiaoDichDepositRequest $request): JsonResponse
    {
        $user = $request->user();
        if (! $user) {
            return response()->json([
                'status' => 0,
                'message' => 'Chưa đăng nhập',
            ], 401);
        }

        DB::beginTransaction();
        try {
            $userModel = User::lockForUpdate()->find($user->id);
            $userModel->so_du += $request->so_tien;
            $userModel->save();

            $log = LichSuGiaoDich::create([
                'user_id' => $user->id,
                'loai_giao_dich' => 'NAP_TIEN',
                'so_tien' => $request->so_tien,
                'so_du_cuoi' => $userModel->so_du,
                'ma_giao_dich_doi_tac' => $request->ma_giao_dich_doi_tac,
                'mo_ta' => $request->mo_ta ?: 'Nạp tiền vào tài khoản',
            ]);

            DB::commit();

            return response()->json([
                'status' => 1,
                'message' => 'Nạp tiền thành công',
                'so_du' => $userModel->so_du,
                'data' => $log,
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'status' => 0,
                'message' => 'Có lỗi xảy ra, vui lòng thử lại sau',
            ], 500);
        }
    }
}
