import React, { useEffect, useState } from 'react';
import { Heart, PackageOpen } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import ProductCard from '../components/products/ProductCard';
import { catalogApi } from '../api/endpoints';
import { useFavorites } from '../contexts/FavoritesContext';
import { useTheme } from '../contexts/ThemeContext';

export default function FavoritesPage() {
    const { favoriteIds } = useFavorites();
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        setLoading(true);
        const batches = [];
        for (let index = 0; index < favoriteIds.length; index += 100) batches.push(favoriteIds.slice(index, index + 100));
        Promise.all(batches.map((ids) => catalogApi.getProducts({ ids, limit: 100 }).then((response) => response?.data || []).catch(() => [])))
            .then((pages) => {
                if (active) setProducts(pages.flat().filter(Boolean));
            })
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, [favoriteIds]);

    return (
        <MainLayout>
            <main style={{ maxWidth: 1240, margin: '0 auto', padding: '28px 20px 56px', minHeight: '55vh' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                    <Heart size={25} fill="#ef3340" color="#ef3340" />
                    <h1 style={{ margin: 0, color: isLight ? '#0f172a' : '#fff', fontSize: 24, fontWeight: 900 }}>المفضلة</h1>
                    <span style={{ color: '#94a3b8', fontWeight: 800 }}>({favoriteIds.length})</span>
                </div>
                {loading ? (
                    <div style={{ textAlign: 'center', color: '#94a3b8', padding: 50 }}>جاري تحميل المفضلة...</div>
                ) : products.length ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(135px, 1fr))', gap: 18 }}>
                        {products.map((product) => <ProductCard key={product.id} product={product} />)}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '56px 20px', borderRadius: 18, border: '1px solid rgba(148,163,184,.18)', color: '#94a3b8' }}>
                        <PackageOpen size={42} style={{ marginBottom: 12, opacity: .7 }} />
                        <div style={{ fontWeight: 800 }}>لسه ما ضفتش منتجات للمفضلة</div>
                        <div style={{ fontSize: 13, marginTop: 6 }}>اضغط على علامة القلب في أي منتج لحفظه هنا.</div>
                    </div>
                )}
            </main>
        </MainLayout>
    );
}
