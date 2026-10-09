@extends('layouts.admin')

@section('title', 'مصفوفة أسعار العميل المخصصة')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="card mb-4 border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 d-flex flex-wrap justify-content-between align-items-center gap-3 py-3">
                <div>
                    <h5 class="card-title fw-bold mb-0 text-white">
                        <i class="ti ti-coin text-warning me-2"></i> مصفوفة الأسعار المخصصة: <span class="text-warning">{{ $client->name }}</span>
                    </h5>
                    <small class="text-muted">تحديد أسعار حصرية خاصة بهذا العميل لجميع أو بعض باقات المنتجات (تتجاوز السعر العام للـ API)</small>
                </div>
                <div class="d-flex gap-2">
                    <a href="{{ route('admin.api-clients.logs', $client->id) }}" class="btn btn-outline-info btn-sm">
                        <i class="ti ti-history me-1"></i> سجلات الطلبات
                    </a>
                    <a href="{{ route('admin.api-clients.index') }}" class="btn btn-outline-secondary btn-sm">
                        <i class="ti ti-arrow-right me-1"></i> رجوع للعملاء
                    </a>
                </div>
            </div>

            <!-- Client Summary Bar -->
            <div class="card-body border-top border-bottom border-dark py-3 bg-dark">
                <div class="row g-3 align-items-center">
                    <div class="col-lg-4 col-md-6">
                        <span class="text-muted small d-block">البريد الإلكتروني ومفتاح الـ API:</span>
                        <span class="text-white font-monospace">{{ $client->email }}</span>
                        <span class="badge bg-black text-warning border border-secondary font-monospace ms-2">{{ Str::limit($client->api_key, 15) }}</span>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <span class="text-muted small d-block">رصيد المحفظة المتاح:</span>
                        <span class="text-success fw-bold font-monospace fs-5">{{ number_format($client->wallet?->balance ?? 0, 2) }} {{ $client->wallet?->currency ?? 'EGP' }}</span>
                    </div>
                    <div class="col-lg-5 col-md-12">
                        <div class="alert alert-warning border border-warning d-flex align-items-center gap-2 mb-0 py-2 px-3 small text-warning bg-warning-subtle">
                            <i class="ti ti-info-circle fs-5 flex-shrink-0"></i>
                            <span>يتم تطبيق السعر المخصص إذا تم إدخاله، وإلا سيتم استخدام سعر الـ API الافتراضي للباقة.</span>
                        </div>
                    </div>
                </div>
            </div>

            <form action="{{ route('admin.api-clients.update-pricing', $client->id) }}" method="POST">
                @csrf
                <div class="card-body p-0">
                    @forelse($categories as $category)
                        <div class="p-3 bg-black border-bottom border-dark d-flex align-items-center justify-content-between">
                            <h6 class="fw-bold text-warning mb-0">
                                <i class="ti ti-category me-2"></i> {{ $category->name }}
                            </h6>
                            <span class="badge bg-dark border border-secondary text-muted">{{ $category->products->count() }} منتج</span>
                        </div>

                        <div class="table-responsive">
                            <table class="table table-hover table-dark align-middle mb-0">
                                <thead class="bg-dark text-muted small">
                                    <tr>
                                        <th class="ps-4" style="width: 25%;">المنتج / الباقة</th>
                                        <th style="width: 15%;">رمز الـ SKU</th>
                                        <th style="width: 15%;">سعر التكلفة</th>
                                        <th style="width: 15%;">سعر الجمهور</th>
                                        <th style="width: 15%;">سعر الـ API الافتراضي</th>
                                        <th class="pe-4 text-end" style="width: 15%;">السعر المخصص للعميل (EGP)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($category->products as $product)
                                        @foreach($product->tiers as $tier)
                                            @php
                                                $hasCustom = isset($customPrices[$tier->id]);
                                                $customVal = $customPrices[$tier->id] ?? '';
                                            @endphp
                                            <tr class="{{ $hasCustom ? 'table-warning-row' : '' }}">
                                                <td class="ps-4">
                                                    <div class="fw-bold text-white">{{ $product->name }}</div>
                                                    <small class="text-gold">{{ $tier->name }}</small>
                                                </td>
                                                <td>
                                                    <span class="badge bg-black border border-dark text-muted font-monospace">{{ $tier->sku ?? '—' }}</span>
                                                </td>
                                                <td class="font-monospace text-muted small">
                                                    {{ number_format((float)$tier->source_cost, 2) }} EGP
                                                </td>
                                                <td class="font-monospace text-light">
                                                    {{ number_format((float)$tier->final_price, 2) }} EGP
                                                </td>
                                                <td class="font-monospace text-info">
                                                    {{ $tier->api_price ? number_format((float)$tier->api_price, 2) . ' EGP' : 'غير محدد' }}
                                                </td>
                                                <td class="pe-4 text-end">
                                                    <div class="input-group input-group-sm justify-content-end" style="max-width: 160px; margin-left: auto;">
                                                        <input type="number" step="0.01" min="0" 
                                                            name="prices[{{ $tier->id }}]" 
                                                            class="form-control font-monospace text-end {{ $hasCustom ? 'border-warning text-warning fw-bold bg-dark' : 'bg-black text-white border-secondary' }}" 
                                                            placeholder="{{ $tier->api_price ?? $tier->final_price }}" 
                                                            value="{{ $customVal }}">
                                                        <span class="input-group-text bg-dark border-secondary text-muted">EGP</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        @endforeach
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    @empty
                        <div class="text-center py-5 text-muted">
                            <i class="ti ti-package-off fs-1 d-block mb-2"></i>
                            لا توجد منتجات أو باقات متاحة للتسعير حالياً
                        </div>
                    @endforelse
                </div>

                <div class="card-footer bg-transparent border-dark d-flex justify-content-between align-items-center py-3 sticky-bottom bg-dark">
                    <span class="text-muted small">
                        💡 نصيحة: اترك الحقل فارغاً لاستخدام السعر الافتراضي للباقة أو أدخل السعر الخاص للحفظ.
                    </span>
                    <div class="d-flex gap-2">
                        <a href="{{ route('admin.api-clients.index') }}" class="btn btn-outline-secondary">إلغاء</a>
                        <button type="submit" class="btn btn-warning text-dark fw-bold px-4">
                            <i class="ti ti-device-floppy me-1"></i> حفظ مصفوفة الأسعار المخصصة
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
