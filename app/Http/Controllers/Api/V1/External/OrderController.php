<?php

namespace App\Http\Controllers\Api\V1\External;

use App\DTOs\OrderRequestDTO;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductTier;
use App\Services\OrderService;
use App\Services\PricingService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class OrderController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected OrderService $orderService,
        protected PricingService $pricingService,
    ) {}

    /**
     * Create an order for the API client.
     */
    public function store(Request $request): JsonResponse
    {
        $client = $request->attributes->get('api_client') ?? $request->user() ?? auth()->user();

        $validator = Validator::make($request->all(), [
            'tier_id' => 'required_without:sku|nullable|integer|exists:product_tiers,id',
            'sku' => 'required_without:tier_id|nullable|string|exists:product_tiers,sku',
            'player_id' => 'required|string|max:100',
            'server_id' => 'nullable|string|max:100',
            'account_region' => 'nullable|string|max:50',
            'quantity' => 'nullable|integer|min:1|max:100',
            'extra_fields' => 'nullable|array',
            'idempotency_key' => 'nullable|string|max:64',
        ], [
            'tier_id.required_without' => 'معرف الباقة (tier_id) أو كود الـ SKU مطلوب.',
            'sku.required_without' => 'معرف الباقة (tier_id) أو كود الـ SKU مطلوب.',
            'player_id.required' => 'معرف اللاعب أو الحساب (player_id) مطلوب.',
            'quantity.min' => 'الكمية يجب أن تكون 1 على الأقل.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'بيانات الطلب غير صالحة.',
                'errors' => $validator->errors(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $tier = null;
        if ($request->filled('tier_id')) {
            $tier = ProductTier::with('product')->find($request->input('tier_id'));
        } elseif ($request->filled('sku')) {
            $tier = ProductTier::with('product')->where('sku', $request->input('sku'))->first();
        }

        if (!$tier || !$tier->is_active || !$tier->product->is_active) {
            return response()->json([
                'status' => 'error',
                'message' => 'الباقة المطلوبة غير متوفرة أو معطلة حالياً.',
                'code' => 'TIER_UNAVAILABLE',
            ], Response::HTTP_BAD_REQUEST);
        }

        $quantity = (int) ($request->input('quantity') ?? 1);
        $unitPrice = $this->pricingService->getPriceForUser($tier, $client);
        $totalPrice = round($unitPrice * $quantity, 2);

        // Check wallet balance
        $wallet = $client->wallet;
        if (!$wallet || (float) $wallet->balance < $totalPrice) {
            return response()->json([
                'status' => 'error',
                'message' => 'رصيد المحفظة الحالي غير كافٍ لتنفيذ هذا الطلب.',
                'code' => 'INSUFFICIENT_WALLET_BALANCE',
                'data' => [
                    'current_balance' => (float) ($wallet?->balance ?? 0),
                    'required_amount' => $totalPrice,
                    'currency' => $client->currency ?? 'EGP',
                ],
            ], Response::HTTP_PAYMENT_REQUIRED);
        }

        try {
            $dto = new OrderRequestDTO(
                userId: $client->id,
                productId: $tier->product_id,
                productTierId: $tier->id,
                quantity: $quantity,
                playerId: $request->input('player_id'),
                serverId: $request->input('server_id'),
                accountRegion: $request->input('account_region'),
                extraFields: $request->input('extra_fields') ?? [],
                idempotencyKey: $request->input('idempotency_key'),
                channel: 'api'
            );

            $order = $this->orderService->createOrder($dto, $client);

            return response()->json([
                'status' => 'success',
                'message' => 'تم إنشاء الطلب بنجاح وهو قيد المعالجة الآن.',
                'data' => [
                    'order_id' => $order->id,
                    'public_id' => $order->public_id,
                    'status' => $order->status->value,
                    'product_name' => $tier->product->name,
                    'tier_name' => $tier->name,
                    'sku' => $tier->sku,
                    'player_id' => $order->player_id,
                    'server_id' => $order->server_id,
                    'quantity' => $order->quantity,
                    'unit_price' => (float) $order->unit_price,
                    'total_amount' => (float) $order->total_amount,
                    'currency' => $order->currency,
                    'remaining_balance' => (float) $client->fresh()->wallet->balance,
                    'created_at' => $order->created_at->toIso8601String(),
                ],
            ], Response::HTTP_CREATED);

        } catch (\Throwable $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'فشل في إنشاء الطلب: ' . $e->getMessage(),
                'code' => 'ORDER_CREATION_FAILED',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get order status and details by public_id or ID.
     */
    public function show(string $id, Request $request): JsonResponse
    {
        $client = $request->attributes->get('api_client') ?? $request->user() ?? auth()->user();

        $order = Order::with(['product:id,name,category_id,type', 'tier:id,name,sku', 'items'])
            ->where('user_id', $client->id)
            ->where(function ($query) use ($id) {
                $query->where('public_id', $id)
                    ->orWhere('id', $id);
            })
            ->first();

        if (!$order) {
            return response()->json([
                'status' => 'error',
                'message' => 'الطلب غير موجود أو لا ينتمي إلى حسابك.',
                'code' => 'ORDER_NOT_FOUND',
            ], Response::HTTP_NOT_FOUND);
        }

        $items = $order->items->map(function ($item) {
            return [
                'card_code' => $item->card_code,
                'card_pin' => $item->card_pin,
                'serial_number' => $item->serial_number,
                'status' => $item->status,
            ];
        });

        return response()->json([
            'status' => 'success',
            'data' => [
                'order_id' => $order->id,
                'public_id' => $order->public_id,
                'status' => $order->status->value,
                'product' => [
                    'id' => $order->product?->id,
                    'name' => $order->product?->name,
                    'type' => $order->product?->type?->value,
                ],
                'tier' => [
                    'id' => $order->tier?->id,
                    'name' => $order->tier?->name,
                    'sku' => $order->tier?->sku,
                ],
                'player_id' => $order->player_id,
                'server_id' => $order->server_id,
                'account_region' => $order->account_region,
                'quantity' => $order->quantity,
                'unit_price' => (float) $order->unit_price,
                'total_amount' => (float) $order->total_amount,
                'currency' => $order->currency,
                'failure_reason' => $order->failure_reason,
                'items' => $items,
                'created_at' => $order->created_at->toIso8601String(),
                'updated_at' => $order->updated_at->toIso8601String(),
            ],
        ]);
    }
}
