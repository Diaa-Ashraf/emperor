<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ProductController extends Controller
{
    use ApiResponse;

    /**
     * Get products list (filtered by category, category slug, type, or search).
     */
    public function index(Request $request): JsonResponse
    {
        $catId = $request->input('category_id');
        $rawCatSlug = $request->input('category_slug');
        $catSlug = $rawCatSlug ? trim(urldecode((string) $rawCatSlug)) : null;
        $catSlugSpaces = $catSlug ? str_replace('-', ' ', $catSlug) : null;
        $catSlugDashes = $catSlug ? str_replace(' ', '-', $catSlug) : null;
        $parentId = $request->input('parent_id');
        $type = $request->input('type');
        $search = trim((string) $request->input('search'));
        $perPage = (int) ($request->input('limit') ?: $request->input('per_page') ?: 24);
        $perPage = max(1, min($perPage, 100));
        $page = (int) ($request->input('page') ?: 1);
        $requestedIds = $request->input('ids');
        if (!is_array($requestedIds)) {
            $requestedIds = is_string($requestedIds) ? explode(',', $requestedIds) : [];
        }
        $requestedIds = array_values(array_filter(array_map('intval', $requestedIds), fn ($id) => $id > 0));

        $hasParentId = \Illuminate\Support\Facades\Schema::hasColumn('products', 'parent_id');

        $withRelations = [
            'category:id,name,slug,type',
            'activeTiers',
        ];

        if ($hasParentId) {
            $withRelations['variants'] = function ($q) {
                $q->where('is_active', true)
                  ->with('activeTiers')
                  ->orderBy('sort_order', 'asc');
            };
        }

        $selectColumns = [
            'id', 'category_id', 'is_parent', 'name', 'slug', 'description', 'image',
            'type', 'player_id_label', 'player_id_validation_regex',
            'player_id_guide_image', 'has_server_id', 'server_id_label',
            'server_options', 'requires_account_region', 'region_options',
            'sort_order'
        ];
        if ($hasParentId) {
            $selectColumns[] = 'parent_id';
        }

        $query = Product::where('is_active', true)
            ->where('type', '!=', 'target')
            ->with($withRelations)
            ->select($selectColumns);

        if ($hasParentId) {
            $query->withCount([
                'variants' => fn($q) => $q->where('is_active', true)
            ]);

            if ($parentId !== null && $parentId !== '') {
                $query->where('parent_id', $parentId);
                $query->where('is_parent', false);
            } else {
                $query->whereNull('parent_id');
            }
        }

        if ($requestedIds) {
            $query->whereIn('id', $requestedIds);
        }

        if ($catId) {
            $query->where('category_id', $catId);
        } elseif ($catSlug && $catSlug !== 'all') {
            $typeAliases = [
                'games' => 'games',
                'apps' => 'voice_apps',
                'voice_apps' => 'voice_apps',
                'cards' => 'cards',
                'telecom' => 'telecom',
                'target' => 'target',
                'bbgy' => 'games',
                'pubg' => 'games',
                'قسم-التطبيقات' => 'voice_apps',
                'قسم التطبيقات' => 'voice_apps',
                'تطبيقات' => 'voice_apps',
                'العاب' => 'games',
                'قسم-العاب' => 'games',
                'قسم العاب' => 'games',
                'قسم-الألعاب' => 'games',
                'قسم الألعاب' => 'games',
            ];

            $categoryType = $typeAliases[$catSlug] ?? $typeAliases[$catSlugSpaces] ?? $typeAliases[$catSlugDashes] ?? null;

            $query->where(function ($q) use ($catSlug, $catSlugSpaces, $catSlugDashes, $categoryType) {
                $q->whereHas('category', function ($cq) use ($catSlug, $catSlugSpaces, $catSlugDashes, $categoryType) {
                    $cq->where('slug', $catSlug)
                       ->orWhere('slug', $catSlugDashes)
                       ->orWhere('name', $catSlug)
                       ->orWhere('name', $catSlugSpaces)
                       ->orWhere('slug', 'like', "%{$catSlug}%")
                       ->orWhere('name', 'like', "%{$catSlug}%")
                       ->orWhere('name', 'like', "%{$catSlugSpaces}%");

                    if ($categoryType) {
                        $cq->orWhere('type', $categoryType);
                    }
                })->orWhere('slug', 'like', "%{$catSlug}%")
                  ->orWhere('name', 'like', "%{$catSlug}%");
            });
        }

        if ($type && $type !== 'all') {
            $query->where('type', $type);
        }

        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('slug', 'like', "%{$search}%")
                  ->orWhereHas('variants', function ($variants) use ($search) {
                      $variants->where('is_active', true)
                          ->where(function ($variantQuery) use ($search) {
                              $variantQuery->where('name', 'like', "%{$search}%")
                                  ->orWhere('slug', 'like', "%{$search}%");
                          });
                  });
            });
        }

        // Cache default requests without search for 2 minutes
        if ($search === '' && !$requestedIds) {
            $cacheKey = "api_products_list_v5_c{$catId}_cs{$catSlug}_p{$parentId}_t{$type}_pg{$page}_l{$perPage}";
            $products = Cache::remember($cacheKey, 120, function () use ($query, $perPage) {
                return $query->orderBy('sort_order', 'asc')->paginate($perPage);
            });
        } else {
            $products = $query->orderBy('sort_order', 'asc')->paginate($perPage);
        }

        $products->through(function ($p) use ($request) {
            return (new ProductResource($p))->resolve($request);
        });

        return $this->paginatedResponse(
            $products,
            'تم جلب قائمة المنتجات بنجاح'
        );
    }

    /**
     * Get single product details with active tiers (by ID or slug).
     */
    public function show(string|int $id): JsonResponse
    {
        $cacheKey = "api_product_detail_v4_{$id}";
        $product = Cache::remember($cacheKey, 900, function () use ($id) {
            $hasParentId = \Illuminate\Support\Facades\Schema::hasColumn('products', 'parent_id');
            $withRelations = [
                'category:id,name,slug,type',
                'activeTiers',
            ];

            if ($hasParentId) {
                $withRelations['parent'] = fn($q) => $q->select(['id', 'name', 'slug', 'image']);
                $withRelations['variants'] = function ($q) {
                    $q->where('is_active', true)
                      ->with('activeTiers')
                      ->orderBy('sort_order', 'asc');
                };
            }

            $query = Product::where('is_active', true)->with($withRelations);

            if ($hasParentId) {
                $query->withCount([
                    'variants' => fn($q) => $q->where('is_active', true)
                ]);
            }

            if (is_numeric($id)) {
                return $query->where('id', $id)->firstOrFail();
            }

            return $query->where('slug', $id)->firstOrFail();
        });

        return $this->successResponse(
            new ProductResource($product),
            'تم جلب تفاصيل المنتج بنجاح'
        );
    }
}
