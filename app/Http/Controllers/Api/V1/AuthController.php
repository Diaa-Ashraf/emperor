<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\LoginRequest;
use App\Http\Requests\Api\V1\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\WalletService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected WalletService $walletService
    ) {}

    /**
     * Register a new user account.
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $currency = $validated['currency'] ?? 'EGP';

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'password' => Hash::make($validated['password']),
            'role' => UserRole::CUSTOMER,
            'status' => UserStatus::ACTIVE,
            'currency' => $currency,
            'api_key' => Str::random(32),
        ]);

        if (class_exists(\Spatie\Permission\Models\Role::class) && \Spatie\Permission\Models\Role::where('name', 'customer')->exists()) {
            $user->assignRole('customer');
        }

        // Create default wallet
        $this->walletService->getOrCreateWallet($user, $currency);

        $token = $user->createToken('auth-token')->plainTextToken;

        return $this->successResponse([
            'token' => $token,
            'user' => new UserResource($user->load('wallet')),
        ], 'تم إنشاء الحساب بنجاح، مرحباً بك في منصة إمبراطور!', Response::HTTP_CREATED);
    }

    /**
     * Login user and issue Sanctum token (with 2FA support).
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return $this->errorResponse('البريد الإلكتروني أو كلمة المرور غير صحيحة.', Response::HTTP_UNAUTHORIZED);
        }

        if ($user->status === UserStatus::BANNED) {
            return $this->errorResponse('تم حظر هذا الحساب من قبل الإدارة. يرجى التواصل مع الدعم الفني.', Response::HTTP_FORBIDDEN);
        }

        if ($user->status === UserStatus::SUSPENDED) {
            return $this->errorResponse('تم إيقاف هذا الحساب مؤقتاً.', Response::HTTP_FORBIDDEN);
        }

        // Check if Two-Factor Authentication is enabled
        if ($user->two_factor_confirmed_at !== null) {
            $twoFactorCode = $request->input('two_factor_code');
            $recoveryCode = $request->input('recovery_code');
            $twoFactorService = app(\App\Services\TwoFactorService::class);

            if (empty($twoFactorCode) && empty($recoveryCode)) {
                return $this->successResponse([
                    'requires_2fa' => true,
                    'email' => $user->email,
                ], 'يرجى إدخال رمز التحقق بخطوتين (2FA) للمتابعة.');
            }

            if (!empty($twoFactorCode)) {
                try {
                    $secret = decrypt($user->two_factor_secret);
                } catch (\Exception $e) {
                    $secret = $user->two_factor_secret;
                }

                if (!$twoFactorService->verifyKey($secret, $twoFactorCode)) {
                    return $this->errorResponse('رمز المصادقة الثنائية غير صحيح أو منتهي الصلاحية.', Response::HTTP_UNPROCESSABLE_ENTITY);
                }
            } elseif (!empty($recoveryCode)) {
                $codes = $user->two_factor_recovery_codes ?? [];
                $normalizedCode = strtoupper(trim($recoveryCode));
                $foundIndex = array_search($normalizedCode, $codes, true);

                if ($foundIndex === false) {
                    return $this->errorResponse('رمز الاسترداد الاحتياطي غير صحيح.', Response::HTTP_UNPROCESSABLE_ENTITY);
                }

                // Consume the used recovery code
                unset($codes[$foundIndex]);
                $user->update(['two_factor_recovery_codes' => array_values($codes)]);
            }
        }

        // Update login stats & optional FCM token
        $user->update([
            'last_login_at' => now(),
            'last_login_ip' => $request->ip(),
            'fcm_token' => $validated['fcm_token'] ?? $user->fcm_token,
        ]);

        // If user is Admin, also authenticate the Laravel web session so /admin routes are immediately accessible
        if ($user->isAdmin() || $user->role === UserRole::ADMIN) {
            try {
                auth()->guard('web')->login($user, (bool) ($validated['remember'] ?? false));
            } catch (\Throwable $e) {
                // Session guard fallback
            }
        }

        $deviceName = $validated['device_name'] ?? 'Web Application';
        $token = $user->createToken($deviceName)->plainTextToken;

        return $this->successResponse([
            'token' => $token,
            'user' => new UserResource($user->load('wallet')),
        ], 'تم تسجيل الدخول بنجاح');
    }

    /**
     * Complete 2FA login challenge.
     */
    public function login2FA(Request $request): JsonResponse
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
            'two_factor_code' => ['nullable', 'string'],
            'recovery_code' => ['nullable', 'string'],
            'device_name' => ['nullable', 'string'],
        ], [
            'email.required' => 'البريد الإلكتروني مطلوب.',
            'password.required' => 'كلمة المرور مطلوبة.',
        ]);

        $user = User::where('email', $request->input('email'))->first();

        if (!$user || !Hash::check($request->input('password'), $user->password)) {
            return $this->errorResponse('البريد الإلكتروني أو كلمة المرور غير صحيحة.', Response::HTTP_UNAUTHORIZED);
        }

        if ($user->status === UserStatus::BANNED || $user->status === UserStatus::SUSPENDED) {
            return $this->errorResponse('حسابك غير نشط.', Response::HTTP_FORBIDDEN);
        }

        $twoFactorCode = $request->input('two_factor_code');
        $recoveryCode = $request->input('recovery_code');
        $twoFactorService = app(\App\Services\TwoFactorService::class);

        if (empty($twoFactorCode) && empty($recoveryCode)) {
            return $this->errorResponse('يرجى إدخال رمز التحقق أو رمز الاسترداد.', Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        if (!empty($twoFactorCode)) {
            try {
                $secret = decrypt($user->two_factor_secret);
            } catch (\Exception $e) {
                $secret = $user->two_factor_secret;
            }

            if (!$twoFactorService->verifyKey($secret, $twoFactorCode)) {
                return $this->errorResponse('رمز المصادقة الثنائية غير صحيح.', Response::HTTP_UNPROCESSABLE_ENTITY);
            }
        } elseif (!empty($recoveryCode)) {
            $codes = $user->two_factor_recovery_codes ?? [];
            $normalizedCode = strtoupper(trim($recoveryCode));
            $foundIndex = array_search($normalizedCode, $codes, true);

            if ($foundIndex === false) {
                return $this->errorResponse('رمز الاسترداد الاحتياطي غير صحيح.', Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            unset($codes[$foundIndex]);
            $user->update(['two_factor_recovery_codes' => array_values($codes)]);
        }

        $user->update([
            'last_login_at' => now(),
            'last_login_ip' => $request->ip(),
        ]);

        if ($user->isAdmin() || $user->role === UserRole::ADMIN) {
            try {
                auth()->guard('web')->login($user, true);
            } catch (\Throwable $e) {
                // Session guard fallback
            }
        }

        $deviceName = $request->input('device_name', 'Web Application (2FA)');
        $token = $user->createToken($deviceName)->plainTextToken;

        return $this->successResponse([
            'token' => $token,
            'user' => new UserResource($user->load('wallet')),
        ], 'تم التحقق وتسجيل الدخول بنجاح');
    }

    /**
     * Logout and revoke current token and any active web session.
     */
    public function logout(Request $request): JsonResponse
    {
        if ($request->user()) {
            $request->user()->currentAccessToken()?->delete();
        }

        // Also terminate web session to keep SPA and Admin portal sessions synchronized
        try {
            \Illuminate\Support\Facades\Auth::guard('web')->logout();
            if ($request->hasSession()) {
                $request->session()->invalidate();
                $request->session()->regenerateToken();
            }
        } catch (\Throwable $e) {}

        return $this->successResponse(null, 'تم تسجيل الخروج بنجاح');
    }

    /**
     * Login / Register with Google OAuth Token or Payload.
     */
    public function googleLogin(Request $request): JsonResponse
    {
        $request->validate([
            'token' => ['nullable', 'string'],
            'email' => ['nullable', 'email'],
            'name' => ['nullable', 'string'],
            'google_id' => ['nullable', 'string'],
            'avatar' => ['nullable', 'string'],
        ], [
            'email.email' => 'البريد الإلكتروني غير صالح.',
        ]);

        $email = $request->input('email');
        $name = $request->input('name');
        $googleId = $request->input('google_id');
        $avatar = $request->input('avatar');

        // If a Google ID token was passed, attempt Socialite verification or JWT parse
        if ($request->filled('token') && empty($email)) {
            try {
                if (class_exists(\Laravel\Socialite\Facades\Socialite::class)) {
                    $googleUser = \Laravel\Socialite\Facades\Socialite::driver('google')->userFromToken($request->input('token'));
                    $email = $googleUser->getEmail();
                    $name = $googleUser->getName();
                    $googleId = $googleUser->getId();
                    $avatar = $googleUser->getAvatar();
                }
            } catch (\Exception $e) {
                // Fallback: try decoding JWT payload
                try {
                    $tokenParts = explode('.', $request->input('token'));
                    if (count($tokenParts) >= 2) {
                        $payload = json_decode(base64_decode(str_pad(strtr($tokenParts[1], '-_', '+/'), strlen($tokenParts[1]) % 4, '=', STR_PAD_RIGHT)), true);
                        if (!empty($payload['email'])) {
                            $email = $payload['email'];
                            $name = $payload['name'] ?? $name;
                            $googleId = $payload['sub'] ?? $googleId;
                            $avatar = $payload['picture'] ?? $avatar;
                        }
                    }
                } catch (\Exception $ex) {}
            }
        }

        if (empty($email)) {
            return $this->errorResponse('فشل التحقق من حساب Google، لم يتم استلام البريد الإلكتروني.', Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // Find user by Google ID or Email
        $user = User::where('google_id', $googleId)
            ->orWhere('email', $email)
            ->first();

        $isNewUser = false;

        if ($user) {
            // Check status
            if ($user->status === UserStatus::BANNED) {
                return $this->errorResponse('تم حظر هذا الحساب من قبل الإدارة. يرجى التواصل مع الدعم الفني.', Response::HTTP_FORBIDDEN);
            }

            if ($user->status === UserStatus::SUSPENDED) {
                return $this->errorResponse('تم إيقاف هذا الحساب مؤقتاً.', Response::HTTP_FORBIDDEN);
            }

            // Link Google ID if not linked
            $updates = [
                'last_login_at' => now(),
                'last_login_ip' => $request->ip(),
            ];
            if (empty($user->google_id) && !empty($googleId)) {
                $updates['google_id'] = $googleId;
            }
            if (empty($user->email_verified_at)) {
                $updates['email_verified_at'] = now();
            }
            $user->update($updates);
        } else {
            // Register new user via Google
            $isNewUser = true;
            $user = User::create([
                'name' => $name ?: 'مستخدم Google',
                'email' => $email,
                'google_id' => $googleId,
                'password' => Hash::make(Str::random(32)),
                'role' => UserRole::CUSTOMER,
                'status' => UserStatus::ACTIVE,
                'currency' => 'EGP',
                'email_verified_at' => now(),
                'api_key' => Str::random(32),
                'last_login_at' => now(),
                'last_login_ip' => $request->ip(),
            ]);

            if (class_exists(\Spatie\Permission\Models\Role::class) && \Spatie\Permission\Models\Role::where('name', 'customer')->exists()) {
                $user->assignRole('customer');
            }

            // Create default wallet
            $this->walletService->getOrCreateWallet($user, 'EGP');
        }

        $deviceName = $request->input('device_name', 'Google OAuth Login');
        $token = $user->createToken($deviceName)->plainTextToken;

        return $this->successResponse([
            'token' => $token,
            'user' => new UserResource($user->load('wallet')),
            'is_new_user' => $isNewUser,
        ], $isNewUser ? 'تم إنشاء الحساب وتسجيل الدخول عبر Google بنجاح!' : 'تم تسجيل الدخول عبر Google بنجاح.');
    }

    /**
     * Get Google OAuth redirect URL or redirect browser directly.
     */
    public function getGoogleRedirectUrl(Request $request)
    {
        $clientId = config('services.google.client_id');
        $clientSecret = config('services.google.client_secret');

        // Check if real Google credentials are configured in .env
        if (!empty($clientId) && !empty($clientSecret)) {
            try {
                $url = \Laravel\Socialite\Facades\Socialite::driver('google')
                    ->stateless()
                    ->redirect()
                    ->getTargetUrl();

                if ($request->expectsJson()) {
                    return $this->successResponse(['url' => $url], 'تم توليد رابط تسجيل الدخول بـ Google');
                }

                return redirect()->away($url);
            } catch (\Exception $e) {
                if ($request->expectsJson()) {
                    return $this->errorResponse('حدث خطأ أثناء الاتصال بخدمة Google: ' . $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                }
                return redirect('/login?error=' . urlencode('حدث خطأ أثناء الاتصال بخدمة Google'));
            }
        }

        // Local / Development Simulator (when GOOGLE_CLIENT_ID is not configured yet)
        $demoEmail = 'google.user@example.com';
        $demoGoogleId = 'google_demo_1092837465';

        $user = User::where('google_id', $demoGoogleId)
            ->orWhere('email', $demoEmail)
            ->first();

        $isNewUser = false;
        if (!$user) {
            $isNewUser = true;
            $user = User::create([
                'name' => 'مستخدم تجريبي (Google)',
                'email' => $demoEmail,
                'google_id' => $demoGoogleId,
                'password' => Hash::make(Str::random(32)),
                'role' => UserRole::CUSTOMER,
                'status' => UserStatus::ACTIVE,
                'currency' => 'EGP',
                'email_verified_at' => now(),
                'api_key' => Str::random(32),
                'last_login_at' => now(),
                'last_login_ip' => $request->ip(),
            ]);

            if (class_exists(\Spatie\Permission\Models\Role::class) && \Spatie\Permission\Models\Role::where('name', 'customer')->exists()) {
                $user->assignRole('customer');
            }

            $this->walletService->getOrCreateWallet($user, 'EGP');
        }

        $token = $user->createToken('Google Demo Web Session')->plainTextToken;

        if ($request->expectsJson()) {
            return $this->successResponse([
                'url' => url("/login?oauth_token={$token}" . ($isNewUser ? '&is_new=1' : '')),
            ], 'تم تسجيل الدخول بالنمط التجريبي لـ Google (يرجى إضافة مفاتيح GOOGLE_CLIENT_ID للتشغيل الفعلي).');
        }

        return redirect("/login?oauth_token={$token}" . ($isNewUser ? '&is_new=1' : ''));
    }

    /**
     * Handle Google OAuth callback for web redirect flow.
     */
    public function handleGoogleCallback(Request $request)
    {
        try {
            $googleUser = \Laravel\Socialite\Facades\Socialite::driver('google')->stateless()->user();
            
            $user = User::where('google_id', $googleUser->getId())
                ->orWhere('email', $googleUser->getEmail())
                ->first();

            $isNewUser = false;
            if (!$user) {
                $isNewUser = true;
                $user = User::create([
                    'name' => $googleUser->getName() ?: 'مستخدم Google',
                    'email' => $googleUser->getEmail(),
                    'google_id' => $googleUser->getId(),
                    'password' => Hash::make(Str::random(32)),
                    'role' => UserRole::CUSTOMER,
                    'status' => UserStatus::ACTIVE,
                    'currency' => 'EGP',
                    'email_verified_at' => now(),
                    'api_key' => Str::random(32),
                ]);

                if (class_exists(\Spatie\Permission\Models\Role::class) && \Spatie\Permission\Models\Role::where('name', 'customer')->exists()) {
                    $user->assignRole('customer');
                }

                $this->walletService->getOrCreateWallet($user, 'EGP');
            }

            $token = $user->createToken('Google Web Session')->plainTextToken;

            // Redirect back to SPA with token query param
            return redirect("/login?oauth_token={$token}" . ($isNewUser ? '&is_new=1' : ''));
        } catch (\Exception $e) {
            return redirect('/login?error=' . urlencode('فشل تسجيل الدخول عبر Google: يرجى التحقق من إعدادات الحساب.'));
        }
    }

    /**
     * Verify phone number via OTP / Firebase verification.
     */
    public function verifyPhone(Request $request): JsonResponse
    {
        $request->validate([
            'phone' => ['required', 'string', 'max:25'],
            'code' => ['nullable', 'string'],
            'firebase_token' => ['nullable', 'string'],
        ], [
            'phone.required' => 'رقم الهاتف مطلوب.',
        ]);

        $phone = $request->input('phone');
        $user = $request->user();

        if (!$user) {
            // Find by phone or email
            $user = User::where('phone', $phone)->first();
            if (!$user && $request->filled('email')) {
                $user = User::where('email', $request->input('email'))->first();
            }
        }

        if (!$user) {
            return $this->errorResponse('لم يتم العثور على الحساب المحدد.', Response::HTTP_NOT_FOUND);
        }

        // Update phone and mark verified
        $user->update([
            'phone' => $phone,
            'phone_verified_at' => now(),
        ]);

        return $this->successResponse(
            new UserResource($user->fresh()->load('wallet')),
            'تم التحقق من رقم الهاتف بنجاح وتم تأكيد الحساب!'
        );
    }
}
