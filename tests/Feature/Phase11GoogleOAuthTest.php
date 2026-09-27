<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class Phase11GoogleOAuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_google_login_endpoint_creates_new_user_and_wallet(): void
    {
        $payload = [
            'email' => 'google.user@example.com',
            'name' => 'Emperor Google Gamer',
            'google_id' => 'google_1234567890',
        ];

        $response = $this->postJson('/api/v1/auth/login/google', $payload);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'message',
                'data' => [
                    'token',
                    'user' => [
                        'id',
                        'name',
                        'email',
                        'wallet',
                    ],
                    'is_new_user',
                ],
            ]);

        $this->assertDatabaseHas('users', [
            'email' => 'google.user@example.com',
            'google_id' => 'google_1234567890',
            'role' => UserRole::CUSTOMER->value,
            'status' => UserStatus::ACTIVE->value,
        ]);

        $user = User::where('email', 'google.user@example.com')->first();
        $this->assertNotNull($user->wallet);
        $this->assertEquals('EGP', $user->wallet->currency);
    }

    public function test_google_login_endpoint_authenticates_existing_user(): void
    {
        $existing = User::factory()->create([
            'email' => 'existing.google@example.com',
            'name' => 'Existing Player',
            'google_id' => 'google_existing_999',
            'role' => UserRole::CUSTOMER,
            'status' => UserStatus::ACTIVE,
        ]);

        $payload = [
            'email' => 'existing.google@example.com',
            'name' => 'Existing Player',
            'google_id' => 'google_existing_999',
        ];

        $response = $this->postJson('/api/v1/auth/login/google', $payload);

        $response->assertStatus(200)
            ->assertJsonPath('data.is_new_user', false)
            ->assertJsonPath('data.user.email', 'existing.google@example.com');
    }

    public function test_google_login_rejects_banned_user(): void
    {
        User::factory()->create([
            'email' => 'banned@example.com',
            'google_id' => 'google_banned_000',
            'status' => UserStatus::BANNED,
        ]);

        $payload = [
            'email' => 'banned@example.com',
            'google_id' => 'google_banned_000',
        ];

        $response = $this->postJson('/api/v1/auth/login/google', $payload);

        $response->assertStatus(403);
    }
}
