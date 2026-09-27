import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Gift,
    Users,
    DollarSign,
    Percent,
    Copy,
    Check,
    Share2,
    MessageCircle,
    Send,
    Sparkles,
    ShieldCheck,
    CheckCircle2
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import StatsCard from '../components/referrals/StatsCard';
import InvitedUserItem from '../components/referrals/InvitedUserItem';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';
import Pagination from '../components/ui/Pagination';
import { referralsApi } from '../api/endpoints';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

export default function ReferralsPage() {
    const { user } = useAuth();
    const { success } = useToast();

    const [stats, setStats] = useState(null);
    const [invitedUsers, setInvitedUsers] = useState([]);
    const [loadingStats, setLoadingStats] = useState(true);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [meta, setMeta] = useState(null);

    const [copiedCode, setCopiedCode] = useState(false);
    const [copiedLink, setCopiedLink] = useState(false);

    useEffect(() => {
        setLoadingStats(true);
        referralsApi.getStats()
            .then(res => {
                if (res?.data) {
                    setStats(res.data);
                }
            })
            .catch(() => {})
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

    const referralCode = stats?.referral_code || user?.referral_code || 'EMP2026';
    const referralLink = stats?.referral_link || `${window.location.origin}/register?ref=${referralCode}`;
    const commissionPercent = stats?.referral_percentage || 2;
    const totalEarned = Number(stats?.total_earned || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const totalInvited = Number(stats?.total_invited || 0);

    const handleCopyCode = () => {
        navigator.clipboard.writeText(referralCode);
        setCopiedCode(true);
        success('تم نسخ كود الإحالة بنجاح');
        setTimeout(() => setCopiedCode(false), 3000);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(referralLink);
        setCopiedLink(true);
        success('تم نسخ رابط الدعوة بنجاح');
        setTimeout(() => setCopiedLink(false), 3000);
    };

    const shareMessage = `انضم الآن إلى منصة إمبراطور لشحن الألعاب والتارجت بأفضل أسعار الجملة والشحن الفوري! سجل عبر الرابط التالي: ${referralLink}`;

    const handleWhatsAppShare = () => {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`, '_blank');
    };

    const handleTelegramShare = () => {
        window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('اشحن ألعابك بأفضل سعر في مصر مع إمبراطور!')}`, '_blank');
    };

    return (
        <MainLayout>
            {/* Header */}
            <div style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '13px', color: '#8E8E98' }}>
                    <Link to="/" style={{ color: '#D4A537', textDecoration: 'none' }}>الرئيسية</Link>
                    <span>/</span>
                    <span style={{ color: '#CBD5E1' }}>برنامج الإحالات والأرباح</span>
                </div>

                <h1 style={{ margin: '0 0 6px', fontSize: '26px', fontWeight: '900', color: '#FFFFFF' }}>
                    برنامج دعوة الأصدقاء والأرباح
                </h1>
                <p style={{ margin: 0, fontSize: '14px', color: '#9E9EA8' }}>
                    شارك كود الدعوة مع أصدقائك واكسب كاش يضاف لمحفظتك تلقائياً على كل عملية يقومون بها
                </p>
            </div>

            {/* Big Referral Hero Card */}
            <div style={{
                background: 'linear-gradient(135deg, #1C1917 0%, #2A1F0D 50%, #171108 100%)',
                border: '1px solid rgba(212, 165, 55, 0.4)',
                borderRadius: '24px',
                padding: '36px 32px',
                marginBottom: '36px',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(212, 165, 55, 0.15)',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute',
                    top: '-40px',
                    left: '-40px',
                    width: '260px',
                    height: '260px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(212, 165, 55, 0.25) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                    gap: '28px',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 1,
                }}>
                    {/* Left: Info */}
                    <div>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '4px 12px',
                            background: 'rgba(212, 165, 55, 0.15)',
                            border: '1px solid rgba(212, 165, 55, 0.3)',
                            borderRadius: '20px',
                            color: '#D4A537',
                            fontSize: '13px',
                            fontWeight: '700',
                            marginBottom: '14px',
                        }}>
                            <Sparkles size={14} />
                            <span>اربح {commissionPercent}% عمولة نقدية مباشرة</span>
                        </div>

                        <h2 style={{
                            margin: '0 0 10px',
                            fontSize: 'clamp(22px, 3.5vw, 28px)',
                            fontWeight: '900',
                            color: '#FFFFFF',
                            lineHeight: '1.3',
                        }}>
                            أرباحك بدون حد أقصى مدى الحياة!
                        </h2>

                        <p style={{
                            margin: '0 0 24px',
                            fontSize: '14px',
                            color: '#CBD5E1',
                            lineHeight: '1.6',
                        }}>
                            عندما يقوم صديقك بالتسجيل عبر رابطك وإيداع رصيد أو شحن أي لعبة، يتم إضافة {commissionPercent}% من قيمة الإيداع إلى محفظتك كاش بشكل فوري.
                        </p>

                        {/* Social Share Buttons */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            <Button
                                variant="primary"
                                size="md"
                                icon={MessageCircle}
                                onClick={handleWhatsAppShare}
                                style={{
                                    background: 'linear-gradient(135deg, #22C55E 0%, #15803D 100%)',
                                    border: 'none',
                                    boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)',
                                }}
                            >
                                مشاركة عبر واتساب
                            </Button>

                            <Button
                                variant="secondary"
                                size="md"
                                icon={Send}
                                onClick={handleTelegramShare}
                                style={{
                                    background: 'rgba(56, 189, 248, 0.15)',
                                    borderColor: 'rgba(56, 189, 248, 0.3)',
                                    color: '#38BDF8',
                                }}
                            >
                                تليجرام
                            </Button>
                        </div>
                    </div>

                    {/* Right: Copy Boxes */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Referral Code Box */}
                        <div style={{
                            background: 'rgba(18, 18, 24, 0.8)',
                            border: '1px solid rgba(212, 165, 55, 0.3)',
                            borderRadius: '16px',
                            padding: '16px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '12px',
                        }}>
                            <div>
                                <span style={{ fontSize: '11px', color: '#8E8E98', display: 'block', marginBottom: '2px' }}>
                                    كود الدعوة الخاص بك:
                                </span>
                                <strong style={{
                                    fontSize: '22px',
                                    color: '#D4A537',
                                    letterSpacing: '2px',
                                    fontFamily: 'monospace',
                                }}>
                                    {referralCode}
                                </strong>
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                icon={copiedCode ? Check : Copy}
                                onClick={handleCopyCode}
                            >
                                {copiedCode ? 'تم النسخ' : 'نسخ الكود'}
                            </Button>
                        </div>

                        {/* Referral Link Box */}
                        <div style={{
                            background: 'rgba(18, 18, 24, 0.8)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            padding: '16px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '12px',
                        }}>
                            <div style={{ flex: 1, overflow: 'hidden' }}>
                                <span style={{ fontSize: '11px', color: '#8E8E98', display: 'block', marginBottom: '2px' }}>
                                    رابط الدعوة المباشر:
                                </span>
                                <span style={{
                                    fontSize: '13px',
                                    color: '#CBD5E1',
                                    display: 'block',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    direction: 'ltr',
                                    textAlign: 'left',
                                }}>
                                    {referralLink}
                                </span>
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                icon={copiedLink ? Check : Copy}
                                onClick={handleCopyLink}
                            >
                                {copiedLink ? 'تم النسخ' : 'نسخ الرابط'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))',
                gap: '18px',
                marginBottom: '40px',
            }}>
                <StatsCard
                    icon={Users}
                    title="إجمالي الأصدقاء المدعوين"
                    value={totalInvited}
                    unit="صديق"
                    color="#D4A537"
                    bg="rgba(212, 165, 55, 0.15)"
                />

                <StatsCard
                    icon={DollarSign}
                    title="إجمالي الأرباح المكتسبة"
                    value={totalEarned}
                    unit="ج.م"
                    color="#22C55E"
                    bg="rgba(34, 197, 94, 0.15)"
                />

                <StatsCard
                    icon={Percent}
                    title="نسبة العمولة الممنوحة"
                    value={`${commissionPercent}%`}
                    unit="كاش فوري"
                    color="#38BDF8"
                    bg="rgba(56, 189, 248, 0.15)"
                />
            </div>

            {/* Invited Users List */}
            <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <div style={{
                        width: '8px',
                        height: '24px',
                        borderRadius: '4px',
                        background: 'linear-gradient(180deg, #F3E5AB 0%, #D4A537 100%)',
                    }} />
                    <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#FFFFFF' }}>
                        قائمة الأصدقاء المسجلين من خلالك
                    </h3>
                </div>

                {loadingUsers ? (
                    <div style={{ padding: '60px 0' }}>
                        <LoadingSpinner text="جاري جلب قائمة المدعوين..." />
                    </div>
                ) : invitedUsers.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {invitedUsers.map((invUser) => (
                            <InvitedUserItem key={invUser.id} invitedUser={invUser} />
                        ))}

                        {meta && meta.last_page > 1 && (
                            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                                <Pagination
                                    currentPage={currentPage}
                                    lastPage={meta.last_page}
                                    onPageChange={(p) => setCurrentPage(p)}
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    <EmptyState
                        title="لم تقم بدعوة أي أصدقاء بعد"
                        description="ابدأ بمشاركة كود دعوتك الآن واربح عمولات غير محدودة على كل عملية إيداع وشحن!"
                        actionText="نسخ رابط الدعوة"
                        onAction={handleCopyLink}
                    />
                )}
            </div>
        </MainLayout>
    );
}
