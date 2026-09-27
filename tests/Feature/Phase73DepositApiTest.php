<?php

namespace Tests\Feature;

use App\Enums\DepositStatus;
use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Models\DepositRequest;
use App\Models\Notification;
use App\Models\PaymentMethod;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class Phase73DepositApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_deposit_methods_returns_active_methods(): void
    {
        PaymentMethod::create([
            'name' => 'فودافون كاش',
            'code' => 'vodafone_cash_api_test',
            'type' => 'manual',
            'currency' => 'EGP',
            'min_amount' => 50,
            'max_amount' => 10000,
            'fixed_fee' => 5,
            'percent_fee' => 1,
            'account_details' => ['wallet_number' => '01012345678'],
            'instructions' => ['ar' => 'قم بالتحويل لرقم المحفظة ثم ارفع صورة الإشعار'],
            'is_active' => true,
            'allow_deposit' => true,
            'sort_order' => 1,
        ]);

        $response = $this->getJson('/api/v1/deposits/methods');

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'data' => [
                    [
                        'name' => 'فودافون كاش',
                        'code' => 'vodafone_cash_api_test',
                        'currency' => 'EGP',
                        'min_amount' => 50,
                        'max_amount' => 10000,
                        'account_details' => ['wallet_number' => '01012345678'],
                        'instructions' => 'قم بالتحويل لرقم المحفظة ثم ارفع صورة الإشعار',
                    ],
                ],
            ]);
    }

    public function test_submit_deposit_with_proof_image(): void
    {
        Storage::fake('public');

        $user = User::factory()->create([
            'role' => UserRole::CUSTOMER,
            'status' => UserStatus::ACTIVE,
            'currency' => 'EGP',
        ]);
        Wallet::create(['user_id' => $user->id, 'currency' => 'EGP', 'balance' => 0]);

        $method = PaymentMethod::create([
            'name' => 'انستاباي',
            'code' => 'instapay_deposit_test',
            'type' => 'manual',
            'currency' => 'EGP',
            'min_amount' => 10,
            'max_amount' => 50000,
            'fixed_fee' => 0,
            'percent_fee' => 0,
            'is_active' => true,
            'allow_deposit' => true,
        ]);

        $image = UploadedFile::fake()->image('receipt.jpg', 600, 600);

        $response = $this->actingAs($user, 'sanctum')->postJson('/api/v1/deposits', [
            'payment_method_id' => $method->id,
            'amount' => 500,
            'sender_account' => 'instapay@user',
            'transaction_reference' => 'INSTA987654',
            'proof_image' => $image,
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'status' => 'success',
                'data' => [
                    'amount' => 500,
                    'currency' => 'EGP',
                    'status' => 'pending',
                    'status_label' => 'قيد الانتظار',
                    'sender_account' => 'instapay@user',
                    'transaction_reference' => 'INSTA987654',
                ],
            ]);

        $deposit = DepositRequest::where('user_id', $user->id)->first();
        $this->assertNotNull($deposit);
        $this->assertEquals(500, $deposit->amount);
        $this->assertNotNull($deposit->proof_image);
        Storage::disk('public')->assertExists($deposit->proof_image);
    }

    public function test_submit_deposit_validation_errors_in_arabic(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::CUSTOMER,
            'status' => UserStatus::ACTIVE,
        ]);

        $response = $this->actingAs($user, 'sanctum')->postJson('/api/v1/deposits', [
            'payment_method_id' => 999999, // non-existent
            'amount' => 0, // below min
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['payment_method_id', 'amount']);

        $errors = $response->json('errors');
        $this->assertContains('طريقة الدفع المحددة غير صالحة.', $errors['payment_method_id']);
        $this->assertContains('يجب أن يكون مبلغ الإيداع 1 على الأقل.', $errors['amount']);
    }

    public function test_list_and_show_user_deposits(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::CUSTOMER,
            'status' => UserStatus::ACTIVE,
            'currency' => 'EGP',
        ]);

        $method = PaymentMethod::create([
            'name' => 'بنك مصر',
            'code' => 'banque_misr_test',
            'type' => 'manual',
            'currency' => 'EGP',
            'min_amount' => 100,
            'max_amount' => 100000,
            'is_active' => true,
            'allow_deposit' => true,
        ]);

        $deposit = DepositRequest::create([
            'user_id' => $user->id,
            'payment_method_id' => $method->id,
            'amount' => 2000,
            'currency' => 'EGP',
            'status' => DepositStatus::PENDING,
            'sender_account' => 'ACC123456789',
        ]);

        // Test list
        $listResponse = $this->actingAs($user, 'sanctum')->getJson('/api/v1/deposits');
        $listResponse->assertStatus(200)
            ->assertJsonStructure(['status', 'data' => [['id', 'amount', 'currency', 'status']], 'pagination']);
        $this->assertCount(1, $listResponse->json('data'));

        // Test show single deposit
        $showResponse = $this->actingAs($user, 'sanctum')->getJson("/api/v1/deposits/{$deposit->id}");
        $showResponse->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'data' => [
                    'id' => $deposit->id,
                    'amount' => 2000,
                    'currency' => 'EGP',
                    'status' => 'pending',
                ],
            ]);
    }

    public function test_admin_approval_credits_wallet_and_dispatches_events(): void
    {
        $admin = User::factory()->create([
            'role' => UserRole::ADMIN,
            'status' => UserStatus::ACTIVE,
        ]);

        $user = User::factory()->create([
            'role' => UserRole::CUSTOMER,
            'status' => UserStatus::ACTIVE,
            'currency' => 'EGP',
        ]);
        $wallet = Wallet::create(['user_id' => $user->id, 'currency' => 'EGP', 'balance' => 100]);

        $method = PaymentMethod::create([
            'name' => 'تحويل بنكي',
            'code' => 'bank_transfer_full_test',
            'type' => 'manual',
            'currency' => 'EGP',
            'min_amount' => 50,
            'max_amount' => 50000,
            'is_active' => true,
            'allow_deposit' => true,
        ]);

        $deposit = DepositRequest::create([
            'user_id' => $user->id,
            'payment_method_id' => $method->id,
            'amount' => 1000,
            'currency' => 'EGP',
            'status' => DepositStatus::PENDING,
        ]);

        // Admin approves
        $this->actingAs($admin)
            ->post("/admin/deposits/{$deposit->id}/approve");

        $deposit->refresh();
        $this->assertEquals(DepositStatus::APPROVED, $deposit->status);

        // Wallet balance checked via API
        $balanceRes = $this->actingAs($user, 'sanctum')->getJson('/api/v1/wallet/balance');
        $balanceRes->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'data' => [
                    'balance' => 1100,
                ],
            ]);
    }
}
