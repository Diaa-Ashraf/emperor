import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    Zap,
    ShieldCheck,
    Lock,
    User,
    ChevronDown,
    Plus,
    Minus,
    X,
    Check,
    Layers,
    Info,
    Globe,
    Server,
    Sparkles
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';
import OrderConfirmModal from '../components/products/OrderConfirmModal';
import { formatImageUrl } from '../utils/imageHelper';
import { catalogApi, ordersApi, walletApi } from '../api/endpoints';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import '../../css/kaProductRecharge.css';

export default function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const { success, error: toastError } = useToast();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedTier, setSelectedTier] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [playerId, setPlayerId] = useState('');
    const [serverId, setServerId] = useState('');
    const [accountRegion, setAccountRegion] = useState('');
    const [walletBalance, setWalletBalance] = useState(0);

    const [showPackageGrid, setShowPackageGrid] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    // Fetch product details
    useEffect(() => {
        setLoading(true);
        catalogApi.getProduct(id)
            .then(res => {
                if (res?.data) {
                    const prod = res.data;
                    if (prod.type === 'target' || prod.slug?.includes('target')) {
                        navigate(`/target-orders/new?app_id=${prod.id}&app_name=${encodeURIComponent(prod.name)}`, { replace: true });
                        return;
                    }
                    setProduct(prod);
                    const tiers = prod.tiers || prod.active_tiers || [];
                    if (tiers.length > 0) {
                        setSelectedTier(tiers[0]);
                    }
                }
            })
            .catch(() => {
                setProduct(null);
            })
            .finally(() => setLoading(false));

        if (isAuthenticated) {
            walletApi.getBalance()
                .then(res => {
                    if (res?.data?.balance !== undefined) {
                        setWalletBalance(Number(res.data.balance));
                    }
                })
                .catch(() => {});
        }
    }, [id, isAuthenticated]);

    if (loading) {
        return (
            <MainLayout>
                <div style={{ padding: '80px 0' }}>
                    <LoadingSpinner text="جاري تحميل باقات الشحن..." />
                </div>
            </MainLayout>
        );
    }

    if (!product) {
        return (
            <MainLayout>
                <EmptyState
                    title="المنتج غير موجود"
                    description="المنتج أو اللعبة التي تبحث عنها غير متوفرة حالياً"
                    actionText="العودة للرئيسية"
                    onAction={() => navigate('/')}
                />
            </MainLayout>
        );
    }

    const tiers = product.tiers || product.active_tiers || [];

    const handleQuantityChange = (delta) => {
        setQuantity(prev => Math.max(1, Math.min(9999, prev + delta)));
    };

    const handlePreSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        if (!isAuthenticated) {
            toastError('يرجى تسجيل الدخول أولاً لإتمام طلب الشحن');
            navigate('/login', { state: { from: { pathname: `/products/${id}` } } });
            return;
        }

        const newErrors = {};
        if (!selectedTier) {
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

        setModalOpen(true);
    };

    const handleConfirmOrder = async () => {
        setSubmitting(true);
        try {
            const payload = {
                product_id: product.id,
                product_tier_id: selectedTier.id,
                quantity: quantity,
                player_id: playerId.trim() || undefined,
                server_id: serverId.trim() || undefined,
                account_region: accountRegion.trim() || undefined,
            };

            const res = await ordersApi.createOrder(payload);

            if (res?.data) {
                setModalOpen(false);
                success('تم إنشاء طلب الشحن بنجاح وجاري تنفيذه فوراً');
                navigate(`/orders/${res.data.id || res.data.public_id || ''}`);
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

    const unitPrice = Number(selectedTier?.price_egp || selectedTier?.price || 0);
    const totalPrice = unitPrice * quantity;
    const formattedTotal = totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const approxUsd = (totalPrice / 50.5).toFixed(2);

    const productImage = formatImageUrl(product.image_url || product.image);

    return (
        <MainLayout>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '13px', color: '#8E8E98' }}>
                <Link to="/" style={{ color: '#D4A537', textDecoration: 'none' }}>الرئيسية</Link>
                <span>/</span>
                <Link to="/category/games" style={{ color: '#D4A537', textDecoration: 'none' }}>الألعاب والمنتجات</Link>
                <span>/</span>
                <span style={{ color: '#CBD5E1' }}>{product.name}</span>
            </div>

            {/* KA-Cards Style Luxury Recharge Card */}
            <div className="ka-recharge-wrapper">
                <div className="ka-recharge-card">
                    {/* Top Close / Return Button */}
                    <button
                        type="button"
                        className="ka-card-close-btn"
                        onClick={() => navigate(-1)}
                        title="إغلاق / رجوع"
                    >
                        <X size={18} />
                    </button>

                    {/* Top Emperor Crest Badge */}
                    <div className="ka-card-badge-crest">
                        <Sparkles size={13} />
                        <span>EMPEROR VIP</span>
                    </div>

                    {/* Circular Avatar & Header */}
                    <div className="ka-avatar-container">
                        <div className="ka-avatar-circle">
                            {productImage ? (
                                <img
                                    src={productImage}
                                    alt={product.name}
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            ) : (
                                <div style={{ color: '#D4A537', fontWeight: '900', fontSize: '28px' }}>
                                    {product.name.charAt(0)}
                                </div>
                            )}
                        </div>

                        <h1 className="ka-product-title">
                            {product.name}
                        </h1>

                        <div>
                            <span className="ka-status-badge">
                                متاح للتنفيذ الفوري
                            </span>
                        </div>
                    </div>

                    {/* Form Start */}
                    <form onSubmit={handlePreSubmit}>
                        {/* Package Selection Bar (نظام الباقات) */}
                        <div
                            className="ka-package-selector-bar"
                            onClick={() => setShowPackageGrid(prev => !prev)}
                            title="انقر لعرض / إخفاء باقات الشحن"
                        >
                            <div className="ka-package-name">
                                <Layers size={18} color="#D4A537" />
                                <span>{selectedTier ? selectedTier.name : 'اختر باقة الشحن المطلوبة'}</span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                {selectedTier && (
                                    <span className="ka-package-price">
                                        {Number(selectedTier.price_egp || selectedTier.price || 0).toFixed(2)} EGP
                                    </span>
                                )}
                                <ChevronDown
                                    size={18}
                                    color="#CBD5E1"
                                    style={{
                                        transform: showPackageGrid ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.2s',
                                    }}
                                />
                            </div>
                        </div>

                        {/* Interactive Packages Grid (نظام الباقات) */}
                        {showPackageGrid && tiers.length > 0 && (
                            <div className="ka-packages-grid">
                                {tiers.map((tier) => {
                                    const isSelected = selectedTier?.id === tier.id;
                                    const price = Number(tier.price_egp || tier.price || 0).toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    });

                                    return (
                                        <div
                                            key={tier.id}
                                            className={`ka-tier-pill ${isSelected ? 'selected' : ''}`}
                                            onClick={() => setSelectedTier(tier)}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <span className="ka-tier-pill-title">
                                                    {tier.name}
                                                </span>
                                                {isSelected && (
                                                    <span style={{ color: '#D4A537' }}>
                                                        <Check size={14} strokeWidth={3} />
                                                    </span>
                                                )}
                                            </div>

                                            <div className="ka-tier-pill-price">
                                                {price} <small style={{ fontSize: '10px' }}>EGP</small>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {errors.tier && (
                            <div style={{ color: '#EF4444', fontSize: '12px', fontWeight: '700', marginBottom: '12px' }}>
                                {errors.tier}
                            </div>
                        )}

                        {/* Metric Boxes: Total + Quantity */}
                        <div className="ka-metrics-row">
                            {/* Box 1: Total Price */}
                            <div className="ka-metric-box">
                                <span className="ka-metric-label">الإجمالي المطلوب</span>
                                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                                    <span className="ka-total-val">{formattedTotal}</span>
                                    <span className="ka-total-currency">EGP</span>
                                </div>
                                <span className="ka-total-usd">~ ${approxUsd} USD</span>
                            </div>

                            {/* Box 2: Quantity */}
                            <div className="ka-metric-box">
                                <span className="ka-metric-label">الكمية</span>
                                <div className="ka-qty-input-wrap">
                                    <button
                                        type="button"
                                        className="ka-qty-btn"
                                        onClick={() => handleQuantityChange(-1)}
                                    >
                                        <Minus size={14} />
                                    </button>

                                    <input
                                        type="number"
                                        min="1"
                                        max="9999"
                                        value={quantity}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value, 10);
                                            if (isNaN(val) || val <= 0) {
                                                setQuantity(1);
                                            } else {
                                                setQuantity(Math.min(9999, val));
                                            }
                                        }}
                                        className="ka-qty-num-input"
                                    />

                                    <button
                                        type="button"
                                        className="ka-qty-btn"
                                        onClick={() => handleQuantityChange(1)}
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                                <span className="ka-qty-limit-hint">1 — 9,999</span>
                            </div>
                        </div>

                        {/* User ID Card (معرف المستخدم) */}
                        <div className="ka-user-input-card">
                            <label className="ka-input-title">
                                <User size={16} color="#D4A537" />
                                <span>{product.player_id_label || 'معرف المستخدم (Player ID)'}</span>
                            </label>

                            <div className="ka-input-field-wrap">
                                <span className="ka-field-icon">
                                    <User size={18} />
                                </span>
                                <input
                                    type="text"
                                    required
                                    value={playerId}
                                    onChange={(e) => {
                                        setPlayerId(e.target.value);
                                        if (errors.playerId) setErrors(prev => ({ ...prev, playerId: null }));
                                    }}
                                    placeholder={product.player_id_label ? `أدخل ${product.player_id_label}` : 'مثال: 5123456789'}
                                    className="ka-text-input"
                                />
                            </div>

                            {errors.playerId && (
                                <span style={{ color: '#EF4444', fontSize: '12px', fontWeight: '700', marginTop: '6px', display: 'block' }}>
                                    {errors.playerId}
                                </span>
                            )}

                            {/* Optional Server / Zone ID */}
                            {product.has_server_id && (
                                <div style={{ marginTop: '14px' }}>
                                    <label className="ka-input-title">
                                        <Server size={16} color="#D4A537" />
                                        <span>{product.server_id_label || 'Zone ID / رقم السيرفر'}</span>
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
                                        className="ka-text-input"
                                    />
                                    {errors.serverId && (
                                        <span style={{ color: '#EF4444', fontSize: '12px', fontWeight: '700', marginTop: '6px', display: 'block' }}>
                                            {errors.serverId}
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Optional Account Region */}
                            {product.requires_account_region && (
                                <div style={{ marginTop: '14px' }}>
                                    <label className="ka-input-title">
                                        <Globe size={16} color="#D4A537" />
                                        <span>منطقة / سيرفر الحساب</span>
                                    </label>
                                    <select
                                        value={accountRegion}
                                        onChange={(e) => {
                                            setAccountRegion(e.target.value);
                                            if (errors.accountRegion) setErrors(prev => ({ ...prev, accountRegion: null }));
                                        }}
                                        className="ka-text-input"
                                        style={{ background: '#0D0C09' }}
                                    >
                                        <option value="">اختر المنطقة</option>
                                        <option value="ME">الشرق الأوسط (Middle East)</option>
                                        <option value="EU">أوروبا (Europe)</option>
                                        <option value="GLOBAL">عالمي (Global)</option>
                                    </select>
                                    {errors.accountRegion && (
                                        <span style={{ color: '#EF4444', fontSize: '12px', fontWeight: '700', marginTop: '6px', display: 'block' }}>
                                            {errors.accountRegion}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Actions Row: Buy + Cancel */}
                        <div className="ka-actions-row">
                            <button
                                type="submit"
                                className="ka-buy-btn"
                            >
                                <Lock size={18} />
                                <span>شراء ({formattedTotal} EGP)</span>
                            </button>

                            <button
                                type="button"
                                className="ka-cancel-btn"
                                onClick={() => navigate(-1)}
                            >
                                إلغاء
                            </button>
                        </div>
                    </form>

                    {/* Trust & Guarantee Mini Footer */}
                    <div style={{
                        marginTop: '22px',
                        paddingTop: '16px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        fontSize: '12px',
                        color: '#9CA3AF',
                    }}>
                        <ShieldCheck size={16} color="#D4A537" />
                        <span>ضمان إمبراطور المعتمد: شحن فوري وآمن 100% داخل حساب اللعبة</span>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            <OrderConfirmModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
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
        </MainLayout>
    );
}
