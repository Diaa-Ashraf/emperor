<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DepositResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'amount' => (float) $this->amount,
            'fee' => (float) $this->fee,
            'final_amount' => (float) $this->final_amount,
            'currency' => $this->currency,
            'status' => $this->status?->value,
            'status_label' => $this->status?->label(),
            'sender_account' => $this->sender_account,
            'transaction_reference' => $this->transaction_reference,
            'proof_image' => $this->proof_image ? asset('storage/' . $this->proof_image) : null,
            'payment_method' => new DepositMethodResource($this->whenLoaded('paymentMethod')),
            'reviewer_notes' => $this->reviewer_notes,
            'created_at' => $this->created_at?->toIso8601String(),
            'reviewed_at' => $this->reviewed_at?->toIso8601String(),
        ];
    }
}
