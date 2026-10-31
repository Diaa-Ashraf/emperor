import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { developerApi } from '../api/endpoints';
import { ShieldCheck, Lock, Clock, Send, MessageCircle, Key, RefreshCw, Copy, Check, Terminal, ExternalLink, Code2 } from 'lucide-react';
import "../../css/developerApi.css";

export default function DeveloperApiPage() {
    const { user } = useAuth();
    const { addToast } = useToast();
    const { language, isRtl } = useLanguage();
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const isEn = language === 'en';

    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [saving, setSaving] = useState(false);
    const [requesting, setRequesting] = useState(false);

    // API Access State
    const [hasAccess, setHasAccess] = useState(false);
    const [apiStatus, setApiStatus] = useState('inactive'); // 'inactive' | 'pending' | 'active' | 'rejected'
    const [requestedAt, setRequestedAt] = useState(null);

    // Request Form State
    const [businessName, setBusinessName] = useState('');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [notes, setNotes] = useState('');

    // Active Credentials & Settings
    const [apiKey, setApiKey] = useState('');
    const [apiSecret, setApiSecret] = useState('');
    const [hasSecret, setHasSecret] = useState(false);
    const [ipWhitelist, setIpWhitelist] = useState('');
    const [webhookUrl, setWebhookUrl] = useState('');
    const [activeTab, setActiveTab] = useState('keys'); // 'keys' | 'docs'

    // Fetch initial API settings
    useEffect(() => {
        loadApiSettings();
    }, []);

    const loadApiSettings = async () => {
        setLoading(true);
        try {
            const res = await developerApi.getKeys();
            if (res.data?.data) {
                const d = res.data.data;
                setHasAccess(d.has_access || false);
                setApiStatus(d.api_access_status || 'inactive');
                setRequestedAt(d.api_access_requested_at || null);
                setApiKey(d.api_key || '');
                setHasSecret(d.has_secret || false);
                setWebhookUrl(d.webhook_url || '');
                setIpWhitelist((d.api_ip_whitelist || []).join('\n'));
            }
        } catch (err) {
            // New user or error
        } finally {
            setLoading(false);
        }
    };

    const handleRequestAccess = async (e) => {
        e.preventDefault();
        setRequesting(true);
        try {
            const res = await developerApi.requestAccess({
                business_name: businessName,
                website_url: websiteUrl,
                notes: notes,
            });
            if (res.data) {
                setApiStatus('pending');
                setRequestedAt(new Date().toISOString());
                addToast(
                    isEn
                        ? 'API access request submitted successfully! The platform administrator will review your account shortly.'
                        : 'تم إرسال طلب تفعيل الربط البرمجي بنجاح! سيقوم صاحب المنصة بمراجعة طلبك.',
                    'success'
                );
            }
        } catch (err) {
            addToast(
                err.response?.data?.message || (isEn ? 'An error occurred while submitting the request' : 'حدث خطأ أثناء إرسال الطلب'),
                'error'
            );
        } finally {
            setRequesting(false);
        }
    };

    const handleGenerateKeys = async () => {
        if (!hasAccess) {
            addToast(
                isEn
                    ? 'B2B API access has not been activated for your account yet by platform administration.'
                    : 'لم يتم تفعيل صلاحية الربط البرمجي لحسابك بعد من قِبل إدارة المنصة.',
                'error'
            );
            return;
        }

        const confirmMsg = isEn
            ? 'Regenerating keys will immediately invalidate your previous key. Are you sure?'
            : 'إعادة إنشاء المفتاح ستؤدي لتعطيل المفتاح القديم فوراً. هل أنت متأكد؟';

        if (apiKey && !window.confirm(confirmMsg)) {
            return;
        }

        setGenerating(true);
        try {
            const res = await developerApi.generateKeys();
            if (res.data?.data) {
                setApiKey(res.data.data.api_key);
                setApiSecret(res.data.data.api_secret);
                setHasSecret(true);
                addToast(
                    isEn
                        ? 'API Keys generated and activated successfully! Please store the API Secret in a secure location.'
                        : 'تم إنشاء المفاتيح وتفعيل التوكن بنجاح! احفظ الـ Secret في مكان آمن.',
                    'success'
                );
            }
        } catch (err) {
            addToast(
                err.response?.data?.message || (isEn ? 'Failed to generate API keys' : 'حدث خطأ أثناء إنشاء المفاتيح'),
                'error'
            );
        } finally {
            setGenerating(false);
        }
    };

    const handleSaveSettings = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const ips = ipWhitelist
                .split('\n')
                .map(ip => ip.trim())
                .filter(Boolean);

            await developerApi.updateSettings({
                webhook_url: webhookUrl || null,
                api_ip_whitelist: ips.length > 0 ? ips : null,
            });

            addToast(isEn ? 'API integration settings saved successfully' : 'تم حفظ إعدادات الربط بنجاح', 'success');
        } catch (err) {
            addToast(
                err.response?.data?.message || (isEn ? 'Failed to save settings' : 'حدث خطأ أثناء حفظ الإعدادات'),
                'error'
            );
        } finally {
            setSaving(false);
        }
    };

    const [copiedFullDocs, setCopiedFullDocs] = useState(false);

    const copyToClipboard = (text, label) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        addToast(isEn ? `${label} copied to clipboard` : `تم نسخ ${label} إلى الحافظة`, 'success');
    };

    const getFullDocumentationMarkdown = () => {
        const origin = window.location.origin;
        const currentKey = apiKey || 'YOUR_TOKEN';
        const userEmail = user?.email || 'reseller@example.com';

        return `========================================
B2B Reseller API Documentation
========================================

1) Base URLs
----------------------
API Base URL:
${origin}/api/v1/reseller
(Alternative: ${origin}/api/v1/external)

Note: All the following endpoints must be appended to the API Base URL.

2) Authentication
-------------------------
You must send your API Token in the HTTP Headers with every request:
x-api-key: ${currentKey}

3) Profile & Balance
-------------------------------
GET /balance
Full URL: ${origin}/api/v1/reseller/balance

Description: Returns reseller account data, balance, and credit limits.

Success JSON Response:
{
  "success": true,
  "data": {
    "email": "${userEmail}",
    "balance": 245.75,
    "walletBalance": 245.75,
    "creditLimit": 0,
    "creditUsed": 0,
    "currency": "USD"
  }
}

4) Products
-----------------------------------
GET /products
Full URL: ${origin}/api/v1/reseller/products

Description: Returns active products and required dynamic fields.

Success JSON Response:
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "PUBG Mobile UC 60",
      "price": 1.5,
      "minQty": 1,
      "maxQty": 50,
      "currency": "USD",
      "fields": [
        { "key": "playerId", "label": "Player ID", "required": true, "type": "text" }
      ]
    }
  ]
}

5) Place Order
--------------------------
POST /orders
Full URL: ${origin}/api/v1/reseller/orders

Headers:
x-api-key: ${currentKey}
Content-Type: application/json

Request Body Parameters:
- productId (String, Required)
- quantity (Number, Required)
- idempotencyKey (String/UUID, Required): Prevents duplicate orders.
- [dynamic_fields]: Send required fields (e.g., playerId).

Success JSON Response:
{
  "success": true,
  "data": {
    "orderId": "66a88f8c4b40f4a9f0d41010",
    "orderNumber": "ORD-12345",
    "status": "PENDING",
    "idempotencyKey": "uuid-here"
  }
}

6) Check Orders (Batch Support)
--------------------------------
GET /orders?keys=uuid1,uuid2
Full URL: ${origin}/api/v1/reseller/orders?keys=uuid1,uuid2

Description: Check the status of one or multiple orders simultaneously.

Success JSON Response:
{
  "success": true,
  "data": [
    {
      "orderId": "66a88f8c4b40f4a9f0d41010",
      "status": "COMPLETED",
      "idempotencyKey": "uuid1"
    }
  ]
}

7) Error Handling & Codes
------------------------
Failure Response Format:
{
  "success": false,
  "error": { "code": 100, "message": "Insufficient balance" }
}

Error Codes:
100: Insufficient balance
101: Product unavailable/inactive
102: Quantity out of range
120: API Key missing
121: Invalid API Key
122: API not allowed / Suspended
123: Validation Error
500: Internal Server Error
`;
    };

    const copyFullDocumentation = () => {
        const fullDocs = getFullDocumentationMarkdown();
        navigator.clipboard.writeText(fullDocs);
        setCopiedFullDocs(true);
        addToast(isEn ? 'Full B2B Documentation copied to clipboard!' : 'تم نسخ دليل الربط البرمجي الكامل (B2B Docs) بنجاح!', 'success');
        setTimeout(() => setCopiedFullDocs(false), 3000);
    };

    return (
        <MainLayout>
            <div className="developer-api-page" style={{
                maxWidth: '100%',
                width: '100%',
                boxSizing: 'border-box',
                margin: '0',
                padding: '10px 0 60px',
                color: isLight ? '#0F172A' : '#f3f4f6',
                fontFamily: 'inherit',
                direction: isRtl ? 'rtl' : 'ltr',
            }}>

            {/* Header */}
            <div className="developer-api-header" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '15px',
                marginBottom: '30px',
                borderBottom: isLight ? '1px solid rgba(212, 165, 55, 0.3)' : '1px solid rgba(56, 189, 248, 0.25)',
                paddingBottom: '20px'
            }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '24px' }}>🔑</span>
                        <h1 style={{ fontSize: '24px', fontWeight: '800', color: isLight ? '#0F172A' : '#F5D061', margin: 0 }}>
                            {isEn ? 'B2B API & Integration Management' : 'إدارة الربط البرمجي والمفاتيح (B2B API)'}
                        </h1>
                    </div>
                    <p style={{ color: isLight ? '#475569' : '#9ca3af', fontSize: '14px', marginTop: '6px' }}>
                        {isEn
                            ? 'Connect your external store or application to Mohra & Sand Card to automate digital top-ups and PIN codes with zero delay'
                            : 'اربط متجرك أو تطبيقك الخارجي بمنصة سند ومهره كارد لتنفيذ طلبات الشحن وسحب الأكواد تلقائياً وبأسرع وقت'}
                    </p>
                </div>

                <div className="developer-api-tabs" style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={() => setActiveTab('keys')}
                        style={{
                            padding: '10px 18px',
                            borderRadius: '10px',
                            fontSize: '14px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            border: '1px solid',
                            borderColor: activeTab === 'keys' ? '#D4A537' : (isLight ? '#CBD5E1' : 'rgba(255,255,255,0.1)'),
                            background: activeTab === 'keys'
                                ? 'linear-gradient(135deg, #D4A537, #B38622)'
                                : (isLight ? '#F1F5F9' : 'rgba(255,255,255,0.03)'),
                            color: activeTab === 'keys' ? '#0b0f19' : (isLight ? '#334155' : '#e5e7eb'),
                            transition: 'all 0.2s ease',
                            boxShadow: activeTab === 'keys' ? '0 4px 12px rgba(212, 165, 55, 0.25)' : 'none',
                        }}
                    >
                        {isEn ? '🔑 Keys & Settings' : '🔑 المفاتيح والإعدادات'}
                    </button>
                    <button
                        onClick={() => setActiveTab('docs')}
                        style={{
                            padding: '10px 18px',
                            borderRadius: '10px',
                            fontSize: '14px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            border: '1px solid',
                            borderColor: activeTab === 'docs' ? '#D4A537' : (isLight ? '#CBD5E1' : 'rgba(255,255,255,0.1)'),
                            background: activeTab === 'docs'
                                ? 'linear-gradient(135deg, #D4A537, #B38622)'
                                : (isLight ? '#F1F5F9' : 'rgba(255,255,255,0.03)'),
                            color: activeTab === 'docs' ? '#0b0f19' : (isLight ? '#334155' : '#e5e7eb'),
                            transition: 'all 0.2s ease',
                            boxShadow: activeTab === 'docs' ? '0 4px 12px rgba(212, 165, 55, 0.25)' : 'none',
                        }}
                    >
                        {isEn ? '📖 API Documentation' : '📖 التوثيق الفني (API Docs)'}
                    </button>
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '60px', color: '#D4A537', fontWeight: '700' }}>
                    {isEn ? 'Checking API integration permissions...' : 'جاري فحص صلاحية الربط البرمجي...'}
                </div>
            ) : activeTab === 'keys' ? (
                !hasAccess ? (
                    /* User has NOT been approved yet by Platform Owner */
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {apiStatus === 'pending' ? (
                            /* Pending State */
                            <div style={{
                                background: isLight ? '#FFFFFF' : 'linear-gradient(135deg, rgba(26, 26, 36, 0.95) 0%, rgba(18, 18, 24, 0.98) 100%)',
                                border: isLight ? '1.5px solid rgba(212, 165, 55, 0.45)' : '1px solid rgba(212, 165, 55, 0.4)',
                                borderRadius: '20px',
                                padding: 'clamp(20px, 4vw, 36px)',
                                textAlign: 'center',
                                boxShadow: isLight ? '0 10px 30px rgba(30, 80, 140, 0.08)' : '0 10px 40px rgba(0,0,0,0.5)',
                            }}>
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '50%',
                                    background: isLight ? 'rgba(212, 165, 55, 0.12)' : 'rgba(212, 165, 55, 0.15)',
                                    color: '#D4A537',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 16px',
                                }}>
                                    <Clock size={32} />
                                </div>

                                <h2 style={{ fontSize: '22px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', marginBottom: '8px' }}>
                                    {isEn
                                        ? 'Your Request is Under Review by Platform Administration'
                                        : 'طلبك قيد المراجعة والتفعيل لدى صاحب المنصة'}
                                </h2>
                                <p style={{ color: isLight ? '#475569' : '#9CA3AF', fontSize: '14px', maxWidth: '600px', margin: '0 auto 20px', lineHeight: '1.7' }}>
                                    {isEn
                                        ? 'Your B2B API access request was received successfully. The platform administrator will review your account and activate it shortly so you can generate tokens and integration keys.'
                                        : 'تم استلام طلب تفعيل الربط البرمجي (B2B API) بنجاح. سيقوم صاحب المنصة بمراجعة حسابك وتفعيله لتتمكن من إنشاء التوكنات ومفاتيح الربط فوراً.'}
                                </p>

                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: isLight ? 'rgba(212, 165, 55, 0.1)' : 'rgba(212, 165, 55, 0.1)',
                                    border: isLight ? '1px solid rgba(212, 165, 55, 0.4)' : '1px solid rgba(212, 165, 55, 0.3)',
                                    borderRadius: '12px',
                                    padding: '8px 18px',
                                    color: isLight ? '#B45309' : '#D4A537',
                                    fontSize: '13px',
                                    fontWeight: '700',
                                    marginBottom: '24px'
                                }}>
                                    <span>{isEn ? 'Status: Awaiting Admin Approval' : 'الحالة: بانتظار موافقة الإدارة'}</span>
                                    {requestedAt && <span style={{ opacity: 0.8 }}>({new Date(requestedAt).toLocaleDateString(isEn ? 'en-US' : 'ar-EG')})</span>}
                                </div>

                                <div>
                                    <a
                                        href={isEn
                                            ? "https://wa.me/201025515743?text=Hello,%20I%20would%20like%20to%20activate%20B2B%20API%20integration%20for%20my%20account"
                                            : "https://wa.me/201025515743?text=مرحبا،%20أرغب%20في%20تفعيل%20الربط%20البرمجي%20B2B%20API%20لحسابي"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            background: '#25D366',
                                            color: '#000000',
                                            padding: '12px 24px',
                                            borderRadius: '12px',
                                            fontWeight: '800',
                                            fontSize: '14px',
                                            textDecoration: 'none',
                                            boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
                                            transition: 'transform 0.2s',
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        <MessageCircle size={18} />
                                        <span>{isEn ? 'Contact Platform Owner for Instant WhatsApp Activation' : 'تواصل مع صاحب المنصة للتفعيل الفوري عبر واتساب'}</span>
                                    </a>
                                </div>
                            </div>
                        ) : (
                            /* Inactive / Request Form */
                            <div style={{
                                background: isLight ? '#FFFFFF' : 'linear-gradient(135deg, rgba(26, 26, 36, 0.95) 0%, rgba(18, 18, 24, 0.98) 100%)',
                                border: isLight ? '1.5px solid rgba(212, 165, 55, 0.45)' : '1px solid rgba(212, 165, 55, 0.3)',
                                borderRadius: '20px',
                                padding: 'clamp(20px, 4vw, 36px)',
                                boxShadow: isLight ? '0 10px 30px rgba(30, 80, 140, 0.08)' : '0 10px 40px rgba(0,0,0,0.5)',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '14px',
                                        background: isLight ? 'rgba(212, 165, 55, 0.12)' : 'rgba(212, 165, 55, 0.15)',
                                        color: isLight ? '#B45309' : '#D4A537',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Lock size={24} />
                                    </div>
                                    <div>
                                        <h2 style={{ fontSize: '20px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF', margin: 0 }}>
                                            {isEn ? 'B2B API Activation for Resellers' : 'تفعيل الربط البرمجي للموزعين (B2B API Activation)'}
                                        </h2>
                                        <p style={{ color: isLight ? '#475569' : '#9CA3AF', fontSize: '13px', margin: '4px 0 0' }}>
                                            {isEn
                                                ? 'API integration service requires account activation by the platform owner'
                                                : 'خدمة الربط البرمجي تتطلب تفعيل الحساب من قِبل صاحب المنصة'}
                                        </p>
                                    </div>
                                </div>

                                <div style={{
                                    background: isLight ? '#FEFCE8' : 'rgba(212, 165, 55, 0.06)',
                                    border: isLight ? '1px solid rgba(212, 165, 55, 0.4)' : '1px solid rgba(212, 165, 55, 0.2)',
                                    borderRadius: '14px',
                                    padding: '16px',
                                    marginBottom: '24px',
                                    fontSize: '13.5px',
                                    color: isLight ? '#334155' : '#CBD5E1',
                                    lineHeight: '1.7',
                                }}>
                                    <strong style={{ color: isLight ? '#B45309' : '#D4A537' }}>
                                        {isEn ? 'B2B API Integration Features:' : 'مميزات الربط البرمجي B2B:'}
                                    </strong>
                                    <ul style={{ margin: '8px 0 0', paddingRight: isRtl ? '20px' : '0', paddingLeft: isRtl ? '0' : '20px' }}>
                                        <li>{isEn ? 'Instant automated execution of top-up orders and digital voucher retrieval via REST API.' : 'تنفيذ طلبات الشحن وسحب البطاقات الرقمية لحظياً عبر الـ API.'}</li>
                                        <li>{isEn ? 'Wholesale reseller pricing and custom profit margins configured for your account.' : 'أسعار وهوامش ربح مخصصة للموزعين وحسابات الـ API.'}</li>
                                        <li>{isEn ? 'Real-time webhook notifications for order status and PIN code updates directly in your system.' : 'إشعارات لحظية (Webhooks) لتحديث حالة الطلبات والأكواد في نظامك مباشرة.'}</li>
                                    </ul>
                                </div>

                                <form onSubmit={handleRequestAccess} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '13px', color: isLight ? '#0F172A' : '#D1D5DB', marginBottom: '6px', fontWeight: '700' }}>
                                                {isEn ? 'Store / App / Business Name:' : 'اسم المتجر / التطبيق / النشاط التجاري:'}
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={businessName}
                                                onChange={(e) => setBusinessName(e.target.value)}
                                                placeholder={isEn ? 'e.g. Digital Cards Store' : 'مثال: متجر الكروت الرقمية'}
                                                style={{
                                                    width: '100%',
                                                    boxSizing: 'border-box',
                                                    background: isLight ? '#F8FAFC' : '#1F2937',
                                                    border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255,255,255,0.12)',
                                                    borderRadius: '10px',
                                                    padding: '12px 14px',
                                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                                    fontSize: '14px',
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <label style={{ display: 'block', fontSize: '13px', color: isLight ? '#0F172A' : '#D1D5DB', marginBottom: '6px', fontWeight: '700' }}>
                                                {isEn ? 'Website / Store URL (optional):' : 'رابط الموقع / المتجر الإلكتروني (إن وجد):'}
                                            </label>
                                            <input
                                                type="url"
                                                value={websiteUrl}
                                                onChange={(e) => setWebsiteUrl(e.target.value)}
                                                placeholder="https://yourstore.com"
                                                style={{
                                                    width: '100%',
                                                    boxSizing: 'border-box',
                                                    background: isLight ? '#F8FAFC' : '#1F2937',
                                                    border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255,255,255,0.12)',
                                                    borderRadius: '10px',
                                                    padding: '12px 14px',
                                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                                    fontSize: '14px',
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '13px', color: isLight ? '#0F172A' : '#D1D5DB', marginBottom: '6px', fontWeight: '700' }}>
                                            {isEn ? 'Additional Notes or Estimated Sales Volume:' : 'ملاحظات إضافية أو حجم المبيعات المتوقع:'}
                                        </label>
                                        <textarea
                                            rows="3"
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            placeholder={isEn ? 'Enter any additional details or estimated monthly turnover...' : 'اكتب أي معلومات إضافية تود إبلاغ صاحب المنصة بها...'}
                                            style={{
                                                width: '100%',
                                                boxSizing: 'border-box',
                                                background: isLight ? '#F8FAFC' : '#1F2937',
                                                border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255,255,255,0.12)',
                                                borderRadius: '10px',
                                                padding: '12px 14px',
                                                color: isLight ? '#0F172A' : '#FFFFFF',
                                                fontSize: '14px',
                                                resize: 'vertical',
                                            }}
                                        />
                                    </div>

                                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px', width: '100%' }}>
                                        <button
                                            type="submit"
                                            disabled={requesting}
                                            style={{
                                                flex: '1 1 200px',
                                                minWidth: 'min(100%, 200px)',
                                                padding: '14px 20px',
                                                borderRadius: '12px',
                                                border: 'none',
                                                background: 'linear-gradient(135deg, #D4A537, #B38622)',
                                                color: '#0D0D0F',
                                                fontWeight: '900',
                                                fontSize: '15px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                opacity: requesting ? 0.7 : 1,
                                                boxShadow: '0 4px 15px rgba(212, 165, 55, 0.3)',
                                            }}
                                        >
                                            <Send size={18} />
                                            <span>{requesting ? (isEn ? 'Submitting...' : 'جاري إرسال الطلب...') : (isEn ? 'Submit API Access Request' : 'إرسال طلب تفعيل الربط البرمجي')}</span>
                                        </button>

                                        <a
                                            href={isEn
                                                ? "https://wa.me/201025515743?text=Hello,%20I%20would%20like%20to%20activate%20B2B%20API%20integration%20for%20my%20account"
                                                : "https://wa.me/201025515743?text=مرحبا،%20أرغب%20في%20تفعيل%20الربط%20البرمجي%20B2B%20API%20لحسابي"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                flex: '1 1 180px',
                                                padding: '14px 20px',
                                                borderRadius: '12px',
                                                background: '#25D366',
                                                color: '#000000',
                                                fontWeight: '800',
                                                fontSize: '14px',
                                                textDecoration: 'none',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                boxShadow: '0 4px 15px rgba(37, 211, 102, 0.25)',
                                            }}
                                        >
                                            <MessageCircle size={18} />
                                            <span>{isEn ? 'Activate via WhatsApp' : 'تفعيل عبر واتساب'}</span>
                                        </a>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Active API Client: Show Key Generation & Settings */
                    <div className="developer-api-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '20px' }}>

                        {/* Card 1: API Key & Secret */}
                        <div
                            className="card-one"
                            style={{
                                background: isLight ? '#FFFFFF' : '#111827',
                                border: isLight ? '1.5px solid rgba(212, 165, 55, 0.4)' : '1px solid rgba(212, 165, 55, 0.25)',
                                borderRadius: '16px',
                                padding: 'clamp(16px, 3.5vw, 24px)',
                                boxShadow: isLight ? '0 10px 30px rgba(30, 80, 140, 0.08)' : '0 8px 30px rgba(0, 0, 0, 0.4)'
                            }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                                <span style={{ fontSize: '20px' }}>🛡️</span>
                                <h2 style={{ fontSize: '18px', fontWeight: '800', color: isLight ? '#0F172A' : '#f3f4f6', margin: 0 }}>
                                    {isEn ? 'API Credentials' : 'بيانات التوثيق (API Credentials)'}
                                </h2>
                            </div>
                            <p style={{ fontSize: '13px', color: isLight ? '#475569' : '#9ca3af', marginBottom: '20px', lineHeight: '1.6' }}>
                                {isEn
                                    ? <>Send these values in the HTTP headers of every request as <code style={{ color: isLight ? '#B45309' : '#D4A537', fontWeight: '700' }}>X-API-Key</code> and <code style={{ color: isLight ? '#B45309' : '#D4A537', fontWeight: '700' }}>X-API-Secret</code>.</>
                                    : <>يتم إرسال هذه القيم في ترويسة كل طلب (Headers) كـ <code style={{ color: '#D4A537' }}>X-API-Key</code> و <code style={{ color: '#D4A537' }}>X-API-Secret</code>.</>}
                            </p>

                            {/* API Key Box */}
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '13px', color: isLight ? '#0F172A' : '#d1d5db', marginBottom: '6px', fontWeight: '700' }}>
                                    {isEn ? 'API Token (X-API-Key):' : 'توكن الربط البرمجي (X-API-Key):'}
                                </label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input
                                        type="text"
                                        readOnly
                                        value={apiKey || (isEn ? 'No token generated yet' : 'لم يتم إنشاء توكن بعد')}
                                        style={{
                                            flex: 1,
                                            background: isLight ? '#F8FAFC' : '#1f2937',
                                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '8px',
                                            padding: '10px 14px',
                                            color: apiKey ? (isLight ? '#B45309' : '#D4A537') : '#94a3b8',
                                            fontFamily: 'monospace',
                                            fontSize: '13px',
                                            fontWeight: '700',
                                        }}
                                    />
                                    {apiKey && (
                                        <button
                                            type="button"
                                            onClick={() => copyToClipboard(apiKey, isEn ? 'API Token' : 'توكن الـ API')}
                                            style={{
                                                background: isLight ? '#E2E8F0' : '#374151',
                                                border: 'none',
                                                borderRadius: '8px',
                                                padding: '0 16px',
                                                color: isLight ? '#0F172A' : '#fff',
                                                cursor: 'pointer',
                                                fontSize: '13px',
                                                fontWeight: '800',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px'
                                            }}
                                        >
                                            <span>📋</span>
                                            <span>{isEn ? 'Copy Token' : 'نسخ التوكن'}</span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* API Secret Box */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontSize: '13px', color: isLight ? '#0F172A' : '#d1d5db', marginBottom: '6px', fontWeight: '700' }}>
                                    {isEn ? 'API Secret (X-API-Secret):' : 'المفتاح السري (X-API-Secret):'}
                                </label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input
                                        type="text"
                                        readOnly
                                        value={apiSecret || (hasSecret ? '••••••••••••••••••••••••••••••••' : (isEn ? 'Not generated' : 'غير متوفر'))}
                                        style={{
                                            flex: 1,
                                            background: isLight ? '#F8FAFC' : '#1f2937',
                                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '8px',
                                            padding: '10px 14px',
                                            color: apiSecret ? '#059669' : '#94a3b8',
                                            fontFamily: 'monospace',
                                            fontSize: '13px',
                                            fontWeight: '700',
                                        }}
                                    />
                                    {apiSecret && (
                                        <button
                                            type="button"
                                            onClick={() => copyToClipboard(apiSecret, 'API Secret')}
                                            style={{
                                                background: '#059669',
                                                border: 'none',
                                                borderRadius: '8px',
                                                padding: '0 16px',
                                                color: '#fff',
                                                cursor: 'pointer',
                                                fontSize: '13px',
                                                fontWeight: '800'
                                            }}
                                        >
                                            {isEn ? 'Copy' : 'نسخ'}
                                        </button>
                                    )}
                                </div>
                                {apiSecret && (
                                    <p style={{ fontSize: '12px', color: isLight ? '#D97706' : '#fbbf24', marginTop: '6px', fontWeight: '600' }}>
                                        {isEn
                                            ? '⚠️ Please copy your API Secret now. It will not be shown again for security reasons.'
                                            : '⚠️ يرجى نسخ الـ Secret الآن، فلن يظهر لك مرة أخرى لدواعي الأمان.'}
                                    </p>
                                )}
                            </div>

                            {/* Action Buttons: Regenerate & Copy Full Documentation */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <button
                                    type="button"
                                    onClick={handleGenerateKeys}
                                    disabled={generating}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '10px',
                                        border: 'none',
                                        background: 'linear-gradient(135deg, #D4A537, #B38622)',
                                        color: '#000',
                                        fontWeight: '800',
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                        transition: 'opacity 0.2s',
                                        opacity: generating ? 0.7 : 1,
                                        boxShadow: '0 4px 15px rgba(212, 165, 55, 0.25)',
                                    }}
                                >
                                    {generating
                                        ? (isEn ? 'Generating...' : 'جاري الإنشاء...')
                                        : (apiKey
                                            ? (isEn ? '🔄 Regenerate API Token & Keys' : '🔄 إعادة توليد التوكن والمفاتيح (Regenerate)')
                                            : (isEn ? '⚡ Generate API Token & Keys' : '⚡ توليد توكن ومفاتيح جديدة (Generate Token)'))}
                                </button>

                                <button
                                    type="button"
                                    onClick={copyFullDocumentation}
                                    style={{
                                        width: '100%',
                                        padding: '11px',
                                        borderRadius: '10px',
                                        border: isLight ? '1px solid #0284C7' : '1px solid rgba(56, 189, 248, 0.4)',
                                        background: copiedFullDocs
                                            ? 'rgba(34, 197, 94, 0.2)'
                                            : (isLight ? 'rgba(2, 132, 199, 0.08)' : 'rgba(56, 189, 248, 0.12)'),
                                        color: copiedFullDocs ? '#22C55E' : (isLight ? '#0284C7' : '#38BDF8'),
                                        fontWeight: '800',
                                        fontSize: '13px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    <span>{copiedFullDocs ? '✓' : '📄'}</span>
                                    <span>{copiedFullDocs
                                        ? (isEn ? 'Full Documentation Copied!' : 'تم نسخ دليل الربط بالكامل!')
                                        : (isEn ? 'Copy Complete B2B Documentation (Docs)' : 'نسخ دليل التوثيق والربط بالكامل (Copy Full Docs)')}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Card 2: Allowed IPs & Webhooks */}
                        <div
                            className="card-two"
                            style={{
                                background: isLight ? '#FFFFFF' : '#111827',
                                border: isLight ? '1.5px solid rgba(212, 165, 55, 0.4)' : '1px solid rgba(212, 165, 55, 0.25)',
                                borderRadius: '16px',
                                padding: 'clamp(16px, 3.5vw, 24px)',
                                boxShadow: isLight ? '0 10px 30px rgba(30, 80, 140, 0.08)' : '0 8px 30px rgba(0, 0, 0, 0.4)'
                            }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                                <span style={{ fontSize: '20px' }}>🔒</span>
                                <h2 style={{ fontSize: '18px', fontWeight: '800', color: isLight ? '#0F172A' : '#f3f4f6', margin: 0 }}>
                                    {isEn ? 'Security & Webhook Notifications' : 'الأمان والإشعارات اللحظية'}
                                </h2>
                            </div>

                            <form onSubmit={handleSaveSettings}>
                                {/* IP Whitelist */}
                                <div style={{ marginBottom: '18px' }}>
                                    <label style={{ display: 'block', fontSize: '13px', color: isLight ? '#0F172A' : '#d1d5db', marginBottom: '6px', fontWeight: '700' }}>
                                        {isEn ? 'Allowed Source IPs (IP Whitelist):' : 'عناوين IP المسموح بها (Allowed Source IPs):'}
                                    </label>
                                    <textarea
                                        rows="3"
                                        value={ipWhitelist}
                                        onChange={(e) => setIpWhitelist(e.target.value)}
                                        placeholder={isEn
                                            ? 'One IP per line (leave empty to allow all IPs during development)'
                                            : 'اكتب كل عنوان IP في سطر منفصل (اتركه فارغاً للسماح لجميع الـ IPs أثناء التطوير)'}
                                        style={{
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            background: isLight ? '#F8FAFC' : '#1f2937',
                                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '8px',
                                            padding: '10px 14px',
                                            color: isLight ? '#0F172A' : '#e5e7eb',
                                            fontFamily: 'monospace',
                                            fontSize: '13px',
                                            resize: 'vertical'
                                        }}
                                    />
                                    <span style={{ fontSize: '12px', color: isLight ? '#64748B' : '#9ca3af', display: 'block', marginTop: '4px' }}>
                                        {isEn ? 'Leave empty to allow API calls from any server.' : 'اترك الحقل فارغاً للسماح بالاتصال من أي سيرفر.'}
                                    </span>
                                </div>

                                {/* Webhook URL */}
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', fontSize: '13px', color: isLight ? '#0F172A' : '#d1d5db', marginBottom: '6px', fontWeight: '700' }}>
                                        {isEn ? 'Webhook Callback URL:' : 'رابط الاستقبال اللحظي (Webhook Callback URL):'}
                                    </label>
                                    <input
                                        className="Webhook-input"
                                        type="url"
                                        value={webhookUrl}
                                        onChange={(e) => setWebhookUrl(e.target.value)}
                                        placeholder="https://yourdomain.com/api/webhooks/emperor"
                                        style={{
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            background: isLight ? '#F8FAFC' : '#1f2937',
                                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '8px',
                                            padding: '10px 14px',
                                            color: isLight ? '#0F172A' : '#e5e7eb',
                                            fontFamily: 'monospace',
                                            fontSize: '13px'
                                        }}
                                    />
                                    <span style={{ fontSize: '12px', color: isLight ? '#64748B' : '#9ca3af', display: 'block', marginTop: '4px' }}>
                                        {isEn
                                            ? 'We will send real-time order status updates and PIN codes to this endpoint upon completion.'
                                            : 'سنرسل لك تحديثات حالة الطلبات والأكواد فور اكتمالها على هذا الرابط.'}
                                    </span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '10px',
                                        border: 'none',
                                        background: isLight ? 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)' : '#374151',
                                        color: isLight ? '#0A0A0E' : '#fff',
                                        fontWeight: '800',
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        opacity: saving ? 0.7 : 1,
                                        boxShadow: isLight ? '0 4px 14px rgba(212, 165, 55, 0.25)' : 'none',
                                    }}
                                >
                                    {saving ? (isEn ? 'Saving...' : 'جاري الحفظ...') : (isEn ? '💾 Save Settings' : '💾 حفظ الإعدادات')}
                                </button>
                            </form>
                        </div>

                    </div>
                )
            ) : (
                /* Tab 2: Interactive B2B Reseller API Documentation */
                <div className="developer-api-docs" style={{
                    background: isLight ? '#FFFFFF' : '#0B1322',
                    border: isLight ? '1.5px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: '20px',
                    padding: 'clamp(16px, 3.5vw, 32px)',
                    boxShadow: isLight ? '0 10px 30px rgba(30, 80, 140, 0.08)' : '0 10px 35px rgba(0, 0, 0, 0.6), 0 0 20px rgba(56, 189, 248, 0.1)'
                }}>
                    {/* Top Action Bar: Title + Single Click Copy Entire Documentation */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '14px',
                        marginBottom: '24px',
                        paddingBottom: '18px',
                        borderBottom: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                    }}>
                        <div>
                            <h2 style={{
                                fontSize: '22px',
                                fontWeight: '900',
                                color: isLight ? '#0369A1' : '#38BDF8',
                                margin: '0 0 6px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}>
                                <Terminal size={22} color="#38BDF8" />
                                <span>{isEn ? 'B2B Reseller API Documentation' : 'توثيق الربط البرمجي للموزعين (B2B API)'}</span>
                            </h2>
                            <p style={{ margin: 0, fontSize: '13px', color: isLight ? '#64748B' : '#94A3B8' }}>
                                {isEn ? 'Standard and unified integration guide for distributors and external stores.' : 'دليل موحد وشامل لربط المتاجر والموزعين بنقاط الـ API وتنفيذ العمليات آلياً.'}
                            </p>
                        </div>

                        {/* Copy Entire Documentation Button */}
                        <button
                            type="button"
                            onClick={copyFullDocumentation}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 20px',
                                borderRadius: '12px',
                                background: copiedFullDocs
                                    ? 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)'
                                    : 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                color: copiedFullDocs ? '#FFFFFF' : '#08080A',
                                border: 'none',
                                fontSize: '13.5px',
                                fontWeight: '900',
                                cursor: 'pointer',
                                boxShadow: '0 4px 16px rgba(245, 208, 97, 0.35)',
                                transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 6px 22px rgba(245, 208, 97, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 16px rgba(245, 208, 97, 0.35)';
                            }}
                        >
                            {copiedFullDocs ? <Check size={16} /> : <Copy size={16} />}
                            <span>{copiedFullDocs ? (isEn ? 'Full Docs Copied!' : '✓ تم نسخ الدوك كاملاً!') : (isEn ? 'Copy Full Documentation' : '📋 نسخ التوثيق بالكامل')}</span>
                        </button>
                    </div>

                    {/* Section 1: Base URLs */}
                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '800', color: isLight ? '#0F172A' : '#F8FAFC', marginBottom: '8px' }}>
                            1) {isEn ? 'Base URLs' : 'الرابط الأساسي (Base URL)'}
                        </h3>
                        <p style={{ fontSize: '13.5px', color: isLight ? '#475569' : '#94A3B8', marginBottom: '10px' }}>
                            {isEn ? 'All requests must be prefixed with the API Base URL:' : 'يجب أن تبدأ جميع نقاط الاتصال بالرابط الأساسي التالي:'}
                        </p>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            background: isLight ? '#F1F5F9' : '#040914',
                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(56, 189, 248, 0.25)',
                            borderRadius: '10px',
                            padding: '10px 14px',
                            gap: '10px',
                        }}>
                            <code style={{ fontSize: '13px', fontWeight: '700', color: isLight ? '#0F172A' : '#38BDF8', direction: 'ltr' }}>
                                {window.location.origin}/api/v1/reseller
                            </code>
                            <button
                                type="button"
                                onClick={() => copyToClipboard(`${window.location.origin}/api/v1/reseller`, 'Base URL')}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#64748B',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '2px',
                                }}
                                title="نسخ"
                            >
                                <Copy size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Section 2: Authentication */}
                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '800', color: isLight ? '#0F172A' : '#F8FAFC', marginBottom: '8px' }}>
                            2) {isEn ? 'Authentication' : 'المصادقة وتمرير التوكن'}
                        </h3>
                        <p style={{ fontSize: '13.5px', color: isLight ? '#475569' : '#94A3B8', marginBottom: '10px' }}>
                            {isEn ? 'Pass your API Token in HTTP Headers with every request:' : 'يجب إرسال التوكن الخاص بك في ترويسات الطلب (Headers) مع كل استدعاء:'}
                        </p>
                        <pre style={{
                            background: isLight ? '#F1F5F9' : '#040914',
                            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(56, 189, 248, 0.25)',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            fontSize: '13px',
                            color: isLight ? '#0F172A' : '#38BDF8',
                            direction: 'ltr',
                            textAlign: 'left',
                            fontWeight: '700',
                            margin: 0,
                        }}>
                            {`x-api-key: ${apiKey || 'YOUR_TOKEN'}`}
                        </pre>
                    </div>

                    {/* Section 3: Profile & Balance */}
                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '800', color: isLight ? '#0F172A' : '#F8FAFC', marginBottom: '8px' }}>
                            3) {isEn ? 'Profile & Balance' : 'الرصيد والحساب'}
                        </h3>
                        <div style={{ background: isLight ? '#F8FAFC' : '#071224', border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '12px', padding: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                                <span style={{ background: '#0284c7', color: '#fff', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '800' }}>GET</span>
                                <code style={{ fontSize: '14px', fontWeight: '800', color: isLight ? '#0F172A' : '#F8FAFC' }}>/balance</code>
                            </div>
                            <pre style={{ background: isLight ? '#F1F5F9' : '#030712', border: isLight ? '1px solid #CBD5E1' : 'none', padding: '12px', borderRadius: '8px', fontSize: '12.5px', color: isLight ? '#0F172A' : '#38BDF8', direction: 'ltr', textAlign: 'left', overflowX: 'auto', marginBottom: '10px' }}>
                                {`curl -X GET "${window.location.origin}/api/v1/reseller/balance" \\
  -H "x-api-key: ${apiKey || 'YOUR_TOKEN'}"`}
                            </pre>
                            <p style={{ fontSize: '12px', fontWeight: '700', color: '#94A3B8', margin: '0 0 6px' }}>Success Response (200 OK):</p>
                            <pre style={{ background: isLight ? '#F1F5F9' : '#030712', padding: '12px', borderRadius: '8px', fontSize: '12px', color: '#22C55E', direction: 'ltr', textAlign: 'left', overflowX: 'auto', margin: 0 }}>
{`{
  "success": true,
  "data": {
    "email": "${user?.email || 'reseller@example.com'}",
    "balance": 245.75,
    "walletBalance": 245.75,
    "creditLimit": 0,
    "creditUsed": 0,
    "currency": "USD"
  }
}`}
                            </pre>
                        </div>
                    </div>

                    {/* Section 4: Products */}
                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '800', color: isLight ? '#0F172A' : '#F8FAFC', marginBottom: '8px' }}>
                            4) {isEn ? 'Products Catalog' : 'قائمة المنتجات والحقول الديناميكية'}
                        </h3>
                        <div style={{ background: isLight ? '#F8FAFC' : '#071224', border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '12px', padding: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                                <span style={{ background: '#0284c7', color: '#fff', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '800' }}>GET</span>
                                <code style={{ fontSize: '14px', fontWeight: '800', color: isLight ? '#0F172A' : '#F8FAFC' }}>/products</code>
                            </div>
                            <pre style={{ background: isLight ? '#F1F5F9' : '#030712', border: isLight ? '1px solid #CBD5E1' : 'none', padding: '12px', borderRadius: '8px', fontSize: '12.5px', color: isLight ? '#0F172A' : '#38BDF8', direction: 'ltr', textAlign: 'left', overflowX: 'auto', marginBottom: '10px' }}>
                                {`curl -X GET "${window.location.origin}/api/v1/reseller/products" \\
  -H "x-api-key: ${apiKey || 'YOUR_TOKEN'}"`}
                            </pre>
                            <p style={{ fontSize: '12px', fontWeight: '700', color: '#94A3B8', margin: '0 0 6px' }}>Success Response (200 OK):</p>
                            <pre style={{ background: isLight ? '#F1F5F9' : '#030712', padding: '12px', borderRadius: '8px', fontSize: '12px', color: '#22C55E', direction: 'ltr', textAlign: 'left', overflowX: 'auto', margin: 0 }}>
{`{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "PUBG Mobile UC 60",
      "price": 1.5,
      "minQty": 1,
      "maxQty": 50,
      "currency": "USD",
      "fields": [
        { "key": "playerId", "label": "Player ID", "required": true, "type": "text" }
      ]
    }
  ]
}`}
                            </pre>
                        </div>
                    </div>

                    {/* Section 5: Place Order */}
                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '800', color: isLight ? '#0F172A' : '#F8FAFC', marginBottom: '8px' }}>
                            5) {isEn ? 'Place Order' : 'إنشاء وتنفيذ طلب جديد'}
                        </h3>
                        <div style={{ background: isLight ? '#F8FAFC' : '#071224', border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '12px', padding: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                                <span style={{ background: '#16a34a', color: '#fff', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '800' }}>POST</span>
                                <code style={{ fontSize: '14px', fontWeight: '800', color: isLight ? '#0F172A' : '#F8FAFC' }}>/orders</code>
                            </div>
                            <pre style={{ background: isLight ? '#F1F5F9' : '#030712', border: isLight ? '1px solid #CBD5E1' : 'none', padding: '12px', borderRadius: '8px', fontSize: '12.5px', color: isLight ? '#0F172A' : '#4ADE80', direction: 'ltr', textAlign: 'left', overflowX: 'auto', marginBottom: '10px' }}>
                                {`curl -X POST "${window.location.origin}/api/v1/reseller/orders" \\
  -H "x-api-key: ${apiKey || 'YOUR_TOKEN'}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "productId": "1",
    "quantity": 1,
    "idempotencyKey": "a9b8c7d6-e5f4-3210-fedc-ba9876543210",
    "playerId": "512345678"
  }'`}
                            </pre>
                            <p style={{ fontSize: '12px', fontWeight: '700', color: '#94A3B8', margin: '0 0 6px' }}>Success Response (200 OK):</p>
                            <pre style={{ background: isLight ? '#F1F5F9' : '#030712', padding: '12px', borderRadius: '8px', fontSize: '12px', color: '#22C55E', direction: 'ltr', textAlign: 'left', overflowX: 'auto', margin: 0 }}>
{`{
  "success": true,
  "data": {
    "orderId": "66a88f8c4b40f4a9f0d41010",
    "orderNumber": "ORD-12345",
    "status": "PENDING",
    "idempotencyKey": "a9b8c7d6-e5f4-3210-fedc-ba9876543210"
  }
}`}
                            </pre>
                        </div>
                    </div>

                    {/* Section 6: Check Orders (Batch Support) */}
                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '800', color: isLight ? '#0F172A' : '#F8FAFC', marginBottom: '8px' }}>
                            6) {isEn ? 'Check Orders (Batch Support)' : 'الاستعلام عن حالة الطلبات (دعم الفحص الجماعي)'}
                        </h3>
                        <div style={{ background: isLight ? '#F8FAFC' : '#071224', border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '12px', padding: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                                <span style={{ background: '#0284c7', color: '#fff', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '800' }}>GET</span>
                                <code style={{ fontSize: '14px', fontWeight: '800', color: isLight ? '#0F172A' : '#F8FAFC' }}>/orders?keys=uuid1,uuid2</code>
                            </div>
                            <pre style={{ background: isLight ? '#F1F5F9' : '#030712', border: isLight ? '1px solid #CBD5E1' : 'none', padding: '12px', borderRadius: '8px', fontSize: '12.5px', color: isLight ? '#0F172A' : '#38BDF8', direction: 'ltr', textAlign: 'left', overflowX: 'auto', marginBottom: '10px' }}>
                                {`curl -X GET "${window.location.origin}/api/v1/reseller/orders?keys=uuid1,uuid2" \\
  -H "x-api-key: ${apiKey || 'YOUR_TOKEN'}"`}
                            </pre>
                            <p style={{ fontSize: '12px', fontWeight: '700', color: '#94A3B8', margin: '0 0 6px' }}>Success Response (200 OK):</p>
                            <pre style={{ background: isLight ? '#F1F5F9' : '#030712', padding: '12px', borderRadius: '8px', fontSize: '12px', color: '#22C55E', direction: 'ltr', textAlign: 'left', overflowX: 'auto', margin: 0 }}>
{`{
  "success": true,
  "data": [
    {
      "orderId": "66a88f8c4b40f4a9f0d41010",
      "status": "COMPLETED",
      "idempotencyKey": "uuid1"
    }
  ]
}`}
                            </pre>
                        </div>
                    </div>

                    {/* Section 7: Error Codes */}
                    <div>
                        <h3 style={{ fontSize: '16px', fontWeight: '800', color: isLight ? '#0F172A' : '#F8FAFC', marginBottom: '8px' }}>
                            7) {isEn ? 'Error Handling & Standard Codes' : 'الأخطاء وأكواد الاستجابة القياسية'}
                        </h3>
                        <div style={{ background: isLight ? '#F8FAFC' : '#071224', border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '12px', padding: '16px' }}>
                            <p style={{ fontSize: '12px', fontWeight: '700', color: '#EF4444', margin: '0 0 8px' }}>Standard Failure Response Format:</p>
                            <pre style={{ background: isLight ? '#F1F5F9' : '#030712', padding: '12px', borderRadius: '8px', fontSize: '12px', color: '#F87171', direction: 'ltr', textAlign: 'left', overflowX: 'auto', marginBottom: '14px' }}>
{`{
  "success": false,
  "error": { "code": 100, "message": "Insufficient balance" }
}`}
                            </pre>

                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px', textAlign: 'right' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#38BDF8' }}>
                                            <th style={{ padding: '8px 10px' }}>كود الخطأ (Code)</th>
                                            <th style={{ padding: '8px 10px' }}>الرسالة القياسية</th>
                                            <th style={{ padding: '8px 10px' }}>الوصف والسبب</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ color: isLight ? '#334155' : '#CBD5E1' }}>
                                        <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                            <td style={{ padding: '8px 10px', fontWeight: '800', color: '#EF4444' }}>100</td>
                                            <td style={{ padding: '8px 10px', direction: 'ltr', textAlign: 'left' }}>Insufficient balance</td>
                                            <td style={{ padding: '8px 10px' }}>رصيد المحفظة غير كافٍ لتنفيذ العملية</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                            <td style={{ padding: '8px 10px', fontWeight: '800', color: '#EF4444' }}>101</td>
                                            <td style={{ padding: '8px 10px', direction: 'ltr', textAlign: 'left' }}>Product unavailable/inactive</td>
                                            <td style={{ padding: '8px 10px' }}>المنتج المطلوب غير متاح أو متوقف مؤقتاً</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                            <td style={{ padding: '8px 10px', fontWeight: '800', color: '#EF4444' }}>102</td>
                                            <td style={{ padding: '8px 10px', direction: 'ltr', textAlign: 'left' }}>Quantity out of range</td>
                                            <td style={{ padding: '8px 10px' }}>الكمية المطلوبة خارج الحدود المسموح بها</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                            <td style={{ padding: '8px 10px', fontWeight: '800', color: '#F59E0B' }}>120</td>
                                            <td style={{ padding: '8px 10px', direction: 'ltr', textAlign: 'left' }}>API Key missing</td>
                                            <td style={{ padding: '8px 10px' }}>لم يتم إرسال ترويسة x-api-key في الطلب</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                            <td style={{ padding: '8px 10px', fontWeight: '800', color: '#F59E0B' }}>121</td>
                                            <td style={{ padding: '8px 10px', direction: 'ltr', textAlign: 'left' }}>Invalid API Key</td>
                                            <td style={{ padding: '8px 10px' }}>مفتاح الـ API غير صالح أو تم إبطاله</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                            <td style={{ padding: '8px 10px', fontWeight: '800', color: '#F59E0B' }}>122</td>
                                            <td style={{ padding: '8px 10px', direction: 'ltr', textAlign: 'left' }}>API not allowed / Suspended</td>
                                            <td style={{ padding: '8px 10px' }}>صلاحية الربط معلقة أو غير مفعلة للحساب</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                            <td style={{ padding: '8px 10px', fontWeight: '800', color: '#38BDF8' }}>123</td>
                                            <td style={{ padding: '8px 10px', direction: 'ltr', textAlign: 'left' }}>Validation Error</td>
                                            <td style={{ padding: '8px 10px' }}>نقص في الحقول المطلوبة (مثل معرّف اللاعب)</td>
                                        </tr>
                                        <tr>
                                            <td style={{ padding: '8px 10px', fontWeight: '800', color: '#94A3B8' }}>500</td>
                                            <td style={{ padding: '8px 10px', direction: 'ltr', textAlign: 'left' }}>Internal Server Error</td>
                                            <td style={{ padding: '8px 10px' }}>خطأ داخلي أثناء معالجة الطلب في الخادم</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </MainLayout>
    );
}

