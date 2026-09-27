@extends('layouts.admin')

@section('title', 'قنوات الدعم الفني والمساعدة')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="card mb-4 border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 d-flex flex-wrap justify-content-between align-items-center gap-3 py-3">
                <div>
                    <h5 class="card-title fw-bold mb-0 text-white"><i class="ti ti-headset text-warning me-2"></i> قنوات وأرقام الدعم الفني وخدمة العملاء</h5>
                    <small class="text-muted">إدارة أرقام واتساب، معرفات تيليجرام، ووسائل التواصل المباشر المعروضة للمستخدمين</small>
                </div>
                <div class="d-flex gap-2">
                    <a href="{{ route('admin.support-contacts.create') }}" class="btn btn-warning">
                        <i class="ti ti-plus me-1"></i> إضافة وسيلة دعم جديدة
                    </a>
                </div>
            </div>

            @if(session('success'))
                <div class="mx-3 mt-3 alert alert-success alert-dismissible fade show" role="alert">
                    {{ session('success') }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            @endif

            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-dark">
                            <tr>
                                <th class="ps-3" style="width: 5%;">#</th>
                                <th style="width: 25%;">اسم القناة / الفريق</th>
                                <th style="width: 20%;">نوع الوسيلة</th>
                                <th style="width: 25%;">القيمة / الرقم / الرابط</th>
                                <th style="width: 10%;">الترتيب</th>
                                <th style="width: 15%;">الحالة</th>
                                <th class="text-end pe-3" style="width: 15%;">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($contacts as $contact)
                                <tr>
                                    <td class="ps-3 text-muted font-monospace">{{ $contact->id }}</td>
                                    <td>
                                        <div class="fw-bold text-white fs-6">
                                            <i class="ti {{ $contact->channel_icon }} me-1"></i> {{ $contact->name }}
                                        </div>
                                        @if($contact->description)
                                            <small class="text-muted">{{ $contact->description }}</small>
                                        @endif
                                    </td>
                                    <td>
                                        <span class="badge bg-secondary font-monospace">{{ $contact->channel_label }}</span>
                                    </td>
                                    <td>
                                        <span class="badge bg-dark border border-secondary text-warning font-monospace fs-6">
                                            {{ $contact->value }}
                                        </span>
                                    </td>
                                    <td>
                                        <span class="font-monospace text-muted">{{ $contact->sort_order }}</span>
                                    </td>
                                    <td>
                                        <form action="{{ route('admin.support-contacts.toggle-active', $contact->id) }}" method="POST">
                                            @csrf
                                            <button type="submit" class="badge border-0 {{ $contact->is_active ? 'bg-success' : 'bg-danger' }}">
                                                {{ $contact->is_active ? 'نشط ومتاح' : 'معطل' }}
                                            </button>
                                        </form>
                                    </td>
                                    <td class="text-end pe-3">
                                        <div class="d-flex justify-content-end gap-2">
                                            <a href="{{ route('admin.support-contacts.edit', $contact->id) }}" class="btn btn-sm btn-outline-warning">
                                                <i class="ti ti-edit"></i>
                                            </a>
                                            <form action="{{ route('admin.support-contacts.destroy', $contact->id) }}" method="POST" onsubmit="return confirm('تأكيد حذف وسيلة الدعم هذه؟');">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="btn btn-sm btn-outline-danger">
                                                    <i class="ti ti-trash"></i>
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="7" class="text-center py-5 text-muted">
                                        <i class="ti ti-headset-off fs-1 d-block mb-2 text-warning"></i>
                                        لا توجد قنوات دعم فني مضافة حتى الآن.
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
