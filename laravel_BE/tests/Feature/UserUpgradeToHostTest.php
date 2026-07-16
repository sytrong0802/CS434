<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UserUpgradeToHostTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_upgrade_to_host(): void
    {
        $response = $this->postJson('/api/user/upgrade-to-host');

        $response->assertStatus(401);
    }

    public function test_customer_can_upgrade_to_host_successfully(): void
    {
        $user = User::create([
            'ho_ten' => 'Test Customer',
            'email' => 'customer@example.com',
            'so_dien_thoai' => '0999999999',
            'password' => bcrypt('password'),
            'vai_tro' => 'KHACH_HANG',
            'trang_thai' => 'HOAT_DONG',
        ]);

        Sanctum::actingAs($user);

        $response = $this->postJson('/api/user/upgrade-to-host');

        $response->assertStatus(200)
            ->assertJson([
                'status' => 1,
                'message' => 'Nâng cấp tài khoản thành chủ trọ thành công!',
            ]);

        $this->assertEquals('CHU_TRO', $user->fresh()->vai_tro);
        $this->assertEquals('HOAT_DONG', $user->fresh()->trang_thai);
    }

    public function test_host_cannot_upgrade_to_host_again(): void
    {
        $user = User::create([
            'ho_ten' => 'Test Host',
            'email' => 'host@example.com',
            'so_dien_thoai' => '0888888888',
            'password' => bcrypt('password'),
            'vai_tro' => 'CHU_TRO',
            'trang_thai' => 'HOAT_DONG',
        ]);

        Sanctum::actingAs($user);

        $response = $this->postJson('/api/user/upgrade-to-host');

        $response->assertStatus(400)
            ->assertJson([
                'status' => 0,
                'message' => 'Tài khoản của bạn đã là chủ trọ',
            ]);
    }

    public function test_admin_cannot_upgrade_to_host(): void
    {
        $user = User::create([
            'ho_ten' => 'Test Admin',
            'email' => 'admin@example.com',
            'so_dien_thoai' => '0777777777',
            'password' => bcrypt('password'),
            'vai_tro' => 'ADMIN',
            'trang_thai' => 'HOAT_DONG',
        ]);

        Sanctum::actingAs($user);

        $response = $this->postJson('/api/user/upgrade-to-host');

        $response->assertStatus(400)
            ->assertJson([
                'status' => 0,
                'message' => 'Tài khoản Admin không cần nâng cấp',
            ]);
    }
}
