<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ForceCompleteProfile
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && empty($user->phone) && !$request->is('profile*') && !$request->is('logout') && !$request->is('api/*')) {
            // Optional redirect or warning if phone is required
        }

        return $next($request);
    }
}
