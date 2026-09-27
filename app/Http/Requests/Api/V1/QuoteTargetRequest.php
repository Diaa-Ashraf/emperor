<?php

namespace App\Http\Requests\Api\V1;

use App\Enums\ProductType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class QuoteTargetRequest extends FormRequest
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
            'points' => ['required', 'integer', 'min:1'],
        ];
    }

    public function messages(): array
    {
        return [
            'product_id.required' => 'حقل التطبيق مطلوب.',
            'product_id.exists' => 'تطبيق بيع التارجت المحدد غير صالح أو غير مفعل.',
            'points.required' => 'يرجى إدخال عدد النقاط أو الكوينز المراد بيعها.',
            'points.integer' => 'عدد النقاط يجب أن يكون رقماً صحيحاً.',
            'points.min' => 'الحد الأدنى للنقاط هو نقطة واحدة على الأقل.',
        ];
    }
}
