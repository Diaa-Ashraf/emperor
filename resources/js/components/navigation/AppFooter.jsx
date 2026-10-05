import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ShieldCheck,
    Zap,
    Headphones,
    MessageCircle,
    Layers,
    ChevronLeft,
    PhoneCall,
    ExternalLink,
    CreditCard
} from 'lucide-react';
import { catalogApi, depositsApi, supportApi } from '../../api/endpoints';
import { useTheme } from '../../contexts/ThemeContext';

export default function AppFooter() {
    const { theme } = useTheme();
    const isLight = theme === 'light';

    const [categories, setCategories] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [supportContacts, setSupportContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadFooterData = async () => {
            try {
                const [catsRes, methodsRes, supportRes] = await Promise.allSettled([
                    catalogApi.getCategories(),
                    depositsApi.getMethods(),
                    supportApi.getSupportContacts(),
                ]);

                if (!isMounted) return;

                if (catsRes.status === 'fulfilled' && catsRes.value?.data?.data) {
                    const rawCats = Array.isArray(catsRes.value.data.data) ? catsRes.value.data.data : [];
                    setCategories(rawCats);
                }

                if (methodsRes.status === 'fulfilled' && methodsRes.value?.data?.data) {
                    const rawMethods = Array.isArray(methodsRes.value.data.data) ? methodsRes.value.data.data : [];
                    setPaymentMethods(rawMethods);
                }

                if (supportRes.status === 'fulfilled' && supportRes.value?.data?.data) {
                    const rawSupport = Array.isArray(supportRes.value.data.data) ? supportRes.value.data.data : [];
                    setSupportContacts(rawSupport);
                }
            } catch (err) {
                console.error('Error fetching footer data:', err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadFooterData();

        return () => {
            isMounted = false;
        };
    }, []);

    // Fallback categories if database has none or during initial hydration
    const displayCategories = categories.length > 0 ? categories : [
        { id: 1, name: 'شحن الألعاب والبطاقات', slug: 'games', products_count: null },
        { id: 2, name: 'تطبيقات البث والشات', slug: 'apps', products_count: null },
        { id: 3, name: 'بطاقات الهدايا والتسوق', slug: 'gift-cards', products_count: null },
    ];

    // Fallback payment methods if database has none
    const displayPaymentMethods = paymentMethods.length > 0 ? paymentMethods : [
        { id: 1, name: 'Vodafone Cash', code: 'vodafone_cash' },
        { id: 2, name: 'InstaPay Egypt', code: 'instapay' },
        { id: 3, name: 'Orange Cash', code: 'orange_cash' },
        { id: 4, name: 'Etisalat Cash', code: 'etisalat_cash' },
        { id: 5, name: 'USDT TRC20', code: 'usdt_trc20' },
        { id: 6, name: 'Binance Pay', code: 'binance_pay' },
        { id: 7, name: 'تحويل بنكي', code: 'bank_transfer' },
    ];

    return (
        <footer style={{
            backgroundColor: isLight ? '#f1f7fc' : '#0A0A0F',
            borderTop: isLight ? '1px solid rgba(212, 165, 55, 0.35)' : '1px solid rgba(212, 165, 55, 0.2)',
            padding: '48px 20px 88px',
            marginTop: 'auto',
            transition: 'background-color 0.3s ease, border-color 0.3s ease',
        }}>
            <div style={{
                maxWidth: '1360px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                gap: '36px',
            }}>
                {/* ── 1. Brand Column ── */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                        <div style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            border: '1.5px solid rgba(212, 165, 55, 0.5)',
                            boxShadow: '0 0 16px rgba(212, 165, 55, 0.4)',
                            background: isLight ? '#ffffff' : '#050508',
                        }}>
                            <img
                                src="/images/logo.png"
                                alt="EMPEROR CARD"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                        <div>
                            <span style={{
                                fontSize: '19px',
                                fontWeight: '900',
                                color: isLight ? '#0f172a' : '#FFFFFF',
                                letterSpacing: '1px',
                                display: 'block',
                                lineHeight: '1.2',
                            }}>
                                EMPEROR
                            </span>
                            <span style={{
                                fontSize: '11px',
                                fontWeight: '700',
                                color: isLight ? '#b45309' : '#D4A537',
                            }}>
                                إمبراطور كارد للخدمات الرقمية
                            </span>
                        </div>
                    </div>

                    <p style={{
                        color: isLight ? '#475569' : '#A0A0B0',
                        fontSize: '13px',
                        lineHeight: '1.8',
                        margin: '0 0 16px',
                        maxWidth: '320px',
                    }}>
                        منصة إمبراطور — المنصة الرائدة في مصر والشرق الأوسط لشحن الألعاب، بطاقات الهدايا الرقمية، وتسييل وبيع التارجت للوكالات بأعلى سعر وصرف فوري موثوق.
                    </p>

                    {/* Security & Speed Trust Badges */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: '#16a34a',
                            fontSize: '12px',
                            fontWeight: '700',
                        }}>
                            <ShieldCheck size={16} />
                            <span>نظام مشفر بالكامل — حماية 100% للبيانات</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: isLight ? '#b45309' : '#F5D061',
                            fontSize: '12px',
                            fontWeight: '700',
                        }}>
                            <Zap size={16} />
                            <span>تنفيذ فوري للطلبات على مدار 24 ساعة</span>
                        </div>
                    </div>
                </div>

                {/* ── 2. Dynamic Categories Column (الأقسام المتاحة) ── */}
                <div>
                    <h4 style={{
                        color: isLight ? '#b45309' : '#F5D061',
                        fontSize: '15px',
                        fontWeight: '800',
                        marginBottom: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                    }}>
                        <Layers size={16} />
                        <span>أقسام المتجر المتاحة</span>
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {displayCategories.map(cat => (
                            <Link
                                key={cat.id || cat.slug}
                                to={`/category/${cat.slug}`}
                                style={{
                                    color: isLight ? '#475569' : '#94A3B8',
                                    textDecoration: 'none',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '3px 0',
                                    transition: 'all 0.2s ease',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.color = isLight ? '#b45309' : '#F5D061';
                                    e.currentTarget.style.transform = 'translateX(-4px)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.color = isLight ? '#475569' : '#94A3B8';
                                    e.currentTarget.style.transform = 'translateX(0)';
                                }}
                            >
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <ChevronLeft size={13} style={{ opacity: 0.6 }} />
                                    {cat.name}
                                </span>
                                {typeof cat.products_count === 'number' && cat.products_count > 0 && (
                                    <span style={{
                                        fontSize: '10.5px',
                                        fontWeight: '700',
                                        padding: '1px 7px',
                                        borderRadius: '10px',
                                        background: isLight ? 'rgba(212, 165, 55, 0.15)' : 'rgba(212, 165, 55, 0.12)',
                                        color: isLight ? '#92400e' : '#F5D061',
                                        border: isLight ? '1px solid rgba(212, 165, 55, 0.35)' : '1px solid rgba(212, 165, 55, 0.2)',
                                    }}>
                                        {cat.products_count} منتج
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* ── 3. Platform Services & Links (خدمات المنصة وروابط سريعة) ── */}
                <div>
                    <h4 style={{
                        color: isLight ? '#b45309' : '#F5D061',
                        fontSize: '15px',
                        fontWeight: '800',
                        marginBottom: '14px',
                    }}>
                        خدمات المنصة وروابط سريعة
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {[
                            { to: '/target/apps', label: 'سحب وبيع التارجت للوكالات' },
                            { to: '/deposit', label: 'شحن رصيد المحفظة (إيداع)' },
                            { to: '/referrals', label: 'برنامج الإحالة والأرباح' },
                            { to: '/developer/api', label: 'ربط المطورين ومفتاح API' },
                            { to: '/about', label: 'عن منصة إمبراطور (من نحن)' },
                            { to: '/account-issues', label: 'مركز الشكاوى ومشاكل الحساب' },
                            { to: '/support', label: 'الأسئلة الشائعة والدعم المباشر' },
                        ].map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                style={{
                                    color: isLight ? '#475569' : '#94A3B8',
                                    textDecoration: 'none',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '3px 0',
                                    transition: 'all 0.2s ease',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.color = isLight ? '#b45309' : '#F5D061';
                                    e.currentTarget.style.transform = 'translateX(-4px)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.color = isLight ? '#475569' : '#94A3B8';
                                    e.currentTarget.style.transform = 'translateX(0)';
                                }}
                            >
                                <ChevronLeft size={13} style={{ opacity: 0.6 }} />
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* ── 4. Dynamic Payment Methods & Support (طرق الدفع والدعم) ── */}
                <div>
                    <h4 style={{
                        color: isLight ? '#b45309' : '#F5D061',
                        fontSize: '15px',
                        fontWeight: '800',
                        marginBottom: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                    }}>
                        <CreditCard size={16} />
                        <span>طرق الدفع والإيداع المعتمدة</span>
                    </h4>
                    
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px',
                        marginBottom: '20px',
                    }}>
                        {displayPaymentMethods.map(pm => (
                            <span
                                key={pm.id || pm.code || pm.name}
                                style={{
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    color: isLight ? '#92400e' : '#F5D061',
                                    background: isLight ? 'rgba(212, 165, 55, 0.12)' : 'rgba(212, 165, 55, 0.08)',
                                    border: isLight ? '1px solid rgba(212, 165, 55, 0.35)' : '1px solid rgba(212, 165, 55, 0.2)',
                                    padding: '4px 10px',
                                    borderRadius: '8px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                {pm.name}
                            </span>
                        ))}
                    </div>

                    {/* Direct Support Contacts */}
                    {supportContacts.length > 0 && (
                        <div>
                            <h5 style={{
                                color: isLight ? '#334155' : '#E2E8F0',
                                fontSize: '13px',
                                fontWeight: '800',
                                marginBottom: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                            }}>
                                <Headphones size={14} />
                                <span>قنوات الدعم الفني المباشر</span>
                            </h5>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                {supportContacts.slice(0, 4).map(sc => (
                                    <a
                                        key={sc.id}
                                        href={sc.url || (sc.type === 'phone' ? `tel:${sc.value}` : sc.value)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            fontSize: '11.5px',
                                            fontWeight: '700',
                                            color: isLight ? '#0f172a' : '#FFFFFF',
                                            background: isLight ? '#ffffff' : 'rgba(255, 255, 255, 0.06)',
                                            border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.15)',
                                            padding: '4px 10px',
                                            borderRadius: '8px',
                                            textDecoration: 'none',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '5px',
                                            transition: 'all 0.2s',
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.borderColor = '#d4a537';
                                            e.currentTarget.style.color = '#d4a537';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.borderColor = isLight ? '#cbd5e1' : 'rgba(255, 255, 255, 0.15)';
                                            e.currentTarget.style.color = isLight ? '#0f172a' : '#FFFFFF';
                                        }}
                                    >
                                        <MessageCircle size={12} color="#22c55e" />
                                        <span>{sc.name || sc.type}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Bottom Bar (Copyright & Developer Info) ── */}
            <div style={{
                maxWidth: '1360px',
                margin: '32px auto 0',
                paddingTop: '20px',
                borderTop: isLight ? '1px solid rgba(210, 228, 245, 0.8)' : '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                fontSize: '12.5px',
                color: isLight ? '#64748b' : '#8E8E98',
            }}>
                <div>
                    جميع الحقوق محفوظة © {new Date().getFullYear()} — منصة إمبراطور كارد
                </div>
                <div>
                    <Link
                        to="/created-by"
                        style={{
                            color: isLight ? '#b45309' : '#D4A537',
                            textDecoration: 'none',
                            fontWeight: '700',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}
                    >
                        <span>تم التطوير بواسطة فريق العمل</span>
                        <ExternalLink size={12} />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
