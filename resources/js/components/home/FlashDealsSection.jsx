import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Clock, ShoppingCart, Zap, Sparkles, ChevronLeft, ChevronRight, Package } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { bannersApi } from '../../api/endpoints';

export default function FlashDealsSection() {
    const { isRtl } = useLanguage();

    const defaultFlashDeals = [
        {
            id: 'fd-pubg-660',
            title: '660 شدة ببجي موبايل (600+60 UC)',
            badge: 'خصم 20%',
            category: 'ألعاب',
            oldPrice: 340.0,
            salePrice: 279.0,
            image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=80',
            claimedPercent: 84,
            remainingItems: 8,
            link: '/products/1',
        },
        {
            id: 'fd-freefire-1080',
            title: '1080 + 108 جوهرة فري فاير',
            badge: 'خصم 25%',
            category: 'ألعاب',
            oldPrice: 260.0,
            salePrice: 199.0,
            image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&auto=format&fit=crop&q=80',
            claimedPercent: 91,
            remainingItems: 4,
            link: '/products/2',
        },
        {
            id: 'fd-yomi-25k',
            title: 'ايومي شات باقة كوينز VIP 25,000',
            badge: 'سعر ترويجي',
            category: 'تطبيقات',
            oldPrice: 280.0,
            salePrice: 230.0,
            claimedPercent: 76,
            remainingItems: 12,
            link: '/products/3',
        },
        {
            id: 'fd-target-mego',
            title: 'بونص تسييل تارجت ميجو لايف (+5% كاش)',
            badge: 'بونص خاص',
            category: 'تارجت',
            oldPrice: 1000.0,
            salePrice: 1050.0,
            claimedPercent: 88,
            remainingItems: 6,
            link: '/target/apps',
        },
    ];

    const [deals, setDeals] = useState([]);
    const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 18 });

    useEffect(() => {
        bannersApi.getDeals()
            .then(res => {
                if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
                    const loaded = res.data.map((item, idx) => {
                        const oldP = item.old_price !== null && item.old_price !== undefined ? Number(item.old_price) : (item.oldPrice ? Number(item.oldPrice) : null);
                        const saleP = item.sale_price !== null && item.sale_price !== undefined ? Number(item.sale_price) : (item.salePrice ? Number(item.salePrice) : null);
                        let autoBadge = item.discount_badge || item.subtitle;
                        if (!autoBadge && oldP && saleP && oldP > saleP) {
                            autoBadge = `خصم ${Math.round(((oldP - saleP) / oldP) * 100)}%`;
                        }

                        return {
                            id: item.id,
                            title: item.title,
                            badge: autoBadge || 'عرض خاص',
                            category: 'عروض حصرية',
                            oldPrice: oldP,
                            salePrice: saleP,
                            image: item.image_url || '/images/banner_gaming.jpg',
                            claimedPercent: item.claimed_percent || (78 + ((idx * 6) % 18)),
                            remainingItems: item.remaining_items || (3 + ((idx * 4) % 10)),
                            link: item.link || '/category/games',
                            ends_at: item.ends_at,
                        };
                    });
                    setDeals(loaded);

                    // Compute countdown from ends_at if available
                    const withEnd = loaded.find(d => d.ends_at);
                    if (withEnd) {
                        const targetMs = new Date(withEnd.ends_at).getTime();
                        const nowMs = Date.now();
                        const diffSec = Math.max(0, Math.floor((targetMs - nowMs) / 1000));
                        setTimeLeft({
                            hours: Math.floor(diffSec / 3600),
                            minutes: Math.floor((diffSec % 3600) / 60),
                            seconds: diffSec % 60,
                        });
                    }
                } else {
                    setDeals(defaultFlashDeals);
                }
            })
            .catch(() => {
                setDeals(defaultFlashDeals);
            });
    }, []);

    // Live countdown ticker
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
                if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return { hours: 23, minutes: 59, seconds: 59 };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const activeDeals = deals.length > 0 ? deals : defaultFlashDeals;
    const formatNumber = (num) => String(num).padStart(2, '0');

    return (
        <div className="emperor-entrance" style={{ marginBottom: '52px' }}>
            {/* Header with Title & Live Timer */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                marginBottom: '24px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: 'rgba(239, 68, 68, 0.12)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Flame size={24} color="#EF4444" />
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <h2 style={{
                                margin: 0,
                                fontSize: 'clamp(18px, 3vw, 24px)',
                                fontWeight: '900',
                                color: 'var(--text-primary)',
                            }}>
                                العروض والتخفيضات الخاصة
                            </h2>
                            <span style={{
                                background: 'rgba(239, 68, 68, 0.2)',
                                color: '#EF4444',
                                fontSize: '11px',
                                fontWeight: '900',
                                padding: '2px 8px',
                                borderRadius: '9999px',
                            }}>
                                لفترة محدودة
                            </span>
                        </div>
                        <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                            أسعار استثنائية تنتهي بمجرد اكتمال حجز الكمية
                        </p>
                    </div>
                </div>

                {/* Countdown Timer */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-medium)',
                    padding: '8px 16px',
                    borderRadius: '16px',
                    boxShadow: 'var(--shadow-sm)',
                }}>
                    <Clock size={16} color="var(--gold-400)" />
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700' }}>
                        ينتهي العرض خلال:
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', direction: 'ltr' }}>
                        <span className="time-pill">{formatNumber(timeLeft.hours)}</span>
                        <span style={{ fontWeight: '900', color: 'var(--gold-400)' }}>:</span>
                        <span className="time-pill">{formatNumber(timeLeft.minutes)}</span>
                        <span style={{ fontWeight: '900', color: 'var(--gold-400)' }}>:</span>
                        <span className="time-pill">{formatNumber(timeLeft.seconds)}</span>
                    </div>
                </div>
            </div>

            {/* Flash Deals Cards Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 230px), 1fr))',
                gap: '16px',
            }}>
                {activeDeals.map((deal) => (
                    <div
                        key={deal.id}
                        className="emperor-card"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '16px',
                            borderRadius: '22px',
                            border: '1px solid var(--border-subtle)',
                            background: 'var(--card-gradient)',
                            position: 'relative',
                        }}
                    >
                        {/* Discount Badge */}
                        <div style={{
                            position: 'absolute',
                            top: '12px',
                            [isRtl ? 'right' : 'left']: '12px',
                            background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                            color: '#FFFFFF',
                            fontSize: '11px',
                            fontWeight: '900',
                            padding: '3px 9px',
                            borderRadius: '9999px',
                            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
                            zIndex: 2,
                        }}>
                            {deal.badge}
                        </div>

                        {/* Image / Icon Preview */}
                        <div style={{
                            height: '140px',
                            borderRadius: '16px',
                            background: 'var(--bg-surface)',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '14px',
                            position: 'relative',
                        }}>
                            {deal.image ? (
                                <img
                                    src={deal.image}
                                    alt={deal.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                <Package size={44} color="#D4A537" />
                            )}
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: '40%',
                                background: 'linear-gradient(transparent, rgba(17,17,24,0.9))',
                            }} />
                        </div>

                        {/* Title */}
                        <h3 style={{
                            fontSize: '14px',
                            fontWeight: '800',
                            color: 'var(--text-primary)',
                            marginBottom: '10px',
                            lineHeight: '1.4',
                            minHeight: '40px',
                        }}>
                            {deal.title}
                        </h3>

                        {/* Prices */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: '8px',
                            marginBottom: '12px',
                        }}>
                            {deal.salePrice ? (
                                <>
                                    <span style={{
                                        fontSize: '18px',
                                        fontWeight: '900',
                                        color: 'var(--gold-400)',
                                    }}>
                                        {Number(deal.salePrice).toFixed(2)} ج.م
                                    </span>
                                    {deal.oldPrice && (
                                        <span style={{
                                            fontSize: '12px',
                                            color: 'var(--text-muted)',
                                            textDecoration: 'line-through',
                                            fontWeight: '600',
                                        }}>
                                            {Number(deal.oldPrice).toFixed(2)} ج.م
                                        </span>
                                    )}
                                </>
                            ) : (
                                <span style={{
                                    fontSize: '14px',
                                    fontWeight: '800',
                                    color: 'var(--gold-300)',
                                }}>
                                    {deal.badge || 'عرض ترويجي خاص'}
                                </span>
                            )}
                        </div>

                        {/* Progress Bar (Claimed items) */}
                        <div style={{ marginBottom: '14px' }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '11px',
                                fontWeight: '700',
                                marginBottom: '4px',
                            }}>
                                <span style={{ color: 'var(--text-secondary)' }}>تم حجز {deal.claimedPercent}%</span>
                                <span style={{ color: '#EF4444' }}>باقي {deal.remainingItems} قطع</span>
                            </div>
                            <div style={{
                                width: '100%',
                                height: '6px',
                                borderRadius: '9999px',
                                background: 'rgba(255, 255, 255, 0.08)',
                                overflow: 'hidden',
                            }}>
                                <div style={{
                                    width: `${deal.claimedPercent}%`,
                                    height: '100%',
                                    borderRadius: '9999px',
                                    background: 'linear-gradient(90deg, #D4A537 0%, #EF4444 100%)',
                                }} />
                            </div>
                        </div>

                        {/* Action Link */}
                        <Link
                            to={deal.link}
                            className="emperor-btn-primary"
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '12px',
                                fontSize: '13px',
                                marginTop: 'auto',
                            }}
                        >
                            <Zap size={15} />
                            <span>احجز العرض فوراً</span>
                        </Link>
                    </div>
                ))}
            </div>

            <style>{`
                .time-pill {
                    background: rgba(212, 165, 55, 0.15);
                    border: 1px solid var(--border-medium);
                    color: var(--gold-200);
                    font-weight: 800;
                    font-size: 13px;
                    padding: 2px 7px;
                    borderRadius: 6px;
                    font-family: monospace;
                }
            `}</style>
        </div>
    );
}
