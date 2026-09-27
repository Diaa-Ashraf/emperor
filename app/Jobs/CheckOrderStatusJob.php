<?php

namespace App\Jobs;

use App\Enums\OrderStatus;
use App\Models\Order;
use App\Services\OrderService;
use App\Services\ProviderManagerService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class CheckOrderStatusJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 10;
    public int $backoff = 30;

    public function __construct(
        public int $orderId,
        public int $attemptNumber = 1
    ) {}

    public function handle(OrderService $orderService, ProviderManagerService $providerManager): void
    {
        $order = Order::with('provider')->find($this->orderId);

        if (!$order || $order->status !== OrderStatus::PROCESSING || !$order->provider) {
            return;
        }

        try {
            $adapter = $providerManager->resolveAdapter($order->provider->driver, $order->provider->config ?? []);
            $statusCheck = $adapter->checkStatus($order->provider_order_id ?? (string) $order->id);

            if ($statusCheck->status === 'completed') {
                $order->update([
                    'status' => OrderStatus::COMPLETED,
                    'provider_status' => 'completed',
                    'provider_response' => $statusCheck->rawResponse,
                ]);
                Log::info("Order {$order->public_id} completed successfully by provider.");
                return;
            }

            if ($statusCheck->status === 'failed') {
                Log::warning("Order {$order->public_id} failed on provider status check, initiating refund.");
                $orderService->refundOrder($order, $statusCheck->errorMessage ?? 'فشل تنفيذ الطلب لدى المزود.');
                return;
            }

            // If still pending and attempts remain
            if ($this->attemptNumber < 10) {
                self::dispatch($order->id, $this->attemptNumber + 1)
                    ->delay(now()->addSeconds(30 * $this->attemptNumber));
            } else {
                Log::error("Order {$order->public_id} timed out after 10 status check attempts.");
                $orderService->refundOrder($order, 'تجاوز الطلب الحد الأقصى لوقت الانتظار لدى المزود.');
            }
        } catch (\Throwable $e) {
            Log::error("Error checking order status for {$order->public_id}: " . $e->getMessage());
        }
    }
}
