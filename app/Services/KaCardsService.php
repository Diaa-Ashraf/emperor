<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class KaCardsService
{
    protected string $apiUrl;
    protected ?string $apiToken;
    protected int $timeout;

    public function __construct(array $config = [])
    {
        $this->apiUrl = rtrim($config['api_url'] ?? config('services.ka_cards.api_url', 'https://ka-cards.com/client/api'), '/');
        $this->apiToken = $config['api_token'] ?? config('services.ka_cards.api_token');
        $this->timeout = (int) ($config['timeout'] ?? config('services.ka_cards.timeout', 30));
    }

    /**
     * Get headers for API requests.
     */
    protected function getHeaders(): array
    {
        return [
            'api-token' => $this->apiToken,
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
        ];
    }

    /**
     * Fetch profile & balance information from KA-Cards.
     */
     public function getProfile(): array
     {
         try {
             $response = Http::timeout($this->timeout)
                 ->withHeaders($this->getHeaders())
                 ->get("{$this->apiUrl}/profile");

             if ($response->successful()) {
                 return $response->json() ?? [];
             }

             Log::warning('KA-Cards getProfile failed: ' . $response->status(), [
                 'body' => $response->body(),
             ]);

             return [];
         } catch (Exception $e) {
             Log::error('KA-Cards getProfile Exception: ' . $e->getMessage());
             return [];
         }
     }

    /**
     * Fetch all available products and categories from KA-Cards.
     */
    public function getProducts(bool $baseOnly = false): array
    {
        try {
            $url = $baseOnly ? "{$this->apiUrl}/products?base=1" : "{$this->apiUrl}/products";

            $response = Http::timeout($this->timeout)
                ->withHeaders($this->getHeaders())
                ->get($url);

            if ($response->successful()) {
                return $response->json() ?? [];
            }

            Log::error('KA-Cards getProducts failed: ' . $response->status(), [
                'body' => $response->body()
            ]);

            return [];
        } catch (Exception $e) {
            Log::error('KA-Cards getProducts Exception: ' . $e->getMessage());
            return [];
        }
    }

    /**
     * Fetch content / custom fields schema for a category or product.
     */
    public function getContent(int|string $id = 0): array
    {
        try {
            $response = Http::timeout($this->timeout)
                ->withHeaders($this->getHeaders())
                ->get("{$this->apiUrl}/content/{$id}");

            if ($response->successful()) {
                return $response->json() ?? [];
            }

            Log::warning("KA-Cards getContent({$id}) failed: " . $response->status());
            return [];
        } catch (Exception $e) {
            Log::error("KA-Cards getContent({$id}) Exception: " . $e->getMessage());
            return [];
        }
    }

    /**
     * Execute an order on KA-Cards.
     *
     * @param int $productId
     * @param int $qty
     * @param string $orderUuid Client reference UUID
     * @param array $params Custom dynamic params like player_id, server_id, etc.
     * @return array
     */
    public function createOrder(int $productId, int $qty, string $orderUuid, array $params = []): array
    {
        try {
            $payload = [
                'product_id' => $productId,
                'qty' => $qty,
                'order_uuid' => $orderUuid,
                'params' => (object) $params,
            ];

            $response = Http::timeout($this->timeout)
                ->withHeaders($this->getHeaders())
                ->post("{$this->apiUrl}/orders", $payload);

            $result = $response->json() ?? [];

            Log::info('KA-Cards createOrder response:', [
                'status' => $response->status(),
                'payload' => $payload,
                'response' => $result,
            ]);

            $isSuccess = $response->successful() && (($result['status'] ?? '') === 'OK' || !empty($result['data']['order_id']));
            $errorCode = $result['code'] ?? null;
            $translatedMessage = $this->translateErrorCode($errorCode, $result['message'] ?? null);

            return [
                'successful' => $isSuccess,
                'status_code' => $response->status(),
                'data' => $result['data'] ?? null,
                'raw' => $result,
                'message' => $translatedMessage,
                'error_code' => $errorCode,
            ];
        } catch (Exception $e) {
            Log::error('KA-Cards createOrder Exception: ' . $e->getMessage());

            return [
                'successful' => false,
                'status_code' => 500,
                'data' => null,
                'raw' => [],
                'message' => $e->getMessage(),
                'error_code' => 500,
            ];
        }
    }

    /**
     * Check status of orders by provider order IDs or client UUIDs.
     *
     * @param array|string $identifiers
     * @param bool $byUuid
     * @return array
     */
    public function checkOrders(array|string $identifiers, bool $byUuid = false): array
    {
        try {
            $ids = is_array($identifiers) ? implode(',', $identifiers) : $identifiers;
            $query = $byUuid ? ['uuids' => $ids] : ['orders' => $ids];

            $response = Http::timeout($this->timeout)
                ->withHeaders($this->getHeaders())
                ->get("{$this->apiUrl}/check", $query);

            if ($response->successful()) {
                $result = $response->json() ?? [];
                return $result['data'] ?? [];
            }

            Log::warning('KA-Cards checkOrders failed: ' . $response->status(), [
                'query' => $query,
                'body' => $response->body()
            ]);

            return [];
        } catch (Exception $e) {
            Log::error('KA-Cards checkOrders Exception: ' . $e->getMessage());
            return [];
        }
    }

    /**
     * Translate official KA-Cards error codes to user-friendly Arabic text.
     */
    public function translateErrorCode(?int $code, ?string $default = null): string
    {
        return match ($code) {
            100 => 'رصيد الحساب لدى المزود غير كافٍ لتنفيذ الطلب',
            105 => 'الكمية المطلوبة غير متوفرة حالياً في المخزون',
            106 => 'الكمية المطلوبة غير مسموح بها لهذا المنتج',
            109 => 'المنتج غير موجود في منصة المزود',
            110 => 'المنتج غير متوفر أو معطل مؤقتاً',
            111 => 'تم تجاوز حد الطلبات المسموح به (Rate Limit)',
            112 => 'قيمة الطلب أقل من الحد الأدنى المسموح به',
            113 => 'قيمة الطلب تتجاوز الحد الأقصى المسموح به',
            114 => 'مخالفة لقواعد العمل أو الشروط لدى المزود',
            120 => 'مفتاح الربط API Token مطلوب',
            121 => 'مفتاح الربط API Token غير صالح أو منتهي الصلاحية',
            122 => 'حساب الـ API معطل أو محظور لدى المزود',
            123 => 'عنوان الـ IP الحالي غير مصرح به في قائمة المزود',
            124 => 'بيانات الطلب غير صالحة أو المعرفات غير مكتملة',
            130 => 'خوادم المزود تحت الصيانة حالياً',
            500 => 'خطأ داخلي في خوادم المزود',
            default => $default ?: 'حدث خطأ أثناء معالجة الطلب مع مزود الخدمة',
        };
    }
}
