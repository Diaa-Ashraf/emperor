<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class FirewallShieldMiddleware
{
    /**
     * Max allowed requests in short burst window (3 seconds).
     */
    protected const BURST_MAX_REQUESTS = 35;
    protected const BURST_WINDOW_SECONDS = 3;

    /**
     * Auto-ban duration in seconds when burst limit is violated (10 minutes).
     */
    protected const BAN_DURATION_SECONDS = 600;

    /**
     * Malicious patterns and known bot scanners to block immediately.
     */
    protected const MALICIOUS_PATTERNS = [
        '/\.env/i',
        '/\/wp-(?:admin|login|content|includes)/i',
        '/\/xmlrpc\.php/i',
        '/\/phpmyadmin/i',
        '/\/pma/i',
        '/\/eval-stdin\.php/i',
        '/\/actuator/i',
        '/\/cgi-bin/i',
        '/\/shell/i',
        '/\/telescope/i',
        '/\/swagger/i',
        '/(?:union\s+select|select\s+benchmark|sleep\(\d+\))/i',
    ];

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Don't apply firewall blocking in testing environment
        if (app()->environment('testing')) {
            return $next($request);
        }

        $ip = $request->ip() ?: 'unknown';

        // 1. Check if IP is currently banned due to flood/scanning
        $banKey = "firewall:banned:{$ip}";
        if (Cache::has($banKey)) {
            $remaining = Cache::get($banKey);
            return response()->json([
                'status' => 'error',
                'code' => 'IP_TEMPORARILY_BLOCKED',
                'message' => 'تم حظر اتصالك مؤقتاً لحماية المنصة بسبب إرسال طلبات مكثفة أو مشبوهة. يرجى الانتظار 10 دقائق.',
            ], 429, [
                'Retry-After' => (string) max(60, is_numeric($remaining) ? $remaining : 600),
            ]);
        }

        // 2. Immediate Malicious Scanner & Path Traversal Drop
        $uri = $request->getRequestUri();
        foreach (self::MALICIOUS_PATTERNS as $pattern) {
            if (preg_match($pattern, $uri)) {
                // Ban IP for 1 hour on scanner probes
                Cache::put($banKey, 3600, 3600);
                Log::warning("Firewall blocked malicious probe from IP [{$ip}] on URI [{$uri}]");

                return response()->json([
                    'status' => 'error',
                    'code' => 'PROBE_REJECTED',
                    'message' => 'تم رفض الطلب وحظر الاتصال.',
                ], 403);
            }
        }

        // 3. Oversized Request Body Check (DoS memory exhaustion mitigation)
        // Allow up to 12MB for file uploads, limit JSON payloads to 2MB
        $contentLength = (int) $request->header('Content-Length', 0);
        $isUploadRoute = $request->is('*/deposits*', '*/upload*', 'admin/*');
        $maxAllowed = $isUploadRoute ? 12 * 1024 * 1024 : 2 * 1024 * 1024;

        if ($contentLength > $maxAllowed) {
            return response()->json([
                'status' => 'error',
                'code' => 'PAYLOAD_TOO_LARGE',
                'message' => 'حجم البيانات المرسلة كبير جداً وغير مسموح به.',
            ], 413);
        }

        // 4. Short-Window Burst / DDoS Flood Detection
        // Prevents multithreaded flood scripts from hitting controllers and database
        $burstKey = "firewall:burst:{$ip}:" . (int) (time() / self::BURST_WINDOW_SECONDS);
        $burstHits = Cache::increment($burstKey);

        if ($burstHits === 1) {
            Cache::put($burstKey, 1, self::BURST_WINDOW_SECONDS + 1);
        }

        if ($burstHits > self::BURST_MAX_REQUESTS) {
            // Auto quarantine IP for 10 minutes
            Cache::put($banKey, self::BAN_DURATION_SECONDS, self::BAN_DURATION_SECONDS);
            Log::alert("DDoS/Flood attempt detected from IP [{$ip}]: {$burstHits} requests in " . self::BURST_WINDOW_SECONDS . "s. IP quarantined for 10 minutes.");

            return response()->json([
                'status' => 'error',
                'code' => 'RATE_LIMIT_EXCEEDED',
                'message' => 'تم رصد تدفق غير طبيعي للطلبات من جهازك. تم تعليق الاتصال مؤقتاً لحماية المنصة.',
            ], 429, [
                'Retry-After' => (string) self::BAN_DURATION_SECONDS,
            ]);
        }

        return $next($request);
    }
}
