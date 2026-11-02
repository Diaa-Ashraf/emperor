import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    Package,
    Search,
    Plus,
    RefreshCw,
    Edit3,
    Trash2,
    X,
    UploadCloud,
    Power,
    Check,
    Info,
    CheckCircle2,
    ArrowRight
} from 'lucide-react';
import { adminApi, invalidateProductCatalogCache } from '../../api/endpoints';
import { useToast } from '../../contexts/ToastContext';
import { useTheme } from '../../contexts/ThemeContext';
import AdminHeader from '../../components/admin/AdminHeader';

export default function AdminProductsPage() {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const { success, error: toastError } = useToast();

    // ═══ Categories State (Screenshot 1 & 2) ═══
    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [deletingCategory, setDeletingCategory] = useState(null);
    const [deleteCatSubmitting, setDeleteCatSubmitting] = useState(false);
    const [catNameEn, setCatNameEn] = useState('');
    const [catNameAr, setCatNameAr] = useState('');
    const [catSortOrder, setCatSortOrder] = useState('0');
    const [catParentId, setCatParentId] = useState('');
    const [catImageFile, setCatImageFile] = useState(null);
    const [catImagePreview, setCatImagePreview] = useState(null);
    const [catSubmitting, setCatSubmitting] = useState(false);
    const catFileInputRef = useRef(null);

    // ═══ Products State (Screenshot 3) ═══
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedMainCat, setSelectedMainCat] = useState('');
    const [selectedSubCat, setSelectedSubCat] = useState('');
    const [search, setSearch] = useState('');

    // Delete Product Modal
    const [deletingProduct, setDeletingProduct] = useState(null);
    const [deleteProdSubmitting, setDeleteProdSubmitting] = useState(false);

    // ═══ 3-Step Add / Edit Product Modal (Screenshot 4 & 5) ═══
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [modalStep, setModalStep] = useState(1); // 1: الأساسيات, 2: الربط والسعر, 3: حقول الطلب
    const [productSubmitting, setProductSubmitting] = useState(false);

    // Step 1: Basics
    const [formProdName, setFormProdName] = useState('');
    const [formProdDescription, setFormProdDescription] = useState('');
    const [formProdCategory, setFormProdCategory] = useState('');
    const [formProdSortOrder, setFormProdSortOrder] = useState('1');
    const [formProdImage, setFormProdImage] = useState('');
    const prodFileInputRef = useRef(null);

    // Step 2: Integration & Pricing
    const [fulfillmentMode, setFulfillmentMode] = useState('auto'); // 'manual' or 'auto'
    const [providers, setProviders] = useState([]);
    const [selectedProvider, setSelectedProvider] = useState('منصة إمبراطور (Embrator Store)');
    const [providerCatalogItems, setProviderCatalogItems] = useState([]);
    const [selectedProviderProduct, setSelectedProviderProduct] = useState(null);
    const [providerCatalogSearch, setProviderCatalogSearch] = useState('');
    const [autoFulfillmentEnabled, setAutoFulfillmentEnabled] = useState(true);
    const [syncPricingEnabled, setSyncPricingEnabled] = useState(true);
    const [manualPriceEnabled, setManualPriceEnabled] = useState(false);
    const [minQty, setMinQty] = useState('1000');
    const [maxQty, setMaxQty] = useState('5000000');
    const [finalPrice, setFinalPrice] = useState('0.00174232');
    const [basePrice, setBasePrice] = useState('0.00174232');
    const [providerPageSize, setProviderPageSize] = useState(80);

    // Step 3: Fields
    const [playerIdLabel, setPlayerIdLabel] = useState('آيدي الحساب (User ID)');
    const [showPlayerIdToUser, setShowPlayerIdToUser] = useState(true);

    // ═══ Fetch APIs ═══
    const fetchCategories = async () => {
        try {
            setCategoriesLoading(true);
            const res = await adminApi.getCategories();
            if (res && res.data) {
                const list = res.data.data || res.data;
                setCategories(Array.isArray(list) ? list : []);
            }
        } catch (err) {
            console.error('Failed fetching categories:', err);
        } finally {
            setCategoriesLoading(false);
        }
    };

    const fetchProducts = async () => {
        try {
            setProductsLoading(true);
            const res = await adminApi.getProducts({
                category_id: selectedMainCat || undefined,
                search: search.trim() || undefined,
            });
            if (res && res.data) {
                const list = res.data.data?.data || res.data.data || res.data;
                setProducts(Array.isArray(list) ? list : []);
            }
        } catch (err) {
            toastError('فشل تحميل قائمة المنتجات');
        } finally {
            setProductsLoading(false);
            setRefreshing(false);
        }
    };

    const fetchProviders = async () => {
        try {
            const res = await adminApi.getProviders();
            if (res && res.data) {
                const list = res.data.data || res.data;
                const arr = Array.isArray(list) ? list : [];
                setProviders(arr);
                if (arr.length > 0) {
                    const current = arr.find(p => p.id == selectedProvider || p.name === selectedProvider);
                    const embrator = arr.find(p => p.driver === 'embrator_reseller_api' || p.name?.includes('إمبراطور'));
                    setSelectedProvider(current ? current.id : embrator?.id || arr[0].id);
                }
            }
        } catch (err) {
            console.error('Failed fetching providers:', err);
        }
    };

    const fetchProviderCatalog = async (providerId, searchStr = '') => {
        try {
            const provider = providers.find(p => p.id == providerId || p.name === providerId);
            const isAdCard = ['ad_card', 'ad-card', 'adcard'].includes(provider?.driver);
            const res = isAdCard
                ? await adminApi.getProviderProducts(provider.id)
                : await adminApi.getProviderCatalog({
                provider_id: provider?.id,
                search: searchStr.trim() || undefined,
                per_page: providerPageSize,
            });
            if (res && res.data) {
                const data = res.data.data || res.data;
                setProviderCatalogItems(Array.isArray(data) ? data : Array.isArray(data.items) ? data.items : []);
            }
        } catch (err) {
            console.error('Failed fetching provider catalog:', err);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchProducts();
        fetchProviders();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [selectedMainCat, search]);

    useEffect(() => {
        if (selectedProvider) {
            fetchProviderCatalog(selectedProvider, providerCatalogSearch);
        }
    }, [selectedProvider, providerCatalogSearch, providerPageSize]);

    const handleRefresh = async () => {
        setRefreshing(true);
        await Promise.all([fetchCategories(), fetchProducts(), fetchProviders()]);
        setRefreshing(false);
    };

    const handleClearFilters = () => {
        setSelectedMainCat('');
        setSelectedSubCat('');
        setSearch('');
    };

    // Toggle Product Active
    const handleToggleProduct = async (id) => {
        try {
            await adminApi.toggleProductActive(id);
            success('تم تعديل حالة المنتج');
            fetchProducts();
        } catch (err) {
            toastError('فشل تعديل حالة المنتج');
        }
    };

    // Delete Product
    const handleDeleteProduct = async () => {
        if (!deletingProduct) return;
        try {
            setDeleteProdSubmitting(true);
            await adminApi.deleteProduct(deletingProduct.id);
            success('تم حذف المنتج بنجاح');
            setDeletingProduct(null);
            fetchProducts();
        } catch (err) {
            toastError(err.response?.data?.message || 'فشل حذف المنتج');
        } finally {
            setDeleteProdSubmitting(false);
        }
    };

    // ═══ Category Handlers (Screenshot 2) ═══
    const openAddCategoryModal = () => {
        setEditingCategory(null);
        setCatNameEn('');
        setCatNameAr('');
        setCatSortOrder((categories.length).toString());
        setCatParentId('');
        setCatImageFile(null);
        setCatImagePreview(null);
        setIsCategoryModalOpen(true);
    };

    const openEditCategoryModal = (cat) => {
        setEditingCategory(cat);
        setCatNameAr(cat.name || '');
        setCatNameEn(cat.name_en || '');
        setCatSortOrder(cat.sort_order !== undefined ? String(cat.sort_order) : '0');
        setCatParentId(cat.parent_id ? String(cat.parent_id) : '');
        setCatImageFile(null);
        setCatImagePreview(cat.icon || null);
        setIsCategoryModalOpen(true);
    };

    const handleConfirmDeleteCategory = async () => {
        if (!deletingCategory) return;
        try {
            setDeleteCatSubmitting(true);
            await adminApi.deleteCategory(deletingCategory.id);
            success(`تم حذف قسم "${deletingCategory.name}" بنجاح`);
            setDeletingCategory(null);
            fetchCategories();
        } catch (err) {
            console.error('Delete category error:', err);
            toastError(err.message || err.response?.data?.message || 'فشل حذف القسم');
        } finally {
            setDeleteCatSubmitting(false);
        }
    };

    const handleSaveCategory = async (e) => {
        e.preventDefault();
        try {
            setCatSubmitting(true);
            const formData = new FormData();
            formData.append('name', catNameAr.trim() || catNameEn.trim() || 'قسم جديد');
            if (catNameEn.trim()) formData.append('name_en', catNameEn.trim());
            formData.append('sort_order', parseInt(catSortOrder) || 0);
            if (catParentId) formData.append('parent_id', catParentId);
            if (catImageFile) formData.append('image', catImageFile);

            if (editingCategory) {
                await adminApi.updateCategory(editingCategory.id, formData);
                success('تم تعديل القسم بنجاح');
            } else {
                await adminApi.saveCategory(formData);
                success('تمت إضافة القسم بنجاح');
            }
            setIsCategoryModalOpen(false);
            fetchCategories();
        } catch (err) {
            toastError(err.response?.data?.message || 'فشل حفظ بيانات القسم');
        } finally {
            setCatSubmitting(false);
        }
    };

    // ═══ Product Modal Handlers (Screenshots 3, 4, 5) ═══
    const handleProductImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormProdImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const openAddProductModal = () => {
        setEditingProduct(null);
        setModalStep(1);
        setFormProdName('');
        setFormProdDescription('');
        setFormProdCategory(categories[0]?.id || '');
        setFormProdSortOrder((products.length + 1).toString());
        setFormProdImage('');
        setFulfillmentMode('auto');
        const defaultProv = providers.find(p => p.driver === 'embrator_reseller_api' || p.name?.includes('إمبراطور')) || providers[0];
        setSelectedProvider(defaultProv ? defaultProv.id : '');
        setSelectedProviderProduct(null);
        setAutoFulfillmentEnabled(true);
        setSyncPricingEnabled(true);
        setManualPriceEnabled(false);
        setMinQty('1000');
        setMaxQty('5000000');
        setFinalPrice('0.00174232');
        setBasePrice('0.00174232');
        setPlayerIdLabel('آيدي الحساب (User ID)');
        setIsProductModalOpen(true);
    };

    const openEditProductModal = (prod) => {
        setEditingProduct(prod);
        setModalStep(1);
        setFormProdName(prod.name || '');
        setFormProdDescription(prod.description || '');
        setFormProdCategory(prod.category_id || (categories[0]?.id || ''));
        setFormProdSortOrder((prod.sort_order || 1).toString());
        setFormProdImage(prod.image || '');
        setFulfillmentMode(prod.fulfillment_mode || 'auto');
        setSelectedProvider(prod.provider_name || 'منصة إمبراطور (Embrator Store)');
        setSelectedProviderProduct(prod.provider_product_id ? {
            id: prod.provider_product_id,
            name: prod.provider_product_name || prod.name,
            price: prod.base_price || 0,
            currency_label: 'دولار',
            min_qty: prod.min_qty || 1,
            max_qty: prod.max_qty || 10000000,
        } : null);
        setAutoFulfillmentEnabled(true);
        setSyncPricingEnabled(true);
        setManualPriceEnabled(false);
        setMinQty((prod.min_qty || 1).toString());
        setMaxQty((prod.max_qty || 10000000).toString());
        setFinalPrice((prod.final_price || 0).toString());
        setBasePrice((prod.base_price || 0).toString());
        setPlayerIdLabel(prod.player_id_label || 'آيدي الحساب (User ID)');
        setIsProductModalOpen(true);
    };

    // Selecting a product from provider catalog (Screenshot 5)
    const handleSelectProviderProduct = (item) => {
        setSelectedProviderProduct(item);
        if (syncPricingEnabled) {
            const rawCost = item.price ? parseFloat(item.price) : 0;
            setBasePrice(rawCost.toString());
            // Suggest selling price with default 4% profit margin
            const suggestedSelling = rawCost > 0 ? (rawCost * 1.04) : 0;
            setFinalPrice(suggestedSelling.toString());
            setMinQty(item.min_qty ? item.min_qty.toString() : '1');
            setMaxQty(item.max_qty ? item.max_qty.toString() : '10000000');
        }
        if (!formProdImage && item.image) {
            setFormProdImage(item.image);
        }
        if (!formProdDescription && item.description) {
            setFormProdDescription(item.description);
        }
    };

    // Save Product
    const handleSaveProduct = async (e) => {
        e.preventDefault();
        if (!formProdName.trim() || !formProdCategory) {
            toastError('يرجى كتابة اسم المنتج واختيار القسم في الخطوة الأولى');
            setModalStep(1);
            return;
        }

        try {
            setProductSubmitting(true);
            const provObj = providers.find(p => p.name === selectedProvider || p.id == selectedProvider);
            const payload = {
                name: formProdName.trim(),
                description: formProdDescription.trim() || null,
                category_id: formProdCategory,
                sort_order: parseInt(formProdSortOrder) || 1,
                image: formProdImage || null,
                fulfillment_mode: fulfillmentMode,
                provider_id: provObj ? provObj.id : (providers.length > 0 ? providers[0].id : null),
                provider_name: provObj ? provObj.name : (selectedProvider || 'منصة إمبراطور (Embrator Store)'),
                provider_product_id: selectedProviderProduct ? selectedProviderProduct.id : null,
                provider_product_name: selectedProviderProduct ? selectedProviderProduct.name : formProdName.trim(),
                provider_product_fields: selectedProviderProduct?.fields || [],
                provider_product_currency: selectedProviderProduct?.currency || 'USD',
                auto_fulfill: autoFulfillmentEnabled,
                sync_pricing: syncPricingEnabled,
                manual_price: manualPriceEnabled,
                min_qty: parseFloat(minQty) || 1,
                max_qty: parseFloat(maxQty) || 1000,
                base_price: parseFloat(basePrice) || 0,
                final_price: parseFloat(finalPrice) || 0,
                player_id_label: playerIdLabel.trim() || 'آيدي الحساب (User ID)',
            };

            await adminApi.saveProduct(payload, editingProduct?.id);
            invalidateProductCatalogCache();
            success(editingProduct ? 'تم تعديل المنتج وتحديث ربطه بالمورد بنجاح' : 'تمت إضافة المنتج الجديد وربطه بالمورد بنجاح');
            setIsProductModalOpen(false);
            fetchProducts();
        } catch (err) {
            toastError(err.response?.data?.message || 'فشل حفظ بيانات المنتج');
        } finally {
            setProductSubmitting(false);
        }
    };

    // Filtered provider items for instant responsive UI
    const filteredProviderItems = useMemo(() => {
        if (!providerCatalogSearch.trim()) return providerCatalogItems;
        const q = providerCatalogSearch.toLowerCase().trim();
        return providerCatalogItems.filter(item =>
            (item.name || '').toLowerCase().includes(q) ||
            (item.id || '').toLowerCase().includes(q) ||
            (item.provider_sku || '').toLowerCase().includes(q)
        );
    }, [providerCatalogItems, providerCatalogSearch]);

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: isLight ? '#F8FAFC' : '#040711',
            color: isLight ? '#0F172A' : '#F8FAFC',
            fontFamily: 'Cairo, sans-serif',
            direction: 'rtl',
            paddingBottom: '80px',
        }}>
            {/* Admin Header with Back Button */}
            <AdminHeader
                title="إدارة المنتجات"
                subtitle="الكاتلوج، المنتجات، ضبط الموردين والتسعير الآلي"
                badge="المتجر والكتالوج"
                onRefresh={handleRefresh}
                refreshing={refreshing}
            />

            <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 16px' }}>

                {/* =========================================================================
                    SECTION 1: الكاتلوج (الأقسام) - Matching media_1793382985852_060c3d1e.jpg
                   ========================================================================= */}
                <div style={{
                    backgroundColor: isLight ? '#FFFFFF' : '#080E1C',
                    border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(56, 189, 248, 0.25)',
                    borderRadius: '24px',
                    padding: '20px',
                    marginBottom: '24px',
                    boxShadow: isLight ? '0 4px 20px rgba(0,0,0,0.03)' : '0 10px 30px rgba(0,0,0,0.5)',
                }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', margin: '0 0 4px' }}>
                        الكاتلوج (الأقسام)
                    </h2>
                    <p style={{ fontSize: '12.5px', color: '#94A3B8', margin: '0 0 16px' }}>
                        حدد ترتيب ظهور الأقسام (الرقم الأقل يظهر أولاً).
                    </p>

                    {/* Big Button: + إضافة قسم */}
                    <button
                        type="button"
                        onClick={openAddCategoryModal}
                        style={{
                            width: '100%',
                            padding: '13px 20px',
                            borderRadius: '16px',
                            background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 50%, #B45309 100%)',
                            color: '#07090E',
                            fontWeight: '900',
                            fontSize: '15px',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            marginBottom: '20px',
                            boxShadow: '0 4px 18px rgba(212, 165, 55, 0.35)',
                        }}
                    >
                        <Plus size={18} strokeWidth={2.8} />
                        <span>+ إضافة قسم</span>
                    </button>

                    <h3 style={{ fontSize: '15px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', margin: '0 0 12px' }}>
                        الأقسام الرئيسية
                    </h3>

                    {/* Table-like Blue Container matching Screenshot 1 */}
                    <div style={{
                        backgroundColor: isLight ? '#F1F5F9' : '#071224',
                        border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(56, 189, 248, 0.25)',
                        borderRadius: '18px',
                        overflow: 'hidden',
                    }}>
                        {/* Header Row */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 18px',
                            borderBottom: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.2)',
                            color: '#38BDF8',
                            fontSize: '13px',
                            fontWeight: '800',
                        }}>
                            <span>الاسم</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <span>الترتيب</span>
                                <span>الإجراءات</span>
                            </div>
                        </div>

                        {/* Category Rows */}
                        {categoriesLoading ? (
                            <div style={{ padding: '30px', textAlign: 'center', color: '#94A3B8' }}>
                                <RefreshCw size={20} className="animate-spin" style={{ margin: '0 auto 8px' }} />
                                <span style={{ fontSize: '12px' }}>جاري تحميل الأقسام...</span>
                            </div>
                        ) : categories.length === 0 ? (
                            <div style={{ padding: '30px', textAlign: 'center', color: '#94A3B8', fontSize: '13px' }}>
                                لا توجد أقسام مسجلة. اضغط + إضافة قسم للبدء.
                            </div>
                        ) : (
                            categories.map((cat, idx) => (
                                <div
                                    key={cat.id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '12px 18px',
                                        borderBottom: idx < categories.length - 1 ? (isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.05)') : 'none',
                                        gap: '12px',
                                    }}
                                >
                                    {/* Right: Circular Icon + Name */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                                        <div style={{
                                            width: '42px',
                                            height: '42px',
                                            borderRadius: '50%',
                                            backgroundColor: '#0F1E38',
                                            border: '1.5px solid rgba(56, 189, 248, 0.4)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            overflow: 'hidden',
                                            flexShrink: 0,
                                        }}>
                                            {cat.icon && (cat.icon.startsWith('/') || cat.icon.startsWith('http')) ? (
                                                <img src={cat.icon} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                <Package size={20} color="#38BDF8" />
                                            )}
                                        </div>
                                        <span style={{ fontSize: '14px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {cat.name}
                                        </span>
                                    </div>

                                    {/* Left: Circle Numbered Badge + Edit & Delete Buttons */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            backgroundColor: isLight ? '#FFFFFF' : '#0B172E',
                                            border: '1.5px solid rgba(56, 189, 248, 0.5)',
                                            color: '#FFFFFF',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '13px',
                                            fontWeight: '800',
                                        }}>
                                            {cat.sort_order || (idx + 1)}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => openEditCategoryModal(cat)}
                                            title="تعديل القسم"
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '8px',
                                                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                                                border: '1px solid rgba(56, 189, 248, 0.35)',
                                                color: '#38BDF8',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                            }}
                                        >
                                            <Edit3 size={15} />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setDeletingCategory(cat)}
                                            title="حذف القسم"
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '8px',
                                                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                                                border: '1px solid rgba(239, 68, 68, 0.35)',
                                                color: '#EF4444',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                            }}
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* =========================================================================
                    SECTION 2: المنتجات - Matching media_1793383011860_4cf1afd3.jpg
                   ========================================================================= */}
                <div style={{ marginBottom: '16px' }}>
                    {/* Big Button: + إضافة منتج */}
                    <button
                        type="button"
                        onClick={openAddProductModal}
                        style={{
                            width: '100%',
                            padding: '14px 24px',
                            borderRadius: '18px',
                            background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 50%, #B45309 100%)',
                            color: '#07090E',
                            fontWeight: '900',
                            fontSize: '16px',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            marginBottom: '16px',
                            boxShadow: '0 6px 20px rgba(212, 165, 55, 0.35)',
                        }}
                    >
                        <Plus size={20} strokeWidth={2.8} />
                        <span>+ إضافة منتج</span>
                    </button>

                    {/* Filter Card */}
                    <div style={{
                        backgroundColor: isLight ? '#FFFFFF' : '#080E1C',
                        border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(56, 189, 248, 0.25)',
                        borderRadius: '20px',
                        padding: '16px',
                        marginBottom: '16px',
                    }}>
                        {/* Dropdowns Row: رئيسي / فرعي */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94A3B8', marginBottom: '4px' }}>
                                    رئيسي
                                </label>
                                <select
                                    value={selectedMainCat}
                                    onChange={(e) => setSelectedMainCat(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        borderRadius: '12px',
                                        backgroundColor: isLight ? '#F8FAFC' : '#060B18',
                                        border: '1px solid rgba(56, 189, 248, 0.3)',
                                        color: isLight ? '#0F172A' : '#FFFFFF',
                                        fontSize: '13px',
                                        fontWeight: '700',
                                        outline: 'none',
                                    }}
                                >
                                    <option value="">كل الأقسام الرئيسية</option>
                                    {categories.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94A3B8', marginBottom: '4px' }}>
                                    فرعي
                                </label>
                                <select
                                    value={selectedSubCat}
                                    onChange={(e) => setSelectedSubCat(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        borderRadius: '12px',
                                        backgroundColor: isLight ? '#F8FAFC' : '#060B18',
                                        border: '1px solid rgba(56, 189, 248, 0.3)',
                                        color: isLight ? '#0F172A' : '#FFFFFF',
                                        fontSize: '13px',
                                        fontWeight: '700',
                                        outline: 'none',
                                    }}
                                >
                                    <option value="">كل الأقسام الفرعية</option>
                                </select>
                            </div>
                        </div>

                        {/* Search Input + 15/15 Counter + Clear Button */}
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94A3B8', marginBottom: '4px' }}>
                                بحث
                            </label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    backgroundColor: isLight ? '#F8FAFC' : '#060B18',
                                    border: '1px solid rgba(56, 189, 248, 0.3)',
                                    borderRadius: '12px',
                                    padding: '8px 12px',
                                    flex: 1,
                                }}>
                                    <Search size={15} color="#94A3B8" />
                                    <input
                                        type="text"
                                        placeholder="بحث عن المنتجات..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        style={{
                                            border: 'none',
                                            outline: 'none',
                                            backgroundColor: 'transparent',
                                            color: isLight ? '#0F172A' : '#FFFFFF',
                                            fontSize: '12.5px',
                                            width: '100%',
                                        }}
                                    />
                                </div>

                                <div style={{
                                    padding: '8px 12px',
                                    borderRadius: '12px',
                                    backgroundColor: isLight ? '#F1F5F9' : '#060B18',
                                    border: '1px solid rgba(56, 189, 248, 0.3)',
                                    fontSize: '12px',
                                    fontWeight: '800',
                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                    minWidth: '50px',
                                    textAlign: 'center',
                                }}>
                                    {products.length}/{products.length}
                                </div>

                                <button
                                    onClick={handleClearFilters}
                                    type="button"
                                    style={{
                                        padding: '8px 14px',
                                        borderRadius: '12px',
                                        backgroundColor: isLight ? '#F1F5F9' : '#0B1528',
                                        border: '1px solid rgba(56, 189, 248, 0.25)',
                                        color: '#38BDF8',
                                        fontSize: '12px',
                                        fontWeight: '800',
                                        cursor: 'pointer',
                                    }}
                                >
                                    مسح
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Products Cards List (Matching Screenshot 3) */}
                    {productsLoading ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#94A3B8' }}>
                            <RefreshCw size={24} className="animate-spin" style={{ margin: '0 auto 8px', color: '#D4A537' }} />
                            <div>جاري تحميل المنتجات...</div>
                        </div>
                    ) : products.length === 0 ? (
                        <div style={{
                            backgroundColor: isLight ? '#FFFFFF' : '#080E1C',
                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(56, 189, 248, 0.25)',
                            borderRadius: '20px',
                            padding: '40px 20px',
                            textAlign: 'center',
                            color: '#94A3B8',
                        }}>
                            <Package size={36} style={{ margin: '0 auto 8px', opacity: 0.5 }} />
                            <div style={{ fontWeight: '800', fontSize: '14px' }}>لا توجد منتجات مطابقة</div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {products.map((p) => (
                                <div
                                    key={p.id}
                                    style={{
                                        backgroundColor: isLight ? '#FFFFFF' : '#080E1C',
                                        border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(56, 189, 248, 0.25)',
                                        borderRadius: '20px',
                                        padding: '16px',
                                        boxShadow: isLight ? '0 4px 15px rgba(0,0,0,0.03)' : '0 10px 25px rgba(0,0,0,0.4)',
                                    }}
                                >
                                    {/* Top Row: Name + ID + Avatar + Status Pills */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: '14px',
                                    }}>
                                        {/* Status Pills on Left */}
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            <span style={{
                                                padding: '2px 8px',
                                                borderRadius: '6px',
                                                fontSize: '11px',
                                                fontWeight: '800',
                                                backgroundColor: p.is_active ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                                color: p.is_active ? '#10B981' : '#EF4444',
                                                border: `1px solid ${p.is_active ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
                                            }}>
                                                {p.is_active ? 'نشط' : 'معطل'}
                                            </span>
                                            <span style={{
                                                padding: '2px 8px',
                                                borderRadius: '6px',
                                                fontSize: '11px',
                                                fontWeight: '800',
                                                backgroundColor: 'rgba(56, 189, 248, 0.12)',
                                                color: '#38BDF8',
                                                border: '1px solid rgba(56, 189, 248, 0.3)',
                                            }}>
                                                ظاهر
                                            </span>
                                            <span style={{
                                                padding: '2px 8px',
                                                borderRadius: '6px',
                                                fontSize: '11px',
                                                fontWeight: '800',
                                                backgroundColor: 'rgba(56, 189, 248, 0.12)',
                                                color: '#38BDF8',
                                                border: '1px solid rgba(56, 189, 248, 0.3)',
                                            }}>
                                                متوفر
                                            </span>
                                        </div>

                                        {/* Name + ID + Circular Avatar on Right */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontSize: '15px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                                    {p.name}
                                                </div>
                                                <div style={{ fontSize: '11px', color: '#38BDF8', fontWeight: '700' }}>
                                                    #{p.id}
                                                </div>
                                            </div>

                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                backgroundColor: '#0F1E38',
                                                border: '1.5px solid rgba(56, 189, 248, 0.4)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                overflow: 'hidden',
                                                flexShrink: 0,
                                            }}>
                                                {p.image ? (
                                                    <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <Package size={20} color="#38BDF8" />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* 2x2 Grid Boxes matching Screenshot 3 */}
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '8px',
                                        marginBottom: '14px',
                                    }}>
                                        <div style={{
                                            backgroundColor: isLight ? '#F8FAFC' : '#050A16',
                                            border: '1px solid rgba(56, 189, 248, 0.2)',
                                            borderRadius: '12px',
                                            padding: '8px 12px',
                                        }}>
                                            <div style={{ fontSize: '10.5px', color: '#94A3B8', fontWeight: '700' }}>القسم</div>
                                            <div style={{ fontSize: '12.5px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                                {p.category_name}
                                            </div>
                                        </div>

                                        <div style={{
                                            backgroundColor: isLight ? '#F8FAFC' : '#050A16',
                                            border: '1px solid rgba(56, 189, 248, 0.2)',
                                            borderRadius: '12px',
                                            padding: '8px 12px',
                                        }}>
                                            <div style={{ fontSize: '10.5px', color: '#94A3B8', fontWeight: '700' }}>المزود</div>
                                            <div style={{ fontSize: '12.5px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                                {p.provider_name}
                                            </div>
                                        </div>

                                        <div style={{
                                            backgroundColor: isLight ? '#F8FAFC' : '#050A16',
                                            border: '1px solid rgba(56, 189, 248, 0.2)',
                                            borderRadius: '12px',
                                            padding: '8px 12px',
                                        }}>
                                            <div style={{ fontSize: '10.5px', color: '#94A3B8', fontWeight: '700' }}>السعر الأساسي</div>
                                            <div style={{ fontSize: '11px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF', direction: 'ltr', textAlign: 'right', wordBreak: 'break-all' }}>
                                                {p.base_price || 0.00174232}
                                            </div>
                                        </div>

                                        <div style={{
                                            backgroundColor: isLight ? '#F8FAFC' : '#050A16',
                                            border: '1px solid rgba(56, 189, 248, 0.2)',
                                            borderRadius: '12px',
                                            padding: '8px 12px',
                                        }}>
                                            <div style={{ fontSize: '10.5px', color: '#94A3B8', fontWeight: '700' }}>الترتيب</div>
                                            <div style={{ fontSize: '12.5px', fontWeight: '800', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                                                {p.sort_order}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons: إيقاف, تعديل, حذف (Screenshot 3) */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        paddingTop: '10px',
                                        borderTop: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.05)',
                                    }}>
                                        <button
                                            type="button"
                                            onClick={() => setDeletingProduct(p)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                background: 'transparent',
                                                border: 'none',
                                                color: '#EF4444',
                                                fontSize: '12px',
                                                fontWeight: '800',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <Trash2 size={14} />
                                            <span>حذف</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => openEditProductModal(p)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                background: 'transparent',
                                                border: 'none',
                                                color: '#38BDF8',
                                                fontSize: '12px',
                                                fontWeight: '800',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <Edit3 size={14} />
                                            <span>تعديل</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleToggleProduct(p.id)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                background: 'transparent',
                                                border: 'none',
                                                color: p.is_active ? '#EF4444' : '#10B981',
                                                fontSize: '12px',
                                                fontWeight: '800',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <Power size={14} />
                                            <span>{p.is_active ? 'إيقاف' : 'تشغيل'}</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* =========================================================================
                MODAL 1: إضافة قسم (Matching media_1793382996467_30d57dca.jpg)
               ========================================================================= */}
            {isCategoryModalOpen && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px',
                    direction: 'rtl',
                }}>
                    <div style={{
                        backgroundColor: '#0A1224',
                        border: '1.5px solid rgba(56, 189, 248, 0.35)',
                        borderRadius: '24px',
                        width: '100%',
                        maxWidth: '440px',
                        padding: '24px 20px',
                        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
                    }}>
                        {/* Header */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#FFFFFF', margin: 0 }}>
                                {editingCategory ? 'تعديل بيانات القسم' : 'إضافة قسم'}
                            </h3>
                            <button
                                type="button"
                                onClick={() => setIsCategoryModalOpen(false)}
                                style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveCategory}>
                            {/* الاسم بالإنجليزية */}
                            <div style={{ marginBottom: '14px' }}>
                                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                    الاسم بالإنجليزية
                                </label>
                                <input
                                    type="text"
                                    placeholder="مثال: Games"
                                    value={catNameEn}
                                    onChange={(e) => setCatNameEn(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        borderRadius: '14px',
                                        backgroundColor: '#060B18',
                                        border: '1px solid rgba(56, 189, 248, 0.35)',
                                        color: '#FFFFFF',
                                        fontSize: '13px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            {/* الاسم بالعربية */}
                            <div style={{ marginBottom: '14px' }}>
                                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                    الاسم بالعربية
                                </label>
                                <input
                                    type="text"
                                    placeholder="مثال: قسم شحن الألعاب"
                                    value={catNameAr}
                                    onChange={(e) => setCatNameAr(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        borderRadius: '14px',
                                        backgroundColor: '#060B18',
                                        border: '1px solid rgba(56, 189, 248, 0.35)',
                                        color: '#FFFFFF',
                                        fontSize: '13px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            {/* ترتيب العرض (رقم) */}
                            <div style={{ marginBottom: '14px' }}>
                                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                    ترتيب العرض (رقم)
                                </label>
                                <input
                                    type="number"
                                    value={catSortOrder}
                                    onChange={(e) => setCatSortOrder(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        borderRadius: '14px',
                                        backgroundColor: '#060B18',
                                        border: '1px solid rgba(56, 189, 248, 0.35)',
                                        color: '#FFFFFF',
                                        fontSize: '13px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            {/* القسم الرئيسي (اختياري) */}
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                    القسم الرئيسي (اختياري)
                                </label>
                                <select
                                    value={catParentId}
                                    onChange={(e) => setCatParentId(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        borderRadius: '14px',
                                        backgroundColor: '#060B18',
                                        border: '1px solid rgba(56, 189, 248, 0.35)',
                                        color: '#FFFFFF',
                                        fontSize: '13px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                >
                                    <option value="">— بدون (قسم رئيسي) —</option>
                                    {categories.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* صورة القسم (رفع) */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                    صورة القسم (رفع)
                                </label>
                                <input
                                    type="file"
                                    ref={catFileInputRef}
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setCatImageFile(file);
                                            setCatImagePreview(URL.createObjectURL(file));
                                        }
                                    }}
                                />
                                <div
                                    onClick={() => catFileInputRef.current?.click()}
                                    style={{
                                        border: '1.5px dashed rgba(56, 189, 248, 0.35)',
                                        borderRadius: '16px',
                                        padding: '24px 16px',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        backgroundColor: '#060B18',
                                    }}
                                >
                                    {catImagePreview ? (
                                        <img src={catImagePreview} alt="Preview" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 8px' }} />
                                    ) : (
                                        <UploadCloud size={28} color="#38BDF8" style={{ margin: '0 auto 8px' }} />
                                    )}
                                    <div style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF' }}>
                                        {catImageFile ? catImageFile.name : 'اضغط لرفع الصورة'}
                                    </div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button
                                    type="submit"
                                    disabled={catSubmitting}
                                    style={{
                                        flex: 1,
                                        padding: '12px 20px',
                                        borderRadius: '14px',
                                        background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 50%, #B45309 100%)',
                                        color: '#07090E',
                                        fontWeight: '900',
                                        fontSize: '14px',
                                        border: 'none',
                                        cursor: catSubmitting ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    {catSubmitting ? 'جاري الحفظ...' : (editingCategory ? 'حفظ التعديلات' : 'إضافة القسم')}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setIsCategoryModalOpen(false)}
                                    style={{
                                        padding: '12px 20px',
                                        borderRadius: '14px',
                                        backgroundColor: '#060B18',
                                        border: '1px solid rgba(56, 189, 248, 0.25)',
                                        color: '#94A3B8',
                                        fontWeight: '700',
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    إلغاء
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* =========================================================================
                MODAL 2: إضافة / تعديل منتج - Matching media_1793383020274 & 3030425
               ========================================================================= */}
            {isProductModalOpen && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px',
                    direction: 'rtl',
                }}>
                    <div style={{
                        backgroundColor: '#0A1224',
                        border: '1.5px solid rgba(56, 189, 248, 0.35)',
                        borderRadius: '24px',
                        width: '100%',
                        maxWidth: '480px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        padding: '24px 20px',
                        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
                    }}>
                        {/* Header: Title on Right, Close on Left */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#FFFFFF', margin: 0 }}>
                                {editingProduct ? 'تعديل منتج' : 'إضافة منتج'}
                            </h3>
                            <button
                                type="button"
                                onClick={() => setIsProductModalOpen(false)}
                                style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Top Stepper (Matching Screenshot 4) */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr',
                            gap: '6px',
                            backgroundColor: '#060B18',
                            padding: '4px',
                            borderRadius: '16px',
                            marginBottom: '20px',
                            border: '1px solid rgba(56, 189, 248, 0.25)',
                        }}>
                            <button
                                type="button"
                                onClick={() => setModalStep(1)}
                                style={{
                                    padding: '8px 4px',
                                    borderRadius: '12px',
                                    fontSize: '12px',
                                    fontWeight: '800',
                                    border: 'none',
                                    cursor: 'pointer',
                                    backgroundColor: modalStep === 1 ? '#0F294D' : 'transparent',
                                    color: modalStep === 1 ? '#38BDF8' : '#94A3B8',
                                }}
                            >
                                1 الأساسيات
                            </button>

                            <button
                                type="button"
                                onClick={() => setModalStep(2)}
                                style={{
                                    padding: '8px 4px',
                                    borderRadius: '12px',
                                    fontSize: '12px',
                                    fontWeight: '800',
                                    border: 'none',
                                    cursor: 'pointer',
                                    backgroundColor: modalStep === 2 ? '#0F294D' : 'transparent',
                                    color: modalStep === 2 ? '#38BDF8' : '#94A3B8',
                                }}
                            >
                                2 الربط والسعر
                            </button>

                            <button
                                type="button"
                                onClick={() => setModalStep(3)}
                                style={{
                                    padding: '8px 4px',
                                    borderRadius: '12px',
                                    fontSize: '12px',
                                    fontWeight: '800',
                                    border: 'none',
                                    cursor: 'pointer',
                                    backgroundColor: modalStep === 3 ? '#0F294D' : 'transparent',
                                    color: modalStep === 3 ? '#38BDF8' : '#94A3B8',
                                }}
                            >
                                3 حقول الطلب وال...
                            </button>
                        </div>

                        <form onSubmit={handleSaveProduct}>
                            {/* ── STEP 1: الأساسيات ── */}
                            {modalStep === 1 && (
                                <div>
                                    <div style={{ fontSize: '15px', fontWeight: '900', color: '#FFFFFF', marginBottom: '14px' }}>
                                        1 البيانات الأساسية للمنتج
                                    </div>

                                    <div style={{ marginBottom: '14px' }}>
                                        <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                            اسم المنتج <span style={{ color: '#EF4444' }}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="مثال: ياهو أو اهلين شات"
                                            value={formProdName}
                                            onChange={(e) => setFormProdName(e.target.value)}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '12px 14px',
                                                borderRadius: '14px',
                                                backgroundColor: '#060B18',
                                                border: '1px solid rgba(56, 189, 248, 0.35)',
                                                color: '#FFFFFF',
                                                fontSize: '13px',
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                            }}
                                        />
                                    </div>

                                    <div style={{ marginBottom: '14px' }}>
                                        <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                            القسم التابع له <span style={{ color: '#EF4444' }}>*</span>
                                        </label>
                                        <select
                                            value={formProdCategory}
                                            onChange={(e) => setFormProdCategory(e.target.value)}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '12px 14px',
                                                borderRadius: '14px',
                                                backgroundColor: '#060B18',
                                                border: '1px solid rgba(56, 189, 248, 0.35)',
                                                color: '#FFFFFF',
                                                fontSize: '13px',
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                            }}
                                        >
                                            <option value="">-- اختر القسم --</option>
                                            {categories.map(c => (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div style={{ marginBottom: '16px' }}>
                                        <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                            ترتيب الظهور
                                        </label>
                                        <input
                                            type="number"
                                            value={formProdSortOrder}
                                            onChange={(e) => setFormProdSortOrder(e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '12px 14px',
                                                borderRadius: '14px',
                                                backgroundColor: '#060B18',
                                                border: '1px solid rgba(56, 189, 248, 0.35)',
                                                color: '#FFFFFF',
                                                fontSize: '13px',
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                            }}
                                        />
                                    </div>

                                    {/* صورة المنتج (رفع صورة) */}
                                    <div style={{ marginBottom: '16px' }}>
                                        <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                            صورة المنتج (رفع صورة)
                                        </label>
                                        <input
                                            type="file"
                                            ref={prodFileInputRef}
                                            onChange={handleProductImageUpload}
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                        />
                                        <div
                                            onClick={() => prodFileInputRef.current?.click()}
                                            style={{
                                                border: '2px dashed rgba(56, 189, 248, 0.4)',
                                                borderRadius: '16px',
                                                padding: '16px',
                                                textAlign: 'center',
                                                backgroundColor: 'rgba(6, 11, 24, 0.6)',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                            }}
                                        >
                                            {formProdImage ? (
                                                <div style={{ position: 'relative', display: 'inline-block' }}>
                                                    <img
                                                        src={formProdImage}
                                                        alt="معاينة صورة المنتج"
                                                        style={{
                                                            maxWidth: '90px',
                                                            maxHeight: '90px',
                                                            borderRadius: '12px',
                                                            objectFit: 'contain',
                                                            border: '1px solid rgba(56, 189, 248, 0.3)',
                                                        }}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setFormProdImage('');
                                                        }}
                                                        style={{
                                                            position: 'absolute',
                                                            top: '-8px',
                                                            left: '-8px',
                                                            backgroundColor: '#EF4444',
                                                            color: '#FFFFFF',
                                                            border: 'none',
                                                            borderRadius: '50%',
                                                            width: '22px',
                                                            height: '22px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <UploadCloud size={28} color="#38BDF8" style={{ margin: '0 auto 6px' }} />
                                                    <div style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF' }}>
                                                        اضغط لرفع صورة المنتج
                                                    </div>
                                                    <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
                                                        PNG, JPG, WEBP حتى 5MB
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* وصف المنتج */}
                                    <div style={{ marginBottom: '16px' }}>
                                        <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                            وصف المنتج (اختياري)
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={formProdDescription}
                                            onChange={(e) => setFormProdDescription(e.target.value)}
                                            placeholder="أدخل وصفاً تفصيلياً للمنتج أو شروط وتعليمات الشحن للعملاء..."
                                            style={{
                                                width: '100%',
                                                padding: '12px 14px',
                                                borderRadius: '14px',
                                                backgroundColor: '#060B18',
                                                border: '1px solid rgba(56, 189, 248, 0.35)',
                                                color: '#FFFFFF',
                                                fontSize: '13px',
                                                fontFamily: 'Cairo, sans-serif',
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                                resize: 'vertical',
                                                minHeight: '75px',
                                            }}
                                        />
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                                        <button
                                            type="button"
                                            onClick={() => setModalStep(2)}
                                            style={{
                                                padding: '12px 24px',
                                                borderRadius: '14px',
                                                background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                                color: '#07090E',
                                                fontWeight: '900',
                                                fontSize: '14px',
                                                border: 'none',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            التالي (الربط والتسعير) ←
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* ── STEP 2: الربط والسعر (Matches Screenshot 4 & 5) ── */}
                            {modalStep === 2 && (
                                <div>
                                    <div style={{ fontSize: '15px', fontWeight: '900', color: '#FFFFFF', marginBottom: '14px' }}>
                                        2 الكمية والتسعير
                                    </div>

                                    {/* Sub Card Container */}
                                    <div style={{
                                        backgroundColor: '#060B18',
                                        border: '1px solid rgba(56, 189, 248, 0.25)',
                                        borderRadius: '18px',
                                        padding: '16px',
                                        marginBottom: '16px',
                                    }}>
                                        {/* نوع الربط: يدوي vs آلي */}
                                        <div style={{ marginBottom: '16px' }}>
                                            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                                نوع الربط
                                            </label>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                                <button
                                                    type="button"
                                                    onClick={() => setFulfillmentMode('manual')}
                                                    style={{
                                                        padding: '10px',
                                                        borderRadius: '12px',
                                                        fontSize: '13px',
                                                        fontWeight: '800',
                                                        border: fulfillmentMode === 'manual' ? '2px solid #38BDF8' : '1px solid rgba(56, 189, 248, 0.25)',
                                                        backgroundColor: fulfillmentMode === 'manual' ? '#0F294D' : '#040711',
                                                        color: fulfillmentMode === 'manual' ? '#FFFFFF' : '#94A3B8',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    يدوي
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => setFulfillmentMode('auto')}
                                                    style={{
                                                        padding: '10px',
                                                        borderRadius: '12px',
                                                        fontSize: '13px',
                                                        fontWeight: '800',
                                                        border: fulfillmentMode === 'auto' ? '2px solid #38BDF8' : '1px solid rgba(56, 189, 248, 0.25)',
                                                        backgroundColor: fulfillmentMode === 'auto' ? '#0F294D' : '#040711',
                                                        color: fulfillmentMode === 'auto' ? '#FFFFFF' : '#94A3B8',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    آلي
                                                </button>
                                            </div>
                                        </div>

                                        {/* اختر المورد (Screenshot 4 & 5) */}
                                        <div style={{ marginBottom: '16px' }}>
                                            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#CBD5E1', marginBottom: '6px' }}>
                                                اختر المورد
                                            </label>
                                            <select
                                                value={selectedProvider}
                                                onChange={(e) => {
                                                    setSelectedProvider(e.target.value);
                                                    setSelectedProviderProduct(null);
                                                }}
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 14px',
                                                    borderRadius: '14px',
                                                    backgroundColor: '#040711',
                                                    border: '1.5px solid #38BDF8',
                                                    color: '#FFFFFF',
                                                    fontSize: '13.5px',
                                                    fontWeight: '800',
                                                    outline: 'none',
                                                    boxSizing: 'border-box',
                                                }}
                                            >
                                                {providers.length === 0 && <option value="منصة إمبراطور (Embrator Store)">منصة إمبراطور (Embrator Store)</option>}
                                                {providers.map(p => (
                                                    <option key={p.id} value={p.id}>{p.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* اختر المنتج من المورد (The Core Mapping Feature) */}
                                        <div style={{ marginBottom: '16px' }}>
                                            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#38BDF8', marginBottom: '6px' }}>
                                                اختر المنتج من المورد
                                            </label>

                                            {/* Status Card: Not selected or Selected */}
                                            {selectedProviderProduct ? (
                                                <div style={{
                                                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                                                    border: '1.5px solid #10B981',
                                                    borderRadius: '14px',
                                                    padding: '12px 14px',
                                                    marginBottom: '10px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                }}>
                                                    <div>
                                                        <div style={{ fontSize: '13px', fontWeight: '900', color: '#10B981', marginBottom: '2px' }}>
                                                            ✓ تم اختيار المنتج للسحب من المورد:
                                                        </div>
                                                        <div style={{ fontSize: '14px', fontWeight: '900', color: '#F5D061' }}>
                                                            {formProdName ? `${formProdName} — ` : ''}{selectedProviderProduct.name}
                                                        </div>
                                                        <div style={{ fontSize: '11px', color: '#38BDF8', marginTop: '2px', direction: 'ltr', textAlign: 'right' }}>
                                                            معرف المورد: {selectedProviderProduct.id} | التكلفة: {selectedProviderProduct.price} {selectedProviderProduct.currency_label}
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => setSelectedProviderProduct(null)}
                                                        style={{
                                                            background: 'transparent',
                                                            border: 'none',
                                                            color: '#EF4444',
                                                            cursor: 'pointer',
                                                            padding: '4px',
                                                        }}
                                                        title="إلغاء التحديد وتغيير المنتج"
                                                    >
                                                        <X size={18} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div style={{
                                                    backgroundColor: 'rgba(56, 189, 248, 0.08)',
                                                    border: '1px solid rgba(56, 189, 248, 0.25)',
                                                    borderRadius: '14px',
                                                    padding: '12px 14px',
                                                    marginBottom: '10px',
                                                }}>
                                                    <div style={{ fontSize: '13px', fontWeight: '800', color: '#38BDF8', marginBottom: '2px' }}>
                                                        لم يتم اختيار منتج من المورد بعد
                                                    </div>
                                                    <div style={{ fontSize: '11.5px', color: '#94A3B8' }}>
                                                        اختر المورد أولاً ثم اختر المنتج المناسب
                                                    </div>
                                                </div>
                                            )}

                                            {/* Search inside provider products & Item Cards (Screenshot 5) */}
                                            {!selectedProvider ? (
                                                <div style={{
                                                    border: '1.5px dashed rgba(56, 189, 248, 0.3)',
                                                    borderRadius: '14px',
                                                    padding: '20px',
                                                    textAlign: 'center',
                                                    color: '#94A3B8',
                                                    fontSize: '12.5px',
                                                    backgroundColor: '#040711',
                                                }}>
                                                    اختر المورد أولاً حتى تظهر منتجاته هنا بشكل منظم.
                                                </div>
                                            ) : (
                                                <div>
                                                    {/* Search Input matching Screenshot 5 */}
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px',
                                                        backgroundColor: '#040711',
                                                        border: '1px solid rgba(56, 189, 248, 0.35)',
                                                        borderRadius: '12px',
                                                        padding: '8px 12px',
                                                        marginBottom: '8px',
                                                    }}>
                                                        <Search size={15} color="#94A3B8" />
                                                        <input
                                                            type="text"
                                                            placeholder="ابحث داخل منتجات المورد بالاسم أو المعرف..."
                                                            value={providerCatalogSearch}
                                                            onChange={(e) => setProviderCatalogSearch(e.target.value)}
                                                            style={{
                                                                border: 'none',
                                                                outline: 'none',
                                                                backgroundColor: 'transparent',
                                                                color: '#FFFFFF',
                                                                fontSize: '12.5px',
                                                                width: '100%',
                                                            }}
                                                        />
                                                    </div>

                                                    {/* Counter Subtitle matching Screenshot 5 */}
                                                    <div style={{ fontSize: '11.5px', color: '#94A3B8', marginBottom: '10px' }}>
                                                        1271 منتج متاح، يتم عرض {filteredProviderItems.length}
                                                    </div>

                                                    {/* Products Cards List matching Screenshot 5 */}
                                                    <div style={{
                                                        maxHeight: '220px',
                                                        overflowY: 'auto',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '8px',
                                                        paddingRight: '2px',
                                                    }}>
                                                        {filteredProviderItems.map((item) => {
                                                            const isSelected = selectedProviderProduct?.id === item.id;
                                                            return (
                                                                <div
                                                                    key={item.id}
                                                                    onClick={() => handleSelectProviderProduct(item)}
                                                                    style={{
                                                                        backgroundColor: isSelected ? '#0F2B52' : '#040711',
                                                                        border: isSelected ? '1.5px solid #38BDF8' : '1px solid rgba(56, 189, 248, 0.2)',
                                                                        borderRadius: '14px',
                                                                        padding: '10px 14px',
                                                                        cursor: 'pointer',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'space-between',
                                                                        gap: '10px',
                                                                        transition: 'all 0.15s ease',
                                                                    }}
                                                                >
                                                                    {/* Left side: Box icon + Price/Currency + Range Badge */}
                                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px', flexShrink: 0 }}>
                                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                            <Package size={14} color="#38BDF8" />
                                                                            <span style={{ fontSize: '11px', color: '#94A3B8' }}>
                                                                                {item.price} دولار {item.price_egp ? `(~${item.price_egp} ج.م)` : ''}
                                                                            </span>
                                                                        </div>
                                                                        <span style={{
                                                                            fontSize: '10px',
                                                                            fontWeight: '700',
                                                                            backgroundColor: 'rgba(56, 189, 248, 0.12)',
                                                                            color: '#38BDF8',
                                                                            padding: '2px 8px',
                                                                            borderRadius: '6px',
                                                                            border: '1px solid rgba(56, 189, 248, 0.25)',
                                                                        }}>
                                                                            من {item.min_qty} إلى {item.max_qty}
                                                                        </span>
                                                                    </div>

                                                                    {/* Right side: Product Name + Monospace ID */}
                                                                    <div style={{ textAlign: 'right', minWidth: 0 }}>
                                                                        <div style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                            {item.name}
                                                                        </div>
                                                                        <div style={{ fontSize: '10px', fontFamily: 'monospace', color: '#64748B', direction: 'ltr', textAlign: 'right' }}>
                                                                            {item.id}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>

                                                    {/* Load More Button */}
                                                    {filteredProviderItems.length >= providerPageSize && (
                                                        <button
                                                            type="button"
                                                            onClick={() => setProviderPageSize(prev => prev + 40)}
                                                            style={{
                                                                width: '100%',
                                                                padding: '8px',
                                                                borderRadius: '10px',
                                                                backgroundColor: '#040711',
                                                                border: '1px solid rgba(56, 189, 248, 0.25)',
                                                                color: '#38BDF8',
                                                                fontSize: '12px',
                                                                fontWeight: '800',
                                                                cursor: 'pointer',
                                                                marginTop: '8px',
                                                            }}
                                                        >
                                                            عرض المزيد ({filteredProviderItems.length} منتج)
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Checkbox: autoFulfillmentEnabled (Screenshot 4) */}
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', cursor: 'pointer' }}>
                                            <input
                                                type="checkbox"
                                                checked={autoFulfillmentEnabled}
                                                onChange={(e) => setAutoFulfillmentEnabled(e.target.checked)}
                                                style={{ width: '18px', height: '18px', accentColor: '#38BDF8' }}
                                            />
                                            <span style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF' }}>
                                                autoFulfillmentEnabled
                                            </span>
                                        </label>

                                        {/* Checkbox: مزامنة السعر والحدود من المورد (Screenshot 4) */}
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', cursor: 'pointer' }}>
                                            <input
                                                type="checkbox"
                                                checked={syncPricingEnabled}
                                                onChange={(e) => setSyncPricingEnabled(e.target.checked)}
                                                style={{ width: '18px', height: '18px', accentColor: '#38BDF8' }}
                                            />
                                            <span style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF' }}>
                                                مزامنة السعر والحدود من المورد
                                            </span>
                                        </label>

                                        {/* Price & Limits Inputs */}
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '11.5px', color: '#94A3B8', marginBottom: '4px' }}>
                                                    الحد الأدنى
                                                </label>
                                                <input
                                                    type="number"
                                                    value={minQty}
                                                    onChange={(e) => setMinQty(e.target.value)}
                                                    style={{
                                                        width: '100%',
                                                        padding: '10px 12px',
                                                        borderRadius: '12px',
                                                        backgroundColor: '#040711',
                                                        border: '1px solid rgba(56, 189, 248, 0.25)',
                                                        color: '#FFFFFF',
                                                        fontSize: '13px',
                                                        outline: 'none',
                                                        boxSizing: 'border-box',
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <label style={{ display: 'block', fontSize: '11.5px', color: '#94A3B8', marginBottom: '4px' }}>
                                                    الحد الأقصى
                                                </label>
                                                <input
                                                    type="number"
                                                    value={maxQty}
                                                    onChange={(e) => setMaxQty(e.target.value)}
                                                    style={{
                                                        width: '100%',
                                                        padding: '10px 12px',
                                                        borderRadius: '12px',
                                                        backgroundColor: '#040711',
                                                        border: '1px solid rgba(56, 189, 248, 0.25)',
                                                        color: '#FFFFFF',
                                                        fontSize: '13px',
                                                        outline: 'none',
                                                        boxSizing: 'border-box',
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* السعر النهائي */}
                                        <div style={{ marginBottom: '10px' }}>
                                            <label style={{ display: 'block', fontSize: '11.5px', color: '#94A3B8', marginBottom: '4px' }}>
                                                السعر النهائي (دولار)
                                            </label>
                                            <input
                                                type="text"
                                                value={finalPrice}
                                                onChange={(e) => setFinalPrice(e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    padding: '10px 12px',
                                                    borderRadius: '12px',
                                                    backgroundColor: '#040711',
                                                    border: '1px solid rgba(56, 189, 248, 0.25)',
                                                    color: '#FFFFFF',
                                                    fontSize: '13px',
                                                    direction: 'ltr',
                                                    textAlign: 'right',
                                                    outline: 'none',
                                                    boxSizing: 'border-box',
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Navigation Buttons */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                                        <button
                                            type="button"
                                            onClick={() => setModalStep(1)}
                                            style={{
                                                padding: '10px 18px',
                                                borderRadius: '12px',
                                                backgroundColor: '#060B18',
                                                border: '1px solid rgba(56, 189, 248, 0.25)',
                                                color: '#CBD5E1',
                                                fontWeight: '700',
                                                fontSize: '13px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            السابق
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setModalStep(3)}
                                            style={{
                                                padding: '10px 22px',
                                                borderRadius: '12px',
                                                background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                                color: '#07090E',
                                                fontWeight: '900',
                                                fontSize: '13px',
                                                border: 'none',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            التالي (حقول الطلب) ←
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* ── STEP 3: حقول الطلب ── */}
                            {modalStep === 3 && (
                                <div>
                                    <div style={{ fontSize: '15px', fontWeight: '900', color: '#FFFFFF', marginBottom: '14px' }}>
                                        3 حقول الطلب وتخصيص تجربة العميل
                                    </div>

                                    {/* آيدي الحساب المستلم الظاهر فوق الكمية */}
                                    <div style={{
                                        backgroundColor: '#060B18',
                                        border: '1.5px solid rgba(16, 185, 129, 0.5)',
                                        borderRadius: '18px',
                                        padding: '16px',
                                        marginBottom: '16px',
                                    }}>
                                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#10B981', marginBottom: '6px' }}>
                                            آيدي الحساب المستلم الظاهر فوق الكمية
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="آيدي الحساب (User ID)"
                                            value={playerIdLabel}
                                            onChange={(e) => setPlayerIdLabel(e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '12px 14px',
                                                borderRadius: '12px',
                                                backgroundColor: '#040711',
                                                border: '1px solid #10B981',
                                                color: '#FFFFFF',
                                                fontSize: '13px',
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                                marginBottom: '10px',
                                            }}
                                        />

                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '6px' }}>
                                            <input
                                                type="checkbox"
                                                checked={showPlayerIdToUser}
                                                onChange={(e) => setShowPlayerIdToUser(e.target.checked)}
                                                style={{ width: '16px', height: '16px', accentColor: '#10B981' }}
                                            />
                                            <span style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF' }}>
                                                إظهاره للمستخدم
                                            </span>
                                        </label>

                                        <div style={{ fontSize: '11px', color: '#10B981', lineHeight: '1.5' }}>
                                            عند التفعيل سيظهر آيدي الحساب المستلم للمستخدم داخل نافذة الشراء فوق الكمية ويمكن نسخه بالضغط عليه.
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                                        <button
                                            type="button"
                                            onClick={() => setModalStep(2)}
                                            style={{
                                                padding: '10px 18px',
                                                borderRadius: '12px',
                                                backgroundColor: '#060B18',
                                                border: '1px solid rgba(56, 189, 248, 0.25)',
                                                color: '#CBD5E1',
                                                fontWeight: '700',
                                                fontSize: '13px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            السابق
                                        </button>

                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button
                                                type="button"
                                                onClick={() => setIsProductModalOpen(false)}
                                                style={{
                                                    padding: '10px 16px',
                                                    borderRadius: '12px',
                                                    backgroundColor: '#060B18',
                                                    border: '1px solid rgba(56, 189, 248, 0.25)',
                                                    color: '#94A3B8',
                                                    fontWeight: '700',
                                                    fontSize: '13px',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                إلغاء
                                            </button>

                                            <button
                                                type="submit"
                                                disabled={productSubmitting}
                                                style={{
                                                    padding: '10px 22px',
                                                    borderRadius: '12px',
                                                    background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 50%, #B45309 100%)',
                                                    color: '#07090E',
                                                    fontWeight: '900',
                                                    fontSize: '13px',
                                                    border: 'none',
                                                    cursor: productSubmitting ? 'not-allowed' : 'pointer',
                                                    boxShadow: '0 4px 15px rgba(212, 165, 55, 0.35)',
                                                }}
                                            >
                                                {productSubmitting ? 'جاري الحفظ والربط...' : 'حفظ بيانات المنتج والربط'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            )}

            {/* =========================================================================
                MODAL 3: تأكيد حذف منتج
               ========================================================================= */}
            {deletingProduct && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px',
                    direction: 'rtl',
                    textAlign: 'center',
                }}>
                    <div style={{
                        backgroundColor: '#0A1224',
                        border: '1.5px solid rgba(239, 68, 68, 0.35)',
                        borderRadius: '24px',
                        width: '100%',
                        maxWidth: '400px',
                        padding: '24px',
                    }}>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(239, 68, 68, 0.15)',
                            color: '#EF4444',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 14px',
                        }}>
                            <Trash2 size={24} />
                        </div>

                        <h3 style={{ fontSize: '17px', fontWeight: '900', margin: '0 0 6px', color: '#FFFFFF' }}>
                            تأكيد حذف المنتج
                        </h3>
                        <p style={{ fontSize: '12.5px', color: '#94A3B8', marginBottom: '20px' }}>
                            هل أنت متأكد من حذف المنتج "{deletingProduct.name}" نهائيًا؟
                        </p>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                type="button"
                                onClick={handleDeleteProduct}
                                disabled={deleteProdSubmitting}
                                style={{
                                    flex: 1,
                                    padding: '11px',
                                    borderRadius: '12px',
                                    backgroundColor: '#DC2626',
                                    color: '#FFFFFF',
                                    fontWeight: '800',
                                    fontSize: '13px',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                {deleteProdSubmitting ? 'جاري الحذف...' : 'نعم، احذف'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setDeletingProduct(null)}
                                style={{
                                    padding: '11px 20px',
                                    borderRadius: '12px',
                                    backgroundColor: '#060B18',
                                    border: '1px solid rgba(56, 189, 248, 0.25)',
                                    color: '#94A3B8',
                                    fontWeight: '700',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                }}
                            >
                                إلغاء
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* =========================================================================
                MODAL 4: تأكيد حذف قسم
               ========================================================================= */}
            {deletingCategory && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px',
                    direction: 'rtl',
                    textAlign: 'center',
                }}>
                    <div style={{
                        backgroundColor: '#0A1224',
                        border: '1.5px solid rgba(239, 68, 68, 0.35)',
                        borderRadius: '24px',
                        width: '100%',
                        maxWidth: '400px',
                        padding: '24px',
                        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
                    }}>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(239, 68, 68, 0.15)',
                            color: '#EF4444',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 14px',
                        }}>
                            <Trash2 size={24} />
                        </div>

                        <h3 style={{ fontSize: '17px', fontWeight: '900', margin: '0 0 6px', color: '#FFFFFF' }}>
                            تأكيد حذف القسم
                        </h3>
                        <p style={{ fontSize: '12.5px', color: '#94A3B8', marginBottom: '20px' }}>
                            هل أنت متأكد من حذف قسم "{deletingCategory.name}" نهائيًا؟
                        </p>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                type="button"
                                onClick={handleConfirmDeleteCategory}
                                disabled={deleteCatSubmitting}
                                style={{
                                    flex: 1,
                                    padding: '11px',
                                    borderRadius: '12px',
                                    backgroundColor: '#DC2626',
                                    color: '#FFFFFF',
                                    fontWeight: '800',
                                    fontSize: '13px',
                                    border: 'none',
                                    cursor: deleteCatSubmitting ? 'not-allowed' : 'pointer',
                                }}
                            >
                                {deleteCatSubmitting ? 'جاري الحذف...' : 'نعم، احذف'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setDeletingCategory(null)}
                                style={{
                                    padding: '11px 20px',
                                    borderRadius: '12px',
                                    backgroundColor: '#060B18',
                                    border: '1px solid rgba(56, 189, 248, 0.25)',
                                    color: '#94A3B8',
                                    fontWeight: '700',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                }}
                            >
                                إلغاء
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
