import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { developerApi } from '../api/endpoints';
import "../../css/developerApi.css";
export default function DeveloperApiPage() {
    const { user } = useAuth();
    const { addToast } = useToast();

    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [saving, setSaving] = useState(false);

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
                setApiKey(d.api_key || '');
                setHasSecret(d.has_secret || false);
                setWebhookUrl(d.webhook_url || '');
                setIpWhitelist((d.api_ip_whitelist || []).join('\n'));
            }
        } catch (err) {
            // If new user or not yet generated
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateKeys = async () => {
        if (apiKey && !window.confirm('إعادة إنشاء المفتاح ستؤدي لتعطيل المفتاح القديم فوراً. هل أنت متأكد؟')) {
            return;
        }

        setGenerating(true);
        try {
            const res = await developerApi.generateKeys();
            if (res.data?.data) {
                setApiKey(res.data.data.api_key);
                setApiSecret(res.data.data.api_secret);
                setHasSecret(true);
                addToast('تم إنشاء المفاتيح بنجاح! احفظ الـ Secret في مكان آمن.', 'success');
            }
        } catch (err) {
            addToast(err.response?.data?.message || 'حدث خطأ أثناء إنشاء المفاتيح', 'error');
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

            addToast('تم حفظ الإعدادات بنجاح', 'success');
        } catch (err) {
            addToast(err.response?.data?.message || 'حدث خطأ أثناء حفظ الإعدادات', 'error');
        } finally {
            setSaving(false);
        }
    };

    const copyToClipboard = (text, label) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        addToast(`تم نسخ ${label} إلى الحافظة`, 'success');
    };

    return (
        <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '30px 20px 80px',
            color: '#f3f4f6',
            fontFamily: 'inherit'
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '15px',
                marginBottom: '30px',
                borderBottom: '1px solid rgba(212, 165, 55, 0.2)',
                paddingBottom: '20px'
            }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '24px' }}>🔑</span>
                        <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#fff', margin: 0 }}>
                            إدارة مفاتيح الربط (B2B API Management)
                        </h1>
                    </div>
                    <p style={{ color: '#9ca3af', fontSize: '14px', marginTop: '6px' }}>
                        اربط متجرك أو نظامك الخارجي بمنصة Emperor لتنفيذ طلبات الشحن وسحب البطاقات تلقائياً
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={() => setActiveTab('keys')}
                        style={{
                            padding: '10px 18px',
                            borderRadius: '10px',
                            fontSize: '14px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            border: '1px solid',
                            borderColor: activeTab === 'keys' ? '#D4A537' : 'rgba(255,255,255,0.1)',
                            background: activeTab === 'keys' ? 'linear-gradient(135deg, #D4A537, #B38622)' : 'rgba(255,255,255,0.03)',
                            color: activeTab === 'keys' ? '#0b0f19' : '#e5e7eb',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        🔑 المفاتيح والإعدادات
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
                            borderColor: activeTab === 'docs' ? '#D4A537' : 'rgba(255,255,255,0.1)',
                            background: activeTab === 'docs' ? 'linear-gradient(135deg, #D4A537, #B38622)' : 'rgba(255,255,255,0.03)',
                            color: activeTab === 'docs' ? '#0b0f19' : '#e5e7eb',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        📖 التوثيق الفني (API Docs)
                    </button>
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '60px', color: '#D4A537' }}>
                    جاري تحميل بيانات الربط...
                </div>
            ) : activeTab === 'keys' ? (
                /* Tab 1: API Keys & IP Settings */
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>

                    {/* Card 1: API Key & Secret */}
                    <div
                        className="card-one"
                        style={{
                            background: '#111827',
                            border: '1px solid rgba(212, 165, 55, 0.25)',
                            borderRadius: '16px',
                            padding: '24px',
                            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)'
                        }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <span style={{ fontSize: '20px' }}>🛡️</span>
                            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#f3f4f6', margin: 0 }}>
                                بيانات التوثيق (API Credentials)
                            </h2>
                        </div>
                        <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '20px', lineHeight: '1.6' }}>
                            يتم إرسال هذه القيم في ترويسة كل طلب (Headers) كـ <code style={{ color: '#D4A537' }}>X-API-Key</code> و <code style={{ color: '#D4A537' }}>X-API-Secret</code>.
                        </p>

                        {/* API Key Box */}
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '13px', color: '#d1d5db', marginBottom: '6px', fontWeight: '600' }}>
                                X-API-Key:
                            </label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <input
                                    type="text"
                                    readOnly
                                    value={apiKey || 'لم يتم إنشاء مفتاح بعد'}
                                    style={{
                                        flex: 1,
                                        background: '#1f2937',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '8px',
                                        padding: '10px 14px',
                                        color: apiKey ? '#D4A537' : '#6b7280',
                                        fontFamily: 'monospace',
                                        fontSize: '13px'
                                    }}
                                />
                                {apiKey && (
                                    <button
                                        onClick={() => copyToClipboard(apiKey, 'API Key')}
                                        style={{
                                            background: '#374151',
                                            border: 'none',
                                            borderRadius: '8px',
                                            padding: '0 14px',
                                            color: '#fff',
                                            cursor: 'pointer',
                                            fontSize: '13px',
                                            fontWeight: '600'
                                        }}
                                    >
                                        نسخ
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* API Secret Box */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontSize: '13px', color: '#d1d5db', marginBottom: '6px', fontWeight: '600' }}>
                                X-API-Secret:
                            </label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <input
                                    type="text"
                                    readOnly
                                    value={apiSecret || (hasSecret ? '••••••••••••••••••••••••••••••••' : 'غير متوفر')}
                                    style={{
                                        flex: 1,
                                        background: '#1f2937',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '8px',
                                        padding: '10px 14px',
                                        color: apiSecret ? '#34d399' : '#6b7280',
                                        fontFamily: 'monospace',
                                        fontSize: '13px'
                                    }}
                                />
                                {apiSecret && (
                                    <button
                                        onClick={() => copyToClipboard(apiSecret, 'API Secret')}
                                        style={{
                                            background: '#059669',
                                            border: 'none',
                                            borderRadius: '8px',
                                            padding: '0 14px',
                                            color: '#fff',
                                            cursor: 'pointer',
                                            fontSize: '13px',
                                            fontWeight: '600'
                                        }}
                                    >
                                        نسخ
                                    </button>
                                )}
                            </div>
                            {apiSecret && (
                                <p style={{ fontSize: '12px', color: '#fbbf24', marginTop: '6px' }}>
                                    ⚠️ يرجى نسخ الـ Secret الآن، فلن يظهر لك مرة أخرى لدواعي الأمان.
                                </p>
                            )}
                        </div>

                        {/* Generate Button */}
                        <button
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
                                opacity: generating ? 0.7 : 1
                            }}
                        >
                            {generating ? 'جاري الإنشاء...' : (apiKey ? '🔄 إعادة توليد المفاتيح (Regenerate)' : '⚡ إنشاء مفاتيح جديدة (Generate API Keys)')}
                        </button>
                    </div>

                    {/* Card 2: Allowed IPs & Webhooks */}
                    <div
                        className="card-two"
                        style={{
                            background: '#111827',
                            border: '1px solid rgba(212, 165, 55, 0.25)',
                            borderRadius: '16px',
                            padding: '24px',
                            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)'
                        }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <span style={{ fontSize: '20px' }}>🔒</span>
                            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#f3f4f6', margin: 0 }}>
                                الأمان والإشعارات اللحظية
                            </h2>
                        </div>

                        <form onSubmit={handleSaveSettings}>
                            {/* IP Whitelist */}
                            <div style={{ marginBottom: '18px' }}>
                                <label style={{ display: 'block', fontSize: '13px', color: '#d1d5db', marginBottom: '6px', fontWeight: '600' }}>
                                    عناوين IP المسموح بها (Allowed Source IPs):
                                </label>
                                <textarea
                                    rows="3"
                                    value={ipWhitelist}
                                    onChange={(e) => setIpWhitelist(e.target.value)}
                                    placeholder="اكتب كل عنوان IP في سطر منفصل (اتركه فارغاً للسماح لجميع الـ IPs أثناء التطوير)"
                                    style={{
                                        width: '100%',
                                        background: '#1f2937',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '8px',
                                        padding: '10px 14px',
                                        color: '#e5e7eb',
                                        fontFamily: 'monospace',
                                        fontSize: '13px',
                                        resize: 'vertical'
                                    }}
                                />
                                <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                                    اترك الحقل فارغاً للسماح بالاتصال من أي سيرفر.
                                </span>
                            </div>

                            {/* Webhook URL */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontSize: '13px', color: '#d1d5db', marginBottom: '6px', fontWeight: '600' }}>
                                    رابط الاستقبال اللحظي (Webhook Callback URL):
                                </label>
                                <input
                                    className="Webhook-input"
                                    type="url"
                                    value={webhookUrl}
                                    onChange={(e) => setWebhookUrl(e.target.value)}
                                    placeholder="https://yourdomain.com/api/webhooks/emperor"
                                    style={{
                                        width: '100%',
                                        background: '#1f2937',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '8px',
                                        padding: '10px 14px',
                                        color: '#e5e7eb',
                                        fontFamily: 'monospace',
                                        fontSize: '13px'
                                    }}
                                />
                                <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                                    سنرسل لك تحديثات حالة الطلبات والأكواد فور اكتمالها على هذا الرابط.
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
                                    background: '#374151',
                                    color: '#fff',
                                    fontWeight: '700',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s',
                                    opacity: saving ? 0.7 : 1
                                }}
                            >
                                {saving ? 'جاري الحفظ...' : '💾 حفظ الإعدادات'}
                            </button>
                        </form>
                    </div>

                </div>
            ) : (
                /* Tab 2: Interactive API Documentation */
                <div style={{
                    background: '#111827',
                    border: '1px solid rgba(212, 165, 55, 0.25)',
                    borderRadius: '16px',
                    padding: '28px',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)'
                }}>
                    <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#D4A537', marginBottom: '10px' }}>
                        📖 دليل نقاط الاتصال (API Reference)
                    </h2>
                    <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '24px' }}>
                        الرابط الأساسي لجميع طلبات الموزعين: <code style={{ color: '#fff', background: '#1f2937', padding: '3px 8px', borderRadius: '6px' }}>{window.location.origin}/api/v1/external</code>
                    </p>

                    {/* Endpoint 1: Balance */}
                    <div style={{ background: '#1e293b', borderRadius: '12px', padding: '18px', marginBottom: '18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                            <span style={{ background: '#0284c7', color: '#fff', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '800' }}>GET</span>
                            <code style={{ fontSize: '15px', color: '#f8fafc', fontWeight: '700' }}>/balance</code>
                            <span style={{ color: '#94a3b8', fontSize: '13px' }}>- الاستعلام عن رصيد المحفظة الحالي</span>
                        </div>
                        <pre style={{ background: '#0f172a', padding: '14px', borderRadius: '8px', overflowX: 'auto', fontSize: '13px', color: '#38bdf8' }}>
                            {`curl -X GET "${window.location.origin}/api/v1/external/balance" \\
  -H "X-API-Key: ${apiKey || 'YOUR_API_KEY'}" \\
  -H "X-API-Secret: YOUR_API_SECRET"`}
                        </pre>
                    </div>

                    {/* Endpoint 2: Products */}
                    <div style={{ background: '#1e293b', borderRadius: '12px', padding: '18px', marginBottom: '18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                            <span style={{ background: '#0284c7', color: '#fff', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '800' }}>GET</span>
                            <code style={{ fontSize: '15px', color: '#f8fafc', fontWeight: '700' }}>/products</code>
                            <span style={{ color: '#94a3b8', fontSize: '13px' }}>- جلب قائمة المنتجات والأسعار الخاصة بك</span>
                        </div>
                        <pre style={{ background: '#0f172a', padding: '14px', borderRadius: '8px', overflowX: 'auto', fontSize: '13px', color: '#38bdf8' }}>
                            {`curl -X GET "${window.location.origin}/api/v1/external/products" \\
  -H "X-API-Key: ${apiKey || 'YOUR_API_KEY'}" \\
  -H "X-API-Secret: YOUR_API_SECRET"`}
                        </pre>
                    </div>

                    {/* Endpoint 3: Create Order */}
                    <div style={{ background: '#1e293b', borderRadius: '12px', padding: '18px', marginBottom: '18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                            <span style={{ background: '#16a34a', color: '#fff', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '800' }}>POST</span>
                            <code style={{ fontSize: '15px', color: '#f8fafc', fontWeight: '700' }}>/orders</code>
                            <span style={{ color: '#94a3b8', fontSize: '13px' }}>- إنشاء وتنفيذ طلب شحن مباشر</span>
                        </div>
                        <pre style={{ background: '#0f172a', padding: '14px', borderRadius: '8px', overflowX: 'auto', fontSize: '13px', color: '#4ade80' }}>
                            {`curl -X POST "${window.location.origin}/api/v1/external/orders" \\
  -H "X-API-Key: ${apiKey || 'YOUR_API_KEY'}" \\
  -H "X-API-Secret: YOUR_API_SECRET" \\
  -H "Content-Type: application/json" \\
  -d '{
    "product_id": 1,
    "product_tier_id": 10,
    "quantity": 1,
    "player_id": "123456789",
    "reference_id": "YOUR-ORDER-123"
  }'`}
                        </pre>
                    </div>

                    {/* Endpoint 4: Check Order */}
                    <div style={{ background: '#1e293b', borderRadius: '12px', padding: '18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                            <span style={{ background: '#0284c7', color: '#fff', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '800' }}>GET</span>
                            <code style={{ fontSize: '15px', color: '#f8fafc', fontWeight: '700' }}>/orders/{'{id}'}</code>
                            <span style={{ color: '#94a3b8', fontSize: '13px' }}>- الاستعلام عن حالة الطلب والأكواد</span>
                        </div>
                        <pre style={{ background: '#0f172a', padding: '14px', borderRadius: '8px', overflowX: 'auto', fontSize: '13px', color: '#38bdf8' }}>
                            {`curl -X GET "${window.location.origin}/api/v1/external/orders/EMP-12345" \\
  -H "X-API-Key: ${apiKey || 'YOUR_API_KEY'}" \\
  -H "X-API-Secret: YOUR_API_SECRET"`}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
}
