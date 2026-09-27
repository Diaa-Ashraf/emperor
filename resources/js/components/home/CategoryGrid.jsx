import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Gift, DollarSign, Layers, Smartphone, Sparkles, ChevronLeft, Tv } from 'lucide-react';

export default function CategoryGrid({ categories = [], loading = false }) {
    // Fallback default categories with icons & themes
    const defaultCategories = [
        {
            id: 'c1',
            name: 'ألعاب الموبايل والكمبيوتر',
            slug: 'games',
            description: 'ببجي موبايل، فري فاير، فالورانت، روبلوكس، كول أوف ديوتي',
            icon: Gamepad2,
            products_count: 18,
            gradient: 'linear-gradient(135deg, rgba(234, 179, 8, 0.15) 0%, rgba(168, 85, 247, 0.1) 100%)',
            border: 'rgba(234, 179, 8, 0.3)',
        },
        {
            id: 'c2',
            name: 'بيع واستبدال التارجت',
            slug: 'target-selling',
            description: 'تيك توك، بيجو لايف، لايكي، تانجو، سولشيل بأعلى أسعار كاش',
            icon: DollarSign,
            products_count: 8,
            gradient: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(37, 99, 235, 0.1) 100%)',
            border: 'rgba(56, 189, 248, 0.3)',
            is_target: true,
        },
        {
            id: 'c3',
            name: 'بطاقات الهدايا الرقمية',
            slug: 'gift-cards',
            description: 'آبل ستور، جوجل بلاي، بلايستيشن، إكس بوكس، ستيم',
            icon: Gift,
            products_count: 14,
            gradient: 'linear-gradient(135deg, rgba(244, 63, 94, 0.15) 0%, rgba(225, 29, 72, 0.1) 100%)',
            border: 'rgba(244, 63, 94, 0.3)',
        },
        {
            id: 'c4',
            name: 'اشتراكات وخدمات البث',
            slug: 'subscriptions',
            description: 'شاهد VIP، نتفليكس، يوتيوب بريميوم، سبوتيفاي، ديسكورد نايترو',
            icon: Tv,
            products_count: 10,
            gradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%)',
            border: 'rgba(34, 197, 94, 0.3)',
        },
    ];

    const displayList = categories.length > 0 ? categories : defaultCategories;

    if (loading) {
        return (
            <div style={{ marginBottom: '40px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))',
                    gap: '16px',
                }}>
                    {[1, 2, 3, 4].map(i => (
                        <div
                            key={i}
                            style={{
                                height: '140px',
                                background: '#161620',
                                borderRadius: '18px',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                animation: 'pulse 1.5s infinite',
                            }}
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div style={{ marginBottom: '48px' }}>
            {/* Section Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: '8px',
                        height: '24px',
                        borderRadius: '4px',
                        background: 'linear-gradient(180deg, #F3E5AB 0%, #D4A537 100%)',
                    }} />
                    <h3 style={{
                        margin: 0,
                        fontSize: '20px',
                        fontWeight: '800',
                        color: '#FFFFFF',
                    }}>
                        الأقسام والخدمات الرئيسية
                    </h3>
                </div>

                <span style={{ fontSize: '13px', color: '#9E9EA8' }}>
                    اختر القسم لشحن ألعابك فوراً
                </span>
            </div>

            {/* Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))',
                gap: '18px',
            }}>
                {displayList.map((cat) => {
                    const destination = cat.slug === 'target-selling' || cat.is_target
                        ? '/target/sell'
                        : `/category/${cat.slug || cat.id}`;

                    return (
                        <Link
                            key={cat.id}
                            to={destination}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                background: cat.gradient || 'linear-gradient(135deg, rgba(26, 26, 36, 0.9) 0%, rgba(18, 18, 26, 0.95) 100%)',
                                border: `1px solid ${cat.border || 'rgba(212, 165, 55, 0.2)'}`,
                                borderRadius: '20px',
                                padding: '22px 20px',
                                textDecoration: 'none',
                                transition: 'all 0.25s ease',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.35)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.borderColor = '#D4A537';
                                e.currentTarget.style.boxShadow = '0 12px 35px rgba(212, 165, 55, 0.25)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = cat.border || 'rgba(212, 165, 55, 0.2)';
                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.35)';
                            }}
                        >
                            {/* Top row: Icon & Count */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                                <div style={{
                                    fontSize: '32px',
                                    width: '54px',
                                    height: '54px',
                                    borderRadius: '14px',
                                    background: 'rgba(0, 0, 0, 0.4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                }}>
                                    {typeof cat.icon === 'function' ? (
                                        React.createElement(cat.icon, { size: 26, color: '#F5D061' })
                                    ) : cat.icon_url ? (
                                        <img src={cat.icon_url} alt="" style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
                                    ) : (
                                        <Layers size={26} color="#F5D061" />
                                    )}
                                </div>

                                {cat.products_count !== undefined && (
                                    <span style={{
                                        fontSize: '12px',
                                        fontWeight: '700',
                                        color: '#D4A537',
                                        background: 'rgba(212, 165, 55, 0.12)',
                                        border: '1px solid rgba(212, 165, 55, 0.25)',
                                        padding: '3px 10px',
                                        borderRadius: '12px',
                                    }}>
                                        {cat.products_count} منتج
                                    </span>
                                )}
                            </div>

                            {/* Middle: Title & Description */}
                            <div>
                                <h4 style={{
                                    margin: '0 0 6px',
                                    fontSize: '17px',
                                    fontWeight: '800',
                                    color: '#FFFFFF',
                                }}>
                                    {cat.name}
                                </h4>
                                <p style={{
                                    margin: 0,
                                    fontSize: '13px',
                                    color: '#9E9EA8',
                                    lineHeight: '1.4',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                }}>
                                    {cat.description || 'شحن فوري وبأفضل سعر للمستخدمين والتجار'}
                                </p>
                            </div>

                            {/* Bottom: Arrow link */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                gap: '4px',
                                marginTop: '16px',
                                color: '#D4A537',
                                fontSize: '13px',
                                fontWeight: '700',
                            }}>
                                <span>تصفح المنتجات</span>
                                <ChevronLeft size={16} />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
