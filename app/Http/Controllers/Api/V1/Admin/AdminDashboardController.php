<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Enums\OrderStatus;
use App\Enums\UserStatus;
use App\Http\Controllers\Controller;
use App\Models\DepositRequest;
use App\Models\Order;
use App\Models\Product;
use App\Models\Provider;
use App\Models\Setting;
use App\Models\TargetSellOrder;
use App\Models\User;
use App\Models\Wallet;
use App\Services\ReportService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class AdminDashboardController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected ReportService $reportService
    ) {}

    /**
     * Get real-time overview metrics, filtered date metrics, recent orders, and provider status for Admin Dashboard.
     */
    public function stats(Request $request): JsonResponse
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $queryFrom = $startDate ? Carbon::parse($startDate)->startOfDay() : Carbon::now()->startOfMonth();
        $queryTo = $endDate ? Carbon::parse($endDate)->endOfDay() : Carbon::now()->endOfDay();

        // Orders inside the active date range
        $ordersQuery = Order::whereBetween('created_at', [$queryFrom, $queryTo]);
        $completedOrdersQuery = (clone $ordersQuery)->where('status', OrderStatus::COMPLETED);

        // USD conversion factor (assumes 50 EGP per 1 USD)
        $usdRate = (float) (Setting::get('usd_to_egp_rate', 50.0) ?: 50.0);

        $totalSalesEgp = (float) $completedOrdersQuery->sum('total_amount');
        $totalProfitEgp = (float) $completedOrdersQuery->sum('profit_amount');

        $totalSalesUsd = round($totalSalesEgp / $usdRate, 2);
        $totalProfitUsd = round($totalProfitEgp / $usdRate, 2);

        $totalOrdersCount = (int) $ordersQuery->count();
        $completedOrdersCount = (int) $completedOrdersQuery->count();
        $pendingOrdersCount = (int) (clone $ordersQuery)->whereIn('status', [
            OrderStatus::PENDING,
            OrderStatus::PROCESSING,
            OrderStatus::MANUAL_REVIEW,
        ])->count();

        // User statistics
        $totalUsers = User::count();
        $activeUsers = User::where('status', UserStatus::ACTIVE)->count();
        $pendingUsers = User::whereNull('phone_verified_at')->where('status', '!=', UserStatus::BANNED)->count();

        // Products & inventory
        $totalProducts = Product::where('is_active', true)->count();

        // Pending manual deposits
        $pendingManualDeposits = DepositRequest::where('status', 'pending')->count();

        // Total client wallet balances
        $totalWalletsBalance = (float) Wallet::sum('balance');

        // Target of the month calculations
        $targetGoalUsd = (float) (Setting::get('monthly_profit_target', 100.00) ?: 100.00);
        $thisMonthStart = Carbon::now()->startOfMonth();
        $thisMonthProfitEgp = (float) Order::where('status', OrderStatus::COMPLETED)
            ->where('created_at', '>=', $thisMonthStart)
            ->sum('profit_amount');
        $thisMonthProfitUsd = round($thisMonthProfitEgp / $usdRate, 2);
        $targetRemainingUsd = max(0, round($targetGoalUsd - $thisMonthProfitUsd, 2));
        $targetProgressPercent = $targetGoalUsd > 0 ? min(100, round(($thisMonthProfitUsd / $targetGoalUsd) * 100, 1)) : 0;

        // Recent orders
        $recentOrders = Order::query()
            ->select([
                'id',
                'public_id',
                'user_id',
                'product_id',
                'product_tier_id',
                'quantity',
                'unit_price',
                'total_amount',
                'currency',
                'status',
                'player_id',
                'created_at'
            ])
            ->with([
                'user:id,name,email,avatar',
                'product:id,name,image',
                'tier:id,name',
            ])
            ->latest('id')
            ->take(10)
            ->get();

        // Recent target cashout orders
        $recentTargets = TargetSellOrder::query()
            ->select([
                'id',
                'public_id',
                'user_id',
                'product_id',
                'target_points',
                'gross_amount',
                'net_payout',
                'currency',
                'status',
                'created_at'
            ])
            ->with([
                'user:id,name,email,avatar',
                'product:id,name,image',
            ])
            ->latest('id')
            ->take(6)
            ->get();

        $lowBalanceProviders = Provider::query()
            ->select(['id', 'name', 'driver', 'balance', 'balance_currency', 'is_active'])
            ->where('is_active', true)
            ->where('balance', '<', 30.00)
            ->get();

        return $this->successResponse([
            'metrics' => [
                'net_profit_usd' => $totalProfitUsd,
                'net_profit_egp' => $totalProfitEgp,
                'gross_revenue_usd' => $totalSalesUsd,
                'gross_revenue_egp' => $totalSalesEgp,
                'total_orders' => $totalOrdersCount,
                'completed_orders' => $completedOrdersCount,
                'pending_orders' => $pendingOrdersCount,
                'total_users' => $totalUsers,
                'active_users' => $activeUsers,
                'pending_users' => $pendingUsers,
                'total_products' => $totalProducts,
                'pending_manual_deposits' => $pendingManualDeposits,
                'total_wallets_balance' => round($totalWalletsBalance, 2),
                'target' => [
                    'goal_usd' => $targetGoalUsd,
                    'achieved_usd' => $thisMonthProfitUsd,
                    'remaining_usd' => $targetRemainingUsd,
                    'progress_percent' => $targetProgressPercent,
                ],
                'filter' => [
                    'start_date' => $queryFrom->toDateString(),
                    'end_date' => $queryTo->toDateString(),
                ]
            ],
            // Backward-compatible summary fields
            'summary' => [
                'total_sales' => $totalSalesEgp,
                'total_profit' => $totalProfitEgp,
                'today_sales' => (float) Order::where('status', OrderStatus::COMPLETED)->where('created_at', '>=', Carbon::today())->sum('total_amount'),
                'today_profit' => (float) Order::where('status', OrderStatus::COMPLETED)->where('created_at', '>=', Carbon::today())->sum('profit_amount'),
                'pending_orders' => $pendingOrdersCount,
                'total_users' => $totalUsers,
                'active_users' => $activeUsers,
                'pending_targets' => TargetSellOrder::where('status', 'pending')->count(),
            ],
            'recent_orders' => $recentOrders,
            'recent_targets' => $recentTargets,
            'low_balance_providers' => $lowBalanceProviders,
        ], 'تم جلب إحصائيات لوحة التحكم بنجاح');
    }
}
