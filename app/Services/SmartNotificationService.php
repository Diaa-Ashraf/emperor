<?php

namespace App\Services;

use App\DTOs\NotificationPayloadDTO;
use App\Models\Order;
use App\Models\ScheduledNotification;
use App\Models\TargetSellOrder;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Log;

class SmartNotificationService
{
    public function __construct(
        protected NotificationService $notificationService
    ) {}

    /**
     * Dispatch scheduled or immediate marketing notification to its target audience.
     */
    public function sendToAudience(ScheduledNotification $notification): int
    {
        $usersQuery = User::where('status', 'active');

        switch ($notification->target_audience) {
            case 'inactive_users':
                // Users with no orders in the last 7 days or never ordered
                $usersQuery->whereDoesntHave('orders', function (Builder $q) {
                    $q->where('created_at', '>=', now()->subDays(7));
                });
                break;

            case 'active_users':
                // Users with at least 1 order in the last 30 days
                $usersQuery->whereHas('orders', function (Builder $q) {
                    $q->where('created_at', '>=', now()->subDays(30));
                });
                break;

            case 'specific_users':
                if (!empty($notification->target_user_ids)) {
                    $usersQuery->whereIn('id', $notification->target_user_ids);
                }
                break;

            case 'with_balance':
                // Users with positive wallet balance
                $usersQuery->whereHas('wallets', function (Builder $q) {
                    $q->where('balance', '>', 10);
                });
                break;

            case 'all':
            default:
                // All active users
                break;
        }

        $users = $usersQuery->select(['id', 'name', 'phone', 'fcm_token'])->get();
        $sentCount = 0;

        $payload = new NotificationPayloadDTO(
            title: $notification->title,
            body: $notification->body,
            type: 'marketing_promo',
            link: $notification->action_url,
            imageUrl: $notification->image_url,
            data: ['campaign_id' => $notification->id]
        );

        foreach ($users as $user) {
            try {
                $this->notificationService->notify($user, $payload);
                $sentCount++;
            } catch (\Throwable $e) {
                Log::error("Failed sending notification {$notification->id} to user {$user->id}: " . $e->getMessage());
            }
        }

        $notification->update([
            'sent_at' => now(),
            'sent_count' => $sentCount,
        ]);

        return $sentCount;
    }

    /**
     * Send instant notification when target sell order is verified and paid.
     */
    public function notifyTargetPaid(TargetSellOrder $order): void
    {
        $user = $order->user;
        if (!$user) {
            return;
        }

        $methodLabel = $order->auto_verified ? 'تلقائياً' : 'بنجاح';
        $payload = new NotificationPayloadDTO(
            title: '🎉 تم إيداع رصيد التارجت بنجاح!',
            body: "تم اعتماد طلبك ({$order->public_id}) وإيداع {$order->net_payout} {$order->currency} في محفظتك {$methodLabel}.",
            type: 'target_payout',
            link: "/targets/{$order->id}",
            data: [
                'order_id' => $order->id,
                'public_id' => $order->public_id,
                'amount' => (float) $order->net_payout,
            ]
        );

        $this->notificationService->notify($user, $payload);
    }
}
