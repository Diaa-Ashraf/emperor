<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TargetOrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'public_id' => $this->public_id,
            'product' => [
                'id' => $this->product?->id,
                'name' => $this->product?->name,
                'image_url' => $this->product?->image ? (filter_var($this->product->image, FILTER_VALIDATE_URL) ? $this->product->image : asset('storage/' . $this->product->image)) : null,
            ],
            'app_user_id' => $this->app_user_id,
            'app_username' => $this->app_username,
            'agency_id' => $this->agency_id,
            'target_points' => $this->target_points,
            'rate_per_point' => (float) $this->rate_per_point,
            'gross_amount' => (float) $this->gross_amount,
            'fee' => (float) $this->fee,
            'net_payout' => (float) $this->net_payout,
            'currency' => $this->currency,
            'payout_method' => $this->payout_method,
            'proof_image_url' => $this->proof_image ? asset('storage/' . $this->proof_image) : null,
            'user_notes' => $this->user_notes,
            'status' => $this->status->value ?? $this->status,
            'status_label' => match ($this->status->value ?? $this->status) {
                'pending' => 'قيد المراجعة والتحقق',
                'paid' => 'تم استلام التارجت وإيداع الرصيد',
                'rejected' => 'تم الرفض',
                default => 'غير محدد',
            },
            'verification_code' => $this->verification_code,
            'auto_verified' => (bool) $this->auto_verified,
            'verification_method' => $this->verification_method,
            'ocr_confidence' => (float) $this->ocr_confidence,
            'reviewer_notes' => $this->reviewer_notes,
            'reviewed_at' => $this->reviewed_at?->toIso8601String(),
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
