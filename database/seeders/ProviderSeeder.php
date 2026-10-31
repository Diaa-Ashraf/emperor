<?php

namespace Database\Seeders;

use App\Models\CatalogSource;
use App\Models\Provider;
use Illuminate\Database\Seeder;

class ProviderSeeder extends Seeder
{
    public function run(): void
    {
        // Remove all other providers
        Provider::where('driver', '!=', 'embrator_reseller_api')->delete();
        Provider::where('name', 'Brand one Card')->delete();

        // 1. Only Embrator Store Provider
        Provider::updateOrCreate(
            ['driver' => 'embrator_reseller_api'],
            [
                'name' => 'منصة إمبراطور (Embrator Store)',
                'base_url' => env('EMBRATOR_API_BASE_URL', 'https://embrator.store/api/v1/reseller'),
                'priority' => 1,
                'balance' => 0.00,
                'balance_currency' => 'USD',
                'is_active' => true,
                'auto_fulfill' => true,
                'config' => [
                    'api_key' => env('EMBRATOR_API_KEY', '8a36b758817f8708502c4e16cd3a4b5f9650133a1968961a68b08f6e4544ed8f'),
                    'base_url' => env('EMBRATOR_API_BASE_URL', 'https://embrator.store/api/v1/reseller'),
                ],
            ]
        );
    }
}
