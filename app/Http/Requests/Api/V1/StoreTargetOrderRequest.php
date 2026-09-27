<?php

namespace App\Http\Requests\Api\V1;

use App\Enums\ProductType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTargetOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'product_id' => [
                'required',
                'integer',
                Rule::exists('products', 'id')->where(function ($query) {
                    $query->where('type', ProductType::TARGET)->where('is_active', true);
                }),
            ],
            'app_user_id' => ['required', 'string', 'max:100'],
            'app_username' => ['nullable', 'string', 'max:100'],
            'target_points' => ['required', 'integer', 'min:1'],
            'proof_image' => ['required', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            'user_notes' => ['nullable', 'string', 'max:500'],
        ];
    }

    public function messages(): array
    {
        return [
            'product_id.required' => 'حقل التطبيق مطلوب.',
            'product_id.exists' => 'تطبيق بيع التارجت المحدد غير صالح أو غير مفعل.',
            'app_user_id.required' => 'يرجى إدخال الآيدي الخاص بحسابك في التطبيق.',
            'app_user_id.max' => 'الآيدي يجب ألا يتجاوز 100 حرف.',
            'target_points.required' => 'يرجى إدخال عدد النقاط أو الكوينز المحولة.',
            'target_points.integer' => 'عدد النقاط يجب أن يكون رقماً صحيحاً.',
            'target_points.min' => 'الحد الأدنى للبيع هو نقطة واحدة.',
            'proof_image.required' => 'يرجى إرفاق صورة إثبات تحويل التارجت للوكالة.',
            'proof_image.image' => 'الملف المرفق يجب أن يكون صورة صالحة.',
            'proof_image.mimes' => 'صيغ الصور المقبولة هي: jpeg, png, jpg, webp.',
            'proof_image.max' => 'أقصى حجم مسموح به لصورة الإثبات هو 5 ميجابايت.',
            'user_notes.max' => 'الملاحظات يجب ألا تتجاوز 500 حرف.',
        ];
    }
}
