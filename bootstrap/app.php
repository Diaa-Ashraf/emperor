<?php

use App\Http\Middleware\AdminOnly;
use App\Http\Middleware\ForceCompleteProfile;
use App\Http\Middleware\IdempotencyCheck;
use App\Http\Middleware\LogApiRequest;
use App\Http\Middleware\SetLocale;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        then: function () {
            Route::middleware('web')
                ->group(base_path('routes/admin.php'));
        }
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Global web middleware
        $middleware->web(append: [
            SetLocale::class,
            \App\Http\Middleware\SecurityHeadersMiddleware::class,
        ]);

        // Global api middleware
        $middleware->api(append: [
            \App\Http\Middleware\SecurityHeadersMiddleware::class,
        ]);

        // Middleware Aliases
        $middleware->alias([
            'admin.only' => AdminOnly::class,
            'locale' => SetLocale::class,
            'force.profile' => ForceCompleteProfile::class,
            'idempotent' => IdempotencyCheck::class,
            'log.api' => LogApiRequest::class,
            'security.headers' => \App\Http\Middleware\SecurityHeadersMiddleware::class,
            'verify.webhook' => \App\Http\Middleware\VerifyWebhookSignature::class,
            'auth.api_client' => \App\Http\Middleware\AuthenticateApiClient::class,
            'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
            'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
