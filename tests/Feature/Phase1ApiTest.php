<?php

namespace Tests\Feature;

use App\Enums\DepositStatus;
use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Models\DepositRequest;
use App\Models\PaymentMethod;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

use Illuminate\Foundation\Testing\RefreshDatabase;

class Phase1ApiTest extends TestCase
{
    use RefreshDatabase;
    public function test_ping_endpoint(): void
    {
        $response = $this->getJson('/api/v1/ping');

        $response->assertStatus(200)
            ->assertJson(['status' => 'success', 'message' => 'Emperor API is live and healthy']);
    }

    public function test_public_settings_and_deposit_methods(): void
    {
        PaymentMethod::firstOrCreate(
            ['code' => 'instapay_eg'],
            [
                'name' => 'InstaPay انستاباي',
                'type' => 'manual',
                'currency' => 'EGP',
                'min_amount' => 50,
                'max_amount' => 50000,
                'fixed_fee' => 0,
                'percentage_fee' => 0,
                'account_details' => ['username' => 'emperor@instapay'],
                'is_active' => true,
                'allow_deposit' => true,
                'allow_withdrawal' => false,
            ]
        );

        $response = $this->getJson('/api/v1/deposits/methods');

        $response->assertStatus(200)
            ->assertJsonStructure(['status', 'data' => [['id', 'name', 'code', 'min_amount']]]);
    }

    public function test_customer_registration(): void
    {
        $email = 'new_customer_' . uniqid() . '@emperor.com';
        $phone = '+2010' . rand(10000000, 99999999);

        $response = $this->postJson('/api/v1/auth/register', [
            'name' => 'عميل تجريبي',
            'email' => $email,
            'phone' => $phone,
            'password' => 'Password@123',
            'password_confirmation' => 'Password@123',
            'currency' => 'EGP',
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure(['status', 'data' => ['token', 'user' => ['id', 'name', 'email', 'wallet']]]);

        $this->assertDatabaseHas('users', ['email' => $email]);
        $this->assertDatabaseHas('wallets', ['currency' => 'EGP']);
    }

    public function test_customer_login_and_logout(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::CUSTOMER,
            'status' => UserStatus::ACTIVE,
            'password' => bcrypt('Secret@123'),
        ]);

        $response = $this->postJson('/api/v1/auth/login', [
            'email' => $user->email,
            'password' => 'Secret@123',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure(['status', 'data' => ['token', 'user']]);

        $token = $response->json('data.token');

        $logoutRes = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->postJson('/api/v1/auth/logout');

        $logoutRes->assertStatus(200)
            ->assertJson(['status' => 'success']);
    }

    public function test_arabic_validation_error_responses(): void
    {
        $response = $this->postJson('/api/v1/auth/register', [
            'name' => '',
            'email' => 'invalid-email',
            'password' => '123',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'email', 'password']);
    }

    public function test_customer_profile_and_complete(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::CUSTOMER,
            'status' => UserStatus::ACTIVE,
            'phone' => null,
            'currency' => 'EGP',
        ]);
        Wallet::create(['user_id' => $user->id, 'currency' => 'EGP', 'balance' => 500]);

        $response = $this->actingAs($user, 'sanctum')->getJson('/api/v1/profile');
        $response->assertStatus(200)
            ->assertJson(['status' => 'success', 'data' => ['email' => $user->email]]);

        $newPhone = '+2011' . rand(10000000, 99999999);
        $updateRes = $this->actingAs($user, 'sanctum')->putJson('/api/v1/profile/complete', [
            'phone' => $newPhone,
            'country' => 'EG',
            'currency' => 'USD',
        ]);
        $updateRes->assertStatus(200)
            ->assertJson(['status' => 'success', 'data' => ['phone' => $newPhone, 'currency' => 'USD', 'country' => 'EG']]);
    }

    public function test_two_factor_auth_flow(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::CUSTOMER,
            'status' => UserStatus::ACTIVE,
        ]);

        $enableRes = $this->actingAs($user, 'sanctum')->postJson('/api/v1/profile/2fa/enable');
        $enableRes->assertStatus(200)
            ->assertJsonStructure(['status', 'data' => ['secret', 'qr_code_url']]);

        $secret = $enableRes->json('data.secret');
        $validCode = (new \PragmaRX\Google2FA\Google2FA())->getCurrentOtp($secret);

        $verifyRes = $this->actingAs($user, 'sanctum')->postJson('/api/v1/profile/2fa/verify', [
            'code' => $validCode,
        ]);
        $verifyRes->assertStatus(200)
            ->assertJson(['status' => 'success']);
    }

    public function test_wallet_balance_and_transactions(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::CUSTOMER,
            'status' => UserStatus::ACTIVE,
            'currency' => 'EGP',
        ]);
        Wallet::create(['user_id' => $user->id, 'currency' => 'EGP', 'balance' => 1250]);

        $response = $this->actingAs($user, 'sanctum')->getJson('/api/v1/wallet/balance');
        $response->assertStatus(200)
            ->assertJson(['status' => 'success', 'data' => ['currency' => 'EGP', 'balance' => 1250]]);

        $txRes = $this->actingAs($user, 'sanctum')->getJson('/api/v1/wallet/transactions');
        $txRes->assertStatus(200)
            ->assertJsonStructure(['status', 'data', 'pagination']);
    }

    public function test_submit_and_list_deposit_requests(): void
    {
        Storage::fake('public');

        $user = User::factory()->create([
            'role' => UserRole::CUSTOMER,
            'status' => UserStatus::ACTIVE,
            'currency' => 'EGP',
        ]);
        $method = PaymentMethod::firstOrCreate(
            ['code' => 'instapay_eg'],
            [
                'name' => 'InstaPay انستاباي',
                'type' => 'manual',
                'currency' => 'EGP',
                'min_amount' => 50,
                'max_amount' => 50000,
                'fixed_fee' => 0,
                'percentage_fee' => 0,
                'account_details' => ['username' => 'emperor@instapay'],
                'is_active' => true,
                'allow_deposit' => true,
                'allow_withdrawal' => false,
            ]
        );

        $response = $this->actingAs($user, 'sanctum')->postJson('/api/v1/deposits', [
            'payment_method_id' => $method->id,
            'amount' => 1000,
            'sender_account' => '01012345678',
            'transaction_reference' => 'TX-REF-' . rand(1000, 999999),
            'proof_image' => UploadedFile::fake()->image('receipt.jpg'),
        ]);

        $response->assertStatus(201)
            ->assertJson(['status' => 'success', 'data' => ['amount' => 1000, 'currency' => $method->currency]]);

        $listRes = $this->actingAs($user, 'sanctum')->getJson('/api/v1/deposits');
        $listRes->assertStatus(200)
            ->assertJsonStructure(['status', 'data', 'pagination']);
    }
}
