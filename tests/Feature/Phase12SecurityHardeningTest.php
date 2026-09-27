<?php

namespace Tests\Feature;

use App\Models\CatalogSource;
use App\Models\Provider;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class Phase12SecurityHardeningTest extends TestCase
{
    use RefreshDatabase;

    public function test_security_headers_are_present_on_api_responses(): void
    {
        $response = $this->getJson('/api/v1/ping');
        $response->assertStatus(200);

        $response->assertHeader('X-Content-Type-Options', 'nosniff');
        $response->assertHeader('X-Frame-Options', 'SAMEORIGIN');
        $response->assertHeader('X-XSS-Protection', '1; mode=block');
        $response->assertHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        $this->assertTrue($response->headers->has('Content-Security-Policy'));
    }

    public function test_sensitive_attributes_are_hidden_in_json_serialization(): void
    {
        $user = User::factory()->create([
            'password' => 'secret_password_123',
            'two_factor_secret' => encrypt('JBSWY3DPEHPK3PXP'),
            'two_factor_recovery_codes' => ['REC-1', 'REC-2'],
            'api_secret' => hash('sha256', 'raw_secret'),
        ]);

        $json = $user->toArray();

        $this->assertArrayNotHasKey('password', $json);
        $this->assertArrayNotHasKey('two_factor_secret', $json);
        $this->assertArrayNotHasKey('two_factor_recovery_codes', $json);
        $this->assertArrayNotHasKey('api_secret', $json);
        $this->assertArrayNotHasKey('remember_token', $json);

        $provider = Provider::create([
            'name' => 'Secure Provider',
            'driver' => 'hala_api',
            'api_key' => 'secret_api_key_123',
            'api_secret' => 'secret_api_secret_456',
            'webhook_secret' => 'secret_wh_789',
            'is_active' => true,
        ]);

        $providerJson = $provider->toArray();
        $this->assertArrayNotHasKey('api_key', $providerJson);
        $this->assertArrayNotHasKey('api_secret', $providerJson);
        $this->assertArrayNotHasKey('webhook_secret', $providerJson);
    }

    public function test_cors_preflight_response_for_allowed_origins(): void
    {
        $response = $this->call(
            'OPTIONS',
            '/api/v1/ping',
            [],
            [],
            [],
            [
                'HTTP_ORIGIN' => 'http://localhost:5173',
                'HTTP_ACCESS_CONTROL_REQUEST_METHOD' => 'GET',
            ]
        );

        $response->assertStatus(204);
        $response->assertHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    }
}
