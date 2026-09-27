<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class Phase71ProfileApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_complete_profile_with_valid_data(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::CUSTOMER,
            'status' => UserStatus::ACTIVE,
            'phone' => null,
            'currency' => 'EGP',
        ]);

        $response = $this->actingAs($user, 'sanctum')->putJson('/api/v1/profile/complete', [
            'phone' => '+201099887766',
            'country' => 'EG',
            'currency' => 'SAR',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'message' => 'تم إكمال بيانات الحساب بنجاح',
                'data' => [
                    'id' => $user->id,
                    'phone' => '+201099887766',
                    'country' => 'EG',
                    'currency' => 'SAR',
                ],
            ]);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'phone' => '+201099887766',
            'country' => 'EG',
            'currency' => 'SAR',
        ]);

        // Verify SAR wallet was created
        $this->assertDatabaseHas('wallets', [
            'user_id' => $user->id,
            'currency' => 'SAR',
        ]);
    }

    public function test_complete_profile_validation_errors_in_arabic(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::CUSTOMER,
            'status' => UserStatus::ACTIVE,
        ]);

        $response = $this->actingAs($user, 'sanctum')->putJson('/api/v1/profile/complete', [
            'phone' => '',
            'country' => '',
            'currency' => 'INVALID_CURRENCY',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['phone', 'country', 'currency']);

        $errors = $response->json('errors');
        $this->assertContains('يرجى إدخال رقم الهاتف.', $errors['phone']);
        $this->assertContains('يرجى تحديد الدولة.', $errors['country']);
        $this->assertContains('العملة المحددة غير مدعومة.', $errors['currency']);
    }

    public function test_complete_profile_links_referral_code(): void
    {
        $referrer = User::factory()->create([
            'role' => UserRole::CUSTOMER,
            'status' => UserStatus::ACTIVE,
            'referral_code' => 'REFTEST123',
        ]);

        $user = User::factory()->create([
            'role' => UserRole::CUSTOMER,
            'status' => UserStatus::ACTIVE,
            'referrer_id' => null,
        ]);

        $response = $this->actingAs($user, 'sanctum')->putJson('/api/v1/profile/complete', [
            'phone' => '+201155443322',
            'country' => 'EG',
            'currency' => 'EGP',
            'invite_code' => 'REFTEST123',
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'referrer_id' => $referrer->id,
        ]);
    }

    public function test_update_profile_updates_name_phone_country_and_uploads_avatar(): void
    {
        Storage::fake('public');

        $user = User::factory()->create([
            'role' => UserRole::CUSTOMER,
            'status' => UserStatus::ACTIVE,
            'name' => 'Original Name',
            'phone' => '+201011111111',
            'country' => 'EG',
        ]);

        $avatar = UploadedFile::fake()->image('my_avatar.png', 200, 200);

        $response = $this->actingAs($user, 'sanctum')->postJson('/api/v1/profile', [
            'name' => 'Updated Emperor User',
            'phone' => '+201022222222',
            'country' => 'SA',
            'avatar' => $avatar,
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'message' => 'تم تحديث البيانات بنجاح',
                'data' => [
                    'name' => 'Updated Emperor User',
                    'phone' => '+201022222222',
                    'country' => 'SA',
                ],
            ]);

        $user->refresh();
        $this->assertEquals('Updated Emperor User', $user->name);
        $this->assertEquals('+201022222222', $user->phone);
        $this->assertEquals('SA', $user->country);
        $this->assertNotNull($user->avatar);
        Storage::disk('public')->assertExists($user->avatar);
    }

    public function test_get_profile_returns_complete_data(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::CUSTOMER,
            'status' => UserStatus::ACTIVE,
            'name' => 'Diaa Customer',
            'phone' => '+201033333333',
            'country' => 'EG',
            'currency' => 'EGP',
        ]);
        Wallet::create(['user_id' => $user->id, 'currency' => 'EGP', 'balance' => 750]);

        $response = $this->actingAs($user, 'sanctum')->getJson('/api/v1/profile');

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'data' => [
                    'id' => $user->id,
                    'name' => 'Diaa Customer',
                    'email' => $user->email,
                    'phone' => '+201033333333',
                    'country' => 'EG',
                    'currency' => 'EGP',
                    'role' => 'customer',
                    'role_label' => 'عميل',
                    'wallet' => [
                        'currency' => 'EGP',
                        'balance' => 750,
                    ],
                ],
            ]);
    }
}
