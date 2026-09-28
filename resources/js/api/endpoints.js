import api from './axios';

export const authApi = {
    register: (data) => api.post('/auth/register', data),
    login: (credentials) => api.post('/auth/login', credentials),
    login2FA: (data) => api.post('/auth/login/2fa', data),
    googleLogin: (data) => api.post('/auth/login/google', data),
    getGoogleRedirectUrl: () => api.get('/auth/google/redirect'),
    verifyPhone: (data) => api.post('/auth/verify-phone', data),
    logout: () => api.post('/auth/logout'),
};

export const profileApi = {
    getProfile: () => api.get('/profile'),
    updateProfile: (formData) => {
        // Handle multipart/form-data for avatar uploads
        return api.post('/profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    updatePassword: (data) => api.post('/profile/password', data),
    completeProfile: (data) => api.put('/profile/complete', data),
    enable2FA: () => api.post('/profile/2fa/enable'),
    verify2FA: (code) => api.post('/profile/2fa/verify', { code }),
    disable2FA: (password) => api.post('/profile/2fa/disable', { password }),
    getRecoveryCodes: () => api.get('/profile/2fa/recovery-codes'),
    updateFcmToken: (fcm_token) => api.post('/profile/fcm-token', { fcm_token }),
};

export const walletApi = {
    getBalance: () => api.get('/wallet/balance'),
    getTransactions: (params = {}) => api.get('/wallet/transactions', { params }),
};

export const depositsApi = {
    getMethods: () => api.get('/deposits/methods'),
    submitDeposit: (formData) => {
        return api.post('/deposits', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    getDeposits: (params = {}) => api.get('/deposits', { params }),
    getDeposit: (id) => api.get(`/deposits/${id}`),
};

export const catalogApi = {
    getCategories: () => api.get('/categories'),
    getProducts: (params = {}) => api.get('/products', { params }),
    getProduct: (id) => api.get(`/products/${id}`),
};

export const ordersApi = {
    getOrders: (params = {}) => api.get('/orders', { params }),
    createOrder: (data) => api.post('/orders', data),
    getOrder: (id) => api.get(`/orders/${id}`),
};

export const targetApi = {
    getApps: () => api.get('/target-apps'),
    getQuote: (data) => api.post('/target-apps/quote', data),
    getOrders: (params = {}) => api.get('/target-orders', { params }),
    submitOrder: (formData) => {
        return api.post('/target-orders', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    getOrder: (id) => api.get(`/target-orders/${id}`),
};

export const referralsApi = {
    getStats: () => api.get('/referrals/stats'),
    getInvitedUsers: (params = {}) => api.get('/referrals/invited-users', { params }),
};

export const settingsApi = {
    getPublicSettings: () => api.get('/settings/public'),
    getUserSettings: () => api.get('/settings/user'),
    updateUserSettings: (data) => api.put('/settings/user', data),
};

export const notificationsApi = {
    getNotifications: (params = {}) => api.get('/notifications', { params }),
    getUnreadCount: () => api.get('/notifications/unread-count'),
    markAsRead: (id) => api.post(`/notifications/${id}/read`),
    markAllAsRead: () => api.post('/notifications/read-all'),
};

export const supportApi = {
    getSupportContacts: () => api.get('/support-contacts'),
};

export const bannersApi = {
    getAnnouncements: () => api.get('/announcements'),
    getBanners: (params = {}) => api.get('/banners', { params }),
    getDeals: () => api.get('/deals'),
};

export const developerApi = {
    getKeys: () => api.get('/developer/keys'),
    generateKeys: () => api.post('/developer/keys/generate'),
    updateSettings: (data) => api.put('/developer/settings', data),
};

export default {
    auth: authApi,
    profile: profileApi,
    wallet: walletApi,
    deposits: depositsApi,
    catalog: catalogApi,
    orders: ordersApi,
    target: targetApi,
    referrals: referralsApi,
    settings: settingsApi,
    notifications: notificationsApi,
    support: supportApi,
    banners: bannersApi,
    developer: developerApi,
};
