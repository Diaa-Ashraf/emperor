import axios from 'axios';

// Create base axios client for Emperor API V1
const api = axios.create({
    baseURL: '/api/v1',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});

// Request Interceptor: Attach Bearer Token, Locale & Check Idle Inactivity
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('emperor_token');
        if (token) {
            // Check idle inactivity (2 hours default, 48 hours if remember me is set)
            const lastActiveStr = localStorage.getItem('emperor_last_activity');
            const isRemembered = localStorage.getItem('emperor_remember') === '1';
            const maxIdleTime = isRemembered ? 48 * 60 * 60 * 1000 : 2 * 60 * 60 * 1000;

            if (lastActiveStr) {
                const lastActiveTime = parseInt(lastActiveStr, 10);
                if (!isNaN(lastActiveTime) && (Date.now() - lastActiveTime > maxIdleTime)) {
                    localStorage.removeItem('emperor_token');
                    localStorage.removeItem('emperor_user');
                    localStorage.removeItem('emperor_last_activity');
                    localStorage.removeItem('emperor_remember');
                    try { sessionStorage.clear(); } catch (e) {}

                    window.dispatchEvent(new CustomEvent('emperor:unauthorized'));
                    return Promise.reject({
                        status: 401,
                        message: 'انتهت جلستك بسبب عدم النشاط للحفاظ على أمان حسابك. يُرجى تسجيل الدخول مجدداً.',
                    });
                }
            }

            config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Ensure language header is Arabic by default
        config.headers['Accept-Language'] = localStorage.getItem('emperor_locale') || 'ar';
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Error handling & 401 redirect
api.interceptors.response.use(
    (response) => {
        // Touch last activity on successful request
        if (localStorage.getItem('emperor_token')) {
            localStorage.setItem('emperor_last_activity', Date.now().toString());
        }
        return response.data;
    },
    (error) => {
        const status = error.response ? error.response.status : (error.status || null);
        const responseData = error.response ? error.response.data : null;

        // Extract Arabic message and validation errors
        let message = error.message || 'تعذر الاتصال بالخادم، يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.';
        let validationErrors = {};

        if (responseData) {
            if (responseData.message) {
                message = responseData.message;
            }
            if (responseData.errors) {
                validationErrors = responseData.errors;
            }
        } else if (error.message === 'Network Error') {
            message = 'انقطع الاتصال بالخادم، يرجى إعادة المحاولة.';
        }

        // Handle 401 Unauthorized / Session Expiry
        if (status === 401) {
            localStorage.removeItem('emperor_token');
            localStorage.removeItem('emperor_user');
            localStorage.removeItem('emperor_last_activity');
            localStorage.removeItem('emperor_remember');
            try { sessionStorage.clear(); } catch (e) {}
            
            // Dispatch a custom event so React contexts can react immediately without full page reload
            window.dispatchEvent(new CustomEvent('emperor:unauthorized'));
        }

        const normalizedError = {
            status,
            message,
            errors: validationErrors,
            raw: error,
        };

        return Promise.reject(normalizedError);
    }
);

export default api;
