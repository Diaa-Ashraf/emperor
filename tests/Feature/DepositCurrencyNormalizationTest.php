<?php

namespace Tests\Feature;

use App\Models\PaymentMethod;
use App\Models\User;
use App\Services\DepositService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DepositCurrencyNormalizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_egyptian_payment_methods_use_egp_for_customer_and_wallet_records(): void
    {
        $method = PaymentMethod::create([
            'name' => 'Egypt test transfer',
            'code' => 'egypt_test_transfer',
            'currency' => 'EGY',
            'min_amount' => 10,
            'max_amount' => 1000,
            'is_active' => true,
            'allow_deposit' => true,
        ]);

        $this->getJson('/api/v1/deposits/methods')
            ->assertOk()
            ->assertJsonPath('data.0.currency', 'EGP');

        $user = User::factory()->create();
        $reviewer = User::factory()->create();
        $depositService = app(DepositService::class);
        $deposit = $depositService->submitDeposit(
            user: $user,
            method: $method,
            amount: 100,
        );

        $this->assertSame('EGP', $deposit->currency);
        $this->assertDatabaseHas('deposit_requests', [
            'id' => $deposit->id,
            'currency' => 'EGP',
        ]);

        $depositService->approve($deposit, $reviewer);

        $this->assertDatabaseHas('wallets', [
            'user_id' => $user->id,
            'currency' => 'EGP',
            'balance' => 100,
        ]);
        $this->assertDatabaseMissing('wallets', [
            'user_id' => $user->id,
            'currency' => 'EGY',
        ]);
    }
}
