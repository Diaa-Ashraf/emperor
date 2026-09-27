<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreApiClientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'phone' => ['nullable', 'string', 'max:50'],
            'password' => ['nullable', 'string', 'min:8'],
            'api_rate_limit' => ['nullable', 'integer', 'min:10', 'max:1000'],
            'webhook_url' => ['nullable', 'url', 'max:500'],
            'api_ip_whitelist' => ['nullable', 'string'], // Comma-separated or newline-separated
            'initial_balance' => ['nullable', 'numeric', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'اسم العميل أو المؤسسة مطلوب.',
            'email.required' => 'البريد الإلكتروني مطلوب.',
            'email.email' => 'البريد الإلكتروني غير صالح.',
            'email.unique' => 'البريد الإلكتروني مسجل مسبقاً لمستخدم آخر.',
            'password.min' => 'كلمة المرور يجب أن لا تقل عن 8 أحرف.',
            'api_rate_limit.min' => 'الحد الأدنى لعدد الطلبات في الدقيقة هو 10.',
            'api_rate_limit.max' => 'الحد الأقصى لعدد الطلبات في الدقيقة هو 1000.',
            'webhook_url.url' => 'رابط الـ Webhook يجب أن يكون عنوان URL صالح.',
            'initial_balance.min' => 'الرصيد الافتتاحي لا يمكن أن يكون سالباً.',
        ];
    }
}
