<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\PaymentMethod;
use App\Models\Provider;
use App\Services\ProviderManagerService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminProviderController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected ProviderManagerService $providerService
    ) {}

    /**
     * List all providers / suppliers with connection status and balance.
     */
    public function providers(): JsonResponse
    {
        $providers = Provider::query()
            ->select([
                'id',
                'name',
                'driver',
                'balance',
                'balance_currency',
                'is_active',
                'auto_fulfill',
                'created_at',
            ])
            ->get();

        return $this->successResponse($providers, 'تم جلب قائمة الموردين بنجاح');
    }

    /**
     * Store a new provider.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:190',
            'driver' => 'required|string|max:100',
            'base_url' => 'nullable|string|max:500',
            'api_type' => 'nullable|string',
            'integration_type' => 'nullable|string',
            'auth_type' => 'nullable|string',
            'is_active' => 'boolean',
            'auto_fulfill' => 'boolean',
        ]);

        $provider = Provider::create([
            'name' => $validated['name'],
            'driver' => $validated['driver'],
            'base_url' => $validated['base_url'] ?? null,
            'balance' => 0.00,
            'balance_currency' => 'USD',
            'is_active' => $request->boolean('is_active', true),
            'auto_fulfill' => $request->boolean('auto_fulfill', true),
            'config' => [
                'api_type' => $request->input('api_type', 'API (واجهة برمجة)'),
                'integration_type' => $request->input('integration_type', 'التكامل الافتراضي'),
                'auth_type' => $request->input('auth_type', 'بدون توثيق'),
            ],
        ]);

        return $this->successResponse($provider, 'تم حفظ المورد بنجاح');
    }

    /**
     * Delete a provider.
     */
    public function destroy(int $id): JsonResponse
    {
        $provider = Provider::findOrFail($id);
        $provider->delete();

        return $this->successResponse(null, 'تم حذف المورد بنجاح');
    }

    /**
     * Check provider balance live via API.
     */
    public function checkBalance(int $id): JsonResponse
    {
        $provider = Provider::findOrFail($id);

        try {
            $adapter = $this->providerService->resolveAdapter($provider->driver, $provider->config ?? []);
            $balance = (float) $provider->balance;
            $currency = $provider->balance_currency ?: 'USD';

            if (method_exists($adapter, 'getBalance')) {
                $balRes = $adapter->getBalance();
                if (is_array($balRes)) {
                    $balance = (float) ($balRes['balance'] ?? $balRes['wallet_balance'] ?? 0);
                    $currency = $balRes['currency'] ?? $currency;
                } elseif (is_numeric($balRes)) {
                    $balance = (float) $balRes;
                }
            } elseif (method_exists($adapter, 'checkBalance')) {
                $balance = (float) $adapter->checkBalance();
            }

            $provider->update([
                'balance' => $balance,
                'balance_currency' => $currency,
            ]);

            return $this->successResponse([
                'id' => $provider->id,
                'balance' => $balance,
                'currency' => $provider->balance_currency,
            ], 'تم تحديث رصيد المورد بنجاح');
        } catch (\Throwable $e) {
            return $this->errorResponse('فشل الاستعلام عن رصيد المورد: ' . $e->getMessage(), Response::HTTP_BAD_GATEWAY);
        }
    }

    /**
     * Toggle provider active status.
     */
    public function toggleProvider(int $id): JsonResponse
    {
        $provider = Provider::findOrFail($id);
        $provider->is_active = !$provider->is_active;
        $provider->save();

        return $this->successResponse([
            'id' => $provider->id,
            'is_active' => $provider->is_active,
        ], 'تم تحديث حالة المورد بنجاح');
    }

    /**
     * List all payment methods.
     */
    public function paymentMethods(): JsonResponse
    {
        $methods = PaymentMethod::query()
            ->select([
                'id',
                'name',
                'type',
                'currency',
                'min_amount',
                'max_amount',
                'fee_percentage',
                'is_active',
                'account_details',
            ])
            ->orderBy('id')
            ->get();

        return $this->successResponse($methods, 'تم جلب طرق الدفع بنجاح');
    }

    /**
     * Toggle payment method active status.
     */
    public function togglePaymentMethod(int $id): JsonResponse
    {
        $method = PaymentMethod::findOrFail($id);
        $method->is_active = !$method->is_active;
        $method->save();

        return $this->successResponse([
            'id' => $method->id,
            'is_active' => $method->is_active,
        ], 'تم تحديث حالة طريقة الدفع بنجاح');
    }
}

