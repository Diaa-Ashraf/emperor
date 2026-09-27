<?php

namespace App\Adapters\CatalogSources;

use App\Contracts\CatalogSourceAdapter;
use App\DTOs\CatalogSyncResultDTO;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductTier;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class RealCatalogAdapter implements CatalogSourceAdapter
{
    protected string $apiUrl;
    protected ?string $apiKey;
    protected bool $sandbox;
    protected int $timeout;

    public function __construct(protected array $config = [])
    {
        $this->apiUrl = rtrim($config['api_url'] ?? env('CATALOG_API_URL', 'https://api.emperor-providers.com/v1'), '/');
        $this->apiKey = $config['api_key'] ?? env('CATALOG_API_KEY');
        $this->sandbox = (bool) ($config['sandbox_mode'] ?? env('CATALOG_SANDBOX_MODE', false));
        $this->timeout = (int) ($config['timeout'] ?? 15);
    }

    /**
     * Fetch all available products and categories from source and synchronize.
     */
    public function fetchCatalog(): CatalogSyncResultDTO
    {
        $categoriesCreated = 0;
        $categoriesUpdated = 0;
        $productsCreated = 0;
        $productsUpdated = 0;
        $tiersCreated = 0;
        $tiersUpdated = 0;
        $errors = [];

        try {
            $data = [];

            if (empty($this->apiKey) || $this->sandbox) {
                // Simulated or test fallback catalog
                $data = $this->getSimulatedCatalog();
            } else {
                $response = Http::timeout($this->timeout)
                    ->withHeaders(['Authorization' => 'Bearer ' . $this->apiKey])
                    ->get("{$this->apiUrl}/catalog/sync");

                if (!$response->successful()) {
                    return new CatalogSyncResultDTO(
                        success: false,
                        categoriesCreated: 0,
                        categoriesUpdated: 0,
                        productsCreated: 0,
                        productsUpdated: 0,
                        tiersCreated: 0,
                        tiersUpdated: 0,
                        errors: ['HTTP error: ' . $response->status()]
                    );
                }

                $json = $response->json() ?? [];
                $data = $json['categories'] ?? $json['data'] ?? [];
            }

            DB::transaction(function () use (
                $data,
                &$categoriesCreated,
                &$categoriesUpdated,
                &$productsCreated,
                &$productsUpdated,
                &$tiersCreated,
                &$tiersUpdated,
                &$errors
            ) {
                foreach ($data as $catItem) {
                    $catSlug = $catItem['slug'] ?? Str::slug($catItem['name_en'] ?? $catItem['name'] ?? 'category');
                    if (empty($catSlug)) {
                        $catSlug = 'category-' . uniqid();
                    }
                    $category = Category::firstOrNew(['slug' => $catSlug]);
                    $isNewCat = !$category->exists;

                    $category->fill([
                        'name' => $catItem['name'] ?? 'قسم عام',
                        'type' => $catItem['type'] ?? 'games',
                        'description' => $catItem['description'] ?? null,
                        'is_active' => $catItem['is_active'] ?? true,
                    ]);
                    $category->save();

                    if ($isNewCat) {
                        $categoriesCreated++;
                    } else {
                        $categoriesUpdated++;
                    }

                    foreach ($catItem['products'] ?? [] as $prodItem) {
                        $prodSlug = $prodItem['slug'] ?? Str::slug($prodItem['name_en'] ?? $prodItem['name'] ?? 'product');
                        if (empty($prodSlug)) {
                            $prodSlug = 'product-' . uniqid();
                        }
                        $product = Product::firstOrNew(['slug' => $prodSlug]);
                        $isNewProd = !$product->exists;

                        $product->fill([
                            'category_id' => $category->id,
                            'name' => $prodItem['name'] ?? 'منتج رقمي',
                            'type' => $prodItem['type'] ?? 'direct_topup',
                            'description' => $prodItem['description'] ?? null,
                            'is_active' => $prodItem['is_active'] ?? true,
                        ]);
                        $product->save();

                        if ($isNewProd) {
                            $productsCreated++;
                        } else {
                            $productsUpdated++;
                        }

                        foreach ($prodItem['tiers'] ?? [] as $tierItem) {
                            $tier = ProductTier::firstOrNew([
                                'product_id' => $product->id,
                                'sku' => $tierItem['sku'] ?? ('TIER-' . uniqid()),
                            ]);
                            $isNewTier = !$tier->exists;

                            $tier->fill([
                                'name' => $tierItem['name'] ?? 'باقة رقمية',
                                'price_strategy' => \App\Enums\PriceStrategy::MANUAL,
                                'source_cost' => (float) ($tierItem['cost_price'] ?? 10.0),
                                'final_price' => (float) ($tierItem['sale_price'] ?? 12.0),
                                'sale_price' => (float) ($tierItem['sale_price'] ?? 12.0),
                                'is_active' => $tierItem['is_active'] ?? true,
                            ]);
                            $tier->save();

                            if ($isNewTier) {
                                $tiersCreated++;
                            } else {
                                $tiersUpdated++;
                            }
                        }
                    }
                }
            });

            return new CatalogSyncResultDTO(
                success: true,
                categoriesCreated: $categoriesCreated,
                categoriesUpdated: $categoriesUpdated,
                productsCreated: $productsCreated,
                productsUpdated: $productsUpdated,
                tiersCreated: $tiersCreated,
                tiersUpdated: $tiersUpdated,
                errors: $errors
            );
        } catch (\Throwable $e) {
            Log::error('RealCatalogAdapter sync error: ' . $e->getMessage());

            return new CatalogSyncResultDTO(
                success: false,
                categoriesCreated: $categoriesCreated,
                categoriesUpdated: $categoriesUpdated,
                productsCreated: $productsCreated,
                productsUpdated: $productsUpdated,
                tiersCreated: $tiersCreated,
                tiersUpdated: $tiersUpdated,
                errors: [$e->getMessage()]
            );
        }
    }

    /**
     * Fetch real-time price & stock for a specific product tier.
     */
    public function fetchProductDetails(string $externalProductId): array
    {
        if (empty($this->apiKey) || $this->sandbox) {
            return [
                'sku' => $externalProductId,
                'in_stock' => true,
                'available_quantity' => 999,
                'cost_price' => 10.0,
            ];
        }

        try {
            $response = Http::timeout($this->timeout)
                ->withHeaders(['Authorization' => 'Bearer ' . $this->apiKey])
                ->get("{$this->apiUrl}/products/{$externalProductId}");

            if ($response->successful()) {
                return $response->json()['data'] ?? [];
            }
        } catch (\Throwable $e) {
            Log::error('RealCatalogAdapter fetchProductDetails failed: ' . $e->getMessage());
        }

        return [];
    }

    /**
     * Test connection to the catalog source.
     */
    public function testConnection(): bool
    {
        if (empty($this->apiKey) || $this->sandbox) {
            return true;
        }

        try {
            $response = Http::timeout(5)
                ->withHeaders(['Authorization' => 'Bearer ' . $this->apiKey])
                ->get("{$this->apiUrl}/ping");

            return $response->successful();
        } catch (\Throwable $e) {
            return false;
        }
    }

    /**
     * Simulated catalog feed for test/sandbox environments.
     */
    protected function getSimulatedCatalog(): array
    {
        return [
            [
                'name' => 'ألعاب الباتل رويال',
                'name_en' => 'battle-royale-games',
                'slug' => 'battle-royale-games',
                'type' => 'games',
                'description' => 'شحن مباشر وفوري لجميع ألعاب المعارك',
                'is_active' => true,
                'products' => [
                    [
                        'name' => 'ببجي موبايل العالمية',
                        'name_en' => 'pubg-mobile-global',
                        'slug' => 'pubg-mobile-global',
                        'type' => 'direct_topup',
                        'is_active' => true,
                        'tiers' => [
                            [
                                'sku' => 'PUBG-60-UC',
                                'name' => '60 شدة UC',
                                'cost_price' => 0.85,
                                'sale_price' => 1.05,
                                'is_active' => true,
                            ],
                            [
                                'sku' => 'PUBG-325-UC',
                                'name' => '325 شدة UC',
                                'cost_price' => 4.20,
                                'sale_price' => 5.10,
                                'is_active' => true,
                            ],
                        ],
                    ],
                ],
            ],
            [
                'name' => 'بطاقات الهدايا والمتاجر',
                'name_en' => 'gift-cards-stores',
                'slug' => 'gift-cards-stores',
                'type' => 'cards',
                'description' => 'أكواد رقمية فورية معتمدة',
                'is_active' => true,
                'products' => [
                    [
                        'name' => 'بطاقات آبل آيتونز أمريكي',
                        'name_en' => 'apple-itunes-us',
                        'slug' => 'apple-itunes-us',
                        'type' => 'voucher',
                        'is_active' => true,
                        'tiers' => [
                            [
                                'sku' => 'ITUNES-10-USD',
                                'name' => 'بطاقة 10 دولار أمريكي',
                                'cost_price' => 9.20,
                                'sale_price' => 10.50,
                                'is_active' => true,
                            ],
                        ],
                    ],
                ],
            ],
        ];
    }
}
