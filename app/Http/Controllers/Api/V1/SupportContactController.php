<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\SupportContactResource;
use App\Models\SupportContact;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class SupportContactController extends Controller
{
    use ApiResponse;

    /**
     * Get active support contact channels (WhatsApp, Telegram, Phone, etc.).
     */
    public function index(): JsonResponse
    {
        $contacts = SupportContact::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id', 'asc')
            ->get();

        return $this->successResponse(
            SupportContactResource::collection($contacts),
            'تم جلب قنوات الدعم الفني بنجاح'
        );
    }
}
