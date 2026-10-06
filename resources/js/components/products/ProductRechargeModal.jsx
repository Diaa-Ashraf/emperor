import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    X,
    Lock,
    User,
    Server,
    Globe,
    Layers,
    ChevronDown,
    FileText,
    Check
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
    const [quantityInput, setQuantityInput] = useState('1');
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
        setQuantityInput('1');
        setPlayerId('');
        setServerId('');
        setAccountRegion('');
        setErrors({});
        setShowPackageGrid(false);
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

    // Handle direct quantity input
    const handleQuantityInputChange = (e) => {
        const valStr = e.target.value;
        setQuantityInput(valStr);
        const parsed = parseInt(valStr, 10);
        if (!isNaN(parsed) && parsed > 0) {
            setQuantity(Math.min(9999, parsed));
        } else if (valStr === '') {
            setQuantity(1);
        }
    };

    const handleQuantityInputBlur = () => {
        const parsed = parseInt(quantityInput, 10);
        if (isNaN(parsed) || parsed < 1) {
            setQuantity(1);
            setQuantityInput('1');
        } else if (parsed > 9999) {
            setQuantity(9999);
            setQuantityInput('9999');
        } else {
            setQuantity(parsed);
            setQuantityInput(String(parsed));
        }
    };

    // Calculate total price based on tier or unit rate
    const unitPrice = useMemo(() => {
        if (selectedTier) {
            return Number(selectedTier.price_egp || selectedTier.price || selectedTier.final_price || 0);
        }
        if (product.unit_price) {
            return Number(product.unit_price);
        }
        if (product.price) {
            return Number(product.price);
        }
        return 0;
    }, [selectedTier, product]);

    const totalPrice = useMemo(() => {
        return unitPrice * quantity;
    }, [unitPrice, quantity]);

    // Format with commas and exact precision
    const formattedTotal = totalPrice.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 3
    });

    const approxUsd = (totalPrice / 50.5).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 3
    });

    const productImage = formatImageUrl(
        product.image_url || product.image || product.banner_url || product.icon_url
    );

    const displayName = selectedTier?.name && tiers.length === 1
        ? selectedTier.name
        : product.name;

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

        if (!playerId.trim()) {
            newErrors.playerId = `يرجى إدخال ${product.player_id_label || 'معرف المستخدم (Player ID)'}`;
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
                    backgroundColor: 'rgba(0, 0, 0, 0.82)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
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
                        maxWidth: '460px',
                        maxHeight: '92vh',
                        overflowY: 'auto',
                        background: 'linear-gradient(180deg, #141310 0%, #0c0b08 100%)',
                        border: '1.5px solid rgba(212, 165, 55, 0.45)',
                        borderRadius: '24px',
                        padding: '22px 20px 24px',
                        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 35px rgba(212, 165, 55, 0.15)',
                        fontFamily: 'var(--font-cairo)',
                        boxSizing: 'border-box',
                        margin: 'auto',
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Top Bar: Close Button (Top-Left) & VIP Badge (Top-Right) */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        marginBottom: '6px'
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
                                border: '1px solid rgba(255, 255, 255, 0.15)',
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

                        {/* KA / Emperor VIP Crest Badge */}
                        <div style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, rgba(212, 165, 55, 0.25) 0%, rgba(212, 165, 55, 0.08) 100%)',
                            border: '1px solid rgba(212, 165, 55, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 0 12px rgba(212, 165, 55, 0.2)'
                        }}>
                            <span style={{
                                color: '#F5D061',
                                fontWeight: '900',
                                fontSize: '15px',
                                letterSpacing: '-0.5px'
                            }}>
                                KA
                            </span>
                        </div>
                    </div>

                    {/* Centered Avatar Header */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        marginBottom: '16px'
                    }}>
                        {/* Circular Avatar */}
                        <div style={{
                            width: '78px',
                            height: '78px',
                            borderRadius: '50%',
                            border: '2px solid #D4A537',
                            boxShadow: '0 0 20px rgba(212, 165, 55, 0.4), inset 0 0 10px rgba(0, 0, 0, 0.6)',
                            overflow: 'hidden',
                            background: '#0B0B0F',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '10px',
                            flexShrink: 0
                        }}>
                            {productImage ? (
                                <img
                                    src={productImage}
                                    alt={displayName}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                <TargetAppIconRenderer app={product} size={50} />
                            )}
                        </div>

                        {/* Title with Gold Accent Underline */}
                        <h2 style={{
                            fontSize: '20px',
                            fontWeight: '900',
                            color: '#FFFFFF',
                            margin: '0 0 4px',
                            lineHeight: 1.25,
                            letterSpacing: '-0.3px'
                        }}>
                            {displayName}
                        </h2>

                        <div style={{
                            width: '56px',
                            height: '2px',
                            background: 'linear-gradient(90deg, transparent, #D4A537, transparent)',
                            marginBottom: '8px'
                        }} />

                        {/* Status Badge: متاح */}
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: 'rgba(34, 197, 94, 0.14)',
                            border: '1px solid rgba(34, 197, 94, 0.4)',
                            padding: '3px 14px',
                            borderRadius: '9999px',
                            boxShadow: '0 0 12px rgba(34, 197, 94, 0.15)'
                        }}>
                            <span style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: '#22C55E',
                                boxShadow: '0 0 8px #22C55E'
                            }} />
                            <span style={{
                                fontSize: '12px',
                                fontWeight: '800',
                                color: '#4ADE80'
                            }}>
                                متاح
                            </span>
                        </div>
                    </div>

                    <form onSubmit={handlePreSubmit}>
                        {/* If product has multiple tiers: Package Selector Bar */}
                        {tiers.length > 0 && (
                            <div style={{ marginBottom: '14px' }}>
                                <div
                                    onClick={() => setShowPackageGrid(prev => !prev)}
                                    style={{
                                        background: 'linear-gradient(90deg, rgba(46, 33, 58, 0.6) 0%, rgba(26, 26, 36, 0.85) 100%)',
                                        border: '1px solid rgba(212, 165, 55, 0.4)',
                                        borderRadius: '12px',
                                        padding: '10px 14px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <FileText size={16} color="#D4A537" />
                                        <span style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF' }}>
                                            {selectedTier ? selectedTier.name : 'اختر باقة الشحن المطلوبة'}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {selectedTier && (
                                            <span style={{ fontSize: '12.5px', fontWeight: '900', color: '#F5D061' }}>
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
                                        maxHeight: '180px',
                                        overflowY: 'auto',
                                        padding: '4px',
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
                                                        background: isSelected ? 'rgba(212, 165, 55, 0.2)' : 'rgba(18, 17, 14, 0.95)',
                                                        border: isSelected ? '1.5px solid #F5D061' : '1px solid rgba(255, 255, 255, 0.1)',
                                                        borderRadius: '10px',
                                                        padding: '8px 10px',
                                                        cursor: 'pointer',
                                                        textAlign: 'center',
                                                        transition: 'all 0.15s ease'
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

                        {/* Metric Boxes: [الإجمالي] on Left, [الكمية] on Right (Matching KA Screenshots) */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1.15fr 0.85fr',
                            gap: '12px',
                            marginBottom: '16px'
                        }}>
                            {/* Box 1: الإجمالي */}
                            <div style={{
                                background: 'rgba(18, 17, 14, 0.95)',
                                border: '1px solid rgba(212, 165, 55, 0.3)',
                                borderRadius: '16px',
                                padding: '12px 10px',
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <span style={{
                                    fontSize: '12px',
                                    fontWeight: '800',
                                    color: '#9CA3AF',
                                    marginBottom: '4px'
                                }}>
                                    الإجمالي
                                </span>
                                
                                <div style={{
                                    fontSize: '18px',
                                    fontWeight: '900',
                                    color: '#FFFFFF',
                                    lineHeight: 1.2,
                                    direction: 'ltr',
                                    display: 'flex',
                                    alignItems: 'baseline',
                                    justifyContent: 'center',
                                    gap: '4px'
                                }}>
                                    <span>{formattedTotal}</span>
                                    <span style={{ fontSize: '13px', color: '#D4A537', fontWeight: '800' }}>Egy</span>
                                </div>

                                <div style={{
                                    marginTop: '4px',
                                    background: 'rgba(34, 197, 94, 0.12)',
                                    border: '1px solid rgba(34, 197, 94, 0.35)',
                                    borderRadius: '6px',
                                    padding: '1px 8px',
                                    fontSize: '11px',
                                    fontWeight: '800',
                                    color: '#4ADE80',
                                    direction: 'ltr'
                                }}>
                                    {approxUsd} $
                                </div>
                            </div>

                            {/* Box 2: الكمية */}
                            <div style={{
                                background: 'rgba(18, 17, 14, 0.95)',
                                border: '1px solid rgba(212, 165, 55, 0.3)',
                                borderRadius: '16px',
                                padding: '12px 10px',
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <span style={{
                                    fontSize: '12px',
                                    fontWeight: '800',
                                    color: '#9CA3AF',
                                    marginBottom: '4px'
                                }}>
                                    الكمية
                                </span>

                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                    <input
                                        type="number"
                                        min="1"
                                        max="9999"
                                        value={quantityInput}
                                        onChange={handleQuantityInputChange}
                                        onBlur={handleQuantityInputBlur}
                                        style={{
                                            width: '85%',
                                            background: '#07070A',
                                            border: '1.5px solid rgba(212, 165, 55, 0.4)',
                                            borderRadius: '10px',
                                            padding: '4px 6px',
                                            color: '#FFFFFF',
                                            fontSize: '18px',
                                            fontWeight: '900',
                                            textAlign: 'center',
                                            outline: 'none',
                                            boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.8)',
                                            fontFamily: 'var(--font-cairo)',
                                        }}
                                        onFocus={(e) => {
                                            e.currentTarget.style.borderColor = '#F5D061';
                                            e.currentTarget.style.boxShadow = '0 0 10px rgba(212, 165, 55, 0.3)';
                                        }}
                                        onBlurCapture={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(212, 165, 55, 0.4)';
                                            e.currentTarget.style.boxShadow = 'inset 0 2px 6px rgba(0, 0, 0, 0.8)';
                                        }}
                                    />
                                </div>

                                <span style={{
                                    fontSize: '10.5px',
                                    color: '#71717A',
                                    marginTop: '4px',
                                    fontFamily: 'monospace'
                                }}>
                                    1 — 9,999
                                </span>
                            </div>
                        </div>

                        {/* Player ID / معرف المستخدم Input Card */}
                        <div style={{
                            background: 'rgba(18, 17, 14, 0.95)',
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
                                <span>{product.player_id_label || 'معرف المستخدم'}</span>
                            </label>

                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    required
                                    value={playerId}
                                    onChange={(e) => {
                                        setPlayerId(e.target.value);
                                        if (errors.playerId) setErrors(prev => ({ ...prev, playerId: null }));
                                    }}
                                    placeholder="معرف المستخدم"
                                    style={{
                                        width: '100%',
                                        boxSizing: 'border-box',
                                        background: '#07070A',
                                        border: '1.5px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '12px',
                                        padding: '11px 40px 11px 14px',
                                        color: '#FFFFFF',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        outline: 'none',
                                        fontFamily: 'var(--font-cairo)',
                                        transition: 'all 0.2s ease',
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = '#D4A537';
                                        e.currentTarget.style.boxShadow = '0 0 12px rgba(212, 165, 55, 0.25)';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                />
                                <User
                                    size={17}
                                    color="#64748B"
                                    style={{
                                        position: 'absolute',
                                        right: '12px',
                                        pointerEvents: 'none'
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
                                            background: '#07070A',
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
                                            background: '#07070A',
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

                        {/* Actions Row: [شراء] (Gold with lock) + [إلغاء] (Dark) */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1.5fr 1fr',
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
                                    fontSize: '15px',
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
                                <span>شراء</span>
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
