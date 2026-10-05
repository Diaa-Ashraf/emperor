import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Search, Filter, ArrowRight, Grid, SlidersHorizontal, Gamepad2, Layers, Sparkles } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';

import ProductCard from '../components/products/ProductCard';
import Input from '../components/ui/Input';
import EmptyState from '../components/ui/EmptyState';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { catalogApi } from '../api/endpoints';
import VideoBackground from '../components/home/VideoBackground';
import { formatImageUrl } from '../utils/imageHelper';
import { useTheme } from '../contexts/ThemeContext';

const TYPE_CONFIG = {
    games: {
        type: 'games',
        title: 'شحن الألعاب والبطاقات',
        description: 'اختر لعبتك المفضلة أو باقتك للشحن الفوري بأسعار الجملة والتسليم التلقائي',
    },
    apps: {
        type: 'voice_apps',
        title: 'تطبيقات البث والشات الصوتي',
        description: 'شحن العملات والكوينز لبرامج البث الصوتي وتطبيقات التعارف والشات',
    },
    voice_apps: {
        type: 'voice_apps',
        title: 'تطبيقات البث والشات الصوتي',
        description: 'شحن العملات والكوينز لبرامج البث الصوتي وتطبيقات التعارف والشات',
    },
    cards: {
        type: 'cards',
        title: 'البطاقات الرقمية والاشتراكات',
        description: 'بطاقات الهدايا، شحن الاشتراكات، والأكواد الرقمية المباشرة',
    },
    telecom: {
        type: 'telecom',
        title: 'شحن شبكات الاتصالات',
        description: 'رصيد وكروت شحن باقات الهواتف والإنترنت لجميع الشبكات',
    },
    all: {
        type: null,
        title: 'جميع المنتجات والألعاب',
        description: 'تصفح كل الخدمات والألعاب والبطاقات الرقمية المتاحة على المنصة',
    },
};

// In-memory module cache for categories
let categoriesCache = null;

export default function CategoryPage() {
    const params = useParams();
    const navigate = useNavigate();
    const { theme } = useTheme();
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
    const [sortBy, setSortBy] = useState('sort_order');
    const [filterType, setFilterType] = useState('all');

    // Debounce search input for high performance
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 250);
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

    // Check if slug is a Type container (e.g. 'games', 'apps', 'cards')
    const typeInfo = TYPE_CONFIG[slug] || null;

    const selectedCategory = useMemo(() => {
        if (typeInfo || !slug || slug === 'all') return null;
        return categories.find(c => c.slug?.toLowerCase() === slug || String(c.id) === String(slug)) || null;
    }, [slug, categories, typeInfo]);

    // Determine active type to filter visible categories tabs
    const currentActiveType = useMemo(() => {
        if (typeInfo) return typeInfo.type;
        if (selectedCategory) return selectedCategory.type;
        return null;
    }, [typeInfo, selectedCategory]);

    const visibleCategories = useMemo(() => {
        if (!currentActiveType) return categories;
        return categories.filter(c => c.type === currentActiveType);
    }, [categories, currentActiveType]);

    // Fetch products in parallel / direct query
    useEffect(() => {
        setLoading(true);
        const queryParams = {};

        if (slug && slug !== 'all') {
            queryParams.category_slug = slug;
        }

        if (debouncedSearch.trim()) {
            queryParams.search = debouncedSearch.trim();
        }

        if (filterType !== 'all') {
            queryParams.type = filterType;
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
    }, [slug, debouncedSearch, filterType]);

    // Filter & Sort products in memory using useMemo
    const filteredProducts = useMemo(() => {
        return [...products].sort((a, b) => {
            if (sortBy === 'name') {
                return (a.name || '').localeCompare(b.name || '', 'ar');
            }
            return (a.sort_order || 0) - (b.sort_order || 0);
        });
    }, [products, sortBy]);

    const categoryTitle = selectedCategory 
        ? selectedCategory.name 
        : (typeInfo?.title || 'جميع المنتجات والألعاب');

    const categoryDescription = selectedCategory
        ? (selectedCategory.description || 'اختر باقتك المفضلة للشحن الفوري بأسعار الجملة')
        : (typeInfo?.description || 'اختر لعبتك المفضلة أو باقتك للشحن الفوري بأسعار الجملة');

    const allTabLink = currentActiveType && currentActiveType !== 'all'
        ? (currentActiveType === 'voice_apps' ? '/category/apps' : `/category/${currentActiveType}`)
        : '/category/all';

    const isAllTabActive = !selectedCategory;

    return (
        <MainLayout>
            {/* Header & Breadcrumb Hero */}
            <div style={{
                background: isLight
                    ? 'linear-gradient(135deg, #FFFDF7 0%, #FEF8EA 45%, #FDF1D3 100%)'
                    : 'linear-gradient(135deg, #181824 0%, #101016 50%, #0B0B0E 100%)',
                border: isLight ? '1.5px solid rgba(212, 165, 55, 0.45)' : '1px solid rgba(212, 165, 55, 0.3)',
                borderRadius: '24px',
                padding: 'clamp(24px, 4vw, 36px)',
                marginBottom: '32px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: isLight
                    ? '0 10px 30px rgba(212, 165, 55, 0.12), 0 2px 10px rgba(0, 0, 0, 0.04)'
                    : '0 16px 45px rgba(0, 0, 0, 0.6), 0 0 30px rgba(212, 165, 55, 0.08)',
            }}>
                {/* Background ambient aura */}
                <div style={{
                    position: 'absolute',
                    top: '-60px',
                    left: '-60px',
                    width: '240px',
                    height: '240px',
                    borderRadius: '50%',
                    background: isLight
                        ? 'radial-gradient(circle, rgba(212, 165, 55, 0.22) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(212, 165, 55, 0.18) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Breadcrumb */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', fontSize: '13px', color: isLight ? '#64748B' : '#8E8E98' }}>
                        <Link to="/" style={{ color: isLight ? '#9A7210' : '#D4A537', textDecoration: 'none', fontWeight: '800' }}>الرئيسية</Link>
                        <span>/</span>
                        <Link to="/category/all" style={{ color: isLight ? '#64748B' : '#8E8E98', textDecoration: 'none', fontWeight: '600' }}>الأقسام والمنتجات</Link>
                        <span>/</span>
                        <span style={{ color: isLight ? '#0F172A' : '#CBD5E1', fontWeight: '800' }}>{categoryTitle}</span>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                        <div>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '4px 12px',
                                borderRadius: '8px',
                                background: isLight ? 'rgba(212, 165, 55, 0.18)' : 'rgba(212, 165, 55, 0.15)',
                                border: isLight ? '1px solid rgba(212, 165, 55, 0.45)' : '1px solid rgba(212, 165, 55, 0.35)',
                                color: isLight ? '#9A7210' : '#D4A537',
                                fontSize: '12px',
                                fontWeight: '800',
                                marginBottom: '10px',
                            }}>
                                <Sparkles size={13} />
                                <span>شحن رسمي فوري وتلقائي</span>
                            </div>

                            <h1 style={{
                                margin: '0 0 8px',
                                fontSize: 'clamp(24px, 4vw, 32px)',
                                fontWeight: '900',
                                color: isLight ? '#0F172A' : '#FFFFFF',
                                letterSpacing: '-0.3px',
                            }}>
                                {categoryTitle}
                            </h1>
                            <p style={{ margin: 0, fontSize: '14.5px', color: isLight ? '#475569' : '#A0A0B0', maxWidth: '650px', lineHeight: '1.6' }}>
                                {categoryDescription}
                            </p>
                        </div>

                        {/* Product count badge */}
                        <div style={{
                            background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)',
                            border: isLight ? '1.5px solid rgba(212, 165, 55, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            padding: '12px 20px',
                            textAlign: 'center',
                            boxShadow: isLight ? '0 4px 15px rgba(212, 165, 55, 0.12)' : 'none',
                        }}>
                            <span style={{ fontSize: '11.5px', color: isLight ? '#64748B' : '#8E8E98', display: 'block', fontWeight: '700' }}>
                                إجمالي العناصر
                            </span>
                            <span style={{ fontSize: '20px', fontWeight: '900', color: isLight ? '#9A7210' : '#D4A537' }}>
                                {filteredProducts.length} <small style={{ fontSize: '12px', color: isLight ? '#64748B' : '#CBD5E1' }}>منتج</small>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Filter Tabs */}
            {visibleCategories.length > 0 && (
                <div
                    className="no-scrollbar"
                    style={{
                        display: 'flex',
                        gap: '10px',
                        overflowX: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        paddingBottom: '12px',
                        marginBottom: '26px',
                        scrollbarWidth: 'none',
                    }}
                >
                    <Link
                        to={allTabLink}
                        preventScrollReset={true}
                        style={{
                            padding: '9px 20px',
                            borderRadius: '14px',
                            background: isAllTabActive
                                ? 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)'
                                : (isLight ? '#FFFFFF' : 'rgba(24, 24, 32, 0.85)'),
                            color: isAllTabActive ? '#0A0A0E' : (isLight ? '#1E293B' : '#E2E8F0'),
                            fontWeight: '800',
                            fontSize: '13.5px',
                            textDecoration: 'none',
                            whiteSpace: 'nowrap',
                            border: isAllTabActive ? 'none' : (isLight ? '1.5px solid rgba(212, 165, 55, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)'),
                            boxShadow: isAllTabActive 
                                ? '0 4px 15px rgba(212, 165, 55, 0.35)' 
                                : (isLight ? '0 2px 8px rgba(0, 0, 0, 0.04)' : 'none'),
                            transition: 'all 0.2s',
                        }}
                    >
                        الكل ({categories.length > 0 ? categories.length : '✦'})
                    </Link>

                    {visibleCategories.map((cat) => {
                        const isActive = selectedCategory?.id === cat.id || slug === cat.slug?.toLowerCase();
                        return (
                            <Link
                                key={cat.id}
                                to={`/category/${cat.slug || cat.id}`}
                                preventScrollReset={true}
                                style={{
                                    padding: '9px 18px',
                                    borderRadius: '14px',
                                    background: isActive
                                        ? 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)'
                                        : (isLight ? '#FFFFFF' : 'rgba(24, 24, 32, 0.85)'),
                                    color: isActive ? '#0A0A0E' : (isLight ? '#1E293B' : '#E2E8F0'),
                                    fontWeight: '800',
                                    fontSize: '13.5px',
                                    textDecoration: 'none',
                                    whiteSpace: 'nowrap',
                                    border: isActive ? 'none' : (isLight ? '1.5px solid rgba(212, 165, 55, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)'),
                                    boxShadow: isActive 
                                        ? '0 4px 15px rgba(212, 165, 55, 0.35)' 
                                        : (isLight ? '0 2px 8px rgba(0, 0, 0, 0.04)' : 'none'),
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '7px',
                                    transition: 'all 0.2s',
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
                                            style={{ width: '18px', height: '18px', objectFit: 'contain', borderRadius: '4px' }}
                                        />
                                    ) : (
                                        <Layers size={16} />
                                    );
                                })()}
                                <span>{cat.name}</span>
                            </Link>
                        );
                    })}
                </div>
            )}

            {/* Search and Filters Bar */}
            <div style={{
                background: isLight
                    ? 'linear-gradient(145deg, #FFFFFF 0%, #FFFDF8 100%)'
                    : 'linear-gradient(145deg, #161622 0%, #101016 100%)',
                border: isLight ? '1.5px solid rgba(212, 165, 55, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '18px',
                padding: '14px 18px',
                marginBottom: '30px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px',
                boxShadow: isLight ? '0 6px 20px rgba(212, 165, 55, 0.08)' : 'none',
            }}>
                <div style={{ flex: '1 1 280px', maxWidth: '440px' }}>
                    <Input
                        type="text"
                        placeholder="ابحث عن لعبة، تطبيق، أو بطاقة رقمية..."
                        icon={Search}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        containerStyle={{ marginBottom: 0 }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <SlidersHorizontal size={16} color={isLight ? '#9A7210' : '#D4A537'} />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{
                                background: isLight ? '#FFFFFF' : '#121218',
                                border: isLight ? '1.5px solid rgba(212, 165, 55, 0.45)' : '1px solid rgba(212, 165, 55, 0.3)',
                                borderRadius: '12px',
                                color: isLight ? '#0F172A' : '#FFFFFF',
                                padding: '9px 14px',
                                fontSize: '13px',
                                fontWeight: '700',
                                outline: 'none',
                                fontFamily: 'Cairo, sans-serif',
                                cursor: 'pointer',
                            }}
                        >
                            <option value="sort_order">الترتيب الافتراضي</option>
                            <option value="name">الاسم أبجدياً</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <VideoBackground>
                {loading ? (
                    <div style={{ padding: '60px 0' }}>
                        <LoadingSpinner text="جاري تحميل المنتجات والأسعار..." />
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))',
                        gap: '20px',
                    }}>
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        title="لم يتم العثور على منتجات"
                        description={debouncedSearch ? `لا توجد نتائج مطابقة لـ "${debouncedSearch}"` : 'لا توجد منتجات متاحة في هذا القسم حالياً'}
                        actionText="تصفح جميع المنتجات"
                        onAction={() => {
                            setSearchQuery('');
                        }}
                    />
                )}
            </VideoBackground>
        </MainLayout>
    );
}
