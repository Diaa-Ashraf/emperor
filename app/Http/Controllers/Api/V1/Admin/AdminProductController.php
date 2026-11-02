<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Enums\ProductType;
use App\Enums\CategoryType;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductTier;
use App\Models\Provider;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class AdminProductController extends Controller
{
    use ApiResponse;

    /**
     * Categories list with products count.
     */
    public function categories(): JsonResponse
    {
        $categories = Category::query()
            ->select(['id', 'name', 'slug', 'type', 'icon', 'is_active', 'sort_order'])
            ->withCount('products')
            ->orderBy('sort_order')
            ->get();

        return $this->successResponse($categories, 'تم جلب الأقسام بنجاح');
    }

    /**
     * Products list with categories, tiers, providers, matching Screenshot 2.
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = min((int) ($request->input('per_page', 20)), 100);

        $query = Product::query()
            ->select([
                'id',
                'category_id',
                'parent_id',
                'name',
                'slug',
                'description',
                'image',
                'type',
                'catalog_source_id',
                'external_product_id',
                'player_id_label',
                'is_active',
                'sort_order',
                'created_at',
            ])
            ->with([
                'category:id,name,type,sort_order',
                'tiers',
            ]);

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->input('category_id'));
        }

        if ($request->filled('search')) {
            $search = trim($request->input('search'));
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('id', $search);
            });
        }

        if ($request->filled('is_active')) {
            $query->where('is_active', filter_var($request->input('is_active'), FILTER_VALIDATE_BOOLEAN));
        }

        $products = $query->orderBy('sort_order', 'asc')->latest('id')->paginate($perPage);

        // Transform for Product Card matching Screenshot 2
        $products->getCollection()->transform(function ($p) {
            $firstTier = $p->tiers->first();
            $meta = $firstTier?->metadata ?? [];
            $categoryType = $this->effectiveCategoryType($p->category);
            $effectiveType = match ($categoryType) {
                CategoryType::VOICE_APPS => ProductType::DIRECT_TOPUP,
                CategoryType::CARDS => ProductType::VOUCHER,
                CategoryType::TARGET => ProductType::TARGET,
                CategoryType::TELECOM => ProductType::DIRECT_TOPUP,
                default => $p->type ?? ProductType::PLAYER_ID,
            };
            $requiresPlayerId = array_key_exists('requires_player_id', $meta)
                ? (bool) $meta['requires_player_id']
                : $effectiveType !== ProductType::VOUCHER;
            $providerName = $meta['provider_name'] ?? 'منصة إمبراطور (Embrator Store)';
            $providerProductId = $meta['provider_product_id'] ?? $p->external_product_id ?? null;
            $providerProductName = $meta['provider_product_name'] ?? $p->name;
            $fulfillmentMode = $meta['fulfillment_mode'] ?? 'auto';

            $basePrice = $firstTier ? (float) ($firstTier->source_cost ?: $firstTier->final_price) : 0;
            $finalPrice = $firstTier ? (float) $firstTier->final_price : 0;

            return [
                'id' => $p->id,
                'name' => $p->name,
                'slug' => $p->slug,
                'description' => $p->description,
                'image' => $p->image_url ?: $p->image,
                'type' => $effectiveType->value,
                'requires_player_id' => $requiresPlayerId,
                'category_id' => $p->category_id,
                'category_name' => $p->category ? $p->category->name : 'قسم شحن التطبيقات',
                'provider_id' => $meta['provider_id'] ?? null,
                'provider_name' => $providerName,
                'provider_product_id' => $providerProductId,
                'provider_product_name' => $providerProductName,
                'fulfillment_mode' => $fulfillmentMode,
                'sort_order' => $p->sort_order ?: 1,
                'base_price' => $basePrice,
                'base_price_formatted' => number_format($basePrice, 8) . ' دولار',
                'final_price' => $finalPrice,
                'final_price_formatted' => number_format($finalPrice, 8) . ' دولار',
                'min_qty' => $firstTier ? $firstTier->min_qty : 1,
                'max_qty' => $firstTier ? $firstTier->max_qty : 10000000,
                'is_active' => (bool) $p->is_active,
                'is_visible' => true,
                'is_available' => true,
                'player_id_label' => $p->player_id_label ?: 'آيدي الحساب (User ID)',
                'created_at' => $p->created_at->toISOString(),
            ];
        });

        return $this->successResponse($products, 'تم جلب قائمة المنتجات بنجاح');
    }

    /**
     * Single product details with all tiers.
     */
    public function show(int $id): JsonResponse
    {
        $product = Product::query()
            ->with(['category', 'tiers'])
            ->findOrFail($id);

        return $this->successResponse($product, 'تم جلب تفاصيل المنتج بنجاح');
    }

    /**
     * Toggle product active status.
     */
    public function toggleActive(int $id): JsonResponse
    {
        $product = Product::findOrFail($id);
        $product->is_active = !$product->is_active;
        $product->save();
        $this->clearPublicCatalogCache();

        return $this->successResponse([
            'id' => $product->id,
            'is_active' => $product->is_active,
        ], 'تم تحديث حالة المنتج بنجاح');
    }

    /**
     * Store or update product (Matches 3-Step Modal in Screenshots 3, 4, 5).
     */
    public function save(Request $request, ?int $id = null): JsonResponse
    {
        $validated = $request->validate([
            // Step 1: Basics
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],
            'category_id' => ['required', 'exists:categories,id'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'image' => ['nullable', 'string'],
            // Step 2: Integration & Pricing
            'fulfillment_mode' => ['nullable', 'string', 'in:auto,manual'],
            'provider_id' => ['nullable', 'integer'],
            'provider_name' => ['nullable', 'string', 'max:150'],
            'provider_product_id' => ['nullable', 'string', 'max:100'],
            'provider_product_name' => ['nullable', 'string', 'max:255'],
            'auto_fulfill' => ['nullable', 'boolean'],
            'sync_pricing' => ['nullable', 'boolean'],
            'manual_price' => ['nullable', 'boolean'],
            'min_qty' => ['nullable', 'numeric', 'min:1'],
            'max_qty' => ['nullable', 'numeric', 'min:1'],
            'base_price' => ['nullable', 'numeric', 'min:0'],
            'final_price' => ['nullable', 'numeric', 'min:0'],
            // Step 3: Fields
            'player_id_label' => ['nullable', 'string', 'max:255'],
            'requires_player_id' => ['nullable', 'boolean'],
        ], [
            'name.required' => 'اسم المنتج مطلوب.',
            'category_id.required' => 'القسم التابع له المنتج مطلوب.',
            'category_id.exists' => 'القسم المحدد غير موجود.',
        ]);

        // Validate the selected supplier here so a stale/invalid ID cannot
        // result in a product that appears linked in the UI but cannot fulfill.
        if (!empty($validated['provider_id'])) {
            $request->validate([
                'provider_id' => ['integer', 'exists:providers,id'],
            ], [
                'provider_id.exists' => 'المورد المحدد غير موجود. حدّث قائمة الموردين ثم حاول مرة أخرى.',
            ]);
        }
        $providerProductId = trim((string) ($validated['provider_product_id'] ?? ''));
        if (!empty($validated['provider_id']) && $providerProductId === '') {
            $selectedProvider = Provider::find((int) $validated['provider_id']);
            if (in_array($selectedProvider?->driver, ['ad_card', 'ad-card', 'adcard'], true)) {
                return $this->errorResponse('اختر المنتج المطلوب من كتالوج المورد قبل الحفظ.', Response::HTTP_UNPROCESSABLE_ENTITY);
            }
        }

        return DB::transaction(function () use ($validated, $id, $request) {
            $product = $id ? Product::findOrFail($id) : new Product();

            $product->name = $validated['name'];
            $product->description = $validated['description'] ?? null;
            $product->category_id = $validated['category_id'];
            $product->sort_order = $validated['sort_order'] ?? 1;
            if (!empty($validated['image'])) {
                if (str_starts_with($validated['image'], 'data:image')) {
                    try {
                        [$type, $data] = explode(';', $validated['image']);
                        [, $data]      = explode(',', $data);
                        $data = base64_decode($data);
                        $ext = 'png';
                        if (str_contains($type, 'jpeg') || str_contains($type, 'jpg')) $ext = 'jpg';
                        if (str_contains($type, 'webp')) $ext = 'webp';
                        $filename = 'products/' . Str::uuid() . '.' . $ext;
                        \Illuminate\Support\Facades\Storage::disk('public')->put($filename, $data);
                        $product->image = '/storage/' . $filename;
                    } catch (\Throwable $e) {
                        $product->image = $validated['image'];
                    }
                } else {
                    $product->image = $validated['image'];
                }
            }
            $categoryType = $this->effectiveCategoryType(Category::findOrFail($validated['category_id']));
            $product->type = match ($categoryType) {
                CategoryType::VOICE_APPS => ProductType::DIRECT_TOPUP,
                CategoryType::CARDS => ProductType::VOUCHER,
                default => ProductType::PLAYER_ID,
            };
            $product->player_id_label = $validated['player_id_label'] ?? 'آيدي الحساب (User ID)';
            $product->is_active = true;
            $product->catalog_source_id = null;
            $product->external_product_id = $validated['provider_product_id'] ?? null;

            if (!$id && empty($product->slug)) {
                $product->slug = Str::slug($product->name) . '-' . time();
            }
            $product->save();

            // Create or update Tier
            $providerName = $validated['provider_name'] ?? 'منصة إمبراطور (Embrator Store)';
            $providerProductId = $validated['provider_product_id'] ?? null;
            $providerProductName = $validated['provider_product_name'] ?? $product->name;
            $minQty = (int) ($validated['min_qty'] ?? 1);
            $maxQty = (int) ($validated['max_qty'] ?? 10000000);
            $basePrice = (float) ($validated['base_price'] ?? 0);
            $finalPrice = (float) ($validated['final_price'] ?? 0);

            // If final_price not set or 0, default to basePrice + 4% markup
            if ($finalPrice <= 0 && $basePrice > 0) {
                $finalPrice = $basePrice * 1.04;
            }

            $tier = $product->tiers()->first() ?? new ProductTier();
            $tier->product_id = $product->id;
            $tier->name = $product->name;
            $tier->sku = Str::upper(Str::slug($product->name, '_')) . '_TIER_1';
            $tier->source_cost = $basePrice;
            $tier->cost_currency = (string) $request->input('provider_product_currency', 'USD');
            $tier->margin_percent = 4.00;
            $tier->final_price = $finalPrice;
            $tier->sale_price = $finalPrice;
            $tier->min_qty = $minQty;
            $tier->max_qty = $maxQty;
            $tier->in_stock = true;
            $tier->is_active = true;
            $tier->sort_order = 1;
            $tier->metadata = [
                'provider_id' => $validated['provider_id'] ?? null,
                'provider_name' => $providerName,
                'provider_product_id' => $providerProductId,
                'provider_product_name' => $providerProductName,
                'provider_product_fields' => $request->input('provider_product_fields', []),
                'requires_player_id' => (bool) ($validated['requires_player_id'] ?? true),
                'provider_product_currency' => $request->input('provider_product_currency', 'USD'),
                'auto_fulfill' => $validated['auto_fulfill'] ?? true,
                'sync_pricing' => $validated['sync_pricing'] ?? true,
                'fulfillment_mode' => $validated['fulfillment_mode'] ?? 'auto',
                'is_visible' => true,
                'is_available' => true,
            ];
            $tier->save();

            // Replace the previous supplier mapping atomically. Leaving the old
            // row active can route orders to a stale AD Card SKU after edits.
            DB::table('product_providers')->where('product_tier_id', $tier->id)->delete();
            if (!empty($validated['provider_id']) && !empty($providerProductId)) {
                $provider = Provider::findOrFail((int) $validated['provider_id']);
                DB::table('product_providers')->insert([
                    'product_id' => $product->id,
                    'product_tier_id' => $tier->id,
                    'provider_id' => $provider->id,
                    'provider_sku' => $providerProductId,
                    'cost_price' => $basePrice,
                    'cost_currency' => (string) $request->input('provider_product_currency', 'USD'),
                    'priority' => 1,
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

        $this->clearPublicCatalogCache();

            return $this->successResponse([
                'id' => $product->id,
                'name' => $product->name,
                'external_product_id' => $product->external_product_id,
                'provider_name' => $providerName,
                'tier' => $tier,
            ], 'تم حفظ المنتج وربطه بنجاح');
        });
    }

    /** Clear cached category and product catalog responses after a product change. */
    private function clearPublicCatalogCache(): void
    {
        \Illuminate\Support\Facades\Cache::flush();
        foreach (['all', 'games', 'cards', 'voice_apps', 'target', 'telecom'] as $type) {
            \Illuminate\Support\Facades\Cache::forget('api_categories_v1_' . $type);
        }
    }

    /**
     * Delete product.
     */
    public function destroy(int $id): JsonResponse
    {
        $product = Product::findOrFail($id);
        $product->delete();
            $this->clearPublicCatalogCache();

        return $this->successResponse(null, 'تم حذف المنتج بنجاح');
    }

    /**
     * Provider Catalog Products for Modal Step 2 (Matches Screenshot 4 & 5).
     */
    public function providerCatalog(Request $request): JsonResponse
    {
        $search = strtolower(trim($request->input('search', '')));
        $page = max(1, (int) $request->input('page', 1));
        $perPage = min(100, max(10, (int) $request->input('per_page', 80)));

        $allItems = [];

        $provider = Provider::find($request->integer('provider_id'));
        if (!$provider && $request->filled('provider_id')) {
            $provider = Provider::where('name', $request->input('provider_id'))->first();
        }
        // Fetch live products from the selected supplier.
        try {
            if ($provider && in_array($provider->driver, ['ad_card', 'ad-card', 'adcard'], true)) {
                $adapter = app(\App\Services\ProviderManagerService::class)->resolveAdapter($provider->driver, array_merge($provider->config ?? [], ['base_url' => $provider->base_url]));
                $liveProducts = $adapter->getProducts();
            } elseif ($provider && $provider->driver !== 'embrator_reseller_api') {
                $liveProducts = [];
            } else {
                $service = app(\App\Services\EmbratorService::class);
                $liveCatalog = $service->getProducts();
                $liveProducts = $liveCatalog['products'] ?? [];
            }
            if (!empty($liveProducts)) {
                foreach ($liveProducts as $p) {
                    $rawPrice = (float) ($p['priceUsd'] ?? $p['price'] ?? 0);
                    $currency = $p['currency'] ?? 'USD';
                    $allItems[] = [
                        'id' => (string) $p['id'],
                        'name' => $p['name'] ?? ('Product ' . $p['id']),
                        'provider_sku' => (string) $p['id'],
                        'parent_id' => $p['parent_id'] ?? null,
                        'available' => $p['available'] ?? true,
                        'qty_values' => $p['qty_values'] ?? null,
                        'params' => $p['params'] ?? [],
                        'price' => $rawPrice,
                        'price_usd' => $currency === 'USD' ? $rawPrice : null,
                        'price_egp' => $currency === 'USD' ? round($rawPrice * 59.0, 6) : null,
                        'currency' => $currency,
                        'currency_label' => 'دولار',
                        'min_qty' => (int) ($p['min_qty'] ?? $p['minQty'] ?? 1),
                        'max_qty' => (int) ($p['max_qty'] ?? $p['maxQty'] ?? 10000000),
                        'type' => $p['product_type'] ?? 'coins',
                        'image' => $p['image'] ?? $p['category_img'] ?? null,
                        'description' => $p['description'] ?? '',
                        'fields' => $p['fields'] ?? [],
                        'category_name' => $p['category_name'] ?? null,
                    ];
                }
            }
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::warning('Provider live catalog fetch error: ' . $e->getMessage());
        }

        $filtered = $allItems;
        if ($search !== '') {
            $filtered = array_values(array_filter($allItems, function ($it) use ($search) {
                return str_contains(strtolower($it['name']), $search)
                    || str_contains(strtolower($it['id']), $search)
                    || str_contains(strtolower($it['provider_sku']), $search);
            }));
        }

        $totalAvailable = count($filtered);
        $displayedItems = array_slice($filtered, 0, $perPage);

        return $this->successResponse([
            'total_available' => $totalAvailable,
            'displayed_count' => count($displayedItems),
            'items' => $displayedItems,
        ], 'تم جلب كتالوج المورد بنجاح');
    }

    /**
     * One-click Live Sync all linked products with Embrator catalog prices.
     */
    public function syncEmbrator(): JsonResponse
    {
        try {
            $service = app(\App\Services\EmbratorService::class);
            $res = $service->getProducts();
            $embratorProducts = $res['products'] ?? [];

            if (empty($embratorProducts)) {
                return $this->errorResponse('تعذر جلب الكتالوج من منصة إمبراطور حالياً');
            }

            $embratorById = [];
            foreach ($embratorProducts as $ep) {
                $embratorById[(string) $ep['id']] = $ep;
            }

            $allProducts = Product::with('tiers')->get();
            $updatedCount = 0;

            foreach ($allProducts as $p) {
                $firstTier = $p->tiers->first();
                $meta = $firstTier?->metadata ?? [];
                $provId = (string) ($meta['provider_product_id'] ?? $p->external_product_id ?? '');

                $matchedEp = $embratorById[$provId] ?? null;

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

                if ($matchedEp && $firstTier) {
                    $rawCost = (float) ($matchedEp['priceUsd'] ?? $matchedEp['price'] ?? 0);
                    $margin = (float) ($firstTier->margin_percent > 0 ? $firstTier->margin_percent : 4.0);
                    $markupPrice = $rawCost * (1 + ($margin / 100));
                    $minQty = (int) ($matchedEp['minQty'] ?? 1);
                    $maxQty = (int) ($matchedEp['maxQty'] ?? 10000000);

                    $meta['provider_id'] = 1;
                    $meta['provider_name'] = 'منصة إمبراطور (Embrator Store)';
                    $meta['provider_product_id'] = (string) $matchedEp['id'];
                    $meta['provider_product_name'] = $matchedEp['name'];
                    $meta['sync_pricing'] = true;

                    $firstTier->update([
                        'source_cost' => $rawCost,
                        'cost_currency' => 'USD',
                        'margin_percent' => $margin,
                        'final_price' => $markupPrice,
                        'sale_price' => $markupPrice,
                        'min_qty' => $minQty,
                        'max_qty' => $maxQty,
                        'metadata' => $meta,
                    ]);

                    $p->update(['external_product_id' => (string) $matchedEp['id']]);
                    $updatedCount++;
                }
            }

        $this->clearPublicCatalogCache();

            return $this->successResponse([
                'updated_count' => $updatedCount,
            ], "تمت مزامنة أسعار {$updatedCount} منتج بنجاح وبأحدث أسعار إمبراطور الحية");
        } catch (\Throwable $e) {
            return $this->errorResponse('فشل تحديث الأسعار: ' . $e->getMessage());
        }
    }

    private function effectiveCategoryType(?Category $category): ?CategoryType
    {
        $type = $category?->type;
        if ($type !== null && $type !== CategoryType::GAMES) {
            return $type;
        }

        $name = mb_strtolower(($category?->name ?? '') . ' ' . ($category?->slug ?? ''));
        if (str_contains($name, 'تطبيق') || str_contains($name, 'شات') || str_contains($name, 'app')) {
            return CategoryType::VOICE_APPS;
        }
        if (str_contains($name, 'بطاق') || str_contains($name, 'كارت') || str_contains($name, 'كروت') || str_contains($name, 'card') || str_contains($name, 'voucher')) {
            return CategoryType::CARDS;
        }
        if (str_contains($name, 'اتصالات') || str_contains($name, 'شبكات') || str_contains($name, 'telecom')) {
            return CategoryType::TELECOM;
        }

        return $type;
    }
}
