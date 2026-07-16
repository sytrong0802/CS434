<?php

namespace App\Http\Controllers;

use App\Http\Requests\TinDangChangeStatusRequest;
use App\Http\Requests\TinDangCreateRequest;
use App\Http\Requests\TinDangUpdateRequest;
use App\Models\PhongTro;
use App\Models\TinDang;
use App\Mail\DuyetTinMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TinDangController
{
    public function index(Request $request): JsonResponse
    {
        $query = TinDang::where('trang_thai', 'HIEN_THI')
            ->with(['tinhThanh', 'quanHuyen', 'phuongXa', 'hinhAnhs', 'tienIchs']);

        if ($request->filled('q')) {
            $search = '%'.$request->q.'%';
            $query->where(function ($q) use ($search) {
                $q->where('tieu_de', 'like', $search)
                    ->orWhere('dia_chi_chi_tiet', 'like', $search)
                    ->orWhere('mo_ta', 'like', $search);
            });
        }

        if ($request->filled('tinh_thanh_id')) {
            $query->where('tinh_thanh_id', $request->tinh_thanh_id);
        }

        if ($request->filled('quan_huyen_id')) {
            $query->where('quan_huyen_id', $request->quan_huyen_id);
        }

        if ($request->filled('phuong_xa_id')) {
            $query->where('phuong_xa_id', $request->phuong_xa_id);
        }

        if ($request->filled('gia_thue_min')) {
            $query->where('gia_thue_min', '>=', $request->gia_thue_min);
        }

        if ($request->filled('gia_thue_max')) {
            $query->where('gia_thue_min', '<=', $request->gia_thue_max);
        }

        if ($request->filled('dien_tich_min')) {
            $query->where('dien_tich_min', '>=', $request->dien_tich_min);
        }

        if ($request->filled('loai_phong')) {
            $query->where('loai_phong', $request->loai_phong);
        }

        if ($request->filled('tinh_trang_noi_that')) {
            $query->where('tinh_trang_noi_that', $request->tinh_trang_noi_that);
        }

        if ($request->filled('diem_danh_gia')) {
            $query->where('diem_danh_gia', '>=', $request->diem_danh_gia);
        }

        $data = $query->paginate($request->input('limit', 10));

        return response()->json([
            'status' => 1,
            'data' => $data,
        ], 200);
    }

    public function myListings(Request $request): JsonResponse
    {
        $user = $request->user();
        if (! $user) {
            return response()->json([
                'status' => 0,
                'message' => 'Chưa đăng nhập',
            ], 401);
        }

        $data = TinDang::where('chu_tro_id', $user->id)
            ->with(['tinhThanh', 'quanHuyen', 'phuongXa', 'hinhAnhs', 'tienIchs'])
            ->get();

        return response()->json([
            'status' => 1,
            'data' => $data,
        ], 200);
    }

    public function pendingListings(Request $request): JsonResponse
    {
        $admin = $request->user();
        if (! $admin || $admin->vai_tro !== 'ADMIN') {
            return response()->json([
                'status' => 0,
                'message' => 'Không có quyền thực hiện chức năng này',
            ], 403);
        }

        $data = TinDang::where('trang_thai', 'CHO_XU_LY')
            ->with(['tinhThanh', 'quanHuyen', 'phuongXa', 'hinhAnhs', 'tienIchs', 'chuTro'])
            ->get();

        return response()->json([
            'status' => 1,
            'data' => $data,
        ], 200);
    }

    public function create(TinDangCreateRequest $request): JsonResponse
    {
        $user = $request->user();
        if (! $user || $user->vai_tro !== 'CHU_TRO') {
            return response()->json([
                'status' => 0,
                'message' => 'Chỉ chủ trọ mới có quyền thực hiện chức năng này',
            ], 403);
        }

        $tinDang = TinDang::create([
            'chu_tro_id' => $user->id,
            'tieu_de' => $request->tieu_de,
            'mo_ta' => $request->mo_ta,
            'dia_chi_chi_tiet' => $request->dia_chi_chi_tiet,
            'phuong_xa_id' => $request->phuong_xa_id,
            'quan_huyen_id' => $request->quan_huyen_id,
            'tinh_thanh_id' => $request->tinh_thanh_id,
            'gia_thue_min' => $request->gia_thue_min,
            'dien_tich_min' => $request->dien_tich_min,
            'loai_phong' => $request->loai_phong,
            'tinh_trang_noi_that' => $request->tinh_trang_noi_that,
            'anh_dai_dien' => $request->anh_dai_dien,
            'vi_do' => $request->vi_do,
            'kinh_do' => $request->kinh_do,
            'ten_lien_he' => $user->ho_ten,
            'so_dien_thoai_lien_he' => $user->so_dien_thoai,
            'trang_thai' => 'CHO_XU_LY',
        ]);

        if ($request->has('tien_ich_ids')) {
            $tinDang->tienIchs()->sync($request->tien_ich_ids);
        }

        // Link phong_tro to this newly created tin_dang if phong_tro_id is passed
        $phongTroId = $request->input('phong_tro_id');
        if ($phongTroId) {
            $phong = PhongTro::find($phongTroId);
            if ($phong) {
                $phong->update(['tin_dang_id' => $tinDang->id]);
            }
        }

        return response()->json([
            'status' => 1,
            'data' => $tinDang,
            'message' => 'Đăng tin thành công, vui lòng chờ kiểm duyệt',
        ], 200);
    }

    public function update(TinDangUpdateRequest $request): JsonResponse
    {
        $user = $request->user();
        $tinDang = TinDang::find($request->id);

        if ($user->vai_tro !== 'ADMIN' && $tinDang->chu_tro_id !== $user->id) {
            return response()->json([
                'status' => 0,
                'message' => 'Không có quyền chỉnh sửa bài đăng này',
            ], 403);
        }

        $tinDang->update([
            'tieu_de' => $request->tieu_de,
            'mo_ta' => $request->mo_ta,
            'dia_chi_chi_tiet' => $request->dia_chi_chi_tiet,
            'phuong_xa_id' => $request->phuong_xa_id,
            'quan_huyen_id' => $request->quan_huyen_id,
            'tinh_thanh_id' => $request->tinh_thanh_id,
            'gia_thue_min' => $request->gia_thue_min,
            'dien_tich_min' => $request->dien_tich_min,
            'loai_phong' => $request->loai_phong,
            'tinh_trang_noi_that' => $request->tinh_trang_noi_that,
            'anh_dai_dien' => $request->anh_dai_dien,
            'vi_do' => $request->vi_do,
            'kinh_do' => $request->kinh_do,
            'ten_lien_he' => $user->ho_ten,
            'so_dien_thoai_lien_he' => $user->so_dien_thoai,
            'trang_thai' => 'CHO_XU_LY', // Cập nhật lại thì duyệt lại
        ]);

        if ($request->has('tien_ich_ids')) {
            $tinDang->tienIchs()->sync($request->tien_ich_ids);
        }

        return response()->json([
            'status' => 1,
            'message' => 'Cập nhật bài đăng thành công',
            'data' => $tinDang,
        ], 200);
    }

    public function changeStatus(TinDangChangeStatusRequest $request): JsonResponse
    {
        $admin = $request->user();
        if (! $admin || $admin->vai_tro !== 'ADMIN') {
            return response()->json([
                'status' => 0,
                'message' => 'Không có quyền thực hiện chức năng này',
            ], 403);
        }

        $tinDang = TinDang::find($request->id);
        $tinDang->trang_thai = $request->trang_thai;
        $tinDang->duyet_boi = $admin->id;
        $tinDang->duyet_luc = now();

        if ($request->trang_thai === 'TU_CHOI') {
            $tinDang->ly_do_tu_choi = $request->ly_do_tu_choi;
        } else {
            $tinDang->ly_do_tu_choi = null;
        }

        $tinDang->save();

        // Send email to landlord notifying of the decision
        $tinDang->load('chuTro');
        if ($tinDang->chuTro && $tinDang->chuTro->email) {
            try {
                Mail::to($tinDang->chuTro->email)->send(new DuyetTinMail($tinDang));
            } catch (\Exception $e) {
                Log::error('Lỗi gửi mail duyệt tin: '.$e->getMessage());
            }
        }

        return response()->json([
            'status' => 1,
            'message' => 'Cập nhật trạng thái duyệt tin thành công',
            'data' => $tinDang,
        ], 200);
    }

    public function show(string $id): JsonResponse
    {
        $tinDang = TinDang::with(['tinhThanh', 'quanHuyen', 'phuongXa', 'hinhAnhs', 'tienIchs', 'phongTros', 'chuTro'])
            ->find($id);

        if (! $tinDang) {
            return response()->json([
                'status' => 0,
                'message' => 'Không tìm thấy tin đăng',
            ], 404);
        }

        return response()->json([
            'status' => 1,
            'data' => $tinDang,
        ], 200);
    }

    public function delete(Request $request, string $id): JsonResponse
    {
        $user = $request->user();
        $tinDang = TinDang::find($id);

        if (! $tinDang) {
            return response()->json([
                'status' => 0,
                'message' => 'Không tìm thấy tin đăng',
            ], 404);
        }

        if ($user->vai_tro !== 'ADMIN' && $tinDang->chu_tro_id !== $user->id) {
            return response()->json([
                'status' => 0,
                'message' => 'Không có quyền xóa bài đăng này',
            ], 403);
        }

        $tinDang->delete();

        return response()->json([
            'status' => 1,
            'message' => 'Xóa tin đăng thành công',
        ], 200);
    }
}
