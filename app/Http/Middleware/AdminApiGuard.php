<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminApiGuard
{
    /**
     * Handle an incoming request for administrative API endpoints.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'يجب تسجيل الدخول أولاً للوصول إلى هذا المورد.',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $isAdmin = (bool) ($user->isAdmin() || ($user->role?->value ?? $user->role) === 'admin');
        $hasStaffRole = method_exists($user, 'hasAnyRole') && $user->hasAnyRole(['admin', 'super_admin', 'operations_manager', 'finance_manager', 'support_agent']);

        if (!$isAdmin && !$hasStaffRole) {
            return response()->json([
                'status' => 'error',
                'message' => 'غير مصرح لك بالوصول إلى لوحة التحكم والإدارة.',
            ], Response::HTTP_FORBIDDEN);
        }

        return $next($request);
    }
}

