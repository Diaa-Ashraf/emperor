<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    use ApiResponse;

    /**
     * Get products list (filtered by category, type, or search).
     */
    public function index(Request $request): JsonResponse
    {
        $query = Product::where('is_active', true)
            ->with(['category', 'activeTiers'])
            ->select([
                'id', 'category_id', 'name', 'slug', 'description', 'image',
                'type', 'player_id_label', 'player_id_validation_regex',
                'player_id_guide_image', 'has_server_id', 'server_id_label',
                'server_options', 'requires_account_region', 'region_options',
                'sort_order'
            ]);

        if ($catId = $request->input('category_id')) {
            $query->where('category_id', $catId);
        }

        if ($type = $request->input('type')) {
            $query->where('type', $type);
        }

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('slug', 'like', "%{$search}%");
            });
        }

        $perPage = (int) ($request->input('limit') ?: $request->input('per_page') ?: 20);
        $perPage = max(1, min($perPage, 100));

        $products = $query->orderBy('sort_order', 'asc')->paginate($perPage);

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
        $query = Product::where('is_active', true)->with(['category', 'activeTiers']);

        if (is_numeric($id)) {
            $product = $query->where('id', $id)->firstOrFail();
        } else {
            $product = $query->where('slug', $id)->firstOrFail();
        }

        return $this->successResponse(
            new ProductResource($product),
            'تم جلب تفاصيل المنتج بنجاح'
        );
    }
}
