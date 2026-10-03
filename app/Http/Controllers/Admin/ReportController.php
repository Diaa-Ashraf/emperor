<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\ReportService;
use Illuminate\Http\Request;
use Illuminate\View\View;

class ReportController extends Controller
{
    public function __construct(
        protected ReportService $reportService
    ) {}

    /**
     * Display comprehensive admin analytics and reports.
     */
    public function index(Request $request): View
    {
        $range = $request->input('range', '30days');
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $report = $this->reportService->getAdvancedReport(
            range: $range,
            startDate: $startDate,
            endDate: $endDate
        );

        return view('admin.reports.index', compact('report', 'range', 'startDate', 'endDate'));
    }
}
