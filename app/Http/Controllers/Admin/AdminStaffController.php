<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Wallet;
use App\Support\PermissionsMatrix;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\View\View;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class AdminStaffController extends Controller
{
    /**
     * Display a listing of all admin staff members.
     */
    public function index(Request $request): View
    {
        $query = User::query()
            ->where(function ($q) {
                $q->where('role', UserRole::ADMIN)
                  ->orWhereHas('roles', function ($rq) {
                      $rq->whereNotIn('name', ['customer', 'agent', 'api_client']);
                  });
            })
            ->with(['roles', 'permissions', 'wallet'])
            ->latest('id');

        if ($request->filled('search')) {
            $search = trim($request->search);
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        if ($request->filled('role')) {
            $roleFilter = $request->role;
            $query->whereHas('roles', fn($q) => $q->where('name', $roleFilter));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $admins = $query->paginate(15)->withQueryString();
        $allRoles = Role::whereNotIn('name', ['customer', 'agent', 'api_client'])->get();
        $rolePresets = PermissionsMatrix::rolePresets();

        return view('admin.admins.index', compact('admins', 'allRoles', 'rolePresets'));
    }

    /**
     * Show the form for creating a new admin staff member.
     */
    public function create(): View
    {
        $allRoles = Role::whereNotIn('name', ['customer', 'agent', 'api_client'])->get();
        $matrix = PermissionsMatrix::all();
        $rolePresets = PermissionsMatrix::rolePresets();
        $defaultPermissions = PermissionsMatrix::defaultRolePermissions();

        return view('admin.admins.create', compact('allRoles', 'matrix', 'rolePresets', 'defaultPermissions'));
    }

    /**
     * Store a newly created admin staff member in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'email' => 'required|email|max:190|unique:users,email',
            'phone' => 'nullable|string|max:30|unique:users,phone',
            'password' => 'required|string|min:8|confirmed',
            'role_name' => 'required|string|exists:roles,name',
            'status' => 'required|string|in:active,banned,pending_verification',
            'permissions' => 'nullable|array',
            'permissions.*' => 'string|exists:permissions,name',
        ], [
            'name.required' => 'اسم المشرف مطلوب.',
            'email.required' => 'البريد الإلكتروني مطلوب.',
            'email.unique' => 'البريد الإلكتروني مسجل مسبقاً لمستخدم آخر.',
            'phone.unique' => 'رقم الهاتف مسجل مسبقاً لمستخدم آخر.',
            'password.required' => 'كلمة المرور مطلوبة.',
            'password.min' => 'كلمة المرور يجب أن لا تقل عن 8 أحرف.',
            'password.confirmed' => 'تأكيد كلمة المرور غير متطابق.',
            'role_name.required' => 'يرجى اختيار الدور الإداري للمشرف.',
            'role_name.exists' => 'الدور الإداري المحدد غير موجود.',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'password' => Hash::make($validated['password']),
            'role' => UserRole::ADMIN,
            'status' => UserStatus::from($validated['status']),
            'currency' => 'EGP',
            'api_key' => Str::random(32),
            'email_verified_at' => now(),
            'phone_verified_at' => now(),
        ]);

        // Assign Spatie Role
        $role = Role::findByName($validated['role_name'], 'web');
        $user->syncRoles([$role]);

        // Sync Direct Granular Permissions
        $permissions = $validated['permissions'] ?? [];
        if (!empty($permissions)) {
            $user->syncPermissions($permissions);
        } else {
            $user->syncPermissions([]);
        }

        // Initialize Admin Wallet
        Wallet::firstOrCreate(
            ['user_id' => $user->id, 'currency' => 'EGP'],
            ['balance' => 0, 'frozen_balance' => 0, 'is_locked' => false]
        );

        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        return redirect()->route('admin.admins.index')
            ->with('success', "تم إضافة المشرف الجديد '{$user->name}' وتحديد صلاحياته بنجاح.");
    }

    /**
     * Show the form for editing the specified admin staff member.
     */
    public function edit(int $id): View
    {
        $admin = User::with(['roles', 'permissions'])->findOrFail($id);
        $allRoles = Role::whereNotIn('name', ['customer', 'agent', 'api_client'])->get();
        $matrix = PermissionsMatrix::all();
        $rolePresets = PermissionsMatrix::rolePresets();
        $defaultPermissions = PermissionsMatrix::defaultRolePermissions();

        // Direct permissions + Role permissions
        $assignedPermissions = $admin->getAllPermissions()->pluck('name')->toArray();
        $directPermissions = $admin->permissions->pluck('name')->toArray();
        $currentRole = $admin->roles->first()?->name ?? 'super_admin';

        return view('admin.admins.edit', compact(
            'admin',
            'allRoles',
            'matrix',
            'rolePresets',
            'defaultPermissions',
            'assignedPermissions',
            'directPermissions',
            'currentRole'
        ));
    }

    /**
     * Update the specified admin staff member in storage.
     */
    public function update(Request $request, int $id): RedirectResponse
    {
        $admin = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'email' => 'required|email|max:190|unique:users,email,' . $admin->id,
            'phone' => 'nullable|string|max:30|unique:users,phone,' . $admin->id,
            'password' => 'nullable|string|min:8|confirmed',
            'role_name' => 'required|string|exists:roles,name',
            'status' => 'required|string|in:active,banned,pending_verification',
            'permissions' => 'nullable|array',
            'permissions.*' => 'string|exists:permissions,name',
        ], [
            'name.required' => 'اسم المشرف مطلوب.',
            'email.required' => 'البريد الإلكتروني مطلوب.',
            'email.unique' => 'البريد الإلكتروني مسجل مسبقاً لمستخدم آخر.',
            'phone.unique' => 'رقم الهاتف مسجل مسبقاً لمستخدم آخر.',
            'password.min' => 'كلمة المرور يجب أن لا تقل عن 8 أحرف.',
            'password.confirmed' => 'تأكيد كلمة المرور غير متطابق.',
            'role_name.required' => 'يرجى اختيار الدور الإداري للمشرف.',
        ]);

        $updateData = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'status' => UserStatus::from($validated['status']),
            'role' => UserRole::ADMIN,
        ];

        if (!empty($validated['password'])) {
            $updateData['password'] = Hash::make($validated['password']);
        }

        $admin->update($updateData);

        // Update Spatie Role
        $role = Role::findByName($validated['role_name'], 'web');
        $admin->syncRoles([$role]);

        // Sync Direct Granular Permissions
        $permissions = $validated['permissions'] ?? [];
        $admin->syncPermissions($permissions);

        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        return redirect()->route('admin.admins.index')
            ->with('success', "تم تحديث بيانات وصلاحيات المشرف '{$admin->name}' بنجاح.");
    }

    /**
     * Toggle the active status of an admin staff member.
     */
    public function toggleStatus(int $id): RedirectResponse
    {
        $admin = User::findOrFail($id);

        if ($admin->id === Auth::id()) {
            return back()->with('error', 'لا يمكنك حظر أو تعطيل حسابك الشخصي الحالي.');
        }

        if ($admin->email === 'admin@emperor.com') {
            return back()->with('error', 'لا يمكن تعطيل حساب المدير العام الأساسي للمنصة.');
        }

        $newStatus = $admin->status === UserStatus::ACTIVE ? UserStatus::BANNED : UserStatus::ACTIVE;
        $admin->update(['status' => $newStatus]);

        $statusText = $newStatus === UserStatus::ACTIVE ? 'تفعيل' : 'إيقاف وتعطيل';
        return back()->with('success', "تم {$statusText} حساب المشرف '{$admin->name}' بنجاح.");
    }

    /**
     * Remove the specified admin staff member from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        $admin = User::findOrFail($id);

        if ($admin->id === Auth::id()) {
            return back()->with('error', 'لا يمكنك حذف حسابك الشخصي المسجل به حالياً.');
        }

        if ($admin->email === 'admin@emperor.com') {
            return back()->with('error', 'لا يمكن حذف الحساب الأساسي للمدير العام.');
        }

        $adminName = $admin->name;
        $admin->syncRoles([]);
        $admin->syncPermissions([]);
        $admin->delete();

        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        return redirect()->route('admin.admins.index')
            ->with('success', "تم حذف المشرف '{$adminName}' وسحب كافة الصلاحيات بنجاح.");
    }
}
