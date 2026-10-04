<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Enums\WalletTxType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreApiClientRequest;
use App\Http\Requests\Admin\UpdateApiClientRequest;
use App\Models\ApiClientPrice;
use App\Models\ApiLog;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductTier;
use App\Models\User;
use App\Models\Wallet;
use App\Services\WalletService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\View\View;

class ApiClientController extends Controller
{
    public function __construct(
        protected WalletService $walletService
    ) {}

    /**
     * Display a listing of API clients and pending activation requests.
     */
    public function index(Request $request): View
    {
        $pendingRequests = User::select([
            'id', 'name', 'email', 'phone', 'api_access_status', 
            'api_access_requested_at', 'api_access_notes', 'created_at'
        ])
        ->where('api_access_status', 'pending')
        ->latest('api_access_requested_at')
        ->get();

        $query = User::select([
            'id', 'name', 'email', 'phone', 'role', 'status', 'api_access_status',
            'api_key', 'api_rate_limit', 'webhook_url', 'api_ip_whitelist',
            'created_at', 'updated_at'
        ])
        ->where(function ($q) {
            $q->where('role', UserRole::API_CLIENT)
              ->orWhere('api_access_status', 'active');
        })
        ->with(['wallet:id,user_id,balance,currency'])
        ->withCount(['orders' => function ($q) {
            $q->where('channel', 'api');
        }]);

        if ($request->filled('search')) {
            $search = trim($request->input('search'));
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('api_key', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        $clients = $query->latest('id')->paginate(15)->withQueryString();

        $stats = [
            'total_clients' => User::where('role', UserRole::API_CLIENT)->orWhere('api_access_status', 'active')->count(),
            'active_clients' => User::where(fn($q) => $q->where('role', UserRole::API_CLIENT)->orWhere('api_access_status', 'active'))->where('status', UserStatus::ACTIVE)->count(),
            'pending_requests' => $pendingRequests->count(),
            'total_api_orders' => \App\Models\Order::where('channel', 'api')->count(),
            'total_api_revenue' => (float) \App\Models\Order::where('channel', 'api')->where('status', 'completed')->sum('total_amount'),
        ];

        return view('admin.api-clients.index', compact('clients', 'stats', 'pendingRequests'));
    }

    /**
     * Approve user API integration request.
     */
    public function approve(int $id): RedirectResponse
    {
        $user = User::findOrFail($id);

        if (empty($user->api_key)) {
            $credentials = User::generateApiCredentials();
            $user->api_key = $credentials['api_key'];
            $user->api_secret = $credentials['hashed_secret'];
        }

        if (!$user->isAdmin()) {
            $user->role = UserRole::API_CLIENT;
        }

        $user->api_access_status = 'active';
        $user->api_access_approved_at = now();
        $user->save();

        // Ensure wallet exists
        Wallet::firstOrCreate(
            ['user_id' => $user->id],
            ['balance' => 0.00, 'currency' => 'EGP', 'is_locked' => false]
        );

        return back()->with('success', "تمت الموافقة وتفعيل الربط البرمجي للعميل ({$user->name}) بنجاح.");
    }

    /**
     * Reject user API integration request.
     */
    public function reject(int $id): RedirectResponse
    {
        $user = User::findOrFail($id);
        $user->update([
            'api_access_status' => 'rejected',
        ]);

        return back()->with('success', "تم رفض طلب الربط البرمجي للعميل ({$user->name}).");
    }

    /**
     * Show the form for creating a new API client.
     */
    public function create(): View
    {
        return view('admin.api-clients.create');
    }

    /**
     * Store a newly created API client.
     */
    public function store(StoreApiClientRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $ipWhitelist = null;
        if (!empty($data['api_ip_whitelist'])) {
            $ipWhitelist = array_values(array_filter(array_map('trim', preg_split('/[\r\n,]+/', $data['api_ip_whitelist']))));
        }

        $credentials = User::generateApiCredentials();

        DB::transaction(function () use ($data, $ipWhitelist, $credentials, &$user) {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'phone' => $data['phone'] ?? null,
                'password' => Hash::make($data['password'] ?? Str::random(16)),
                'role' => UserRole::API_CLIENT,
                'status' => UserStatus::ACTIVE,
                'api_key' => $credentials['api_key'],
                'api_secret' => $credentials['hashed_secret'],
                'api_ip_whitelist' => $ipWhitelist,
                'api_rate_limit' => $data['api_rate_limit'] ?? 60,
                'webhook_url' => $data['webhook_url'] ?? null,
                'currency' => 'EGP',
                'email_verified_at' => now(),
            ]);

            // Create initial wallet
            $wallet = Wallet::firstOrCreate(
                ['user_id' => $user->id],
                ['balance' => 0.00, 'currency' => 'EGP', 'is_locked' => false]
            );

            if (!empty($data['initial_balance']) && (float) $data['initial_balance'] > 0) {
                $this->walletService->credit(
                    user: $user,
                    amount: (float) $data['initial_balance'],
                    type: WalletTxType::DEPOSIT,
                    description: 'رصيد افتتاحي لحساب عميل الـ API بواسطة الإدارة',
                    currency: 'EGP'
                );
            }
        });

        return redirect()->route('admin.api-clients.index')->with([
            'success' => 'تم إنشاء حساب عميل الـ API بنجاح.',
            'new_client_credentials' => [
                'name' => $user->name,
                'api_key' => $credentials['api_key'],
                'api_secret' => $credentials['raw_secret'],
            ],
        ]);
    }

    /**
     * Show the form for editing the API client.
     */
    public function edit(int $id): View
    {
        $client = User::with('wallet')->where('role', UserRole::API_CLIENT)->findOrFail($id);

        $ipWhitelistString = !empty($client->api_ip_whitelist) && is_array($client->api_ip_whitelist)
            ? implode("\n", $client->api_ip_whitelist)
            : '';

        return view('admin.api-clients.edit', compact('client', 'ipWhitelistString'));
    }

    /**
     * Update the specified API client.
     */
    public function update(UpdateApiClientRequest $request, int $id): RedirectResponse
    {
        $client = User::where('role', UserRole::API_CLIENT)->findOrFail($id);
        $data = $request->validated();

        $ipWhitelist = null;
        if (!empty($data['api_ip_whitelist'])) {
            $ipWhitelist = array_values(array_filter(array_map('trim', preg_split('/[\r\n,]+/', $data['api_ip_whitelist']))));
        }

        $client->update([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'status' => $data['status'],
            'api_rate_limit' => $data['api_rate_limit'] ?? 60,
            'webhook_url' => $data['webhook_url'] ?? null,
            'api_ip_whitelist' => $ipWhitelist,
        ]);

        return redirect()->route('admin.api-clients.index')->with('success', 'تم تحديث بيانات عميل الـ API بنجاح.');
    }

    /**
     * Regenerate API Key and Secret for a client.
     */
    public function regenerateCredentials(int $id): RedirectResponse
    {
        $client = User::where('role', UserRole::API_CLIENT)->findOrFail($id);
        $credentials = User::generateApiCredentials();

        $client->update([
            'api_key' => $credentials['api_key'],
            'api_secret' => $credentials['hashed_secret'],
        ]);

        return back()->with([
            'success' => 'تم إعادة توليد مفاتيح الـ API بنجاح. يرجى نسخ الرمز السري الجديد الآن فلن يظهر مجدداً.',
            'new_client_credentials' => [
                'name' => $client->name,
                'api_key' => $credentials['api_key'],
                'api_secret' => $credentials['raw_secret'],
            ],
        ]);
    }

    /**
     * Toggle client active/suspended status.
     */
    public function toggleActive(int $id): RedirectResponse
    {
        $client = User::where('role', UserRole::API_CLIENT)->findOrFail($id);
        $newStatus = $client->status === UserStatus::ACTIVE ? UserStatus::SUSPENDED : UserStatus::ACTIVE;

        $client->update(['status' => $newStatus]);

        $msg = $newStatus === UserStatus::ACTIVE ? 'تم تفعيل حساب الـ API بنجاح.' : 'تم إيقاف حساب الـ API مؤقتاً.';
        return back()->with('success', $msg);
    }

    /**
     * Show custom pricing matrix for this API client.
     */
    public function pricing(int $id): View
    {
        $client = User::where('role', UserRole::API_CLIENT)->findOrFail($id);

        $categories = Category::with(['products' => function ($q) {
            $q->where('is_active', true)->with(['tiers' => function ($t) {
                $t->where('is_active', true)->orderBy('sort_order', 'asc');
            }]);
        }])->where('is_active', true)->orderBy('sort_order', 'asc')->get();

        $customPrices = ApiClientPrice::where('user_id', $client->id)
            ->pluck('custom_price', 'product_tier_id')
            ->toArray();

        return view('admin.api-clients.pricing', compact('client', 'categories', 'customPrices'));
    }

    /**
     * Update custom pricing overrides for this API client.
     */
    public function updatePricing(Request $request, int $id): RedirectResponse
    {
        $client = User::where('role', UserRole::API_CLIENT)->findOrFail($id);
        $prices = $request->input('prices', []);

        DB::transaction(function () use ($client, $prices) {
            foreach ($prices as $tierId => $customPrice) {
                $tier = ProductTier::find($tierId);
                if (!$tier) {
                    continue;
                }

                if ($customPrice === '' || $customPrice === null) {
                    // Remove custom override
                    ApiClientPrice::where('user_id', $client->id)
                        ->where('product_tier_id', $tierId)
                        ->delete();
                } else {
                    $priceVal = max(0, (float) $customPrice);
                    ApiClientPrice::updateOrCreate(
                        ['user_id' => $client->id, 'product_tier_id' => $tierId],
                        ['custom_price' => $priceVal, 'is_active' => true]
                    );
                }
            }
        });

        return back()->with('success', 'تم حفظ وتحديث مصفوفة أسعار العميل المخصصة بنجاح.');
    }

    /**
     * View API logs for this client.
     */
    public function logs(int $id, Request $request): View
    {
        $client = User::where('role', UserRole::API_CLIENT)->findOrFail($id);

        $query = ApiLog::where('user_id', $client->id);

        if ($request->filled('method')) {
            $query->where('method', strtoupper($request->input('method')));
        }

        if ($request->filled('status_code')) {
            $query->where('response_status', $request->input('status_code'));
        }

        if ($request->filled('endpoint')) {
            $query->where('endpoint', 'like', '%' . $request->input('endpoint') . '%');
        }

        $logs = $query->latest('id')->paginate(25)->withQueryString();

        return view('admin.api-clients.logs', compact('client', 'logs'));
    }
}
