<?php

namespace App\Http\Controllers\Api\V1\External;

use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BalanceController extends Controller
{
    use ApiResponse;

    /**
     * Get the authenticated API client's wallet balance and rate limit info.
     */
    public function show(Request $request): JsonResponse
    {
        $client = $request->attributes->get('api_client') ?? $request->user() ?? auth()->user();
        $wallet = $client->wallet;

        return response()->json([
            'status' => 'success',
            'data' => [
                'client_name' => $client->name,
                'email' => $client->email,
                'balance' => (float) ($wallet?->balance ?? 0),
                'currency' => $client->currency ?? 'EGP',
                'is_active' => $client->isActive(),
                'rate_limit_per_minute' => $client->api_rate_limit ?: 60,
                'webhook_configured' => !empty($client->webhook_url),
                'webhook_url' => $client->webhook_url,
                'ip_whitelist' => $client->api_ip_whitelist ?? [],
                'timestamp' => now()->toIso8601String(),
            ],
        ]);
    }
}
