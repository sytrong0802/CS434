<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BaoCaoViPhamController;
use App\Http\Controllers\ChuTroController;
use App\Http\Controllers\DanhGiaController;
use App\Http\Controllers\EmailOtpController;
use App\Http\Controllers\GoiDichVuController;
use App\Http\Controllers\HinhAnhTinDangController;
use App\Http\Controllers\KhachHangController;
use App\Http\Controllers\LichHenXemPhongController;
use App\Http\Controllers\LichSuGiaoDichController;
use App\Http\Controllers\LichSuMuaGoiTinDangController;
use App\Http\Controllers\NguoiOPhongController;
use App\Http\Controllers\NhaTroController;
use App\Http\Controllers\PhieuHoTroController;
use App\Http\Controllers\PhongTroController;
use App\Http\Controllers\PhuongXaController;
use App\Http\Controllers\QuanHuyenController;
use App\Http\Controllers\ThongBaoController;
use App\Http\Controllers\ThongTinChuTroController;
use App\Http\Controllers\TienIchController;
use App\Http\Controllers\TinDangController;
use App\Http\Controllers\TinDangTienIchController;
use App\Http\Controllers\TinhThanhController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\YeuThichController;
use Illuminate\Support\Facades\Route;

// =========================================================================
// ==================== 1. PUBLIC ROUTES (GUEST) ===========================
// =========================================================================

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/quen-mat-khau', [AuthController::class, 'quenMatKhau']);
Route::post('/doi-mat-khau', [AuthController::class, 'doiMatKhau']);

Route::prefix('email-otp')->group(function () {
    Route::post('/send-otp', [EmailOtpController::class, 'sendOtp']);
    Route::post('/verify-otp', [EmailOtpController::class, 'verifyOtp']);
});

Route::prefix('tinh-thanh')->group(function () {
    Route::get('/', [TinhThanhController::class, 'index']);
});

Route::prefix('quan-huyen')->group(function () {
    Route::get('/', [QuanHuyenController::class, 'index']);
});

Route::prefix('phuong-xa')->group(function () {
    Route::get('/', [PhuongXaController::class, 'index']);
});

Route::prefix('tin-dang')->group(function () {
    Route::get('/', [TinDangController::class, 'index']);
    Route::get('/{id}', [TinDangController::class, 'show']);
});

Route::prefix('danh-gia')->group(function () {
    Route::get('/', [DanhGiaController::class, 'index']);
});

Route::prefix('tien-ich')->group(function () {
    Route::get('/', [TienIchController::class, 'index']);
});

Route::prefix('goi-dich-vu')->group(function () {
    Route::get('/', [GoiDichVuController::class, 'index']);
});

// =========================================================================
// ==================== 2. ADMIN ROUTES ====================================
// =========================================================================

Route::prefix('admin')->middleware(['auth:sanctum', 'role:ADMIN'])->group(function () {

    Route::prefix('bao-cao-vi-pham')->group(function () {
        Route::get('/', [BaoCaoViPhamController::class, 'index']);
        Route::post('/update-status', [BaoCaoViPhamController::class, 'updateStatus']);
    });

    Route::prefix('chu-tro')->group(function () {
        Route::get('/', [ChuTroController::class, 'index']);
        Route::post('/', [ChuTroController::class, 'create']);
        Route::put('/', [ChuTroController::class, 'update']);
        Route::delete('/{id}', [ChuTroController::class, 'delete']);
        Route::post('/change-status', [ChuTroController::class, 'changeStatus']);
    });

    Route::prefix('khach-hang')->group(function () {
        Route::get('/', [KhachHangController::class, 'index']);
        Route::post('/', [KhachHangController::class, 'store']);
        Route::put('/', [KhachHangController::class, 'update']);
        Route::delete('/{id}', [KhachHangController::class, 'destroy']);
        Route::post('/change-status', [KhachHangController::class, 'changeStatus']);
        Route::post('/tim-so-dien-thoai', [KhachHangController::class, 'timSoDienThoai']);
    });

    Route::prefix('goi-dich-vu')->group(function () {
        Route::post('/', [GoiDichVuController::class, 'create']);
        Route::put('/', [GoiDichVuController::class, 'update']);
        Route::delete('/{id}', [GoiDichVuController::class, 'delete']);
    });

    Route::prefix('thong-tin-chu-tro')->group(function () {
        Route::post('/update-status', [ThongTinChuTroController::class, 'updateStatus']);
    });

    Route::prefix('tien-ich')->group(function () {
        Route::post('/', [TienIchController::class, 'create']);
        Route::put('/', [TienIchController::class, 'update']);
        Route::delete('/{id}', [TienIchController::class, 'delete']);
    });

    Route::prefix('tin-dang')->group(function () {
        Route::get('/pending', [TinDangController::class, 'pendingListings']);
        Route::post('/change-status', [TinDangController::class, 'changeStatus']);
    });

    Route::prefix('user')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::delete('/{id}', [UserController::class, 'destroy']);
    });

});

// =========================================================================
// ==================== 3. AUTHENTICATED USER ROUTES =======================
// =========================================================================

Route::middleware('auth:sanctum')->group(function () {

    Route::prefix('bao-cao-vi-pham')->group(function () {
        Route::post('/', [BaoCaoViPhamController::class, 'create']);
    });

    Route::prefix('danh-gia')->group(function () {
        Route::get('/my-reviews', [DanhGiaController::class, 'myReviews']);
        Route::get('/eligible-listings', [DanhGiaController::class, 'eligibleListings']);
        Route::post('/', [DanhGiaController::class, 'create']);
        Route::delete('/{id}', [DanhGiaController::class, 'delete']);
    });

    Route::prefix('hinh-anh-tin-dang')->group(function () {
        Route::get('/', [HinhAnhTinDangController::class, 'index']);
        Route::post('/', [HinhAnhTinDangController::class, 'store']);
        Route::delete('/{id}', [HinhAnhTinDangController::class, 'delete']);
    });

    Route::prefix('lich-hen-xem-phong')->group(function () {
        Route::get('/', [LichHenXemPhongController::class, 'index']);
        Route::post('/', [LichHenXemPhongController::class, 'create']);
        Route::post('/update-status', [LichHenXemPhongController::class, 'updateStatus']);
    });

    Route::prefix('lich-su-giao-dich')->group(function () {
        Route::get('/', [LichSuGiaoDichController::class, 'index']);
        Route::post('/deposit', [LichSuGiaoDichController::class, 'deposit']);
    });

    Route::prefix('lich-su-mua-goi-tin-dang')->group(function () {
        Route::get('/', [LichSuMuaGoiTinDangController::class, 'index']);
        Route::post('/buy-package', [LichSuMuaGoiTinDangController::class, 'buyPackage']);
    });

    Route::prefix('nguoi-o-phong')->group(function () {
        Route::get('/', [NguoiOPhongController::class, 'index']);
        Route::post('/', [NguoiOPhongController::class, 'create']);
        Route::put('/', [NguoiOPhongController::class, 'update']);
        Route::delete('/{id}', [NguoiOPhongController::class, 'delete']);
    });

    Route::prefix('nha-tro')->group(function () {
        Route::get('/', [NhaTroController::class, 'index']);
        Route::post('/', [NhaTroController::class, 'create']);
        Route::put('/', [NhaTroController::class, 'update']);
        Route::delete('/{id}', [NhaTroController::class, 'delete']);
    });

    Route::prefix('phieu-ho-tro')->group(function () {
        Route::get('/', [PhieuHoTroController::class, 'index']);
        Route::post('/', [PhieuHoTroController::class, 'create']);
        Route::post('/update-status', [PhieuHoTroController::class, 'updateStatus']);
    });

    Route::prefix('phong-tro')->group(function () {
        Route::get('/', [PhongTroController::class, 'index']);
        Route::get('/{id}', [PhongTroController::class, 'show']);
        Route::post('/', [PhongTroController::class, 'create']);
        Route::put('/', [PhongTroController::class, 'update']);
        Route::delete('/{id}', [PhongTroController::class, 'delete']);
    });

    Route::prefix('thong-bao')->group(function () {
        Route::get('/', [ThongBaoController::class, 'index']);
        Route::post('/read', [ThongBaoController::class, 'read']);
        Route::post('/read-all', [ThongBaoController::class, 'readAll']);
    });

    Route::prefix('thong-tin-chu-tro')->group(function () {
        Route::get('/{id}', [ThongTinChuTroController::class, 'show']);
        Route::post('/', [ThongTinChuTroController::class, 'store']);
    });

    Route::prefix('tin-dang')->group(function () {
        Route::post('/my-listings', [TinDangController::class, 'myListings']);
        Route::post('/', [TinDangController::class, 'create']);
        Route::put('/', [TinDangController::class, 'update']);
        Route::delete('/{id}', [TinDangController::class, 'delete']);
    });

    Route::prefix('tin-dang-tien-ich')->group(function () {
        Route::get('/', [TinDangTienIchController::class, 'index']);
        Route::post('/', [TinDangTienIchController::class, 'store']);
        Route::delete('/{id}', [TinDangTienIchController::class, 'delete']);
    });

    Route::prefix('user')->group(function () {
        Route::post('/profile', [UserController::class, 'profile']);
        Route::post('/update-profile', [UserController::class, 'updateProfile']);
        Route::post('/change-password', [UserController::class, 'changePassword']);
        Route::post('/upgrade-to-host', [UserController::class, 'upgradeToHost']);
    });

    Route::prefix('yeu-thich')->group(function () {
        Route::get('/', [YeuThichController::class, 'index']);
        Route::post('/toggle', [YeuThichController::class, 'toggle']);
    });

    Route::post('/logout', [AuthController::class, 'logout']);

});
