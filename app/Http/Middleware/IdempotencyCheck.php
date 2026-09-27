<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class IdempotencyCheck
{
    public function handle(Request $request, Closure $next): Response
    {
        $idempotencyKey = $request->header('X-Idempotency-Key', $request->input('idempotency_key'));

        if ($idempotencyKey) {
            $cacheKey = 'idempotency_' . md5($idempotencyKey . '_' . $request->user()?->id);

            if (Cache::has($cacheKey)) {
                $cachedResponse = Cache::get($cacheKey);
                return response()->json($cachedResponse['data'], $cachedResponse['status']);
            }

            $response = $next($request);

            if ($response->getStatusCode() >= 200 && $response->getStatusCode() < 300) {
                Cache::put($cacheKey, [
                    'status' => $response->getStatusCode(),
                    'data' => json_decode($response->getContent(), true),
                ], now()->addMinutes(60));
            }

            return $response;
        }

        return $next($request);
    }
}
