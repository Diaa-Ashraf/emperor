<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateApiClientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->route('id');

        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($userId)],
            'phone' => ['nullable', 'string', 'max:50'],
            'status' => ['required', 'string', 'in:active,suspended,banned'],
            'api_rate_limit' => ['nullable', 'integer', 'min:10', 'max:1000'],
            'webhook_url' => ['nullable', 'url', 'max:500'],
            'api_ip_whitelist' => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'اسم العميل أو المؤسسة مطلوب.',
            'email.required' => 'البريد الإلكتروني مطلوب.',
            'email.email' => 'البريد الإلكتروني غير صالح.',
            'email.unique' => 'البريد الإلكتروني مسجل مسبقاً لمستخدم آخر.',
            'status.required' => 'حالة الحساب مطلوبة.',
            'api_rate_limit.min' => 'الحد الأدنى لعدد الطلبات في الدقيقة هو 10.',
            'api_rate_limit.max' => 'الحد الأقصى لعدد الطلبات في الدقيقة هو 1000.',
            'webhook_url.url' => 'رابط الـ Webhook يجب أن يكون عنوان URL صالح.',
        ];
    }
}
