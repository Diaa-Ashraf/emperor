<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureSessionNotIdle
{
    /**
     * Handle an incoming request and ensure the user's session or API token has not gone idle.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return $next($request);
        }

        // 1. Check Sanctum Personal Access Token
        $token = $user->currentAccessToken();
        if ($token && method_exists($token, 'getTable') && $token->getTable() === 'personal_access_tokens') {
            // Check absolute expiration if set
            if ($token->expires_at && $token->expires_at->isPast()) {
                $token->delete();

                return response()->json([
                    'status' => 'error',
                    'code' => 'SESSION_EXPIRED',
                    'message' => 'انتهت صلاحية جلسة تسجيل الدخول. يُرجى تسجيل الدخول مجدداً للحفاظ على أمان حسابك.',
                ], Response::HTTP_UNAUTHORIZED);
            }

            // Determine idle threshold (2 hours default, or 48 hours for remembered tokens)
            $isRemembered = ($token->expires_at && $token->expires_at->diffInDays($token->created_at) > 2);
            $idleLimitMinutes = $isRemembered
                ? (int) config('auth.remember_idle_timeout', 2880) // 48 hours
                : (int) config('auth.session_idle_timeout', 120);  // 2 hours

            $lastActive = $token->last_used_at ?? $token->created_at;

            if ($lastActive && $lastActive->diffInMinutes(now()) > $idleLimitMinutes) {
                $token->delete();

                return response()->json([
                    'status' => 'error',
                    'code' => 'SESSION_IDLE_TIMEOUT',
                    'message' => 'انتهت جلستك بسبب عدم النشاط لأكثر من ساعتين. يُرجى تسجيل الدخول مجدداً للحفاظ على أمان حسابك.',
                ], Response::HTTP_UNAUTHORIZED);
            }

            // Touch last activity if more than 60 seconds have elapsed (rate-limit DB updates)
            if (!$token->last_used_at || $token->last_used_at->diffInSeconds(now()) > 60) {
                $token->forceFill(['last_used_at' => now()])->save();
            }
        }

        // 2. Check Laravel Web Session (if present)
        if ($request->hasSession()) {
            $lastSessionActivity = $request->session()->get('user_last_activity_time');
            $sessionIdleMinutes = (int) config('auth.session_idle_timeout', 120);

            if ($lastSessionActivity && (time() - $lastSessionActivity > ($sessionIdleMinutes * 60))) {
                auth()->logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();

                if ($request->expectsJson()) {
                    return response()->json([
                        'status' => 'error',
                        'code' => 'SESSION_IDLE_TIMEOUT',
                        'message' => 'انتهت جلستك بسبب عدم النشاط. يُرجى تسجيل الدخول مجدداً.',
                    ], Response::HTTP_UNAUTHORIZED);
                }

                return redirect()->route('login')->with('warning', 'انتهت جلستك بسبب عدم النشاط. يُرجى تسجيل الدخول مجدداً للحفاظ على أمان بياناتك.');
            }

            $request->session()->put('user_last_activity_time', time());
        }

        return $next($request);
    }
}
