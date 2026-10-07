import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    X,
    Lock,
    User,
    Server,
    Globe,
    ChevronDown,
    FileText,
} from 'lucide-react';
import { formatImageUrl } from '../../utils/imageHelper';
import { ordersApi, walletApi } from '../../api/endpoints';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { useLanguage } from '../../contexts/LanguageContext';
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
    const { t, isRtl, language } = useLanguage();

    const tiers = useMemo(() => {
        return product.tiers || product.active_tiers || [];
    }, [product]);

    // Detect if this is a custom-quantity coin/voice app (matching KA-CARD mode)
    const isCustomQuantity = useMemo(() => {
        const catType = product.category?.type;
        const catSlug = product.category?.slug;
        if (catType === 'voice_apps' || catSlug === 'apps' || catSlug === 'voice_apps') return true;
        if (typeof window !== 'undefined' && (window.location.pathname.includes('/apps') || window.location.search.includes('app='))) return true;
        if (product.parent_id !== null && product.parent_id !== undefined) return true;
        const nameLower = (product.name || '').toLowerCase();
        const voiceKeywords = [
            'فان اب', 'هلين', 'أهلاً', 'يوهو', 'يويو', 'بولا', 'مجلس',
            'زينا', 'هايو', 'زفا', 'شات', 'كوينز', 'funup', 'haahlan',
            'yoho', 'yoyo', 'pola', 'majlis', 'zina', 'yabi', 'zafa', 'soulchill'
        ];
        return voiceKeywords.some(kw => nameLower.includes(kw));
    }, [product]);

    const [selectedTier, setSelectedTier] = useState(tiers.length > 0 ? tiers[0] : null);
    const [quantity, setQuantity] = useState(isCustomQuantity ? 0 : 1);
    const [quantityInput, setQuantityInput] = useState(isCustomQuantity ? '0' : '1');
    const [playerId, setPlayerId] = useState('');
    const [serverId, setServerId] = useState('');
    const [accountRegion, setAccountRegion] = useState('');
    const [walletBalance, setWalletBalance] = useState(0);

    const [showPackageGrid, setShowPackageGrid] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    // Reset when product changes
    useEffect(() => {
        const availableTiers = product.tiers || product.active_tiers || [];
        if (availableTiers.length > 0) {
            setSelectedTier(availableTiers[0]);
        } else {
            setSelectedTier(null);
        }

        if (isCustomQuantity) {
            setQuantity(0);
            setQuantityInput('0');
        } else {
            setQuantity(1);
            setQuantityInput('1');
        }

        setPlayerId('');
        setServerId('');
        setAccountRegion('');
        setErrors({});
        setShowPackageGrid(false);
    }, [product, isCustomQuantity]);

    // Fetch user wallet balance
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

    // Compute unit coin rate for custom coin recharge
    const coinRate = useMemo(() => {
        if (product.unit_price && Number(product.unit_price) > 0) {
            return Number(product.unit_price);
        }
        const availableTiers = product.tiers || product.active_tiers || [];
        if (availableTiers.length > 0) {
            for (const tItem of availableTiers) {
                const price = Number(tItem.price_egp || tItem.price || tItem.final_price || 0);
                const cleaned = (tItem.name || '').replace(/,/g, '');
                const matches = cleaned.match(/\d+/);
                if (matches && matches[0] && price > 0) {
                    const count = parseInt(matches[0], 10);
                    if (count > 1) {
                        return price / count;
                    }
                }
            }
            const firstPrice = Number(availableTiers[0].price_egp || availableTiers[0].price || availableTiers[0].final_price || 0);
            if (firstPrice > 0 && firstPrice < 1) {
                return firstPrice;
            }
        }
        return 0.007142857; // Default fallback for voice apps (~50 EGP per 7000 coins)
    }, [product]);

    // Handle quantity input change
    const handleQuantityInputChange = (e) => {
        const raw = e.target.value.replace(/[^0-9]/g, '');
        setQuantityInput(raw);
        const parsed = parseInt(raw, 10);
        if (!isNaN(parsed) && parsed > 0) {
            setQuantity(parsed);
        } else {
            setQuantity(0);
        }
    };

    const handleQuantityFocus = () => {
        if (quantityInput === '0') {
            setQuantityInput('');
        }
    };

    const handleQuantityInputBlur = () => {
        if (quantityInput === '' || parseInt(quantityInput, 10) <= 0) {
            if (isCustomQuantity) {
                setQuantity(0);
                setQuantityInput('0');
            } else {
                setQuantity(1);
                setQuantityInput('1');
            }
        } else {
            const parsed = parseInt(quantityInput, 10);
            const clamped = isCustomQuantity ? Math.min(5000000, parsed) : Math.min(9999, parsed);
            setQuantity(clamped);
            setQuantityInput(String(clamped));
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

    const validQty = useMemo(() => {
        const parsed = parseInt(quantityInput, 10);
        return (!isNaN(parsed) && parsed > 0) ? parsed : 0;
    }, [quantityInput]);

    const totalPrice = useMemo(() => {
        if (isCustomQuantity) {
            if (validQty <= 0) return 0;
            return validQty * coinRate;
        }
        return unitPrice * (quantity || 1);
    }, [isCustomQuantity, validQty, coinRate, unitPrice, quantity]);

    // Formatted totals
    const formattedTotal = useMemo(() => {
        if (totalPrice <= 0) return '0';
        return totalPrice.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }, [totalPrice]);

    const approxUsd = useMemo(() => {
        if (totalPrice <= 0) return '0';
        return (totalPrice / 50.5).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }, [totalPrice]);

    const productImage = formatImageUrl(
        product.image_url || product.image || product.banner_url || product.icon_url
    );

    const displayName = selectedTier?.name && tiers.length === 1 && !isCustomQuantity
        ? selectedTier.name
        : product.name;

    const handlePreSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        if (!isAuthenticated) {
            toastError(t('loginToRecharge', 'يرجى تسجيل الدخول أولاً لإتمام عملية الشحن'));
            navigate('/login', { state: { from: { pathname: window.location.pathname } } });
            return;
        }

        const newErrors = {};

        if (isCustomQuantity) {
            if (validQty < 1000) {
                newErrors.quantity = 'أقل كمية شحن مسموح بها هي 1,000 كوينز';
                toastError('أقل كمية شحن مسموح بها هي 1,000 كوينز');
                setErrors(newErrors);
                return;
            }
            if (validQty > 5000000) {
                newErrors.quantity = 'أقصى كمية شحن مسموح بها هي 5,000,000 كوينز';
                toastError('أقصى كمية شحن مسموح بها هي 5,000,000 كوينز');
                setErrors(newErrors);
                return;
            }
        } else {
            if (tiers.length > 0 && !selectedTier) {
                newErrors.tier = t('selectPackageError', 'يرجى اختيار باقة الشحن المطلوبة');
            }
            if (quantity < 1) {
                newErrors.quantity = 'يرجى تحديد الكمية المطلوبة';
            }
        }

        if (!playerId.trim()) {
            const errText = t('enterPlayerId', 'يرجى إدخال معرف المستخدم').replace('{label}', product.player_id_label || t('playerOrUserId', 'معرف المستخدم'));
            newErrors.playerId = errText;
            toastError(errText);
            setErrors(newErrors);
            return;
        }

        if (product.has_server_id && !serverId.trim()) {
            newErrors.serverId = t('enterServerId', 'يرجى إدخال / اختيار السيرفر');
        }

        if (product.requires_account_region && !accountRegion.trim()) {
            newErrors.accountRegion = t('selectAccountRegion', 'يرجى اختيار دولة / منطقة الحساب');
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            const firstErr = Object.values(newErrors)[0];
            if (firstErr) {
                toastError(firstErr);
            }
            return;
        }

        setConfirmModalOpen(true);
    };

    const handleConfirmOrder = async () => {
        setSubmitting(true);
        try {
            const effectiveTierId = selectedTier?.id || (tiers.length > 0 ? tiers[0].id : null);
            const payload = {
                product_id: product.id,
                product_tier_id: effectiveTierId,
                quantity: isCustomQuantity ? validQty : quantity,
                player_id: playerId.trim() || undefined,
                server_id: serverId.trim() || undefined,
                account_region: accountRegion.trim() || undefined,
            };

            const res = await ordersApi.createOrder(payload);

            if (res?.data) {
                setConfirmModalOpen(false);
                onClose();
                success(t('orderCreatedSuccess', 'تم إنشاء طلب الشحن بنجاح وجاري تنفيذه فوراً'));
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
                toastError(t('orderExecutionError', 'حدث خطأ أثناء تنفيذ الطلب، يرجى المحاولة مرة أخرى'));
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
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
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
                        maxWidth: '430px',
                        maxHeight: '92vh',
                        overflowY: 'auto',
                        background: 'linear-gradient(180deg, #141310 0%, #0c0b08 100%)',
                        border: '1.5px solid rgba(212, 165, 55, 0.45)',
                        borderRadius: '22px',
                        padding: '18px 20px 22px',
                        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 35px rgba(212, 165, 55, 0.15)',
                        fontFamily: 'var(--font-cairo)',
                        boxSizing: 'border-box',
                        margin: 'auto',
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Top Bar: Close Button (Left) & Title + Avatar (Right in RTL - Matching KA-CARD Screenshot 2) */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        marginBottom: '16px',
                        flexDirection: isRtl ? 'row-reverse' : 'row'
                    }}>
                        {/* Product Title & Avatar Group */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            flexDirection: isRtl ? 'row-reverse' : 'row'
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: isRtl ? 'flex-end' : 'flex-start'
                            }}>
                                <h2 style={{
                                    fontSize: '18px',
                                    fontWeight: '900',
                                    color: '#FFFFFF',
                                    margin: '0 0 3px',
                                    lineHeight: 1.25,
                                    fontFamily: 'var(--font-cairo)'
                                }}>
                                    {displayName}
                                </h2>
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    background: 'rgba(34, 197, 94, 0.14)',
                                    border: '1px solid rgba(34, 197, 94, 0.4)',
                                    padding: '2px 10px',
                                    borderRadius: '9999px',
                                }}>
                                    <span style={{
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        background: '#22C55E',
                                        boxShadow: '0 0 6px #22C55E'
                                    }} />
                                    <span style={{
                                        fontSize: '11px',
                                        fontWeight: '800',
                                        color: '#4ADE80'
                                    }}>
                                        {t('available', 'متاح')}
                                    </span>
                                </div>
                            </div>

                            {/* Circular Avatar */}
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                border: '2px solid #D4A537',
                                boxShadow: '0 0 14px rgba(212, 165, 55, 0.35)',
                                overflow: 'hidden',
                                background: '#0B0B0F',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                {productImage ? (
                                    <img
                                        src={productImage}
                                        alt={displayName}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <TargetAppIconRenderer app={product} size={36} />
                                )}
                            </div>
                        </div>

                        {/* Close button */}
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                width: '32px',
                                height: '32px',
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
                            <X size={17} />
                        </button>
                    </div>

                    <form onSubmit={handlePreSubmit}>
                        {/* Notice Banner: الشحن ثانيه (Matching KA-CARD Screenshot 2) */}
                        {isCustomQuantity ? (
                            <div style={{
                                background: 'linear-gradient(90deg, rgba(67, 30, 90, 0.6) 0%, rgba(30, 24, 48, 0.85) 100%)',
                                border: '1px solid rgba(168, 85, 247, 0.35)',
                                borderRadius: '14px',
                                padding: '11px 16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: isRtl ? 'flex-end' : 'flex-start',
                                gap: '10px',
                                marginBottom: '16px',
                                color: '#E9D5FF',
                                fontSize: '13.5px',
                                fontWeight: '800',
                                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)'
                            }}>
                                <span>{product.notice || t('instantRechargeZeroSec', 'الشحن ثانيه')}</span>
                                <FileText size={17} color="#38BDF8" />
                            </div>
                        ) : tiers.length > 1 ? (
                            /* Package Selector for Standard Games only */
                            <div style={{ marginBottom: '14px' }}>
                                <div
                                    onClick={() => setShowPackageGrid(prev => !prev)}
                                    style={{
                                        background: 'linear-gradient(90deg, rgba(67, 30, 90, 0.6) 0%, rgba(30, 24, 48, 0.85) 100%)',
                                        border: '1px solid rgba(168, 85, 247, 0.35)',
                                        borderRadius: '12px',
                                        padding: '11px 16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <FileText size={17} color="#38BDF8" />
                                        <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#E9D5FF' }}>
                                            {selectedTier ? selectedTier.name : t('selectPackage', 'اختر باقة الشحن المطلوبة')}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {selectedTier && (
                                            <span style={{ fontSize: '13px', fontWeight: '900', color: '#F5D061' }}>
                                                {Number(selectedTier.price_egp || selectedTier.price || 0).toFixed(2)} {language === 'en' ? 'EGP' : 'ج.م'}
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
                                        {tiers.map((tItem) => {
                                            const isSelected = selectedTier?.id === tItem.id;
                                            return (
                                                <div
                                                    key={tItem.id}
                                                    onClick={() => {
                                                        setSelectedTier(tItem);
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
                                                        {tItem.name}
                                                    </div>
                                                    <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '2px' }}>
                                                        {Number(tItem.price_egp || tItem.price || 0).toFixed(2)} {language === 'en' ? 'EGP' : 'ج.م'}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div style={{
                                background: 'linear-gradient(90deg, rgba(67, 30, 90, 0.6) 0%, rgba(30, 24, 48, 0.85) 100%)',
                                border: '1px solid rgba(168, 85, 247, 0.35)',
                                borderRadius: '12px',
                                padding: '11px 16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: isRtl ? 'flex-end' : 'flex-start',
                                gap: '10px',
                                marginBottom: '16px',
                                color: '#E9D5FF',
                                fontSize: '13.5px',
                                fontWeight: '800',
                                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)'
                            }}>
                                <span>{selectedTier?.name || product.notice || t('instantRechargeZeroSec', 'الشحن 0 ثانيه')}</span>
                                <FileText size={17} color="#38BDF8" />
                            </div>
                        )}

                        {/* Metric Boxes: [الكمية] on Right, [الإجمالي] on Left in RTL (Matching KA-CARD Screenshot 2) */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '12px',
                            marginBottom: '16px',
                            direction: isRtl ? 'rtl' : 'ltr'
                        }}>
                            {/* Box 1 (Right in RTL): الكمية */}
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
                                    {t('quantity', 'الكمية')}
                                </span>

                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        value={quantityInput}
                                        onChange={handleQuantityInputChange}
                                        onFocus={handleQuantityFocus}
                                        onBlur={handleQuantityInputBlur}
                                        placeholder="0"
                                        style={{
                                            width: '90%',
                                            background: '#07070A',
                                            border: '1.5px solid rgba(212, 165, 55, 0.4)',
                                            borderRadius: '10px',
                                            padding: '4px 6px',
                                            color: '#FFFFFF',
                                            fontSize: '19px',
                                            fontWeight: '900',
                                            textAlign: 'center',
                                            outline: 'none',
                                            boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.8)',
                                            fontFamily: 'var(--font-cairo)',
                                        }}
                                        onFocusCapture={(e) => {
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
                                    marginTop: '5px',
                                    fontFamily: 'monospace'
                                }}>
                                    {isCustomQuantity ? '1,000 — 5,000,000' : '1 — 9,999'}
                                </span>
                            </div>

                            {/* Box 2 (Left in RTL): الإجمالي */}
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
                                    {t('total', 'الإجمالي')}
                                </span>

                                <div style={{
                                    fontSize: '19px',
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
                                    <span style={{ fontSize: '13px', color: '#D4A537', fontWeight: '800' }}>
                                        {language === 'en' ? 'EGP' : 'Egy'}
                                    </span>
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
                                <span>{product.player_id_label || t('playerOrUserId', 'معرف المستخدم')}</span>
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
                                    placeholder={product.player_id_label || t('playerOrUserId', 'معرف المستخدم')}
                                    style={{
                                        width: '100%',
                                        boxSizing: 'border-box',
                                        background: '#07070A',
                                        border: '1.5px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '12px',
                                        padding: isRtl ? '11px 40px 11px 14px' : '11px 14px 11px 40px',
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
                                        right: isRtl ? '12px' : 'auto',
                                        left: isRtl ? 'auto' : '12px',
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
                                        <span>{product.server_id_label || t('server', 'رقم السيرفر (Zone ID)')}</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={serverId}
                                        onChange={(e) => {
                                            setServerId(e.target.value);
                                            if (errors.serverId) setErrors(prev => ({ ...prev, serverId: null }));
                                        }}
                                        placeholder="1234"
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
                                        <span>{t('region', 'منطقة / سيرفر الحساب')}</span>
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
                                        <option value="">{language === 'en' ? 'Select Region' : 'اختر المنطقة'}</option>
                                        <option value="ME">{language === 'en' ? 'Middle East (ME)' : 'الشرق الأوسط (Middle East)'}</option>
                                        <option value="EU">{language === 'en' ? 'Europe (EU)' : 'أوروبا (Europe)'}</option>
                                        <option value="GLOBAL">{language === 'en' ? 'Global' : 'عالمي (Global)'}</option>
                                    </select>
                                    {errors.accountRegion && (
                                        <span style={{ color: '#EF4444', fontSize: '11.5px', fontWeight: '700', marginTop: '4px', display: 'block' }}>
                                            {errors.accountRegion}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Actions Row: إلغاء on Left, شراء 🔒 on Right (Matching KA-CARD Screenshot 2) */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            direction: isRtl ? 'rtl' : 'ltr'
                        }}>
                            <button
                                type="submit"
                                disabled={submitting}
                                style={{
                                    flex: 1,
                                    background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                    color: '#0A0A0E',
                                    border: 'none',
                                    borderRadius: '14px',
                                    padding: '13px 18px',
                                    fontSize: '15px',
                                    fontWeight: '900',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    cursor: submitting ? 'not-allowed' : 'pointer',
                                    boxShadow: '0 6px 20px rgba(212, 165, 55, 0.35)',
                                    transition: 'all 0.2s',
                                    fontFamily: 'var(--font-cairo)',
                                }}
                            >
                                <Lock size={16} />
                                <span>{submitting ? t('processing', 'جاري التنفيذ...') : t('buy', 'شراء')}</span>
                            </button>

                            <button
                                type="button"
                                onClick={onClose}
                                style={{
                                    width: '100px',
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
                                    textAlign: 'center'
                                }}
                            >
                                {t('cancel', 'إلغاء')}
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
                quantity={isCustomQuantity ? validQty : quantity}
                playerId={playerId}
                serverId={serverId}
                accountRegion={accountRegion}
                walletBalance={walletBalance}
                currency={user?.currency || 'EGP'}
                onConfirm={handleConfirmOrder}
                loading={submitting}
                calculatedTotal={totalPrice}
            />
        </>
    );
}
