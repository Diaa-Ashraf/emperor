<?php

namespace App\Services;

use App\DTOs\NotificationPayloadDTO;
use App\Enums\WalletTxType;
use App\Jobs\SendNotificationJob;
use App\Models\ReferralCommission;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class ReferralService
{
    public function __construct(
        protected WalletService $walletService
    ) {}

    /**
     * Get user's referral summary and earnings.
     */
    public function getReferralStats(User $user): array
    {
        if (empty($user->referral_code)) {
            $user->referral_code = strtoupper(substr(preg_replace('/[^a-zA-Z0-9]/', '', $user->name ?? 'EMP'), 0, 4) . rand(1000, 9999));
            $user->saveQuietly();
        }

        $totalInvited = User::where('referrer_id', $user->id)->count();
        $totalEarned = (float) ReferralCommission::where('referrer_id', $user->id)
            ->where('status', 'paid')
            ->sum('amount');

        $recentCommissions = ReferralCommission::where('referrer_id', $user->id)
            ->with(['referredUser:id,name,email,created_at'])
            ->latest('id')
            ->take(5)
            ->get();

        $referralPercentage = (float) Setting::get('referral_percentage', 2.0);
        $referralLink = config('app.url') . '/register?ref=' . $user->referral_code;

        return [
            'referral_code' => $user->referral_code,
            'referral_link' => $referralLink,
            'referral_percentage' => $referralPercentage,
            'total_invited' => $totalInvited,
            'total_earned' => round($totalEarned, 2),
            'currency' => $user->currency ?? 'EGP',
            'recent_commissions' => $recentCommissions,
        ];
    }

    /**
     * Get paginated invited users list.
     */
    public function getInvitedUsers(User $user, int $perPage = 15): LengthAwarePaginator
    {
        return User::where('referrer_id', $user->id)
            ->select(['id', 'name', 'email', 'phone', 'created_at'])
            ->withSum(['referralCommissions as total_commission_generated' => function ($q) use ($user) {
                $q->where('referrer_id', $user->id);
            }], 'amount')
            ->latest('id')
            ->paginate($perPage);
    }

    /**
     * Bind a referrer to a new or incomplete user profile.
     */
    public function bindReferrer(User $user, ?string $referralCode): bool
    {
        if (empty($referralCode) || $user->referrer_id) {
            return false;
        }

        $referrer = User::where('referral_code', trim($referralCode))
            ->where('id', '!=', $user->id)
            ->first();

        if ($referrer) {
            $user->update(['referrer_id' => $referrer->id]);
            return true;
        }

        return false;
    }

    /**
     * Reward the referrer when an event (deposit or completed order) occurs.
     */
    public function rewardReferrer(User $referredUser, float $amount, string $sourceType, int $sourceId): ?ReferralCommission
    {
        if (!$referredUser->referrer_id || $amount <= 0) {
            return null;
        }

        $isActive = (bool) Setting::get('referral_is_active', true);
        if (!$isActive) {
            return null;
        }

        $allowedTrigger = Setting::get('referral_trigger', 'deposit'); // deposit, order, both
        if ($allowedTrigger !== 'both' && $allowedTrigger !== $sourceType) {
            return null;
        }

        $percentage = (float) Setting::get('referral_percentage', 2.0);
        if ($percentage <= 0) {
            return null;
        }

        $commissionAmount = round($amount * ($percentage / 100), 2);
        if ($commissionAmount <= 0) {
            return null;
        }

        $referrer = User::find($referredUser->referrer_id);
        if (!$referrer) {
            return null;
        }

        return DB::transaction(function () use ($referrer, $referredUser, $commissionAmount, $percentage, $sourceType, $sourceId) {
            $commission = ReferralCommission::create([
                'referrer_id' => $referrer->id,
                'referred_user_id' => $referredUser->id,
                'source_type' => $sourceType,
                'source_id' => $sourceId,
                'amount' => $commissionAmount,
                'percentage' => $percentage,
                'currency' => $referrer->currency ?? 'EGP',
                'status' => 'paid',
            ]);

            // Credit referrer's wallet directly
            $this->walletService->credit(
                user: $referrer,
                amount: $commissionAmount,
                type: WalletTxType::REFERRAL_COMMISSION,
                description: "عمولة إحالة {$percentage}% عن عملية {$sourceType} للصديق {$referredUser->name}",
                currency: $referrer->currency ?? 'EGP',
                referenceType: ReferralCommission::class,
                referenceId: $commission->id
            );

            // Send notification to referrer
            SendNotificationJob::dispatch(
                $referrer->id,
                new NotificationPayloadDTO(
                    title: 'ربحت عمولة إحالة جديدة! 🎉',
                    body: "تم إضافة {$commissionAmount} {$referrer->currency} إلى محفظتك كعمولة إحالة من صديقك {$referredUser->name}.",
                    type: 'referral_earned',
                    data: [
                        'commission_id' => $commission->id,
                        'amount' => $commissionAmount,
                        'referred_user' => $referredUser->name,
                    ]
                )
            );

            return $commission;
        });
    }
}
