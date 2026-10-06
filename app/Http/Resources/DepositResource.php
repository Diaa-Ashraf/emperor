<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DepositResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $referenceId = $this->transaction_reference ?: substr(md5('deposit_req_' . $this->id . $this->created_at), 0, 24);

        return [
            'id' => $this->id,
            'reference_id' => $referenceId,
            'amount' => (float) $this->amount,
            'fee' => (float) ($this->fee ?? 0),
            'final_amount' => (float) ($this->final_amount ?? $this->amount),
            'currency' => $this->currency ?: 'EGY',
            'status' => $this->status?->value ?? (string)$this->status,
            'status_label' => method_exists($this->status, 'label') ? $this->status->label() : ($this->status === 'approved' || $this->status === 'completed' ? 'مكتملة' : ($this->status === 'rejected' ? 'مرفوضة' : 'انتظار')),
            'sender_account' => $this->sender_account,
            'transaction_reference' => $referenceId,
            'proof_image' => $this->proof_image ? asset('storage/' . $this->proof_image) : null,
            'payment_method' => new DepositMethodResource($this->whenLoaded('paymentMethod')),
            'reviewer_notes' => $this->reviewer_notes,
            'created_at' => $this->created_at?->toIso8601String(),
            'reviewed_at' => $this->reviewed_at?->toIso8601String(),
        ];
    }
}

