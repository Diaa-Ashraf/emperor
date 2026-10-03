import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Wallet,
    PlusCircle,
    ArrowUpRight,
    ArrowDownLeft,
    RefreshCw,
    Filter,
    ShieldCheck,
    CreditCard,
    Sparkles,
    Calendar
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import TransactionItem from '../components/wallet/TransactionItem';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Pagination from '../components/ui/Pagination';
import { walletApi, depositsApi } from '../api/endpoints';
import { useAuth } from '../contexts/AuthContext';

export default function WalletPage() {
    const { user } = useAuth();

    const [balanceData, setBalanceData] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loadingBalance, setLoadingBalance] = useState(true);
    const [loadingTransactions, setLoadingTransactions] = useState(true);
    const [filterType, setFilterType] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [meta, setMeta] = useState(null);

    // Fetch balance
    const fetchBalance = () => {
        setLoadingBalance(true);
        walletApi.getBalance()
            .then(res => {
                const data = res?.data || res;
                if (data) {
                    setBalanceData(data);
                }
            })
            .catch(() => { })
            .finally(() => setLoadingBalance(false));
    };

    // Fetch transactions
    const fetchTransactions = (page = 1, type = 'all') => {
        setLoadingTransactions(true);
        const params = { page };
        if (type !== 'all') {
            params.type = type;
        }

        walletApi.getTransactions(params)
            .then(res => {
                const resData = res?.data || res;
                if (resData?.data && Array.isArray(resData.data)) {
                    setTransactions(resData.data);
                    setMeta(resData.meta || { current_page: page, last_page: resData.last_page || 1, total: resData.total });
                } else if (Array.isArray(resData)) {
                    setTransactions(resData);
                } else {
                    setTransactions([]);
                }
            })
            .catch(() => {
                setTransactions([]);
            })
            .finally(() => setLoadingTransactions(false));
    };

    useEffect(() => {
        fetchBalance();
    }, []);

    useEffect(() => {
        fetchTransactions(currentPage, filterType);
    }, [currentPage, filterType]);

    const rawBal = balanceData?.balance ?? user?.wallet?.balance ?? user?.wallet_balance ?? 0;
    const formattedBalance = Number(rawBal || 0).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    const currency = balanceData?.currency || user?.currency || 'EGP';
    const currencyLabel = currency === 'EGP' ? 'ج.م' : currency;
    const usdBalance = Number(balanceData?.balance_usd ?? (rawBal && currency === 'EGP' ? (rawBal / 50) : 0)).toFixed(2);

    const filterTabs = [
        { key: 'all', label: 'الكل' },
        { key: 'deposit', label: 'الإيداعات' },
        { key: 'order_payment', label: 'الشحن والطلبات' },
        { key: 'order_refund', label: 'الاسترداد' },
        { key: 'referral_reward', label: 'أرباح الإحالة' },
    ];

    return (
        <MainLayout>
            {/* Header & Breadcrumbs */}
            <div style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '13px', color: '#8E8E98' }}>
                    <Link to="/" style={{ color: '#D4A537', textDecoration: 'none' }}>الرئيسية</Link>
                    <span>/</span>
                    <span style={{ color: '#CBD5E1' }}>المحفظة وسجل المعاملات</span>
                </div>

                <h1 style={{ margin: '0 0 6px', fontSize: '26px', fontWeight: '900', color: '#FFFFFF' }}>
                    المحفظة الرقمية
                </h1>
                <p style={{ margin: 0, fontSize: '14px', color: '#9E9EA8' }}>
                    تحكم برصيدك، تابع عمليات الشحن الفوري، واشحن محفظتك بأمان
                </p>
            </div>

            {/* Big Wallet Balance Card */}
            <div style={{
                background: 'linear-gradient(135deg, #1C1917 0%, #2A1F0E 50%, #151108 100%)',
                border: '1px solid rgba(212, 165, 55, 0.4)',
                borderRadius: '24px',
                padding: '36px 32px',
                marginBottom: '40px',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(212, 165, 55, 0.15)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '28px',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Glow */}
                <div style={{
                    position: 'absolute',
                    top: '-40px',
                    left: '-40px',
                    width: '260px',
                    height: '260px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(212, 165, 55, 0.25) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '14px', color: '#D4A537', fontWeight: '800' }}>
                            إجمالي الرصيد المتاح
                        </span>
                        <span style={{
                            fontSize: '11px',
                            background: 'rgba(34, 197, 94, 0.15)',
                            color: '#4ADE80',
                            padding: '2px 8px',
                            borderRadius: '10px',
                            border: '1px solid rgba(34, 197, 94, 0.3)',
                            fontWeight: '600',
                        }}>
                            مؤمّن 100%
                        </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <span style={{
                            fontSize: 'clamp(36px, 5vw, 48px)',
                            fontWeight: '900',
                            color: '#FFFFFF',
                            letterSpacing: '-1px',
                            fontFamily: 'Cairo, sans-serif',
                        }}>
                            {formattedBalance}
                        </span>
                        <span style={{ fontSize: '24px', fontWeight: '800', color: '#D4A537' }}>
                            {currencyLabel}
                        </span>
                    </div>

                    <div style={{ fontSize: '14px', color: '#9E9EA8' }}>
                        ما يعادل تقريباً: <strong style={{ color: '#E2E8F0' }}>${usdBalance} USD</strong>
                    </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', zIndex: 1 }}>
                    <Link to="/deposit" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="primary"
                            size="lg"
                            icon={PlusCircle}
                            style={{
                                boxShadow: '0 6px 25px rgba(212, 165, 55, 0.4)',
                                padding: '14px 28px',
                            }}
                        >
                            شحن المحفظة
                        </Button>
                    </Link>

                    <Link to="/target/sell" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="secondary"
                            size="lg"
                            icon={ArrowUpRight}
                            style={{
                                background: 'rgba(255, 255, 255, 0.08)',
                                border: '1px solid rgba(212, 165, 55, 0.3)',
                                color: '#D4A537',
                                padding: '14px 24px',
                            }}
                        >
                            بيع واستبدال تارجت
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Multi-Currency Balances Cards */}
            {balanceData?.wallets && balanceData.wallets.length > 0 && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '16px',
                    marginBottom: '32px',
                }}>
                    {balanceData.wallets.map((w) => (
                        <div key={w.currency} style={{
                            background: '#12131A',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '16px',
                            padding: '18px 20px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <div>
                                <span style={{ fontSize: '12px', color: '#8E8E98', display: 'block', marginBottom: '4px' }}>
                                    رصيد {w.currency === 'EGP' ? 'الجنيه المصري' : (w.currency === 'USD' ? 'الدولار الأمريكي' : 'الريال السعودي')}
                                </span>
                                <div style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF' }}>
                                    {Number(w.balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    <span style={{ fontSize: '13px', color: '#D4A537', marginRight: '6px' }}>{w.currency}</span>
                                </div>
                            </div>
                            <div style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '10px',
                                background: 'rgba(212, 165, 55, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#D4A537',
                                fontWeight: '900',
                                fontSize: '14px',
                            }}>
                                {w.currency}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Currency Converter Section */}
            <CurrencyConverter
                userWallets={balanceData?.wallets || []}
                onConverted={() => {
                    fetchBalance();
                    fetchTransactions(1, filterType);
                }}
            />

            {/* Transactions Section Header & Tabs */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                marginBottom: '20px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: '8px',
                        height: '24px',
                        borderRadius: '4px',
                        background: 'linear-gradient(180deg, #F3E5AB 0%, #D4A537 100%)',
                    }} />
                    <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#FFFFFF' }}>
                        سجل الحركات والمعاملات
                    </h2>
                </div>

                {/* Filter Pills */}
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', flexWrap: 'wrap' }}>
                    {filterTabs.map((tab) => {
                        const isActive = filterType === tab.key;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => {
                                    setFilterType(tab.key);
                                    setCurrentPage(1);
                                }}
                                style={{
                                    padding: '6px 14px',
                                    borderRadius: '10px',
                                    background: isActive
                                        ? 'linear-gradient(135deg, #F3E5AB 0%, #D4A537 100%)'
                                        : 'rgba(26, 26, 36, 0.8)',
                                    color: isActive ? '#0D0D0F' : '#CBD5E1',
                                    fontWeight: '700',
                                    fontSize: '13px',
                                    border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    transition: 'all 0.2s',
                                    fontFamily: 'Cairo, sans-serif',
                                }}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Transactions List */}
            {loadingTransactions ? (
                <div style={{ padding: '60px 0' }}>
                    <LoadingSpinner text="جاري تحميل سجل المعاملات..." />
                </div>
            ) : transactions && transactions.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                    {transactions.map((tx) => (
                        <TransactionItem key={tx.id} transaction={tx} />
                    ))}

                    {meta && meta.last_page > 1 && (
                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                            <Pagination
                                currentPage={currentPage}
                                lastPage={meta.last_page}
                                onPageChange={(p) => setCurrentPage(p)}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <EmptyState
                    title="لا توجد حركات في هذا السجل"
                    description="لم يتم تسجيل أي عمليات من هذا النوع على محفظتك حتى الآن."
                    actionText="شحن رصيد جديد"
                    onAction={() => window.location.href = '/deposit'}
                />
            )}
        </MainLayout>
    );
}
