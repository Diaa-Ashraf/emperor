import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Phone, MessageCircle, Mail, Code, ExternalLink, ShieldCheck, Sparkles, Award } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { useLanguage } from '../contexts/LanguageContext';

export default function CreatedByPage() {
    const { isRtl } = useLanguage();

    // Company & Developer Info (Editable / Configurable / Nullable fields)
    const companyInfo = {
        name: 'DIGI TECH SOLUTIONS',
        tagline: 'تطوير المنصات الرقمية والتطبيقات الحديثة',
        website: 'https://digitech.me',
        description: 'نحن شركة برمجة نصمم ونبني منتجات رقمية احترافية. منصة إمبراطور أحد أعمالنا التي تعكس اهتمامنا بأدق التفاصيل والسرعة وسهولة الاستخدام.',
        logoUrl: '/images/artwork/digitech_logo.png', // Nullable
    };

    const teamMembers = [
        {
            name: 'ضياء الشافعي (Diaa Elshafey)',
            role: 'Lead Architect & Full-Stack Developer',
            bio: 'مهندس برمجيات متخصص في بناء معمارية المنصات عالية الأداء وأنظمة الربط المالي والـ API.',
            avatar: null, // Nullable
            phone: '+201000000000', // Nullable
            whatsapp: 'https://wa.me/201000000000', // Nullable
            email: 'diaa@example.com', // Nullable
            social: {
                github: 'https://github.com',
                linkedin: 'https://linkedin.com',
                telegram: 'https://t.me',
            }
        },
        {
            name: 'فريق هندسة وتطوير النظم',
            role: 'Systems & Mobile Apps Team',
            bio: 'نخبة من المطورين المتخصصين في واجهات المستخدم، أمن البيانات، وتكامل بوابات الدفع الدولية.',
            avatar: null,
            phone: null,
            whatsapp: 'https://wa.me/201000000000',
            email: 'support@digitech.me',
            social: {
                website: 'https://digitech.me'
            }
        }
    ];

    return (
        <MainLayout>
            <div style={{ maxWidth: '960px', margin: '0 auto', paddingBottom: '40px' }}>
                {/* Header Title */}
                <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                    <span style={{
                        fontSize: '13px',
                        fontWeight: '800',
                        color: 'var(--gold-400)',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '8px',
                    }}>
                        {companyInfo.name}
                    </span>
                    <h1 style={{
                        fontSize: 'clamp(24px, 4vw, 34px)',
                        fontWeight: '900',
                        color: '#FFFFFF',
                        margin: '0 0 10px',
                    }}>
                        تنفيذ وبرمجة منصة إمبراطور
                    </h1>
                    <p style={{
                        color: '#A0A0B0',
                        fontSize: '15px',
                        maxWidth: '600px',
                        margin: '0 auto',
                    }}>
                        تم بناء وتطوير المنصة بأحدث المعايير البرمجية الآمنة لتقديم تجربة شحن رقمي فائقة السرعة
                    </p>
                </div>

                {/* Main Company Card (Matches Competitor Showcase) */}
                <div style={{
                    background: 'linear-gradient(145deg, #14141B 0%, #0D0D12 100%)',
                    border: '1px solid rgba(212, 165, 55, 0.35)',
                    borderRadius: '24px',
                    padding: 'clamp(28px, 5vw, 44px)',
                    textAlign: 'center',
                    marginBottom: '40px',
                    boxShadow: '0 16px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(212, 165, 55, 0.08)',
                }}>
                    {/* Company Logo or Metallic Badge */}
                    <div style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '24px',
                        background: 'linear-gradient(135deg, #2A2415 0%, #151410 100%)',
                        border: '2px solid var(--gold-400)',
                        margin: '0 auto 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 30px rgba(212, 165, 55, 0.25)',
                    }}>
                        <Code size={46} color="var(--gold-300)" strokeWidth={2.2} />
                    </div>

                    <h2 style={{
                        fontSize: '24px',
                        fontWeight: '900',
                        color: 'var(--gold-200)',
                        margin: '0 0 8px',
                    }}>
                        {companyInfo.name}
                    </h2>
                    <p style={{
                        fontSize: '14px',
                        color: 'var(--gold-400)',
                        fontWeight: '700',
                        marginBottom: '16px',
                    }}>
                        {companyInfo.tagline}
                    </p>
                    <p style={{
                        fontSize: '14px',
                        color: '#CBD5E1',
                        lineHeight: '1.8',
                        maxWidth: '700px',
                        margin: '0 auto 24px',
                    }}>
                        {companyInfo.description}
                    </p>

                    {companyInfo.website && (
                        <a
                            href={companyInfo.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 24px',
                                borderRadius: '12px',
                                background: 'rgba(212, 165, 55, 0.12)',
                                border: '1px solid rgba(212, 165, 55, 0.4)',
                                color: 'var(--gold-200)',
                                fontWeight: '800',
                                fontSize: '13.5px',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <Globe size={16} />
                            <span>زيارة الموقع الرسمي للشركة</span>
                            <ExternalLink size={14} />
                        </a>
                    )}
                </div>

                {/* Team Members & Developers Grid */}
                <div style={{ marginBottom: '32px' }}>
                    <h3 style={{
                        fontSize: '18px',
                        fontWeight: '900',
                        color: '#FFFFFF',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}>
                        <span style={{ color: 'var(--gold-400)' }}>•</span>
                        <span>فريق التطوير والهندسة البرمجية</span>
                    </h3>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                        gap: '20px',
                    }}>
                        {teamMembers.map((member, idx) => (
                            <div
                                key={idx}
                                style={{
                                    background: '#121218',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    borderRadius: '20px',
                                    padding: '24px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                                        <div style={{
                                            width: '52px',
                                            height: '52px',
                                            borderRadius: '16px',
                                            background: 'linear-gradient(135deg, #F8E8B8 0%, #D4A537 100%)',
                                            color: '#08080A',
                                            fontWeight: '900',
                                            fontSize: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                        }}>
                                            {member.avatar ? (
                                                <img src={member.avatar} alt={member.name} style={{ width: '100%', height: '100%', borderRadius: '16px' }} />
                                            ) : (
                                                member.name.charAt(0)
                                            )}
                                        </div>
                                        <div>
                                            <h4 style={{ margin: '0 0 2px', fontSize: '16px', fontWeight: '800', color: '#FFFFFF' }}>
                                                {member.name}
                                            </h4>
                                            <span style={{ fontSize: '12px', color: 'var(--gold-400)', fontWeight: '700' }}>
                                                {member.role}
                                            </span>
                                        </div>
                                    </div>

                                    <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: '1.7', margin: '0 0 18px' }}>
                                        {member.bio}
                                    </p>
                                </div>

                                {/* Contacts & Social Bar */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: '10px',
                                    paddingTop: '16px',
                                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                                }}>
                                    {member.whatsapp && (
                                        <a
                                            href={member.whatsapp}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                padding: '6px 12px',
                                                borderRadius: '8px',
                                                background: 'rgba(37, 211, 102, 0.12)',
                                                border: '1px solid rgba(37, 211, 102, 0.3)',
                                                color: '#25D366',
                                                fontSize: '12px',
                                                fontWeight: '700',
                                                textDecoration: 'none',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                            }}
                                        >
                                            <MessageCircle size={14} />
                                            <span>واتساب</span>
                                        </a>
                                    )}

                                    {member.phone && (
                                        <a
                                            href={`tel:${member.phone}`}
                                            style={{
                                                padding: '6px 12px',
                                                borderRadius: '8px',
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                color: '#E2E8F0',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                textDecoration: 'none',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                            }}
                                        >
                                            <Phone size={13} />
                                            <span>{member.phone}</span>
                                        </a>
                                    )}

                                    {member.email && (
                                        <a
                                            href={`mailto:${member.email}`}
                                            style={{
                                                padding: '6px 12px',
                                                borderRadius: '8px',
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                color: '#E2E8F0',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                textDecoration: 'none',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                            }}
                                        >
                                            <Mail size={13} />
                                            <span>إيميل</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
