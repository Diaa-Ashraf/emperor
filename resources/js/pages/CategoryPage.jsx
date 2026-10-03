import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Search, Filter, ArrowRight, Grid, SlidersHorizontal, Gamepad2, Layers } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import ProductCard from '../components/products/ProductCard';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import EmptyState from '../components/ui/EmptyState';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { catalogApi } from '../api/endpoints';
import VideoBackground from '../components/home/VideoBackground';

export default function CategoryPage() {
    const params = useParams();
    const navigate = useNavigate();
    const slug = params.slug || params.id;

    // Redirect to target apps if target slug is accessed
    useEffect(() => {
        if (slug === 'target' || slug === 'target-sell' || slug === 'target-selling' || slug === 'target-apps') {
            navigate('/target/apps', { replace: true });
        }
    }, [slug, navigate]);

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('sort_order');
    const [filterType, setFilterType] = useState('all');

    // Fetch categories on mount
    useEffect(() => {
        catalogApi.getCategories()
            .then(res => {
                if (res?.data) {
                    const cats = Array.isArray(res.data) ? res.data : res.data.data || [];
                    setCategories(cats);
                    if (slug && slug !== 'all') {
                        const matched = cats.find(c => c.slug === slug || String(c.id) === String(slug));
                        setSelectedCategory(matched || null);
                    } else {
                        setSelectedCategory(null);
                    }
                }
            })
            .catch(() => { });
    }, [slug]);

    // Fetch products whenever selectedCategory or slug changes
    useEffect(() => {
        setLoading(true);
        const params = {};

        if (slug && slug !== 'all') {
            params.category_id = selectedCategory?.id;
        }

        if (searchQuery.trim()) {
            params.search = searchQuery.trim();
        }

        if (filterType !== 'all') {
            params.type = filterType;
        }

        catalogApi.getProducts(params)
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
                console.error('Products API error:', error);
                setProducts([]);
            })
            .finally(() => setLoading(false));
    }, [slug, selectedCategory, searchQuery, filterType]);
    // Filter & Sort products in memory
    const filteredProducts = [...products].sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name, 'ar');
        }
        return (a.sort_order || 0) - (b.sort_order || 0);
    });

    const categoryTitle = selectedCategory ? selectedCategory.name : 'جميع المنتجات والألعاب';

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
                            {selectedCategory?.description || 'اختر لعبتك المفضلة أو باقتك للشحن الفوري بأسعار الجملة'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Categories Filter Tabs */}
            {categories.length > 0 && (
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
                        to="/category/all"
                        style={{
                            padding: '8px 18px',
                            borderRadius: '12px',
                            background: !slug || slug === 'all'
                                ? 'linear-gradient(135deg, #F3E5AB 0%, #D4A537 100%)'
                                : '#1E1E28',
                            color: !slug || slug === 'all' ? '#0D0D0F' : '#E2E8F0',
                            fontWeight: '700',
                            fontSize: '14px',
                            textDecoration: 'none',
                            whiteSpace: 'nowrap',
                            border: !slug || slug === 'all' ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                            transition: 'all 0.2s',
                        }}
                    >
                        الكل
                    </Link>

                    {categories.map((cat) => {
                        const isActive = slug === cat.slug || String(selectedCategory?.id) === String(cat.id);
                        return (
                            <Link
                                key={cat.id}
                                to={`/category/${cat.slug || cat.id}`}
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
                                {cat.icon_url ? (
                                    <img
                                        src={typeof cat.icon_url === 'string' && cat.icon_url.includes('/storage/')
                                            ? ('/storage/' + cat.icon_url.split('/storage/')[1])
                                            : cat.icon_url}
                                        alt=""
                                        style={{ width: '18px', height: '18px', objectFit: 'contain', borderRadius: '4px' }}
                                    />
                                ) : (
                                    <Layers size={16} />
                                )}
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
                        description={searchQuery ? `لا توجد نتائج مطابقة لـ "${searchQuery}"` : 'لا توجد منتجات متاحة في هذا القسم حالياً'}
                        actionText="تصفح جميع المنتجات"
                        onAction={() => {
                            setSearchQuery('');
                            setSelectedCategory(null);
                        }}
                    />
                )}
            </VideoBackground>
        </MainLayout>
    );
}
