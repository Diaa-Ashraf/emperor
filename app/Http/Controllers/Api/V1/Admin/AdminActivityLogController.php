<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Setting;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminActivityLogController extends Controller
{
    use ApiResponse;

    /**
     * Paginated audit logs for supervisor & admin monitoring.
     * Matches Screenshot 5.
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = min((int) ($request->input('per_page', 20)), 100);

        $query = AuditLog::query()
            ->select([
                'id',
                'user_id',
                'action',
                'auditable_type',
                'auditable_id',
                'old_values',
                'new_values',
                'ip_address',
                'created_at',
            ])
            ->with(['user:id,name,email,role,avatar'])
            ->latest('id');

        if ($request->filled('search')) {
            $search = trim($request->input('search'));
            $query->where(function ($q) use ($search) {
                $q->where('action', 'like', "%{$search}%")
                    ->orWhere('auditable_type', 'like', "%{$search}%")
                    ->orWhere('auditable_id', $search)
                    ->orWhereHas('user', function ($uq) use ($search) {
                        $uq->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    });
            });
        }

        if ($request->filled('action')) {
            $query->where('action', $request->input('action'));
        }

        $logs = $query->paginate($perPage);

        $defaultAdminName = Setting::get('site_name', 'سند ومهره كارد');

        // Transform log items with clean Arabic titles and descriptions
        $logs->getCollection()->transform(function ($log) use ($defaultAdminName) {
            $user = $log->user;
            $adminName = $user ? $user->name : $defaultAdminName;
            $adminPublicId = $user ? substr(md5('user_' . $user->id), 0, 24) : '6ad32ea7da22aad32144c162';

            $title = 'تحديث بيانات في النظام';
            $desc = 'تم تسجيل عملية وتعديل السجل في النظام.';

            $type = class_basename($log->auditable_type ?? '');

            if ($log->action === 'updated' && $type === 'User') {
                if (isset($log->new_values['api_access_status']) || isset($log->new_values['role'])) {
                    $title = 'تحديث صلاحيات مستخدم';
                    $desc = 'تم تحديث صلاحيات الحساب والرتبة الإدارية بنجاح.';
                } elseif (isset($log->new_values['status'])) {
                    $title = 'تعديل حالة حساب';
                    $desc = 'تم تحديث حالة المستخدم في النظام فوراً.';
                } elseif (isset($log->new_values['password'])) {
                    $title = 'تغيير كلمة مرور';
                    $desc = 'تم تحديث كلمة المرور للحساب من قبل الإدارة.';
                } else {
                    $title = 'تحديث بيانات مستخدم';
                    $desc = "تم تعديل بيانات المستخدم معرّف #{$log->auditable_id}";
                }
            } elseif ($type === 'Wallet' || $type === 'WalletTransaction') {
                $title = 'تعديل رصيد محفظة';
                $desc = "عملية مالية مسجلة على المحفظة #{$log->auditable_id}";
            } elseif ($type === 'DepositRequest') {
                $title = 'معالجة طلب إيداع';
                $desc = "تم تحديث حالة طلب الشحن اليدوي #{$log->auditable_id}";
            } elseif ($type === 'TargetSellOrder') {
                $title = 'معالجة تارجت التطبيقات';
                $desc = "تمت مراجعة وتحديث حالة طلب بيع التارجت #{$log->auditable_id}";
            } elseif ($log->action === 'created') {
                $title = "إضافة سجل جديد ({$type})";
                $desc = "تم إنشاء السجل بنجاح في قاعدة البيانات.";
            } elseif ($log->action === 'deleted') {
                $title = "حذف سجل ({$type})";
                $desc = "تم حذف العنصر من النظام.";
            }

            return [
                'id' => $log->id,
                'action_title' => $title,
                'action_desc' => $desc,
                'admin_name' => $adminName,
                'admin_public_id' => $adminPublicId,
                'admin_avatar' => $user?->avatar,
                'created_at' => $log->created_at,
                'raw_action' => $log->action,
                'type' => $type,
            ];
        });

        return $this->successResponse($logs, 'تم جلب سجل مراقبة المشرفين بنجاح');
    }
}

