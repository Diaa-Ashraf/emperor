<?php

namespace App\Adapters\CatalogSources;

use App\Contracts\CatalogSourceAdapter;
use App\DTOs\CatalogSyncResultDTO;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductTier;
use App\Services\KaCardsService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class KaCardsCatalogAdapter implements CatalogSourceAdapter
{
    protected KaCardsService $service;

    public function __construct(
        protected array $config = []
    ) {
        $this->service = new KaCardsService($this->config);
    }

    /**
     * Fetch all available products and categories from KA-Cards and synchronize.
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
            $rawProducts = $this->service->getProducts();

            if (empty($rawProducts)) {
                return new CatalogSyncResultDTO(
                    success: false,
                    categoriesCreated: 0,
                    categoriesUpdated: 0,
                    productsCreated: 0,
                    productsUpdated: 0,
                    tiersCreated: 0,
                    tiersUpdated: 0,
                    errors: ['لم يتم استلام أي بيانات من مزود KA-Cards أو التوكن غير صالح']
                );
            }

            // Group products or parse items returned by KA-Cards
            $items = isset($rawProducts['data']) ? $rawProducts['data'] : $rawProducts;

            DB::transaction(function () use (
                $items,
                &$categoriesCreated,
                &$categoriesUpdated,
                &$productsCreated,
                &$productsUpdated,
                &$tiersCreated,
                &$tiersUpdated
            ) {
                // Ensure default KA-Cards Category exists
                $category = Category::firstOrNew(['slug' => 'ka-cards']);
                $isNewCat = !$category->exists;
                $category->fill([
                    'name' => 'بطاقات وألعاب KA-Cards',
                    'type' => 'games',
                    'description' => 'المنتجات والبطاقات المزامنة من مزود KA-Cards',
                    'is_active' => true,
                ]);
                $category->save();

                if ($isNewCat) {
                    $categoriesCreated++;
                } else {
                    $categoriesUpdated++;
                }

                if (is_array($items)) {
                    foreach ($items as $item) {
                        $externalId = $item['id'] ?? $item['product_id'] ?? null;
                        $name = $item['name'] ?? $item['title'] ?? 'منتج رقمي ' . $externalId;
                        $price = (float) ($item['price'] ?? 0.0);
                        $slug = 'ka-' . ($externalId ?: Str::slug($name));

                        $product = Product::firstOrNew(['slug' => $slug]);
                        $isNewProd = !$product->exists;

                        $product->fill([
                            'category_id' => $category->id,
                            'name' => $name,
                            'type' => 'direct_topup',
                            'description' => $item['description'] ?? null,
                            'is_active' => true,
                        ]);
                        $product->save();

                        if ($isNewProd) {
                            $productsCreated++;
                        } else {
                            $productsUpdated++;
                        }

                        // Product Tier
                        $tierSku = 'KA-TIER-' . ($externalId ?: $product->id);
                        $tier = ProductTier::firstOrNew([
                            'product_id' => $product->id,
                            'sku' => $tierSku,
                        ]);
                        $isNewTier = !$tier->exists;

                        $tier->fill([
                            'name' => $name,
                            'cost_price' => $price,
                            'selling_price' => round($price * 1.15, 2), // Standard default margin
                            'is_active' => true,
                            'sort_order' => 1,
                        ]);
                        $tier->save();

                        if ($isNewTier) {
                            $tiersCreated++;
                        } else {
                            $tiersUpdated++;
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
                tiersUpdated: $tiersUpdated
            );
        } catch (\Throwable $e) {
            Log::error('KaCardsCatalogAdapter fetchCatalog Exception: ' . $e->getMessage());

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

    public function fetchProductDetails(string $externalProductId): array
    {
        return $this->service->getContent($externalProductId);
    }

    public function testConnection(): bool
    {
        $products = $this->service->getProducts();
        return !empty($products);
    }
}
