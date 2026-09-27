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

// Request Interceptor: Attach Bearer Token & Locale
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('emperor_token');
        if (token) {
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
        return response.data;
    },
    (error) => {
        const status = error.response ? error.response.status : null;
        const responseData = error.response ? error.response.data : null;

        // Extract Arabic message and validation errors
        let message = 'تعذر الاتصال بالخادم، يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.';
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

        // Handle 401 Unauthorized
        if (status === 401) {
            localStorage.removeItem('emperor_token');
            localStorage.removeItem('emperor_user');
            
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
