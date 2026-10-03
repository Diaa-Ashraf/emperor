import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, CheckCircle2, AlertCircle, RefreshCw, Coins } from 'lucide-react';
import Button from '../ui/Button';
import { walletApi } from '../../api/endpoints';

export default function CurrencyConverter({ userWallets = [], onConverted }) {
    const [fromCurrency, setFromCurrency] = useState('EGP');
    const [toCurrency, setToCurrency] = useState('USD');
    const [amount, setAmount] = useState('');
    const [preview, setPreview] = useState(null);
    const [rates, setRates] = useState([]);
    const [loadingRates, setLoadingRates] = useState(false);
    const [converting, setConverting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch Rates
    const fetchRates = async () => {
        setLoadingRates(true);
        try {
            const res = await walletApi.getRates();
            const data = res?.data || res;
            if (Array.isArray(data)) {
                setRates(data);
            }
        } catch (e) {
            // Silently ignore
        } finally {
            setLoadingRates(false);
        }
    };

    useEffect(() => {
        fetchRates();
    }, []);

    // Live preview when amount, from, or to changes
    useEffect(() => {
        if (!amount || isNaN(amount) || Number(amount) <= 0 || fromCurrency === toCurrency) {
            setPreview(null);
            return;
        }

        const timer = setTimeout(async () => {
            try {
                const res = await walletApi.previewConversion({
                    from_currency: fromCurrency,
                    to_currency: toCurrency,
                    amount: Number(amount)
                });

                const data = res?.data || res;
                if (data && (data.final_amount !== undefined || data.rate !== undefined)) {
                    setPreview(data);
                    setErrorMessage('');
                }
            } catch (err) {
                setPreview(null);
                setErrorMessage(err?.message || 'تعذر حساب سعر التحويل');
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [amount, fromCurrency, toCurrency]);

    const handleSwap = () => {
        const temp = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(temp);
    };

    const handleConvert = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        if (!amount || Number(amount) <= 0) {
            setErrorMessage('يرجى كتابة مبلغ صحيح');
            return;
        }

        setConverting(true);
        try {
            const res = await walletApi.convertCurrency({
                from_currency: fromCurrency,
                to_currency: toCurrency,
                amount: Number(amount)
            });

            setSuccessMessage(res?.message || 'تم تحويل العملة بنجاح!');
            setAmount('');
            setPreview(null);
            if (onConverted) {
                onConverted();
            }
        } catch (err) {
            setErrorMessage(err?.message || 'حدث خطأ أثناء تحويل العملة');
        } finally {
            setConverting(false);
        }
    };

    const currentFromWallet = Array.isArray(userWallets) ? userWallets.find(w => w?.currency === fromCurrency) : null;
    const availableFromBalance = Number(currentFromWallet?.available_balance ?? currentFromWallet?.balance ?? 0);

    return (
        <div style={{
            background: 'linear-gradient(135deg, rgba(28, 25, 23, 0.95) 0%, rgba(20, 18, 16, 0.95) 100%)',
            border: '1px solid rgba(212, 165, 55, 0.25)',
            borderRadius: '20px',
            padding: '24px',
            marginBottom: '32px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: 'rgba(212, 165, 55, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#D4A537',
                    }}>
                        <ArrowRightLeft size={20} />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#FFFFFF' }}>
                            التحويل الفوري بين العملات
                        </h3>
                        <p style={{ margin: 0, fontSize: '12px', color: '#8E8E98' }}>
                            حوّل رصيدك بين الجنيه، الدولار، والريال فوراً بسعر ثابت
                        </p>
                    </div>
                </div>

                <button
                    onClick={fetchRates}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#8E8E98',
                        cursor: 'pointer',
                        padding: '6px',
                        borderRadius: '8px',
                    }}
                    title="تحديث أسعار الصرف"
                >
                    <RefreshCw size={16} className={loadingRates ? 'animate-spin' : ''} />
                </button>
            </div>

            {successMessage && (
                <div style={{
                    background: 'rgba(34, 197, 94, 0.15)',
                    border: '1px solid rgba(34, 197, 94, 0.4)',
                    color: '#4ADE80',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '16px',
                }}>
                    <CheckCircle2 size={18} />
                    <span>{successMessage}</span>
                </div>
            )}

            {errorMessage && (
                <div style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    color: '#F87171',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '16px',
                }}>
                    <AlertCircle size={18} />
                    <span>{errorMessage}</span>
                </div>
            )}

            <form onSubmit={handleConvert}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'center' }}>
                    {/* From Currency & Amount */}
                    <div style={{
                        background: '#12131A',
                        padding: '14px',
                        borderRadius: '14px',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
                            <span style={{ color: '#8E8E98' }}>تحويل من</span>
                            <span style={{ color: '#D4A537', fontWeight: '600' }}>
                                المتاح: {Number(availableFromBalance || 0).toFixed(2)} {fromCurrency}
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <input
                                type="number"
                                step="any"
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                style={{
                                    flex: 1,
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#FFFFFF',
                                    fontSize: '18px',
                                    fontWeight: '700',
                                    outline: 'none',
                                }}
                            />
                            <select
                                value={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value)}
                                style={{
                                    background: '#1E1E28',
                                    border: '1px solid rgba(212, 165, 55, 0.3)',
                                    color: '#FFFFFF',
                                    padding: '4px 8px',
                                    borderRadius: '8px',
                                    fontWeight: '700',
                                    outline: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                <option value="EGP">EGP</option>
                                <option value="USD">USD</option>
                                <option value="SAR">SAR</option>
                            </select>
                        </div>
                    </div>

                    {/* Swap Button */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button
                            type="button"
                            onClick={handleSwap}
                            style={{
                                width: '42px',
                                height: '42px',
                                borderRadius: '50%',
                                background: 'rgba(212, 165, 55, 0.15)',
                                border: '1px solid rgba(212, 165, 55, 0.4)',
                                color: '#D4A537',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}
                            title="تبديل العملات"
                        >
                            <ArrowRightLeft size={18} />
                        </button>
                    </div>

                    {/* To Currency */}
                    <div style={{
                        background: '#12131A',
                        padding: '14px',
                        borderRadius: '14px',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
                            <span style={{ color: '#8E8E98' }}>استلام بـ</span>
                            <span style={{ color: '#4ADE80', fontWeight: '600' }}>
                                {preview ? `سعر الصرف: 1 ${fromCurrency} = ${preview.rate} ${toCurrency}` : ''}
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <div style={{
                                flex: 1,
                                fontSize: '18px',
                                fontWeight: '700',
                                color: preview ? '#4ADE80' : '#8E8E98',
                            }}>
                                {preview ? Number(preview.final_amount || 0).toFixed(2) : '0.00'}
                            </div>
                            <select
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                                style={{
                                    background: '#1E1E28',
                                    border: '1px solid rgba(212, 165, 55, 0.3)',
                                    color: '#FFFFFF',
                                    padding: '4px 8px',
                                    borderRadius: '8px',
                                    fontWeight: '700',
                                    outline: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                <option value="USD">USD</option>
                                <option value="EGP">EGP</option>
                                <option value="SAR">SAR</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Submit Convert */}
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={converting || !preview || fromCurrency === toCurrency || Number(amount) > availableFromBalance}
                        style={{ padding: '12px 28px', fontWeight: '800' }}
                    >
                        {converting ? 'جاري التحويل...' : 'تأكيد التحويل الآن'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
