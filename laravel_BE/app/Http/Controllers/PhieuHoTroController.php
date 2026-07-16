<?php

namespace App\Http\Controllers;

use App\Http\Requests\PhieuHoTroCreateRequest;
use App\Http\Requests\PhieuHoTroUpdateStatusRequest;
use App\Models\PhieuHoTro;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PhieuHoTroController
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

        $query = PhieuHoTro::query();
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

    public function create(PhieuHoTroCreateRequest $request): JsonResponse
    {
        $user = $request->user();
        if (! $user) {
            return response()->json([
                'status' => 0,
                'message' => 'Chưa đăng nhập',
            ], 401);
        }

        $data = PhieuHoTro::create([
            'user_id' => $user->id,
            'tieu_de' => $request->tieu_de,
            'noi_dung' => $request->noi_dung,
            'trang_thai' => 'MOI',
        ]);

        return response()->json([
            'status' => 1,
            'data' => $data,
            'message' => 'Gửi phiếu hỗ trợ thành công',
        ], 200);
    }

    public function updateStatus(PhieuHoTroUpdateStatusRequest $request): JsonResponse
    {
        $user = $request->user();
        if (! $user) {
            return response()->json([
                'status' => 0,
                'message' => 'Chưa đăng nhập',
            ], 401);
        }

        $ticket = PhieuHoTro::find($request->id);

        if ($user->vai_tro !== 'ADMIN' && $ticket->user_id !== $user->id) {
            return response()->json([
                'status' => 0,
                'message' => 'Không có quyền thực hiện hành động này',
            ], 403);
        }

        if ($user->vai_tro !== 'ADMIN' && $request->trang_thai !== 'DA_DONG') {
            return response()->json([
                'status' => 0,
                'message' => 'Bạn chỉ có quyền đóng phiếu hỗ trợ của mình',
            ], 403);
        }

        $ticket->update([
            'trang_thai' => $request->trang_thai,
        ]);

        return response()->json([
            'status' => 1,
            'message' => 'Cập nhật trạng thái phiếu hỗ trợ thành công',
            'data' => $ticket,
        ], 200);
    }
}
