<?php

namespace Database\Seeders;

use App\Models\ExchangeRate;
use Illuminate\Database\Seeder;

class ExchangeRateSeeder extends Seeder
{
    public function run(): void
    {
        $rates = [
            [
                'from_currency' => 'USD',
                'to_currency' => 'EGP',
                'rate' => 50.000000,
                'conversion_fee_percent' => 0.00,
                'is_active' => true,
            ],
            [
                'from_currency' => 'EGP',
                'to_currency' => 'USD',
                'rate' => 0.020000,
                'conversion_fee_percent' => 0.00,
                'is_active' => true,
            ],
            [
                'from_currency' => 'SAR',
                'to_currency' => 'EGP',
                'rate' => 13.330000,
                'conversion_fee_percent' => 0.00,
                'is_active' => true,
            ],
            [
                'from_currency' => 'EGP',
                'to_currency' => 'SAR',
                'rate' => 0.075000,
                'conversion_fee_percent' => 0.00,
                'is_active' => true,
            ],
            [
                'from_currency' => 'USD',
                'to_currency' => 'SAR',
                'rate' => 3.750000,
                'conversion_fee_percent' => 0.00,
                'is_active' => true,
            ],
            [
                'from_currency' => 'SAR',
                'to_currency' => 'USD',
                'rate' => 0.266700,
                'conversion_fee_percent' => 0.00,
                'is_active' => true,
            ],
            [
                'from_currency' => 'AED',
                'to_currency' => 'EGP',
                'rate' => 13.620000,
                'conversion_fee_percent' => 0.00,
                'is_active' => true,
            ],
            [
                'from_currency' => 'JOD',
                'to_currency' => 'EGP',
                'rate' => 70.500000,
                'conversion_fee_percent' => 0.00,
                'is_active' => true,
            ],
        ];

        foreach ($rates as $rateData) {
            ExchangeRate::updateOrCreate(
                [
                    'from_currency' => $rateData['from_currency'],
                    'to_currency' => $rateData['to_currency'],
                ],
                $rateData
            );
        }
    }
}

