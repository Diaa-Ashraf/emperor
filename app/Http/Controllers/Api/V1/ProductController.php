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
        $type = $request->input('type');
        $search = trim((string) $request->input('search'));
        $perPage = (int) ($request->input('limit') ?: $request->input('per_page') ?: 24);
        $perPage = max(1, min($perPage, 100));
        $page = (int) ($request->input('page') ?: 1);

        $query = Product::where('is_active', true)
            ->with([
                'category:id,name,slug,type',
                'activeTiers'
            ])
            ->select([
                'id', 'category_id', 'name', 'slug', 'description', 'image',
                'type', 'player_id_label', 'player_id_validation_regex',
                'player_id_guide_image', 'has_server_id', 'server_id_label',
                'server_options', 'requires_account_region', 'region_options',
                'sort_order'
            ]);

        if ($catId) {
            $query->where('category_id', $catId);
        } elseif ($catSlug && $catSlug !== 'all') {
            $query->whereHas('category', function ($q) use ($catSlug) {
                $q->where('slug', $catSlug);
            });
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

        // Cache default requests without search for 15 minutes for blazing fast speed
        if ($search === '') {
            $cacheKey = "api_products_list_c{$catId}_cs{$catSlug}_t{$type}_p{$page}_l{$perPage}";
            $products = Cache::remember($cacheKey, 900, function () use ($query, $perPage) {
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
        $cacheKey = "api_product_detail_{$id}";
        $product = Cache::remember($cacheKey, 900, function () use ($id) {
            $query = Product::where('is_active', true)->with([
                'category:id,name,slug,type',
                'activeTiers'
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
