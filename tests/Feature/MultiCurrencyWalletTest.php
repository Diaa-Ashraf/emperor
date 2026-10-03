<?php

namespace Tests\Feature;

use App\Models\ExchangeRate;
use App\Models\User;
use App\Services\ExchangeRateService;
use App\Services\MultiCurrencyWalletService;
use App\Services\WalletService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MultiCurrencyWalletTest extends TestCase
{
    use RefreshDatabase;

    public function test_exchange_rate_service_seeds_and_calculates_conversion(): void
    {
        $service = app(ExchangeRateService::class);
        $service->seedDefaultRates();

        $rates = $service->getActiveRates();
        $this->assertGreaterThan(0, $rates->count());

        // 100 USD to EGP @ 50.00 rate
        $preview = $service->calculateConversion('USD', 'EGP', 100);
        $this->assertEquals(5000.0, $preview['final_amount']);
    }

    public function test_multi_currency_wallet_converts_user_balance(): void
    {
        $walletService = app(WalletService::class);
        $multiService = app(MultiCurrencyWalletService::class);
        app(ExchangeRateService::class)->seedDefaultRates();

        $user = User::factory()->create(['currency' => 'EGP']);

        // Give user 1000 EGP
        $walletService->credit($user, 1000.0, \App\Enums\WalletTxType::DEPOSIT, 'Initial Deposit', 'EGP');

        // Convert 500 EGP to USD (500 EGP * 0.02 = 10 USD)
        $result = $multiService->convertCurrency($user, 'EGP', 'USD', 500.0);

        $this->assertTrue($result['success']);
        $this->assertEquals(10.0, $result['received_amount']);

        // Check balances
        $wallets = $multiService->getUserWallets($user);
        $egpWallet = collect($wallets)->firstWhere('currency', 'EGP');
        $usdWallet = collect($wallets)->firstWhere('currency', 'USD');

        $this->assertEquals(500.0, $egpWallet['balance']);
        $this->assertEquals(10.0, $usdWallet['balance']);
    }

    public function test_api_wallet_conversion_endpoint(): void
    {
        $walletService = app(WalletService::class);
        app(ExchangeRateService::class)->seedDefaultRates();

        $user = User::factory()->create(['currency' => 'EGP']);
        $walletService->credit($user, 1000.0, \App\Enums\WalletTxType::DEPOSIT, 'Initial Deposit', 'EGP');

        $response = $this->actingAs($user, 'sanctum')->postJson('/api/v1/wallet/convert', [
            'from_currency' => 'EGP',
            'to_currency' => 'USD',
            'amount' => 500,
        ]);

        $response->assertStatus(200);
        $response->assertJsonPath('status', 'success');
        $response->assertJsonPath('data.received_amount', 10);
    }
}
