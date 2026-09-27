<?php

namespace App\Http\Middleware;

use App\Enums\UserRole;
use Closure;
use Illuminate\Http\Request;
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

        return $next($request);
    }
}
