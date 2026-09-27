import React, { useState } from 'react';
import { Terminal, Code, CheckCircle2, ArrowLeft, ArrowRight, Zap, Copy, Check, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';

export default function ApiResellerBanner() {
    const { isRtl } = useLanguage();
    const [copied, setCopied] = useState(false);

    const apiSample = `curl -X POST https://emperor-cards.com/api/v1/orders \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "tier_id": 104,
    "player_id": "5129481239",
    "idempotency_key": "order_uuid_9921"
  }'`;

    const handleCopy = () => {
        navigator.clipboard.writeText(apiSample);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            className="emperor-entrance emperor-vip-card"
            style={{
                borderRadius: '28px',
                padding: 'clamp(24px, 4vw, 36px)',
                marginBottom: '52px',
                border: '1px solid var(--border-strong)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.6), var(--shadow-gold)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: '28px',
                alignItems: 'center',
            }}>
                {/* Left: Text & Features */}
                <div>
                    <div className="emperor-badge" style={{ marginBottom: '14px' }}>
                        <Terminal size={13} color="var(--gold-400)" />
                        <span>بوابة الموزعين والربط البرمجي السريع</span>
                    </div>

                    <h2 style={{
                        fontSize: 'clamp(22px, 3.5vw, 30px)',
                        fontWeight: '900',
                        color: 'var(--text-primary)',
                        marginBottom: '12px',
                        lineHeight: '1.3',
                    }}>
                        هل تملك متجراً أو منصة ألعاب؟ اربط متجرك بـ API إمبراطور
                    </h2>

                    <p style={{
                        fontSize: '13.5px',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.75',
                        marginBottom: '20px',
                    }}>
                        نوفر للتجار والموزعين واجهة برمجة تطبيقات (REST API) كاملة ومجانية لمزامنة المنتجات، تحديث الأسعار لحظياً، وتنفيذ طلبات الشحن تلقائياً من رصيدك في أجزاء من الثانية.
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                        gap: '12px',
                        marginBottom: '24px',
                    }}>
                        {[
                            'مزامنة أسعار لحظية',
                            'تنفيذ آلي بدون تدخل بشري',
                            'Webhooks للإشعارات اللحظية',
                            'توثيق Postman جاهز ومجاني',
                        ].map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-gold)', fontWeight: '700' }}>
                                <CheckCircle2 size={15} color="var(--gold-400)" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <a
                            href="https://t.me/emperor_support"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="emperor-btn-primary"
                            style={{ padding: '12px 24px', fontSize: '14px', borderRadius: '14px' }}
                        >
                            <Zap size={16} />
                            <span>طلب مفتاح API للتاجر</span>
                        </a>

                        <Link
                            to="/orders"
                            className="emperor-btn-ghost"
                            style={{ padding: '12px 20px', fontSize: '14px', borderRadius: '14px' }}
                        >
                            <Code size={16} />
                            <span>توثيق الـ API</span>
                        </Link>
                    </div>
                </div>

                {/* Right: Sleek Code Terminal */}
                <div style={{
                    background: '#09090D',
                    border: '1px solid rgba(212, 165, 55, 0.25)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.8)',
                    fontFamily: 'monospace',
                    direction: 'ltr',
                    textAlign: 'left',
                }}>
                    {/* Terminal Titlebar */}
                    <div style={{
                        background: '#13131A',
                        padding: '10px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                    }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
                        </div>
                        <span style={{ fontSize: '11px', color: '#888', fontWeight: '700' }}>
                            api/v1/orders — Fast Dispatch
                        </span>
                        <button
                            onClick={handleCopy}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: copied ? '#10B981' : '#AAA',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '11px',
                            }}
                        >
                            {copied ? <Check size={13} /> : <Copy size={13} />}
                            <span>{copied ? 'Copied!' : 'Copy'}</span>
                        </button>
                    </div>

                    {/* Code Body */}
                    <pre style={{
                        padding: '16px',
                        margin: 0,
                        fontSize: '12px',
                        color: '#E2E8F0',
                        lineHeight: '1.6',
                        overflowX: 'auto',
                    }}>
                        <code>
                            <span style={{ color: '#F59E0B' }}>POST</span> <span style={{ color: '#D4A537' }}>/api/v1/orders</span><br />
                            <span style={{ color: '#64748B' }}>// Response in 28ms:</span><br />
                            {`{
  "success": true,
  "data": {
    "order_id": "EMP-884920",
    "status": "completed",
    "delivery": "instant_api",
    "player_id": "5129481239",
    "diamonds_credited": 660,
    "wallet_balance_egp": 4920.50
  }
}`}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
}
