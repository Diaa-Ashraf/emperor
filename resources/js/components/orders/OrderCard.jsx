import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, Mail, User, Copy, Check, Gamepad2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function OrderCard({ order }) {
    const { t, isRtl, language } = useLanguage();
    const [copied, setCopied] = useState(false);

    if (!order) return null;

    const getStatusConfig = (status) => {
        switch (status) {
            case 'completed':
                return { bg: 'rgba(34, 197, 94, 0.12)', color: '#22c55e', dot: '#22c55e', label: t('completed', 'مكتمل') };
            case 'processing':
                return { bg: 'rgba(234, 179, 8, 0.12)', color: '#eab308', dot: '#eab308', label: t('processing', 'قيد التنفيذ') };
            case 'failed':
                return { bg: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', dot: '#ef4444', label: t('failed', 'ملغي / فاشل') };
            case 'refunded':
                return { bg: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8', dot: '#38bdf8', label: t('refunded', 'مسترد') };
            default:
                return { bg: 'rgba(234, 179, 8, 0.12)', color: '#eab308', dot: '#eab308', label: t('pending', 'قيد الانتظار') };
        }
    };

    const statusConfig = getStatusConfig(order.status);
    const amount = Number(order.total_amount || 0).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    let formattedDate = order.created_at || '';
    try {
        if (order.created_at) {
            const d = new Date(order.created_at);
            formattedDate = d.toLocaleDateString(language === 'en' ? 'en-US' : 'ar-EG', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        }
    } catch (e) {
        formattedDate = order.created_at;
    }

    const orderId = order.public_id || `#${order.id}`;

    const handleCopyId = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!orderId) return;
        navigator.clipboard.writeText(orderId.replace('#', ''));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            style={{
                background: 'var(--bg-card, rgba(26, 26, 36, 0.9))',
                border: '1px solid var(--border-medium, rgba(255, 255, 255, 0.08))',
                borderRadius: '20px',
                padding: '16px 18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                boxSizing: 'border-box',
                width: '100%',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            }}
        >
            {/* Top Row: Price Pill on Left, Product & ID & Status on Right */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '12px',
            }}>
                {/* Price Box */}
                <div style={{
                    background: 'rgba(56, 189, 248, 0.12)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: '14px',
                    padding: '8px 14px',
                    textAlign: 'center',
                    flexShrink: 0,
                }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary, #94a3b8)', fontWeight: '700' }}>
                        {t('value', 'القيمة')}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '900', color: '#38bdf8' }}>
                        {language === 'en' ? 'EGP' : 'ج.م'} {amount}
                    </div>
                </div>

                {/* Product Name, ID & Status + Thumbnail */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    justifyContent: isRtl ? 'flex-end' : 'flex-start',
                    flex: 1,
                    minWidth: 0,
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isRtl ? 'flex-end' : 'flex-start',
                        minWidth: 0,
                        flex: 1,
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginBottom: '4px',
                            flexWrap: 'wrap',
                            justifyContent: isRtl ? 'flex-end' : 'flex-start',
                        }}>
                            {/* Order Public ID Badge */}
                            <span
                                onClick={handleCopyId}
                                title={t('clickToCopy', 'اضغط للنسخ')}
                                style={{
                                    fontSize: '11px',
                                    fontFamily: 'monospace',
                                    fontWeight: '700',
                                    padding: '2px 8px',
                                    borderRadius: '8px',
                                    background: 'var(--bg-elevated, rgba(255, 255, 255, 0.06))',
                                    color: 'var(--gold-400, #D4A537)',
                                    border: '1px solid var(--border-subtle, rgba(212, 165, 55, 0.2))',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                }}
                            >
                                {copied ? <Check size={10} color="#22c55e" /> : null}
                                #{orderId.replace('#', '')}#
                            </span>

                            {/* Status Badge */}
                            <span style={{
                                fontSize: '11px',
                                fontWeight: '700',
                                padding: '2px 8px',
                                borderRadius: '8px',
                                background: statusConfig.bg,
                                color: statusConfig.color,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                            }}>
                                <span style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: statusConfig.dot,
                                }} />
                                {statusConfig.label}
                            </span>
                        </div>

                        {/* Product Title */}
                        <h3 style={{
                            margin: 0,
                            fontSize: '16px',
                            fontWeight: '800',
                            color: 'var(--text-primary, #ffffff)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '100%',
                        }}>
                            {order.product?.name || order.tier?.name || t('chargeNow', 'طلب شحن')}
                        </h3>
                    </div>

                    {/* Product Thumbnail */}
                    <div style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        background: 'var(--bg-elevated, #1a1a24)',
                        border: '2px solid var(--gold-400, #D4A537)',
                        overflow: 'hidden',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 10px rgba(212, 165, 55, 0.25)',
                    }}>
                        {order.product?.image_url ? (
                            <img
                                src={order.product.image_url}
                                alt={order.product?.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            <Gamepad2 size={24} color="#D4A537" />
                        )}
                    </div>
                </div>
            </div>

            {/* Date & User Info Badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{
                    background: 'var(--bg-elevated, rgba(255, 255, 255, 0.04))',
                    border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.05))',
                    borderRadius: '10px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    color: 'var(--text-secondary, #94a3b8)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}>
                    <Calendar size={14} color="var(--gold-400, #D4A537)" />
                    <span>{formattedDate}</span>
                </div>

                {order.user?.email && (
                    <div style={{
                        background: 'var(--bg-elevated, rgba(255, 255, 255, 0.04))',
                        border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.05))',
                        borderRadius: '10px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        color: 'var(--text-secondary, #94a3b8)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}>
                        <Mail size={14} color="#38bdf8" />
                        <span style={{ fontFamily: 'monospace' }}>{order.user.email}</span>
                    </div>
                )}
            </div>

            {/* User / Player ID Box */}
            {(order.player_id || order.account_id || order.server_id) && (
                <div style={{
                    background: 'var(--bg-elevated, rgba(255, 255, 255, 0.03))',
                    border: '1px solid var(--border-medium, rgba(255, 255, 255, 0.08))',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted, #94a3b8)' }}>
                        {t('playerOrUserId', 'معرف المستخدم')}
                    </span>
                    <span style={{
                        fontSize: '15px',
                        fontWeight: '800',
                        color: 'var(--text-primary, #ffffff)',
                        fontFamily: 'monospace',
                        letterSpacing: '0.5px',
                    }}>
                        {order.player_id || order.account_id || order.server_id}
                    </span>
                </div>
            )}

            {/* Details Full Button */}
            <Link
                to={`/orders/${order.public_id || order.id}`}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                    padding: '11px 16px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)',
                    color: '#ffffff',
                    fontWeight: '800',
                    fontSize: '14px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(21, 101, 192, 0.35)',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(21, 101, 192, 0.5)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(21, 101, 192, 0.35)';
                }}
            >
                {isRtl ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                <span>{t('details', 'التفاصيل')}</span>
            </Link>
        </div>
    );
}

