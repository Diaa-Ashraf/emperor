import React, { useState } from 'react';
import { Crown, Sparkles, ShieldCheck, Zap, Award, Percent, Headphones, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';

export default function VipTierShowcase() {
    const { isRtl } = useLanguage();

    const tiers = [
        {
            id: 'bronze',
            name: 'رتبة البداية (Bronze)',
            title: 'المستخدم الملكي',
            icon: ShieldCheck,
            badge: 'افتراضي للجميع',
            discount: 'أسعار تجزئة مخفضة',
            features: [
                'تسليم فوري وشحن خلال 30 ثانية',
                'نقاط ولاء ومكافآت مع كل طلب',
                'دعم فني فوري عبر المحادثة',
            ],
            accent: '#A0A0B0',
            border: 'rgba(255, 255, 255, 0.1)',
        },
        {
            id: 'silver',
            name: 'رتبة الفضة (Silver)',
            title: 'تاجر نشط',
            icon: Zap,
            badge: 'مبيعات +15,000 ج.م',
            discount: 'خصم 2.5% إضافي',
            features: [
                'خصم إضافي على جميع كروت الألعاب',
                'أولوية قصوى في مراجعة وصرف التارجت',
                'مكافآت إحالة مضاعفة 1.5x',
            ],
            accent: '#E2E8F0',
            border: 'rgba(226, 232, 240, 0.3)',
        },
        {
            id: 'gold',
            name: 'رتبة الذهب (Gold)',
            title: 'وكيل معتمد',
            icon: Award,
            badge: 'مبيعات +50,000 ج.م',
            discount: 'خصم 5% جملة',
            features: [
                'أسعار جملة مباشرة للموزعين',
                'ربط برمجي مجاني (API Integration)',
                'مدير حساب خاص على واتساب 24/7',
                'سحب فوري بدون رسوم تحويل',
            ],
            accent: 'var(--gold-300)',
            border: 'var(--gold-400)',
            popular: true,
        },
        {
            id: 'emperor',
            name: 'تاج الإمبراطور (Emperor VIP)',
            title: 'شريك استراتيجي',
            icon: Crown,
            badge: 'موزع رئيسي ومتاجر كبرى',
            discount: 'أسعار التكلفة المباشرة',
            features: [
                'أعلى هامش ربح وتوريد مباشر من المصدر',
                'أولوية سحب تارجت غير محدودة لحظياً',
                'API مخصص مع سيرفرات فائقة السرعة',
                'عقود فواتير رسمية ودعم فني خاص',
            ],
            accent: '#F5D061',
            border: 'rgba(212, 165, 55, 0.8)',
            isEmperor: true,
        },
    ];

    const [activeTierId, setActiveTierId] = useState('gold');

    return (
        <div className="emperor-entrance" style={{ marginBottom: '56px' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px' }}>
                <div className="emperor-badge" style={{ margin: '0 auto 12px' }}>
                    <Crown size={13} color="var(--gold-400)" />
                    <span>منظومة الرتب والمكافآت الحصرية</span>
                </div>
                <h2 style={{
                    fontSize: 'clamp(22px, 3.5vw, 30px)',
                    fontWeight: '900',
                    color: 'var(--text-primary)',
                    marginBottom: '10px',
                }}>
                    ارتقِ برتبتك الملكية وضاعف أرباحك
                </h2>
                <p style={{
                    fontSize: '13.5px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.7',
                    margin: 0,
                }}>
                    كلما زادت عمليات الشحن وتداول التارجت عبر حسابك، ارتقيت إلى مستويات ملكية أعلى تمنحك خصومات جملة وخدمات حصرية.
                </p>
            </div>

            {/* Tiers Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
                gap: '20px',
            }}>
                {tiers.map((tier) => {
                    const isSelected = tier.id === activeTierId;
                    return (
                        <div
                            key={tier.id}
                            onClick={() => setActiveTierId(tier.id)}
                            style={{
                                background: tier.isEmperor
                                    ? 'linear-gradient(145deg, #1C1910 0%, #12100A 100%)'
                                    : 'var(--card-gradient)',
                                border: `1.5px solid ${tier.border}`,
                                borderRadius: '24px',
                                padding: '26px 20px',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                transform: isSelected ? 'translateY(-6px)' : 'none',
                                boxShadow: isSelected
                                    ? '0 16px 40px rgba(0,0,0,0.6), var(--shadow-gold-md)'
                                    : 'var(--shadow-sm)',
                            }}
                        >
                            {/* Popular/Emperor Badge */}
                            {(tier.popular || tier.isEmperor) && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-10px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    background: 'var(--gold-metallic)',
                                    color: '#050507',
                                    fontSize: '10px',
                                    fontWeight: '900',
                                    padding: '3px 12px',
                                    borderRadius: '9999px',
                                    boxShadow: '0 4px 12px rgba(212, 165, 55, 0.4)',
                                    whiteSpace: 'nowrap',
                                }}>
                                    {tier.isEmperor ? 'الرتبة الأقوى في المنصة' : 'الرتبة الأكثر شعبية للوكلاء'}
                                </span>
                            )}

                            {/* Top info */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                                <tier.icon size={26} color={tier.accent} />
                                <div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700' }}>
                                        {tier.name}
                                    </div>
                                    <div style={{ fontSize: '16px', fontWeight: '900', color: tier.accent }}>
                                        {tier.title}
                                    </div>
                                </div>
                            </div>

                            {/* Requirement tag */}
                            <div style={{
                                background: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid var(--border-subtle)',
                                padding: '6px 10px',
                                borderRadius: '10px',
                                fontSize: '11.5px',
                                fontWeight: '700',
                                color: 'var(--text-secondary)',
                                marginBottom: '16px',
                                textAlign: 'center',
                            }}>
                                الشرط: <strong style={{ color: 'var(--gold-200)' }}>{tier.badge}</strong>
                            </div>

                            {/* Discount highlight */}
                            <div style={{
                                background: 'rgba(212, 165, 55, 0.1)',
                                border: '1px solid var(--border-medium)',
                                padding: '10px',
                                borderRadius: '12px',
                                textAlign: 'center',
                                marginBottom: '18px',
                            }}>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700' }}>
                                    ميزة التسعير:
                                </div>
                                <div style={{ fontSize: '15px', fontWeight: '900', color: 'var(--gold-300)' }}>
                                    {tier.discount}
                                </div>
                            </div>

                            {/* Features List */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '22px', flex: 1 }}>
                                {tier.features.map((feat, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                                        <Sparkles size={13} color="var(--gold-400)" style={{ flexShrink: 0 }} />
                                        <span>{feat}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Action */}
                            <Link
                                to="/deposit"
                                className={tier.isEmperor || tier.popular ? 'emperor-btn-primary' : 'emperor-btn-ghost'}
                                style={{
                                    width: '100%',
                                    padding: '11px',
                                    borderRadius: '12px',
                                    fontSize: '13px',
                                    textAlign: 'center',
                                }}
                            >
                                <span>ترقية حسابي للرتبة</span>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
