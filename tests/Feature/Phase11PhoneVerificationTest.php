<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class Phase11PhoneVerificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_verify_phone_number(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::CUSTOMER,
            'status' => UserStatus::ACTIVE,
            'phone' => null,
            'phone_verified_at' => null,
        ]);

        Sanctum::actingAs($user);

        $response = $this->postJson('/api/v1/auth/verify-phone', [
            'phone' => '+201012345678',
            'code' => '123456',
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.phone', '+201012345678');

        $this->assertNotNull($user->fresh()->phone_verified_at);
        $this->assertEquals('+201012345678', $user->fresh()->phone);
    }

    public function test_verify_phone_requires_valid_phone(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/v1/auth/verify-phone', [
            'phone' => '',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['phone']);
    }
}
