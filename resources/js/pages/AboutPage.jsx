import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    ShieldCheck,
    Zap,
    Users,
    Award,
    Lock,
    Headphones,
    Globe,
    CheckCircle2,
    ArrowLeft,
    ArrowRight,
    Sparkles,
    Flame,
    Target,
    Compass
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import "../../css/visualCategory.css";

export default function AboutPage() {
    const { isRtl } = useLanguage();
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const pageRef = useRef(null);

    const stats = [
        { value: '+50,000', label: 'عميل وتاجر معتمد', icon: Users, color: '#D4A537' },
        { value: '+250,000', label: 'عملية شحن مكتملة', icon: Zap, color: '#22C55E' },
        { value: '99.9%', label: 'نسبة النجاح والأمان', icon: ShieldCheck, color: '#38BDF8' },
        { value: '24/7', label: 'دعم فني متواصل', icon: Headphones, color: '#F59E0B' },
    ];

    const pillars = [
        {
            icon: Zap,
            title: 'سرعة التنفيذ الفوري (0-30 ثانية)',
            desc: 'ربط برمجي مباشر مع سيرفرات الألعاب العالمية لتسليم الشحنات والبطاقات في غضون ثوانٍ تلقائياً دون أي تدخل بشري.',
            badge: 'تسليم فوري',
            color: '#22C55E',
        },
        {
            icon: Lock,
            title: 'أعلى معايير الأمان المالي',
            desc: 'تشفير تام من طرف لطرف لجميع المعاملات والبيانات، مع دعم كامل لبوابات الدفع البنكية والمحافظ الإلكترونية المعتمدة.',
            badge: 'حماية مشفرة',
            color: '#38BDF8',
        },
        {
            icon: Award,
            title: 'أسعار الجملة وهوامش ربح للتجار',
            desc: 'أقوى أسعار صرف وتسييل تارجت تطبيقات البث المباشر وألعاب الموبايل بأسعار الجملة للوكلاء والموزعين مع ربط API.',
            badge: 'أسعار حصرية',
            color: '#D4A537',
        },
        {
            icon: Headphones,
            title: 'دعم فني واستجابة فورية 24/7',
            desc: 'فريق دعم فني خبير متواجد على مدار الساعة طوال أيام الأسبوع عبر واتساب وتليجرام لحل أي استفسارات أو متابعة الطلبات.',
            badge: 'دعم 24/7',
            color: '#F43F5E',
        },
    ];

    const values = [
        {
            title: 'الشفافية المطلقة',
            desc: 'أسعار واضحة بدون أي رسوم خفية أو خصومات مفاجئة، مع كشف حساب دقيق لكل حركة مالية.',
            icon: ShieldCheck,
        },
        {
            title: 'الابتكار والسرعة',
            desc: 'تطوير مستمر لمنصتنا البرمجية وأنظمة الربط المالي لتواكب أحدث ألعاب وتطبيقات العالم الرقمي.',
            icon: Flame,
        },
        {
            title: 'خدمة التاجر والعميل',
            desc: 'نضع راحة وثقة عملائنا في المقام الأول، ونوفر أدوات إدارية متكاملة لزيادة مبيعات وأرباح الموزعين.',
            icon: Target,
        },
    ];

    useEffect(() => {
        const cards = pageRef.current?.querySelectorAll('.about-animated-card');
        if (!cards?.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            { threshold: 0.15 }
        );

        cards.forEach((card) => observer.observe(card));
        return () => observer.disconnect();
    }, []);

    return (
        <MainLayout>
            <style>{`
                @keyframes floatSlow {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                }
                @keyframes pulseGlow {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(1.08); }
                }
                @keyframes shimmerBorder {
                    0% { border-color: rgba(212, 165, 55, 0.3); }
                    50% { border-color: rgba(245, 208, 97, 0.8); }
                    100% { border-color: rgba(212, 165, 55, 0.3); }
                }
                .about-animated-card {
                    opacity: 0;
                    transform: translateY(24px);
                    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .about-animated-card.is-visible {
                    opacity: 1;
                    transform: translateY(0);
                }
                .about-stat-card:hover {
                    transform: translateY(-4px);
                    border-color: #D4A537 !important;
                    box-shadow: 0 16px 40px rgba(212, 165, 55, 0.2);
                }
                .about-pillar-card:hover {
                    transform: translateY(-4px);
                    background: rgba(25, 25, 36, 0.9) !important;
                }
            `}</style>

            <div ref={pageRef} style={{ maxWidth: '1080px', margin: '0 auto', paddingBottom: '60px' }}>
                {/* Header Title with Glowing Badge & Animations */}
                <div style={{ textAlign: 'center', marginBottom: '44px', position: 'relative' }}>
                    {/* Ambient Glow */}
                    <div style={{
                        position: 'absolute',
                        top: '-40px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '320px',
                        height: '160px',
                        background: 'radial-gradient(circle, rgba(212, 165, 55, 0.2) 0%, transparent 70%)',
                        pointerEvents: 'none',
                        animation: 'pulseGlow 4s infinite ease-in-out',
                    }} />

                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 16px',
                        borderRadius: '9999px',
                        background: 'rgba(212, 165, 55, 0.12)',
                        border: '1px solid rgba(212, 165, 55, 0.35)',
                        color: 'var(--gold-300)',
                        fontSize: '13px',
                        fontWeight: '800',
                        marginBottom: '14px',
                        boxShadow: '0 0 20px rgba(212, 165, 55, 0.15)',
                    }}>
                        <Sparkles size={14} color="#D4A537" />
                        <span>عن منصة إمبراطور EMPEROR</span>
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(26px, 4.5vw, 42px)',
                        fontWeight: '900',
                        color: isLight ? '#0F172A' : '#FFFFFF',
                        margin: '0 0 14px',
                        letterSpacing: '-0.5px',
                        lineHeight: '1.3',
                    }}>
                        المنصة الرائدة في الشرق الأوسط لشحن الألعاب وتداول التارجت
                    </h1>

                    <p style={{
                        color: isLight ? '#475569' : '#A0A0B0',
                        fontSize: '15.5px',
                        maxWidth: '720px',
                        margin: '0 auto',
                        lineHeight: '1.8',
                    }}>
                        تأسست منصة <span style={{ color: '#D4A537', fontWeight: '800' }}>إمبراطور</span> لتقديم حلول شحن رقمي ذكية ومبتكرة، تجمع بين سرعة التسليم البرمجي التلقائي، أفضل أسعار الجملة، وسحب تارجت تطبيقات البث المباشر بأعلى أمان وموثوقية.
                    </p>
                </div>

                {/* Animated Stats Grid */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                        gap: '18px',
                        marginBottom: '48px',
                    }}>
                    {stats.map((s, idx) => {
                        const Icon = s.icon;
                        return (
                            <div
                                key={idx}
                                className="about-animated-card about-stat-card"
                                style={{
                                    background: isLight ? '#FFFFFF' : 'linear-gradient(145deg, #161622 0%, #0E0E14 100%)',
                                    border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(212, 165, 55, 0.25)',
                                    borderRadius: '22px',
                                    padding: '24px 20px',
                                    textAlign: 'center',
                                    boxShadow: isLight ? '0 4px 18px rgba(0, 0, 0, 0.05)' : '0 10px 30px rgba(0, 0, 0, 0.4)',
                                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                    transitionDelay: `${idx * 0.1}s`,
                                }}
                            >
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '14px',
                                    background: `${s.color}15`,
                                    border: `1px solid ${s.color}35`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: s.color,
                                    margin: '0 auto 12px',
                                }}>
                                    <Icon size={24} />
                                </div>

                                <div style={{
                                    fontSize: '30px',
                                    fontWeight: '900',
                                    color: s.color,
                                    marginBottom: '4px',
                                    fontFamily: 'Cairo, sans-serif',
                                    letterSpacing: '-0.5px',
                                }}>
                                    {s.value}
                                </div>

                                <div style={{
                                    fontSize: '13px',
                                    color: '#94A3B8',
                                    fontWeight: '800',
                                }}>
                                    {s.label}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Pillars Section with Rich Hover Cards */}
                <div style={{
                    background: isLight ? '#FFFFFF' : 'linear-gradient(145deg, #12121A 0%, #0B0B10 100%)',
                    border: isLight ? '1px solid #E2E8F0' : '1.5px solid rgba(212, 165, 55, 0.25)',
                    borderRadius: '28px',
                    padding: 'clamp(24px, 4vw, 44px)',
                    marginBottom: '44px',
                    boxShadow: isLight ? '0 4px 20px rgba(0, 0, 0, 0.05)' : '0 20px 60px rgba(0, 0, 0, 0.6)',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '10px',
                        marginBottom: '28px',
                    }}>
                        <h2 style={{
                            fontSize: '22px',
                            fontWeight: '900',
                            color: isLight ? '#0F172A' : '#FFFFFF',
                            margin: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}>
                            <span style={{
                                width: '6px',
                                height: '22px',
                                borderRadius: '3px',
                                background: 'linear-gradient(180deg, #F5D061 0%, #D4A537 100%)',
                            }} />
                            <span>ركائز التميز في إمبراطور</span>
                        </h2>

                        <span style={{
                            fontSize: '12.5px',
                            color: isLight ? '#B45309' : 'var(--gold-400)',
                            fontWeight: '700',
                        }}>
                            الجودة والسرعة والأمان أولويتنا الدائمة
                        </span>
                    </div>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                            gap: '20px',
                        }}>
                        {pillars.map((p, idx) => {
                            const Icon = p.icon;
                            return (
                                <div
                                    key={idx}
                                    className="about-animated-card about-pillar-card"
                                    style={{
                                        background: isLight ? '#F8FAFC' : 'rgba(20, 20, 28, 0.7)',
                                        border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                                        borderRadius: '20px',
                                        padding: '24px',
                                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                        transitionDelay: `${idx * 0.12}s`,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = p.color;
                                        e.currentTarget.style.boxShadow = isLight ? `0 8px 24px ${p.color}25` : `0 12px 35px ${p.color}20`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <div>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            marginBottom: '16px',
                                        }}>
                                            <div style={{
                                                width: '46px',
                                                height: '46px',
                                                borderRadius: '14px',
                                                background: `${p.color}18`,
                                                border: `1px solid ${p.color}40`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: p.color,
                                            }}>
                                                <Icon size={24} />
                                            </div>

                                            <span style={{
                                                fontSize: '11px',
                                                fontWeight: '800',
                                                color: p.color,
                                                background: `${p.color}15`,
                                                border: `1px solid ${p.color}30`,
                                                padding: '3px 10px',
                                                borderRadius: '6px',
                                            }}>
                                                {p.badge}
                                            </span>
                                        </div>

                                        <h3 style={{
                                            fontSize: '17px',
                                            fontWeight: '900',
                                            color: isLight ? '#0F172A' : '#FFFFFF',
                                            margin: '0 0 10px',
                                            lineHeight: '1.4',
                                        }}>
                                            {p.title}
                                        </h3>

                                        <p style={{
                                            fontSize: '13.5px',
                                            color: isLight ? '#475569' : '#94A3B8',
                                            lineHeight: '1.7',
                                            margin: 0,
                                        }}>
                                            {p.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Core Values Section */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                    gap: '20px',
                    marginBottom: '44px',
                }}>
                    {values.map((val, idx) => {
                        const Icon = val.icon;
                        return (
                            <div
                                key={idx}
                                className="about-animated-card"
                                style={{
                                    background: isLight ? '#FFFFFF' : 'linear-gradient(145deg, #151520 0%, #0D0D14 100%)',
                                    border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                                    borderRadius: '20px',
                                    padding: '24px',
                                    boxShadow: isLight ? '0 4px 18px rgba(0, 0, 0, 0.04)' : 'none',
                                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                    transitionDelay: `${idx * 0.15}s`,
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    marginBottom: '12px',
                                }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '12px',
                                        background: isLight ? 'rgba(212, 165, 55, 0.15)' : 'rgba(212, 165, 55, 0.12)',
                                        border: '1px solid rgba(212, 165, 55, 0.3)',
                                        color: isLight ? '#B45309' : '#D4A537',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Icon size={20} />
                                    </div>
                                    <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                        {val.title}
                                    </h4>
                                </div>
                                <p style={{ margin: 0, fontSize: '13px', color: isLight ? '#475569' : '#94A3B8', lineHeight: '1.7' }}>
                                    {val.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA Box with Floating Animation */}
                <div
                    className="about-animated-card"
                    style={{
                        background: isLight ? '#FFFFFF' : 'linear-gradient(135deg, rgba(212, 165, 55, 0.18) 0%, rgba(18, 18, 26, 0.98) 100%)',
                        border: isLight ? '1.5px solid #D4A537' : '1.5px solid rgba(212, 165, 55, 0.4)',
                        borderRadius: '26px',
                        padding: 'clamp(24px, 4vw, 36px)',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '20px',
                        boxShadow: isLight ? '0 10px 30px rgba(0, 0, 0, 0.06)' : '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(212, 165, 55, 0.15)',
                    }}
                >
                    <div>
                        <h3 style={{ margin: '0 0 8px', fontSize: '21px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                            جاهز للبدء والشحن مع منصة إمبراطور؟
                        </h3>
                        <p style={{ margin: 0, fontSize: '14px', color: isLight ? '#475569' : '#CBD5E1' }}>
                            سجل حسابك مجاناً الآن واستمتع بالشحن الفوري، العمولات المرتفعة، وخدمات الـ API للشركات.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <Link
                            to="/register"
                            className="emperor-btn-primary"
                            style={{
                                padding: '12px 24px',
                                fontSize: '14px',
                                borderRadius: '14px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                textDecoration: 'none',
                                fontWeight: '900',
                            }}
                        >
                            <span>إنشاء حساب جديد</span>
                            {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                        </Link>
                        <Link
                            to="/support"
                            style={{
                                padding: '12px 20px',
                                borderRadius: '14px',
                                background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.06)',
                                border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.15)',
                                color: isLight ? '#0F172A' : '#FFFFFF',
                                fontSize: '14px',
                                fontWeight: '800',
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                transition: 'all 0.2s',
                            }}
                        >
                            <Headphones size={16} color="#D4A537" />
                            <span>تواصل مع الدعم الفني</span>
                        </Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
