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
}
