import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    DollarSign,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    Clock,
    XCircle,
    FileText,
    ExternalLink,
    PlusCircle,
    User,
    Wallet
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';
import { targetApi } from '../api/endpoints';
import { useLanguage } from '../contexts/LanguageContext';

export default function TargetOrderDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isRtl } = useLanguage();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        targetApi.getOrder(id)
            .then(res => {
                if (res?.data) {
                    setOrder(res.data);
                }
            })
            .catch(() => {
                setOrder(null);
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <MainLayout>
                <div style={{ padding: '80px 0' }}>
                    <LoadingSpinner text="جاري جلب تفاصيل طلب بيع التارجت..." />
                </div>
            </MainLayout>
        );
    }

    if (!order) {
        return (
            <MainLayout>
                <EmptyState
                    title="الطلب غير موجود"
                    description="لم يتم العثور على طلب بيع التارجت المطلوب."
                    actionText="العودة لسجل الطلبات"
                    onAction={() => navigate('/target/orders')}
                />
            </MainLayout>
        );
    }

    const getStatusInfo = (status) => {
        switch (status) {
            case 'approved':
            case 'paid':
                return {
                    label: order?.auto_verified ? '⚡ تم التحقق التلقائي والإيداع الفوري' : 'معتمد ومحول بنجاح',
                    icon: CheckCircle2,
                    color: '#22C55E',
                    desc: order?.auto_verified
                        ? `تم اعتماد طلبك وإيداع المبلغ فوراً في المحفظة بواسطة ${order.verification_method === 'trust_level' ? 'نظام الثقة الفوري' : 'الفحص الذكي للصورة (OCR)'} بدون انتظار!`
                        : 'تم التحقق من استلام التارجت في الوكالة بنجاح، وتم تحويل كامل المبلغ المستحق إلى محفظتك.',
                };
            case 'rejected':
                return {
                    label: 'مرفوض',
                    icon: XCircle,
                    color: '#EF4444',
                    desc: order?.reviewer_notes || 'تم رفض طلب بيع التارجت. يرجى التأكد من صحة البيانات أو التواصل مع خدمة العملاء.',
                };
            default:
                return {
                    label: 'قيد المراجعة والتحقق',
                    icon: Clock,
                    color: '#F5D061',
                    desc: 'يقوم النظام والمشرف بمطابقة كود التحويل والتحقق من العملية وسيتم إيداع الرصيد فوراً.',
                };
        }
    };

    const statusInfo = getStatusInfo(order.status);
    const StatusIcon = statusInfo.icon;

    const netPayout = Number(order.net_payout || 0).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return (
        <MainLayout>
            <div style={{ maxWidth: '640px', margin: '0 auto', paddingBottom: '60px' }}>
                {/* Nav Bar */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                }}>
                    <Link
                        to="/target/orders"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: '#D4A537',
                            fontSize: '13px',
                            fontWeight: '700',
                            textDecoration: 'none',
                        }}
                    >
                        <span>← العودة لسجل الطلبات</span>
                    </Link>

                    <button
                        onClick={() => navigate('/target/orders')}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 18px',
                            borderRadius: '20px',
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#D1D1DB',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                        }}
                    >
                        <span>رجوع</span>
                        {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                    </button>
                </div>

                {/* Status Card */}
                <div style={{
                    background: '#0D0D12',
                    border: `1px solid ${order.auto_verified ? '#22C55E' : '#D4A537'}`,
                    borderRadius: '24px',
                    padding: '28px 24px',
                    textAlign: 'center',
                    marginBottom: '20px',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.8)',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    {order.auto_verified && (
                        <div style={{
                            position: 'absolute',
                            top: '12px',
                            left: '12px',
                            background: 'rgba(34, 197, 94, 0.2)',
                            color: '#4ADE80',
                            border: '1px solid #22C55E',
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '800',
                        }}>
                            ⚡ تحقق تلقائي فوري
                        </div>
                    )}

                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: `${statusInfo.color}15`,
                        border: `1.5px solid ${statusInfo.color}`,
                        color: statusInfo.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                    }}>
                        <StatusIcon size={32} />
                    </div>

                    <div style={{ fontSize: '12px', color: '#9E9EA8', marginBottom: '4px' }}>
                        طلب رقم #{order.id} {order.public_id ? `(${order.public_id})` : ''}
                    </div>

                    <h2 style={{ margin: '0 0 8px', fontSize: '20px', fontWeight: '900', color: '#FFFFFF' }}>
                        {statusInfo.label}
                    </h2>

                    <p style={{ margin: 0, fontSize: '13px', color: '#C5C5D2', lineHeight: '1.6' }}>
                        {statusInfo.desc}
                    </p>
                </div>

                {/* Verification Code Box (if present) */}
                {order.verification_code && (
                    <div style={{
                        background: 'rgba(212, 165, 55, 0.08)',
                        border: '1px dashed #D4A537',
                        borderRadius: '16px',
                        padding: '16px 20px',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <div>
                            <span style={{ fontSize: '12px', color: '#8E8E98', display: 'block' }}>كود التحقق الخاص بهذه العملية</span>
                            <span style={{ fontSize: '18px', fontWeight: '900', color: '#D4A537', fontFamily: 'monospace', letterSpacing: '1px' }}>
                                {order.verification_code}
                            </span>
                        </div>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(order.verification_code);
                                alert('تم نسخ كود التحقق!');
                            }}
                            style={{
                                background: 'rgba(212, 165, 55, 0.2)',
                                border: '1px solid #D4A537',
                                color: '#FFFFFF',
                                padding: '6px 14px',
                                borderRadius: '8px',
                                fontSize: '12px',
                                fontWeight: '700',
                                cursor: 'pointer',
                            }}
                        >
                            نسخ الكود
                        </button>
                    </div>
                )}

                {/* Order Details Breakdown */}
                <div style={{
                    background: '#0B0B0F',
                    border: '1px solid rgba(212, 165, 55, 0.35)',
                    borderRadius: '24px',
                    padding: '24px 22px',
                    marginBottom: '24px',
                }}>
                    <h3 style={{
                        margin: '0 0 16px',
                        fontSize: '16px',
                        fontWeight: '900',
                        color: '#FFFFFF',
                        borderBottom: '1px solid rgba(212, 165, 55, 0.2)',
                        paddingBottom: '12px',
                    }}>
                        تفاصيل العملية
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                            <span style={{ color: '#8E8E98' }}>التطبيق:</span>
                            <strong style={{ color: '#F5D061' }}>{order.product?.name || 'تطبيق تارجت'}</strong>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                            <span style={{ color: '#8E8E98' }}>ID الحساب في التطبيق:</span>
                            <strong style={{ color: '#FFFFFF', fontFamily: 'monospace' }}>{order.app_user_id || '—'}</strong>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                            <span style={{ color: '#8E8E98' }}>آيدي وكالة السحب:</span>
                            <strong style={{ color: '#F5D061', fontFamily: 'monospace' }}>{order.agency_id || '817693068'}</strong>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                            <span style={{ color: '#8E8E98' }}>تاريخ الطلب:</span>
                            <span style={{ color: '#FFFFFF' }}>
                                {new Date(order.created_at).toLocaleDateString('ar-EG', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </span>
                        </div>

                        <div style={{
                            marginTop: '10px',
                            paddingTop: '14px',
                            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <span style={{ fontSize: '15px', fontWeight: '800', color: '#FFFFFF' }}>
                                الصافي المستحق:
                            </span>
                            <span style={{ fontSize: '22px', fontWeight: '900', color: '#22C55E' }}>
                                {netPayout} EGP
                            </span>
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <Link to="/target/apps" style={{ textDecoration: 'none' }}>
                        <button
                            style={{
                                padding: '14px 32px',
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                border: 'none',
                                color: '#000000',
                                fontSize: '15px',
                                fontWeight: '800',
                                cursor: 'pointer',
                                boxShadow: '0 6px 20px rgba(212, 165, 55, 0.3)',
                            }}
                        >
                            بيع تارجت جديد
                        </button>
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
}
