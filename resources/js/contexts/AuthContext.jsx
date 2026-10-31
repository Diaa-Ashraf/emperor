import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { authApi, profileApi } from '../api/endpoints';

const AuthContext = createContext(null);

// Idle Inactivity limits: 2 hours for standard session, 48 hours if Remember Me was selected
const STANDARD_IDLE_TIMEOUT_MS = 2 * 60 * 60 * 1000;
const REMEMBER_IDLE_TIMEOUT_MS = 48 * 60 * 60 * 1000;

function checkIsSessionExpired() {
    const token = localStorage.getItem('emperor_token');
    if (!token) return false;

    const lastActiveStr = localStorage.getItem('emperor_last_activity');
    if (!lastActiveStr) {
        localStorage.setItem('emperor_last_activity', Date.now().toString());
        return false;
    }

    const lastActiveTime = parseInt(lastActiveStr, 10);
    if (isNaN(lastActiveTime)) {
        localStorage.setItem('emperor_last_activity', Date.now().toString());
        return false;
    }

    const isRemembered = localStorage.getItem('emperor_remember') === '1';
    const maxIdle = isRemembered ? REMEMBER_IDLE_TIMEOUT_MS : STANDARD_IDLE_TIMEOUT_MS;

    return Date.now() - lastActiveTime > maxIdle;
}

export function AuthProvider({ children }) {
    // Check if session was already expired due to inactivity before initial state initialization
    const [initialExpired] = useState(() => {
        if (checkIsSessionExpired()) {
            localStorage.removeItem('emperor_token');
            localStorage.removeItem('emperor_user');
            localStorage.removeItem('emperor_last_activity');
            localStorage.removeItem('emperor_remember');
            try { sessionStorage.clear(); } catch (e) {}
            return true;
        }
        return false;
    });

    const [user, setUser] = useState(() => {
        if (initialExpired) return null;
        const saved = localStorage.getItem('emperor_user');
        return saved ? JSON.parse(saved) : null;
    });

    const [token, setToken] = useState(() => {
        if (initialExpired) return null;
        return localStorage.getItem('emperor_token') || null;
    });

    const [loading, setLoading] = useState(true);
    const lastTouchRef = useRef(Date.now());

    const logout = useCallback(async () => {
        try {
            if (token) {
                await authApi.logout();
            }
        } catch (err) {
            // Ignore logout errors
        } finally {
            localStorage.removeItem('emperor_token');
            localStorage.removeItem('emperor_user');
            localStorage.removeItem('emperor_last_activity');
            localStorage.removeItem('emperor_remember');
            try { sessionStorage.clear(); } catch (e) {}
            setToken(null);
            setUser(null);
        }
    }, [token]);

    const touchActivity = useCallback(() => {
        const now = Date.now();
        // Throttle writing to localStorage to once every 30 seconds
        if (now - lastTouchRef.current > 30000) {
            lastTouchRef.current = now;
            if (localStorage.getItem('emperor_token')) {
                localStorage.setItem('emperor_last_activity', now.toString());
            }
        }
    }, []);

    const fetchProfile = useCallback(async () => {
        if (!localStorage.getItem('emperor_token')) {
            setLoading(false);
            return;
        }

        if (checkIsSessionExpired()) {
            logout();
            setLoading(false);
            return;
        }

        try {
            const res = await profileApi.getProfile();
            if (res && res.data) {
                setUser(res.data);
                localStorage.setItem('emperor_user', JSON.stringify(res.data));
                localStorage.setItem('emperor_last_activity', Date.now().toString());
            }
        } catch (err) {
            if (err.status === 401) {
                logout();
            }
        } finally {
            setLoading(false);
        }
    }, [logout]);

    useEffect(() => {
        fetchProfile();

        const handleUnauthorized = () => {
            setUser(null);
            setToken(null);
        };

        const handleVisibilityOrFocus = () => {
            if (document.visibilityState === 'visible') {
                if (checkIsSessionExpired()) {
                    logout();
                } else {
                    touchActivity();
                }
            }
        };

        // Track active user interactions to refresh sliding session window
        const interactionEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
        interactionEvents.forEach(evt => window.addEventListener(evt, touchActivity, { passive: true }));
        document.addEventListener('visibilitychange', handleVisibilityOrFocus);
        window.addEventListener('focus', handleVisibilityOrFocus);
        window.addEventListener('emperor:unauthorized', handleUnauthorized);
        window.addEventListener('emperor:refresh-profile', fetchProfile);

        return () => {
            interactionEvents.forEach(evt => window.removeEventListener(evt, touchActivity));
            document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
            window.removeEventListener('focus', handleVisibilityOrFocus);
            window.removeEventListener('emperor:unauthorized', handleUnauthorized);
            window.removeEventListener('emperor:refresh-profile', fetchProfile);
        };
    }, [fetchProfile, logout, touchActivity]);

    const login = async (credentials) => {
        const res = await authApi.login(credentials);
        const data = res.data?.data || res.data;
        if (data?.requires_2fa) {
            return data;
        }
        if (data && data.token) {
            const { token: newToken, user: userData } = data;
            const now = Date.now().toString();

            localStorage.setItem('emperor_token', newToken);
            localStorage.setItem('emperor_user', JSON.stringify(userData));
            localStorage.setItem('emperor_last_activity', now);

            if (credentials?.remember) {
                localStorage.setItem('emperor_remember', '1');
            } else {
                localStorage.removeItem('emperor_remember');
            }

            setToken(newToken);
            setUser(userData);
            return data;
        }
        return null;
    };

    const login2FA = async (data) => {
        const res = await authApi.login2FA(data);
        const resData = res.data?.data || res.data;
        if (resData && resData.token) {
            const { token: newToken, user: userData } = resData;
            const now = Date.now().toString();

            localStorage.setItem('emperor_token', newToken);
            localStorage.setItem('emperor_user', JSON.stringify(userData));
            localStorage.setItem('emperor_last_activity', now);

            if (data?.remember) {
                localStorage.setItem('emperor_remember', '1');
            } else {
                localStorage.removeItem('emperor_remember');
            }

            setToken(newToken);
            setUser(userData);
            return resData;
        }
        return resData;
    };

    const register = async (data) => {
        const res = await authApi.register(data);
        if (res && res.data) {
            const { token: newToken, user: userData } = res.data;
            const now = Date.now().toString();

            localStorage.setItem('emperor_token', newToken);
            localStorage.setItem('emperor_user', JSON.stringify(userData));
            localStorage.setItem('emperor_last_activity', now);
            localStorage.removeItem('emperor_remember');

            setToken(newToken);
            setUser(userData);
            return res.data;
        }
        return null;
    };

    const loginWithGoogle = async (googlePayload) => {
        const res = await authApi.googleLogin(googlePayload);
        const data = res.data?.data || res.data;
        if (data && data.token) {
            const { token: newToken, user: userData } = data;
            const now = Date.now().toString();

            localStorage.setItem('emperor_token', newToken);
            localStorage.setItem('emperor_user', JSON.stringify(userData));
            localStorage.setItem('emperor_last_activity', now);
            localStorage.removeItem('emperor_remember');

            setToken(newToken);
            setUser(userData);
            return data;
        }
        return null;
    };

    const setSession = (newToken, userData) => {
        const now = Date.now().toString();
        localStorage.setItem('emperor_token', newToken);
        localStorage.setItem('emperor_last_activity', now);
        setToken(newToken);

        if (userData) {
            localStorage.setItem('emperor_user', JSON.stringify(userData));
            setUser(userData);
        } else {
            fetchProfile();
        }
    };

    const completeProfile = async (data) => {
        const res = await profileApi.completeProfile(data);
        if (res && res.data) {
            setUser(res.data);
            localStorage.setItem('emperor_user', JSON.stringify(res.data));
            localStorage.setItem('emperor_last_activity', Date.now().toString());
            return res.data;
        }
        return null;
    };

    const updateProfile = async (formData) => {
        const res = await profileApi.updateProfile(formData);
        if (res && res.data) {
            setUser(res.data);
            localStorage.setItem('emperor_user', JSON.stringify(res.data));
            localStorage.setItem('emperor_last_activity', Date.now().toString());
            return res.data;
        }
        return null;
    };

    const isAdmin = Boolean(
        user?.is_admin ||
        user?.role === 'admin' ||
        (Array.isArray(user?.roles) && (user.roles.includes('admin') || user.roles.includes('super_admin')))
    );

    const isStaff = Boolean(
        isAdmin ||
        user?.is_staff ||
        (Array.isArray(user?.roles) && user.roles.some(r => ['operations_manager', 'finance_manager', 'support_agent', 'admin', 'super_admin'].includes(r)))
    );

    const canAccessAdmin = Boolean(user?.can_access_admin || isAdmin || isStaff);

    const hasApiAccess = Boolean(
        user?.has_api_access ||
        user?.api_access_status === 'active' ||
        user?.role === 'api_client' ||
        isAdmin
    );

    const can = useCallback((permission) => {
        if (isAdmin) return true;
        if (!user || !Array.isArray(user.permissions)) return false;
        return user.permissions.includes(permission);
    }, [isAdmin, user]);

    const value = {
        user,
        setUser,
        token,
        isAuthenticated: !!token,
        isAdmin,
        isStaff,
        canAccessAdmin,
        hasApiAccess,
        can,
        loading,
        login,
        login2FA,
        register,
        loginWithGoogle,
        setSession,
        logout,
        fetchProfile,
        refreshUser: fetchProfile,
        completeProfile,
        updateProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
