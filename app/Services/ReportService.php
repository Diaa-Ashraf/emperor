<?php

namespace App\Services;

use App\Enums\OrderStatus;
use App\Models\Order;
use App\Models\TargetSellOrder;
use App\Models\User;
use App\Models\WalletTransaction;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class ReportService
{
    /**
     * Get dashboard summary statistics.
     */
    public function getDashboardSummary(): array
    {
        $today = Carbon::today();
        $thisMonth = Carbon::now()->startOfMonth();

        return [
            'total_sales' => (float) Order::where('status', OrderStatus::COMPLETED)->sum('total_amount'),
            'today_sales' => (float) Order::where('status', OrderStatus::COMPLETED)->where('created_at', '>=', $today)->sum('total_amount'),
            'total_profit' => (float) Order::where('status', OrderStatus::COMPLETED)->sum('profit_amount'),
            'today_profit' => (float) Order::where('status', OrderStatus::COMPLETED)->where('created_at', '>=', $today)->sum('profit_amount'),
            'pending_orders' => Order::whereIn('status', [OrderStatus::PENDING, OrderStatus::PROCESSING, OrderStatus::MANUAL_REVIEW])->count(),
            'total_users' => User::count(),
            'new_users_today' => User::where('created_at', '>=', $today)->count(),
            'pending_targets' => TargetSellOrder::where('status', 'pending')->count(),
        ];
    }
}
