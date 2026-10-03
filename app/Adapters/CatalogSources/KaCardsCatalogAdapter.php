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
                        $name = $item['name'] ?? $item['title'] ?? 'باقة رقمية ' . $externalId;
                        $price = (float) ($item['price'] ?? 0.0);
                        $categoryName = trim($item['category_name'] ?? 'بطاقات وألعاب رقمية');
                        $categoryImg = $item['category_img'] ?? null;
                        $parentId = $item['parent_id'] ?? null;
                        $fields = $item['fields'] ?? [];
                        $params = $item['params'] ?? [];
                        $isAvailable = (bool) ($item['available'] ?? true);

                        // 1. Find or create Category based on KA-Cards category
                        $categorySlug = Str::slug($categoryName) ?: ('ka-cat-' . ($parentId ?: 'general'));
                        $category = Category::firstOrNew(['slug' => $categorySlug]);
                        $isNewCat = !$category->exists;

                        $category->fill([
                            'name' => $categoryName,
                            'type' => 'games',
                            'description' => 'قسم ' . $categoryName . ' من مزود KA-Cards',
                            'image' => $categoryImg ?: $category->image,
                            'is_active' => true,
                        ]);
                        $category->save();

                        if ($isNewCat) {
                            $categoriesCreated++;
                        } else {
                            $categoriesUpdated++;
                        }

                        // 2. Determine field requirements from KA-Cards fields schema
                        $playerIdLabel = 'معرف اللاعب (Player ID)';
                        $hasServerId = false;
                        $serverIdLabel = null;
                        $serverOptions = null;

                        foreach ($fields as $field) {
                            $key = strtolower($field['key'] ?? '');
                            $label = $field['label'] ?? '';
                            if (str_contains($key, 'player') || str_contains($key, 'user') || str_contains($key, 'id')) {
                                $playerIdLabel = $label ?: $playerIdLabel;
                            } elseif (str_contains($key, 'server') || str_contains($key, 'zone')) {
                                $hasServerId = true;
                                $serverIdLabel = $label ?: 'رقم السيرفر (Server / Zone ID)';
                                if (!empty($field['options'])) {
                                    $serverOptions = $field['options'];
                                }
                            }
                        }

                        // 3. Find or create Product
                        $productSlug = 'ka-' . ($externalId ?: Str::slug($name));
                        $product = Product::firstOrNew(['slug' => $productSlug]);
                        $isNewProd = !$product->exists;

                        $product->fill([
                            'category_id' => $category->id,
                            'external_product_id' => (string) $externalId,
                            'name' => $name,
                            'type' => 'player_id',
                            'description' => $item['description'] ?? "باقة {$name} المعتمدة",
                            'image' => $categoryImg ?: $product->image,
                            'player_id_label' => $playerIdLabel,
                            'has_server_id' => $hasServerId,
                            'server_id_label' => $serverIdLabel,
                            'server_options' => $serverOptions,
                            'is_active' => $isAvailable,
                        ]);
                        $product->save();

                        if ($isNewProd) {
                            $productsCreated++;
                        } else {
                            $productsUpdated++;
                        }

                        // 4. Product Tier
                        $tierSku = 'KA-' . ($externalId ?: $product->id);
                        $tier = ProductTier::firstOrNew([
                            'product_id' => $product->id,
                            'sku' => $tierSku,
                        ]);
                        $isNewTier = !$tier->exists;

                        $tier->fill([
                            'name' => $name,
                            'source_cost' => $price,
                            'cost_currency' => $item['currency'] ?? 'USD',
                            'final_price' => round($price * 1.15, 2), // Standard default profit margin
                            'is_active' => $isAvailable,
                            'metadata' => [
                                'ka_product_id' => $externalId,
                                'ka_parent_id' => $parentId,
                                'ka_product_type' => $item['product_type'] ?? 'package',
                                'fields' => $fields,
                                'params' => $params,
                            ],
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
