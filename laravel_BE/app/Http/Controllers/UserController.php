<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserChangePasswordRequest;
use App\Http\Requests\UserUpdateProfileRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController
{
    public function profile(Request $request): JsonResponse
    {
        $user = $request->user();

        if (! $user) {
            return response()->json([
                'status' => 0,
                'message' => 'Chưa đăng nhập',
            ], 401);
        }

        return response()->json([
            'status' => 1,
            'data' => $user,
        ], 200);
    }

    public function updateProfile(UserUpdateProfileRequest $request): JsonResponse
    {
        $user = $request->user();

        if (! $user) {
            return response()->json([
                'status' => 0,
                'message' => 'Chưa đăng nhập',
            ], 401);
        }

        $user->update($request->only(['ho_ten', 'so_dien_thoai', 'avatar_url']));

        return response()->json([
            'status' => 1,
            'message' => 'Cập nhật thông tin thành công',
            'data' => $user,
        ], 200);
    }

    public function changePassword(UserChangePasswordRequest $request): JsonResponse
    {
        $user = $request->user();

        if (! $user) {
            return response()->json([
                'status' => 0,
                'message' => 'Chưa đăng nhập',
            ], 401);
        }

        if (! Hash::check($request->mat_khau_cu, $user->password)) {
            return response()->json([
                'status' => 0,
                'message' => 'Mật khẩu cũ không chính xác',
            ], 400);
        }

        $user->update([
            'password' => Hash::make($request->mat_khau_moi),
        ]);

        return response()->json([
            'status' => 1,
            'message' => 'Đổi mật khẩu thành công',
        ], 200);
    }

    public function index(Request $request): JsonResponse
    {
        $query = User::query();

        if ($request->has('vai_tro')) {
            $query->where('vai_tro', $request->vai_tro);
        }

        if ($request->has('trang_thai')) {
            $query->where('trang_thai', $request->trang_thai);
        } else {
            $query->where('trang_thai', '!=', 'DA_XOA');
        }

        $data = $query->get();

        return response()->json([
            'status' => 1,
            'data' => $data,
        ], 200);
    }

    public function destroy(Request $request, string $id): JsonResponse
    {
        $user = User::find($id);

        if (! $user) {
            return response()->json([
                'status' => 0,
                'message' => 'Không tìm thấy người dùng',
            ], 404);
        }

        $user->update([
            'trang_thai' => 'DA_XOA',
        ]);

        return response()->json([
            'status' => 1,
            'message' => 'Xóa tài khoản người dùng thành công',
        ], 200);
    }

    public function upgradeToHost(Request $request): JsonResponse
    {
        $user = $request->user();

        if (! $user) {
            return response()->json([
                'status' => 0,
                'message' => 'Chưa đăng nhập',
            ], 401);
        }

        if ($user->vai_tro === 'CHU_TRO') {
            return response()->json([
                'status' => 0,
                'message' => 'Tài khoản của bạn đã là chủ trọ',
            ], 400);
        }

        if ($user->vai_tro === 'ADMIN') {
            return response()->json([
                'status' => 0,
                'message' => 'Tài khoản Admin không cần nâng cấp',
            ], 400);
        }

        $user->update([
            'vai_tro' => 'CHU_TRO',
            'trang_thai' => 'HOAT_DONG',
        ]);

        return response()->json([
            'status' => 1,
            'message' => 'Nâng cấp tài khoản thành chủ trọ thành công!',
            'data' => $user,
        ], 200);
    }
}
