<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\BannerResource;
use App\Models\Banner;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    use ApiResponse;

    /**
     * Get active promotional banners and sliders.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Banner::where('is_active', true)
            ->where(function ($q) {
                $q->whereNull('starts_at')->orWhere('starts_at', '<=', now());
            })
            ->where(function ($q) {
                $q->whereNull('ends_at')->orWhere('ends_at', '>=', now());
            })
            ->select([
                'id', 'title', 'subtitle', 'image', 'mobile_image',
                'link', 'type', 'sort_order', 'starts_at', 'ends_at'
            ]);

        if ($type = $request->input('type')) {
            $query->where('type', $type);
        }

        $banners = $query->orderBy('sort_order', 'asc')->get();

        return $this->successResponse(
            BannerResource::collection($banners),
            'تم جلب الإعلانات والبانرات بنجاح'
        );
    }

    /**
     * Get active flash deals and promotional offers.
     */
    public function deals(Request $request): JsonResponse
    {
        $deals = Banner::where('is_active', true)
            ->where('type', 'deal')
            ->where(function ($q) {
                $q->whereNull('starts_at')->orWhere('starts_at', '<=', now());
            })
            ->where(function ($q) {
                $q->whereNull('ends_at')->orWhere('ends_at', '>=', now());
            })
            ->select([
                'id', 'title', 'subtitle', 'image', 'mobile_image',
                'link', 'type', 'old_price', 'sale_price', 'discount_badge',
                'claimed_percent', 'remaining_items', 'sort_order', 'starts_at', 'ends_at'
            ])
            ->orderBy('sort_order', 'asc')
            ->get();

        return $this->successResponse(
            BannerResource::collection($deals),
            'تم جلب عروض التخفيضات الخاصة بنجاح'
        );
    }
}
