<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmailOtpSendOtpRequest;
use App\Http\Requests\EmailOtpVerifyOtpRequest;
use App\Models\EmailOtp;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class EmailOtpController
{
    public function sendOtp(EmailOtpSendOtpRequest $request): JsonResponse
    {
        $user = User::where('email', $request->email)->first();

        // Tạo mã OTP ngẫu nhiên 6 chữ số
        $otpCode = (string) mt_rand(100000, 999999);

        // Hủy bỏ các OTP cũ chưa sử dụng của mục đích này
        EmailOtp::where('user_id', $user->id)
            ->where('muc_dich', $request->muc_dich)
            ->whereNull('da_dung_luc')
            ->update(['het_han_luc' => now()]);

        // Tạo bản ghi OTP mới
        EmailOtp::create([
            'user_id' => $user->id,
            'ma_xac_nhan_hash' => Hash::make($otpCode),
            'muc_dich' => $request->muc_dich,
            'ip_tao' => $request->ip(),
            'het_han_luc' => now()->addMinutes(10),
            'so_lan_nhap_sai' => 0,
        ]);

        // Trả về OTP trong response cho mục đích dev/test
        return response()->json([
            'status' => 1,
            'message' => 'Gửi mã OTP thành công (Xem trong response dev)',
            'otp_code_dev' => $otpCode, // Thuận tiện cho việc test API
        ], 200);
    }

    public function verifyOtp(EmailOtpVerifyOtpRequest $request): JsonResponse
    {
        $user = User::where('email', $request->email)->first();

        $otpRecord = EmailOtp::where('user_id', $user->id)
            ->where('muc_dich', $request->muc_dich)
            ->whereNull('da_dung_luc')
            ->where('het_han_luc', '>', now())
            ->orderBy('id', 'desc')
            ->first();

        if (! $otpRecord) {
            return response()->json([
                'status' => 0,
                'message' => 'Mã OTP đã hết hạn hoặc không tồn tại',
            ], 400);
        }

        if ($otpRecord->so_lan_nhap_sai >= 5) {
            return response()->json([
                'status' => 0,
                'message' => 'Mã OTP đã bị khóa do nhập sai quá nhiều lần. Vui lòng gửi lại mã mới.',
            ], 400);
        }

        if (! Hash::check($request->otp, $otpRecord->ma_xac_nhan_hash)) {
            $otpRecord->increment('so_lan_nhap_sai');

            return response()->json([
                'status' => 0,
                'message' => 'Mã OTP không chính xác',
            ], 400);
        }

        $otpRecord->update([
            'da_dung_luc' => now(),
        ]);

        return response()->json([
            'status' => 1,
            'message' => 'Xác nhận mã OTP thành công',
        ], 200);
    }
}
