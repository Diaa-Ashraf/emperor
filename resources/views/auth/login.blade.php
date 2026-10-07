<x-guest-layout>
    <div class="mb-4 text-center">
        <h4 class="fw-bold text-white mb-1">تسجيل الدخول</h4>
        <p class="text-muted fs-7 mb-0">أدخل بيانات حسابك للوصول إلى لوحة الإدارة</p>
    </div>

    @if (session('status'))
        <div class="alert alert-success border-0 py-2 fs-7 mb-3 text-center" style="background: rgba(16, 185, 129, 0.15); color: #10B981;">
            {{ session('status') }}
        </div>
    @endif

    @if (session('warning'))
        <div class="alert alert-warning border-0 py-2 fs-7 mb-3 text-center" style="background: rgba(245, 158, 11, 0.15); color: #F59E0B;">
            <i class="ti ti-clock-pause me-1"></i> {{ session('warning') }}
        </div>
    @endif

    @if (session('error'))
        <div class="alert alert-danger border-0 py-2 fs-7 mb-3 text-center" style="background: rgba(239, 68, 68, 0.15); color: #EF4444;">
            <i class="ti ti-alert-triangle me-1"></i> {{ session('error') }}
        </div>
    @endif

    @if ($errors->any())
        <div class="alert alert-danger border-0 py-2 fs-7 mb-3" style="background: rgba(239, 68, 68, 0.15); color: #EF4444;">
            <ul class="mb-0 ps-3">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form method="POST" action="{{ route('login') }}">
        @csrf

        <!-- Email Address -->
        <div class="mb-3">
            <label for="email" class="form-label text-white fw-semibold fs-7">البريد الإلكتروني</label>
            <div class="input-group">
                <span class="input-group-text bg-dark border-secondary text-gold">
                    <i class="ti ti-mail"></i>
                </span>
                <input id="email" class="form-control" type="email" name="email" value="{{ old('email') }}" required autofocus autocomplete="username" placeholder="name@example.com" />
            </div>
        </div>

        <!-- Password -->
        <div class="mb-3">
            <div class="d-flex justify-content-between align-items-center mb-1">
                <label for="password" class="form-label text-white fw-semibold fs-7 mb-0">كلمة المرور</label>
                @if (Route::has('password.request'))
                    <a class="text-gold text-decoration-none fs-7" href="{{ route('password.request') }}">
                        نسيت كلمة المرور؟
                    </a>
                @endif
            </div>
            <div class="input-group">
                <span class="input-group-text bg-dark border-secondary text-gold">
                    <i class="ti ti-lock"></i>
                </span>
                <input id="password" class="form-control" type="password" name="password" required autocomplete="current-password" placeholder="••••••••" />
            </div>
        </div>

        <!-- Remember Me -->
        <div class="form-check mb-4">
            <input id="remember_me" type="checkbox" class="form-check-input" name="remember">
            <label for="remember_me" class="form-check-label text-muted fs-7">
                تذكر تسجيل دخولي على هذا الجهاز
            </label>
        </div>

        <!-- Submit Button -->
        <div class="d-grid">
            <button type="submit" class="btn btn-primary btn-lg fw-bold py-2 fs-6">
                تسجيل الدخول &larr;
            </button>
        </div>
    </form>

    <script>
        try {
            localStorage.removeItem('emperor_token');
            localStorage.removeItem('emperor_user');
            sessionStorage.clear();
        } catch(e) {}
    </script>
</x-guest-layout>
