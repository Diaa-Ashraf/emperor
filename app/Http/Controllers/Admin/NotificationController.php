<?php

namespace App\Http\Controllers\Admin;

use App\DTOs\NotificationPayloadDTO;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\NotificationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;

class NotificationController extends Controller
{
    public function __construct(
        protected NotificationService $notificationService
    ) {}

    /**
     * Show notifications management and broadcast center.
     */
    public function index(Request $request): View
    {
        $notifications = DB::table('notifications')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        $totalUsers = User::count();

        return view('admin.notifications.index', compact('notifications', 'totalUsers'));
    }

    /**
     * Send broadcast or targeted notification.
     */
    public function send(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => 'required|string|max:150',
            'body' => 'required|string|max:1000',
            'target' => 'required|in:all,specific',
            'user_id' => 'required_if:target,specific|nullable|exists:users,id',
            'link' => 'nullable|string|max:255',
            'image_url' => 'nullable|url|max:255',
        ], [
            'title.required' => 'يرجى إدخال عنوان الإشعار.',
            'body.required' => 'يرجى إدخال نص الإشعار.',
            'user_id.exists' => 'المستخدم المحدد غير موجود.',
        ]);

        $payload = new NotificationPayloadDTO(
            title: $request->input('title'),
            body: $request->input('body'),
            type: 'broadcast',
            link: $request->input('link') ?: '/notifications',
            imageUrl: $request->input('image_url'),
            data: [
                'sender' => 'admin',
                'sent_at' => now()->toIso8601String(),
            ]
        );

        if ($request->input('target') === 'specific') {
            $user = User::findOrFail($request->input('user_id'));
            $this->notificationService->notify($user, $payload);
            return back()->with('success', "تم إرسال الإشعار بنجاح إلى المستخدم ({$user->name}).");
        }

        // Broadcast to all users in chunks
        User::select(['id', 'name', 'phone', 'fcm_token'])
            ->chunkById(100, function ($users) use ($payload) {
                foreach ($users as $user) {
                    $this->notificationService->notify($user, $payload);
                }
            });

        return back()->with('success', 'تم إرسال الإشعار الجماعي بنجاح لجميع مستخدمي المنصة!');
    }

    /**
     * Mark all notifications as read for current admin.
     */
    public function markAllRead(Request $request)
    {
        $user = auth()->user();
        if ($user) {
            DB::table('notifications')
                ->where('notifiable_type', User::class)
                ->where('notifiable_id', $user->id)
                ->whereNull('read_at')
                ->update(['read_at' => now()]);

            // Save dismiss timestamp in session so operational counters can also be acknowledged
            session(['admin_alerts_dismissed_at' => now()->toIso8601String()]);
        }

        if ($request->expectsJson() || $request->ajax()) {
            return response()->json([
                'status' => 'success',
                'message' => 'تم تعيين جميع الإشعارات كمقروءة بنجاح.',
            ]);
        }

        return back()->with('success', 'تم تعيين جميع الإشعارات كمقروءة بنجاح.');
    }

    /**
     * Mark a specific notification as read.
     */
    public function markRead(Request $request, string $id)
    {
        $user = auth()->user();
        if ($user) {
            DB::table('notifications')
                ->where('id', $id)
                ->where('notifiable_id', $user->id)
                ->update(['read_at' => now()]);
        }

        if ($request->expectsJson() || $request->ajax()) {
            return response()->json([
                'status' => 'success',
                'message' => 'تم قراءة الإشعار.',
            ]);
        }

        return back()->with('success', 'تم قراءة الإشعار بنجاح.');
    }
}

