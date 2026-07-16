<?php

namespace App\Http\Controllers;

use App\Mail\SendMailQuenMK;
use App\Models\EmailOtp;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class AuthController
{
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'ho_ten' => 'required|string|max:100',
            'email' => 'required|email|max:100|unique:user,email',
            'so_dien_thoai' => 'required|string|max:20|unique:user,so_dien_thoai',
            'mat_khau' => 'required|string|min:6',
            'vai_tro' => 'required|string|in:KHACH_HANG,CHU_TRO',
            'avatar_url' => 'nullable|string|max:255',
        ], [
            'ho_ten.required' => 'Họ tên không được để trống',
            'email.required' => 'Email không được để trống',
            'email.email' => 'Email không hợp lệ',
            'email.unique' => 'Email này đã được sử dụng',
            'so_dien_thoai.required' => 'Số điện thoại không được để trống',
            'so_dien_thoai.unique' => 'Số điện thoại này đã được sử dụng',
            'mat_khau.required' => 'Mật khẩu không được để trống',
            'mat_khau.min' => 'Mật khẩu phải có tối thiểu 6 ký tự',
            'vai_tro.required' => 'Vai trò không được để trống',
            'vai_tro.in' => 'Vai trò đăng ký không hợp lệ',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 0,
                'message' => 'Lỗi xác thực dữ liệu',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::create([
            'ho_ten' => $request->ho_ten,
            'email' => $request->email,
            'so_dien_thoai' => $request->so_dien_thoai,
            'password' => Hash::make($request->mat_khau),
            'avatar_url' => $request->avatar_url,
            'vai_tro' => $request->vai_tro,
            'so_du' => 0,
            'trang_thai' => $request->vai_tro === 'CHU_TRO' ? 'CHO_XAC_THUC' : 'HOAT_DONG',
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => 1,
            'message' => 'Đăng ký tài khoản thành công',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'data' => $user,
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string',
            'mat_khau' => 'required|string',
        ], [
            'email.required' => 'Email hoặc số điện thoại không được để trống',
            'mat_khau.required' => 'Mật khẩu không được để trống',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 0,
                'message' => 'Lỗi xác thực dữ liệu',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Support login by email OR phone number
        $user = User::where('email', $request->email)
            ->orWhere('so_dien_thoai', $request->email)
            ->first();

        if (! $user || ! Hash::check($request->mat_khau, $user->password)) {
            return response()->json([
                'status' => 0,
                'message' => 'Tài khoản hoặc mật khẩu không chính xác',
            ], 401);
        }

        if ($user->trang_thai === 'BI_KHOA') {
            return response()->json([
                'status' => 0,
                'message' => 'Tài khoản này hiện đang bị khóa: '.($user->ly_do_khoa ?? 'Không có lý do cụ thể'),
            ], 403);
        }

        if ($user->trang_thai === 'DA_XOA') {
            return response()->json([
                'status' => 0,
                'message' => 'Tài khoản này đã bị xóa khỏi hệ thống',
            ], 403);
        }

        // Revoke existing tokens for a clean single-device session if preferred
        $user->tokens()->delete();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => 1,
            'message' => 'Đăng nhập thành công',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'data' => $user,
        ], 200);
    }

    public function logout(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user) {
            $user->currentAccessToken()->delete();
        }

        return response()->json([
            'status' => 1,
            'message' => 'Đăng xuất thành công',
        ], 200);
    }

    public function quenMatKhau(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ], [
            'email.required' => 'Email không được để trống',
            'email.email' => 'Email không hợp lệ',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 0,
                'message' => 'Lỗi xác thực dữ liệu',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Validate Captcha optionally if they passed it, matching legacy flow
        if ($request->has('captcha') && $request->filled('captcha')) {
            $verify = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
                'secret' => '6LdZr90sAAAAACLWBxdJQdB_tDynIdbPMxWl7_2T',
                'response' => $request->captcha,
            ]);

            if (! ($verify->json()['success'] ?? false)) {
                return response()->json([
                    'message' => 'Captcha không hợp lệ.',
                    'status' => 0,
                ], 400);
            }
        }

        $user = User::where('email', $request->email)->first();
        if (! $user) {
            return response()->json([
                'message' => 'Không tìm thấy email trong hệ thống.',
                'status' => 0,
            ], 404);
        }

        $otpCode = (string) rand(100000, 999999);

        // Cancel any old active forgot password OTPs
        EmailOtp::where('user_id', $user->id)
            ->where('muc_dich', 'QUEN_MAT_KHAU')
            ->whereNull('da_dung_luc')
            ->update(['het_han_luc' => now()]);

        $data = [];
        $data['ho_va_ten'] = $user->ho_ten;
        $data['ma_bi_mat'] = $otpCode;

        try {
            Mail::to($user->email)->send(new SendMailQuenMK('quenMatKhau', $data));
        } catch (\Exception $e) {
            Log::error('Lỗi gửi mail quên mật khẩu: '.$e->getMessage());

            // Fallback for local testing so they can see the OTP code in response if mail fails
            EmailOtp::create([
                'user_id' => $user->id,
                'ma_xac_nhan_hash' => Hash::make($otpCode),
                'muc_dich' => 'QUEN_MAT_KHAU',
                'ip_tao' => $request->ip(),
                'het_han_luc' => now()->addMinutes(15),
                'so_lan_nhap_sai' => 0,
            ]);

            return response()->json([
                'status' => 1,
                'message' => 'Gửi mail thất bại nhưng mã đã được lưu: '.$otpCode.' (Chỉ dùng cho môi trường Test/Dev)',
                'otp_code_dev' => $otpCode,
            ], 200);
        }

        EmailOtp::create([
            'user_id' => $user->id,
            'ma_xac_nhan_hash' => Hash::make($otpCode),
            'muc_dich' => 'QUEN_MAT_KHAU',
            'ip_tao' => $request->ip(),
            'het_han_luc' => now()->addMinutes(15),
            'so_lan_nhap_sai' => 0,
        ]);

        return response()->json([
            'message' => 'Mã xác nhận đã được gửi đến email của bạn.',
            'status' => 1,
        ], 200);
    }

    public function doiMatKhau(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'ma_bi_mat' => 'required|string',
            'password' => 'required|string|min:6',
        ], [
            'ma_bi_mat.required' => 'Mã xác nhận không được để trống',
            'password.required' => 'Mật khẩu mới không được để trống',
            'password.min' => 'Mật khẩu mới phải có tối thiểu 6 ký tự',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 0,
                'message' => 'Lỗi xác thực dữ liệu',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Find matching active OTP record by checking bcrypt hash of input OTP code
        $activeOtps = EmailOtp::where('muc_dich', 'QUEN_MAT_KHAU')
            ->whereNull('da_dung_luc')
            ->where('het_han_luc', '>', now())
            ->get();

        $matchedOtp = null;
        foreach ($activeOtps as $otpRecord) {
            if (Hash::check($request->ma_bi_mat, $otpRecord->ma_xac_nhan_hash)) {
                $matchedOtp = $otpRecord;
                break;
            }
        }

        if (! $matchedOtp) {
            return response()->json([
                'message' => 'Mã xác nhận không hợp lệ hoặc đã hết hạn.',
                'status' => 0,
            ], 400);
        }

        if ($matchedOtp->so_lan_nhap_sai >= 5) {
            return response()->json([
                'status' => 0,
                'message' => 'Mã OTP này đã bị khóa do nhập sai quá nhiều lần. Vui lòng gửi lại yêu cầu khôi phục mới.',
            ], 400);
        }

        // Update user password
        $user = User::find($matchedOtp->user_id);
        if (! $user) {
            return response()->json([
                'message' => 'Không tìm thấy người dùng sở hữu mã này.',
                'status' => 0,
            ], 404);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        // Mark OTP as used
        $matchedOtp->da_dung_luc = now();
        $matchedOtp->save();

        return response()->json([
            'status' => 1,
            'message' => 'Đổi mật khẩu thành công.',
        ], 200);
    }
}
