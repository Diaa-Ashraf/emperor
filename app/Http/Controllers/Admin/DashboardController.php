<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\TargetSellOrder;
use App\Services\ReportService;
use Illuminate\Http\Request;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function __construct(
        protected ReportService $reportService
    ) {}

    public function index(Request $request): View
    {
        $summary = $this->reportService->getDashboardSummary();

        $recentOrders = Order::with(['user', 'product', 'tier'])
            ->latest()
            ->take(6)
            ->get();

        $recentTargets = TargetSellOrder::with(['user', 'product'])
            ->latest()
            ->take(5)
            ->get();

        // Alert on active automated API providers with low balance (< 30 or configurable)
        $lowBalanceProviders = \App\Models\Provider::where('is_active', true)
            ->where('auto_fulfill', true)
            ->where('driver', 'not like', 'manual%')
            ->where('balance', '<', 30.00)
            ->get();

        return view('admin.dashboard', compact('summary', 'recentOrders', 'recentTargets', 'lowBalanceProviders'));
    }
}
