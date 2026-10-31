<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Production-Ready Base Seeder.
     * Seeds essential system tables only (Roles, Admin, Settings, Currencies, Providers, Categories).
     * Zero dummy products or fake orders.
     */
    public function run(): void
    {
        $this->call([
            RolesAndPermissionsSeeder::class,
            AdminUserSeeder::class,
            SettingSeeder::class,
            ExchangeRateSeeder::class,
            ProviderSeeder::class,
            PaymentMethodSeeder::class,
            SupportContactSeeder::class,
            BannerSeeder::class,
        ]);
    }
}
