<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Support\PermissionsMatrix;
use App\Traits\LogsAdminActivity;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RoleController extends Controller
{
    /**
     * Display a listing of all roles.
     */
    public function index(Request $request): View
    {
        $roles = Role::withCount(['permissions', 'users'])
            ->orderBy('id', 'asc')
            ->get();

        $matrix = PermissionsMatrix::all();
        $rolePresets = PermissionsMatrix::rolePresets();

        return view('admin.roles.index', compact('roles', 'matrix', 'rolePresets'));
    }

    /**
     * Show the form for creating a new role.
     */
    public function create(): View
    {
        $matrix = PermissionsMatrix::all();
        $rolePresets = PermissionsMatrix::rolePresets();
        $defaultPermissions = PermissionsMatrix::defaultRolePermissions();

        return view('admin.roles.create', compact('matrix', 'rolePresets', 'defaultPermissions'));
    }

    /**
     * Store a newly created role in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50|unique:roles,name',
            'display_name' => 'nullable|string|max:100',
            'permissions' => 'nullable|array',
            'permissions.*' => 'string|exists:permissions,name',
        ], [
            'name.required' => 'يرجى إدخال المسمى التقني للدور باللغة الإنجليزية.',
            'name.unique' => 'اسم الدور مستخدم مسبقاً في النظام.',
            'permissions.*.exists' => 'إحدى الصلاحيات المحددة غير صالحة.',
        ]);

        $role = Role::create([
            'name' => $validated['name'],
            'guard_name' => 'web',
        ]);

        if (!empty($validated['permissions'])) {
            $role->syncPermissions($validated['permissions']);
        }

        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        return redirect()->route('admin.roles.index')
            ->with('success', "تم إنشاء الدور '{$role->name}' وتعيين الصلاحيات بنجاح.");
    }

    /**
     * Show the form for editing the specified role.
     */
    public function edit(int $id): View
    {
        $role = Role::with('permissions')->findOrFail($id);
        $matrix = PermissionsMatrix::all();
        $rolePresets = PermissionsMatrix::rolePresets();
        $defaultPermissions = PermissionsMatrix::defaultRolePermissions();
        $rolePermissions = $role->permissions->pluck('name')->toArray();

        return view('admin.roles.edit', compact('role', 'matrix', 'rolePresets', 'defaultPermissions', 'rolePermissions'));
    }

    /**
     * Update the specified role in storage.
     */
    public function update(Request $request, int $id): RedirectResponse
    {
        $role = Role::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:50|unique:roles,name,' . $role->id,
            'permissions' => 'nullable|array',
            'permissions.*' => 'string|exists:permissions,name',
        ], [
            'name.required' => 'اسم الدور مطلوب.',
            'name.unique' => 'اسم الدور مستخدم مسبقاً.',
        ]);

        // Prevent renaming super_admin or admin
        if (in_array($role->name, ['super_admin', 'admin']) && $validated['name'] !== $role->name) {
            return back()->with('error', 'لا يمكن تغيير المسمى التقني للدور الرئيسي للنظام.');
        }

        $role->update(['name' => $validated['name']]);

        $permissions = $validated['permissions'] ?? [];
        $role->syncPermissions($permissions);

        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        return redirect()->route('admin.roles.index')
            ->with('success', "تم تحديث مصفوفة صلاحيات الدور '{$role->name}' بنجاح.");
    }

    /**
     * Remove the specified role from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        $role = Role::withCount('users')->findOrFail($id);

        if (in_array($role->name, ['super_admin', 'admin', 'customer', 'agent', 'api_client'])) {
            return back()->with('error', 'لا يمكن حذف الأدوار الأساسية الخاصة بالنظام.');
        }

        if ($role->users_count > 0) {
            return back()->with('error', "لا يمكن حذف الدور لأنه مرتبط حالياً بـ {$role->users_count} مشرف/مستخدم.");
        }

        $roleName = $role->name;
        $role->delete();

        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        return redirect()->route('admin.roles.index')
            ->with('success', "تم حذف الدور '{$roleName}' بنجاح.");
    }
}
