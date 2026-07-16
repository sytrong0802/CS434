<?php

namespace App\Http\Controllers;

use App\Http\Requests\LichHenXemPhongCreateRequest;
use App\Http\Requests\LichHenXemPhongUpdateStatusRequest;
use App\Mail\PhanHoiDatLichHenMail;
use App\Mail\LichHenMail;
use App\Models\LichHenXemPhong;
use App\Models\TinDang;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class LichHenXemPhongController
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

        $query = LichHenXemPhong::with(['khachHang', 'chuTro', 'tinDang', 'phongTro']);

        if ($user->vai_tro === 'ADMIN') {
            // Admin sees all
        } elseif ($user->vai_tro === 'CHU_TRO') {
            $query->where('chu_tro_id', $user->id);
        } else {
            $query->where('khach_hang_id', $user->id);
        }

        $data = $query->orderBy('id', 'desc')->get();

        return response()->json([
            'status' => 1,
            'data' => $data,
        ], 200);
    }

    public function create(LichHenXemPhongCreateRequest $request): JsonResponse
    {
        $user = $request->user();
        if (! $user || $user->vai_tro !== 'KHACH_HANG') {
            return response()->json([
                'status' => 0,
                'message' => 'Chỉ khách thuê mới có quyền đặt lịch xem phòng',
            ], 403);
        }

        $tinDang = TinDang::find($request->tin_dang_id);

        $data = LichHenXemPhong::create([
            'khach_hang_id' => $user->id,
            'chu_tro_id' => $tinDang->chu_tro_id,
            'tin_dang_id' => $request->tin_dang_id,
            'phong_tro_id' => $request->phong_tro_id,
            'thoi_gian_hen' => $request->thoi_gian_hen,
            'loi_nhan' => $request->loi_nhan,
            'trang_thai' => 'CHO_XAC_NHAN',
        ]);

        // Load relations and send email notification to the landlord
        $data->load(['khachHang', 'chuTro', 'tinDang', 'phongTro']);
        $landlordEmail = $data->chuTro ? $data->chuTro->email : null;
        if ($landlordEmail) {
            try {
                Mail::to($landlordEmail)->send(new LichHenMail($data));
            } catch (\Exception $e) {
                Log::error('Lỗi gửi mail đặt lịch hẹn: '.$e->getMessage());
            }
        }

        return response()->json([
            'status' => 1,
            'data' => $data,
            'message' => 'Đặt lịch hẹn thành công, vui lòng chờ chủ trọ xác nhận',
        ], 200);
    }

    public function updateStatus(LichHenXemPhongUpdateStatusRequest $request): JsonResponse
    {
        $user = $request->user();
        $lichHen = LichHenXemPhong::find($request->id);

        if (! $lichHen) {
            return response()->json([
                'status' => 0,
                'message' => 'Không tìm thấy lịch hẹn',
            ], 404);
        }

        if ($user->vai_tro === 'CHU_TRO' && $lichHen->chu_tro_id !== $user->id) {
            return response()->json([
                'status' => 0,
                'message' => 'Không có quyền xử lý lịch hẹn này',
            ], 403);
        }

        if ($user->vai_tro === 'KHACH_HANG' && $lichHen->khach_hang_id !== $user->id) {
            return response()->json([
                'status' => 0,
                'message' => 'Không có quyền hủy lịch hẹn này',
            ], 403);
        }

        if ($user->vai_tro === 'KHACH_HANG' && $request->trang_thai !== 'DA_HUY') {
            return response()->json([
                'status' => 0,
                'message' => 'Khách hàng chỉ có quyền chuyển trạng thái sang DA_HUY',
            ], 403);
        }

        $lichHen->trang_thai = $request->trang_thai;
        if ($request->trang_thai === 'TU_CHOI') {
            $lichHen->ly_do_tu_choi = $request->ly_do_tu_choi;
        } else {
            $lichHen->ly_do_tu_choi = null;
        }
        $lichHen->save();

        // Send email to customer notifying them of the result
        $lichHen->load(['khachHang', 'tinDang']);
        if ($lichHen->khachHang && $lichHen->khachHang->email) {
            try {
                Mail::to($lichHen->khachHang->email)->send(new PhanHoiDatLichHenMail($lichHen));
            } catch (\Exception $e) {
                Log::error('Lỗi gửi mail phản hồi lịch hẹn: '.$e->getMessage());
            }
        }

        return response()->json([
            'status' => 1,
            'message' => 'Cập nhật trạng thái lịch hẹn thành công',
            'data' => $lichHen,
        ], 200);
    }
}
