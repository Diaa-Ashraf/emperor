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
     * Batch check orders status by idempotency keys or public IDs.
     */
    public function index(Request $request): JsonResponse
    {
        $client = $request->attributes->get('api_client') ?? $request->user() ?? auth()->user();

        $keysStr = $request->input('keys') ?? $request->input('idempotency_keys') ?? '';
        $keys = array_filter(array_map('trim', explode(',', $keysStr)));

        $query = Order::where('user_id', $client->id);

        if (!empty($keys)) {
            $query->where(function ($q) use ($keys) {
                $q->whereIn('idempotency_key', $keys)
                    ->orWhereIn('public_id', $keys);
            });
        } else {
            $query->latest('id')->limit(20);
        }

        $orders = $query->get()->map(function ($order) {
            return [
                'orderId' => (string) $order->id,
                'orderNumber' => $order->public_id,
                'status' => strtoupper($order->status->value),
                'idempotencyKey' => $order->idempotency_key,
                'totalAmount' => (float) $order->total_amount,
                'currency' => $order->currency,
                'createdAt' => $order->created_at->toIso8601String(),
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $orders,
        ]);
    }

    /**
     * Create an order for the API client.
     */
    public function store(Request $request): JsonResponse
    {
        $client = $request->attributes->get('api_client') ?? $request->user() ?? auth()->user();

        // Normalize parameter aliases (Reseller API compatibility)
        $tierId = $request->input('tier_id') ?? $request->input('tierId');
        $productId = $request->input('product_id') ?? $request->input('productId');
        $sku = $request->input('sku');
        $playerId = $request->input('player_id') ?? $request->input('playerId');
        $serverId = $request->input('server_id') ?? $request->input('serverId');
        $idempotencyKey = $request->input('idempotency_key') ?? $request->input('idempotencyKey') ?? (string) \Illuminate\Support\Str::uuid();
        $quantity = (int) ($request->input('quantity') ?? 1);

        // Check if tier was not passed directly but product_id was passed
        $tier = null;
        if ($tierId) {
            $tier = ProductTier::with('product')->find($tierId);
        } elseif ($sku) {
            $tier = ProductTier::with('product')->where('sku', $sku)->first();
        } elseif ($productId) {
            // First tier of this product or direct tier
            $tier = ProductTier::with('product')->where('product_id', $productId)->where('is_active', true)->first();
            if (!$tier) {
                $tier = ProductTier::with('product')->find($productId);
            }
        }

        if (!$tier || !$tier->is_active || !$tier->product->is_active) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => 101,
                    'message' => 'Product unavailable/inactive (المنتج المطلوب غير متوفر حالياً)',
                ],
                'status' => 'error',
                'message' => 'الباقة المطلوبة غير متوفرة أو معطلة حالياً.',
                'code' => 'TIER_UNAVAILABLE',
            ], Response::HTTP_BAD_REQUEST);
        }

        if (!$playerId) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => 123,
                    'message' => 'Validation Error: playerId is required (معرف اللاعب أو الحساب مطلوب)',
                ],
                'status' => 'error',
                'message' => 'معرف اللاعب أو الحساب (playerId) مطلوب.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        if ($quantity < 1 || $quantity > 1000) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => 102,
                    'message' => 'Quantity out of range (الكمية المطلوبة خارج النطاق المسموح)',
                ],
                'status' => 'error',
                'message' => 'الكمية يجب أن تكون بين 1 و 1000.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $unitPrice = $this->pricingService->getPriceForUser($tier, $client);
        $totalPrice = round($unitPrice * $quantity, 2);

        // Check wallet balance
        $wallet = $client->wallet;
        if (!$wallet || (float) $wallet->balance < $totalPrice) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => 100,
                    'message' => 'Insufficient balance (رصيد المحفظة الحالي غير كافٍ لتنفيذ الطلب)',
                ],
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
                playerId: $playerId,
                serverId: $serverId,
                accountRegion: $request->input('account_region') ?? $request->input('accountRegion'),
                extraFields: $request->input('extra_fields') ?? [],
                idempotencyKey: $idempotencyKey,
                channel: 'api'
            );

            $order = $this->orderService->createOrder($dto, $client);

            return response()->json([
                'success' => true,
                'status' => 'success',
                'message' => 'تم إنشاء الطلب بنجاح وهو قيد المعالجة الآن.',
                'data' => [
                    'orderId' => (string) $order->id,
                    'orderNumber' => $order->public_id,
                    'status' => strtoupper($order->status->value),
                    'idempotencyKey' => $idempotencyKey,
                    'order_id' => $order->id,
                    'public_id' => $order->public_id,
                    'product_name' => $tier->product->name,
                    'tier_name' => $tier->name,
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
                'success' => false,
                'error' => [
                    'code' => 500,
                    'message' => 'Internal Server Error: ' . $e->getMessage(),
                ],
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
