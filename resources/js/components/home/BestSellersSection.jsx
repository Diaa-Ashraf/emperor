import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Flame,
    Zap,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    Trophy,
    Star,
    CheckCircle2,
    ArrowUpRight,
    Package
} from 'lucide-react';
import { catalogApi } from '../../api/endpoints';
import { formatImageUrl } from '../../utils/imageHelper';
import { useLanguage } from '../../contexts/LanguageContext';

export default function BestSellersSection() {
    const { t, isRtl } = useLanguage();
    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        catalogApi.getProducts({ limit: 12, per_page: 12 })
            .then((res) => {
                const items = res?.data?.data || (Array.isArray(res?.data) ? res.data : []);
                // Filter out target products, sort by sort_order or take top 6-8 popular items
                const valid = items.filter(p => p.type !== 'target');
                setBestSellers(valid.slice(0, 8));
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    if (!loading && bestSellers.length === 0) {
        return null;
    }

    return (
        <section className="emperor-entrance" style={{ marginBottom: '56px', position: 'relative' }}>
            {/* Ambient Background Glow */}
            <div style={{
                position: 'absolute',
                top: '-30px',
                right: '10%',
                width: '350px',
                height: '350px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(212, 165, 55, 0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0,
            }} />

            {/* Section Header */}
            <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                marginBottom: '24px',
                position: 'relative',
                zIndex: 1,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, rgba(212, 165, 55, 0.2) 0%, rgba(212, 165, 55, 0.05) 100%)',
                        border: '1px solid rgba(212, 165, 55, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 20px rgba(212, 165, 55, 0.15)',
                    }}>
                        <Sparkles size={22} color="var(--gold-400)" />
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <h2 style={{
                                margin: 0,
                                fontSize: 'clamp(20px, 3.2vw, 26px)',
                                fontWeight: '900',
                                color: '#FFFFFF',
                                letterSpacing: '-0.3px',
                            }}>
                                الأكثر طلباً ورواجاً
                            </h2>
                            <span style={{
                                background: 'linear-gradient(135deg, #D4A537 0%, #AA7C11 100%)',
                                color: '#000000',
                                fontSize: '11px',
                                fontWeight: '900',
                                padding: '2px 8px',
                                borderRadius: '20px',
                                textTransform: 'uppercase',
                            }}>
                                Top Sellers
                            </span>
                        </div>
                        <p style={{ margin: '4px 0 0', fontSize: '13.5px', color: '#94A3B8' }}>
                            المنتجات وباقات الشحن الأكثر طلباً وإقبالاً بين المستخدمين
                        </p>
                    </div>
                </div>

                <Link
                    to="/category/all"
                    className="emperor-btn-ghost"
                    style={{
                        padding: '8px 18px',
                        fontSize: '13px',
                        borderRadius: '9999px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                    }}
                >
                    <span>عرض كافة المنتجات</span>
                    {isRtl ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
                </Link>
            </div>

            {/* Grid of Best Sellers */}
            {loading ? (
                <div className="responsive-grid-products">
                    {[1, 2, 3, 4].map(i => (
                        <div
                            key={i}
                            style={{
                                height: '280px',
                                borderRadius: '22px',
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(255, 255, 255, 0.06)',
                                animation: 'pulse 1.5s infinite',
                            }}
                        />
                    ))}
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: '20px',
                    position: 'relative',
                    zIndex: 1,
                }}>
                    {bestSellers.map((product, idx) => {
                        const img = formatImageUrl(product.image_url || product.image);
                        const tiers = product.tiers || product.active_tiers || [];
                        let minPrice = null;
                        if (tiers.length > 0) {
                            const prices = tiers.map(t => Number(t.final_price || t.price_egp || t.price || 0)).filter(p => p > 0);
                            if (prices.length > 0) minPrice = Math.min(...prices);
                        }

                        const rankColors = [
                            { badge: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', text: '#000', label: 'الأعلى طلباً' },
                            { badge: 'linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 100%)', text: '#1E1B4B', label: '#2 الأكثر مبيعاً' },
                            { badge: 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 100%)', text: '#451A03', label: '#3 الأكثر مبيعاً' },
                        ];
                        const rankInfo = rankColors[idx] || { badge: 'rgba(255, 255, 255, 0.12)', text: '#FFF', label: `#${idx + 1} رائج` };

                        return (
                            <Link
                                key={product.id}
                                to={`/products/${product.id}`}
                                style={{
                                    textDecoration: 'none',
                                    background: 'linear-gradient(145deg, rgba(30, 30, 42, 0.9) 0%, rgba(18, 18, 26, 0.95) 100%)',
                                    border: '1px solid rgba(212, 165, 55, 0.25)',
                                    borderRadius: '22px',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
                                    position: 'relative',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-6px)';
                                    e.currentTarget.style.borderColor = '#D4A537';
                                    e.currentTarget.style.boxShadow = '0 16px 35px rgba(212, 165, 55, 0.18)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = 'rgba(212, 165, 55, 0.25)';
                                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                                }}
                            >
                                {/* Ranking Badge */}
                                <div style={{
                                    position: 'absolute',
                                    top: '12px',
                                    right: '12px',
                                    zIndex: 2,
                                    background: rankInfo.badge,
                                    color: rankInfo.text,
                                    padding: '4px 10px',
                                    borderRadius: '12px',
                                    fontSize: '11px',
                                    fontWeight: '900',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                }}>
                                    {idx === 0 ? <Trophy size={12} /> : <Star size={12} />}
                                    <span>{rankInfo.label}</span>
                                </div>

                                {/* Instant Delivery Chip */}
                                <div style={{
                                    position: 'absolute',
                                    top: '12px',
                                    left: '12px',
                                    zIndex: 2,
                                    background: 'rgba(34, 197, 94, 0.2)',
                                    border: '1px solid rgba(34, 197, 94, 0.4)',
                                    color: '#4ADE80',
                                    padding: '3px 8px',
                                    borderRadius: '10px',
                                    fontSize: '10.5px',
                                    fontWeight: '800',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '3px',
                                    backdropFilter: 'blur(6px)',
                                }}>
                                    <Zap size={11} />
                                    <span>فوري</span>
                                </div>

                                {/* Product Image Area */}
                                <div style={{
                                    height: '160px',
                                    width: '100%',
                                    position: 'relative',
                                    background: 'linear-gradient(180deg, #181824 0%, #0D0D14 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                }}>
                                    {img ? (
                                        <img
                                            src={img}
                                            alt={product.name}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                transition: 'transform 0.4s ease',
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                if (e.currentTarget.nextSibling) {
                                                    e.currentTarget.nextSibling.style.display = 'flex';
                                                }
                                            }}
                                        />
                                    ) : null}
                                    <div style={{
                                        display: img ? 'none' : 'flex',
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '16px',
                                        background: 'rgba(212, 165, 55, 0.1)',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#D4A537',
                                    }}>
                                        <Package size={30} />
                                    </div>

                                    {/* Bottom gradient fade */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        height: '40%',
                                        background: 'linear-gradient(transparent, rgba(18, 18, 26, 0.95))',
                                    }} />
                                </div>

                                {/* Card Body */}
                                <div style={{
                                    padding: '16px 18px 18px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flex: 1,
                                    justifyContent: 'space-between',
                                    gap: '12px',
                                }}>
                                    <div>
                                        {product.category_name && (
                                            <span style={{
                                                fontSize: '11px',
                                                fontWeight: '800',
                                                color: 'var(--gold-400)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                            }}>
                                                {product.category_name}
                                            </span>
                                        )}
                                        <h3 style={{
                                            margin: '4px 0 0',
                                            fontSize: '16px',
                                            fontWeight: '800',
                                            color: '#FFFFFF',
                                            lineHeight: '1.3',
                                        }}>
                                            {product.name}
                                        </h3>
                                    </div>

                                    {/* Price & Action Button */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        paddingTop: '10px',
                                        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                                    }}>
                                        <div>
                                            <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block' }}>
                                                {minPrice ? 'السعر يبدأ من' : 'الشحن المباشر'}
                                            </span>
                                            <span style={{
                                                fontSize: '15px',
                                                fontWeight: '900',
                                                color: '#D4A537',
                                            }}>
                                                {minPrice ? `${minPrice} ج.م` : 'شحن فوري'}
                                            </span>
                                        </div>

                                        <div style={{
                                            padding: '8px 14px',
                                            borderRadius: '12px',
                                            background: 'linear-gradient(135deg, #D4A537 0%, #AA7C11 100%)',
                                            color: '#000000',
                                            fontSize: '12px',
                                            fontWeight: '900',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            boxShadow: '0 4px 12px rgba(212, 165, 55, 0.3)',
                                        }}>
                                            <span>شحن</span>
                                            <ArrowUpRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </section>
    );
}
