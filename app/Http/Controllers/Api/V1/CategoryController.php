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

    /**
     * Get dynamic hero services capsules for home page.
     */
    public function heroServices(): JsonResponse
    {
        $services = \App\Models\Setting::get('hero_services');

        if (empty($services) || !is_array($services)) {
            $services = [
                ['id' => 1, 'title' => 'إصدار بطاقات افتراضية', 'subtitle' => 'فيزا وماستركارد دولية', 'icon' => 'credit-card', 'link' => '/category/cards', 'is_active' => true],
                ['id' => 2, 'title' => 'تحويل عملات دولية ومحلية', 'subtitle' => 'شحن فوري متعدد الدول', 'icon' => 'coins', 'link' => '/deposit', 'is_active' => true],
                ['id' => 3, 'title' => 'سحب تارجت', 'subtitle' => 'استبدال كوينز التارجت لكاش', 'icon' => 'target', 'link' => '/target/apps', 'is_active' => true],
                ['id' => 4, 'title' => 'شحن ألعاب', 'subtitle' => 'ببجي وفري فاير وغيرها', 'icon' => 'gamepad-2', 'link' => '/category/games', 'is_active' => true],
                ['id' => 5, 'title' => 'شحن رصيد الموبايل', 'subtitle' => 'فودافون واتصالات وأورنج', 'icon' => 'smartphone', 'link' => '/category/apps', 'is_active' => true],
            ];
        }

        return $this->successResponse(
            $services,
            'تم جلب خدمات الهيرو بنجاح'
        );
    }
}
