import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Users, Award, Lock, Headphones, Globe, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { useLanguage } from '../contexts/LanguageContext';

export default function AboutPage() {
    const { isRtl } = useLanguage();

    const stats = [
        { value: '+50,000', label: 'عميل وتاجر معتمد' },
        { value: '+250,000', label: 'عملية شحن مكتملة' },
        { value: '99.9%', label: 'نسبة النجاح والأمان' },
        { value: '24/7', label: 'دعم فني متواصل' },
    ];

    const pillars = [
        {
            icon: Zap,
            title: 'سرعة التنفيذ الفوري',
            desc: 'ربط برمجي مباشر مع خوادم الألعاب لتسليم الطلبات والشحن خلال ثوانٍ معدودة دون تأخير.',
        },
        {
            icon: Lock,
            title: 'أعلى معايير الأمان المالي',
            desc: 'حماية مشفرة لكافة بيانات المستخدمين، مع دعم بوابات الدفع الرسمية والمعتمدة في مصر والشرق الأوسط.',
        },
        {
            icon: Award,
            title: 'أسعار الجملة وهوامش ربح حقيقية',
            desc: 'أفضل أسعار صرف وتسييل تارجت تطبيقات البث، وأسعار منافسة للتجار والموزعين عبر الـ API.',
        },
        {
            icon: Headphones,
            title: 'خدمة عملاء ودعم مستمر',
            desc: 'فريق دعم فني متواجد على مدار الساعة لمتابعة الطلبات وحل أي استفسارات أو مشاكل تقنية.',
        },
    ];

    return (
        <MainLayout>
            <div style={{ maxWidth: '1080px', margin: '0 auto', paddingBottom: '40px' }}>
                {/* Header Title */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <span style={{
                        fontSize: '13px',
                        fontWeight: '800',
                        color: 'var(--gold-400)',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '8px',
                    }}>
                        عن منصة إمبراطور
                    </span>
                    <h1 style={{
                        fontSize: 'clamp(26px, 4vw, 38px)',
                        fontWeight: '900',
                        color: '#FFFFFF',
                        margin: '0 0 12px',
                    }}>
                        المنصة الأولى لشحن الألعاب وتداول التارجت
                    </h1>
                    <p style={{
                        color: '#9E9EA8',
                        fontSize: '15px',
                        maxWidth: '680px',
                        margin: '0 auto',
                        lineHeight: '1.8',
                    }}>
                        تأسست منصة إمبراطور لتقديم حلول شحن رقمي احترافية ومبتكرة، تجمع بين سرعة التسليم التلقائي، أسعار الجملة الحصرية، وخدمات سحب التارجت للتطبيقات بكل موثوقية.
                    </p>
                </div>

                {/* Stats Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
                    gap: '16px',
                    marginBottom: '48px',
                }}>
                    {stats.map((s, idx) => (
                        <div
                            key={idx}
                            style={{
                                background: 'linear-gradient(145deg, #14141B 0%, #0D0D12 100%)',
                                border: '1px solid rgba(212, 165, 55, 0.25)',
                                borderRadius: '20px',
                                padding: '24px',
                                textAlign: 'center',
                            }}
                        >
                            <div style={{
                                fontSize: '28px',
                                fontWeight: '900',
                                color: 'var(--gold-300)',
                                marginBottom: '6px',
                            }}>
                                {s.value}
                            </div>
                            <div style={{
                                fontSize: '13px',
                                color: '#94A3B8',
                                fontWeight: '700',
                            }}>
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pillars Section */}
                <div style={{
                    background: '#0E0E14',
                    border: '1px solid rgba(212, 165, 55, 0.2)',
                    borderRadius: '24px',
                    padding: 'clamp(24px, 4vw, 40px)',
                    marginBottom: '40px',
                }}>
                    <h2 style={{
                        fontSize: '20px',
                        fontWeight: '900',
                        color: '#FFFFFF',
                        marginBottom: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}>
                        <span style={{ color: 'var(--gold-400)' }}>•</span>
                        <span>ركائز التميز في إمبراطور</span>
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
                        gap: '24px',
                    }}>
                        {pillars.map((p, idx) => {
                            const Icon = p.icon;
                            return (
                                <div
                                    key={idx}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.02)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)',
                                        borderRadius: '18px',
                                        padding: '22px',
                                    }}
                                >
                                    <div style={{
                                        width: '44px',
                                        height: '44px',
                                        borderRadius: '12px',
                                        background: 'rgba(212, 165, 55, 0.12)',
                                        border: '1px solid rgba(212, 165, 55, 0.3)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--gold-300)',
                                        marginBottom: '14px',
                                    }}>
                                        <Icon size={22} />
                                    </div>
                                    <h3 style={{
                                        fontSize: '16px',
                                        fontWeight: '800',
                                        color: '#FFFFFF',
                                        margin: '0 0 8px',
                                    }}>
                                        {p.title}
                                    </h3>
                                    <p style={{
                                        fontSize: '13px',
                                        color: '#94A3B8',
                                        lineHeight: '1.7',
                                        margin: 0,
                                    }}>
                                        {p.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom CTA Box */}
                <div style={{
                    background: 'linear-gradient(135deg, rgba(212, 165, 55, 0.15) 0%, rgba(14, 14, 20, 0.95) 100%)',
                    border: '1px solid rgba(212, 165, 55, 0.35)',
                    borderRadius: '24px',
                    padding: '32px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '20px',
                }}>
                    <div>
                        <h3 style={{ margin: '0 0 6px', fontSize: '20px', fontWeight: '900', color: '#FFFFFF' }}>
                            جاهز للبدء مع منصة إمبراطور؟
                        </h3>
                        <p style={{ margin: 0, fontSize: '13.5px', color: '#CBD5E1' }}>
                            سجل حسابك مجاناً واستمتع بالشحن الفوري وخدمات الربط البرمجي للشركات.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <Link
                            to="/register"
                            className="emperor-btn-primary"
                            style={{ padding: '12px 24px', fontSize: '14px' }}
                        >
                            <span>إنشاء حساب جديد</span>
                            {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                        </Link>
                        <Link
                            to="/support"
                            style={{
                                padding: '12px 20px',
                                borderRadius: '12px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                color: '#FFFFFF',
                                fontSize: '14px',
                                fontWeight: '700',
                                textDecoration: 'none',
                            }}
                        >
                            <span>تواصل مع الدعم الفني</span>
                        </Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
