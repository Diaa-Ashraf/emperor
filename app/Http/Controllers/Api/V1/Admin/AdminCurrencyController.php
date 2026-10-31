<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\ExchangeRate;
use App\Services\ExchangeRateService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminCurrencyController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected ExchangeRateService $exchangeRateService
    ) {}

    /**
     * List all exchange rates and currencies.
     */
    public function index(): JsonResponse
    {
        $this->exchangeRateService->seedDefaultRates();

        $rates = ExchangeRate::query()
            ->select(['id', 'from_currency', 'to_currency', 'rate', 'conversion_fee_percent', 'is_active', 'updated_by', 'updated_at'])
            ->with(['updatedBy:id,name'])
            ->orderBy('from_currency', 'asc')
            ->orderBy('to_currency', 'asc')
            ->get();

        return $this->successResponse([
            'rates' => $rates,
            'supported_currencies' => ['USD', 'EGP', 'SAR', 'AED', 'JOD', 'KWD', 'QAR', 'EUR', 'TRY', 'USDT'],
        ], 'تم جلب أسعار الصرف بنجاح');
    }

    /**
     * Create or update exchange rate.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'from_currency' => ['required', 'string', 'size:3'],
            'to_currency' => ['required', 'string', 'size:3', 'different:from_currency'],
            'rate' => ['required', 'numeric', 'min:0.000001'],
            'conversion_fee_percent' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'is_active' => ['nullable', 'boolean'],
        ], [
            'from_currency.required' => 'عملة المصدر مطلوبة',
            'to_currency.required' => 'عملة الهدف مطلوبة',
            'to_currency.different' => 'لا يمكن أن تكون عملة المصدر والهدف متطابقتين',
            'rate.required' => 'سعر الصرف مطلوب',
            'rate.numeric' => 'سعر الصرف يجب أن يكون رقماً',
            'rate.min' => 'سعر الصرف يجب أن يكون أكبر من الصفر',
            'conversion_fee_percent.numeric' => 'نسبة الرسوم يجب أن تكون رقماً',
        ]);

        $from = strtoupper(trim($validated['from_currency']));
        $to = strtoupper(trim($validated['to_currency']));
        $rateVal = (float) $validated['rate'];
        $fee = (float) ($validated['conversion_fee_percent'] ?? 0);
        $isActive = isset($validated['is_active']) ? (bool) $validated['is_active'] : true;

        $rateRecord = $this->exchangeRateService->setRate(
            fromCurrency: $from,
            toCurrency: $to,
            rate: $rateVal,
            feePercent: $fee,
            isActive: $isActive,
            admin: $request->user()
        );

        return $this->successResponse(
            $rateRecord->load('updatedBy:id,name'),
            "تم حفظ سعر الصرف ({$from} ➔ {$to}) بنجاح",
            Response::HTTP_CREATED
        );
    }

    /**
     * Update exchange rate by id.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $rateRecord = ExchangeRate::findOrFail($id);

        $validated = $request->validate([
            'rate' => ['required', 'numeric', 'min:0.000001'],
            'conversion_fee_percent' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'is_active' => ['nullable', 'boolean'],
        ], [
            'rate.required' => 'سعر الصرف مطلوب',
            'rate.numeric' => 'سعر الصرف يجب أن يكون رقماً',
            'rate.min' => 'سعر الصرف يجب أن يكون أكبر من الصفر',
            'conversion_fee_percent.numeric' => 'نسبة الرسوم يجب أن تكون رقماً',
        ]);

        $rateRecord->update([
            'rate' => (float) $validated['rate'],
            'conversion_fee_percent' => isset($validated['conversion_fee_percent']) ? (float) $validated['conversion_fee_percent'] : $rateRecord->conversion_fee_percent,
            'is_active' => isset($validated['is_active']) ? (bool) $validated['is_active'] : $rateRecord->is_active,
            'updated_by' => $request->user()?->id,
        ]);

        return $this->successResponse(
            $rateRecord->load('updatedBy:id,name'),
            "تم تحديث سعر الصرف ({$rateRecord->from_currency} ➔ {$rateRecord->to_currency}) بنجاح"
        );
    }

    /**
     * Toggle rate active status.
     */
    public function toggle(int $id): JsonResponse
    {
        $rate = ExchangeRate::findOrFail($id);
        $rate->update(['is_active' => !$rate->is_active]);

        $statusText = $rate->is_active ? 'تفعيل' : 'تعطيل';
        return $this->successResponse(
            $rate->load('updatedBy:id,name'),
            "تم {$statusText} سعر الصرف بنجاح"
        );
    }

    /**
     * Delete an exchange rate.
     */
    public function destroy(int $id): JsonResponse
    {
        $rate = ExchangeRate::findOrFail($id);
        $pair = "{$rate->from_currency} ➔ {$rate->to_currency}";
        $rate->delete();

        return $this->successResponse(null, "تم حذف سعر الصرف ({$pair}) بنجاح");
    }
}

