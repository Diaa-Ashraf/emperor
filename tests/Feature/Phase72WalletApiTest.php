<?php

namespace Tests\Feature;

use App\Enums\DepositStatus;
use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Enums\WalletTxType;
use App\Models\DepositRequest;
use App\Models\PaymentMethod;
use App\Models\User;
use App\Models\Wallet;
use App\Models\WalletTransaction;
use App\Services\WalletService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class Phase72WalletApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_wallet_balance_returns_real_balance_and_usd(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::CUSTOMER,
            'status' => UserStatus::ACTIVE,
            'currency' => 'EGP',
        ]);

        $wallet = Wallet::create([
            'user_id' => $user->id,
            'currency' => 'EGP',
            'balance' => 2500.50,
            'frozen_balance' => 100.00,
            'is_locked' => false,
        ]);

        $response = $this->actingAs($user, 'sanctum')->getJson('/api/v1/wallet/balance');

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'data' => [
                    'currency' => 'EGP',
                    'balance' => 2500.50,
                    'balance_usd' => round(2500.50 / 50.0, 2),
                    'frozen_balance' => 100.00,
                    'available_balance' => 2400.50,
                    'is_locked' => false,
                ],
            ]);
    }

    public function test_get_wallet_transactions_paginated(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::CUSTOMER,
            'status' => UserStatus::ACTIVE,
            'currency' => 'EGP',
        ]);

        $wallet = Wallet::create([
            'user_id' => $user->id,
            'currency' => 'EGP',
            'balance' => 1000,
        ]);

        WalletTransaction::create([
            'wallet_id' => $wallet->id,
            'user_id' => $user->id,
            'type' => WalletTxType::DEPOSIT,
            'amount' => 1000,
            'balance_before' => 0,
            'balance_after' => 1000,
            'description' => 'شحن رصيد إيداع بنكي',
            'created_at' => now(),
        ]);

        WalletTransaction::create([
            'wallet_id' => $wallet->id,
            'user_id' => $user->id,
            'type' => WalletTxType::ORDER_PAYMENT,
            'amount' => -250,
            'balance_before' => 1000,
            'balance_after' => 750,
            'description' => 'شراء كروت ببجي',
            'created_at' => now(),
        ]);

        $response = $this->actingAs($user, 'sanctum')->getJson('/api/v1/wallet/transactions');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'data' => [
                    '*' => [
                        'id',
                        'type',
                        'type_label',
                        'amount',
                        'is_credit',
                        'balance_before',
                        'balance_after',
                        'description',
                    ],
                ],
                'pagination' => [
                    'total',
                    'per_page',
                    'current_page',
                    'last_page',
                ],
            ]);

        $this->assertCount(2, $response->json('data'));
    }

    public function test_get_wallet_transactions_filtered_by_type(): void
    {
        $user = User::factory()->create([
            'role' => UserRole::CUSTOMER,
            'status' => UserStatus::ACTIVE,
            'currency' => 'EGP',
        ]);

        $wallet = Wallet::create([
            'user_id' => $user->id,
            'currency' => 'EGP',
            'balance' => 1000,
        ]);

        WalletTransaction::create([
            'wallet_id' => $wallet->id,
            'user_id' => $user->id,
            'type' => WalletTxType::DEPOSIT,
            'amount' => 1000,
            'balance_before' => 0,
            'balance_after' => 1000,
            'description' => 'إيداع',
            'created_at' => now(),
        ]);

        WalletTransaction::create([
            'wallet_id' => $wallet->id,
            'user_id' => $user->id,
            'type' => WalletTxType::ORDER_PAYMENT,
            'amount' => -250,
            'balance_before' => 1000,
            'balance_after' => 750,
            'description' => 'شراء',
            'created_at' => now(),
        ]);

        $response = $this->actingAs($user, 'sanctum')->getJson('/api/v1/wallet/transactions?type=deposit');

        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertCount(1, $data);
        $this->assertEquals('deposit', $data[0]['type']);
        $this->assertEquals('إيداع رصيد', $data[0]['type_label']);
    }

    public function test_balance_updates_after_deposit_approved(): void
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

        $wallet = Wallet::create([
            'user_id' => $user->id,
            'currency' => 'EGP',
            'balance' => 500,
        ]);

        $method = PaymentMethod::create([
            'name' => 'فودافون كاش',
            'code' => 'vodafone_cash_test',
            'type' => 'manual',
            'currency' => 'EGP',
            'min_amount' => 50,
            'max_amount' => 10000,
            'is_active' => true,
            'allow_deposit' => true,
        ]);

        $deposit = DepositRequest::create([
            'user_id' => $user->id,
            'payment_method_id' => $method->id,
            'amount' => 1500,
            'currency' => 'EGP',
            'status' => DepositStatus::PENDING,
            'sender_account' => '01000000000',
            'transaction_reference' => 'TX123456',
        ]);

        // Admin approves deposit
        $this->actingAs($admin)
            ->post("/admin/deposits/{$deposit->id}/approve");

        // Now user checks their balance via API
        $response = $this->actingAs($user, 'sanctum')->getJson('/api/v1/wallet/balance');

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'data' => [
                    'currency' => 'EGP',
                    'balance' => 2000, // 500 initial + 1500 deposit
                ],
            ]);
    }
}
