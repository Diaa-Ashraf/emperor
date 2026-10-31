import api from './axios';

export const authApi = {
    register: (data) => api.post('/auth/register', data),
    login: (credentials) => api.post('/auth/login', credentials),
    login2FA: (data) => api.post('/auth/login/2fa', data),
    googleLogin: (data) => api.post('/auth/login/google', data),
    googleDemoLogin: () => api.post('/auth/google/demo'),
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
    getRates: () => api.get('/wallet/rates'),
    previewConversion: (data) => api.post('/wallet/preview-conversion', data),
    convertCurrency: (data) => api.post('/wallet/convert', data),
    getTransactions: (params = {}) => api.get('/wallet/transactions', { params }),
};

export const depositsApi = {
    getMethods: () => api.get('/deposits/methods'),
    getSupportedCountries: () => cachedGet('/supported-countries', {}, 60000),
    submitDeposit: (formData) => {
        return api.post('/deposits', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    getDeposits: (params = {}) => api.get('/deposits', { params }),
    getHistory: (params = {}) => api.get('/deposits', { params }),
    getDeposit: (id) => api.get(`/deposits/${id}`),
};

// In-memory cache & in-flight promise map for ultra-fast UI transitions
const memoryCache = new Map();
const inFlightRequests = new Map();

function cachedGet(url, params = {}, ttlMs = 30000) {
    const key = url + JSON.stringify(params);
    const cached = memoryCache.get(key);
    if (cached && Date.now() - cached.timestamp < ttlMs) {
        return Promise.resolve(cached.data);
    }
    if (inFlightRequests.has(key)) {
        return inFlightRequests.get(key);
    }

    const promise = api.get(url, { params })
        .then((response) => {
            memoryCache.set(key, { data: response, timestamp: Date.now() });
            inFlightRequests.delete(key);
            return response;
        })
        .catch((err) => {
            inFlightRequests.delete(key);
            throw err;
        });

    inFlightRequests.set(key, promise);
    return promise;
}

export const catalogApi = {
    getCategories: () => cachedGet('/categories', {}, 60000),
    getHeroServices: () => cachedGet('/hero-services', {}, 60000),
    getProducts: (params = {}) => cachedGet('/products', params, 30000),
    getProduct: (id) => cachedGet(`/products/${id}`, {}, 30000),
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
    checkLatest: (params = {}) => api.get('/notifications/check-latest', { params }),
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
    requestAccess: (data = {}) => api.post('/developer/request-access', data),
    generateKeys: () => api.post('/developer/keys/generate'),
    updateSettings: (data) => api.put('/developer/settings', data),
};

export const adminApi = {
    getDashboardStats: (params = {}) => api.get('/admin/dashboard/stats', { params }),
    getWalletSummary: (params = {}) => api.get('/admin/wallet/summary', { params }),
    getWalletTransactions: (params = {}) => api.get('/admin/wallet/transactions', { params }),
    adjustWalletBalance: (data) => api.post('/admin/wallet/adjust', data),
    updateWalletSettings: (data) => api.post('/admin/wallet/settings', data),
    getUsers: (params = {}) => api.get('/admin/users', { params }),
    getUser: (id) => api.get(`/admin/users/${id}`),
    getUserLedger: (id = null, params = {}) => api.get(id ? `/admin/users/${id}/ledger` : '/admin/users/ledger', { params }),
    adjustUserBalance: (id, data) => api.post(`/admin/users/${id}/balance`, data),
    setUserBalance: (id, data) => api.post(`/admin/users/${id}/set-balance`, data),
    updateUserStatus: (id, data) => api.post(`/admin/users/${id}/status`, data),
    updateUserSettings: (id, data) => api.post(`/admin/users/${id}/settings`, data),
    toggleUserApi: (id) => api.post(`/admin/users/${id}/toggle-api`),
    getStaff: (params = {}) => api.get('/admin/staff', { params }),
    createStaff: (data) => api.post('/admin/staff', data),
    updateStaff: (id, data) => api.post(`/admin/staff/${id}`, data),
    updateStaffPermissions: (id, data) => api.post(`/admin/staff/${id}/permissions`, data),
    toggleStaffStatus: (id) => api.post(`/admin/staff/${id}/toggle-status`),
    deleteStaff: (id) => api.delete(`/admin/staff/${id}`),
    getReferralsOverview: (params = {}) => api.get('/admin/referrals', { params }),
    updateReferralRate: (data) => api.post('/admin/referrals/rate', data),
    getDeposits: (params = {}) => api.get('/admin/deposits', { params }),
    getDeposit: (id) => api.get(`/admin/deposits/${id}`),
    approveDeposit: (id, data = {}) => api.post(`/admin/deposits/${id}/approve`, data),
    rejectDeposit: (id, data) => api.post(`/admin/deposits/${id}/reject`, data),
    getTargets: (params = {}) => api.get('/admin/targets', { params }),
    getTarget: (id) => api.get(`/admin/targets/${id}`),
    approveTarget: (id, data = {}) => api.post(`/admin/targets/${id}/approve`, data),
    rejectTarget: (id, data) => api.post(`/admin/targets/${id}/reject`, data),
    getTargetApps: () => api.get('/admin/targets/apps'),
    saveTargetApp: (data, id = null) => {
        const isForm = data instanceof FormData;
        return api.post(id ? `/admin/targets/apps/save/${id}` : '/admin/targets/apps/save', data, {
            headers: isForm ? { 'Content-Type': 'multipart/form-data' } : undefined
        });
    },
    toggleTargetApp: (id) => api.post(`/admin/targets/apps/${id}/toggle`),
    deleteTargetApp: (id) => api.delete(`/admin/targets/apps/${id}`),
    getOrders: (params = {}) => api.get('/admin/orders', { params }),
    getOrder: (id) => api.get(`/admin/orders/${id}`),
    updateOrderStatus: (id, data) => api.post(`/admin/orders/${id}/status`, data),
    retryOrder: (id) => api.post(`/admin/orders/${id}/retry`),
    syncOrderProvider: (id) => api.post(`/admin/orders/${id}/sync`),
    getCategories: () => api.get('/admin/categories'),
    createCategory: (formData) => api.post('/admin/categories', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
    saveCategory: (formData) => api.post('/admin/categories', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
    updateCategory: (id, formData) => api.post(`/admin/categories/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
    deleteCategory: (id) => api.delete(`/admin/categories/${id}`),
    reorderCategories: (items) => api.post('/admin/categories/reorder', { items }),
    getSettings: () => api.get('/admin/settings'),
    updateSettings: (formData) => api.post('/admin/settings', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
    getPricingTiers: () => api.get('/admin/pricing-tiers'),
    createPricingTier: (data) => api.post('/admin/pricing-tiers', data),
    updatePricingTier: (id, data) => api.post(`/admin/pricing-tiers/${id}`, data),
    transferPricingTierMembers: (id, data) => api.post(`/admin/pricing-tiers/${id}/transfer`, data),
    deletePricingTier: (id) => api.delete(`/admin/pricing-tiers/${id}`),
    getActivityLogs: (params = {}) => api.get('/admin/activity-logs', { params }),
    getProducts: (params = {}) => api.get('/admin/products', { params }),
    getProviderCatalog: (params = {}) => api.get('/admin/products/provider-catalog', { params }),
    getProduct: (id) => api.get(`/admin/products/${id}`),
    toggleProductActive: (id) => api.post(`/admin/products/${id}/toggle-active`),
    saveProduct: (data, id = null) => api.post(`/admin/products/save${id ? `/${id}` : ''}`, data),
    deleteProduct: (id) => api.delete(`/admin/products/${id}`),
    getProviders: () => api.get('/admin/providers'),
    createProvider: (data) => api.post('/admin/providers', data),
    deleteProvider: (id) => api.delete(`/admin/providers/${id}`),
    checkProviderBalance: (id) => api.post(`/admin/providers/${id}/check-balance`),
    toggleProvider: (id) => api.post(`/admin/providers/${id}/toggle`),
    getPaymentMethods: () => api.get('/admin/payment-methods'),
    createPaymentMethod: (data) => {
        const isForm = data instanceof FormData;
        return api.post('/admin/payment-methods', data, {
            headers: isForm ? { 'Content-Type': 'multipart/form-data' } : undefined
        });
    },
    updatePaymentMethod: (id, data) => {
        const isForm = data instanceof FormData;
        return api.post(`/admin/payment-methods/${id}`, data, {
            headers: isForm ? { 'Content-Type': 'multipart/form-data' } : undefined
        });
    },
    togglePaymentMethod: (id) => api.post(`/admin/payment-methods/${id}/toggle`),
    deletePaymentMethod: (id) => api.delete(`/admin/payment-methods/${id}`),
    deleteDemoPaymentMethods: () => api.delete('/payment-methods/demo-cleanup'),
    createPaymentGroup: (data) => {
        const isForm = data instanceof FormData;
        return api.post('/admin/payment-groups', data, {
            headers: isForm ? { 'Content-Type': 'multipart/form-data' } : undefined
        });
    },
    deletePaymentGroup: (id) => api.delete(`/admin/payment-groups/${id}`),

    // Currencies & Exchange Rates
    getCurrencies: () => api.get('/admin/currencies'),
    saveCurrency: (data) => api.post('/admin/currencies', data),
    updateCurrency: (id, data) => api.post(`/admin/currencies/${id}`, data),
    toggleCurrency: (id) => api.post(`/admin/currencies/${id}/toggle`),
    deleteCurrency: (id) => api.delete(`/admin/currencies/${id}`),

    // WhatsApp Integration
    getWhatsAppSettings: () => api.get('/admin/whatsapp/settings'),
    saveWhatsAppSettings: (data) => api.post('/admin/whatsapp/settings', data),
    sendTestWhatsApp: (data) => api.post('/admin/whatsapp/test', data),
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
    admin: adminApi,
};
