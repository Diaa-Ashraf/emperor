<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\PaymentGroup;
use App\Models\PaymentMethod;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminPaymentMethodController extends Controller
{
    use ApiResponse;

    /**
     * Get payment groups and methods for admin management.
     */
    public function index(): JsonResponse
    {
        $groups = PaymentGroup::with(['paymentMethods' => function ($query) {
            $query->orderBy('sort_order')->orderBy('id');
        }])->get();

        // Also fetch any standalone methods not tied to a group
        $standaloneMethods = PaymentMethod::whereNull('payment_group_id')
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        $totalMethods = PaymentMethod::count();
        $activeMethods = PaymentMethod::where('is_active', true)->count();

        return $this->successResponse([
            'groups' => $groups,
            'standalone_methods' => $standaloneMethods,
            'stats' => [
                'total_methods' => $totalMethods,
                'active_methods' => $activeMethods,
                'total_groups' => $groups->count(),
                'standalone_count' => $standaloneMethods->count(),
            ],
        ], 'تم جلب طرق ومجموعات الدفع بنجاح');
    }

    /**
     * Store a new payment group.
     */
    public function storeGroup(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:190',
            'currency' => 'required|string|max:10',
            'description' => 'nullable|string',
            'image' => 'nullable',
            'is_active' => 'nullable',
        ]);

        $imagePath = '1000299968.png';
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('payment_groups', 'public');
            $imagePath = '/storage/' . $path;
        } elseif (!empty($validated['image']) && is_string($validated['image'])) {
            $imagePath = $validated['image'];
        }

        $group = PaymentGroup::create([
            'name' => $validated['name'],
            'currency' => strtoupper($validated['currency']),
            'description' => $validated['description'] ?? null,
            'image' => $imagePath,
            'is_active' => $request->boolean('is_active', true),
        ]);

        return $this->successResponse($group, 'تمت إضافة مجموعة الدفع بنجاح');
    }

    /**
     * Store a new payment method.
     */
    public function storeMethod(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'payment_group_id' => 'nullable',
            'name' => 'required|string|max:190',
            'type' => 'nullable|string|max:100',
            'percent_fee' => 'nullable|numeric|min:0',
            'account_number' => 'nullable|string|max:190',
            'bank_name' => 'nullable|string|max:190',
            'account_holder_name' => 'nullable|string|max:190',
            'instruction' => 'nullable|string',
            'logo' => 'nullable',
            'qr_code' => 'nullable',
            'is_active' => 'nullable',
        ]);

        $codeBase = Str::slug($validated['name'], '-', null);
        if (empty($codeBase) || $codeBase === '-') {
            $codeBase = 'pm';
        }
        $code = $codeBase . '_' . Str::lower(Str::random(5));

        $logoPath = '1000299996.png';
        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('payment_methods', 'public');
            $logoPath = '/storage/' . $path;
        } elseif (!empty($validated['logo']) && is_string($validated['logo'])) {
            $logoPath = $validated['logo'];
        }

        $qrPath = null;
        if ($request->hasFile('qr_code')) {
            $path = $request->file('qr_code')->store('payment_methods', 'public');
            $qrPath = '/storage/' . $path;
        } elseif (!empty($validated['qr_code']) && is_string($validated['qr_code'])) {
            $qrPath = $validated['qr_code'];
        }

        $groupId = !empty($validated['payment_group_id']) ? (int) $validated['payment_group_id'] : null;

        $method = PaymentMethod::create([
            'payment_group_id' => $groupId,
            'name' => $validated['name'],
            'code' => $code,
            'type' => $validated['type'] ?? 'محفظة إلكترونية',
            'currency' => 'EGP',
            'percent_fee' => $validated['percent_fee'] ?? 0,
            'account_number' => $validated['account_number'] ?? null,
            'bank_name' => $validated['bank_name'] ?? null,
            'account_holder_name' => $validated['account_holder_name'] ?? null,
            'instruction' => $validated['instruction'] ?? null,
            'instructions' => $validated['instruction'] ?? null,
            'logo' => $logoPath,
            'qr_code' => $qrPath,
            'is_active' => $request->boolean('is_active', true),
        ]);

        return $this->successResponse($method, 'تمت إضافة طريقة الدفع بنجاح');
    }

    /**
     * Update an existing payment method.
     */
    public function updateMethod(Request $request, int $id): JsonResponse
    {
        $method = PaymentMethod::findOrFail($id);

        $validated = $request->validate([
            'payment_group_id' => 'nullable',
            'name' => 'required|string|max:190',
            'type' => 'nullable|string|max:100',
            'percent_fee' => 'nullable|numeric|min:0',
            'account_number' => 'nullable|string|max:190',
            'bank_name' => 'nullable|string|max:190',
            'account_holder_name' => 'nullable|string|max:190',
            'instruction' => 'nullable|string',
            'logo' => 'nullable',
            'qr_code' => 'nullable',
            'is_active' => 'nullable',
        ]);

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('payment_methods', 'public');
            $method->logo = '/storage/' . $path;
        } elseif ($request->filled('logo') && is_string($request->input('logo'))) {
            $method->logo = $request->input('logo');
        }

        if ($request->hasFile('qr_code')) {
            $path = $request->file('qr_code')->store('payment_methods', 'public');
            $method->qr_code = '/storage/' . $path;
        } elseif ($request->filled('qr_code') && is_string($request->input('qr_code'))) {
            $method->qr_code = $request->input('qr_code');
        }

        $method->name = $validated['name'];
        $method->payment_group_id = !empty($validated['payment_group_id']) ? (int) $validated['payment_group_id'] : null;
        $method->type = $validated['type'] ?? $method->type;
        $method->percent_fee = $validated['percent_fee'] ?? $method->percent_fee;
        $method->account_number = $validated['account_number'] ?? $method->account_number;
        $method->bank_name = $validated['bank_name'] ?? $method->bank_name;
        $method->account_holder_name = $validated['account_holder_name'] ?? $method->account_holder_name;
        $method->instruction = $validated['instruction'] ?? $method->instruction;
        $method->instructions = $validated['instruction'] ?? $method->instructions;
        if ($request->has('is_active')) {
            $method->is_active = $request->boolean('is_active');
        }
        $method->save();

        return $this->successResponse($method, 'تم تحديث طريقة الدفع بنجاح');
    }

    /**
     * Toggle active status.
     */
    public function toggleMethod(int $id): JsonResponse
    {
        $method = PaymentMethod::findOrFail($id);
        $method->is_active = !$method->is_active;
        $method->save();

        return $this->successResponse([
            'id' => $method->id,
            'is_active' => $method->is_active,
        ], 'تم تحديث حالة طريقة الدفع');
    }

    /**
     * Delete payment method.
     */
    public function destroyMethod(int $id): JsonResponse
    {
        $method = PaymentMethod::findOrFail($id);
        $method->delete();

        return $this->successResponse(null, 'تم حذف طريقة الدفع بنجاح');
    }

    /**
     * Delete payment group.
     */
    public function destroyGroup(int $id): JsonResponse
    {
        $group = PaymentGroup::findOrFail($id);
        $group->paymentMethods()->update(['payment_group_id' => null]);
        $group->delete();

        return $this->successResponse(null, 'تم حذف مجموعة الدفع بنجاح');
    }

    /**
     * Clean up all default unassigned/demo payment methods.
     */
    public function deleteDemoMethods(): JsonResponse
    {
        PaymentMethod::whereNull('payment_group_id')->delete();
        return $this->successResponse(null, 'تم حذف كافة طرق الدفع التجريبية السابقة بنجاح');
    }
}
