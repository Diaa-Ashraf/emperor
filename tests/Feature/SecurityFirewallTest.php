<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SecurityFirewallTest extends TestCase
{
    use RefreshDatabase;

    public function test_security_headers_are_attached_to_responses(): void
    {
        $response = $this->get('/');
        $response->assertHeader('X-Content-Type-Options', 'nosniff');
        $response->assertHeader('X-Frame-Options', 'SAMEORIGIN');
        $response->assertHeader('X-XSS-Protection', '1; mode=block');
        $response->assertHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    }

    public function test_auth_login_endpoint_has_strict_rate_limiting(): void
    {
        // Hit /api/v1/auth/login up to limit
        for ($i = 0; $i < 6; $i++) {
            $this->postJson('/api/v1/auth/login', [
                'email' => 'fake_attacker@test.com',
                'password' => 'wrongpass',
            ]);
        }

        // 7th request must be throttled with 429
        $throttledResponse = $this->postJson('/api/v1/auth/login', [
            'email' => 'fake_attacker@test.com',
            'password' => 'wrongpass',
        ]);

        $throttledResponse->assertStatus(429);
        $throttledResponse->assertJsonFragment([
            'status' => 'error',
            'code' => 'AUTH_RATE_LIMIT',
        ]);
    }

    public function test_admin_login_has_brute_force_protection(): void
    {
        for ($i = 0; $i < 5; $i++) {
            $this->post('/admin/login', [
                'email' => 'admin@fake.com',
                'password' => 'wrongpass',
            ]);
        }

        // 6th attempt throttled
        $response = $this->post('/admin/login', [
            'email' => 'admin@fake.com',
            'password' => 'wrongpass',
        ]);

        $response->assertStatus(429);
    }

    public function test_active_authenticated_user_accesses_protected_route(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('test-active', ['*'], now()->addHours(24))->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer '.$token)
            ->getJson('/api/v1/profile');

        $response->assertStatus(200);
        $response->assertJsonPath('status', 'success');
    }

    public function test_idle_token_older_than_2_hours_is_rejected_and_revoked(): void
    {
        $user = User::factory()->create();
        $tokenModel = $user->createToken('test-idle', ['*'], now()->addHours(24));
        $plainToken = $tokenModel->plainTextToken;

        // Simulate token was last used 3 hours ago (idle beyond 120 min)
        $tokenModel->accessToken->forceFill([
            'last_used_at' => now()->subHours(3),
            'created_at' => now()->subHours(4),
        ])->save();

        $response = $this->withHeader('Authorization', 'Bearer '.$plainToken)
            ->getJson('/api/v1/profile');

        $response->assertStatus(401);

        // Token should be revoked from DB
        $this->assertDatabaseMissing('personal_access_tokens', [
            'id' => $tokenModel->accessToken->id,
        ]);
    }

    public function test_expired_token_is_rejected_and_revoked(): void
    {
        $user = User::factory()->create();
        $tokenModel = $user->createToken('test-expired', ['*'], now()->subDays(2));
        $plainToken = $tokenModel->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer '.$plainToken)
            ->getJson('/api/v1/profile');

        $response->assertStatus(401);

        // Token should be revoked from DB
        $this->assertDatabaseMissing('personal_access_tokens', [
            'id' => $tokenModel->accessToken->id,
        ]);
    }
}

