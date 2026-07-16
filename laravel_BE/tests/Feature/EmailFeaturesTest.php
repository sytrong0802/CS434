<?php

namespace Tests\Feature;

use App\Mail\LichHenMail;
use App\Mail\SendMailQuenMK;
use App\Models\EmailOtp;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class EmailFeaturesTest extends TestCase
{
    use RefreshDatabase;

    public function test_forgot_password_flow(): void
    {
        Mail::fake();

        $user = User::create([
            'ho_ten' => 'Test User',
            'email' => 'testuser@example.com',
            'so_dien_thoai' => '0999999999',
            'password' => Hash::make('secret123'),
            'vai_tro' => 'KHACH_HANG',
            'trang_thai' => 'HOAT_DONG',
        ]);

        // Send forgot password request
        $response = $this->postJson('/api/quen-mat-khau', [
            'email' => 'testuser@example.com',
        ]);

        $response->assertStatus(200);

        // Assert mail was sent and extract the plaintext OTP code
        $sentOtp = null;
        Mail::assertSent(SendMailQuenMK::class, function ($mail) use ($user, &$sentOtp) {
            $sentOtp = $mail->data['ma_bi_mat'];

            return $mail->hasTo($user->email) &&
                   $mail->data['ho_va_ten'] === $user->ho_ten &&
                   ! empty($mail->data['ma_bi_mat']);
        });

        $this->assertNotNull($sentOtp);

        // Assert OTP record was created in the database
        $otpRecord = EmailOtp::where('user_id', $user->id)
            ->where('muc_dich', 'QUEN_MAT_KHAU')
            ->first();
        $this->assertNotNull($otpRecord);
        $this->assertTrue(Hash::check($sentOtp, $otpRecord->ma_xac_nhan_hash));

        // Reset password using the code
        $resetResponse = $this->postJson('/api/doi-mat-khau', [
            'ma_bi_mat' => $sentOtp,
            'password' => 'newpassword123',
        ]);

        $resetResponse->assertStatus(200);

        // Assert password was updated and OTP record is marked as used
        $user->refresh();
        $this->assertTrue(Hash::check('newpassword123', $user->password));

        $otpRecord->refresh();
        $this->assertNotNull($otpRecord->da_dung_luc);
    }

    public function test_booking_viewing_sends_email(): void
    {
        Mail::fake();

        // Create tenant user
        $tenant = User::create([
            'ho_ten' => 'Tenant User',
            'email' => 'tenant@example.com',
            'so_dien_thoai' => '0988888888',
            'password' => Hash::make('secret123'),
            'vai_tro' => 'KHACH_HANG',
            'trang_thai' => 'HOAT_DONG',
        ]);

        // Create landlord user
        $landlord = User::create([
            'ho_ten' => 'Landlord User',
            'email' => 'landlord@example.com',
            'so_dien_thoai' => '0977777777',
            'password' => Hash::make('secret123'),
            'vai_tro' => 'CHU_TRO',
            'trang_thai' => 'HOAT_DONG',
        ]);

        // Create administrative divisions to satisfy foreign key constraints
        DB::table('tinh_thanh')->insert(['id' => '1', 'ten_tinh' => 'Test Province']);
        DB::table('quan_huyen')->insert(['id' => '1', 'tinh_thanh_id' => '1', 'ten_quan' => 'Test District']);
        DB::table('phuong_xa')->insert(['id' => '1', 'quan_huyen_id' => '1', 'ten_xa' => 'Test Ward']);

        // Create property (using raw insert to bypass foreign key constraint details)
        $nhaTroId = 999;
        DB::table('nha_tro')->insert([
            'id' => $nhaTroId,
            'chu_tro_id' => $landlord->id,
            'ten_nha_tro' => 'Test Property',
            'dia_chi_chi_tiet' => '123 Test St',
            'phuong_xa_id' => '1',
            'quan_huyen_id' => '1',
            'tinh_thanh_id' => '1',
        ]);

        // Create active TinDang
        $tinDangId = 999;
        DB::table('tin_dang')->insert([
            'id' => $tinDangId,
            'chu_tro_id' => $landlord->id,
            'tieu_de' => 'Test Ad',
            'dia_chi_chi_tiet' => '123 Test St',
            'phuong_xa_id' => '1',
            'quan_huyen_id' => '1',
            'tinh_thanh_id' => '1',
            'gia_thue_min' => 2000000,
            'trang_thai' => 'HIEN_THI',
        ]);

        // Create room
        $phongTroId = 999;
        DB::table('phong_tro')->insert([
            'id' => $phongTroId,
            'nha_tro_id' => $nhaTroId,
            'tin_dang_id' => $tinDangId,
            'ten_phong' => 'Room 999',
            'gia_thue' => 2200000,
        ]);

        // Book viewing
        $response = $this->actingAs($tenant)->postJson('/api/lich-hen-xem-phong', [
            'tin_dang_id' => $tinDangId,
            'phong_tro_id' => $phongTroId,
            'thoi_gian_hen' => '2026-08-01 10:00:00',
            'loi_nhan' => 'Hello, I want to rent this room.',
        ]);

        $response->assertStatus(200);

        // Assert mail was sent to landlord
        Mail::assertSent(LichHenMail::class, function ($mail) use ($landlord) {
            return $mail->hasTo($landlord->email) &&
                   $mail->lichHen->khachHang->ho_ten === 'Tenant User' &&
                   $mail->lichHen->loi_nhan === 'Hello, I want to rent this room.';
        });
    }
}
