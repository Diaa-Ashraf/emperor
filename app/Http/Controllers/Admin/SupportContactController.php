<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SupportContact;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class SupportContactController extends Controller
{
    /**
     * Display support contacts list.
     */
    public function index(): View
    {
        $contacts = SupportContact::orderBy('sort_order')
            ->orderBy('id', 'asc')
            ->get();

        return view('admin.support-contacts.index', compact('contacts'));
    }

    /**
     * Show create support contact form.
     */
    public function create(): View
    {
        return view('admin.support-contacts.create');
    }

    /**
     * Store new support contact.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'channel' => ['required', 'string', 'in:whatsapp,telegram,phone,email'],
            'value' => ['required', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:50'],
            'description' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ], [
            'name.required' => 'اسم جهة الاتصال أو الفريق مطلوب.',
            'channel.required' => 'يرجى اختيار وسيلة الاتصال.',
            'value.required' => 'الرقم أو المعرف أو البريد مطلوب.',
        ]);

        SupportContact::create([
            'name' => $validated['name'],
            'channel' => $validated['channel'],
            'value' => $validated['value'],
            'icon' => $validated['icon'] ?? null,
            'description' => $validated['description'] ?? null,
            'sort_order' => (int) ($validated['sort_order'] ?? 0),
            'is_active' => isset($validated['is_active']) ? (bool) $validated['is_active'] : true,
        ]);

        return redirect()->route('admin.support-contacts.index')
            ->with('success', 'تمت إضافة وسيلة الدعم الفني بنجاح.');
    }

    /**
     * Show edit support contact form.
     */
    public function edit(int $id): View
    {
        $contact = SupportContact::findOrFail($id);
        return view('admin.support-contacts.edit', compact('contact'));
    }

    /**
     * Update support contact.
     */
    public function update(Request $request, int $id): RedirectResponse
    {
        $contact = SupportContact::findOrFail($id);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'channel' => ['required', 'string', 'in:whatsapp,telegram,phone,email'],
            'value' => ['required', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:50'],
            'description' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ], [
            'name.required' => 'اسم جهة الاتصال أو الفريق مطلوب.',
            'channel.required' => 'يرجى اختيار وسيلة الاتصال.',
            'value.required' => 'الرقم أو المعرف أو البريد مطلوب.',
        ]);

        $contact->update([
            'name' => $validated['name'],
            'channel' => $validated['channel'],
            'value' => $validated['value'],
            'icon' => $validated['icon'] ?? null,
            'description' => $validated['description'] ?? null,
            'sort_order' => (int) ($validated['sort_order'] ?? 0),
            'is_active' => isset($validated['is_active']) ? (bool) $validated['is_active'] : false,
        ]);

        return redirect()->route('admin.support-contacts.index')
            ->with('success', 'تم تحديث وسيلة الدعم الفني بنجاح.');
    }

    /**
     * Toggle active state.
     */
    public function toggleActive(int $id): RedirectResponse
    {
        $contact = SupportContact::findOrFail($id);
        $contact->update(['is_active' => !$contact->is_active]);

        $state = $contact->is_active ? 'تفعيل' : 'تعطيل';
        return back()->with('success', "تم {$state} وسيلة الدعم ({$contact->name}) بنجاح.");
    }

    /**
     * Delete support contact.
     */
    public function destroy(int $id): RedirectResponse
    {
        $contact = SupportContact::findOrFail($id);
        $contact->delete();

        return redirect()->route('admin.support-contacts.index')
            ->with('success', 'تم حذف وسيلة الدعم الفني بنجاح.');
    }
}
