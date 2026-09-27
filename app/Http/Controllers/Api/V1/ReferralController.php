<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Services\ReferralService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReferralController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected ReferralService $referralService
    ) {}

    /**
     * Get user's referral code, link, invited count and earnings summary.
     */
    public function stats(Request $request): JsonResponse
    {
        $user = $request->user();
        $stats = $this->referralService->getReferralStats($user);

        return $this->successResponse($stats, 'تم جلب بيانات وإحصائيات الإحالة بنجاح');
    }

    /**
     * Get list of invited users by the authenticated user.
     */
    public function invitedUsers(Request $request): JsonResponse
    {
        $user = $request->user();
        $invited = $this->referralService->getInvitedUsers($user, 15);

        return $this->paginatedResponse($invited, 'تم جلب قائمة الأصدقاء المدعوين بنجاح');
    }
}
