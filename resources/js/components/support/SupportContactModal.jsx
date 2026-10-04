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

export default function SupportContactModal({ isOpen, onClose }) {
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
            name: 'ضياء أشرف',
            role_badge: 'صاحب المنصة',
            badge_color: '#F59E0B',
            channel: 'whatsapp',
            phone: '01012286661',
            value: '01012286661',
        },
        {
            id: 'support-1',
            name: 'ياسمين',
            role_badge: 'خدمة العملاء',
            badge_color: '#38BDF8',
            channel: 'whatsapp',
            phone: '01201111390',
            value: '01201111390',
        },
        {
            id: 'support-2',
            name: 'فريق الدعم',
            role_badge: 'خدمة العملاء',
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
            const msg = encodeURIComponent('السلام عليكم ورحمة الله وبركاته، محتاج مساعدة بخصوص حسابي في منصة إمبراطور EMPEROR.');
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
        if (contact.role_badge) return contact.role_badge;
        const desc = (contact.description || '').trim();
        if (desc.includes('صاحب') || desc.includes('إدارة')) return 'صاحب المنصة';
        if (desc.includes('تارجت')) return 'قسم التارجت';
        if (desc.includes('فني') || desc.includes('شحن')) return 'الدعم الفني';
        return 'خدمة العملاء';
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
                backgroundColor: 'rgba(5, 5, 8, 0.82)',
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
                    background: rgba(18, 30, 24, 0.85) !important;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(34, 197, 94, 0.15);
                }
                .support-contact-btn {
                    transition: all 0.2s ease;
                }
                .support-contact-btn:hover {
                    background: #22C55E !important;
                    color: #050507 !important;
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
                    backgroundColor: '#0D0E12',
                    border: '1.5px solid rgba(34, 197, 94, 0.35)',
                    borderRadius: '24px',
                    padding: '24px 20px 22px',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(34, 197, 94, 0.12)',
                    animation: 'scaleUpModal 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    fontFamily: 'var(--font-cairo, Cairo, sans-serif)',
                    direction: 'rtl',
                    color: '#FFFFFF',
                }}
            >
                {/* Header: Close Button & Title */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                }}>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="إغلاق"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '36px',
                            height: '36px',
                            borderRadius: '12px',
                            background: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#A0A0B0',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#FFFFFF';
                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = '#A0A0B0';
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        }}
                    >
                        <X size={20} />
                    </button>

                    <h2 style={{
                        margin: 0,
                        fontSize: '18px',
                        fontWeight: '900',
                        color: '#FFFFFF',
                        letterSpacing: '-0.2px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                    }}>
                        <span>تواصل مع فريق</span>
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
                    margin: '0 0 20px',
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#9E9EA8',
                    textAlign: 'right',
                }}>
                    اختر الشخص الذي تريد التواصل معه عبر واتساب
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
                                    padding: '14px 16px',
                                    borderRadius: '18px',
                                    background: 'rgba(15, 18, 16, 0.75)',
                                    border: '1.5px solid rgba(34, 197, 94, 0.22)',
                                    gap: '12px',
                                }}
                            >
                                {/* Left: Action "تواصل" Button */}
                                <a
                                    href={targetUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="support-contact-btn"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '7px 18px',
                                        borderRadius: '12px',
                                        border: '1.5px solid #22C55E',
                                        color: '#4ADE80',
                                        background: 'transparent',
                                        fontSize: '13px',
                                        fontWeight: '800',
                                        textDecoration: 'none',
                                        cursor: 'pointer',
                                        flexShrink: 0,
                                    }}
                                >
                                    تواصل
                                </a>

                                {/* Right Group: Info & WhatsApp Icon */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    minWidth: 0,
                                    flex: 1,
                                }}>
                                    {/* Text Info (Name, Badge, Phone) */}
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '4px',
                                        minWidth: 0,
                                        flex: 1,
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            flexWrap: 'wrap',
                                        }}>
                                            <span style={{
                                                fontSize: '15px',
                                                fontWeight: '900',
                                                color: '#FFFFFF',
                                                whiteSpace: 'nowrap',
                                            }}>
                                                {contact.name}
                                            </span>
                                            {contact.role_badge && (
                                                <span style={{
                                                    fontSize: '11px',
                                                    fontWeight: '800',
                                                    color: contact.badge_color || (isPrimary ? '#F59E0B' : '#38BDF8'),
                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                    padding: '2px 8px',
                                                    borderRadius: '6px',
                                                    whiteSpace: 'nowrap',
                                                }}>
                                                    {contact.role_badge}
                                                </span>
                                            )}
                                        </div>

                                        {/* Phone */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            color: '#A0A0B0',
                                            fontSize: '13px',
                                            fontWeight: '700',
                                            direction: 'ltr',
                                            justifyContent: 'flex-end',
                                        }}>
                                            <span>{contact.phone || contact.value}</span>
                                            <Phone size={13} color="#22C55E" />
                                        </div>
                                    </div>

                                    {/* WhatsApp Circular Icon on Right */}
                                    <div style={{
                                        width: '44px',
                                        height: '44px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#FFFFFF',
                                        boxShadow: '0 0 16px rgba(34, 197, 94, 0.4)',
                                        flexShrink: 0,
                                    }}>
                                        <MessageCircle size={24} fill="#FFFFFF" color="#22C55E" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom VIP Note */}
                <div style={{
                    marginTop: '18px',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    color: '#6B7280',
                    fontSize: '12px',
                    fontWeight: '700',
                }}>
                    <ShieldCheck size={14} color="#22C55E" />
                    <span>فريق الدعم متواجد لخدمتك على مدار الساعة 24/7</span>
                </div>
            </div>
        </div>
    );
}
