<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        $userId = $this->user()->id;

        return [
            'name' => ['sometimes', 'required', 'string', 'max:100'],
            'phone' => ['nullable', 'string', 'max:20', "unique:users,phone,{$userId}"],
            'country' => ['nullable', 'string', 'max:10'],
            'currency' => ['nullable', 'string', 'in:EGP,USD,SAR,SYP'],
            'avatar' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'الاسم مطلوب.',
            'name.max' => 'الاسم يجب ألا يتجاوز 100 حرف.',
            'phone.unique' => 'رقم الهاتف مسجل لحساب آخر.',
            'phone.max' => 'رقم الهاتف يجب ألا يتجاوز 20 حرفاً.',
            'country.max' => 'رمز الدولة غير صالح.',
            'currency.in' => 'العملة المحددة غير مدعومة.',
            'avatar.image' => 'يجب أن يكون الملف المرفوع صورة صالحة.',
            'avatar.mimes' => 'نوع الصورة يجب أن يكون jpeg, png, jpg أو webp.',
            'avatar.max' => 'الحد الأقصى لحجم الصورة هو 2 ميجابايت.',
        ];
    }
}
