import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Search, Filter, ArrowRight, Grid, SlidersHorizontal, Gamepad2, Layers } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import ProductCard from '../components/products/ProductCard';
import Input from '../components/ui/Input';
import EmptyState from '../components/ui/EmptyState';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { catalogApi } from '../api/endpoints';
import VideoBackground from '../components/home/VideoBackground';
import { formatImageUrl } from '../utils/imageHelper';

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
            {/* Header & Breadcrumb */}
            <div style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '13px', color: '#8E8E98' }}>
                    <Link to="/" style={{ color: '#D4A537', textDecoration: 'none' }}>الرئيسية</Link>
                    <span>/</span>
                    <span style={{ color: '#CBD5E1' }}>{categoryTitle}</span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                    <div>
                        <h1 style={{ margin: '0 0 6px', fontSize: '26px', fontWeight: '900', color: '#FFFFFF' }}>
                            {categoryTitle}
                        </h1>
                        <p style={{ margin: 0, fontSize: '14px', color: '#9E9EA8' }}>
                            {categoryDescription}
                        </p>
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
                        marginBottom: '28px',
                        scrollbarWidth: 'none',
                    }}
                >
                    <Link
                        to={allTabLink}
                        preventScrollReset={true}
                        style={{
                            padding: '8px 18px',
                            borderRadius: '12px',
                            background: isAllTabActive
                                ? 'linear-gradient(135deg, #F3E5AB 0%, #D4A537 100%)'
                                : '#1E1E28',
                            color: isAllTabActive ? '#0D0D0F' : '#E2E8F0',
                            fontWeight: '700',
                            fontSize: '14px',
                            textDecoration: 'none',
                            whiteSpace: 'nowrap',
                            border: isAllTabActive ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                            transition: 'all 0.2s',
                        }}
                    >
                        الكل
                    </Link>

                    {visibleCategories.map((cat) => {
                        const isActive = selectedCategory?.id === cat.id || slug === cat.slug?.toLowerCase();
                        return (
                            <Link
                                key={cat.id}
                                to={`/category/${cat.slug || cat.id}`}
                                preventScrollReset={true}
                                style={{
                                    padding: '8px 18px',
                                    borderRadius: '12px',
                                    background: isActive
                                        ? 'linear-gradient(135deg, #F3E5AB 0%, #D4A537 100%)'
                                        : '#1E1E28',
                                    color: isActive ? '#0D0D0F' : '#E2E8F0',
                                    fontWeight: '700',
                                    fontSize: '14px',
                                    textDecoration: 'none',
                                    whiteSpace: 'nowrap',
                                    border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
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
                background: 'rgba(26, 26, 36, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '16px 20px',
                marginBottom: '32px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
            }}>
                <div style={{ flex: '1 1 280px', maxWidth: '400px' }}>
                    <Input
                        type="text"
                        placeholder="ابحث عن لعبة أو منتج..."
                        icon={Search}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        containerStyle={{ marginBottom: 0 }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <SlidersHorizontal size={16} color="#8E8E98" />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{
                                background: '#121218',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                borderRadius: '10px',
                                color: '#FFFFFF',
                                padding: '8px 12px',
                                fontSize: '13px',
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
                    <div className="responsive-grid-products">
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
