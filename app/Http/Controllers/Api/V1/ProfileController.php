<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\CompleteProfileRequest;
use App\Http\Requests\Api\V1\UpdatePasswordRequest;
use App\Http\Requests\Api\V1\UpdateProfileRequest;
use App\Http\Resources\UserResource;
use App\Services\WalletService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProfileController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected WalletService $walletService
    ) {}

    /**
     * Get authenticated user profile.
     */
    public function show(Request $request): JsonResponse
    {
        $user = $request->user()->load(['wallet', 'wallets']);

        return $this->successResponse(
            new UserResource($user),
            'تم جلب بيانات الملف الشخصي بنجاح'
        );
    }

    /**
     * Complete profile details (phone, currency, country, invite code).
     */
    public function completeProfile(CompleteProfileRequest $request): JsonResponse
    {
        $user = $request->user();
        $validated = $request->validated();

        $updateData = [
            'phone' => $validated['phone'],
            'currency' => $validated['currency'],
            'country' => $validated['country'] ?? $user->country,
        ];

        // Link referral code if provided and user doesn't already have a referrer
        if (!empty($validated['invite_code']) && empty($user->referrer_id)) {
            $referrer = \App\Models\User::where('referral_code', $validated['invite_code'])
                ->where('id', '!=', $user->id)
                ->first();

            if ($referrer) {
                $updateData['referrer_id'] = $referrer->id;
            }
        }

        $user->update($updateData);

        // Ensure wallet exists for selected currency
        $this->walletService->getOrCreateWallet($user, $validated['currency']);

        return $this->successResponse(
            new UserResource($user->fresh()->load('wallet')),
            'تم إكمال بيانات الحساب بنجاح'
        );
    }

    /**
     * Update authenticated user profile.
     */
    public function update(UpdateProfileRequest $request): JsonResponse
    {
        $user = $request->user();
        $validated = $request->validated();

        if ($request->hasFile('avatar')) {
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }
            $validated['avatar'] = $request->file('avatar')->store('avatars', 'public');
        }

        // If currency changed, ensure wallet exists for new currency
        if (isset($validated['currency']) && $validated['currency'] !== $user->currency) {
            $this->walletService->getOrCreateWallet($user, $validated['currency']);
        }

        $user->update($validated);

        return $this->successResponse(
            new UserResource($user->fresh()->load('wallet')),
            'تم تحديث البيانات بنجاح'
        );
    }

    /**
     * Update user password.
     */
    public function updatePassword(UpdatePasswordRequest $request): JsonResponse
    {
        $user = $request->user();
        $validated = $request->validated();

        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        return $this->successResponse(null, 'تم تغيير كلمة المرور بنجاح.');
    }

    /**
     * Enable 2FA authentication (generate secret, QR code, and recovery codes).
     */
    public function enable2FA(Request $request, \App\Services\TwoFactorService $twoFactorService): JsonResponse
    {
        $user = $request->user();
        $secret = $twoFactorService->generateSecretKey();
        $recoveryCodes = $twoFactorService->generateRecoveryCodes();
        $company = config('app.name', 'Emperor');

        $user->update([
            'two_factor_secret' => encrypt($secret),
            'two_factor_recovery_codes' => $recoveryCodes,
            'two_factor_confirmed_at' => null, // Not active until verified
        ]);

        $otpUrl = $twoFactorService->getOtpAuthUrl($company, $user->email, $secret);
        $qrSvg = $twoFactorService->getQrCodeSvg($company, $user->email, $secret);

        return $this->successResponse([
            'secret' => $secret,
            'qr_code_url' => $otpUrl,
            'qr_code_svg' => $qrSvg,
            'recovery_codes' => $recoveryCodes,
        ], 'تم إنشاء مفتاح المصادقة الثنائية، يرجى مسح رمز الاستجابة السريعة وتأكيد الكود لتفعيله.');
    }

    /**
     * Verify and activate 2FA code.
     */
    public function verify2FA(Request $request, \App\Services\TwoFactorService $twoFactorService): JsonResponse
    {
        $request->validate([
            'code' => ['required', 'string', 'size:6'],
        ], [
            'code.required' => 'يرجى إدخال رمز التحقق المكون من 6 أرقام.',
            'code.size' => 'يجب أن يتكون رمز التحقق من 6 أرقام.',
        ]);

        $user = $request->user();

        if (!$user->two_factor_secret) {
            return $this->errorResponse('لم يتم طلب تفعيل المصادقة الثنائية مسبقاً.');
        }

        try {
            $secret = decrypt($user->two_factor_secret);
        } catch (\Exception $e) {
            $secret = $user->two_factor_secret;
        }

        $code = $request->input('code');

        if (!$twoFactorService->verifyKey($secret, $code)) {
            return $this->errorResponse('رمز التحقق غير صحيح، يرجى المحاولة مرة أخرى والتأكد من ضبط وقت هاتفك بدقة.', \Symfony\Component\HttpFoundation\Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $user->update([
            'two_factor_confirmed_at' => now(),
        ]);

        return $this->successResponse([
            'two_factor_enabled' => true,
            'recovery_codes' => $user->two_factor_recovery_codes,
        ], 'تم تفعيل المصادقة الثنائية 2FA لحسابك بنجاح!');
    }

    /**
     * Disable 2FA authentication.
     */
    public function disable2FA(Request $request): JsonResponse
    {
        $request->validate([
            'password' => ['required', 'string'],
        ], [
            'password.required' => 'يرجى إدخال كلمة المرور الحالية لتأكيد الإلغاء.',
        ]);

        $user = $request->user();

        if (!Hash::check($request->input('password'), $user->password)) {
            return $this->errorResponse('كلمة المرور غير صحيحة.', \Symfony\Component\HttpFoundation\Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $user->update([
            'two_factor_secret' => null,
            'two_factor_recovery_codes' => null,
            'two_factor_confirmed_at' => null,
        ]);

        return $this->successResponse([
            'two_factor_enabled' => false,
        ], 'تم تعطيل المصادقة الثنائية 2FA بنجاح.');
    }

    /**
     * Get user 2FA recovery codes.
     */
    public function recoveryCodes(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user->two_factor_confirmed_at) {
            return $this->errorResponse('المصادقة الثنائية غير مفعلة لهذا الحساب.');
        }

        return $this->successResponse([
            'recovery_codes' => $user->two_factor_recovery_codes ?? [],
        ], 'تم جلب رموز الاسترداد بنجاح.');
    }

    /**
     * Update user Firebase Cloud Messaging (FCM) Push Notification Token.
     */
    public function updateFcmToken(Request $request): JsonResponse
    {
        $request->validate([
            'fcm_token' => ['required', 'string', 'max:500'],
        ], [
            'fcm_token.required' => 'رمز جهاز الإشعارات FCM مطلوب.',
        ]);

        $user = $request->user();
        $user->update([
            'fcm_token' => $request->input('fcm_token'),
        ]);

        return $this->successResponse(null, 'تم تحديث رمز إشعارات الجهاز بنجاح.');
    }
}
