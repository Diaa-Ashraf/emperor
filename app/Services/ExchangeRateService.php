<?php

namespace App\Services;

use App\Models\ExchangeRate;
use App\Models\User;
use Illuminate\Support\Collection;
use InvalidArgumentException;

class ExchangeRateService
{
    /**
     * Get all active exchange rates.
     */
    public function getActiveRates(): Collection
    {
        return ExchangeRate::where('is_active', true)->get();
    }

    /**
     * Get specific rate between two currencies.
     */
    public function getRate(string $fromCurrency, string $toCurrency): ?ExchangeRate
    {
        $from = strtoupper(trim($fromCurrency));
        $to = strtoupper(trim($toCurrency));

        if ($from === $to) {
            return null;
        }

        return ExchangeRate::where('from_currency', $from)
            ->where('to_currency', $to)
            ->where('is_active', true)
            ->first();
    }

    /**
     * Calculate conversion preview.
     */
    public function calculateConversion(string $fromCurrency, string $toCurrency, float $amount): array
    {
        $from = strtoupper(trim($fromCurrency));
        $to = strtoupper(trim($toCurrency));

        if ($amount <= 0) {
            throw new InvalidArgumentException('المبلغ يجب أن يكون أكبر من الصفر.');
        }

        if ($from === $to) {
            return [
                'from_currency' => $from,
                'to_currency' => $to,
                'source_amount' => $amount,
                'rate' => 1.0,
                'fee_percent' => 0.0,
                'fee_amount' => 0.0,
                'converted_amount' => $amount,
                'final_amount' => $amount,
            ];
        }

        $exchangeRate = $this->getRate($from, $to);

        if (!$exchangeRate) {
            // Check reverse rate
            $reverseRate = $this->getRate($to, $from);
            if ($reverseRate && (float) $reverseRate->rate > 0) {
                $rate = round(1 / (float) $reverseRate->rate, 6);
                $feePercent = (float) $reverseRate->conversion_fee_percent;
            } else {
                throw new \RuntimeException("سعر التحويل بين {$from} و {$to} غير متاح حالياً.");
            }
        } else {
            $rate = (float) $exchangeRate->rate;
            $feePercent = (float) $exchangeRate->conversion_fee_percent;
        }

        $converted = round($amount * $rate, 4);
        $feeAmount = round($converted * ($feePercent / 100), 4);
        $finalAmount = round($converted - $feeAmount, 4);

        return [
            'from_currency' => $from,
            'to_currency' => $to,
            'source_amount' => $amount,
            'rate' => $rate,
            'fee_percent' => $feePercent,
            'fee_amount' => $feeAmount,
            'converted_amount' => $converted,
            'final_amount' => $finalAmount,
        ];
    }

    /**
     * Set or update manual fixed rate by admin.
     */
    public function setRate(
        string $fromCurrency,
        string $toCurrency,
        float $rate,
        float $feePercent = 0.0,
        bool $isActive = true,
        ?User $admin = null
    ): ExchangeRate {
        if ($rate <= 0) {
            throw new InvalidArgumentException('سعر الصرف يجب أن يكون أكبر من الصفر.');
        }

        return ExchangeRate::updateOrCreate(
            [
                'from_currency' => strtoupper(trim($fromCurrency)),
                'to_currency' => strtoupper(trim($toCurrency)),
            ],
            [
                'rate' => $rate,
                'conversion_fee_percent' => $feePercent,
                'is_active' => $isActive,
                'updated_by' => $admin?->id,
            ]
        );
    }

    /**
     * Seed initial default exchange rates if empty.
     */
    public function seedDefaultRates(): void
    {
        $defaults = [
            ['from' => 'USD', 'to' => 'EGP', 'rate' => 50.00, 'fee' => 0.0],
            ['from' => 'EGP', 'to' => 'USD', 'rate' => 0.02, 'fee' => 0.0],
            ['from' => 'SAR', 'to' => 'EGP', 'rate' => 13.33, 'fee' => 0.0],
            ['from' => 'EGP', 'to' => 'SAR', 'rate' => 0.075, 'fee' => 0.0],
            ['from' => 'USD', 'to' => 'SAR', 'rate' => 3.75, 'fee' => 0.0],
            ['from' => 'SAR', 'to' => 'USD', 'rate' => 0.2667, 'fee' => 0.0],
        ];

        foreach ($defaults as $pair) {
            ExchangeRate::firstOrCreate(
                ['from_currency' => $pair['from'], 'to_currency' => $pair['to']],
                ['rate' => $pair['rate'], 'conversion_fee_percent' => $pair['fee'], 'is_active' => true]
            );
        }
    }
}
