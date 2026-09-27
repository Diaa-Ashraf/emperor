<?php

namespace App\Http\Controllers\Api\V1\External;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Services\PricingService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected PricingService $pricingService
    ) {}

    /**
     * Get products catalog with client-specific pricing.
     */
    public function index(Request $request): JsonResponse
    {
        $client = $request->attributes->get('api_client') ?? $request->user() ?? auth()->user();

        $query = Product::where('is_active', true)
            ->with(['category:id,name,slug,type', 'activeTiers'])
            ->orderBy('sort_order');

        if ($categoryId = $request->input('category_id')) {
            $query->where('category_id', $categoryId);
        }

        if ($type = $request->input('type')) {
            $query->where('type', $type);
        }

        $products = $query->get()->map(function (Product $product) use ($client) {
            $tiers = $product->activeTiers->map(function ($tier) use ($client) {
                $price = $this->pricingService->getPriceForUser($tier, $client);

                return [
                    'tier_id' => $tier->id,
                    'name' => $tier->name,
                    'sku' => $tier->sku,
                    'price' => $price,
                    'currency' => $client->currency ?? 'EGP',
                    'in_stock' => (bool) $tier->in_stock,
                    'min_qty' => $tier->min_qty,
                    'max_qty' => $tier->max_qty,
                ];
            });

            return [
                'product_id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'type' => $product->type->value ?? $product->type,
                'category' => [
                    'id' => $product->category?->id,
                    'name' => $product->category?->name,
                    'type' => $product->category?->type->value ?? $product->category?->type,
                ],
                'player_id_label' => $product->player_id_label,
                'player_id_validation_regex' => $product->player_id_validation_regex,
                'has_server_id' => (bool) $product->has_server_id,
                'server_id_label' => $product->server_id_label,
                'server_options' => $product->server_options,
                'requires_account_region' => (bool) $product->requires_account_region,
                'region_options' => $product->region_options,
                'tiers' => $tiers,
            ];
        });

        return response()->json([
            'status' => 'success',
            'client_name' => $client->name,
            'currency' => $client->currency ?? 'EGP',
            'count' => $products->count(),
            'data' => $products,
        ]);
    }
}
