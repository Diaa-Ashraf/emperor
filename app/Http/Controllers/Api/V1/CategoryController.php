<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    use ApiResponse;

    /**
     * Get active categories list with active products count.
     */
    public function index(Request $request): JsonResponse
    {
        $type = $request->input('type');
        $cacheKey = 'api_categories_v1_' . ($type ?: 'all');

        $categories = \Illuminate\Support\Facades\Cache::remember($cacheKey, 3600, function () use ($type) {
            $query = Category::where('is_active', true)
                ->withCount(['products' => function ($q) {
                    $q->where('is_active', true);
                }])
                ->select(['id', 'name', 'slug', 'type', 'icon', 'banner', 'description', 'sort_order']);

            if ($type) {
                $query->where('type', $type);
            }

            return $query->orderBy('sort_order', 'asc')->get();
        });

        return $this->successResponse(
            CategoryResource::collection($categories),
            'تم جلب قائمة الأقسام بنجاح'
        );
    }
}
