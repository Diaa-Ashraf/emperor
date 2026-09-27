<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProviderRequest;
use App\Http\Requests\Admin\UpdateProviderRequest;
use App\Models\Provider;
use App\Services\ProviderManagerService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class ProviderController extends Controller
{
    public function __construct(
        protected ProviderManagerService $providerManager
    ) {}

    public function index(): View
    {
        $providers = Provider::query()
            ->select(['id', 'name', 'driver', 'base_url', 'priority', 'balance', 'balance_currency', 'is_active', 'auto_fulfill', 'created_at'])
            ->withCount(['productProviders', 'orders'])
            ->orderBy('priority', 'asc')
            ->paginate(15);

        return view('admin.providers.index', compact('providers'));
    }

    public function create(): View
    {
        return view('admin.providers.create');
    }

    public function store(StoreProviderRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['auto_fulfill'] = $request->boolean('auto_fulfill', true);

        Provider::create($validated);

        return redirect()
            ->route('admin.providers.index')
            ->with('success', 'تم إضافة المزود بنجاح.');
    }

    public function edit(int $id): View
    {
        $provider = Provider::findOrFail($id);

        return view('admin.providers.edit', compact('provider'));
    }

    public function update(UpdateProviderRequest $request, int $id): RedirectResponse
    {
        $provider = Provider::findOrFail($id);
        $validated = $request->validated();
        $validated['is_active'] = $request->boolean('is_active');
        $validated['auto_fulfill'] = $request->boolean('auto_fulfill');

        if (empty($validated['api_key'])) {
            unset($validated['api_key']);
        }
        if (empty($validated['api_secret'])) {
            unset($validated['api_secret']);
        }
        if (empty($validated['webhook_secret'])) {
            unset($validated['webhook_secret']);
        }

        $provider->update($validated);

        return redirect()
            ->route('admin.providers.index')
            ->with('success', 'تم تحديث بيانات المزود بنجاح.');
    }

    public function toggleActive(int $id): RedirectResponse
    {
        $provider = Provider::findOrFail($id);
        $provider->update(['is_active' => !$provider->is_active]);

        $status = $provider->is_active ? 'تفعيل' : 'تعطيل';
        return back()->with('success', "تم {$status} المزود بنجاح.");
    }

    public function checkBalance(int $id): JsonResponse
    {
        $provider = Provider::findOrFail($id);
        $adapter = $this->providerManager->resolveAdapter($provider->driver, $provider->config ?? []);
        $balanceInfo = $adapter->checkBalance();

        if (isset($balanceInfo['balance'])) {
            $provider->update(['balance' => $balanceInfo['balance']]);
        }

        return response()->json([
            'status' => 'success',
            'balance' => $balanceInfo['balance'] ?? $provider->balance,
            'currency' => $balanceInfo['currency'] ?? $provider->balance_currency,
            'message' => 'تم فحص وتحديث رصيد المزود بنجاح.',
        ]);
    }
}
