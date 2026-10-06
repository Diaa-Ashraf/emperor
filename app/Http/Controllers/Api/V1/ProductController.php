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
        $catSlug = $request->input('category_slug');
        $parentId = $request->input('parent_id');
        $type = $request->input('type');
        $search = trim((string) $request->input('search'));
        $perPage = (int) ($request->input('limit') ?: $request->input('per_page') ?: 24);
        $perPage = max(1, min($perPage, 100));
        $page = (int) ($request->input('page') ?: 1);

        $query = Product::where('is_active', true)
            ->where('type', '!=', 'target')
            ->with([
                'category:id,name,slug,type',
                'activeTiers',
                'variants' => function ($q) {
                    $q->where('is_active', true)
                      ->with('activeTiers')
                      ->orderBy('sort_order', 'asc');
                }
            ])
            ->withCount([
                'variants' => fn($q) => $q->where('is_active', true)
            ])
            ->select([
                'id', 'category_id', 'parent_id', 'name', 'slug', 'description', 'image',
                'type', 'player_id_label', 'player_id_validation_regex',
                'player_id_guide_image', 'has_server_id', 'server_id_label',
                'server_options', 'requires_account_region', 'region_options',
                'sort_order'
            ]);

        if ($parentId !== null && $parentId !== '') {
            $query->where('parent_id', $parentId);
        } elseif ($search === '') {
            // When not searching and no parent_id specified, show only parent products
            $query->whereNull('parent_id');
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
            ];

            if (isset($typeAliases[$catSlug])) {
                $categoryType = $typeAliases[$catSlug];
                $query->where(function ($q) use ($catSlug, $categoryType) {
                    $q->whereHas('category', function ($cq) use ($catSlug, $categoryType) {
                        $cq->where('slug', $catSlug)
                           ->orWhere('type', $categoryType);
                    });
                });
            } else {
                $query->whereHas('category', function ($q) use ($catSlug) {
                    $q->where('slug', $catSlug);
                });
            }
        }

        if ($type && $type !== 'all') {
            $query->where('type', $type);
        }

        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('slug', 'like', "%{$search}%");
            });
        }

        // Cache default requests without search for 5 minutes
        if ($search === '') {
            $cacheKey = "api_products_list_v3_c{$catId}_cs{$catSlug}_p{$parentId}_t{$type}_pg{$page}_l{$perPage}";
            $products = Cache::remember($cacheKey, 300, function () use ($query, $perPage) {
                return $query->orderBy('sort_order', 'asc')->paginate($perPage);
            });
        } else {
            $products = $query->orderBy('sort_order', 'asc')->paginate($perPage);
        }

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
        $cacheKey = "api_product_detail_v3_{$id}";
        $product = Cache::remember($cacheKey, 900, function () use ($id) {
            $query = Product::where('is_active', true)->with([
                'category:id,name,slug,type',
                'parent:id,name,slug,image',
                'activeTiers',
                'variants' => function ($q) {
                    $q->where('is_active', true)
                      ->with('activeTiers')
                      ->orderBy('sort_order', 'asc');
                }
            ])->withCount([
                'variants' => fn($q) => $q->where('is_active', true)
            ]);

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
