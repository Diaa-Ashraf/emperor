<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Models\ApiClientPrice;
use App\Models\ProductTier;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SampleApiClientSeeder extends Seeder
{
    public function run(): void
    {
        $client = User::updateOrCreate(
            ['email' => 'partner@emperor-api.com'],
            [
                'name' => 'Emperor B2B Distributor (شركة النجم للبطاقات)',
                'phone' => '+201099998888',
                'password' => Hash::make('Password@123456'),
                'role' => UserRole::API_CLIENT,
                'status' => UserStatus::ACTIVE,
                'api_key' => 'emp_demo_key_777',
                'api_secret' => hash('sha256', 'emp_demo_sec_999'),
                'api_ip_whitelist' => null,
                'api_rate_limit' => 120,
                'webhook_url' => 'https://webhook.site/emperor-demo-order-webhook',
                'currency' => 'EGP',
                'email_verified_at' => now(),
            ]
        );

        // Ensure Wallet
        Wallet::updateOrCreate(
            ['user_id' => $client->id],
            [
                'balance' => 5000.00,
                'currency' => 'EGP',
                'is_locked' => false,
            ]
        );

        // Add custom price override for first available tier
        $firstTier = ProductTier::first();
        if ($firstTier) {
            ApiClientPrice::updateOrCreate(
                [
                    'user_id' => $client->id,
                    'product_tier_id' => $firstTier->id,
                ],
                [
                    'custom_price' => round((float) $firstTier->final_price * 0.90, 2), // 10% discount custom override
                    'is_active' => true,
                ]
            );
        }
    }
}
