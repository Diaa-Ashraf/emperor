<?php

namespace App\Http\Middleware;

use App\Enums\UserRole;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminOnly
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user || ($user->role !== UserRole::ADMIN && !$user->hasRole('admin'))) {
            if ($request->expectsJson()) {
                return response()->json(['status' => 'error', 'message' => 'غير مصرح لك بالوصول لهذه الصفحة.'], Response::HTTP_FORBIDDEN);
            }

            return redirect()->route('login')->with('error', 'يجب تسجيل الدخول كمسؤول للوصول إلى لوحة التحكم.');
        }

        // Idle Timeout Check for Admin security
        if ($request->hasSession()) {
            $lastActivity = $request->session()->get('admin_last_activity_time');
            $timeoutMinutes = (int) config('auth.admin_timeout_minutes', 60);

            if ($lastActivity && (time() - $lastActivity > ($timeoutMinutes * 60))) {
                Auth::guard('web')->logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();

                if ($request->expectsJson()) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'انتهت جلستك بسبب عدم النشاط للحفاظ على أمان المنصة.'
                    ], Response::HTTP_UNAUTHORIZED);
                }

                return redirect()->route('login')->with('warning', 'انتهت جلستك بسبب عدم النشاط لأكثر من '.$timeoutMinutes.' دقيقة. يُرجى تسجيل الدخول مجدداً للحفاظ على أمان البيانات.');
            }

            $request->session()->put('admin_last_activity_time', time());
        }

        return $next($request);
    }
}
