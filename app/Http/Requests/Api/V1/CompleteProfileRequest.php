<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;

class CompleteProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        $userId = $this->user()->id;

        return [
            'phone' => ['required', 'string', 'max:20', "unique:users,phone,{$userId}"],
            'country' => ['required', 'string', 'max:10'],
            'currency' => ['required', 'string', 'in:EGP,USD,SAR,SYP'],
            'invite_code' => ['nullable', 'string', 'max:20'],
        ];
    }

    public function messages(): array
    {
        return [
            'phone.required' => 'يرجى إدخال رقم الهاتف.',
            'phone.unique' => 'رقم الهاتف مسجل لحساب آخر مسبقاً.',
            'phone.max' => 'رقم الهاتف يجب ألا يتجاوز 20 حرفاً.',
            'country.required' => 'يرجى تحديد الدولة.',
            'country.max' => 'رمز الدولة غير صالح.',
            'currency.required' => 'يرجى اختيار العملة الأساسية للحساب.',
            'currency.in' => 'العملة المحددة غير مدعومة.',
            'invite_code.max' => 'كود الدعوة غير صالح.',
        ];
    }
}
