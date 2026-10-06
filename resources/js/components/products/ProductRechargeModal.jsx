import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    X,
    Lock,
    User,
    Server,
    Globe,
    Zap,
    Sparkles,
    Layers,
    Check,
    ChevronDown,
    Plus,
    Minus,
    ShieldCheck
} from 'lucide-react';
import { formatImageUrl } from '../../utils/imageHelper';
import { ordersApi, walletApi } from '../../api/endpoints';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { TargetAppIconRenderer } from '../target/TargetAppIcons';
import OrderConfirmModal from './OrderConfirmModal';
import '../../../css/kaProductRecharge.css';

export default function ProductRechargeModal({
    isOpen,
    onClose,
    product,
    onOrderSuccess
}) {
    if (!isOpen || !product) return null;

    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const { success, error: toastError } = useToast();

    const tiers = useMemo(() => {
        return product.tiers || product.active_tiers || [];
    }, [product]);

    const [selectedTier, setSelectedTier] = useState(tiers.length > 0 ? tiers[0] : null);
    const [quantity, setQuantity] = useState(1);
    const [playerId, setPlayerId] = useState('');
    const [serverId, setServerId] = useState('');
    const [accountRegion, setAccountRegion] = useState('');
    const [walletBalance, setWalletBalance] = useState(0);

    const [showPackageGrid, setShowPackageGrid] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const availableTiers = product.tiers || product.active_tiers || [];
        if (availableTiers.length > 0) {
            setSelectedTier(availableTiers[0]);
        } else {
            setSelectedTier(null);
        }
        setQuantity(1);
        setPlayerId('');
        setServerId('');
        setAccountRegion('');
        setErrors({});
    }, [product]);

    useEffect(() => {
        if (isAuthenticated) {
            walletApi.getBalance()
                .then(res => {
                    if (res?.data?.balance !== undefined) {
                        setWalletBalance(Number(res.data.balance));
                    }
                })
                .catch(() => {});
        }
    }, [isAuthenticated]);

    const handleQuantityChange = (delta) => {
        setQuantity(prev => Math.max(1, Math.min(9999999, prev + delta)));
    };

    // Calculate total price based on tier or unit rate
    const unitPrice = useMemo(() => {
        if (selectedTier) {
            return Number(selectedTier.price_egp || selectedTier.price || selectedTier.final_price || 0);
        }
        if (product.unit_price) {
            return Number(product.unit_price);
        }
        return 0;
    }, [selectedTier, product]);

    const totalPrice = useMemo(() => {
        return unitPrice * quantity;
    }, [unitPrice, quantity]);

    const formattedTotal = totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const approxUsd = (totalPrice / 50.5).toFixed(2);

    const productImage = formatImageUrl(product.image_url || product.image || product.banner_url || product.icon_url);

    const handlePreSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        if (!isAuthenticated) {
            toastError('يرجى تسجيل الدخول أولاً لإتمام عملية الشحن');
            navigate('/login', { state: { from: { pathname: window.location.pathname } } });
            return;
        }

        const newErrors = {};
        if (tiers.length > 0 && !selectedTier) {
            newErrors.tier = 'يرجى اختيار باقة الشحن المطلوبة';
        }

        if (product.player_id_label && !playerId.trim()) {
            newErrors.playerId = `يرجى إدخال ${product.player_id_label}`;
        }

        if (product.has_server_id && !serverId.trim()) {
            newErrors.serverId = `يرجى إدخال / اختيار ${product.server_id_label || 'السيرفر'}`;
        }

        if (product.requires_account_region && !accountRegion.trim()) {
            newErrors.accountRegion = 'يرجى اختيار دولة / منطقة الحساب';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setConfirmModalOpen(true);
    };

    const handleConfirmOrder = async () => {
        setSubmitting(true);
        try {
            const payload = {
                product_id: product.id,
                product_tier_id: selectedTier?.id,
                quantity: quantity,
                player_id: playerId.trim() || undefined,
                server_id: serverId.trim() || undefined,
                account_region: accountRegion.trim() || undefined,
            };

            const res = await ordersApi.createOrder(payload);

            if (res?.data) {
                setConfirmModalOpen(false);
                onClose();
                success('تم إنشاء طلب الشحن بنجاح وجاري تنفيذه فوراً');
                if (onOrderSuccess) {
                    onOrderSuccess(res.data);
                } else {
                    navigate(`/orders/${res.data.id || res.data.public_id || ''}`);
                }
            }
        } catch (err) {
            if (err.message) {
                toastError(err.message);
            } else {
                toastError('حدث خطأ أثناء تنفيذ الطلب، يرجى المحاولة مرة أخرى');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            {/* Modal Overlay / Backdrop */}
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.78)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px',
                    boxSizing: 'border-box',
                    animation: 'fadeIn 0.2s ease-out',
                }}
                onClick={(e) => {
                    if (e.target === e.currentTarget) onClose();
                }}
            >
                {/* Modal Container */}
                <div
                    className="ka-recharge-card"
                    style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '430px',
                        maxHeight: '92vh',
                        overflowY: 'auto',
                        background: '#0B0B0F',
                        border: '1.5px solid rgba(212, 165, 55, 0.4)',
                        borderRadius: '24px',
                        padding: '20px 18px 22px',
                        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(212, 165, 55, 0.12)',
                        fontFamily: 'var(--font-cairo)',
                        boxSizing: 'border-box',
                        margin: 'auto',
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header Row: Close Button & Title with Avatar & Status */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '16px',
                        gap: '12px'
                    }}>
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                width: '34px',
                                height: '34px',
                                borderRadius: '50%',
                                background: 'rgba(255, 255, 255, 0.08)',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                color: '#CBD5E1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}
                            title="إغلاق"
                        >
                            <X size={18} />
                        </button>

                        {/* Title & Status Badge */}
                        <div style={{ textAlign: 'center', flex: 1 }}>
                            <h2 style={{
                                fontSize: '18px',
                                fontWeight: '900',
                                color: '#FFFFFF',
                                margin: '0 0 4px',
                                lineHeight: 1.2
                            }}>
                                {product.name}
                            </h2>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                                <span style={{
                                    display: 'inline-block',
                                    width: '7px',
                                    height: '7px',
                                    borderRadius: '50%',
                                    background: '#10B981',
                                    boxShadow: '0 0 6px #10B981'
                                }} />
                                <span style={{
                                    fontSize: '11.5px',
                                    fontWeight: '800',
                                    color: '#10B981'
                                }}>
                                    متاح
                                </span>
                            </div>
                        </div>

                        {/* App Thumbnail */}
                        <div style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '12px',
                            border: '1.5px solid rgba(212, 165, 55, 0.5)',
                            overflow: 'hidden',
                            background: '#121218',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            {productImage ? (
                                <img
                                    src={productImage}
                                    alt={product.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                <TargetAppIconRenderer app={product} size={36} />
                            )}
                        </div>
                    </div>

                    {/* Instant Speed Banner */}
                    <div style={{
                        background: 'linear-gradient(90deg, rgba(212, 165, 55, 0.12) 0%, rgba(212, 165, 55, 0.05) 100%)',
                        border: '1px solid rgba(212, 165, 55, 0.3)',
                        borderRadius: '14px',
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        marginBottom: '16px',
                        color: 'var(--gold-400, #F5D061)',
                        fontWeight: '800',
                        fontSize: '13.5px',
                    }}>
                        <Zap size={18} fill="currentColor" />
                        <span>الشحن 0 ثانيه (متاح للتنفيذ الفوري)</span>
                    </div>

                    <form onSubmit={handlePreSubmit}>
                        {/* If product has tiers: Package Selection Bar */}
                        {tiers.length > 0 && (
                            <div style={{ marginBottom: '14px' }}>
                                <div
                                    onClick={() => setShowPackageGrid(prev => !prev)}
                                    style={{
                                        background: 'rgba(20, 20, 28, 0.95)',
                                        border: '1px solid rgba(212, 165, 55, 0.35)',
                                        borderRadius: '14px',
                                        padding: '12px 14px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Layers size={16} color="#D4A537" />
                                        <span style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF' }}>
                                            {selectedTier ? selectedTier.name : 'اختر باقة الشحن المطلوبة'}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {selectedTier && (
                                            <span style={{ fontSize: '12.5px', fontWeight: '800', color: '#F5D061' }}>
                                                {Number(selectedTier.price_egp || selectedTier.price || 0).toFixed(2)} EGP
                                            </span>
                                        )}
                                        <ChevronDown
                                            size={16}
                                            color="#CBD5E1"
                                            style={{
                                                transform: showPackageGrid ? 'rotate(180deg)' : 'rotate(0deg)',
                                                transition: 'transform 0.2s'
                                            }}
                                        />
                                    </div>
                                </div>

                                {showPackageGrid && (
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(2, 1fr)',
                                        gap: '8px',
                                        marginTop: '10px',
                                        maxHeight: '160px',
                                        overflowY: 'auto',
                                        padding: '2px',
                                    }}>
                                        {tiers.map((t) => {
                                            const isSelected = selectedTier?.id === t.id;
                                            return (
                                                <div
                                                    key={t.id}
                                                    onClick={() => {
                                                        setSelectedTier(t);
                                                        setShowPackageGrid(false);
                                                    }}
                                                    style={{
                                                        background: isSelected ? 'rgba(212, 165, 55, 0.16)' : 'rgba(15, 15, 22, 0.9)',
                                                        border: isSelected ? '1.5px solid #F5D061' : '1px solid rgba(255, 255, 255, 0.08)',
                                                        borderRadius: '10px',
                                                        padding: '8px 10px',
                                                        cursor: 'pointer',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <div style={{ fontSize: '12px', fontWeight: '800', color: isSelected ? '#F5D061' : '#FFFFFF' }}>
                                                        {t.name}
                                                    </div>
                                                    <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '2px' }}>
                                                        {Number(t.price_egp || t.price || 0).toFixed(2)} EGP
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Metric Boxes: Total Required & Quantity */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1.1fr 0.9fr',
                            gap: '10px',
                            marginBottom: '16px'
                        }}>
                            {/* Total Box */}
                            <div style={{
                                background: 'rgba(18, 18, 26, 0.9)',
                                border: '1px solid rgba(212, 165, 55, 0.25)',
                                borderRadius: '16px',
                                padding: '12px 10px',
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <span style={{ fontSize: '12px', fontWeight: '700', color: '#9CA3AF', marginBottom: '4px' }}>
                                    الإجمالي المطلوب
                                </span>
                                <div style={{ fontSize: '19px', fontWeight: '900', color: '#F5D061', lineHeight: 1.2 }}>
                                    {formattedTotal} <small style={{ fontSize: '11px', color: '#D4A537' }}>EGY</small>
                                </div>
                                <span style={{ fontSize: '11px', fontWeight: '700', color: '#10B981', marginTop: '2px' }}>
                                    ~ ${approxUsd}
                                </span>
                            </div>

                            {/* Quantity Box */}
                            <div style={{
                                background: 'rgba(18, 18, 26, 0.9)',
                                border: '1px solid rgba(212, 165, 55, 0.25)',
                                borderRadius: '16px',
                                padding: '12px 10px',
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <span style={{ fontSize: '12px', fontWeight: '700', color: '#9CA3AF', marginBottom: '4px' }}>
                                    الكمية
                                </span>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px',
                                    width: '100%'
                                }}>
                                    <button
                                        type="button"
                                        onClick={() => handleQuantityChange(-1)}
                                        style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '6px',
                                            background: 'rgba(255, 255, 255, 0.08)',
                                            border: 'none',
                                            color: '#FFFFFF',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Minus size={12} />
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        max="9999999"
                                        value={quantity}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value, 10);
                                            if (isNaN(val) || val <= 0) {
                                                setQuantity(1);
                                            } else {
                                                setQuantity(val);
                                            }
                                        }}
                                        style={{
                                            width: '50px',
                                            textAlign: 'center',
                                            background: 'transparent',
                                            border: 'none',
                                            color: '#FFFFFF',
                                            fontSize: '17px',
                                            fontWeight: '900',
                                            outline: 'none',
                                            padding: 0
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleQuantityChange(1)}
                                        style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '6px',
                                            background: 'rgba(255, 255, 255, 0.08)',
                                            border: 'none',
                                            color: '#FFFFFF',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Plus size={12} />
                                    </button>
                                </div>
                                <span style={{ fontSize: '10px', color: '#6B7280', marginTop: '2px' }}>
                                    1 — 9,999
                                </span>
                            </div>
                        </div>

                        {/* Player ID Input */}
                        <div style={{
                            background: 'rgba(18, 18, 26, 0.9)',
                            border: '1px solid rgba(212, 165, 55, 0.25)',
                            borderRadius: '16px',
                            padding: '12px 14px',
                            marginBottom: '16px'
                        }}>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '12.5px',
                                fontWeight: '800',
                                color: '#CBD5E1',
                                marginBottom: '8px'
                            }}>
                                <User size={15} color="#D4A537" />
                                <span>{product.player_id_label || 'معرف المستخدم (Player ID)'}</span>
                            </label>

                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    required
                                    value={playerId}
                                    onChange={(e) => {
                                        setPlayerId(e.target.value);
                                        if (errors.playerId) setErrors(prev => ({ ...prev, playerId: null }));
                                    }}
                                    placeholder={product.player_id_label ? `أدخل ${product.player_id_label}` : 'أدخل معرف الحساب / Player ID'}
                                    style={{
                                        width: '100%',
                                        boxSizing: 'border-box',
                                        background: '#09090D',
                                        border: '1px solid rgba(212, 165, 55, 0.3)',
                                        borderRadius: '12px',
                                        padding: '11px 14px',
                                        color: '#FFFFFF',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        outline: 'none',
                                        fontFamily: 'var(--font-cairo)',
                                    }}
                                />
                            </div>
                            {errors.playerId && (
                                <span style={{ color: '#EF4444', fontSize: '11.5px', fontWeight: '700', marginTop: '6px', display: 'block' }}>
                                    {errors.playerId}
                                </span>
                            )}

                            {/* Server ID if applicable */}
                            {product.has_server_id && (
                                <div style={{ marginTop: '10px' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                        <Server size={14} color="#D4A537" />
                                        <span>{product.server_id_label || 'رقم السيرفر (Zone ID)'}</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={serverId}
                                        onChange={(e) => {
                                            setServerId(e.target.value);
                                            if (errors.serverId) setErrors(prev => ({ ...prev, serverId: null }));
                                        }}
                                        placeholder="مثال: 1234"
                                        style={{
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            background: '#09090D',
                                            border: '1px solid rgba(212, 165, 55, 0.3)',
                                            borderRadius: '12px',
                                            padding: '11px 14px',
                                            color: '#FFFFFF',
                                            fontSize: '14px',
                                            fontWeight: '700',
                                            outline: 'none',
                                            fontFamily: 'var(--font-cairo)',
                                        }}
                                    />
                                    {errors.serverId && (
                                        <span style={{ color: '#EF4444', fontSize: '11.5px', fontWeight: '700', marginTop: '4px', display: 'block' }}>
                                            {errors.serverId}
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Account Region if applicable */}
                            {product.requires_account_region && (
                                <div style={{ marginTop: '10px' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                        <Globe size={14} color="#D4A537" />
                                        <span>منطقة / سيرفر الحساب</span>
                                    </label>
                                    <select
                                        value={accountRegion}
                                        onChange={(e) => {
                                            setAccountRegion(e.target.value);
                                            if (errors.accountRegion) setErrors(prev => ({ ...prev, accountRegion: null }));
                                        }}
                                        style={{
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            background: '#09090D',
                                            border: '1px solid rgba(212, 165, 55, 0.3)',
                                            borderRadius: '12px',
                                            padding: '11px 14px',
                                            color: '#FFFFFF',
                                            fontSize: '14px',
                                            fontWeight: '700',
                                            outline: 'none',
                                            fontFamily: 'var(--font-cairo)',
                                        }}
                                    >
                                        <option value="">اختر المنطقة</option>
                                        <option value="ME">الشرق الأوسط (Middle East)</option>
                                        <option value="EU">أوروبا (Europe)</option>
                                        <option value="GLOBAL">عالمي (Global)</option>
                                    </select>
                                    {errors.accountRegion && (
                                        <span style={{ color: '#EF4444', fontSize: '11.5px', fontWeight: '700', marginTop: '4px', display: 'block' }}>
                                            {errors.accountRegion}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Actions Row: Buy (Gold) + Cancel (Dark) */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1.4fr 1fr',
                            gap: '10px'
                        }}>
                            <button
                                type="submit"
                                style={{
                                    background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                    color: '#0A0A0E',
                                    border: 'none',
                                    borderRadius: '14px',
                                    padding: '13px 16px',
                                    fontSize: '14px',
                                    fontWeight: '900',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    cursor: 'pointer',
                                    boxShadow: '0 6px 20px rgba(212, 165, 55, 0.35)',
                                    transition: 'all 0.2s',
                                    fontFamily: 'var(--font-cairo)',
                                }}
                            >
                                <Lock size={16} />
                                <span>شراء ({formattedTotal} EGP)</span>
                            </button>

                            <button
                                type="button"
                                onClick={onClose}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.06)',
                                    color: '#E2E8F0',
                                    border: '1px solid rgba(255, 255, 255, 0.12)',
                                    borderRadius: '14px',
                                    padding: '13px 16px',
                                    fontSize: '14px',
                                    fontWeight: '800',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    fontFamily: 'var(--font-cairo)',
                                }}
                            >
                                إلغاء
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Confirmation Modal */}
            <OrderConfirmModal
                isOpen={confirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                product={product}
                tier={selectedTier}
                quantity={quantity}
                playerId={playerId}
                serverId={serverId}
                accountRegion={accountRegion}
                walletBalance={walletBalance}
                currency={user?.currency || 'EGP'}
                onConfirm={handleConfirmOrder}
                loading={submitting}
            />
        </>
    );
}
