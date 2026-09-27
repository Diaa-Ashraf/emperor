<?php

namespace App\Providers;

use App\Events\DepositApproved;
use App\Events\DepositRejected;
use App\Events\OrderCompleted;
use App\Events\OrderFailed;
use App\Listeners\SendDepositApprovedNotification;
use App\Listeners\SendDepositRejectedNotification;
use App\Listeners\SendOrderCompletedNotification;
use App\Listeners\SendOrderFailedNotification;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Rate limiters
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(120)->by($request->user()?->id ?: $request->ip());
        });

        RateLimiter::for('auth', function (Request $request) {
            return Limit::perMinute(15)->by($request->ip())->response(function () {
                return response()->json([
                    'status' => 'error',
                    'message' => 'تم تجاوز الحد المسموح من محاولات الدخول. يرجى الانتظار دقيقة والمحاولة مجدداً.',
                ], 429);
            });
        });

        RateLimiter::for('external', function (Request $request) {
            $user = $request->attributes->get('api_client_user');
            $limit = $user?->api_rate_limit ?? 60;

            return Limit::perMinute($limit)->by($user?->id ?: $request->ip());
        });

        // Event Listeners
        Event::listen(DepositApproved::class, SendDepositApprovedNotification::class);
        Event::listen(DepositRejected::class, SendDepositRejectedNotification::class);
        Event::listen(OrderCompleted::class, SendOrderCompletedNotification::class);
        Event::listen(OrderCompleted::class, \App\Listeners\DispatchOrderWebhook::class);
        Event::listen(OrderFailed::class, SendOrderFailedNotification::class);
        Event::listen(OrderFailed::class, \App\Listeners\DispatchOrderWebhook::class);
        Event::listen(\App\Events\TargetOrderPaid::class, \App\Listeners\SendTargetOrderPaidNotification::class);
        Event::listen(\App\Events\TargetOrderRejected::class, \App\Listeners\SendTargetOrderRejectedNotification::class);
    }
}
