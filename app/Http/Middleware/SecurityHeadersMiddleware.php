<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeadersMiddleware
{
    /**
     * Handle an incoming request and attach enterprise security headers.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Security headers
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
        $response->headers->set('X-XSS-Protection', '1; mode=block');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

        // Content Security Policy for modern SPA + fonts + assets
        if (!$response->headers->has('Content-Security-Policy')) {
            $viteDevServerSource = '';

            if (app()->environment('local') && is_file(public_path('hot'))) {
                $viteUrl = parse_url(trim(file_get_contents(public_path('hot'))));
                $viteHost = trim($viteUrl['host'] ?? '', '[]');

                if (in_array($viteHost, ['localhost', '127.0.0.1'], true)) {
                    $viteHost = str_contains($viteHost, ':') ? "[{$viteHost}]" : $viteHost;
                    $vitePort = isset($viteUrl['port']) ? ":{$viteUrl['port']}" : '';
                    $viteScheme = in_array($viteUrl['scheme'] ?? '', ['http', 'https'], true)
                        ? $viteUrl['scheme']
                        : 'http';

                    $viteDevServerSource = " {$viteScheme}://{$viteHost}{$vitePort}";
                }
            }

           $csp = "default-src 'self'; "
                . "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://www.gstatic.com https://*.firebaseio.com{$viteDevServerSource}; "
                . "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com{$viteDevServerSource}; "
                . "font-src 'self' https://fonts.gstatic.com data:; "
                . "img-src 'self' data: blob: https:; "
                . "connect-src 'self' http: https: ws: wss:; "
                . "media-src 'self' blob:{$viteDevServerSource}; "
                . "frame-src 'self' https://accounts.google.com https://*.firebaseapp.com;";

            $response->headers->set('Content-Security-Policy', $csp);
        }

        // HSTS in production
        if (app()->environment('production')) {
            $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
        }

        return $response;
    }
}
