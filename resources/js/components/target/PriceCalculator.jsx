import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, DollarSign, Sparkles, ArrowLeft, RefreshCw, Zap } from 'lucide-react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { targetApi } from '../../api/endpoints';

export default function PriceCalculator({ apps = [], onSelectApp }) {
    const navigate = useNavigate();

    const [selectedAppId, setSelectedAppId] = useState(apps.length > 0 ? String(apps[0].id) : '');
    const [points, setPoints] = useState('100000');
    const [quote, setQuote] = useState(null);
    const [calculating, setCalculating] = useState(false);

    useEffect(() => {
        if (!selectedAppId && apps.length > 0) {
            setSelectedAppId(String(apps[0].id));
        }
    }, [apps]);

    useEffect(() => {
        if (!selectedAppId || !points || Number(points) <= 0) {
            setQuote(null);
            return;
        }

        const timer = setTimeout(() => {
            setCalculating(true);
            targetApi.getQuote({
                product_id: Number(selectedAppId),
                points: Number(points),
            })
            .then(res => {
                if (res?.data) {
                    setQuote(res.data);
                }
            })
            .catch(() => {
                // Fallback math calculation if server quote errors
                const numPts = Number(points);
                const estimatedEgp = (numPts / 1000) * 18.5;
                setQuote({
                    points: numPts,
                    net_payout: estimatedEgp,
                    rate_per_point: 0.0185,
                    currency: 'EGP',
                });
            })
            .finally(() => setCalculating(false));
        }, 300);

        return () => clearTimeout(timer);
    }, [selectedAppId, points]);

    const appOptions = apps.map(app => ({
        value: String(app.id),
        label: app.name,
    }));

    const handleProceed = () => {
        if (!selectedAppId) return;
        navigate(`/target/sell?app_id=${selectedAppId}&points=${points}`);
    };

    const formattedPayout = quote
        ? Number(quote.net_payout || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : null;

    return (
        <div style={{
            background: 'linear-gradient(135deg, rgba(9, 18, 44, 0.95) 0%, rgba(21, 23, 61, 0.95) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            borderRadius: '24px',
            padding: '32px',
            marginBottom: '48px',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(56, 189, 248, 0.1)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'rgba(56, 189, 248, 0.15)',
                    color: '#38BDF8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Calculator size={22} />
                </div>
                <div>
                    <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#FFFFFF' }}>
                        حاسبة استحقاق بيع التارجت الفورية
                    </h3>
                    <span style={{ fontSize: '13px', color: '#94A3B8' }}>
                        احسب المبلغ المستحق بالجنيه المصري بدقة وفقاً لأسعار السوق المحدثة لحظياً
                    </span>
                </div>
            </div>

            {/* Inputs Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                gap: '20px',
                alignItems: 'center',
                marginBottom: '24px',
            }}>
                {/* App Select */}
                {appOptions.length > 0 && (
                    <Select
                        label="اختر التطبيق"
                        value={selectedAppId}
                        onChange={(e) => setSelectedAppId(e.target.value)}
                        options={appOptions}
                        containerStyle={{ marginBottom: 0 }}
                    />
                )}

                {/* Points Input */}
                <Input
                    label="عدد الكوينز / النقاط المحولة"
                    type="number"
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                    placeholder="مثال: 50000"
                    containerStyle={{ marginBottom: 0 }}
                />

                {/* Result Card */}
                <div style={{
                    background: 'rgba(9, 12, 28, 0.8)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}>
                    <span style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '4px' }}>
                        المبلغ المستحق للدفع (صافي كاش):
                    </span>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                        {calculating ? (
                            <span style={{ color: '#38BDF8', fontSize: '18px', fontWeight: '700' }}>جاري الحساب...</span>
                        ) : (
                            <>
                                <strong style={{ fontSize: '26px', fontWeight: '900', color: '#38BDF8' }}>
                                    {formattedPayout ? `${formattedPayout}` : '0.00'}
                                </strong>
                                <span style={{ fontSize: '14px', color: '#38BDF8', fontWeight: '700' }}>
                                    ج.م كاش
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Action CTA */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="primary"
                    size="lg"
                    icon={ArrowLeft}
                    iconPosition="end"
                    onClick={handleProceed}
                    style={{
                        background: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
                        color: '#FFFFFF',
                        border: 'none',
                        boxShadow: '0 4px 20px rgba(56, 189, 248, 0.4)',
                    }}
                >
                    بيع هذا التارجت الآن
                </Button>
            </div>
        </div>
    );
}
