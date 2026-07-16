<?php

namespace App\Http\Controllers;

use App\Http\Requests\YeuThichToggleRequest;
use App\Models\TinDang;
use App\Models\YeuThich;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class YeuThichController
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

        $data = TinDang::whereHas('nguoiYeuThich', function ($q) use ($user) {
            $q->where('user_id', $user->id);
        })->with(['tinhThanh', 'quanHuyen', 'phuongXa', 'hinhAnhs'])->get();

        return response()->json([
            'status' => 1,
            'data' => $data,
        ], 200);
    }

    public function toggle(YeuThichToggleRequest $request): JsonResponse
    {
        $user = $request->user();
        if (! $user) {
            return response()->json([
                'status' => 0,
                'message' => 'Chưa đăng nhập',
            ], 401);
        }

        $fav = YeuThich::where('user_id', $user->id)
            ->where('tin_dang_id', $request->tin_dang_id)
            ->first();

        if ($fav) {
            $fav->delete();
            $message = 'Bỏ yêu thích tin đăng thành công';
            $isFav = false;
        } else {
            YeuThich::create([
                'user_id' => $user->id,
                'tin_dang_id' => $request->tin_dang_id,
            ]);
            $message = 'Yêu thích tin đăng thành công';
            $isFav = true;
        }

        return response()->json([
            'status' => 1,
            'message' => $message,
            'is_favorite' => $isFav,
        ], 200);
    }
}
