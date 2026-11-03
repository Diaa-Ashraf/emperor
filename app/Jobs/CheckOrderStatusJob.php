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
            $statusCheck = $providerManager->checkOrder($order);
            $order->update([
                'provider_status' => $statusCheck->status,
                'provider_response' => $statusCheck->rawResponse,
            ]);

            if ($statusCheck->status === 'completed') {
                $order->update([
                    'status' => OrderStatus::COMPLETED,
                ]);
                Log::info("Order {$order->public_id} completed successfully by provider.");
                return;
            }

            if ($statusCheck->status === 'failed') {
                Log::warning("Order {$order->public_id} failed on provider status check, initiating refund.");
                $orderService->refundOrder($order, $statusCheck->errorMessage ?? 'فشل تنفيذ الطلب لدى المزود.');
                return;
            }

            // Keep polling while the supplier has not returned a final status.
            // A timeout is not proof of failure and must not trigger a customer refund.
            $delaySeconds = $this->attemptNumber < 10 ? 15 : 60;
            self::dispatch($order->id, $this->attemptNumber + 1)
                ->delay(now()->addSeconds($delaySeconds));
        } catch (\Throwable $e) {
            Log::error("Error checking order status for {$order->public_id}: " . $e->getMessage());
            self::dispatch($order->id, $this->attemptNumber + 1)
                ->delay(now()->addMinute());
        }
    }
}
