import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    Zap,
    ShieldCheck,
    ArrowRight,
    HelpCircle,
    Check,
    Wallet,
    Info,
    AlertCircle,
    Plus,
    Minus,
    ShoppingCart,
    Package
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';
import OrderConfirmModal from '../components/products/OrderConfirmModal';
import { catalogApi, ordersApi, walletApi } from '../api/endpoints';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

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
        setQuantity(prev => Math.max(1, Math.min(100, prev + delta)));
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

    return (
        <MainLayout>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '13px', color: '#8E8E98' }}>
                <Link to="/" style={{ color: '#D4A537', textDecoration: 'none' }}>الرئيسية</Link>
                <span>/</span>
                <Link to="/category/games" style={{ color: '#D4A537', textDecoration: 'none' }}>الألعاب والمنتجات</Link>
                <span>/</span>
                <span style={{ color: '#CBD5E1' }}>{product.name}</span>
            </div>

            {/* Layout Grid */}
            <div className="responsive-grid-2col">
                {/* Left / Info Column */}
                <div style={{
                    background: 'rgba(26, 26, 36, 0.8)',
                    border: '1px solid rgba(212, 165, 55, 0.25)',
                    borderRadius: '24px',
                    padding: 'clamp(16px, 3vw, 28px)',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
                }}>
                    {/* Media Header */}
                    <div style={{
                        width: '100%',
                        height: '200px',
                        borderRadius: '16px',
                        background: '#12121A',
                        overflow: 'hidden',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        {product.image_url || product.image ? (
                            <img
                                src={product.image_url || product.image}
                                alt={product.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            <Package size={64} color="#D4A537" />
                        )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                        <span style={{
                            fontSize: '12px',
                            fontWeight: '700',
                            background: 'rgba(212, 165, 55, 0.15)',
                            color: '#D4A537',
                            padding: '3px 10px',
                            borderRadius: '8px',
                            border: '1px solid rgba(212, 165, 55, 0.3)',
                        }}>
                            {product.category_name || 'ألعاب إلكترونية'}
                        </span>

                        <span style={{
                            fontSize: '12px',
                            fontWeight: '700',
                            background: 'rgba(34, 197, 94, 0.15)',
                            color: '#4ADE80',
                            padding: '3px 10px',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}>
                            <Zap size={13} />
                            تنفيذ فوري وتلقائي
                        </span>
                    </div>

                    <h1 style={{ margin: '0 0 12px', fontSize: '24px', fontWeight: '900', color: '#FFFFFF' }}>
                        {product.name}
                    </h1>

                    <p style={{ margin: '0 0 24px', fontSize: '14px', color: '#9E9EA8', lineHeight: '1.6' }}>
                        {product.description || 'شحن رسمي ومباشر داخل حساب اللعبة مع تأكيد فوري وسرعة فائقة.'}
                    </p>

                    {/* Notice Box */}
                    <div style={{
                        background: 'rgba(212, 165, 55, 0.08)',
                        border: '1px solid rgba(212, 165, 55, 0.25)',
                        borderRadius: '14px',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        fontSize: '13px',
                        color: '#E2E8F0',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D4A537', fontWeight: '700' }}>
                            <ShieldCheck size={18} />
                            <span>ضمان إمبراطور المعتمد:</span>
                        </div>
                        <ul style={{ margin: 0, paddingRight: '20px', lineHeight: '1.7', color: '#CBD5E1' }}>
                            <li>تأكد من إدخال رقم المعرّف (ID) بشكل صحيح.</li>
                            <li>يتم إرسال الشحن مباشرة إلى حسابك في غضون ثوانٍ.</li>
                            <li>في حال حدوث أي خطأ سيتم استرداد المبلغ إلى محفظتك فوراً.</li>
                        </ul>
                    </div>
                </div>

                {/* Right / Order Form Column */}
                <form onSubmit={handlePreSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Step 1: Select Tier */}
                    <div style={{
                        background: 'rgba(26, 26, 36, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '24px',
                        padding: 'clamp(16px, 3vw, 24px)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                            <div style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                background: '#D4A537',
                                color: '#0D0D0F',
                                fontWeight: '800',
                                fontSize: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                1
                            </div>
                            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#FFFFFF' }}>
                                اختر باقة الشحن المطلوبة
                            </h3>
                        </div>

                        {tiers.length > 0 ? (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 125px), 1fr))',
                                gap: '10px',
                            }}>
                                {tiers.map((t) => {
                                    const isSelected = selectedTier?.id === t.id;
                                    const price = Number(t.price_egp || t.price || 0).toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    });

                                    return (
                                        <div
                                            key={t.id}
                                            onClick={() => setSelectedTier(t)}
                                            style={{
                                                background: isSelected
                                                    ? 'linear-gradient(135deg, rgba(212, 165, 55, 0.2) 0%, rgba(170, 124, 17, 0.25) 100%)'
                                                    : 'rgba(18, 18, 24, 0.7)',
                                                border: `2px solid ${isSelected ? '#D4A537' : 'rgba(255, 255, 255, 0.1)'}`,
                                                borderRadius: '16px',
                                                padding: '14px 12px',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                position: 'relative',
                                            }}
                                        >
                                            {isSelected && (
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '8px',
                                                    left: '8px',
                                                    width: '18px',
                                                    height: '18px',
                                                    borderRadius: '50%',
                                                    background: '#D4A537',
                                                    color: '#0D0D0F',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                    <Check size={12} strokeWidth={3} />
                                                </div>
                                            )}

                                            <span style={{
                                                fontSize: '14px',
                                                fontWeight: '700',
                                                color: isSelected ? '#FFFFFF' : '#CBD5E1',
                                                marginBottom: '8px',
                                            }}>
                                                {t.name}
                                            </span>

                                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                                                <strong style={{ fontSize: '15px', color: '#D4A537' }}>
                                                    {price}
                                                </strong>
                                                <span style={{ fontSize: '11px', color: '#D4A537' }}>ج.م</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p style={{ color: '#8E8E98', fontSize: '14px' }}>لا توجد باقات متاحة حالياً لهذا المنتج.</p>
                        )}

                        {errors.tier && (
                            <span style={{ fontSize: '12px', color: '#EF4444', fontWeight: '600', marginTop: '8px', display: 'block' }}>
                                {errors.tier}
                            </span>
                        )}
                    </div>

                    {/* Step 2: Player Information */}
                    <div style={{
                        background: 'rgba(26, 26, 36, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '24px',
                        padding: 'clamp(16px, 3vw, 24px)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                            <div style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                background: '#D4A537',
                                color: '#0D0D0F',
                                fontWeight: '800',
                                fontSize: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                2
                            </div>
                            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#FFFFFF' }}>
                                بيانات الحساب واللاعب
                            </h3>
                        </div>

                        {/* Player ID Field */}
                        <Input
                            label={product.player_id_label || 'معرف الحساب / Player ID'}
                            type="text"
                            value={playerId}
                            onChange={(e) => {
                                setPlayerId(e.target.value);
                                if (errors.playerId) setErrors(prev => ({ ...prev, playerId: null }));
                            }}
                            placeholder="مثال: 5123456789"
                            error={errors.playerId}
                            helperText="ادخل الآيدي الخاص بحسابك في اللعبة بدقة لتنفيذ الشحن فوراً"
                            required
                        />

                        {/* Server / Zone ID if needed */}
                        {product.has_server_id && (
                            <Input
                                label={product.server_id_label || 'Zone ID / السيرفر'}
                                type="text"
                                value={serverId}
                                onChange={(e) => {
                                    setServerId(e.target.value);
                                    if (errors.serverId) setErrors(prev => ({ ...prev, serverId: null }));
                                }}
                                placeholder="مثال: (1234)"
                                error={errors.serverId}
                                required
                            />
                        )}

                        {/* Account Region if needed */}
                        {product.requires_account_region && (
                            <Select
                                label="منطقة / دولة الحساب"
                                value={accountRegion}
                                onChange={(e) => {
                                    setAccountRegion(e.target.value);
                                    if (errors.accountRegion) setErrors(prev => ({ ...prev, accountRegion: null }));
                                }}
                                options={[
                                    { value: '', label: 'اختر المنطقة' },
                                    ...(product.region_options || [
                                        { value: 'ME', label: 'الشرق الأوسط (Middle East)' },
                                        { value: 'EU', label: 'أوروبا (Europe)' },
                                        { value: 'GLOBAL', label: 'عالمي (Global)' },
                                    ])
                                ]}
                                error={errors.accountRegion}
                                required
                            />
                        )}
                    </div>

                    {/* Step 3: Quantity & Summary */}
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(28, 28, 38, 0.95) 0%, rgba(18, 18, 24, 0.98) 100%)',
                        border: '1px solid rgba(212, 165, 55, 0.35)',
                        borderRadius: '24px',
                        padding: 'clamp(16px, 3vw, 24px)',
                        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '18px',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '15px', fontWeight: '700', color: '#E2E8F0' }}>الكمية المطلوبة:</span>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                background: '#121218',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                borderRadius: '12px',
                                padding: '4px 8px',
                            }}>
                                <button
                                    type="button"
                                    onClick={() => handleQuantityChange(-1)}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#CBD5E1',
                                        cursor: 'pointer',
                                        padding: '4px 8px',
                                    }}
                                >
                                    <Minus size={16} />
                                </button>

                                <span style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF', minWidth: '24px', textAlign: 'center' }}>
                                    {quantity}
                                </span>

                                <button
                                    type="button"
                                    onClick={() => handleQuantityChange(1)}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#CBD5E1',
                                        cursor: 'pointer',
                                        padding: '4px 8px',
                                    }}
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Total Row */}
                        <div style={{
                            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                            paddingTop: '16px',
                            display: 'flex',
                            alignItems: 'baseline',
                            justifyContent: 'space-between',
                        }}>
                            <div>
                                <span style={{ fontSize: '13px', color: '#8E8E98', display: 'block' }}>إجمالي المبلغ المطلوب</span>
                                <span style={{ fontSize: '12px', color: '#D4A537' }}>خصم مباشر من المحفظة</span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                <span style={{ fontSize: '28px', fontWeight: '900', color: '#FFFFFF', letterSpacing: '-0.5px' }}>
                                    {formattedTotal}
                                </span>
                                <span style={{ fontSize: '16px', fontWeight: '800', color: '#D4A537' }}>
                                    ج.م
                                </span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            icon={ShoppingCart}
                            style={{ width: '100%', fontSize: '17px', padding: '14px' }}
                        >
                            شحن الآن ({formattedTotal} ج.م)
                        </Button>
                    </div>
                </form>
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
