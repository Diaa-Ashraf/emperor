<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Update Yoho / Voice Coin tiers with accurate Embrator unit cost and 4% margin
        $yohoProducts = DB::table('products')
            ->where('name', 'like', '%يوهو%')
            ->orWhere('name', 'like', '%yoho%')
            ->orWhere('name', 'like', '%ياهو%')
            ->pluck('id');

        if ($yohoProducts->isNotEmpty()) {
            DB::table('product_tiers')
                ->whereIn('product_id', $yohoProducts)
                ->update([
                    'source_cost' => 0.000100141978,
                    'cost_currency' => 'USD',
                    'margin_percent' => 4.00,
                    'final_price' => 0.000104147657,
                    'sale_price' => 0.000104147657,
                    'min_qty' => 1000,
                    'max_qty' => 5000000,
                ]);
        }

        // 2. Fix any remaining tiers where final_price is 0 but source_cost exists
        DB::statement("
            UPDATE product_tiers 
            SET final_price = source_cost * 1.04,
                sale_price = source_cost * 1.04
            WHERE (final_price IS NULL OR final_price <= 0) AND source_cost > 0
        ");

        // 3. Clear cache so all clients receive updated pricing immediately
        try {
            Cache::flush();
        } catch (\Throwable $e) {
            // Ignore if cache driver doesn't support flush
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No reverse needed
    }
};
