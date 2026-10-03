<?php

namespace App\Services;

use App\Enums\OrderStatus;
use App\Enums\TargetOrderStatus;
use App\Enums\WalletTxType;
use App\Models\DepositRequest;
use App\Models\Order;
use App\Models\Product;
use App\Models\Provider;
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
            'total_deposits' => (float) DepositRequest::where('status', 'approved')->sum('amount'),
            'today_deposits' => (float) DepositRequest::where('status', 'approved')->where('created_at', '>=', $today)->sum('amount'),
        ];
    }

    /**
     * Get advanced comprehensive reports for the admin reports center.
     */
    public function getAdvancedReport(string $range = '30days', ?string $startDate = null, ?string $endDate = null): array
    {
        [$from, $to] = $this->resolveDateRange($range, $startDate, $endDate);

        // 1. Financial Metrics in Range
        $completedOrders = Order::where('status', OrderStatus::COMPLETED)
            ->whereBetween('created_at', [$from, $to]);

        $totalSales = (float) $completedOrders->sum('total_amount');
        $totalProfit = (float) $completedOrders->sum('profit_amount');
        $ordersCount = $completedOrders->count();
        $profitMargin = $totalSales > 0 ? round(($totalProfit / $totalSales) * 100, 2) : 0.0;

        $failedOrdersCount = Order::where('status', OrderStatus::FAILED)
            ->whereBetween('created_at', [$from, $to])
            ->count();

        $totalDeposits = (float) DepositRequest::where('status', 'approved')
            ->whereBetween('created_at', [$from, $to])
            ->sum('amount');

        $totalTargetPayouts = (float) TargetSellOrder::where('status', TargetOrderStatus::PAID)
            ->whereBetween('created_at', [$from, $to])
            ->sum('net_payout');

        $targetOrdersCount = TargetSellOrder::whereBetween('created_at', [$from, $to])->count();
        $autoVerifiedTargetCount = TargetSellOrder::where('auto_verified', true)
            ->whereBetween('created_at', [$from, $to])
            ->count();

        $newUsersCount = User::whereBetween('created_at', [$from, $to])->count();

        // 2. Daily Time Series (Trend chart data)
        $dailyData = $this->getDailyTrendData($from, $to);

        // 3. Top Selling Products
        $topProducts = Order::where('status', OrderStatus::COMPLETED)
            ->whereBetween('created_at', [$from, $to])
            ->select('product_id', DB::raw('SUM(total_amount) as total_revenue'), DB::raw('SUM(profit_amount) as total_profit'), DB::raw('COUNT(*) as orders_count'))
            ->groupBy('product_id')
            ->orderByDesc('total_revenue')
            ->with('product:id,name,image,type')
            ->take(8)
            ->get();

        // 4. Target Selling Apps Breakdown
        $targetAppsBreakdown = TargetSellOrder::where('status', TargetOrderStatus::PAID)
            ->whereBetween('created_at', [$from, $to])
            ->select('product_id', DB::raw('SUM(target_points) as total_points'), DB::raw('SUM(net_payout) as total_payout'), DB::raw('COUNT(*) as count'))
            ->groupBy('product_id')
            ->orderByDesc('total_payout')
            ->with('product:id,name,image')
            ->take(6)
            ->get();

        // 5. User Trust Levels Distribution
        $trustLevels = User::select('trust_level', DB::raw('COUNT(*) as count'))
            ->groupBy('trust_level')
            ->pluck('count', 'trust_level')
            ->toArray();

        // 6. Top Spenders (VIP Customers)
        $topCustomers = Order::where('status', OrderStatus::COMPLETED)
            ->whereBetween('created_at', [$from, $to])
            ->select('user_id', DB::raw('SUM(total_amount) as total_spent'), DB::raw('COUNT(*) as orders_count'))
            ->groupBy('user_id')
            ->orderByDesc('total_spent')
            ->with('user:id,name,phone,email,trust_level')
            ->take(8)
            ->get();

        // 7. Providers Delivery Performance
        $providers = Provider::where('is_active', true)->select(['id', 'name', 'driver', 'balance', 'balance_currency'])->get();

        return [
            'range' => $range,
            'from' => $from->toDateString(),
            'to' => $to->toDateString(),
            'metrics' => [
                'total_sales' => $totalSales,
                'total_profit' => $totalProfit,
                'profit_margin' => $profitMargin,
                'orders_count' => $ordersCount,
                'failed_orders_count' => $failedOrdersCount,
                'total_deposits' => $totalDeposits,
                'total_target_payouts' => $totalTargetPayouts,
                'target_orders_count' => $targetOrdersCount,
                'auto_verified_target_count' => $autoVerifiedTargetCount,
                'new_users_count' => $newUsersCount,
            ],
            'chart_data' => $dailyData,
            'top_products' => $topProducts,
            'target_apps' => $targetAppsBreakdown,
            'trust_levels' => $trustLevels,
            'top_customers' => $topCustomers,
            'providers' => $providers,
        ];
    }

    /**
     * Build date range Carbon instances.
     */
    protected function resolveDateRange(string $range, ?string $start, ?string $end): array
    {
        $now = Carbon::now();

        return match ($range) {
            'today' => [$now->copy()->startOfDay(), $now->copy()->endOfDay()],
            'yesterday' => [$now->copy()->subDay()->startOfDay(), $now->copy()->subDay()->endOfDay()],
            '7days' => [$now->copy()->subDays(6)->startOfDay(), $now->copy()->endOfDay()],
            'this_month' => [$now->copy()->startOfMonth(), $now->copy()->endOfDay()],
            'last_month' => [$now->copy()->subMonth()->startOfMonth(), $now->copy()->subMonth()->endOfMonth()],
            'custom' => [
                $start ? Carbon::parse($start)->startOfDay() : $now->copy()->subDays(29)->startOfDay(),
                $end ? Carbon::parse($end)->endOfDay() : $now->copy()->endOfDay()
            ],
            '30days' => [$now->copy()->subDays(29)->startOfDay(), $now->copy()->endOfDay()],
            default => [$now->copy()->subDays(29)->startOfDay(), $now->copy()->endOfDay()],
        };
    }

    /**
     * Get grouped daily trend data for charts.
     */
    protected function getDailyTrendData(Carbon $from, Carbon $to): array
    {
        $days = [];
        $sales = [];
        $profits = [];
        $orders = [];

        $current = $from->copy();
        while ($current <= $to) {
            $dateStr = $current->toDateString();
            $dayStart = $current->copy()->startOfDay();
            $dayEnd = $current->copy()->endOfDay();

            $dayOrders = Order::where('status', OrderStatus::COMPLETED)
                ->whereBetween('created_at', [$dayStart, $dayEnd]);

            $days[] = $current->format('m/d');
            $sales[] = round((float) $dayOrders->sum('total_amount'), 2);
            $profits[] = round((float) $dayOrders->sum('profit_amount'), 2);
            $orders[] = $dayOrders->count();

            $current->addDay();
        }

        return [
            'labels' => $days,
            'sales' => $sales,
            'profits' => $profits,
            'orders' => $orders,
        ];
    }
}
