<?php

namespace App\Http\Middleware;

use App\Models\ApiLog;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LogApiRequest
{
    public function handle(Request $request, Closure $next): Response
    {
        $startTime = microtime(true);

        $response = $next($request);

        $duration = (int) round((microtime(true) - $startTime) * 1000);

        try {
            ApiLog::create([
                'user_id' => $request->user()?->id,
                'method' => $request->method(),
                'endpoint' => $request->path(),
                'request_headers' => $request->headers->all(),
                'request_body' => $request->except(['password', 'password_confirmation', 'api_secret']),
                'response_status' => $response->getStatusCode(),
                'response_body' => json_decode($response->getContent(), true) ?? null,
                'ip_address' => $request->ip(),
                'duration_ms' => $duration,
                'created_at' => now(),
            ]);
        } catch (\Throwable $e) {
            // Ignore logging failures to prevent request crash
        }

        return $response;
    }
}
