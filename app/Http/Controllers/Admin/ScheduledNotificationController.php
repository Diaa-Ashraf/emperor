<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ScheduledNotification;
use App\Models\User;
use App\Services\SmartNotificationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class ScheduledNotificationController extends Controller
{
    public function __construct(
        protected SmartNotificationService $smartNotificationService
    ) {}

    /**
     * Display scheduled and past marketing notifications.
     */
    public function index(): View
    {
        $notifications = ScheduledNotification::with('creator:id,name')
            ->latest('id')
            ->paginate(15);

        $users = User::where('status', 'active')->select(['id', 'name', 'phone'])->take(50)->get();

        return view('admin.notifications.scheduled', compact('notifications', 'users'));
    }

    /**
     * Store new scheduled or immediate notification campaign.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string', 'max:1000'],
            'type' => ['required', 'string', 'in:push,in_app,both'],
            'target_audience' => ['required', 'string', 'in:all,active_users,inactive_users,with_balance,specific_users'],
            'target_user_ids' => ['nullable', 'array'],
            'action_url' => ['nullable', 'string', 'max:255'],
            'image_url' => ['nullable', 'string', 'max:255'],
            'send_mode' => ['required', 'string', 'in:now,schedule'],
            'scheduled_at' => ['nullable', 'date'],
        ], [
            'title.required' => 'عنوان الإشعار مطلوب',
            'body.required' => 'نص الإشعار مطلوب',
        ]);

        $isNow = $validated['send_mode'] === 'now';
        $scheduledAt = $isNow ? now() : ($validated['scheduled_at'] ?? now());

        $notification = ScheduledNotification::create([
            'title' => $validated['title'],
            'body' => $validated['body'],
            'type' => $validated['type'],
            'target_audience' => $validated['target_audience'],
            'target_user_ids' => $validated['target_user_ids'] ?? null,
            'action_url' => $validated['action_url'] ?? null,
            'image_url' => $validated['image_url'] ?? null,
            'scheduled_at' => $scheduledAt,
            'is_active' => true,
            'created_by' => auth()->id(),
        ]);

        if ($isNow) {
            $sentCount = $this->smartNotificationService->sendToAudience($notification);
            return back()->with('success', "تم إرسال الحملة الإعلانية فوراً إلى {$sentCount} مستخدم بنجاح!");
        }

        return back()->with('success', 'تمت جدولة الإشعار بنجاح وسيتم إرساله في الموعد المحدد.');
    }

    /**
     * Send immediately.
     */
    public function sendNow(int $id): RedirectResponse
    {
        $notification = ScheduledNotification::findOrFail($id);
        $sentCount = $this->smartNotificationService->sendToAudience($notification);

        return back()->with('success', "تم إرسال الحملة الإعلانية فوراً إلى {$sentCount} مستخدم بنجاح!");
    }

    /**
     * Delete notification.
     */
    public function destroy(int $id): RedirectResponse
    {
        $notification = ScheduledNotification::findOrFail($id);
        $notification->delete();

        return back()->with('success', 'تم حذف الإشعار بنجاح.');
    }
}
