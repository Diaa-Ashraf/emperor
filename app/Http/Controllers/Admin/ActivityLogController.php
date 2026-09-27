<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\View\View;

class ActivityLogController extends Controller
{
    /**
     * Display admin audit activity logs ledger.
     */
    public function index(Request $request): View
    {
        $query = AuditLog::query()
            ->with(['user:id,name,email,role'])
            ->select(['id', 'user_id', 'action', 'auditable_type', 'auditable_id', 'old_values', 'new_values', 'ip_address', 'created_at']);

        if ($adminId = $request->input('user_id')) {
            $query->where('user_id', $adminId);
        }

        if ($action = $request->input('action')) {
            $query->where('action', $action);
        }

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('action', 'like', "%{$search}%")
                  ->orWhere('auditable_type', 'like', "%{$search}%")
                  ->orWhere('ip_address', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($uq) use ($search) {
                      $uq->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                  });
            });
        }

        $logs = $query->latest('id')->paginate(20)->withQueryString();
        $admins = User::whereIn('role', ['admin', 'agent'])->select(['id', 'name'])->get();

        return view('admin.audit-logs.index', compact('logs', 'admins'));
    }
}
