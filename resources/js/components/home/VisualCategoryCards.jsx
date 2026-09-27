import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Smartphone, Gamepad2, Zap, Tv, Layers, Target, TrendingUp } from 'lucide-react';
import { catalogApi } from '../../api/endpoints';
import { useLanguage } from '../../contexts/LanguageContext';

export default function VisualCategoryCards() {
    const { isRtl } = useLanguage();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Target Selling Featured Category Card
    const targetCategoryCard = {
        id: 'target-sell',
        slug: 'target-sell',
        customLink: '/target/apps',
        name: 'بيع واستبدال التارجت',
        icon_url: '/images/artwork/cat_target.jpg',
        badge: 'كاش فوري 50 EGP / $',
        btnText: 'سحب التارجت الآن',
        isTarget: true,
    };

    // Standard Fallback Categories
    const fallbackCategories = [
        targetCategoryCard,
        {
            id: 'apps',
            slug: 'apps',
            name: 'تطبيقات البث والشات',
            icon_url: '/images/artwork/cat_apps.jpg',
            badge: 'شحن مباشر معتمد',
            btnText: 'تصفح التطبيقات والأسعار',
            icon: Smartphone,
        },
        {
            id: 'games',
            slug: 'games',
            name: 'الألعاب والبطاقات الرقمية',
            icon_url: '/images/artwork/cat_games.jpg',
            badge: 'تسليم فوري مباشر',
            btnText: 'تصفح الألعاب والبطاقات',
            icon: Gamepad2,
        },
        {
            id: 'telecom',
            slug: 'telecom',
            name: 'كروت الشحن والاتصالات',
            icon_url: null,
            badge: 'فواتير وباقات',
            btnText: 'تصفح كروت الشحن',
            icon: Zap,
        },
        {
            id: 'tv',
            slug: 'tv-subscriptions',
            name: 'اشتراكات البث والترفيه',
            icon_url: null,
            badge: 'اشتراكات رسمية',
            btnText: 'تصفح الاشتراكات',
            icon: Tv,
        },
    ];

    useEffect(() => {
        catalogApi.getCategories()
            .then(res => {
                const data = Array.isArray(res?.data) ? res.data : res?.data?.data;
                if (data && data.length > 0) {
                    // Prepend Target Selling category so it's always visible with categories
                    const hasTarget = data.some(c => c.slug === 'target' || c.slug === 'target-apps' || c.isTarget);
                    if (!hasTarget) {
                        setCategories([targetCategoryCard, ...data]);
                    } else {
                        setCategories(data);
                    }
                } else {
                    setCategories(fallbackCategories);
                }
            })
            .catch(() => {
                setCategories(fallbackCategories);
            })
            .finally(() => setLoading(false));
    }, []);

    const displayCategories = categories.length > 0 ? categories : fallbackCategories;

    return (
        <div style={{ marginBottom: '40px' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '18px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        width: '4px',
                        height: '20px',
                        background: 'linear-gradient(180deg, #F5D061 0%, #D4A537 100%)',
                        borderRadius: '4px',
                    }} />
                    <h2 style={{
                        margin: 0,
                        fontSize: '20px',
                        fontWeight: '900',
                        color: '#FFFFFF',
                        letterSpacing: '-0.3px',
                    }}>
                        أقسام المتجر والخدمات الرقمية
                    </h2>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
                gap: '16px',
            }}>
                {displayCategories.map((cat, i) => (
                    <CategoryCard key={cat.id || i} cat={cat} isRtl={isRtl} index={i} />
                ))}
            </div>
        </div>
    );
}

function CategoryCard({ cat, isRtl, index }) {
    const [hovered, setHovered] = useState(false);

    const rawImg = cat.banner_url || cat.icon_url || cat.artwork;
    const imageUrl = rawImg && typeof rawImg === 'string' && rawImg.includes('/storage/')
        ? ('/storage/' + rawImg.split('/storage/')[1])
        : rawImg;
    const categoryLink = cat.customLink || `/category/${cat.slug || cat.id}`;

    return (
        <Link
            to={categoryLink}
            style={{
                textDecoration: 'none',
                position: 'relative',
                borderRadius: '22px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                border: `1px solid ${hovered || cat.isTarget ? '#D4A537' : 'rgba(255, 255, 255, 0.08)'}`,
                boxShadow: hovered
                    ? '0 12px 35px rgba(0,0,0,0.8), 0 0 25px rgba(212,165,55,0.2)'
                    : cat.isTarget
                    ? '0 8px 30px rgba(0,0,0,0.7), 0 0 15px rgba(212,165,55,0.1)'
                    : '0 6px 20px rgba(0,0,0,0.5)',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
                minHeight: '260px',
                background: '#0B0B0F',
            }}
            className={`emperor-entrance emperor-entrance-delay-${(index % 4) + 1}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* ── Top Image Area ── */}
            <div style={{
                position: 'relative',
                height: '160px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(145deg, #12121A 0%, #08080C 100%)',
            }}>
                {imageUrl ? (
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        background: 'radial-gradient(circle, rgba(212,165,55,0.12) 0%, rgba(10,10,14,0.95) 75%)',
                    }}>
                        {/* Ambient Blurred Colored Halo */}
                        <img
                            src={imageUrl}
                            alt=""
                            aria-hidden="true"
                            style={{
                                position: 'absolute',
                                inset: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                filter: 'blur(22px) brightness(0.25)',
                                opacity: 0.6,
                                transform: 'scale(1.2)',
                            }}
                        />

                        {/* Sharp Uncropped Foreground Image/Icon */}
                        <img
                            src={imageUrl}
                            alt={cat.name || cat.title}
                            style={{
                                position: 'relative',
                                zIndex: 2,
                                maxWidth: '78%',
                                maxHeight: '78%',
                                width: 'auto',
                                height: 'auto',
                                objectFit: 'contain',
                                borderRadius: '16px',
                                filter: 'drop-shadow(0 10px 22px rgba(0,0,0,0.7))',
                                transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                                transform: hovered ? 'scale(1.1) translateY(-3px)' : 'scale(1)',
                            }}
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                    </div>
                ) : (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        position: 'relative',
                        zIndex: 1,
                    }}>
                        <div style={{
                            width: '72px',
                            height: '72px',
                            borderRadius: '20px',
                            background: 'linear-gradient(135deg, rgba(212,165,55,0.15) 0%, rgba(212,165,55,0.05) 100%)',
                            border: '1.5px solid rgba(212,165,55,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#F5D061',
                            transition: 'all 0.35s ease',
                            transform: hovered ? 'scale(1.1) rotate(-3deg)' : 'scale(1) rotate(0deg)',
                            boxShadow: hovered ? '0 0 20px rgba(212,165,55,0.3)' : 'none',
                        }}>
                            {cat.isTarget ? <TrendingUp size={34} /> : <Layers size={32} />}
                        </div>
                    </div>
                )}

                {/* Gradient overlay at bottom */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '60px',
                    background: 'linear-gradient(transparent, #0B0B0F)',
                    pointerEvents: 'none',
                }} />

                {/* Badge */}
                <div style={{
                    position: 'absolute',
                    top: '12px',
                    [isRtl ? 'right' : 'left']: '12px',
                    background: cat.isTarget ? 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)' : 'rgba(0, 0, 0, 0.75)',
                    color: cat.isTarget ? '#000000' : '#F5D061',
                    border: `1px solid ${cat.isTarget ? '#D4A537' : 'rgba(212, 165, 55, 0.4)'}`,
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '11.5px',
                    fontWeight: '900',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(6px)',
                }}>
                    {cat.badge || (cat.products_count ? `${cat.products_count} منتج` : 'شحن مباشر')}
                </div>
            </div>

            {/* ── Bottom Content ── */}
            <div style={{
                padding: '16px 18px 18px',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'space-between',
            }}>
                {/* Category Name */}
                <h3 style={{
                    margin: '0 0 10px',
                    fontSize: '17px',
                    fontWeight: '900',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}>
                    {cat.isTarget ? (
                        <TrendingUp size={18} color="#F5D061" />
                    ) : (
                        <Layers size={18} color="#D4A537" />
                    )}
                    <span>{cat.name || cat.title}</span>
                </h3>

                {/* Enter Button */}
                <div style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    background: cat.isTarget
                        ? 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)'
                        : hovered
                        ? 'rgba(212, 165, 55, 0.15)'
                        : 'rgba(212, 165, 55, 0.05)',
                    border: `1px solid ${cat.isTarget ? '#D4A537' : hovered ? '#D4A537' : 'rgba(212, 165, 55, 0.2)'}`,
                    color: cat.isTarget ? '#000000' : '#F5D061',
                    fontSize: '13px',
                    fontWeight: '900',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.3s ease',
                }}>
                    <span>{cat.btnText || 'تصفح الباقات والأسعار'}</span>
                    {isRtl ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
                </div>
            </div>
        </Link>
    );
}
