<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyWebhookSignature
{
    /**
     * Handle an incoming request and verify its HMAC signature.
     */
    public function handle(Request $request, Closure $next, ?string $secretKey = null): Response
    {
        $signature = $request->header('X-Emperor-Signature') 
            ?? $request->header('X-Signature') 
            ?? $request->header('X-Hub-Signature-256');

        if (empty($signature)) {
            return response()->json([
                'success' => false,
                'message' => 'التوقيع الأمني مفقود في ترويسة الطلب (X-Emperor-Signature).',
            ], 401);
        }

        // Clean sha256= prefix if present (e.g. GitHub/Meta style)
        if (str_starts_with($signature, 'sha256=')) {
            $signature = substr($signature, 7);
        }

        $secret = $secretKey ?? config('services.webhook.secret', config('app.key'));
        $content = $request->getContent();

        $expectedSignature = hash_hmac('sha256', $content, $secret);

        if (!hash_equals($expectedSignature, $signature)) {
            return response()->json([
                'success' => false,
                'message' => 'التوقيع الأمني للويبهوك غير صحيح أو تم التلاعب بالبيانات.',
            ], 403);
        }

        return $next($request);
    }
}
