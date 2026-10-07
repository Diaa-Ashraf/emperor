import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Search,
    ChevronRight,
    ChevronLeft,
    Star,
    Package,
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import VisualCategoryCards from '../components/home/VisualCategoryCards';
import GoldenTargetBanner from '../components/home/GoldenTargetBanner';
import CommunityTelegramBanner from '../components/home/CommunityTelegramBanner';
import { catalogApi } from '../api/endpoints';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { formatImageUrl } from '../utils/imageHelper';

export default function HomePage() {
    const navigate = useNavigate();
    const { t, isRtl } = useLanguage();
    const { theme } = useTheme();
    const isLight = theme === 'light';

    const [searchQuery, setSearchQuery] = useState('');
    const [searchFocused, setSearchFocused] = useState(false);
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);

    useEffect(() => {
        catalogApi.getProducts({ limit: 100, per_page: 100 })
            .then(res => {
                const items = res?.data?.data || (Array.isArray(res?.data) ? res.data : []);
                setProducts(items.filter(item => item.type !== 'target'));
            })
            .catch(() => {})
            .finally(() => setLoadingProducts(false));
    }, []);

    const filteredItems = (searchQuery.trim()
        ? products.filter(p => (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()))
        : products
    ).slice(0, 12);

    return (
        <MainLayout>
            {/* ═══ 1. PREMIUM LIVE SEARCH BAR ═══ */}
            <div className="emperor-entrance emperor-entrance-delay-1" style={{
                maxWidth: '740px',
                margin: '0 auto 36px',
                position: 'relative',
                zIndex: 10,
            }}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (searchQuery.trim()) {
                            navigate(`/category/all?search=${encodeURIComponent(searchQuery.trim())}`);
                        }
                    }}
                    style={{
                        position: 'relative',
                        background: 'var(--bg-card)',
                        border: `1.5px solid ${searchFocused ? 'var(--gold-400)' : 'var(--border-subtle)'}`,
                        borderRadius: '9999px',
                        padding: '4px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        boxShadow: searchFocused
                            ? '0 0 0 4px rgba(212,165,55,0.12), 0 8px 32px rgba(0,0,0,0.5)'
                            : 'var(--shadow-sm)',
                        transition: 'all 0.3s ease',
                    }}
                >
                    <button
                        type="submit"
                        style={{
                            background: 'transparent',
                            border: 'none',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                        }}
                    >
                        <Search size={18} color="var(--gold-400)" />
                    </button>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setTimeout(() => setSearchFocused(false), 250)}
                        placeholder={t('searchPlaceholder', 'ابحث عن لعبة، بطاقة، باقة شحن، أو تطبيق...')}
                        style={{
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: 'var(--text-primary)',
                            fontSize: '14px',
                            fontWeight: '600',
                            padding: '14px 14px',
                            fontFamily: 'var(--font-cairo)',
                        }}
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            style={{
                                background: 'rgba(212, 165, 55, 0.12)',
                                border: '1px solid var(--border-subtle)',
                                color: 'var(--text-secondary)',
                                cursor: 'pointer',
                                fontSize: '11px',
                                fontWeight: '700',
                                padding: '4px 10px',
                                borderRadius: '9999px',
                                fontFamily: 'var(--font-cairo)',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            {t('clear', 'مسح')}
                        </button>
                    )}
                </form>

                {/* Instant Live Search Results Dropdown */}
                {searchFocused && searchQuery.trim().length > 0 && (
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        marginTop: '8px',
                        background: isLight ? '#FFFFFF' : '#121218',
                        border: isLight ? '1.5px solid #CBD5E1' : '1px solid rgba(212, 165, 55, 0.3)',
                        borderRadius: '20px',
                        padding: '12px',
                        boxShadow: isLight ? '0 10px 30px rgba(0,0,0,0.1)' : '0 16px 40px rgba(0,0,0,0.8)',
                        maxHeight: '340px',
                        overflowY: 'auto',
                    }}>
                        <div style={{ fontSize: '12px', color: isLight ? '#B45309' : 'var(--gold-400)', fontWeight: '800', padding: '6px 12px 10px' }}>
                            {t('liveSearchResults', 'نتائج البحث المباشرة')} ({filteredItems.length})
                        </div>
                        {filteredItems.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                {filteredItems.slice(0, 6).map((item) => {
                                    const itemImg = formatImageUrl(item.image_url || item.image);
                                    return (
                                        <Link
                                            key={item.id}
                                            to={`/product/${item.id}`}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                padding: '10px 14px',
                                                borderRadius: '12px',
                                                background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
                                                border: isLight ? '1px solid #E2E8F0' : 'none',
                                                textDecoration: 'none',
                                                transition: 'all 0.2s',
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = isLight ? '#FEFCE8' : 'rgba(212, 165, 55, 0.1)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)'}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: isLight ? '#F1F5F9' : '#222', overflow: 'hidden' }}>
                                                    {itemImg ? (
                                                        <img src={itemImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    ) : (
                                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4A537' }}>
                                                            <Package size={16} color="#D4A537" />
                                                        </div>
                                                    )}
                                                </div>
                                                <span style={{ fontSize: '13.5px', fontWeight: '700', color: isLight ? '#0F172A' : '#FFFFFF' }}>{item.name}</span>
                                            </div>
                                            <span style={{ fontSize: '13px', fontWeight: '800', color: isLight ? '#B45309' : 'var(--gold-300)' }}>
                                                {item.price_egp ? `${item.price_egp} ${t('currency', 'ج.م')}` : t('viewPackages', 'عرض الباقات')}
                                            </span>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            <div style={{ padding: '20px', textAlign: 'center', color: '#888', fontSize: '13px' }}>
                                {t('noMatchesFor', 'لا توجد منتجات مطابقة لـ')} "{searchQuery}"
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* ═══ 2. CATEGORY CARDS (أقسام المتجر) ═══ */}
            <VisualCategoryCards />

            {/* ═══ 3. TARGET CALLOUT BANNER (سحب واستبدال التارجت) ═══ */}
            <GoldenTargetBanner />

            {/* ═══ 4. TELEGRAM / WHATSAPP COMMUNITY BANNER ═══ */}
            <CommunityTelegramBanner />
        </MainLayout>
    );
}
