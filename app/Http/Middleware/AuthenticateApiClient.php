<?php

namespace App\Http\Middleware;

use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Models\ApiLog;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateApiClient
{
    public function handle(Request $request, Closure $next): Response
    {
        $startTime = microtime(true);

        $apiKey = $request->header('X-API-Key') ?? $request->header('x-api-key') ?? $request->bearerToken();
        $apiSecret = $request->header('X-API-Secret') ?? $request->header('x-api-secret');

        if (!$apiKey || !$apiSecret) {
            return response()->json([
                'status' => 'error',
                'message' => 'بيانات الاعتماد غير مكتملة. يرجى تمرير X-API-Key و X-API-Secret في ترويسة الطلب (Headers).',
                'code' => 'UNAUTHORIZED_MISSING_CREDENTIALS',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $client = User::where('api_key', $apiKey)
            ->where('role', UserRole::API_CLIENT)
            ->first();

        if (!$client) {
            return response()->json([
                'status' => 'error',
                'message' => 'مفتاح الـ API (API Key) غير صالح أو الحساب غير مسجل كعميل API.',
                'code' => 'INVALID_API_KEY',
            ], Response::HTTP_UNAUTHORIZED);
        }

        // Verify Secret Hash
        $hashedInput = hash('sha256', $apiSecret);
        if ($client->api_secret !== $hashedInput && $client->api_secret !== $apiSecret) {
            return response()->json([
                'status' => 'error',
                'message' => 'الرمز السري (API Secret) غير صحيح.',
                'code' => 'INVALID_API_SECRET',
            ], Response::HTTP_UNAUTHORIZED);
        }

        if ($client->status !== UserStatus::ACTIVE) {
            return response()->json([
                'status' => 'error',
                'message' => 'حساب الـ API هذا معطل أو موقوف مؤقتاً.',
                'code' => 'ACCOUNT_SUSPENDED',
            ], Response::HTTP_FORBIDDEN);
        }

        // IP Whitelisting Check
        $whitelist = $client->api_ip_whitelist;
        if (!empty($whitelist) && is_array($whitelist)) {
            $clientIp = $request->ip();
            if (!in_array($clientIp, $whitelist, true) && !in_array('*', $whitelist, true)) {
                return response()->json([
                    'status' => 'error',
                    'message' => "عنوان IP الخاص بك ({$clientIp}) غير مصرح له باستخدام مفتاح الـ API هذا.",
                    'code' => 'IP_NOT_WHITELISTED',
                ], Response::HTTP_FORBIDDEN);
            }
        }

        // Rate Limiting per Client
        $rateLimit = $client->api_rate_limit ?: 60;
        $rateLimiterKey = "api_client:{$client->id}";
        if (RateLimiter::tooManyAttempts($rateLimiterKey, $rateLimit)) {
            $retryAfter = RateLimiter::availableIn($rateLimiterKey);
            return response()->json([
                'status' => 'error',
                'message' => 'تم تجاوز الحد الأقصى المسموح به من الطلبات في الدقيقة (Rate Limit Exceeded).',
                'code' => 'RATE_LIMIT_EXCEEDED',
                'retry_after_seconds' => $retryAfter,
            ], Response::HTTP_TOO_MANY_REQUESTS);
        }
        RateLimiter::hit($rateLimiterKey, 60);

        // Bind user to request
        $request->attributes->set('api_client', $client);
        $request->setUserResolver(fn() => $client);
        auth()->setUser($client);
        if (app()->bound('auth')) {
            auth()->guard()->setUser($client);
        }

        // Execute Request
        $response = $next($request);

        $durationMs = (int) round((microtime(true) - $startTime) * 1000);

        // Asynchronously or directly log API Request
        try {
            $sanitizedHeaders = collect($request->headers->all())
                ->except(['authorization', 'x-api-secret', 'cookie'])
                ->toArray();

            $responseBody = null;
            if ($response instanceof \Illuminate\Http\JsonResponse) {
                $responseBody = $response->getData(true);
            }

            ApiLog::create([
                'user_id' => $client->id,
                'method' => $request->method(),
                'endpoint' => $request->path(),
                'request_headers' => $sanitizedHeaders,
                'request_body' => $request->except(['password', 'api_secret']),
                'response_status' => $response->getStatusCode(),
                'response_body' => $responseBody,
                'ip_address' => $request->ip(),
                'duration_ms' => $durationMs,
                'created_at' => now(),
            ]);
        } catch (\Throwable $e) {
            // Do not break API response on logging error
        }

        return $response;
    }
}
