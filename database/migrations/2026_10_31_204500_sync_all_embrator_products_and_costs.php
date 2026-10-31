<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        try {
            $service = app(\App\Services\EmbratorService::class);
            $res = $service->getProducts();
            $embratorProducts = $res['products'] ?? [];

            if (empty($embratorProducts)) {
                return;
            }

            $embratorById = [];
            $embratorByName = [];
            foreach ($embratorProducts as $ep) {
                $embratorById[(string) $ep['id']] = $ep;
                $cleanName = mb_strtolower(trim(preg_replace('/\s+/', ' ', $ep['name'])));
                $embratorByName[$cleanName] = $ep;
            }

            $allProducts = DB::table('products')->get();

            foreach ($allProducts as $p) {
                $tiers = DB::table('product_tiers')->where('product_id', $p->id)->get();
                $matchedEp = null;

                // 1. Try matching by provider_product_id or external_product_id
                foreach ($tiers as $t) {
                    $meta = json_decode($t->metadata ?? '{}', true) ?: [];
                    $provId = (string) ($meta['provider_product_id'] ?? $p->external_product_id ?? '');
                    if ($provId && isset($embratorById[$provId])) {
                        $matchedEp = $embratorById[$provId];
                        break;
                    }
                }

                // 2. Try matching by name
                if (!$matchedEp) {
                    $cleanProdName = mb_strtolower(trim(preg_replace('/\s+/', ' ', $p->name)));
                    foreach ($embratorByName as $eName => $ep) {
                        if (str_contains($eName, $cleanProdName) || str_contains($cleanProdName, $eName)) {
                            $matchedEp = $ep;
                            break;
                        }
                    }
                }

                // 3. Fallback name aliases
                if (!$matchedEp) {
                    $prodName = mb_strtolower(trim($p->name));
                    if (str_contains($prodName, 'يوهو') || str_contains($prodName, 'yoho') || str_contains($prodName, 'ياهو')) {
                        $matchedEp = $embratorById['6ad81ae0b1bf9e7679dc76a8'] ?? null;
                    } elseif (str_contains($prodName, 'زافا') || str_contains($prodName, 'زفا')) {
                        $matchedEp = $embratorById['6ad5c79cfbae2f7d5be3b972'] ?? null;
                    } elseif (str_contains($prodName, 'روكا')) {
                        $matchedEp = $embratorById['6addf71e4e98fbbffa86157b'] ?? null;
                    } elseif (str_contains($prodName, 'كارك')) {
                        $matchedEp = $embratorById['6ae5854027ea1904bdb46f3c'] ?? null;
                    } elseif (str_contains($prodName, 'جانكو')) {
                        $matchedEp = $embratorById['6ae58b0027ea1904bdb473d1'] ?? null;
                    }
                }

                if ($matchedEp) {
                    $rawCost = (float) ($matchedEp['priceUsd'] ?? $matchedEp['price'] ?? 0);
                    $markupPrice = $rawCost * 1.04; // 4% default margin
                    $minQty = (int) ($matchedEp['minQty'] ?? 1);
                    $maxQty = (int) ($matchedEp['maxQty'] ?? 10000000);

                    // Update product external_product_id
                    DB::table('products')->where('id', $p->id)->update([
                        'external_product_id' => (string) $matchedEp['id'],
                    ]);

                    // Update tiers
                    foreach ($tiers as $t) {
                        $meta = json_decode($t->metadata ?? '{}', true) ?: [];
                        $meta['provider_id'] = 1;
                        $meta['provider_name'] = 'منصة إمبراطور (Embrator Store)';
                        $meta['provider_product_id'] = (string) $matchedEp['id'];
                        $meta['provider_product_name'] = $matchedEp['name'];
                        $meta['sync_pricing'] = true;
                        $meta['auto_fulfill'] = true;

                        DB::table('product_tiers')->where('id', $t->id)->update([
                            'source_cost' => $rawCost,
                            'cost_currency' => 'USD',
                            'margin_percent' => 4.00,
                            'final_price' => $markupPrice,
                            'sale_price' => $markupPrice,
                            'min_qty' => $minQty,
                            'max_qty' => $maxQty,
                            'metadata' => json_encode($meta, JSON_UNESCAPED_UNICODE),
                        ]);
                    }
                }
            }

            Cache::flush();
        } catch (\Throwable $e) {
            Log::error('Error in sync_all_embrator_products migration: ' . $e->getMessage());
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

