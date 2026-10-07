import React, { useEffect, useState } from 'react';
import {
    X,
    Phone,
    MessageCircle,
    Send,
    Mail,
    ExternalLink,
    Crown,
    Sparkles,
    ShieldCheck,
    Check
} from 'lucide-react';
import { supportApi } from '../../api/endpoints';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

export default function SupportContactModal({ isOpen, onClose }) {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const { language, isRtl } = useLanguage();
    const isEn = language === 'en';

    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Escape listener & body lock
    useEffect(() => {
        if (!isOpen) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    // Fetch contacts when opened
    useEffect(() => {
        if (!isOpen) return;

        let isMounted = true;
        const fetchContacts = async () => {
            setLoading(true);
            try {
                const res = await supportApi.getSupportContacts();
                const data = res.data?.data || res.data || [];
                if (isMounted) {
                    setContacts(Array.isArray(data) ? data : []);
                }
            } catch (err) {
                console.error('Error fetching support contacts for modal:', err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchContacts();
        return () => {
            isMounted = false;
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const defaultContacts = [
        {
            id: 'owner',
            name: isEn ? 'Diaa Ashraf' : 'ضياء أشرف',
            role_badge: isEn ? 'Platform Owner' : 'صاحب المنصة',
            badge_color: '#F59E0B',
            channel: 'whatsapp',
            phone: '01012286661',
            value: '01012286661',
        },
        {
            id: 'support-1',
            name: isEn ? 'Yasmine' : 'ياسمين',
            role_badge: isEn ? 'Customer Support' : 'خدمة العملاء',
            badge_color: '#38BDF8',
            channel: 'whatsapp',
            phone: '01201111390',
            value: '01201111390',
        },
        {
            id: 'support-2',
            name: isEn ? 'Support Team' : 'فريق الدعم',
            role_badge: isEn ? 'Customer Support' : 'خدمة العملاء',
            badge_color: '#34D399',
            channel: 'whatsapp',
            phone: '01013669339',
            value: '01013669339',
        },
    ];

    const getActionUrl = (contact) => {
        const val = (contact.value || contact.phone || '').trim();
        const ch = (contact.channel || '').toLowerCase();

        if (ch.includes('whatsapp') || val.startsWith('+') || /^[0-9]+$/.test(val.replace(/[\s+-]/g, ''))) {
            const clean = val.replace(/[^0-9]/g, '');
            const phone = clean.startsWith('01') ? `20${clean.substring(1)}` : clean;
            const msg = isEn
                ? encodeURIComponent('Hello, I need assistance regarding my EMPEROR account.')
                : encodeURIComponent('السلام عليكم ورحمة الله وبركاته، محتاج مساعدة بخصوص حسابي في منصة إمبراطور EMPEROR.');
            return `https://wa.me/${phone}?text=${msg}`;
        }
        if (ch.includes('telegram') || val.includes('t.me')) {
            return val.startsWith('http') ? val : `https://t.me/${val.replace('@', '')}`;
        }
        if (ch.includes('email') || val.includes('@')) {
            return `mailto:${val}`;
        }
        return val.startsWith('http') ? val : `https://${val}`;
    };

    const getContactBadge = (contact, idx) => {
        let badge = contact.role_badge;
        if (!badge) {
            const desc = (contact.description || '').trim();
            if (desc.includes('صاحب') || desc.includes('إدارة')) badge = 'صاحب المنصة';
            else if (desc.includes('تارجت')) badge = 'قسم التارجت';
            else if (desc.includes('فني') || desc.includes('شحن')) badge = 'الدعم الفني';
            else badge = 'خدمة العملاء';
        }
        if (isEn) {
            if (badge === 'صاحب المنصة') return 'Platform Owner';
            if (badge === 'قسم التارجت') return 'Target Support';
            if (badge === 'الدعم الفني') return 'Technical Support';
            if (badge === 'خدمة العملاء') return 'Customer Support';
        }
        return badge;
    };

    const displayContacts = contacts.length > 0
        ? contacts.map((c, idx) => ({
            ...c,
            phone: c.value ? c.value.replace(/[^0-9+]/g, '') : '',
            role_badge: getContactBadge(c, idx),
            badge_color: idx === 0 ? '#F59E0B' : (idx % 2 === 1 ? '#38BDF8' : '#34D399'),
        }))
        : defaultContacts;

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                backgroundColor: isLight ? 'rgba(15, 23, 42, 0.65)' : 'rgba(5, 5, 8, 0.82)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                animation: 'fadeInModal 0.25s ease-out forwards',
            }}
        >
            <style>{`
                @keyframes fadeInModal {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleUpModal {
                    from { opacity: 0; transform: scale(0.94) translateY(12px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                .support-contact-card {
                    transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .support-contact-card:hover {
                    border-color: rgba(34, 197, 94, 0.6) !important;
                    background: ${isLight ? '#FEFCE8' : 'rgba(18, 30, 24, 0.85)'} !important;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(34, 197, 94, 0.15);
                }
                .support-contact-btn {
                    transition: all 0.2s ease;
                }
                .support-contact-btn:hover {
                    background: #22C55E !important;
                    color: #FFFFFF !important;
                    box-shadow: 0 0 16px rgba(34, 197, 94, 0.4);
                }
            `}</style>

            {/* Modal Box */}
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '460px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    backgroundColor: isLight ? '#FFFFFF' : '#0D0E12',
                    border: isLight ? '1.5px solid rgba(212, 165, 55, 0.45)' : '1.5px solid rgba(34, 197, 94, 0.35)',
                    borderRadius: '24px',
                    padding: 'clamp(16px, 4vw, 24px)',
                    boxShadow: isLight
                        ? '0 20px 60px rgba(0, 0, 0, 0.12), 0 0 30px rgba(212, 165, 55, 0.1)'
                        : '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(34, 197, 94, 0.12)',
                    animation: 'scaleUpModal 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    fontFamily: 'var(--font-cairo, Cairo, sans-serif)',
                    direction: isRtl ? 'rtl' : 'ltr',
                    color: isLight ? '#0F172A' : '#FFFFFF',
                    boxSizing: 'border-box',
                }}
            >
                {/* Header: Close Button & Title */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                    gap: '10px',
                }}>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label={isEn ? "Close" : "إغلاق"}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '36px',
                            height: '36px',
                            borderRadius: '12px',
                            background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.06)',
                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.1)',
                            color: isLight ? '#475569' : '#A0A0B0',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            flexShrink: 0,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#FFFFFF';
                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.85)';
                            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.9)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = isLight ? '#475569' : '#A0A0B0';
                            e.currentTarget.style.background = isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.06)';
                            e.currentTarget.style.borderColor = isLight ? '#CBD5E1' : 'rgba(255, 255, 255, 0.1)';
                        }}
                    >
                        <X size={20} />
                    </button>

                    <h2 style={{
                        margin: 0,
                        fontSize: 'clamp(16px, 4vw, 18px)',
                        fontWeight: '900',
                        color: isLight ? '#0F172A' : '#FFFFFF',
                        letterSpacing: '-0.2px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                    }}>
                        <span>{isEn ? 'Contact Team' : 'تواصل مع فريق'}</span>
                        <span style={{
                            background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            EMPEROR
                        </span>
                    </h2>
                </div>

                {/* Subtitle */}
                <p style={{
                    margin: '0 0 18px',
                    fontSize: '13.5px',
                    fontWeight: '700',
                    color: isLight ? '#475569' : '#9E9EA8',
                    textAlign: isRtl ? 'right' : 'left',
                }}>
                    {isEn ? 'Choose the channel or representative to contact directly:' : 'اختر القناة أو الشخص الذي تريد التواصل معه مباشرة:'}
                </p>

                {/* Contact List */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                }}>
                    {displayContacts.map((contact, idx) => {
                        const targetUrl = getActionUrl(contact);
                        const isPrimary = idx === 0;

                        return (
                            <div
                                key={contact.id || idx}
                                className="support-contact-card"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '12px 14px',
                                    borderRadius: '16px',
                                    background: isLight ? '#FFFFFF' : 'rgba(15, 18, 16, 0.75)',
                                    border: isLight ? '1.5px solid rgba(212, 165, 55, 0.35)' : '1.5px solid rgba(34, 197, 94, 0.22)',
                                    gap: '10px',
                                    boxSizing: 'border-box',
                                    width: '100%',
                                }}
                            >
                                {/* Action "تواصل / Contact" Button */}
                                <a
                                    href={targetUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="support-contact-btn"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '7px 16px',
                                        borderRadius: '10px',
                                        border: '1.5px solid #22C55E',
                                        color: '#FFFFFF',
                                        background: '#22C55E',
                                        fontSize: '13px',
                                        fontWeight: '900',
                                        textDecoration: 'none',
                                        cursor: 'pointer',
                                        flexShrink: 0,
                                        boxShadow: '0 2px 8px rgba(34, 197, 94, 0.3)',
                                    }}
                                >
                                    {isEn ? 'Contact' : 'تواصل'}
                                </a>

                                {/* Info & WhatsApp Icon */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    minWidth: 0,
                                    flex: 1,
                                    justifyContent: isRtl ? 'flex-end' : 'flex-start',
                                    flexDirection: isRtl ? 'row' : 'row-reverse',
                                }}>
                                    {/* Text Info (Name, Badge, Phone) */}
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '3px',
                                        minWidth: 0,
                                        flex: 1,
                                        textAlign: isRtl ? 'right' : 'left',
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: isRtl ? 'flex-start' : 'flex-start',
                                            gap: '6px',
                                            flexWrap: 'wrap',
                                        }}>
                                            <span style={{
                                                fontSize: '13.5px',
                                                fontWeight: '900',
                                                color: isLight ? '#0F172A' : '#FFFFFF',
                                                lineHeight: '1.4',
                                                wordBreak: 'break-word',
                                            }}>
                                                {contact.name}
                                            </span>
                                            {contact.role_badge && (
                                                <span style={{
                                                    fontSize: '10.5px',
                                                    fontWeight: '800',
                                                    color: contact.badge_color || (isPrimary ? (isLight ? '#B45309' : '#F59E0B') : (isLight ? '#0369A1' : '#38BDF8')),
                                                    background: isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.06)',
                                                    padding: '2px 7px',
                                                    borderRadius: '6px',
                                                    whiteSpace: 'nowrap',
                                                }}>
                                                    {contact.role_badge}
                                                </span>
                                            )}
                                        </div>

                                        {/* Phone or ID */}
                                        {(contact.phone || contact.value) && (
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                                color: isLight ? '#475569' : '#A0A0B0',
                                                fontSize: '12px',
                                                fontWeight: '700',
                                                direction: 'ltr',
                                                justifyContent: isRtl ? 'flex-end' : 'flex-start',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}>
                                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {contact.phone || contact.value}
                                                </span>
                                                <Phone size={11} color="#22C55E" style={{ flexShrink: 0 }} />
                                            </div>
                                        )}
                                    </div>

                                    {/* WhatsApp Circular Icon */}
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#FFFFFF',
                                        boxShadow: '0 0 14px rgba(34, 197, 94, 0.35)',
                                        flexShrink: 0,
                                    }}>
                                        <MessageCircle size={20} fill="#FFFFFF" color="#22C55E" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom VIP Note */}
                <div style={{
                    marginTop: '16px',
                    paddingTop: '12px',
                    borderTop: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    color: isLight ? '#64748B' : '#6B7280',
                    fontSize: '11.5px',
                    fontWeight: '700',
                }}>
                    <ShieldCheck size={14} color="#22C55E" />
                    <span>{isEn ? 'Support team available 24/7 to assist you' : 'فريق الدعم متواجد لخدمتك على مدار الساعة 24/7'}</span>
                </div>
            </div>
        </div>
    );
}

