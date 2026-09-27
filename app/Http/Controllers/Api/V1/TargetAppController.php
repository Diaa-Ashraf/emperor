<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\ProductType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\QuoteTargetRequest;
use App\Http\Resources\TargetAppResource;
use App\Models\Product;
use App\Services\TargetSellService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TargetAppController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected TargetSellService $targetSellService
    ) {}

    /**
     * Get list of supported target selling apps and their conversion rate tiers.
     */
    public function index(): JsonResponse
    {
        $apps = Product::where('type', ProductType::TARGET)
            ->where('is_active', true)
            ->with(['targetRates' => function ($q) {
                $q->where('is_active', true)->orderBy('min_points', 'asc');
            }])
            ->orderBy('sort_order')
            ->get();

        return $this->successResponse(
            TargetAppResource::collection($apps),
            'تم جلب تطبيقات بيع التارجت والأسعار بنجاح'
        );
    }

    /**
     * Calculate quote for selling target points.
     */
    public function quote(QuoteTargetRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $product = Product::findOrFail($validated['product_id']);

        $quote = $this->targetSellService->calculateQuote($product, (int) $validated['points']);

        return $this->successResponse([
            'product_id' => $quote->productId,
            'product_name' => $product->name,
            'points' => $quote->points,
            'rate_per_point' => $quote->ratePerPoint,
            'gross_amount' => $quote->grossAmount,
            'fee' => $quote->fee,
            'net_payout' => $quote->netPayout,
            'currency' => $quote->currency,
            'agency_id' => $quote->agencyId,
        ], 'تم حساب قيمة التارجت ومبلغ الاستحقاق بنجاح');
    }
}
