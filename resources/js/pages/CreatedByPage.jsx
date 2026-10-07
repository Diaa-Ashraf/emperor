import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Phone, MessageCircle, Mail, Code, ExternalLink, ShieldCheck, Sparkles, Award } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import "../../css/visualCategory.css";

export default function CreatedByPage() {
    const { language, isRtl } = useLanguage();
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const isEn = language === 'en';

    const projectsSectionRef = useRef(null);
    const [areProjectsVisible, setAreProjectsVisible] = useState(false);

    useEffect(() => {
        const section = projectsSectionRef.current;
        if (!section) return undefined;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAreProjectsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    // Company & Developer Info (Bilingual)
    const companyInfo = {
        name: 'stackway',
        tagline: isEn ? 'Modern Platform & Digital Product Engineering' : 'تطوير المنصات الرقمية والتطبيقات الحديثة',
        website: 'https://portfolio.stackway.cloud/',
        description: isEn
            ? 'We design and engineer high-performance digital products and platforms. The Emperor platform is one of our flagship systems, reflecting our commitment to maximum security, ultra-fast speeds, and seamless user experiences.'
            : 'نحن شركة برمجة نصمم ونبني منتجات رقمية احترافية. منصة إمبراطور أحد أعمالنا التي تعكس اهتمامنا بأدق التفاصيل والسرعة وسهولة الاستخدام.',
        logoUrl: 'https://portfolio.stackway.cloud/images/logo-company.png',
    };

    const teamMembers = [
        {
            name: isEn ? 'Diaa Elshafey' : 'ضياء الشافعي (Diaa Elshafey)',
            role: 'Lead Architect & Full-Stack Developer',
            bio: isEn
                ? 'Software Engineer specializing in high-performance platform architecture, financial gateways, real-time engines, and distributed APIs.'
                : 'مهندس برمجيات متخصص في بناء معمارية المنصات عالية الأداء وأنظمة الربط المالي والـ API.',
            avatar: '/images/WhatsAppImage.jpeg',
            phone: '+201202325201',
            whatsapp: 'https://wa.me/201202325201',
            email: 'diaa@example.com',
            social: {
                github: 'https://github.com',
                linkedin: 'https://linkedin.com',
                telegram: 'https://t.me',
            }
        },
        {
            name: isEn ? 'Rasha Mahmoud' : 'رشا محمود (Rasha Mahmoud)',
            role: 'Front-End Developer',
            bio: isEn
                ? 'Dedicated to crafting modern web applications and refining responsive UI/UX with focus on intuitive, reliable user flows.'
                : 'أهتم بتطوير المنصات وتحسين تجربة المستخدم، مع التركيز على تقديم خدمات رقمية سهلة وموثوقة.',
            avatar: null,
            phone: '+201090178749',
            whatsapp: 'https://wa.me/201090178749',
            email: 'webStore20261@outlook.com',
            social: {
                Linkedin: 'https://www.linkedin.com/in/rasha-mahmoud-4045553a5/',
                website: 'https://webstore-ruddy-seven.vercel.app/',
                email: 'webStore20261@outlook.com'
            }
        }
    ];

    const ourProjects = [
        {
            title: isEn ? 'Kunuz Platform' : 'منصة كنوز (Kunuz)',
            url: 'https://kunuz.stackway.cloud',
            category: isEn ? 'Digital Cards & Gaming Vouchers' : 'منصة شحن وبطاقات رقمية',
            desc: isEn
                ? 'Comprehensive digital store for gaming gift cards and software subscriptions with instant delivery and multi-gateway processing.'
                : 'منصة رقمية متكاملة لبيع وتوزيع بطاقات الألعاب والاشتراكات الرقمية بنظام تسليم فوري وبوابات دفع إلكتروني متعددة.',
            tags: ['Laravel', 'React', 'Payment Gateways', 'SaaS'],
            color: '#F59E0B',
        },
        {
            title: isEn ? 'Tower Top Group' : 'شركة تاور توب (Tower Top)',
            url: 'https://towertop-eg.com/',
            category: isEn ? 'Corporate & Investment Portal' : 'استثمار وخدمات مؤسسية',
            desc: isEn
                ? 'Modern corporate portal for Tower Top Services and Investments, crafted with high visual branding and swift responsiveness.'
                : 'موقع تعريفي وخدمي حديث لشركة تاور توب للخدمات والاستثمار، مصمم بأعلى معايير الهوية البصرية وسرعة التصفح.',
            tags: ['Corporate', 'UI/UX', 'SEO', 'Performance'],
            color: '#38BDF8',
        },
        {
            title: isEn ? 'Hossam Mansour System (World Champion)' : 'سيستم حسام منصور – بطل عالم كمال أجسام',
            url: 'https://team-hm.com/login',
            category: isEn ? 'Athlete Management & Training SaaS' : 'نظام إدارة وتدريب رياضي متكامل',
            desc: isEn
                ? 'Advanced training portal and dashboard for managing athlete memberships, tracking workout programs, and tailored nutrition regimens.'
                : 'بوابة تدريب متقدمة ولوحة تحكم احترافية لإدارة المشتركين، متابعة الجداول التدريبية، والأنظمة الغذائية المخصصة للأبطال.',
            tags: ['Custom SaaS', 'Auth & Security', 'Dashboard', 'Role Permissions'],
            color: '#D4A537',
        },
        {
            title: isEn ? 'Official Website of Hossam Mansour' : 'الموقع الرسمي للبطل حسام منصور',
            url: 'https://hossammansour.com/ar/',
            category: isEn ? 'Official Athlete Portfolio' : 'الموقع التعريفي الرسمي',
            desc: isEn
                ? 'Official bilingual brand platform showcasing champion achievements, international trophies, photo gallery, and coaching services.'
                : 'منصة رقمية تعريفية تستعرض إنجازات وبطولات كابتن حسام منصور العالمية، معرض الصور والنتائج والخدمات التدريبية.',
            tags: ['Personal Brand', 'Bilingual', 'Interactive UI'],
            color: '#F43F5E',
        },
        {
            title: isEn ? 'Saudi Society of Dermatology (SSDDS)' : 'الجمعية السعودية للأمراض الجلدية (SSDDS)',
            url: 'https://ssdds.org',
            category: isEn ? 'Medical Portal & Conferences' : 'بوابة طبية ومؤتمرات علمية',
            desc: isEn
                ? 'Official portal for the Saudi Society of Dermatology & Dermatologic Surgery, handling member registrations, international conferences, and scientific publications.'
                : 'البوابة الرقمية الرسمية للجمعية السعودية لأمراض وجراحة الجلد، لإدارة العضويات، المؤتمرات الدولية، والمنشورات العلمية.',
            tags: ['Medical Portal', 'Conference System', 'Enterprise'],
            color: '#10B981',
        },
        {
            title: isEn ? 'Al-Tawhid Supermarket' : 'سوبر ماركت التوحيد',
            url: 'https://altawhid.stackway.cloud',
            category: isEn ? 'Express E-Commerce' : 'متجر وتجارة إلكترونية سريعة',
            desc: isEn
                ? 'Complete retail e-commerce platform for grocery orders, real-time inventory management, and fast home delivery.'
                : 'متجر تسوق إلكتروني متكامل للطلبات الاستهلاكية وإدارة المخزون والتوصيل السريع للمنازل.',
            tags: ['E-Commerce', 'Order Tracking', 'Cart System'],
            color: '#8B5CF6',
        },
        {
            title: isEn ? 'Regalest Luxury Store' : 'المتجر الملكي (Regalest)',
            url: 'https://regalest.stackway.cloud',
            category: isEn ? 'Luxury Shopping Platform' : 'منصة تجارة وتسوق رقمي',
            desc: isEn
                ? 'Exclusive digital store for bespoke luxury gifts, featuring an ultra-smooth buying experience and high response speed.'
                : 'متجر رقمي فاخر للمنتجات والهدايا الحصرية، يتميز بتجربة مستخدم انسيابية وسرعة استجابة عالية.',
            tags: ['Luxury E-Commerce', 'High Speed', 'Responsive'],
            color: '#EC4899',
        },
    ];

    return (
        <MainLayout>
            <div style={{
                maxWidth: '1000px',
                margin: '0 auto',
                paddingBottom: '50px',
                direction: isRtl ? 'rtl' : 'ltr',
            }}>
                {/* Header Title */}
                <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                    <span style={{
                        fontSize: '13px',
                        fontWeight: '800',
                        color: isLight ? '#B45309' : 'var(--gold-400)',
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
                        color: isLight ? '#0F172A' : '#FFFFFF',
                        margin: '0 0 10px',
                    }}>
                        {isEn ? 'Engineering & Development of EMPEROR' : 'تنفيذ وبرمجة منصة إمبراطور'}
                    </h1>
                    <p style={{
                        color: isLight ? '#475569' : '#A0A0B0',
                        fontSize: '15px',
                        maxWidth: '600px',
                        margin: '0 auto',
                        lineHeight: '1.6',
                    }}>
                        {isEn
                            ? 'Engineered with modern, secure architecture to deliver ultra-fast digital top-up experiences'
                            : 'تم بناء وتطوير المنصة بأحدث المعايير البرمجية الآمنة لتقديم تجربة شحن رقمي فائقة السرعة'}
                    </p>
                </div>

                {/* Main Company & Portfolio Hero Card */}
                <div style={{
                    background: isLight ? '#FFFFFF' : 'linear-gradient(145deg, #161622 0%, #0E0E14 100%)',
                    border: isLight ? '1.5px solid rgba(212, 165, 55, 0.45)' : '1.5px solid rgba(212, 165, 55, 0.35)',
                    borderRadius: '26px',
                    padding: 'clamp(24px, 5vw, 40px)',
                    textAlign: 'center',
                    marginBottom: '40px',
                    boxShadow: isLight
                        ? '0 10px 40px rgba(30, 80, 140, 0.08), 0 0 30px rgba(212, 165, 55, 0.1)'
                        : '0 20px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(212, 165, 55, 0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    {/* Background glow */}
                    <div style={{
                        position: 'absolute',
                        top: '-50px',
                        right: '-50px',
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(212, 165, 55, 0.15) 0%, transparent 70%)',
                        pointerEvents: 'none',
                    }} />

                    {/* Company Logo or Metallic Badge */}
                    <div style={{
                        width: '90px',
                        height: '90px',
                        borderRadius: '22px',
                        background: isLight ? '#FEFCE8' : 'linear-gradient(135deg, #2A2415 0%, #151410 100%)',
                        border: '2px solid var(--gold-400)',
                        margin: '0 auto 18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 30px rgba(212, 165, 55, 0.25)',
                    }}>
                        <img src={companyInfo.logoUrl} alt={companyInfo.name} style={{ width: '82px', height: '76px', borderRadius: '14px', objectFit: 'contain' }} />
                    </div>

                    <h2 style={{
                        fontSize: '26px',
                        fontWeight: '900',
                        color: isLight ? '#0F172A' : 'var(--gold-200)',
                        margin: '0 0 6px',
                    }}>
                        {companyInfo.name}
                    </h2>
                    <p style={{
                        fontSize: '14px',
                        color: isLight ? '#B45309' : 'var(--gold-400)',
                        fontWeight: '800',
                        marginBottom: '14px',
                    }}>
                        {companyInfo.tagline}
                    </p>
                    <p style={{
                        fontSize: '14.5px',
                        color: isLight ? '#334155' : '#CBD5E1',
                        lineHeight: '1.8',
                        maxWidth: '700px',
                        margin: '0 auto 24px',
                    }}>
                        {companyInfo.description}
                    </p>

                    {/* Portfolio & WhatsApp Action Buttons */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: '12px',
                    }}>
                        <a
                            href={companyInfo.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '12px 24px',
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                color: '#0A0A0E',
                                fontWeight: '900',
                                fontSize: '14px',
                                textDecoration: 'none',
                                boxShadow: '0 8px 25px rgba(212, 165, 55, 0.35)',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <Globe size={18} />
                            <span>{isEn ? 'View Our Portfolio' : 'مشاهدة معرض أعمالنا (Portfolio)'}</span>
                            <ExternalLink size={15} />
                        </a>

                        <a
                            href="https://wa.me/201202325201"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '12px 22px',
                                borderRadius: '14px',
                                background: isLight ? '#DCFCE7' : 'rgba(34, 197, 94, 0.15)',
                                border: '1.5px solid rgba(34, 197, 94, 0.4)',
                                color: isLight ? '#15803D' : '#4ADE80',
                                fontWeight: '800',
                                fontSize: '14px',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <MessageCircle size={18} />
                            <span>{isEn ? 'Start a Project on WhatsApp' : 'طلب مشروع جديد عبر واتساب'}</span>
                        </a>
                    </div>
                </div>

                {/* Team Members Grid */}
                <div style={{ marginBottom: '44px' }}>
                    <h3 style={{
                        fontSize: '19px',
                        fontWeight: '900',
                        color: isLight ? '#0F172A' : '#FFFFFF',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}>
                        <span style={{ color: isLight ? '#B45309' : 'var(--gold-400)' }}>•</span>
                        <span>{isEn ? 'Software Engineering & Core Team' : 'فريق التطوير والهندسة البرمجية'}</span>
                    </h3>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                        gap: '20px',
                    }}>
                        {teamMembers.map((member, idx) => (
                            <div
                                key={idx}
                                style={{
                                    background: isLight ? '#FFFFFF' : 'linear-gradient(145deg, #14141C 0%, #0E0E14 100%)',
                                    border: isLight ? '1.5px solid rgba(212, 165, 55, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
                                    borderRadius: '22px',
                                    padding: '24px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    height: '100%',
                                    boxShadow: isLight ? '0 6px 20px rgba(30, 80, 140, 0.06)' : '0 10px 30px rgba(0, 0, 0, 0.4)',
                                    boxSizing: 'border-box',
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                                        <div style={{
                                            width: '54px',
                                            height: '54px',
                                            borderRadius: '16px',
                                            background: 'linear-gradient(135deg, #F8E8B8 0%, #D4A537 100%)',
                                            color: '#08080A',
                                            fontWeight: '900',
                                            fontSize: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                            boxShadow: '0 4px 15px rgba(212, 165, 55, 0.25)',
                                        }}>
                                            {member.avatar ? (
                                                <img src={member.avatar} alt={member.name} style={{ width: '100%', height: '100%', borderRadius: '16px', objectFit: 'cover' }} />
                                            ) : (
                                                member.name.charAt(0)
                                            )}
                                        </div>
                                        <div style={{ minWidth: 0, flex: 1 }}>
                                            <h4 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                                {member.name}
                                            </h4>
                                            <span style={{ fontSize: '12px', color: isLight ? '#B45309' : 'var(--gold-400)', fontWeight: '800', display: 'block' }}>
                                                {member.role}
                                            </span>
                                        </div>
                                    </div>

                                    <p style={{ fontSize: '13.5px', color: isLight ? '#475569' : '#94A3B8', lineHeight: '1.7', margin: '0 0 20px' }}>
                                        {member.bio}
                                    </p>
                                </div>

                                {/* Contacts Bar */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: '8px',
                                    paddingTop: '16px',
                                    borderTop: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.06)',
                                }}>
                                    {member.whatsapp && (
                                        <a
                                            href={member.whatsapp}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                padding: '7px 14px',
                                                borderRadius: '10px',
                                                background: isLight ? '#DCFCE7' : 'rgba(37, 211, 102, 0.12)',
                                                border: '1px solid rgba(37, 211, 102, 0.3)',
                                                color: isLight ? '#15803D' : '#25D366',
                                                fontSize: '12.5px',
                                                fontWeight: '800',
                                                textDecoration: 'none',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                transition: 'all 0.2s',
                                            }}
                                        >
                                            <MessageCircle size={15} />
                                            <span>{isEn ? 'WhatsApp' : 'واتساب'}</span>
                                        </a>
                                    )}

                                    {member.phone && (
                                        <a
                                            href={`tel:${member.phone}`}
                                            style={{
                                                padding: '7px 14px',
                                                borderRadius: '10px',
                                                background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                                border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                                                color: isLight ? '#334155' : '#E2E8F0',
                                                fontSize: '12px',
                                                fontWeight: '700',
                                                textDecoration: 'none',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                direction: 'ltr',
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
                                                padding: '7px 14px',
                                                borderRadius: '10px',
                                                background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                                border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                                                color: isLight ? '#334155' : '#E2E8F0',
                                                fontSize: '12px',
                                                fontWeight: '700',
                                                textDecoration: 'none',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                            }}
                                        >
                                            <Mail size={13} />
                                            <span>{isEn ? 'Email' : 'إيميل'}</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Our Projects Section */}
                <div ref={projectsSectionRef}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '12px',
                        marginBottom: '22px',
                    }}>
                        <h3 style={{
                            fontSize: '19px',
                            fontWeight: '900',
                            color: isLight ? '#0F172A' : '#FFFFFF',
                            margin: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}>
                            <span style={{ color: isLight ? '#B45309' : 'var(--gold-400)' }}>•</span>
                            <span>{isEn ? `Our Featured Projects (${ourProjects.length})` : `أعمالنا ومشاريعنا السابقة (${ourProjects.length})`}</span>
                        </h3>

                        <a
                            href={companyInfo.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                fontSize: '13px',
                                color: isLight ? '#B45309' : 'var(--gold-300)',
                                fontWeight: '800',
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                            }}
                        >
                            <span>{isEn ? 'View all projects in portfolio' : 'مشاهدة جميع المشاريع في البورتفوليو'}</span>
                            <ExternalLink size={14} />
                        </a>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                        gap: '20px',
                    }}>
                        {ourProjects.map((project, idx) => (
                            <div
                                key={idx}
                                style={{
                                    background: isLight ? '#FFFFFF' : 'linear-gradient(145deg, #14141B 0%, #0E0E14 100%)',
                                    border: isLight ? '1.5px solid rgba(212, 165, 55, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
                                    borderRadius: '22px',
                                    padding: '24px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    height: '100%',
                                    boxShadow: isLight ? '0 6px 20px rgba(30, 80, 140, 0.06)' : '0 8px 30px rgba(0, 0, 0, 0.35)',
                                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                                    boxSizing: 'border-box',
                                    minWidth: 0,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = project.color || 'var(--gold-400)';
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                    e.currentTarget.style.boxShadow = isLight
                                        ? `0 10px 25px rgba(30, 80, 140, 0.12), 0 0 15px ${project.color}33`
                                        : `0 14px 40px rgba(0,0,0,0.6), 0 0 25px ${project.color}22`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = isLight ? 'rgba(212, 165, 55, 0.35)' : 'rgba(255, 255, 255, 0.08)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = isLight ? '0 6px 20px rgba(30, 80, 140, 0.06)' : '0 8px 30px rgba(0, 0, 0, 0.35)';
                                }}
                            >
                                <div>
                                    {/* Category badge */}
                                    <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '4px 10px',
                                        borderRadius: '8px',
                                        background: `${project.color}15`,
                                        border: `1px solid ${project.color}35`,
                                        color: project.color,
                                        fontSize: '11.5px',
                                        fontWeight: '800',
                                        marginBottom: '12px',
                                    }}>
                                        <Sparkles size={12} />
                                        <span>{project.category}</span>
                                    </div>

                                    {/* Project Title */}
                                    <h4 style={{
                                        fontSize: '17px',
                                        fontWeight: '900',
                                        color: isLight ? '#0F172A' : '#FFFFFF',
                                        margin: '0 0 10px',
                                        lineHeight: '1.4',
                                    }}>
                                        {project.title}
                                    </h4>

                                    {/* Description */}
                                    <p style={{
                                        fontSize: '13px',
                                        color: isLight ? '#475569' : '#94A3B8',
                                        lineHeight: '1.7',
                                        margin: '0 0 16px',
                                    }}>
                                        {project.desc}
                                    </p>

                                    {/* Tags */}
                                    <div style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '6px',
                                        marginBottom: '20px',
                                    }}>
                                        {project.tags.map((tag, tIdx) => (
                                            <span
                                                key={tIdx}
                                                style={{
                                                    fontSize: '11px',
                                                    color: isLight ? '#334155' : '#CBD5E1',
                                                    background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                                    border: isLight ? '1px solid #E2E8F0' : 'none',
                                                    padding: '2px 8px',
                                                    borderRadius: '6px',
                                                    fontWeight: '700',
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Live Project Button */}
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        padding: '11px 16px',
                                        borderRadius: '12px',
                                        background: isLight ? '#FEFCE8' : 'rgba(212, 165, 55, 0.08)',
                                        border: isLight ? '1px solid rgba(212, 165, 55, 0.5)' : '1px solid rgba(212, 165, 55, 0.3)',
                                        color: isLight ? '#B45309' : 'var(--gold-200)',
                                        fontSize: '13.5px',
                                        fontWeight: '800',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)';
                                        e.currentTarget.style.color = '#0A0A0E';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = isLight ? '#FEFCE8' : 'rgba(212, 165, 55, 0.08)';
                                        e.currentTarget.style.color = isLight ? '#B45309' : 'var(--gold-200)';
                                    }}
                                >
                                    <span>{isEn ? 'Visit Live Project' : 'زيارة المشروع ومعاينته'}</span>
                                    <ExternalLink size={15} />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
