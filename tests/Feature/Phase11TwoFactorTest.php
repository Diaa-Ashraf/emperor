<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Wallet;
use App\Services\TwoFactorService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class Phase11TwoFactorTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->artisan('db:seed', ['--class' => 'SettingSeeder'])->run();
    }

    public function test_user_can_initialize_2fa_setup(): void
    {
        $user = User::factory()->create([
            'email' => 'user2fa@emperor.test',
            'password' => Hash::make('password123'),
        ]);
        Wallet::create(['user_id' => $user->id, 'currency' => 'EGP', 'balance' => 0]);

        $response = $this->actingAs($user)->postJson('/api/v1/profile/2fa/enable');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'message',
                'data' => [
                    'secret',
                    'qr_code_url',
                    'qr_code_svg',
                    'recovery_codes',
                ],
            ]);

        $user->refresh();
        $this->assertNotNull($user->two_factor_secret);
        $this->assertCount(8, $user->two_factor_recovery_codes);
        $this->assertNull($user->two_factor_confirmed_at);
    }

    public function test_2fa_verification_with_invalid_code_fails(): void
    {
        $user = User::factory()->create([
            'email' => 'user2fa_invalid@emperor.test',
            'two_factor_secret' => encrypt('JBSWY3DPEHPK3PXP'),
            'two_factor_recovery_codes' => ['REC-11111', 'REC-22222'],
        ]);
        Wallet::create(['user_id' => $user->id, 'currency' => 'EGP', 'balance' => 0]);

        $response = $this->actingAs($user)->postJson('/api/v1/profile/2fa/verify', [
            'code' => '000000',
        ]);

        $response->assertStatus(422)
            ->assertJson([
                'status' => 'error',
            ]);

        $this->assertNull($user->fresh()->two_factor_confirmed_at);
    }

    public function test_2fa_verification_with_valid_totp_activates_2fa(): void
    {
        $twoFactorService = app(TwoFactorService::class);
        $secret = $twoFactorService->generateSecretKey();

        $user = User::factory()->create([
            'email' => 'user2fa_valid@emperor.test',
            'two_factor_secret' => encrypt($secret),
            'two_factor_recovery_codes' => ['REC-11111', 'REC-22222'],
        ]);
        Wallet::create(['user_id' => $user->id, 'currency' => 'EGP', 'balance' => 0]);

        // Generate valid current TOTP code using Google2FA instance
        $google2fa = new \PragmaRX\Google2FA\Google2FA();
        $validCode = $google2fa->getCurrentOtp($secret);

        $response = $this->actingAs($user)->postJson('/api/v1/profile/2fa/verify', [
            'code' => $validCode,
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'data' => [
                    'two_factor_enabled' => true,
                ],
            ]);

        $this->assertNotNull($user->fresh()->two_factor_confirmed_at);
    }

    public function test_user_can_disable_2fa_with_password(): void
    {
        $user = User::factory()->create([
            'email' => 'user2fa_disable@emperor.test',
            'password' => Hash::make('secret_password'),
            'two_factor_secret' => encrypt('SECRETKEY'),
            'two_factor_confirmed_at' => now(),
            'two_factor_recovery_codes' => ['CODE1', 'CODE2'],
        ]);

        // Wrong password fails
        $failResponse = $this->actingAs($user)->postJson('/api/v1/profile/2fa/disable', [
            'password' => 'wrong_pass',
        ]);
        $failResponse->assertStatus(422);

        // Correct password disables 2FA
        $successResponse = $this->actingAs($user)->postJson('/api/v1/profile/2fa/disable', [
            'password' => 'secret_password',
        ]);
        $successResponse->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'data' => [
                    'two_factor_enabled' => false,
                ],
            ]);

        $user->refresh();
        $this->assertNull($user->two_factor_secret);
        $this->assertNull($user->two_factor_confirmed_at);
        $this->assertNull($user->two_factor_recovery_codes);
    }

    public function test_login_requires_2fa_code_when_enabled(): void
    {
        $user = User::factory()->create([
            'email' => 'user_login_2fa@emperor.test',
            'password' => Hash::make('password123'),
            'two_factor_secret' => encrypt('JBSWY3DPEHPK3PXP'),
            'two_factor_confirmed_at' => now(),
            'two_factor_recovery_codes' => ['REC-AAAAA-BBBBB'],
        ]);
        Wallet::create(['user_id' => $user->id, 'currency' => 'EGP', 'balance' => 0]);

        // 1. Regular login without 2FA returns challenge requires_2fa = true
        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'user_login_2fa@emperor.test',
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'data' => [
                    'requires_2fa' => true,
                    'email' => 'user_login_2fa@emperor.test',
                ],
            ]);
        $this->assertArrayNotHasKey('token', $response->json('data'));

        // 2. Login with valid recovery code succeeds and consumes recovery code
        $recLoginResponse = $this->postJson('/api/v1/auth/login/2fa', [
            'email' => 'user_login_2fa@emperor.test',
            'password' => 'password123',
            'recovery_code' => 'REC-AAAAA-BBBBB',
        ]);

        $recLoginResponse->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'data' => [
                    'token',
                    'user',
                ],
            ]);

        // Verify recovery code was consumed
        $user->refresh();
        $this->assertEmpty($user->two_factor_recovery_codes);

        // Attempting to reuse same recovery code fails
        $reuseResponse = $this->postJson('/api/v1/auth/login/2fa', [
            'email' => 'user_login_2fa@emperor.test',
            'password' => 'password123',
            'recovery_code' => 'REC-AAAAA-BBBBB',
        ]);
        $reuseResponse->assertStatus(422);
    }
}
