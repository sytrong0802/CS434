<?php

namespace App\Http\Controllers;

use App\Http\Requests\DanhGiaCreateRequest;
use App\Http\Requests\DanhGiaIndexRequest;
use App\Models\DanhGia;
use App\Models\NguoiOPhong;
use App\Models\TinDang;
use App\Mail\DanhGiaTinDangMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DanhGiaController
{
    public function index(DanhGiaIndexRequest $request): JsonResponse
    {
        $data = DanhGia::where('tin_dang_id', $request->tin_dang_id)
            ->where('trang_thai', 'HIEN_THI')
            ->with('khachHang')
            ->orderBy('id', 'desc')
            ->get();

        return response()->json([
            'status' => 1,
            'data' => $data,
        ], 200);
    }

    public function create(DanhGiaCreateRequest $request): JsonResponse
    {
        $user = $request->user();
        if (! $user || $user->vai_tro !== 'KHACH_HANG') {
            return response()->json([
                'status' => 0,
                'message' => 'Chỉ khách thuê mới có quyền đánh giá',
            ], 403);
        }

        // Lấy danh sách ID nhà trọ liên kết với tin đăng
        $nhaTroIds = \App\Models\PhongTro::where('tin_dang_id', $request->tin_dang_id)
            ->pluck('nha_tro_id')
            ->unique();

        // Kiểm tra xem user có đã từng thuê phòng và đã rời đi (DA_ROI) thuộc nhà trọ/phòng trọ của tin đăng này hay không
        $hasRentedAndLeft = NguoiOPhong::where('khach_hang_id', $user->id)
            ->where('trang_thai', 'DA_ROI')
            ->whereHas('phongTro', function ($query) use ($nhaTroIds) {
                $query->whereIn('nha_tro_id', $nhaTroIds);
            })->exists();

        if (! $hasRentedAndLeft) {
            return response()->json([
                'status' => 0,
                'message' => 'Bạn phải là người đã từng thuê phòng thuộc nhà trọ/phòng trọ của tin đăng này và đã dọn đi mới được đánh giá',
            ], 403);
        }

        $data = DanhGia::create([
            'khach_hang_id' => $user->id,
            'tin_dang_id' => $request->tin_dang_id,
            'so_sao' => $request->so_sao,
            'binh_luan' => $request->binh_luan,
            'trang_thai' => 'HIEN_THI',
        ]);

        // Tính toán lại điểm đánh giá trung bình của TinDang
        $tinDang = TinDang::with('chuTro')->find($request->tin_dang_id);
        $totalStars = DanhGia::where('tin_dang_id', $request->tin_dang_id)
            ->where('trang_thai', 'HIEN_THI')
            ->sum('so_sao');
        $reviewsCount = DanhGia::where('tin_dang_id', $request->tin_dang_id)
            ->where('trang_thai', 'HIEN_THI')
            ->count();

        $tinDang->update([
            'diem_danh_gia' => $reviewsCount > 0 ? (float) ($totalStars / $reviewsCount) : 0,
            'luot_danh_gia' => $reviewsCount,
        ]);

        // Gửi email cho chủ trọ
        $data->load(['khachHang', 'tinDang']);
        if ($tinDang->chuTro && $tinDang->chuTro->email) {
            try {
                Mail::to($tinDang->chuTro->email)->send(new DanhGiaTinDangMail($data));
            } catch (\Exception $e) {
                Log::error('Lỗi gửi mail thông báo đánh giá: ' . $e->getMessage());
            }
        }

        return response()->json([
            'status' => 1,
            'data' => $data,
            'message' => 'Đánh giá bài đăng thành công',
        ], 200);
    }

    public function delete(Request $request, string $id): JsonResponse
    {
        $user = $request->user();
        $danhGia = DanhGia::find($id);

        if (! $danhGia) {
            return response()->json([
                'status' => 0,
                'message' => 'Không tìm thấy đánh giá',
            ], 404);
        }

        if ($user->vai_tro !== 'ADMIN' && $danhGia->khach_hang_id !== $user->id) {
            return response()->json([
                'status' => 0,
                'message' => 'Không có quyền xóa đánh giá này',
            ], 403);
        }

        $danhGia->delete();

        // Tính toán lại điểm đánh giá trung bình của TinDang
        $tinDang = TinDang::find($danhGia->tin_dang_id);
        $totalStars = DanhGia::where('tin_dang_id', $danhGia->tin_dang_id)
            ->where('trang_thai', 'HIEN_THI')
            ->sum('so_sao');
        $reviewsCount = DanhGia::where('tin_dang_id', $danhGia->tin_dang_id)
            ->where('trang_thai', 'HIEN_THI')
            ->count();

        $tinDang->update([
            'diem_danh_gia' => $reviewsCount > 0 ? (float) ($totalStars / $reviewsCount) : 0,
            'luot_danh_gia' => $reviewsCount,
        ]);

        return response()->json([
            'status' => 1,
            'message' => 'Xóa đánh giá thành công',
        ], 200);
    }

    public function myReviews(Request $request): JsonResponse
    {
        $user = $request->user();
        if (! $user) {
            return response()->json([
                'status' => 0,
                'message' => 'Chưa đăng nhập',
            ], 401);
        }

        $data = DanhGia::where('khach_hang_id', $user->id)
            ->with(['tinDang'])
            ->orderBy('id', 'desc')
            ->get();

        return response()->json([
            'status' => 1,
            'data' => $data,
        ], 200);
    }

    public function eligibleListings(Request $request): JsonResponse
    {
        $user = $request->user();
        if (! $user) {
            return response()->json([
                'status' => 0,
                'message' => 'Chưa đăng nhập',
            ], 401);
        }

        // Lấy danh sách ID phòng trọ người dùng từng ở và đã dọn đi (DA_ROI)
        $phongIds = NguoiOPhong::where('khach_hang_id', $user->id)
            ->where('trang_thai', 'DA_ROI')
            ->pluck('phong_tro_id')
            ->unique();

        // Lấy danh sách ID nhà trọ liên kết với các phòng này
        $nhaTroIds = \App\Models\PhongTro::whereIn('id', $phongIds)
            ->pluck('nha_tro_id')
            ->unique();

        // Tìm các tin đăng tương ứng với phòng hoặc nhà trọ đó
        $listings = TinDang::where(function($query) use ($phongIds, $nhaTroIds) {
            $query->whereHas('phongTros', function($q) use ($phongIds, $nhaTroIds) {
                $q->whereIn('id', $phongIds)
                  ->orWhereIn('nha_tro_id', $nhaTroIds);
            });
        })->get();

        return response()->json([
            'status' => 1,
            'data' => $listings,
        ], 200);
    }
}
