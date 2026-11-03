import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from './AuthContext';
import { settingsApi } from '../api/endpoints';

const FavoritesContext = createContext(null);
const GUEST_STORAGE_KEY = 'mahra_sanad_favorites_guest';

function readStoredFavorites(userId = null) {
    try {
        const key = userId ? `mahra_sanad_favorites_user_${userId}` : GUEST_STORAGE_KEY;
        const parsed = JSON.parse(localStorage.getItem(key) || '[]');
        return Array.isArray(parsed) ? parsed.map(String) : [];
    } catch {
        return [];
    }
}

export function FavoritesProvider({ children }) {
    const { isAuthenticated, user } = useAuth();
    const [favoriteIds, setFavoriteIds] = useState(readStoredFavorites);
    const syncQueue = useRef(Promise.resolve());
    const storageUserId = isAuthenticated ? user?.id : null;

    const save = useCallback((ids) => {
        const normalized = [...new Set(ids.map(String))];
        setFavoriteIds(normalized);
        const key = storageUserId ? `mahra_sanad_favorites_user_${storageUserId}` : GUEST_STORAGE_KEY;
        localStorage.setItem(key, JSON.stringify(normalized));
        window.dispatchEvent(new CustomEvent('mahra:favorites-updated', { detail: normalized }));
        return normalized;
    }, [storageUserId]);

    useEffect(() => {
        if (!isAuthenticated) {
            setFavoriteIds(readStoredFavorites());
            return;
        }
        let active = true;
        settingsApi.getUserSettings().then(async (response) => {
            const remote = response.data?.data?.preferences?.favorite_product_ids || [];
            const merged = [...new Set([...remote.map(String), ...readStoredFavorites(user?.id)])];
            if (!active) return;
            save(merged);
            if (merged.length !== remote.length || merged.some((id, index) => id !== String(remote[index]))) {
                await settingsApi.updateUserSettings({ favorite_product_ids: merged.map(Number).filter(Number.isFinite) });
            }
        }).catch(() => {});
        return () => { active = false; };
    }, [isAuthenticated, save, user?.id]);

    useEffect(() => {
        const sync = (event) => setFavoriteIds(Array.isArray(event.detail) ? event.detail.map(String) : readStoredFavorites());
        window.addEventListener('mahra:favorites-updated', sync);
        return () => window.removeEventListener('mahra:favorites-updated', sync);
    }, []);

    const toggleFavorite = useCallback(async (productId) => {
        const id = String(productId);
        const next = favoriteIds.includes(id) ? favoriteIds.filter((item) => item !== id) : [...favoriteIds, id];
        const normalized = save(next);
        if (isAuthenticated) {
            syncQueue.current = syncQueue.current
                .catch(() => {})
                .then(() => settingsApi.updateUserSettings({ favorite_product_ids: normalized.map(Number).filter(Number.isFinite) }));
            await syncQueue.current.catch(() => {});
        }
        return normalized.includes(id);
    }, [favoriteIds, isAuthenticated, save]);

    const value = useMemo(() => ({ favoriteIds, toggleFavorite, isFavorite: (id) => favoriteIds.includes(String(id)) }), [favoriteIds, toggleFavorite]);
    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
    return context;
}
