<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;

class StoreDepositRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'payment_method_id' => ['required', 'exists:payment_methods,id'],
            'amount' => ['required', 'numeric', 'min:1'],
            'sender_account' => ['nullable', 'string', 'max:100'],
            'transaction_reference' => ['nullable', 'string', 'max:100'],
            'proof_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:4096'],
        ];
    }

    public function messages(): array
    {
        return [
            'payment_method_id.required' => 'يرجى اختيار طريقة الدفع.',
            'payment_method_id.exists' => 'طريقة الدفع المحددة غير صالحة.',
            'amount.required' => 'يرجى إدخال مبلغ الإيداع.',
            'amount.numeric' => 'يجب أن يكون المبلغ قيمة عددية.',
            'amount.min' => 'يجب أن يكون مبلغ الإيداع 1 على الأقل.',
            'proof_image.image' => 'يجب أن يكون الملف المرفق صورة للإيصال.',
            'proof_image.max' => 'الحد الأقصى لحجم صورة الإيصال هو 4 ميجابايت.',
        ];
    }
}
