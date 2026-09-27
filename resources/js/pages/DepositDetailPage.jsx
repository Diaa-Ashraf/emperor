import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    Wallet,
    ArrowRight,
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

export default function DepositDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

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
                    <LoadingSpinner text="جاري تحميل بيانات الإيداع..." />
                </div>
            </MainLayout>
        );
    }

    if (!deposit) {
        return (
            <MainLayout>
                <EmptyState
                    title="طلب الإيداع غير موجود"
                    description="لم يتم العثور على طلب الإيداع المطلوب أو ليس لديك صلاحية لعرضه."
                    actionText="العودة للمحفظة"
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
                    label: 'مكتمل ومعتمد',
                    icon: CheckCircle2,
                    color: '#22C55E',
                    desc: 'تمت مراجعة الإيصال واعتماد الإيداع وإضافة الرصيد إلى محفظتك بنجاح.',
                };
            case 'rejected':
                return {
                    variant: 'danger',
                    label: 'مرفوض',
                    icon: XCircle,
                    color: '#EF4444',
                    desc: deposit.rejection_reason || deposit.admin_notes || 'تم رفض طلب الإيداع. يرجى مراجعة السبب أو التواصل مع الدعم الفني.',
                };
            default:
                return {
                    variant: 'warning',
                    label: 'قيد المراجعة',
                    icon: Clock,
                    color: '#F59E0B',
                    desc: 'طلبك قيد الفحص والمراجعة الآن من قِبل المشرفين، سيتم إضافة الرصيد فور مطابقة الإيصال.',
                };
        }
    };

    const statusInfo = getStatusInfo(deposit.status);
    const StatusIcon = statusInfo.icon;

    const amount = Number(deposit.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const fee = Number(deposit.fee || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const finalAmount = Number(deposit.final_amount || deposit.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <MainLayout>
            {/* Breadcrumbs */}
            <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '13px', color: '#8E8E98' }}>
                    <Link to="/" style={{ color: '#D4A537', textDecoration: 'none' }}>الرئيسية</Link>
                    <span>/</span>
                    <Link to="/wallet" style={{ color: '#D4A537', textDecoration: 'none' }}>المحفظة</Link>
                    <span>/</span>
                    <span style={{ color: '#CBD5E1' }}>تفاصيل طلب الإيداع #{deposit.id}</span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                    <h1 style={{ margin: 0, fontSize: '26px', fontWeight: '900', color: '#FFFFFF' }}>
                        طلب إيداع #{deposit.id}
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
                        البيانات المالية للعملية
                    </h3>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                        <span style={{ color: '#8E8E98' }}>المبلغ المودع:</span>
                        <strong style={{ color: '#FFFFFF' }}>{amount} ج.م</strong>
                    </div>

                    {Number(deposit.fee) > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                            <span style={{ color: '#8E8E98' }}>رسوم المعاملة:</span>
                            <span style={{ color: '#F87171' }}>-{fee} ج.م</span>
                        </div>
                    )}

                    <div style={{
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        paddingTop: '12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                    }}>
                        <span style={{ color: '#CBD5E1', fontWeight: '700' }}>الرصيد المضاف للمحفظة:</span>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                            <strong style={{ fontSize: '24px', color: '#4ADE80' }}>{finalAmount}</strong>
                            <span style={{ fontSize: '13px', color: '#4ADE80' }}>ج.م</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginTop: '6px' }}>
                        <span style={{ color: '#8E8E98' }}>تاريخ تقديم الطلب:</span>
                        <span style={{ color: '#CBD5E1' }}>{deposit.created_at || 'الآن'}</span>
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
                        بيانات وسيلة التحويل
                    </h3>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                        <span style={{ color: '#8E8E98' }}>طريقة الدفع:</span>
                        <strong style={{ color: '#D4A537' }}>{deposit.method || deposit.method_name || 'محفظة إلكترونية'}</strong>
                    </div>

                    {deposit.sender_wallet && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                            <span style={{ color: '#8E8E98' }}>رقم المحفظة المحوّل منها:</span>
                            <strong style={{ color: '#FFFFFF' }}>{deposit.sender_wallet}</strong>
                        </div>
                    )}

                    {deposit.transaction_ref && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                            <span style={{ color: '#8E8E98' }}>الرقم المرجعي للتحويل:</span>
                            <strong style={{ color: '#FFFFFF', fontFamily: 'monospace' }}>{deposit.transaction_ref}</strong>
                        </div>
                    )}

                    {/* Proof Image Preview */}
                    {deposit.proof_image && (
                        <div style={{ marginTop: '8px' }}>
                            <span style={{ fontSize: '13px', color: '#8E8E98', display: 'block', marginBottom: '8px' }}>
                                صورة إيصال التحويل المرفقة:
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
                                    alt="إيصال التحويل"
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
                                    <span>اضغط للتكبير</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', gap: '14px' }}>
                <Link to="/wallet" style={{ textDecoration: 'none' }}>
                    <Button variant="secondary" size="lg" icon={ArrowRight}>
                        العودة للمحفظة
                    </Button>
                </Link>

                <Link to="/deposit" style={{ textDecoration: 'none' }}>
                    <Button variant="primary" size="lg" icon={PlusCircle}>
                        إيداع جديد
                    </Button>
                </Link>
            </div>

            {/* Proof Image Enlarge Modal */}
            <Modal
                isOpen={imageModalOpen}
                onClose={() => setImageModalOpen(false)}
                title="إيصال التحويل المرفق"
                maxWidth="640px"
            >
                {deposit.proof_image && (
                    <div style={{ textAlign: 'center' }}>
                        <img
                            src={deposit.proof_image}
                            alt="إيصال التحويل مكبر"
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
