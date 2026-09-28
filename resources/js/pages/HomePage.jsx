import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Search,
    Zap,
    ShieldCheck,
    Crown,
    Headphones,
    ArrowLeft,
    ArrowRight,
    Sparkles,
    ShoppingBag,
    TrendingUp,
    Star,
    ChevronRight,
    ChevronLeft,
    Users,
    Clock,
    CheckCircle2,
    Package,
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import LiveActivityTicker from '../components/home/LiveActivityTicker';
import QuickRechargeWizard from '../components/home/QuickRechargeWizard';
import VisualCategoryCards from '../components/home/VisualCategoryCards';
import LiveTargetMarket from '../components/home/LiveTargetMarket';
import GoldenTargetBanner from '../components/home/GoldenTargetBanner';
import CustomerReviewsSection from '../components/home/CustomerReviewsSection';
import FaqAccordion from '../components/home/FaqAccordion';
import CommunityTelegramBanner from '../components/home/CommunityTelegramBanner';
import BestSellerCard from '../components/products/BestSellerCard';
import { catalogApi } from '../api/endpoints';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function HomePage() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { t, isRtl } = useLanguage();

    const [searchQuery, setSearchQuery] = useState('');
    const [searchFocused, setSearchFocused] = useState(false);
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);

    useEffect(() => {
        catalogApi.getProducts({ limit: 12, per_page: 12 })
            .then(res => {
                if (res?.data?.data) setProducts(res.data.data);
                else if (Array.isArray(res?.data)) setProducts(res.data);
            })
            .catch(() => {})
            .finally(() => setLoadingProducts(false));
    }, []);

    const filteredItems = (searchQuery.trim()
        ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : products
    ).slice(0, 12);

    return (
        <MainLayout>
            {/* ═══ 1. LIVE ACTIVITY TICKER ═══ */}
            <LiveActivityTicker />

            {/* ═══ 2. PREMIUM LIVE SEARCH BAR ═══ */}
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
                        placeholder="ابحث عن لعبة، بطاقة، باقة شحن، أو تطبيق بث..."
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
                            مسح
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
                        background: '#121218',
                        border: '1px solid rgba(212, 165, 55, 0.3)',
                        borderRadius: '20px',
                        padding: '12px',
                        boxShadow: '0 16px 40px rgba(0,0,0,0.8)',
                        maxHeight: '340px',
                        overflowY: 'auto',
                    }}>
                        <div style={{ fontSize: '12px', color: 'var(--gold-400)', fontWeight: '800', padding: '6px 12px 10px' }}>
                            نتائج البحث المباشرة ({filteredItems.length})
                        </div>
                        {filteredItems.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                {filteredItems.slice(0, 6).map((item) => (
                                    <Link
                                        key={item.id}
                                        to={`/product/${item.id}`}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '10px 14px',
                                            borderRadius: '12px',
                                            background: 'rgba(255, 255, 255, 0.02)',
                                            textDecoration: 'none',
                                            transition: 'all 0.2s',
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(212, 165, 55, 0.1)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#222', overflow: 'hidden' }}>
                                                {item.image ? (
                                                    <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4A537' }}><Package size={16} color="#D4A537" /></div>
                                                )}
                                            </div>
                                            <span style={{ fontSize: '13.5px', fontWeight: '700', color: '#FFFFFF' }}>{item.name}</span>
                                        </div>
                                        <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--gold-300)' }}>
                                            {item.price_egp ? `${item.price_egp} ج.م` : 'عرض الباقات'}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div style={{ padding: '20px', textAlign: 'center', color: '#888', fontSize: '13px' }}>
                                لا توجد منتجات مطابقة لـ "{searchQuery}"
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* ═══ 4. CATEGORY CARDS (أقسام المتجر والخدمات الرقمية) ═══ */}
            <VisualCategoryCards />

            {/* ═══ 5. INSTANT RECHARGE WIZARD (الشاحن الملكي السريع) ═══ */}
            <QuickRechargeWizard />

            {/* ═══ 6. TARGET CALLOUT BANNER (اضغط هنا لسحب راتبك) ═══ */}
            <GoldenTargetBanner />

            {/* ═══ 7. BEST SELLERS SECTION (الأكثر طلباً ومبيعاً) ═══ */}
            <div className="emperor-entrance" style={{ marginBottom: '56px' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '24px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '12px',
                            background: 'rgba(212, 165, 55, 0.10)',
                            border: '1px solid var(--border-medium)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Star size={20} color="var(--gold-400)" fill="var(--gold-400)" />
                        </div>
                        <div>
                            <h2 style={{
                                margin: 0,
                                fontSize: 'clamp(18px, 3vw, 24px)',
                                fontWeight: '900',
                                color: 'var(--text-primary)',
                                letterSpacing: '-0.3px',
                            }}>
                                الأكثر طلباً ومبيعاً
                            </h2>
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                الباقات المفضلة للاعبين والتجار بأسعار حصرية
                            </span>
                        </div>
                    </div>

                    <Link
                        to="/category/games"
                        className="emperor-btn-ghost"
                        style={{
                            padding: '7px 16px',
                            fontSize: '12px',
                            borderRadius: '9999px',
                        }}
                    >
                        <span>{t('viewAll')}</span>
                        {isRtl ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                    </Link>
                </div>

                {/* Product Grid */}
                <div className="responsive-grid-products">
                    {filteredItems.map((item, i) => (
                        <div
                            key={item.id}
                            className="emperor-entrance"
                            style={{ animationDelay: `${i * 0.05}s` }}
                        >
                            <BestSellerCard item={item} />
                        </div>
                    ))}
                </div>
            </div>

            {/* ═══ 8. LIVE TARGET MARKET (بورصة تسييل وسحب التارجت اللحظية) ═══ */}
            <LiveTargetMarket />

            {/* ═══ 10. TRUST STATS BAR ═══ */}
            <div className="emperor-entrance emperor-vip-card" style={{
                borderRadius: '24px',
                padding: 'clamp(20px, 3.5vw, 32px) clamp(14px, 3vw, 24px)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
                gap: '16px',
                textAlign: 'center',
                marginBottom: '44px',
            }}>
                <TrustStat value="+50,000" label="مستخدم وتاجر نشط" icon={Users} color="var(--gold-400)" />
                <TrustStat value="+250,000" label="طلب شحن مكتمل" icon={ShoppingBag} color="var(--text-primary)" />
                <TrustStat value="99.9%" label="معدل نجاح المعاملات" icon={CheckCircle2} color="var(--success)" />
                <TrustStat value="18 ثانية" label="متوسط سرعة التنفيذ" icon={Clock} color="var(--gold-100)" />
            </div>

            {/* ═══ 11. CUSTOMER REVIEWS (آراء وتقييمات العملاء والتجار الحقيقيين) ═══ */}
            <CustomerReviewsSection />

            {/* ═══ 12. FAQ ACCORDION (الأسئلة الأكثر شيوعاً) ═══ */}
            <FaqAccordion />

            {/* ═══ 13. TELEGRAM COMMUNITY BANNER ═══ */}
            <CommunityTelegramBanner />
        </MainLayout>
    );
}

/* ── Trust Stat Component ── */
function TrustStat({ value, label, icon: Icon, color }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'rgba(212, 165, 55, 0.08)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '4px',
            }}>
                <Icon size={20} color={color} />
            </div>
            <span style={{
                fontSize: 'clamp(22px, 3vw, 28px)',
                fontWeight: '900',
                color: color,
                lineHeight: '1',
            }}>
                {value}
            </span>
            <span style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                fontWeight: '600',
            }}>
                {label}
            </span>
        </div>
    );
}
