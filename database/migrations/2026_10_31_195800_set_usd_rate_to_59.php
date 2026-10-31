<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('exchange_rates')->updateOrInsert(
            ['from_currency' => 'USD', 'to_currency' => 'EGP'],
            ['rate' => 59.000000, 'is_active' => true, 'updated_at' => now()]
        );

        DB::table('exchange_rates')->updateOrInsert(
            ['from_currency' => 'EGP', 'to_currency' => 'USD'],
            ['rate' => 0.016949, 'is_active' => true, 'updated_at' => now()]
        );

        try {
            Cache::flush();
        } catch (\Throwable $e) {}
    }

    public function down(): void {}
};

