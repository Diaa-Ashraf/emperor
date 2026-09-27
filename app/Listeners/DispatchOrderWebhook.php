<?php

namespace App\Listeners;

use App\Events\OrderCompleted;
use App\Events\OrderFailed;
use App\Jobs\DispatchWebhookJob;

class DispatchOrderWebhook
{
    /**
     * Handle the event.
     */
    public function handle(OrderCompleted|OrderFailed $event): void
    {
        $order = $event->order;
        $user = $order->user;

        if (!$user || empty($user->webhook_url)) {
            return;
        }

        $isCompleted = $event instanceof OrderCompleted;
        $eventName = $isCompleted ? 'order.completed' : 'order.failed';

        $payload = [
            'order_id' => $order->public_id,
            'status' => $order->status->value,
            'product_id' => $order->product_id,
            'product_name' => $order->product?->name,
            'tier_sku' => $order->tier?->sku,
            'tier_name' => $order->tier?->name,
            'quantity' => $order->quantity,
            'total_amount' => (float) $order->total_amount,
            'currency' => $order->currency,
            'player_id' => $order->player_id,
            'server_id' => $order->server_id,
            'account_region' => $order->account_region,
            'provider_order_id' => $order->provider_order_id,
            'failure_reason' => $isCompleted ? null : ($event->reason ?? $order->failure_reason),
            'completed_at' => $isCompleted ? now()->toIso8601String() : null,
            'created_at' => $order->created_at?->toIso8601String(),
        ];

        DispatchWebhookJob::dispatch(
            $user->id,
            $eventName,
            $payload,
            $user->webhook_url,
            $user->api_secret
        );
    }
}
