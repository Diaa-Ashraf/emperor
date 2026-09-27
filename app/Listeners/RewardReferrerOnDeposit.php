<?php

namespace App\Listeners;

use App\Events\DepositApproved;
use App\Services\ReferralService;

class RewardReferrerOnDeposit
{
    public function __construct(
        protected ReferralService $referralService
    ) {}

    public function handle(DepositApproved $event): void
    {
        $deposit = $event->deposit;
        if ($deposit->user && $deposit->user->referrer_id) {
            $this->referralService->rewardReferrer(
                referredUser: $deposit->user,
                amount: (float) $deposit->final_amount,
                sourceType: 'deposit',
                sourceId: $deposit->id
            );
        }
    }
}
