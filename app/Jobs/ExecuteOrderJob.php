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

class ExecuteOrderJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public int $orderId
    ) {}

    public function handle(ProviderManagerService $providerManager, OrderService $orderService): void
    {
        $order = Order::find($this->orderId);

        if (!$order || $order->status !== OrderStatus::PROCESSING) {
            return;
        }

        try {
            $result = $providerManager->fulfill($order);

            if ($result->success) {
                if ($result->status === 'completed') {
                    $order->update([
                        'status' => OrderStatus::COMPLETED,
                    ]);
                    event(new \App\Events\OrderCompleted($order));
                    Log::info("Order {$order->public_id} fulfilled immediately.");
                } else {
                    // Pending on provider side -> dispatch status check job
                    CheckOrderStatusJob::dispatch($order->id, 1)->delay(now()->addSeconds(15));
                }
            } else {
                // All providers failed -> Auto refund
                Log::warning("Fulfillment failed for order {$order->public_id}: {$result->errorMessage}. Triggering auto-refund.");
                $orderService->refundOrder($order, $result->errorMessage ?? 'فشل التنفيذ لدى جميع المزودين.');
            }
        } catch (\Throwable $e) {
            Log::error("Exception fulfilling order {$order->public_id}: " . $e->getMessage());
            $orderService->refundOrder($order, 'خطأ في معالجة الطلب: ' . $e->getMessage());
        }
    }
}
