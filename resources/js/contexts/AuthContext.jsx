import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi, profileApi } from '../api/endpoints';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('emperor_user');
        return saved ? JSON.parse(saved) : null;
    });
    const [token, setToken] = useState(() => localStorage.getItem('emperor_token') || null);
    const [loading, setLoading] = useState(true);

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
            try { sessionStorage.clear(); } catch (e) {}
            setToken(null);
            setUser(null);
        }
    }, [token]);

    const fetchProfile = useCallback(async () => {
        if (!localStorage.getItem('emperor_token')) {
            setLoading(false);
            return;
        }

        try {
            const res = await profileApi.getProfile();
            if (res && res.data) {
                setUser(res.data);
                localStorage.setItem('emperor_user', JSON.stringify(res.data));
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

        window.addEventListener('emperor:unauthorized', handleUnauthorized);
        return () => window.removeEventListener('emperor:unauthorized', handleUnauthorized);
    }, [fetchProfile]);

    const login = async (credentials) => {
        const res = await authApi.login(credentials);
        const data = res.data?.data || res.data;
        if (data?.requires_2fa) {
            return data;
        }
        if (data && data.token) {
            const { token: newToken, user: userData } = data;
            localStorage.setItem('emperor_token', newToken);
            localStorage.setItem('emperor_user', JSON.stringify(userData));
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
            localStorage.setItem('emperor_token', newToken);
            localStorage.setItem('emperor_user', JSON.stringify(userData));
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
            localStorage.setItem('emperor_token', newToken);
            localStorage.setItem('emperor_user', JSON.stringify(userData));
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
            localStorage.setItem('emperor_token', newToken);
            localStorage.setItem('emperor_user', JSON.stringify(userData));
            setToken(newToken);
            setUser(userData);
            return data;
        }
        return null;
    };

    const setSession = (newToken, userData) => {
        localStorage.setItem('emperor_token', newToken);
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
            return res.data;
        }
        return null;
    };

    const updateProfile = async (formData) => {
        const res = await profileApi.updateProfile(formData);
        if (res && res.data) {
            setUser(res.data);
            localStorage.setItem('emperor_user', JSON.stringify(res.data));
            return res.data;
        }
        return null;
    };

    const value = {
        user,
        setUser,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        login2FA,
        register,
        loginWithGoogle,
        setSession,
        logout,
        fetchProfile,
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
