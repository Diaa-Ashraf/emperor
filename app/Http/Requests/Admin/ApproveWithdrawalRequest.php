<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ApproveWithdrawalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    public function rules(): array
    {
        return [
            'payout_reference' => ['nullable', 'string', 'max:100'],
            'reviewer_notes' => ['nullable', 'string', 'max:500'],
            'proof_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'], // 5MB max
        ];
    }

    public function messages(): array
    {
        return [
            'proof_image.image' => 'يجب أن يكون إثبات التحويل ملف صورة صالح.',
            'proof_image.mimes' => 'صيغ الصور المقبولة هي: jpg, jpeg, png, webp.',
            'proof_image.max' => 'الحد الأقصى لحجم صورة الإثبات هو 5 ميجابايت.',
        ];
    }
}
