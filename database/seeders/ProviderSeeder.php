<?php

namespace Database\Seeders;

use App\Models\CatalogSource;
use App\Models\Provider;
use Illuminate\Database\Seeder;

class ProviderSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Providers
        Provider::updateOrCreate(
            ['driver' => 'manual'],
            [
                'name' => 'إمبراطور للشحن الفوري المباشر',
                'priority' => 1,
                'balance' => 0.00,
                'balance_currency' => 'EGP',
                'is_active' => true,
                'auto_fulfill' => true,
            ]
        );

        Provider::updateOrCreate(
            ['driver' => 'ka_cards_api'],
            [
                'name' => 'KA-Cards API Direct',
                'base_url' => 'https://ka-cards.com/api/v1',
                'priority' => 2,
                'balance' => 0.00,
                'balance_currency' => 'USD',
                'is_active' => true,
                'auto_fulfill' => true,
            ]
        );

        Provider::updateOrCreate(
            ['driver' => 'manual_review'],
            [
                'name' => 'Manual Operations Desk',
                'priority' => 3,
                'balance' => 0.00,
                'balance_currency' => 'EGP',
                'is_active' => true,
                'auto_fulfill' => false,
            ]
        );

        // 2. Catalog Sources
        CatalogSource::updateOrCreate(
            ['driver' => 'ka_cards_scraper'],
            [
                'name' => 'KA-Cards Main Source',
                'base_url' => 'https://ka-cards.com',
                'is_active' => true,
                'sync_status' => 'idle',
                'last_synced_at' => null,
            ]
        );
    }
}
