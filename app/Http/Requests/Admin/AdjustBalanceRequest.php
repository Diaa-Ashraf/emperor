<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class AdjustBalanceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    public function rules(): array
    {
        return [
            'type' => ['required', 'in:credit,debit'],
            'amount' => ['required', 'numeric', 'min:0.01', 'max:1000000'],
            'currency' => ['required', 'string', 'size:3'],
            'notes' => ['required', 'string', 'min:3', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'type.required' => 'يرجى تحديد نوع العملية (إضافة أو خصم).',
            'type.in' => 'نوع العملية المحدد غير صالح.',
            'amount.required' => 'يرجى إدخال المبلغ المراد تعديله.',
            'amount.numeric' => 'يجب أن يكون المبلغ قيمة رقمية.',
            'amount.min' => 'يجب أن يكون المبلغ أكبر من صفر.',
            'amount.max' => 'المبلغ المدخل تجاوز الحد الأقصى المسموح به.',
            'currency.required' => 'يرجى تحديد عملة المحفظة.',
            'notes.required' => 'يرجى كتابة سبب أو ملاحظات التعديل الإداري.',
        ];
    }
}
