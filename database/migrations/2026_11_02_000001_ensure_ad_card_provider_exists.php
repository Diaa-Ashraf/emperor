<?php

use App\Models\Provider;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        Provider::updateOrCreate(
            ['driver' => 'ad_card'],
            [
                'name' => 'AD Card',
                'base_url' => config('services.ad_card.base_url') ?: env('AD_CARD_API_BASE_URL', 'https://ad-card.com/client/api'),
                'priority' => 2,
                'balance' => 0.00,
                'balance_currency' => 'USD',
                'is_active' => true,
                'auto_fulfill' => true,
                'config' => [
                    'api_token' => config('services.ad_card.api_token') ?: env('AD_CARD_API_TOKEN', 'f09cf5a673477d6d305577211586555a31614dbf3c8047a865f6197978b423ba'),
                    'base_url' => config('services.ad_card.base_url') ?: env('AD_CARD_API_BASE_URL', 'https://ad-card.com/client/api'),
                ],
            ]
        );
    }

    public function down(): void
    {
        // Keep provider records safe
    }
};
