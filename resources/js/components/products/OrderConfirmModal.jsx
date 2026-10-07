import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, AlertCircle, Wallet, CheckCircle2, Zap, ArrowLeft, PlusCircle, Gamepad2 } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { formatImageUrl } from '../../utils/imageHelper';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

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
    calculatedTotal,
}) {
    if (!product) return null;

    const { t, isRtl, language } = useLanguage();
    const { theme } = useTheme();
    const isLight = theme === 'light';

    const unitPrice = tier
        ? Number(tier.price_egp || tier.price || tier.final_price || 0)
        : Number(product.unit_price || product.price || 0);
    const totalPrice = calculatedTotal !== undefined && calculatedTotal !== null
        ? Number(calculatedTotal)
        : unitPrice * (quantity || 1);
    const hasEnoughBalance = walletBalance >= totalPrice;

    const formattedTotal = totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const formattedBalance = Number(walletBalance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const currencyLabel = language === 'en' ? 'EGP' : 'ج.م';

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={t('orderConfirmation', 'تأكيد طلب الشحن الفوري')}
            maxWidth="480px"
            zIndex={10060}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {/* Product & Package Summary */}
                <div style={{
                    background: isLight ? '#F8FAFC' : 'rgba(26, 26, 36, 0.8)',
                    border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(212, 165, 55, 0.2)',
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
                        background: isLight ? '#FFFFFF' : '#121218',
                        border: isLight ? '1px solid #E2E8F0' : 'none',
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
                        <h4 style={{ margin: '0 0 2px', fontSize: '15px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                            {product.name}
                        </h4>
                        <span style={{ fontSize: '13px', color: isLight ? '#B45309' : '#D4A537', fontWeight: '700' }}>
                            {tier ? `${t('package', 'الباقة')}: ${tier.name}` : `${t('amount', 'السعر')}: ${unitPrice} ${currencyLabel}`} {quantity > 1 ? `(${t('quantity', 'الكمية')}: ${quantity})` : ''}
                        </span>
                    </div>
                </div>

                {/* Player Credentials Details */}
                <div style={{
                    background: isLight ? '#F8FAFC' : 'rgba(18, 18, 24, 0.6)',
                    border: isLight ? '1px solid #E2E8F0' : 'none',
                    borderRadius: '14px',
                    padding: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    fontSize: '13px',
                }}>
                    {playerId && (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: isLight ? '#64748B' : '#8E8E98' }}>{product.player_id_label || t('playerIdentifier', 'معرف اللاعب / ID')}:</span>
                            <strong style={{ color: isLight ? '#0F172A' : '#FFFFFF', letterSpacing: '0.5px' }}>{playerId}</strong>
                        </div>
                    )}

                    {serverId && (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: isLight ? '#64748B' : '#8E8E98' }}>{product.server_id_label || t('server', 'المنطقة / السيرفر')}:</span>
                            <strong style={{ color: isLight ? '#0F172A' : '#FFFFFF' }}>{serverId}</strong>
                        </div>
                    )}

                    {accountRegion && (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: isLight ? '#64748B' : '#8E8E98' }}>{t('region', 'دولة الحساب')}:</span>
                            <strong style={{ color: isLight ? '#0F172A' : '#FFFFFF' }}>{accountRegion}</strong>
                        </div>
                    )}

                    <div style={{
                        borderTop: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                        paddingTop: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                    }}>
                        <span style={{ color: isLight ? '#334155' : '#CBD5E1', fontWeight: '700' }}>{t('totalDue', 'إجمالي المبلغ المطلوب')}:</span>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                            <strong style={{ fontSize: '18px', color: isLight ? '#B45309' : '#D4A537' }}>{formattedTotal}</strong>
                            <span style={{ fontSize: '12px', color: isLight ? '#B45309' : '#D4A537', fontWeight: '800' }}>{currencyLabel}</span>
                        </div>
                    </div>
                </div>

                {/* Wallet Balance Status */}
                <div style={{
                    background: hasEnoughBalance
                        ? (isLight ? '#DCFCE7' : 'rgba(34, 197, 94, 0.1)')
                        : (isLight ? '#FEE2E2' : 'rgba(239, 68, 68, 0.12)'),
                    border: `1px solid ${hasEnoughBalance
                        ? (isLight ? '#86EFAC' : 'rgba(34, 197, 94, 0.3)')
                        : (isLight ? '#FCA5A5' : 'rgba(239, 68, 68, 0.3)')}`,
                    borderRadius: '14px',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '13px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Wallet size={18} color={hasEnoughBalance ? (isLight ? '#15803D' : '#22C55E') : '#EF4444'} />
                        <span style={{ color: isLight ? (hasEnoughBalance ? '#14532D' : '#7F1D1D') : '#E2E8F0', fontWeight: '700' }}>
                            {t('walletBalance', 'رصيد محفظتك الحالي')}:
                        </span>
                    </div>
                    <strong style={{ color: hasEnoughBalance ? (isLight ? '#15803D' : '#4ADE80') : (isLight ? '#DC2626' : '#F87171') }}>
                        {formattedBalance} {currencyLabel}
                    </strong>
                </div>

                {/* Insufficient Balance Notice */}
                {!hasEnoughBalance && (
                    <div style={{
                        background: isLight ? '#FEF2F2' : 'rgba(239, 68, 68, 0.15)',
                        border: isLight ? '1px solid #FECACA' : '1px solid rgba(239, 68, 68, 0.4)',
                        borderRadius: '12px',
                        padding: '12px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        fontSize: '13px',
                        color: isLight ? '#991B1B' : '#FCA5A5',
                    }}>
                        <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div>
                            <span>{t('insufficientBalance', 'عفواً، رصيد محفظتك غير كافٍ لإتمام هذا الطلب. يرجى شحن المحفظة أولاً.')}</span>
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
                            {t('confirmAndPay', 'تأكيد ودفع الآن')}
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
                                {t('chargeWallet', 'شحن المحفظة الآن')}
                            </Button>
                        </Link>
                    )}

                    <button
                        type="button"
                        disabled={loading}
                        onClick={onClose}
                        style={{
                            background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.08)',
                            color: isLight ? '#334155' : '#F8FAFC',
                            border: isLight ? '1.5px solid #CBD5E1' : '1.5px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '12px',
                            padding: '12px 20px',
                            fontWeight: '800',
                            fontSize: '14px',
                            cursor: 'pointer',
                            fontFamily: 'var(--font-cairo)',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.08)';
                        }}
                    >
                        {t('cancel', 'إلغاء')}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
