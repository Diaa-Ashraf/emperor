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
                'base_url',
                'created_at',
            ])
            ->addSelect(['config'])
            ->get();

        $providers->each(function (Provider $provider) {
            $config = $provider->config ?? [];
            $provider->setAttribute('has_api_token', !empty($config['api_token']) || !empty($config['api_key']));
            $provider->makeHidden(['config']);
        });

        return $this->successResponse($providers, 'تم جلب قائمة الموردين بنجاح');
    }

    /**
     * Store a new provider.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:190',
            'driver' => 'nullable|string|max:100',
            'base_url' => 'nullable|string|max:500',
            'api_type' => 'nullable|string',
            'integration_type' => 'nullable|string',
            'auth_type' => 'nullable|string',
            'api_token' => 'nullable|string|max:500',
            'is_active' => 'boolean',
            'auto_fulfill' => 'boolean',
        ]);

        $requestedDriver = strtolower((string) ($validated['driver'] ?? ''));
        $isJasserCard = $request->input('api_type') === 'Jasser Card API' || in_array($requestedDriver, ['jasser_card', 'jasser-card', 'jassercard'], true);
        $isAdCard = $request->input('api_type') === 'AD Card API' || $requestedDriver === 'ad_card';
        $driver = $isJasserCard ? 'jasser_card' : ($isAdCard ? 'ad_card' : ($validated['driver'] ?? 'embrator'));
        $defaultBaseUrl = match (true) {
            $isJasserCard => 'https://jasser-card.net/client/api',
            $isAdCard => 'https://ad-card.com/client/api',
            default => null,
        };
        $baseUrl = $validated['base_url'] ?? $defaultBaseUrl;
        if ($isJasserCard && ($baseUrl === 'https://jasser-card.net/api' || $baseUrl === 'https://jasser-card.net')) {
            $baseUrl = 'https://jasser-card.net/client/api';
        }

        $provider = Provider::create([
            'name' => $validated['name'],
            'driver' => $driver,
            'base_url' => $baseUrl,
            'balance' => 0.00,
            'balance_currency' => 'USD',
            'is_active' => $request->boolean('is_active', true),
            'auto_fulfill' => $request->boolean('auto_fulfill', true),
            'config' => [
                'api_type' => $request->input('api_type', 'API (واجهة برمجة)'),
                'integration_type' => $request->input('integration_type', 'التكامل الافتراضي'),
                'auth_type' => $request->input('auth_type', 'بدون توثيق'),
                'api_token' => $request->input('api_token'),
            ],
        ]);

        return $this->successResponse($provider->makeHidden(['config']), 'تم حفظ المورد بنجاح');
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $provider = Provider::findOrFail($id);
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:190',
            'driver' => 'sometimes|required|string|max:100',
            'base_url' => 'nullable|string|max:500',
            'api_token' => 'nullable|string|max:500',
            'is_active' => 'sometimes|boolean',
            'auto_fulfill' => 'sometimes|boolean',
        ]);
        $config = $provider->config ?? [];
        if (array_key_exists('api_token', $validated) && $validated['api_token'] !== null && $validated['api_token'] !== '') {
            $config['api_token'] = $validated['api_token'];
            unset($validated['api_token']);
        }
        $provider->fill($validated);
        $provider->config = $config;
        $provider->save();
        return $this->successResponse(['id' => $provider->id], 'تم تحديث بيانات المورد بنجاح');
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
            $adapter = $this->providerService->adapterFor($provider);
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

    public function catalog(int $id): JsonResponse
    {
        $provider = Provider::findOrFail($id);
        try {
            if (!in_array($provider->driver, ['ad_card', 'ad-card', 'adcard', 'jasser_card', 'jasser-card', 'jassercard'], true)) {
                return $this->errorResponse('جلب الكتالوج المباشر متاح لموردي البطاقات المدعومين من شاشة ربط المنتجات.', Response::HTTP_NOT_IMPLEMENTED);
            }
            $adapter = $this->providerService->adapterFor($provider);
            return $this->successResponse($adapter->getProducts(), 'تم الاتصال بمورد البطاقات بنجاح');
        } catch (\Throwable $e) {
            return $this->errorResponse('فشل الاتصال بمورد ' . $provider->name . ': ' . $e->getMessage(), Response::HTTP_BAD_GATEWAY);
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

