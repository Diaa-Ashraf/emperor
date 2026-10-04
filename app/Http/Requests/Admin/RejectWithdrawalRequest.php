<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class RejectWithdrawalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    public function rules(): array
    {
        return [
            'reason' => ['required', 'string', 'min:3', 'max:500'],
        ];
    }

    public function messages(): array
    {
        return [
            'reason.required' => 'يرجى كتابة سبب رفض طلب السحب لتوضيحه للمستخدم.',
            'reason.min' => 'يجب ألا يقل سبب الرفض عن 3 أحرف.',
        ];
    }
}
