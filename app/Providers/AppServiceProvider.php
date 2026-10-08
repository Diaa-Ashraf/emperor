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
        \Illuminate\Pagination\Paginator::useBootstrapFive();

        // Sanctum Personal Access Token Idle Inactivity & Expiry Enforcement
        \Laravel\Sanctum\Sanctum::authenticateAccessTokensUsing(function ($accessToken, bool $isValid) {
            if (!$isValid) {
                if ($accessToken->expires_at && $accessToken->expires_at->isPast()) {
                    $accessToken->delete();
                }
                return false;
            }

            if ($accessToken->expires_at && $accessToken->expires_at->isPast()) {
                $accessToken->delete();
                return false;
            }

            $isRemembered = ($accessToken->expires_at && $accessToken->expires_at->diffInDays($accessToken->created_at) > 2);
            $idleLimitMinutes = $isRemembered
                ? (int) config('auth.remember_idle_timeout', 2880)
                : (int) config('auth.session_idle_timeout', 120);

            $lastActive = $accessToken->last_used_at ?? $accessToken->created_at;

            if ($lastActive && $lastActive->diffInMinutes(now()) > $idleLimitMinutes) {
                $accessToken->delete();
                return false;
            }

            return true;
        });

        // Enterprise Multi-Tier Rate Limiters (Anti-DDoS & Anti-Abuse)
        RateLimiter::for('api', function (Request $request) {
            $user = $request->user();
            // Authenticated users get 180 req/min, guests get 60 req/min
            $limit = $user ? 180 : 60;
            return Limit::perMinute($limit)->by($user?->id ?: $request->ip())->response(function () {
                return response()->json([
                    'status' => 'error',
                    'code' => 'RATE_LIMIT_EXCEEDED',
                    'message' => 'تم تجاوز معدل الطلبات المسموح به في الدقيقة. يرجى الانتظار قليلاً.',
                ], 429);
            });
        });

        RateLimiter::for('auth', function (Request $request) {
            return Limit::perMinute(6)->by($request->ip())->response(function () {
                return response()->json([
                    'status' => 'error',
                    'code' => 'AUTH_RATE_LIMIT',
                    'message' => 'تم تجاوز الحد المسموح من محاولات الدخول أو التسجيل. يرجى الانتظار دقيقة والمحاولة مجدداً.',
                ], 429);
            });
        });

        RateLimiter::for('admin-auth', function (Request $request) {
            return Limit::perMinutes(5, 5)->by($request->ip())->response(function () {
                return response()->json([
                    'status' => 'error',
                    'code' => 'ADMIN_BRUTE_FORCE_BLOCKED',
                    'message' => 'تم حظر محاولات تسجيل الدخول للوحة التحكم مؤقتاً بسبب تكرار المحاولات الخاطئة. انتظر 5 دقائق.',
                ], 429);
            });
        });

        RateLimiter::for('financial', function (Request $request) {
            $identifier = $request->user()?->id ?: $request->ip();
            return Limit::perMinute(12)->by('financial:' . $identifier)->response(function () {
                return response()->json([
                    'status' => 'error',
                    'code' => 'TRANSACTION_RATE_LIMIT',
                    'message' => 'يرجى الانتظار بضع ثوانٍ بين المعاملات المالية والشحن لضمان معالجة العمليات بدقة.',
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
