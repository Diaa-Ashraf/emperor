import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Send, CheckCircle2, ShieldAlert, ArrowLeft, ArrowRight, UserCheck } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

export default function AccountIssuesPage() {
    const { user, isAuthenticated } = useAuth();
    const { isRtl, t, language } = useLanguage();
    const { theme } = useTheme();
    const isLight = theme === 'light';

    const issueTypes = [
        { id: 'login', key: 'issueLogin', label: 'تسجيل الدخول' },
        { id: 'activation', key: 'issueActivation', label: 'تفعيل الحساب' },
        { id: 'password', key: 'issuePassword', label: 'كلمة المرور' },
        { id: 'account_data', key: 'issueAccountData', label: 'بيانات الحساب' },
        { id: 'rejected_account', key: 'issueRejectedAccount', label: 'حساب مرفوض' },
        { id: 'wallet_topup', key: 'issueWalletTopUp', label: 'مشاكل شحن المحفظة' },
        { id: 'recharge_order', key: 'issueRechargeOrder', label: 'مشكلة في طلب شحن' },
        { id: 'target_sell', key: 'issueTargetSell', label: 'مشكلة في بيع التارجت' },
        { id: 'other', key: 'issueOther', label: 'أخرى' },
    ];

    const [selectedType, setSelectedType] = useState(issueTypes[0]);
    const [details, setDetails] = useState('');
    const [userPhone, setUserPhone] = useState(user?.phone || '');
    const [userEmail, setUserEmail] = useState(user?.email || '');

    // Typing animation
    const text = t('accountIssuesTitle', 'مشاكل الحساب');
    const [displayText, setDisplayText] = useState("");
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [index, setIndex] = useState(0);

    // Observe component visibility
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Reset typing animation on language change
    useEffect(() => {
        setIndex(0);
        setDisplayText('');
    }, [language]);

    // Typing effect runs while visible and not finished
    useEffect(() => {
        if (!isVisible) return;
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setIndex(i => i + 1);
            }, 30);
            return () => clearTimeout(timeout);
        }
    }, [isVisible, index, text]);

    // Update displayed text when index changes
    useEffect(() => {
        setDisplayText(text.slice(0, index));
    }, [index, text]);

    // Paragraph animation state
    const subText = t('accountIssuesSub', 'اختر مشكلة الحساب، وسنجهز رسالة واضحة ومباشرة لإرسالها لإدارة المنصة عبر واتساب.');
    const [subDisplay, setSubDisplay] = useState("");
    const [subIndex, setSubIndex] = useState(0);

    useEffect(() => {
        setSubIndex(0);
        setSubDisplay('');
    }, [language]);

    // Sub paragraph typing effect runs after heading finished
    useEffect(() => {
        if (!isVisible) return;
        if (index >= text.length && subIndex < subText.length) {
            const timeout = setTimeout(() => {
                setSubIndex(i => i + 1);
            }, 15);
            return () => clearTimeout(timeout);
        }
    }, [isVisible, index, subIndex, text, subText]);

    // Update displayed sub paragraph text
    useEffect(() => {
        setSubDisplay(subText.slice(0, subIndex));
    }, [subIndex, subText]);

    // WhatsApp Support Number
    const whatsappSupportNumber = '201026042456';

    const selectedLabel = t(selectedType.key, selectedType.label);

    // Live Message Construction
    const formattedMessage = language === 'en'
        ? `*Technical Support Message - Emperor Platform*
----------------------------------------
*Issue Type:* ${selectedLabel}
*Issue Details:* ${details.trim() || 'No additional details provided'}
*Email:* ${userEmail.trim() || (user?.email || 'Not specified')}
*Phone:* ${userPhone.trim() || (user?.phone || 'Not specified')}
*Account ID:* ${user?.id ? `EMP-${user.id}` : 'Guest / Unregistered'}
----------------------------------------
_Sent via Official Account Issues Page_`
        : `*رسالة دعم فني إلى إدارة منصة إمبراطور*
----------------------------------------
*نوع الشكوى:* ${selectedLabel}
*تفاصيل المشكلة:* ${details.trim() || 'لم تتم كتابة تفاصيل إضافية'}
*البريد الإلكتروني:* ${userEmail.trim() || (user?.email || 'غير محدد')}
*رقم الهاتف:* ${userPhone.trim() || (user?.phone || 'غير محدد')}
*معرّف الحساب:* ${user?.id ? `EMP-${user.id}` : 'زائر / غير مسجل'}
----------------------------------------
_مرسل عبر صفحة مشاكل الحساب الرسمية_`;

    const handleSendWhatsApp = (e) => {
        e.preventDefault();
        const encoded = encodeURIComponent(formattedMessage);
        const url = `https://wa.me/${whatsappSupportNumber}?text=${encoded}`;
        window.open(url, '_blank');
    };

    return (
        <MainLayout>
            <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '40px' }}>
                {/* Header Back Bar */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '24px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#8E8E98' }}>
                        <Link to="/" style={{ color: 'var(--gold-400)', textDecoration: 'none' }}>{t('home', 'الرئيسية')}</Link>
                        <span>/</span>
                        <span style={{ color: '#CBD5E1' }}>{t('complaintsCenter', 'مشاكل الحساب والشكاوى')}</span>
                    </div>

                    <Link
                        to="/"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#D1D1DB',
                            fontSize: '13px',
                            fontWeight: '600',
                            textDecoration: 'none',
                        }}
                    >
                        <span>{t('back', 'العودة للرئيسية')}</span>
                        {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                    </Link>
                </div>

                <div className="responsive-grid-2col" style={{
                    gap: '24px',
                    alignItems: 'start',
                }}>
                    {/* Left Form: Select Issue & Input Details */}
                    <div style={{
                        background: isLight ? '#FFFFFF' : 'linear-gradient(145deg, #14141A 0%, #0D0D12 100%)',
                        border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(212, 165, 55, 0.3)',
                        borderRadius: '24px',
                        padding: '28px',
                        boxShadow: isLight ? '0 4px 20px rgba(0,0,0,0.05)' : '0 12px 40px rgba(0,0,0,0.5)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '4px 12px',
                                borderRadius: '10px',
                                background: isLight ? '#DCFCE7' : 'rgba(37, 211, 102, 0.12)',
                                border: '1px solid rgba(37, 211, 102, 0.3)',
                                color: isLight ? '#15803D' : '#25D366',
                                fontSize: '12px',
                                fontWeight: '700',
                            }}>
                                <MessageCircle size={14} />
                                <span>{t('complaintsAndFastContact', 'الشكاوى والتواصل السريع')}</span>
                            </div>
                        </div>

                        <h1
                            ref={sectionRef}
                            style={{
                                fontSize: '24px',
                                fontWeight: '900',
                                color: isLight ? '#0F172A' : '#FFFFFF',
                                margin: '0 0 8px',
                            }}>
                            {displayText || text}
                        </h1>
                        <p
                            style={{
                                color: isLight ? '#475569' : '#9E9EA8',
                                fontSize: '13.5px',
                                margin: '0 0 24px',
                                lineHeight: '1.6',
                            }}>
                            {subDisplay || subText}
                        </p>

                        {/* Issue Type Chips */}
                        <div style={{ marginBottom: '22px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '13px',
                                fontWeight: '800',
                                color: isLight ? '#B45309' : 'var(--gold-400)',
                                marginBottom: '10px',
                            }}>
                                {t('selectIssueType', 'اختر نوع الشكوى')}
                            </label>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                                gap: '8px',
                            }}>
                                {issueTypes.map((type) => {
                                    const isSelected = selectedType.id === type.id;
                                    const label = t(type.key, type.label);
                                    return (
                                        <button
                                            key={type.id}
                                            type="button"
                                            onClick={() => setSelectedType(type)}
                                            style={{
                                                padding: '10px 12px',
                                                borderRadius: '12px',
                                                background: isSelected
                                                    ? (isLight ? '#FEF3C7' : 'rgba(212, 165, 55, 0.18)')
                                                    : (isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)'),
                                                border: `1.5px solid ${isSelected ? (isLight ? '#D4A537' : 'var(--gold-400)') : (isLight ? '#CBD5E1' : 'rgba(255, 255, 255, 0.08)')}`,
                                                color: isSelected ? (isLight ? '#92400E' : 'var(--gold-100)') : (isLight ? '#334155' : '#CBD5E1'),
                                                fontSize: '12.5px',
                                                fontWeight: isSelected ? '800' : '600',
                                                cursor: 'pointer',
                                                textAlign: 'center',
                                                transition: 'all 0.2s ease',
                                                fontFamily: 'var(--font-cairo)',
                                            }}
                                        >
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Details Textarea */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '13px',
                                fontWeight: '800',
                                color: isLight ? '#B45309' : 'var(--gold-400)',
                                marginBottom: '8px',
                            }}>
                                {t('complaintOrDetails', 'الشكوى أو تفاصيل الرسالة')}
                            </label>
                            <textarea
                                rows={4}
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                                placeholder={t('complaintDetailsPlaceholder', 'اكتب تفاصيل الشكوى أو المشكلة التي تواجهك داخل الموقع هنا...')}
                                style={{
                                    width: '100%',
                                    background: isLight ? '#F8FAFC' : '#0B0B0E',
                                    border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                                    borderRadius: '14px',
                                    padding: '14px',
                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                    fontSize: '13.5px',
                                    fontFamily: 'var(--font-cairo)',
                                    outline: 'none',
                                    resize: 'vertical',
                                    lineHeight: '1.6',
                                    boxSizing: 'border-box',
                                }}
                            />
                        </div>

                        {/* Optional Phone / Email Inputs if not logged in */}
                        {!isAuthenticated && (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '12px',
                                marginBottom: '20px',
                            }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', color: isLight ? '#475569' : '#A0A0B0', marginBottom: '6px' }}>{t('yourPhoneNumber', 'رقم هاتفك:')}</label>
                                    <input
                                        type="text"
                                        placeholder="010xxxxxxxx"
                                        value={userPhone}
                                        onChange={(e) => setUserPhone(e.target.value)}
                                        style={{
                                            width: '100%',
                                            background: isLight ? '#F8FAFC' : '#0B0B0E',
                                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.1)',
                                            borderRadius: '10px',
                                            padding: '10px 12px',
                                            color: isLight ? '#0F172A' : '#FFF',
                                            fontSize: '13px',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', color: isLight ? '#475569' : '#A0A0B0', marginBottom: '6px' }}>{t('emailAddress', 'البريد الإلكتروني:')}</label>
                                    <input
                                        type="email"
                                        placeholder="example@email.com"
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}
                                        style={{
                                            width: '100%',
                                            background: isLight ? '#F8FAFC' : '#0B0B0E',
                                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.1)',
                                            borderRadius: '10px',
                                            padding: '10px 12px',
                                            color: isLight ? '#0F172A' : '#FFF',
                                            fontSize: '13px',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="button"
                            onClick={handleSendWhatsApp}
                            className="emperor-btn-primary"
                            style={{
                                width: '100%',
                                padding: '14px',
                                borderRadius: '14px',
                                fontSize: '15px',
                                fontWeight: '800',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                            }}
                        >
                            <Send size={18} />
                            <span>{t('sendMessageToManagement', 'إرسال الرسالة إلى إدارة الموقع')}</span>
                        </button>
                    </div>

                    {/* Right Side: Live Message Preview Card */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{
                            background: isLight ? '#FFFFFF' : 'linear-gradient(145deg, #121218 0%, #0A0A0E 100%)',
                            border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(212, 165, 55, 0.2)',
                            borderRadius: '24px',
                            padding: '24px',
                            boxShadow: isLight ? '0 4px 20px rgba(0,0,0,0.05)' : '0 8px 30px rgba(0,0,0,0.5)',
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '16px',
                                borderBottom: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                                paddingBottom: '12px',
                            }}>
                                <h3 style={{
                                    margin: 0,
                                    fontSize: '16px',
                                    fontWeight: '800',
                                    color: isLight ? '#B45309' : 'var(--gold-200)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                }}>
                                    <span>{t('messagePreview', 'معاينة الرسالة')}</span>
                                </h3>
                                <span style={{ fontSize: '11px', color: isLight ? '#64748B' : '#8E8E98' }}>{t('realtimeUpdateTyping', 'تحديث لحظي أثناء الكتابة')}</span>
                            </div>

                            <p style={{
                                fontSize: '12.5px',
                                color: isLight ? '#475569' : '#A0A0B0',
                                margin: '0 0 16px',
                                lineHeight: '1.6',
                            }}>
                                {t('whatsappFormatNotice', 'سيظهر النص بهذا الشكل لصاحب الموقع داخل واتساب:')}
                            </p>

                            {/* Message Box */}
                            <div style={{
                                background: isLight ? '#F8FAFC' : '#050508',
                                border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(212, 165, 55, 0.25)',
                                borderRadius: '16px',
                                padding: '18px',
                                fontFamily: 'var(--font-cairo)',
                                fontSize: '13px',
                                color: isLight ? '#0F172A' : '#E2E8F0',
                                lineHeight: '1.8',
                                whiteSpace: 'pre-line',
                            }}>
                                <div style={{ fontWeight: '800', color: isLight ? '#B45309' : 'var(--gold-300)', marginBottom: '8px' }}>
                                    {language === 'en' ? 'Message to Platform Support' : 'رسالة إلى صاحب الموقع'}
                                </div>
                                <div style={{ color: isLight ? '#334155' : '#CBD5E1' }}>
                                    <strong>{language === 'en' ? 'Issue Type:' : 'نوع الشكوى:'}</strong> {selectedLabel}
                                </div>
                                <div style={{ color: isLight ? '#334155' : '#CBD5E1', marginTop: '4px' }}>
                                    <strong>{language === 'en' ? 'Issue Details:' : 'تفاصيل المشكلة:'}</strong> {details.trim() || '—'}
                                </div>
                                <div style={{ color: isLight ? '#64748B' : '#94A3B8', marginTop: '4px', fontSize: '12px' }}>
                                    <strong>{language === 'en' ? 'Account Details:' : 'بيانات الحساب:'}</strong> {user?.name ? `${user.name} (ID: EMP-${user.id})` : (userPhone || userEmail || (language === 'en' ? 'Guest' : 'زائر'))}
                                </div>
                            </div>
                        </div>

                        {/* WhatsApp Dispatch Guarantee Card */}
                        <div style={{
                            background: isLight ? '#DCFCE7' : 'rgba(37, 211, 102, 0.06)',
                            border: isLight ? '1px solid #86EFAC' : '1px solid rgba(37, 211, 102, 0.25)',
                            borderRadius: '20px',
                            padding: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px',
                        }}>
                            <div style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '14px',
                                background: isLight ? '#BBF7D0' : 'rgba(37, 211, 102, 0.15)',
                                color: isLight ? '#15803D' : '#25D366',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                            }}>
                                <MessageCircle size={24} />
                            </div>
                            <div>
                                <h4 style={{ margin: '0 0 3px', fontSize: '14px', fontWeight: '800', color: isLight ? '#14532D' : '#FFFFFF' }}>
                                    {t('whatsappDirectSupport', 'سيتم فتح واتساب برسالة موجهة لصاحب الموقع')}
                                </h4>
                                <span style={{ fontSize: '12px', color: isLight ? '#166534' : '#A0A0B0' }}>
                                    {t('technicalSupportPromise', 'فريق الدعم الفني متواجد لمساعدتك وحل أي مشكلة تقنية فوراً')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

