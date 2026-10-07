import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Gift,
    Users,
    UserPlus,
    DollarSign,
    Copy,
    Check,
    Share2,
    MessageCircle,
    Send,
    Sparkles,
    ShieldCheck,
    ArrowLeft,
    FileText,
    TrendingUp,
    Clock,
    Link as LinkIcon,
    Globe,
    Share
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Pagination from '../components/ui/Pagination';
import Modal from '../components/ui/Modal';
import { referralsApi } from '../api/endpoints';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

export default function ReferralsPage() {
    const { user } = useAuth();
    const { success } = useToast();
    const { t, isRtl, language } = useLanguage();
    const { theme } = useTheme();
    const isLight = theme === 'light';

    const [activeTab, setActiveTab] = useState('code'); // 'code' | 'sub_agent'
    const [stats, setStats] = useState(null);
    const [invitedUsers, setInvitedUsers] = useState([]);
    const [loadingStats, setLoadingStats] = useState(true);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [meta, setMeta] = useState(null);

    const [copiedCode, setCopiedCode] = useState(false);
    const [copiedLink, setCopiedLink] = useState(false);
    const [shareModalOpen, setShareModalOpen] = useState(false);

    useEffect(() => {
        setLoadingStats(true);
        referralsApi.getStats()
            .then(res => {
                if (res?.data) {
                    setStats(res.data);
                }
            })
            .catch(() => { })
            .finally(() => setLoadingStats(false));
    }, []);

    useEffect(() => {
        setLoadingUsers(true);
        referralsApi.getInvitedUsers({ page: currentPage })
            .then(res => {
                if (res?.data?.data) {
                    setInvitedUsers(res.data.data);
                    setMeta(res.data.meta || { current_page: currentPage, last_page: res.data.last_page || 1, total: res.data.total });
                } else if (Array.isArray(res?.data)) {
                    setInvitedUsers(res.data);
                }
            })
            .catch(() => {
                setInvitedUsers([]);
            })
            .finally(() => setLoadingUsers(false));
    }, [currentPage]);

    const referralCode = stats?.referral_code || user?.referral_code || (user?.id ? `CTW${user.id}GY7YAW` : 'CTW6GY7YAW');
    const referralLink = stats?.referral_link || `${window.location.origin}/register?ref=${referralCode}`;
    const totalEarned = Number(stats?.total_earned || 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    const totalInvited = Number(stats?.total_invited || 0);

    const handleCopyCode = () => {
        navigator.clipboard.writeText(referralCode);
        setCopiedCode(true);
        success(t('copied', 'تم النسخ بنجاح!'));
        setTimeout(() => setCopiedCode(false), 2500);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(referralLink);
        setCopiedLink(true);
        success(t('copied', 'تم النسخ بنجاح!'));
        setTimeout(() => setCopiedLink(false), 2500);
    };

    const shareMessage = language === 'en'
        ? `Join Emperor platform now for game and app top-ups and receive instant rewards! Register via: ${referralLink}`
        : `انضم الآن إلى منصة إمبراطور لشحن الألعاب والتطبيقات واستلم عروض وهدايا فورية! سجل عبر الرابط التالي: ${referralLink}`;

    const handleWhatsAppShare = () => {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`, '_blank');
    };

    const handleTelegramShare = () => {
        window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(language === 'en' ? 'Register on Emperor platform and top up games at the best prices!' : 'سجل في منصة إمبراطور واشحن ألعابك بأفضل الأسعار!')}`, '_blank');
    };

    const handleNativeShare = () => {
        setShareModalOpen(true);
    };

    const handleSystemShare = () => {
        if (navigator.share) {
            navigator.share({
                title: language === 'en' ? 'Emperor Top-up Platform' : 'منصة إمبراطور للشحن الرقمي',
                text: shareMessage,
                url: referralLink,
            }).catch(() => {});
        } else {
            handleCopyLink();
        }
    };

    return (
        <MainLayout>
            {/* Top Navigation & Back button */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
            }}>
                <Link
                    to="/"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.06)',
                        border: isLight ? '1px solid #E2E8F0' : '1px solid var(--border-medium)',
                        borderRadius: '20px',
                        padding: '6px 16px',
                        fontSize: '13px',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                        textDecoration: 'none',
                    }}
                >
                    <span>{t('back', 'رجوع')}</span>
                    <ArrowLeft size={16} />
                </Link>
            </div>

            {/* Top Referral Hero Poster Banner */}
            <div style={{
                background: isLight ? '#FFFFFF' : 'linear-gradient(135deg, #1C1917 0%, #2A1F0D 50%, #151108 100%)',
                border: isLight ? '1.5px solid rgba(212, 165, 55, 0.4)' : '1px solid rgba(212, 165, 55, 0.4)',
                borderRadius: '24px',
                padding: '24px',
                marginBottom: '20px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: isLight ? '0 8px 24px rgba(0, 0, 0, 0.05)' : '0 10px 30px rgba(0, 0, 0, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '20px',
            }}>
                <div style={{ zIndex: 1, maxWidth: '480px' }}>
                    <span style={{
                        display: 'inline-block',
                        background: 'linear-gradient(135deg, #F3E5AB 0%, #D4A537 100%)',
                        color: '#000',
                        fontSize: '11px',
                        fontWeight: '900',
                        padding: '3px 10px',
                        borderRadius: '12px',
                        marginBottom: '8px',
                    }}>
                        {t('referrals', 'رابط الإحالة')}
                    </span>
                    <h2 style={{ margin: '0 0 8px', fontSize: '26px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', lineHeight: 1.2 }}>
                        {t('referralTitle', 'اكسب فلوس واسحبها')}
                    </h2>
                    <p style={{ margin: 0, fontSize: '13.5px', color: isLight ? '#475569' : '#CBD5E1', lineHeight: 1.5 }}>
                        {language === 'en' ? 'Earn from your phone • Instant cashout • 24/7 support' : 'فايدك من التلفون • سحب فوري كاش • دعم فني على مدار الساعة'}
                    </p>
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    zIndex: 1,
                }}>
                    <div style={{
                        width: '58px',
                        height: '58px',
                        borderRadius: '18px',
                        background: 'rgba(212, 165, 55, 0.2)',
                        border: '1px solid rgba(212, 165, 55, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#D4A537',
                    }}>
                        <Gift size={32} />
                    </div>
                </div>
            </div>

            {/* 2 Tabs Switcher (كود الإحالة vs وكيل فرعي) */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '4px',
                background: isLight ? '#F1F5F9' : 'var(--bg-card, #12131A)',
                border: isLight ? '1px solid #E2E8F0' : '1px solid var(--border-medium, rgba(255, 255, 255, 0.08))',
                borderRadius: '16px',
                padding: '4px',
                marginBottom: '24px',
            }}>
                {/* Referral Code Tab */}
                <button
                    onClick={() => setActiveTab('code')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px',
                        borderRadius: '12px',
                        background: activeTab === 'code'
                            ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                            : 'transparent',
                        color: activeTab === 'code' ? '#0D0D0F' : 'var(--text-secondary, #94a3b8)',
                        border: 'none',
                        fontSize: '14.5px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                    }}
                >
                    <Gift size={18} />
                    <span>{t('referralCode', 'كود الإحالة')}</span>
                </button>

                {/* Sub Agent Tab */}
                <button
                    onClick={() => setActiveTab('sub_agent')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px',
                        borderRadius: '12px',
                        background: activeTab === 'sub_agent'
                            ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                            : 'transparent',
                        color: activeTab === 'sub_agent' ? '#0D0D0F' : 'var(--text-secondary, #94a3b8)',
                        border: 'none',
                        fontSize: '14.5px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                    }}
                >
                    <UserPlus size={18} />
                    <span>{t('subAgent', 'وكيل فرعي')}</span>
                </button>
            </div>

            {/* Main Invite Box (شارك واربح - دعوتك الخاصة) */}
            <div style={{
                background: 'var(--bg-card, #FFFFFF)',
                border: '1px solid var(--border-medium, rgba(0, 0, 0, 0.08))',
                borderRadius: '24px',
                padding: '24px',
                marginBottom: '24px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            }}>
                {/* Header Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        background: 'rgba(212, 165, 55, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#D4A537',
                    }}>
                        <Gift size={22} />
                    </div>

                    <div style={{ textAlign: isRtl ? 'right' : 'left', flex: 1, padding: isRtl ? '0 14px 0 0' : '0 0 0 14px' }}>
                        <span style={{ fontSize: '12px', color: '#D4A537', fontWeight: '800', display: 'block' }}>
                            {t('shareEarn', 'شارك واربح')}
                        </span>
                        <h3 style={{ margin: '2px 0 0', fontSize: '19px', fontWeight: '900', color: 'var(--text-primary)' }}>
                            {t('yourInvite', 'دعوتك الخاصة')}
                        </h3>
                        <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary, #64748b)' }}>
                            {t('inviteDescription', 'انسخ الكود أو الرابط وشاركه مع أصدقائك')}
                        </p>
                    </div>
                </div>

                {/* Box 1: Referral Code */}
                <div style={{
                    background: 'rgba(56, 189, 248, 0.08)',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    borderRadius: '18px',
                    padding: '16px 20px',
                    marginBottom: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary, #64748b)', fontWeight: '700' }}>
                        {t('referralCode', 'كود الدعوة')}
                    </span>
                    <div style={{
                        fontSize: '24px',
                        fontWeight: '900',
                        color: 'var(--text-primary, #0f172a)',
                        letterSpacing: '4px',
                        fontFamily: 'monospace',
                    }}>
                        {referralCode}
                    </div>

                    <button
                        onClick={handleCopyCode}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            width: '100%',
                            padding: '10px 16px',
                            borderRadius: '12px',
                            background: 'rgba(212, 165, 55, 0.15)',
                            border: '1px solid rgba(212, 165, 55, 0.35)',
                            color: 'var(--gold-400, #D4A537)',
                            fontSize: '13.5px',
                            fontWeight: '800',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                    >
                        {copiedCode ? <Check size={16} color="#22c55e" /> : <Copy size={16} />}
                        <span>{copiedCode ? t('copied', 'تم النسخ!') : t('copyCode', 'نسخ الكود')}</span>
                    </button>
                </div>

                {/* Box 2: Referral Link */}
                <div style={{
                    background: 'rgba(168, 85, 247, 0.08)',
                    border: '1px solid rgba(168, 85, 247, 0.25)',
                    borderRadius: '18px',
                    padding: '16px 20px',
                    marginBottom: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary, #64748b)', fontWeight: '700' }}>
                        {t('copyLink', 'رابط الدعوة')}
                    </span>
                    <div style={{
                        width: '100%',
                        background: 'var(--bg-elevated, #f8fafc)',
                        border: '1px solid var(--border-subtle, #e2e8f0)',
                        borderRadius: '10px',
                        padding: '8px 12px',
                        fontSize: '12.5px',
                        color: 'var(--text-secondary, #64748b)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        direction: 'ltr',
                        textAlign: 'left',
                        boxSizing: 'border-box',
                    }}>
                        {referralLink}
                    </div>

                    <button
                        onClick={handleCopyLink}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            width: '100%',
                            padding: '10px 16px',
                            borderRadius: '12px',
                            background: '#0f172a',
                            border: 'none',
                            color: '#FFFFFF',
                            fontSize: '13.5px',
                            fontWeight: '800',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                    >
                        {copiedLink ? <Check size={16} color="#22c55e" /> : <Copy size={16} />}
                        <span>{copiedLink ? t('copied', 'تم النسخ!') : t('copyLink', 'نسخ الرابط')}</span>
                    </button>
                </div>

                {/* Social Share Buttons (واتساب، تيليجرام، مشاركة) */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '10px',
                }}>
                    <button
                        onClick={handleWhatsAppShare}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            padding: '10px 8px',
                            borderRadius: '12px',
                            background: '#22c55e',
                            color: '#FFFFFF',
                            border: 'none',
                            fontSize: '13px',
                            fontWeight: '800',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
                        }}
                    >
                        <MessageCircle size={16} />
                        <span>{t('whatsapp', 'واتساب')}</span>
                    </button>

                    <button
                        onClick={handleTelegramShare}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            padding: '10px 8px',
                            borderRadius: '12px',
                            background: '#0284c7',
                            color: '#FFFFFF',
                            border: 'none',
                            fontSize: '13px',
                            fontWeight: '800',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)',
                        }}
                    >
                        <Send size={16} />
                        <span>{t('telegram', 'تيليجرام')}</span>
                    </button>

                    <button
                        onClick={handleNativeShare}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            padding: '10px 8px',
                            borderRadius: '12px',
                            background: 'rgba(56, 189, 248, 0.15)',
                            color: '#0284c7',
                            border: '1px solid rgba(56, 189, 248, 0.3)',
                            fontSize: '13px',
                            fontWeight: '800',
                            cursor: 'pointer',
                        }}
                    >
                        <Share2 size={16} />
                        <span>{t('share', 'مشاركة')}</span>
                    </button>
                </div>
            </div>

            {/* Joined Customers Container (العملاء المنضمون) */}
            <div style={{
                background: 'var(--bg-card, #FFFFFF)',
                border: '1px solid var(--border-medium, rgba(0, 0, 0, 0.08))',
                borderRadius: '24px',
                padding: '24px',
                marginBottom: '24px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                    <div style={{
                        padding: '4px 10px',
                        borderRadius: '10px',
                        background: 'rgba(56, 189, 248, 0.12)',
                        color: '#0284c7',
                        fontWeight: '800',
                        fontSize: '13px',
                    }}>
                        {totalInvited}
                    </div>

                    <div style={{ textAlign: isRtl ? 'right' : 'left', flex: 1, padding: isRtl ? '0 12px 0 0' : '0 0 0 12px' }}>
                        <h4 style={{ margin: '0 0 2px', fontSize: '17px', fontWeight: '900', color: 'var(--text-primary)' }}>
                            {t('joinedCustomers', 'العملاء المنضمون')}
                        </h4>
                        <span style={{ fontSize: '12.5px', color: 'var(--text-muted, #94a3b8)' }}>
                            {t('joinedCustomersSub', 'المبالغ المضافة وأرباحك من كل عميل')}
                        </span>
                    </div>

                    <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: 'rgba(56, 189, 248, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0284c7',
                    }}>
                        <Users size={18} />
                    </div>
                </div>

                {/* Empty State / Users List */}
                {loadingUsers ? (
                    <div style={{ padding: '30px 0' }}>
                        <LoadingSpinner text="جاري جلب قائمة العملاء..." />
                    </div>
                ) : invitedUsers && invitedUsers.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {invitedUsers.map((u, i) => (
                            <div key={u.id || i} style={{
                                padding: '12px 16px',
                                borderRadius: '12px',
                                background: 'var(--bg-elevated, #f8fafc)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                <div>
                                    <strong style={{ display: 'block', fontSize: '14px', color: 'var(--text-primary)' }}>{u.name || 'مستخدم مسجل'}</strong>
                                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{u.created_at || 'مؤخراً'}</span>
                                </div>
                                <span style={{ color: '#22c55e', fontWeight: '800', fontSize: '14px' }}>+{u.earned_commission || 0} ج.م</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{
                        padding: '36px 16px',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '10px',
                    }}>
                        <Users size={36} color="var(--text-muted, #cbd5e1)" />
                        <h5 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)' }}>
                            {t('noJoinedCustomers', 'لا يوجد عملاء منضمون حتى الآن')}
                        </h5>
                        <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--text-muted, #94a3b8)', maxWidth: '320px' }}>
                            ستظهر هنا بيانات العملاء وأرباحك بعد انضمامهم وشحنهم للمحفظة.
                        </p>
                    </div>
                )}
            </div>

            {/* Total Earnings Banner (إجمالي أرباحك 0 EGY) */}
            <Link
                to="/wallet"
                style={{
                    background: 'linear-gradient(135deg, #0d3b4c 0%, #064e3b 100%)',
                    borderRadius: '20px',
                    padding: '20px 24px',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textDecoration: 'none',
                    color: '#FFFFFF',
                    boxShadow: '0 8px 24px rgba(6, 78, 59, 0.25)',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <DollarSign size={22} />
                    </div>
                    <div>
                        <span style={{ fontSize: '12px', opacity: 0.85, display: 'block' }}>
                            {t('totalEarnings', 'إجمالي أرباحك')}
                        </span>
                        <div style={{ fontSize: '22px', fontWeight: '900' }}>
                            {totalEarned} EGY
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: isRtl ? 'left' : 'right' }}>
                    <span style={{ fontSize: '12px', color: '#FDE047', fontWeight: '700' }}>
                        {t('viewEarningsAndWithdraw', 'اضغط لعرض الأرباح وطرق السحب')}
                    </span>
                </div>
            </Link>

            {/* How Referral Works (كيف تعمل الإحالة؟ - 4 خطوات) */}
            <div style={{
                background: 'var(--bg-card, #FFFFFF)',
                border: '1px solid var(--border-medium, rgba(0, 0, 0, 0.08))',
                borderRadius: '24px',
                padding: '24px',
                marginBottom: '24px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: 'rgba(212, 165, 55, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#D4A537',
                    }}>
                        <ShieldCheck size={20} />
                    </div>
                    <div>
                        <h4 style={{ margin: '0 0 2px', fontSize: '17px', fontWeight: '900', color: 'var(--text-primary)' }}>
                            {t('howReferralWorks', 'كيف تعمل الإحالة؟')}
                        </h4>
                        <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                            {t('fourSimpleSteps', 'أربع خطوات بسيطة')}
                        </span>
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '12px',
                }}>
                    {/* Step 1 */}
                    <div style={{
                        background: 'var(--bg-elevated, #f8fafc)',
                        border: '1px solid var(--border-subtle, #e2e8f0)',
                        borderRadius: '16px',
                        padding: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                    }}>
                        <div style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: '#0f172a',
                            color: '#FFFFFF',
                            fontSize: '12px',
                            fontWeight: '900',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            1
                        </div>
                        <span style={{ fontSize: '13.5px', fontWeight: '800', color: 'var(--text-primary)' }}>
                            {t('step1', 'انسخ كود دعوتك')}
                        </span>
                    </div>

                    {/* Step 2 */}
                    <div style={{
                        background: 'var(--bg-elevated, #f8fafc)',
                        border: '1px solid var(--border-subtle, #e2e8f0)',
                        borderRadius: '16px',
                        padding: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                    }}>
                        <div style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: '#0f172a',
                            color: '#FFFFFF',
                            fontSize: '12px',
                            fontWeight: '900',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            2
                        </div>
                        <span style={{ fontSize: '13.5px', fontWeight: '800', color: 'var(--text-primary)' }}>
                            {t('step2', 'شاركه مع أصدقائك')}
                        </span>
                    </div>

                    {/* Step 3 */}
                    <div style={{
                        background: 'var(--bg-elevated, #f8fafc)',
                        border: '1px solid var(--border-subtle, #e2e8f0)',
                        borderRadius: '16px',
                        padding: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                    }}>
                        <div style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: '#0f172a',
                            color: '#FFFFFF',
                            fontSize: '12px',
                            fontWeight: '900',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            3
                        </div>
                        <span style={{ fontSize: '13.5px', fontWeight: '800', color: 'var(--text-primary)' }}>
                            {t('step3', 'تابع العملاء المنضمين ومكافآتك')}
                        </span>
                    </div>

                    {/* Step 4 */}
                    <div style={{
                        background: 'var(--bg-elevated, #f8fafc)',
                        border: '1px solid var(--border-subtle, #e2e8f0)',
                        borderRadius: '16px',
                        padding: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                    }}>
                        <div style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: '#0f172a',
                            color: '#FFFFFF',
                            fontSize: '12px',
                            fontWeight: '900',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            4
                        </div>
                        <span style={{ fontSize: '13.5px', fontWeight: '800', color: 'var(--text-primary)' }}>
                            {t('step4', 'تستمر المكافآت 30 يوماً لكل مستخدم تتم إضافته')}
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom Card: Transfers Status (حالة التحويلات) */}
            <Link
                to="/wallet"
                style={{
                    background: 'var(--bg-card, #FFFFFF)',
                    border: '1px solid var(--border-medium, rgba(0, 0, 0, 0.08))',
                    borderRadius: '20px',
                    padding: '18px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textDecoration: 'none',
                    color: 'var(--text-primary)',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: 'rgba(56, 189, 248, 0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0284c7',
                    }}>
                        <FileText size={20} />
                    </div>
                    <div>
                        <h4 style={{ margin: '0 0 2px', fontSize: '16px', fontWeight: '900' }}>
                            {t('transferStatus', 'حالة التحويلات')}
                        </h4>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                            {t('transferStatusDesc', 'تابع طلبات السحب واطلع على التفاصيل')}
                        </span>
                    </div>
                </div>

                <div style={{ color: 'var(--gold-400)' }}>
                    <ArrowLeft size={18} />
                </div>
            </Link>

            {/* ═══ Share Modal ═══ */}
            <Modal
                isOpen={shareModalOpen}
                onClose={() => setShareModalOpen(false)}
                title={t('shareReferral', 'مشاركة رابط وكود الإحالة')}
                maxWidth="460px"
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '10px 0' }}>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', textAlign: 'center' }}>
                        {t('shareReferralDesc', 'شارك رابط أو كود دعوتك مع أصدقائك أو عبر وسائل التواصل الاجتماعي واكسب عمولة فورية على كل عملية شحن.')}
                    </p>

                    {/* Copy Link Row */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid var(--border-medium)',
                        gap: '10px',
                    }}>
                        <div style={{
                            fontSize: '12px',
                            color: 'var(--text-primary)',
                            fontFamily: 'monospace',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            direction: 'ltr',
                            flex: 1,
                        }}>
                            {referralLink}
                        </div>
                        <button
                            type="button"
                            onClick={handleCopyLink}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                background: copiedLink ? 'rgba(34, 197, 94, 0.15)' : 'rgba(212, 165, 55, 0.15)',
                                border: copiedLink ? '1px solid #22c55e' : '1px solid var(--gold-400)',
                                color: copiedLink ? '#22c55e' : 'var(--gold-400)',
                                borderRadius: '8px',
                                padding: '6px 12px',
                                fontSize: '12px',
                                fontWeight: '800',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {copiedLink ? <Check size={14} /> : <Copy size={14} />}
                            <span>{copiedLink ? t('copied', 'تم النسخ!') : t('copy', 'نسخ')}</span>
                        </button>
                    </div>

                    {/* Social Buttons Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '10px',
                    }}>
                        <button
                            type="button"
                            onClick={handleWhatsAppShare}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                padding: '12px 14px',
                                borderRadius: '12px',
                                background: '#22c55e',
                                color: '#FFFFFF',
                                border: 'none',
                                fontSize: '13px',
                                fontWeight: '800',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(34, 197, 94, 0.25)',
                            }}
                        >
                            <MessageCircle size={17} />
                            <span>{language === 'en' ? 'WhatsApp' : 'واتساب'}</span>
                        </button>

                        <button
                            type="button"
                            onClick={handleTelegramShare}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                padding: '12px 14px',
                                borderRadius: '12px',
                                background: '#0284c7',
                                color: '#FFFFFF',
                                border: 'none',
                                fontSize: '13px',
                                fontWeight: '800',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(2, 132, 199, 0.25)',
                            }}
                        >
                            <Send size={17} />
                            <span>{language === 'en' ? 'Telegram' : 'تيليجرام'}</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`, '_blank')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                padding: '12px 14px',
                                borderRadius: '12px',
                                background: '#1877F2',
                                color: '#FFFFFF',
                                border: 'none',
                                fontSize: '13px',
                                fontWeight: '800',
                                cursor: 'pointer',
                            }}
                        >
                            <Globe size={17} />
                            <span>{language === 'en' ? 'Facebook' : 'فيسبوك'}</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`, '_blank')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                padding: '12px 14px',
                                borderRadius: '12px',
                                background: '#000000',
                                color: '#FFFFFF',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                fontSize: '13px',
                                fontWeight: '800',
                                cursor: 'pointer',
                            }}
                        >
                            <Share size={17} />
                            <span>{language === 'en' ? 'X Platform' : 'منصة X'}</span>
                        </button>
                    </div>

                    {/* System Share (if available on device) */}
                    {typeof navigator !== 'undefined' && navigator.share && (
                        <button
                            type="button"
                            onClick={handleSystemShare}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                padding: '11px 16px',
                                borderRadius: '12px',
                                background: 'rgba(212, 165, 55, 0.14)',
                                border: '1.5px solid var(--gold-400)',
                                color: 'var(--gold-400)',
                                fontSize: '13px',
                                fontWeight: '800',
                                cursor: 'pointer',
                            }}
                        >
                            <Share2 size={16} />
                            <span>{t('systemShare', 'مشاركة عبر تطبيقات الجهاز')}</span>
                        </button>
                    )}
                </div>
            </Modal>
        </MainLayout>
    );
}
