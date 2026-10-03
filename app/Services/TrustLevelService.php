<?php

namespace App\Services;

use App\Enums\TrustLevel;
use App\Models\User;

class TrustLevelService
{
    /**
     * Determine user's eligible trust level based on stats.
     */
    public function calculateTrustLevel(User $user): TrustLevel
    {
        // VIP is granted manually or by 50+ successful orders
        if ($user->trust_level === TrustLevel::VIP || $user->trust_level === 'vip') {
            return TrustLevel::VIP;
        }

        $success = $user->successful_target_count;
        $rejected = $user->rejected_target_count;
        $total = $success + $rejected;

        if ($total === 0 || $success < 3) {
            return TrustLevel::NEW;
        }

        $rejectionRate = $total > 0 ? ($rejected / $total) : 0.0;

        if ($success >= 25 && $rejectionRate <= 0.05) {
            return TrustLevel::GOLD;
        }

        if ($success >= 10 && $rejected === 0) {
            return TrustLevel::SILVER;
        }

        if ($success >= 3) {
            return TrustLevel::BRONZE;
        }

        return TrustLevel::NEW;
    }

    /**
     * Get the auto-approve payout limit for the user in EGP.
     */
    public function getAutoApproveLimit(User $user): float
    {
        if ($user->custom_auto_approve_limit !== null && (float) $user->custom_auto_approve_limit > 0) {
            return (float) $user->custom_auto_approve_limit;
        }

        $level = $user->trust_level instanceof TrustLevel 
            ? $user->trust_level 
            : TrustLevel::tryFrom((string) $user->trust_level) ?? TrustLevel::NEW;

        return $level->autoApproveLimit();
    }

    /**
     * Check if a given target payout amount qualifies for instant trust-based approval.
     */
    public function canAutoApproveByTrust(User $user, float $netPayout): bool
    {
        $limit = $this->getAutoApproveLimit($user);

        if ($limit <= 0) {
            return false;
        }

        return $netPayout <= $limit;
    }

    /**
     * Record a successful target order and recalculate trust level.
     */
    public function recordSuccessfulOrder(User $user): void
    {
        $user->increment('successful_target_count');
        $newLevel = $this->calculateTrustLevel($user);
        
        if ($user->trust_level !== $newLevel) {
            $user->update(['trust_level' => $newLevel->value]);
        }
    }

    /**
     * Record a rejected target order and recalculate trust level.
     */
    public function recordRejectedOrder(User $user): void
    {
        $user->increment('rejected_target_count');
        $newLevel = $this->calculateTrustLevel($user);
        
        if ($user->trust_level !== $newLevel) {
            $user->update(['trust_level' => $newLevel->value]);
        }
    }
}
