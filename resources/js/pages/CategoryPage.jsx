import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Search, Layers, Sparkles, ChevronLeft } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import ProductCard from '../components/products/ProductCard';
import EmptyState from '../components/ui/EmptyState';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { catalogApi } from '../api/endpoints';
import { formatImageUrl } from '../utils/imageHelper';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import '../../css/visualCategory.css';

const TYPE_CONFIG = {
    games: {
        type: 'games',
        title: 'قسم الألعاب الإلكترونية',
    },
    apps: {
        type: 'voice_apps',
        title: 'قسم التطبيقات',
    },
    voice_apps: {
        type: 'voice_apps',
        title: 'قسم التطبيقات',
    },
    cards: {
        type: 'cards',
        title: 'قسم البطاقات الرقمية',
    },
    telecom: {
        type: 'telecom',
        title: 'قسم شبكات الاتصالات',
    },
    all: {
        type: null,
        title: 'جميع الأقسام والتطبيقات',
    },
};

let categoriesCache = null;

export default function CategoryPage() {
    const params = useParams();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { isRtl } = useLanguage();
    const isLight = theme === 'light';
    const rawSlug = params.slug || params.id || 'all';
    const slug = rawSlug.toLowerCase();

    // Redirect to target apps if target slug is accessed
    useEffect(() => {
        if (slug === 'target' || slug === 'target-sell' || slug === 'target-selling' || slug === 'target-apps') {
            navigate('/target/apps', { replace: true });
        }
    }, [slug, navigate]);

    const [categories, setCategories] = useState(categoriesCache || []);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // Debounce search input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 200);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    // Fetch categories on mount or use cache
    useEffect(() => {
        if (categoriesCache && categoriesCache.length > 0) {
            setCategories(categoriesCache);
            return;
        }

        catalogApi.getCategories()
            .then(res => {
                if (res?.data) {
                    const cats = Array.isArray(res.data) ? res.data : res.data.data || [];
                    categoriesCache = cats;
                    setCategories(cats);
                }
            })
            .catch(() => { });
    }, []);

    const typeInfo = TYPE_CONFIG[slug] || null;

    const selectedCategory = useMemo(() => {
        if (!slug || slug === 'all') return null;
        return categories.find(c => c.slug?.toLowerCase() === slug || String(c.id) === String(slug)) || null;
    }, [slug, categories]);

    const currentActiveType = useMemo(() => {
        if (selectedCategory) return selectedCategory.type;
        if (typeInfo) return typeInfo.type;
        return null;
    }, [typeInfo, selectedCategory]);

    const visibleCategories = useMemo(() => {
        if (!currentActiveType) return categories;
        return categories.filter(c => c.type === currentActiveType);
    }, [categories, currentActiveType]);

    // Fetch products
    useEffect(() => {
        setLoading(true);
        const queryParams = {};

        if (slug && slug !== 'all') {
            queryParams.category_slug = slug;
        }

        if (debouncedSearch.trim()) {
            queryParams.search = debouncedSearch.trim();
        }

        catalogApi.getProducts(queryParams)
            .then(res => {
                if (res?.data?.data) {
                    setProducts(res.data.data);
                } else if (Array.isArray(res?.data)) {
                    setProducts(res.data);
                } else {
                    setProducts([]);
                }
            })
            .catch(() => {
                setProducts([]);
            })
            .finally(() => setLoading(false));
    }, [slug, debouncedSearch]);

    const filteredProducts = useMemo(() => {
        return [...products].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
    }, [products]);

    const categoryTitle = selectedCategory
        ? selectedCategory.name
        : (typeInfo?.title || 'جميع التطبيقات والألعاب');

    const allTabLink = currentActiveType && currentActiveType !== 'all'
        ? (currentActiveType === 'voice_apps' ? '/category/apps' : `/category/${currentActiveType}`)
        : '/category/all';

    const isAllTabActive = !selectedCategory;

    return (
        <MainLayout>
            <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', padding: '0 4px 60px' }}>
                
                {/* ── 1. Search Bar (Matching KA-Card Screenshot) ── */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    marginBottom: '20px',
                }}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="ابحث عن منتج وسيظهر مباشرة أسفل البحث..."
                        style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            background: isLight ? '#FFFFFF' : '#0e0e14',
                            border: isLight ? '1.5px solid rgba(212, 165, 55, 0.45)' : '1px solid rgba(212, 165, 55, 0.25)',
                            borderRadius: '16px',
                            padding: isRtl ? '14px 44px 14px 16px' : '14px 16px 14px 44px',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: isLight ? '#0F172A' : '#FFFFFF',
                            outline: 'none',
                            boxShadow: isLight ? '0 4px 16px rgba(0, 0, 0, 0.04)' : '0 6px 20px rgba(0, 0, 0, 0.4)',
                            transition: 'all 0.25s ease',
                            fontFamily: 'var(--font-cairo)',
                        }}
                        onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#F5D061';
                            e.currentTarget.style.boxShadow = '0 0 0 2px rgba(212, 165, 55, 0.25)';
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.borderColor = isLight ? 'rgba(212, 165, 55, 0.45)' : 'rgba(212, 165, 55, 0.25)';
                            e.currentTarget.style.boxShadow = isLight ? '0 4px 16px rgba(0, 0, 0, 0.04)' : '0 6px 20px rgba(0, 0, 0, 0.4)';
                        }}
                    />
                    <Search
                        size={19}
                        style={{
                            position: 'absolute',
                            [isRtl ? 'right' : 'left']: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--gold-400, #D4A537)',
                            pointerEvents: 'none',
                        }}
                    />
                </div>

                {/* ── 2. Category Breadcrumb & Filter Header (Matching KA-Card) ── */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    marginBottom: '20px',
                    padding: '8px 12px',
                    borderRadius: '14px',
                    background: isLight ? 'rgba(255, 255, 255, 0.6)' : 'rgba(18, 18, 24, 0.5)',
                    border: isLight ? '1px solid rgba(212, 165, 55, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)',
                }}>
                    {/* Breadcrumb path */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', fontWeight: '800' }}>
                        <Link
                            to="/"
                            style={{
                                color: 'var(--gold-400, #D4A537)',
                                textDecoration: 'none',
                            }}
                        >
                            الرئيسية
                        </Link>
                        <span style={{ color: isLight ? '#94A3B8' : '#5A5A6A', fontSize: '12px' }}>›</span>
                        <span style={{ color: isLight ? '#0F172A' : '#FFFFFF' }}>
                            {categoryTitle}
                        </span>
                    </div>

                    {/* Count badge */}
                    <span style={{
                        fontSize: '12px',
                        fontWeight: '800',
                        color: 'var(--gold-400, #D4A537)',
                        background: 'rgba(212, 165, 55, 0.12)',
                        padding: '3px 10px',
                        borderRadius: '8px',
                    }}>
                        {filteredProducts.length} عنصر
                    </span>
                </div>

                {/* ── 3. Horizontal Category Chips ── */}
                {visibleCategories.length > 0 && (
                    <div
                        className="no-scrollbar"
                        style={{
                            display: 'flex',
                            gap: '8px',
                            overflowX: 'auto',
                            WebkitOverflowScrolling: 'touch',
                            paddingBottom: '14px',
                            marginBottom: '16px',
                            scrollbarWidth: 'none',
                        }}
                    >
                        <Link
                            to={allTabLink}
                            preventScrollReset={true}
                            style={{
                                padding: '7px 16px',
                                borderRadius: '12px',
                                background: isAllTabActive
                                    ? 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)'
                                    : (isLight ? '#FFFFFF' : 'rgba(24, 24, 32, 0.85)'),
                                color: isAllTabActive ? '#0A0A0E' : (isLight ? '#1E293B' : '#E2E8F0'),
                                fontWeight: '800',
                                fontSize: '12.5px',
                                textDecoration: 'none',
                                whiteSpace: 'nowrap',
                                border: isAllTabActive ? 'none' : (isLight ? '1px solid rgba(212, 165, 55, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)'),
                                boxShadow: isAllTabActive ? '0 4px 12px rgba(212, 165, 55, 0.35)' : 'none',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            الكل ({categories.length})
                        </Link>

                        {visibleCategories.map((cat) => {
                            const isActive = selectedCategory?.id === cat.id || slug === cat.slug?.toLowerCase();
                            return (
                                <Link
                                    key={cat.id}
                                    to={`/category/${cat.slug || cat.id}`}
                                    preventScrollReset={true}
                                    style={{
                                        padding: '7px 14px',
                                        borderRadius: '12px',
                                        background: isActive
                                            ? 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)'
                                            : (isLight ? '#FFFFFF' : 'rgba(24, 24, 32, 0.85)'),
                                        color: isActive ? '#0A0A0E' : (isLight ? '#1E293B' : '#E2E8F0'),
                                        fontWeight: '800',
                                        fontSize: '12.5px',
                                        textDecoration: 'none',
                                        whiteSpace: 'nowrap',
                                        border: isActive ? 'none' : (isLight ? '1px solid rgba(212, 165, 55, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)'),
                                        boxShadow: isActive ? '0 4px 12px rgba(212, 165, 55, 0.35)' : 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    {(() => {
                                        const iconSrc = formatImageUrl(cat.icon_url || cat.icon);
                                        return iconSrc ? (
                                            <img
                                                src={iconSrc}
                                                alt=""
                                                loading="lazy"
                                                decoding="async"
                                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                                style={{ width: '16px', height: '16px', objectFit: 'contain', borderRadius: '4px' }}
                                            />
                                        ) : (
                                            <Layers size={14} />
                                        );
                                    })()}
                                    <span>{cat.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {/* ── 4. Products Grid (3 columns on mobile, square poster cards) ── */}
                {loading ? (
                    <div style={{ padding: '60px 0' }}>
                        <LoadingSpinner text="جاري تحميل المنتجات..." />
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="emperor-products-grid">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        title="لم يتم العثور على منتجات"
                        description={debouncedSearch ? `لا توجد نتائج مطابقة لـ "${debouncedSearch}"` : 'لا توجد منتجات متاحة في هذا القسم حالياً'}
                        actionText="تصفح جميع المنتجات"
                        onAction={() => setSearchQuery('')}
                    />
                )}
            </div>
        </MainLayout>
    );
}
