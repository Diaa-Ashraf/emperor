import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, AlertCircle, Wallet, CheckCircle2, Zap, ArrowLeft, PlusCircle, Gamepad2 } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { formatImageUrl } from '../../utils/imageHelper';

export default function OrderConfirmModal({
    isOpen,
    onClose,
    product,
    tier,
    quantity,
    playerId,
    serverId,
    accountRegion,
    walletBalance = 0,
    currency = 'EGP',
    onConfirm,
    loading = false,
}) {
    if (!product) return null;

    const unitPrice = tier
        ? Number(tier.price_egp || tier.price || tier.final_price || 0)
        : Number(product.unit_price || product.price || 0);
    const totalPrice = unitPrice * (quantity || 1);
    const hasEnoughBalance = walletBalance >= totalPrice;

    const formattedTotal = totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const formattedBalance = Number(walletBalance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const currencyLabel = currency === 'EGP' ? 'ج.م' : currency;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="تأكيد طلب الشحن الفوري"
            maxWidth="480px"
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {/* Product & Package Summary */}
                <div style={{
                    background: 'rgba(26, 26, 36, 0.8)',
                    border: '1px solid rgba(212, 165, 55, 0.2)',
                    borderRadius: '16px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '12px',
                        background: '#121218',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                    }}>
                        {(() => {
                            const imgSrc = formatImageUrl(product.image_url || product.image);
                            return imgSrc ? (
                                <img
                                    src={imgSrc}
                                    alt={product.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                <Gamepad2 size={24} color="#D4A537" />
                            );
                        })()}
                    </div>
                    <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 2px', fontSize: '15px', fontWeight: '800', color: '#FFFFFF' }}>
                            {product.name}
                        </h4>
                        <span style={{ fontSize: '13px', color: '#D4A537', fontWeight: '700' }}>
                            {tier ? `الباقة: ${tier.name}` : `السعر: ${unitPrice} ${currencyLabel}`} {quantity > 1 ? `(الكمية: ${quantity})` : ''}
                        </span>
                    </div>
                </div>

                {/* Player Credentials Details */}
                <div style={{
                    background: 'rgba(18, 18, 24, 0.6)',
                    borderRadius: '14px',
                    padding: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    fontSize: '13px',
                }}>
                    {playerId && (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#8E8E98' }}>{product.player_id_label || 'معرف اللاعب / ID'}:</span>
                            <strong style={{ color: '#FFFFFF', letterSpacing: '0.5px' }}>{playerId}</strong>
                        </div>
                    )}

                    {serverId && (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#8E8E98' }}>{product.server_id_label || 'المنطقة / السيرفر'}:</span>
                            <strong style={{ color: '#FFFFFF' }}>{serverId}</strong>
                        </div>
                    )}

                    {accountRegion && (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#8E8E98' }}>دولة الحساب:</span>
                            <strong style={{ color: '#FFFFFF' }}>{accountRegion}</strong>
                        </div>
                    )}

                    <div style={{
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        paddingTop: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                    }}>
                        <span style={{ color: '#CBD5E1', fontWeight: '700' }}>إجمالي المبلغ المطلوب:</span>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                            <strong style={{ fontSize: '18px', color: '#D4A537' }}>{formattedTotal}</strong>
                            <span style={{ fontSize: '12px', color: '#D4A537' }}>{currencyLabel}</span>
                        </div>
                    </div>
                </div>

                {/* Wallet Balance Status */}
                <div style={{
                    background: hasEnoughBalance ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.12)',
                    border: `1px solid ${hasEnoughBalance ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                    borderRadius: '14px',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '13px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Wallet size={18} color={hasEnoughBalance ? '#22C55E' : '#EF4444'} />
                        <span style={{ color: '#E2E8F0' }}>رصيد محفظتك الحالي:</span>
                    </div>
                    <strong style={{ color: hasEnoughBalance ? '#4ADE80' : '#F87171' }}>
                        {formattedBalance} {currencyLabel}
                    </strong>
                </div>

                {/* Insufficient Balance Notice */}
                {!hasEnoughBalance && (
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.4)',
                        borderRadius: '12px',
                        padding: '12px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        fontSize: '13px',
                        color: '#FCA5A5',
                    }}>
                        <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div>
                            <span>عفواً، رصيد محفظتك غير كافٍ لإتمام هذا الطلب. يرجى شحن المحفظة أولاً.</span>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                    {hasEnoughBalance ? (
                        <Button
                            variant="primary"
                            size="lg"
                            loading={loading}
                            icon={Zap}
                            onClick={onConfirm}
                            style={{ flex: 1 }}
                        >
                            تأكيد وخصم المبلغ فوري
                        </Button>
                    ) : (
                        <Link to="/deposit" style={{ flex: 1, textDecoration: 'none' }}>
                            <Button
                                variant="primary"
                                size="lg"
                                icon={PlusCircle}
                                style={{
                                    width: '100%',
                                    background: 'linear-gradient(135deg, #22C55E 0%, #15803D 100%)',
                                    boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)',
                                }}
                            >
                                شحن المحفظة الآن
                            </Button>
                        </Link>
                    )}

                    <Button
                        variant="ghost"
                        size="lg"
                        disabled={loading}
                        onClick={onClose}
                        style={{ color: '#8E8E98' }}
                    >
                        إلغاء
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
