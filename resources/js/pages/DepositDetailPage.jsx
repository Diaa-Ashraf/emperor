import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    Wallet,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    Clock,
    XCircle,
    FileText,
    ExternalLink,
    PlusCircle,
    Calendar,
    Smartphone,
    CreditCard
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';
import Modal from '../components/ui/Modal';
import { depositsApi } from '../api/endpoints';
import { useLanguage } from '../contexts/LanguageContext';

export default function DepositDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isRtl, t, language } = useLanguage();

    const [deposit, setDeposit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageModalOpen, setImageModalOpen] = useState(false);

    useEffect(() => {
        setLoading(true);
        depositsApi.getDeposit(id)
            .then(res => {
                if (res?.data) {
                    setDeposit(res.data);
                }
            })
            .catch(() => {
                setDeposit(null);
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <MainLayout>
                <div style={{ padding: '80px 0' }}>
                    <LoadingSpinner text={t('loadingDepositDetails', 'جاري تحميل بيانات الإيداع...')} />
                </div>
            </MainLayout>
        );
    }

    if (!deposit) {
        return (
            <MainLayout>
                <EmptyState
                    title={t('depositNotFound', 'طلب الإيداع غير موجود')}
                    description={t('depositNotFoundDesc', 'لم يتم العثور على طلب الإيداع المطلوب أو ليس لديك صلاحية لعرضه.')}
                    actionText={t('backToWallet', 'العودة للمحفظة')}
                    onAction={() => navigate('/wallet')}
                />
            </MainLayout>
        );
    }

    const getStatusInfo = (status) => {
        switch (status) {
            case 'approved':
                return {
                    variant: 'success',
                    label: t('completedAndApproved', 'مكتمل ومعتمد'),
                    icon: CheckCircle2,
                    color: '#22C55E',
                    desc: language === 'en' ? 'The receipt has been verified, deposit approved, and balance successfully added to your wallet.' : 'تمت مراجعة الإيصال واعتماد الإيداع وإضافة الرصيد إلى محفظتك بنجاح.',
                };
            case 'rejected':
                return {
                    variant: 'danger',
                    label: t('rejected', 'مرفوض'),
                    icon: XCircle,
                    color: '#EF4444',
                    desc: deposit.rejection_reason || deposit.admin_notes || (language === 'en' ? 'Deposit request was rejected. Please review the reason or contact technical support.' : 'تم رفض طلب الإيداع. يرجى مراجعة السبب أو التواصل مع الدعم الفني.'),
                };
            default:
                return {
                    variant: 'warning',
                    label: t('underReview', 'قيد المراجعة'),
                    icon: Clock,
                    color: '#F59E0B',
                    desc: language === 'en' ? 'Your request is currently being reviewed by administrators. Balance will be added once verified.' : 'طلبك قيد الفحص والمراجعة الآن من قِبل المشرفين، سيتم إضافة الرصيد فور مطابقة الإيصال.',
                };
        }
    };

    const statusInfo = getStatusInfo(deposit.status);
    const StatusIcon = statusInfo.icon;

    const currencySymbol = language === 'en' ? 'EGP' : 'ج.م';
    const amount = Number(deposit.amount || 0).toLocaleString(language === 'en' ? 'en-US' : 'ar-EG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const fee = Number(deposit.fee || 0).toLocaleString(language === 'en' ? 'en-US' : 'ar-EG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const finalAmount = Number(deposit.final_amount || deposit.amount || 0).toLocaleString(language === 'en' ? 'en-US' : 'ar-EG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <MainLayout>
            {/* Breadcrumbs */}
            <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '13px', color: '#8E8E98' }}>
                    <Link to="/" style={{ color: '#D4A537', textDecoration: 'none' }}>{t('home', 'الرئيسية')}</Link>
                    <span>/</span>
                    <Link to="/wallet" style={{ color: '#D4A537', textDecoration: 'none' }}>{t('wallet', 'المحفظة')}</Link>
                    <span>/</span>
                    <span style={{ color: '#CBD5E1' }}>{t('depositRequestDetails', 'تفاصيل طلب الإيداع')} #{deposit.id}</span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                    <h1 style={{ margin: 0, fontSize: '26px', fontWeight: '900', color: '#FFFFFF' }}>
                        {t('depositRequest', 'طلب إيداع')} #{deposit.id}
                    </h1>

                    <Badge variant={statusInfo.variant} size="lg">
                        {statusInfo.label}
                    </Badge>
                </div>
            </div>

            {/* Status Notice Banner */}
            <div style={{
                background: deposit.status === 'approved'
                    ? 'rgba(34, 197, 94, 0.12)'
                    : deposit.status === 'rejected'
                        ? 'rgba(239, 68, 68, 0.12)'
                        : 'rgba(245, 158, 11, 0.12)',
                border: `1px solid ${statusInfo.color}40`,
                borderRadius: '18px',
                padding: '18px 22px',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
            }}>
                <StatusIcon size={24} color={statusInfo.color} style={{ flexShrink: 0 }} />
                <p style={{ margin: 0, fontSize: '14px', color: '#E2E8F0', lineHeight: '1.5' }}>
                    {statusInfo.desc}
                </p>
            </div>

            {/* Main Details Grid */}
            <div className="responsive-grid-2col" style={{
                gap: '24px',
                marginBottom: '32px',
            }}>
                {/* Deposit Amounts Card */}
                <div style={{
                    background: 'rgba(26, 26, 36, 0.85)',
                    border: '1px solid rgba(212, 165, 55, 0.25)',
                    borderRadius: '20px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                }}>
                    <h3 style={{ margin: '0 0 4px', fontSize: '17px', fontWeight: '800', color: '#FFFFFF' }}>
                        {t('financialTransactionData', 'البيانات المالية للعملية')}
                    </h3>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                        <span style={{ color: '#8E8E98' }}>{t('depositedAmount', 'المبلغ المودع')}:</span>
                        <strong style={{ color: '#FFFFFF' }}>{amount} {currencySymbol}</strong>
                    </div>

                    {Number(deposit.fee) > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                            <span style={{ color: '#8E8E98' }}>{t('fees', 'رسوم المعاملة')}:</span>
                            <span style={{ color: '#F87171' }}>-{fee} {currencySymbol}</span>
                        </div>
                    )}

                    <div style={{
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        paddingTop: '12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                    }}>
                        <span style={{ color: '#CBD5E1', fontWeight: '700' }}>{t('addedWalletBalance', 'الرصيد المضاف للمحفظة')}:</span>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                            <strong style={{ fontSize: '24px', color: '#4ADE80' }}>{finalAmount}</strong>
                            <span style={{ fontSize: '13px', color: '#4ADE80' }}>{currencySymbol}</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginTop: '6px' }}>
                        <span style={{ color: '#8E8E98' }}>{t('orderDate', 'تاريخ تقديم الطلب')}:</span>
                        <span style={{ color: '#CBD5E1' }}>{deposit.created_at || t('now', 'الآن')}</span>
                    </div>
                </div>

                {/* Transfer Method & Sender Reference */}
                <div style={{
                    background: 'rgba(26, 26, 36, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '20px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                }}>
                    <h3 style={{ margin: '0 0 4px', fontSize: '17px', fontWeight: '800', color: '#FFFFFF' }}>
                        {t('transferMethodData', 'بيانات وسيلة التحويل')}
                    </h3>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                        <span style={{ color: '#8E8E98' }}>{t('paymentMethod', 'طريقة الدفع')}:</span>
                        <strong style={{ color: '#D4A537' }}>{deposit.method || deposit.method_name || t('eWallet', 'محفظة إلكترونية')}</strong>
                    </div>

                    {deposit.sender_wallet && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                            <span style={{ color: '#8E8E98' }}>{t('senderWalletNumber', 'رقم المحفظة المحوّل منها')}:</span>
                            <strong style={{ color: '#FFFFFF' }}>{deposit.sender_wallet}</strong>
                        </div>
                    )}

                    {deposit.transaction_ref && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                            <span style={{ color: '#8E8E98' }}>{t('transactionRefNumber', 'الرقم المرجعي للتحويل')}:</span>
                            <strong style={{ color: '#FFFFFF', fontFamily: 'monospace' }}>{deposit.transaction_ref}</strong>
                        </div>
                    )}

                    {/* Proof Image Preview */}
                    {deposit.proof_image && (
                        <div style={{ marginTop: '8px' }}>
                            <span style={{ fontSize: '13px', color: '#8E8E98', display: 'block', marginBottom: '8px' }}>
                                {t('attachedProofReceipt', 'صورة إيصال التحويل المرفقة')}:
                            </span>
                            <div
                                onClick={() => setImageModalOpen(true)}
                                style={{
                                    width: '100%',
                                    height: '120px',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    border: '1px solid rgba(212, 165, 55, 0.3)',
                                    position: 'relative',
                                }}
                            >
                                <img
                                    src={deposit.proof_image}
                                    alt={t('transferReceipt', 'إيصال التحويل')}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'rgba(0,0,0,0.4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#FFF',
                                    fontSize: '13px',
                                    fontWeight: '700',
                                    gap: '6px',
                                }}>
                                    <ExternalLink size={16} />
                                    <span>{t('clickToEnlarge', 'اضغط للتكبير')}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', gap: '14px' }}>
                <Link to="/wallet" style={{ textDecoration: 'none' }}>
                    <Button variant="secondary" size="lg" icon={isRtl ? ArrowRight : ArrowLeft}>
                        {t('backToWallet', 'العودة للمحفظة')}
                    </Button>
                </Link>

                <Link to="/deposit" style={{ textDecoration: 'none' }}>
                    <Button variant="primary" size="lg" icon={PlusCircle}>
                        {t('chargeBalanceNow', 'إيداع جديد')}
                    </Button>
                </Link>
            </div>

            {/* Proof Image Enlarge Modal */}
            <Modal
                isOpen={imageModalOpen}
                onClose={() => setImageModalOpen(false)}
                title={t('attachedProofReceipt', 'إيصال التحويل المرفق')}
                maxWidth="640px"
            >
                {deposit.proof_image && (
                    <div style={{ textAlign: 'center' }}>
                        <img
                            src={deposit.proof_image}
                            alt={t('transferReceipt', 'إيصال التحويل مكبر')}
                            style={{
                                width: '100%',
                                maxHeight: '70vh',
                                objectFit: 'contain',
                                borderRadius: '12px',
                            }}
                        />
                    </div>
                )}
            </Modal>
        </MainLayout>
    );
}

