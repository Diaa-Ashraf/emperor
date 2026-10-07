import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Wallet,
    PlusCircle,
    ArrowUpRight,
    RefreshCw,
    ShieldCheck,
    CreditCard,
    Calendar,
    ReceiptText,
    ArrowLeft
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import DepositCard from '../components/wallet/DepositCard';
import TransactionItem from '../components/wallet/TransactionItem';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Pagination from '../components/ui/Pagination';
import { walletApi, depositsApi } from '../api/endpoints';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import CurrencyConverter from '../components/wallet/CurrencyConverter';

export default function WalletPage() {
    const { user } = useAuth();
    const { t, isRtl, language } = useLanguage();
    const { theme } = useTheme();
    const isLight = theme === 'light';

    const [balanceData, setBalanceData] = useState(null);
    const [deposits, setDeposits] = useState([]);
    const [depositStats, setDepositStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
    const [loadingDeposits, setLoadingDeposits] = useState(true);
    const [depositStatusFilter, setDepositStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [meta, setMeta] = useState(null);

    // Fetch balance
    const fetchBalance = () => {
        walletApi.getBalance()
            .then(res => {
                const data = res?.data || res;
                if (data) {
                    setBalanceData(data);
                }
            })
            .catch(() => { });
    };

    // Fetch deposits log (financial transfers)
    const fetchDeposits = (page = 1, status = 'all') => {
        setLoadingDeposits(true);
        const params = { page, days: 5 };
        if (status !== 'all') {
            params.status = status;
        }

        const fetcher = depositsApi.getHistory || depositsApi.getDeposits;
        if (typeof fetcher === 'function') {
            fetcher(params)
                .then(res => {
                    const resData = res?.data || res;
                    if (resData?.data && Array.isArray(resData.data)) {
                        setDeposits(resData.data);
                        setMeta(resData.meta || { current_page: page, last_page: resData.last_page || 1, total: resData.total });
                    } else if (Array.isArray(resData)) {
                        setDeposits(resData);
                    } else {
                        setDeposits([]);
                    }

                    if (resData?.stats) {
                        setDepositStats(resData.stats);
                    }
                })
                .catch(() => {
                    setDeposits([]);
                })
                .finally(() => setLoadingDeposits(false));
        } else {
            setLoadingDeposits(false);
        }
    };

    useEffect(() => {
        fetchBalance();
    }, []);

    useEffect(() => {
        fetchDeposits(currentPage, depositStatusFilter);
    }, [currentPage, depositStatusFilter]);

    const rawBal = balanceData?.balance ?? user?.wallet?.balance ?? user?.wallet_balance ?? 0;
    const formattedBalance = Number(rawBal || 0).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    const currencyLabel = language === 'en' ? 'EGP' : 'ج.م';

    return (
        <MainLayout>
            {/* Top Navigation & Breadcrumb */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
            }}>
                <Link
                    to="/"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.06)',
                        border: isLight ? '1px solid #CBD5E1' : '1px solid var(--border-medium)',
                        borderRadius: '20px',
                        padding: '6px 14px',
                        fontSize: '13px',
                        fontWeight: '700',
                        color: isLight ? '#0F172A' : 'var(--text-primary)',
                        textDecoration: 'none',
                        boxShadow: isLight ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
                    }}
                >
                    {isRtl ? (
                        <>
                            <span>{t('back', 'رجوع')}</span>
                            <ArrowLeft size={16} />
                        </>
                    ) : (
                        <>
                            <ArrowLeft size={16} />
                            <span>{t('back', 'رجوع')}</span>
                        </>
                    )}
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{t('availableBalance', 'الرصيد المتاح')}:</span>
                    <span style={{ fontSize: '15px', fontWeight: '900', color: 'var(--gold-400)' }}>
                        {formattedBalance} {currencyLabel}
                    </span>
                </div>
            </div>

            {/* Financial Account Hero Card (Screenshot 5 Header) */}
            <div style={{
                background: isLight ? '#FFFFFF' : 'linear-gradient(135deg, #1e1e2d 0%, #2a223f 50%, #151a30 100%)',
                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '24px',
                padding: '24px 20px',
                marginBottom: '28px',
                boxShadow: isLight ? '0 8px 24px rgba(0, 0, 0, 0.05)' : '0 12px 35px rgba(0, 0, 0, 0.35)',
                position: 'relative',
                overflow: 'hidden',
                color: isLight ? '#0F172A' : '#FFFFFF',
            }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '24px' }}>
                    <div style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                    }}>
                        <ReceiptText size={22} color={isLight ? '#475569' : '#CBD5E1'} />
                    </div>

                    <div style={{ textAlign: isRtl ? 'right' : 'left', flex: 1 }}>
                        <span style={{ fontSize: '12.5px', color: isLight ? '#64748B' : 'rgba(255, 255, 255, 0.65)', fontWeight: '700', display: 'block', marginBottom: '4px' }}>
                            {t('financialAccount', 'حسابك المالي')}
                        </span>
                        <h2 style={{ margin: '0 0 6px', fontSize: '22px', fontWeight: '900', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                            {t('financialTransfersTitle', 'سجل طلبات إضافة الرصيد')}
                        </h2>
                        <p style={{ margin: 0, fontSize: '13px', color: isLight ? '#475569' : 'rgba(255, 255, 255, 0.75)' }}>
                            {t('financialTransfersSub', 'تابع حالة طلباتك ومبلغ وطريقة الدفع في مكان واحد (خلال آخر 5 أيام).')}
                        </p>
                    </div>
                </div>

                {/* Filter / Stats Counters (Pills) */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '10px',
                }}>
                    {/* All */}
                    <button
                        onClick={() => {
                            setDepositStatusFilter('all');
                            setCurrentPage(1);
                        }}
                        style={{
                            background: depositStatusFilter === 'all'
                                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                                : (isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.08)'),
                            border: depositStatusFilter === 'all' ? 'none' : (isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.1)'),
                            borderRadius: '16px',
                            padding: '12px 6px',
                            color: depositStatusFilter === 'all' ? '#FFFFFF' : (isLight ? '#0F172A' : '#FFFFFF'),
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                    >
                        <div style={{ fontSize: '11.5px', opacity: depositStatusFilter === 'all' ? 0.9 : 0.7, marginBottom: '2px', fontWeight: '700' }}>{t('all', 'الكل')}</div>
                        <div style={{ fontSize: '18px', fontWeight: '900' }}>{depositStats.total || deposits.length}</div>
                    </button>

                    {/* Pending */}
                    <button
                        onClick={() => {
                            setDepositStatusFilter('pending');
                            setCurrentPage(1);
                        }}
                        style={{
                            background: depositStatusFilter === 'pending'
                                ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                                : (isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.08)'),
                            border: depositStatusFilter === 'pending' ? 'none' : (isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.1)'),
                            borderRadius: '16px',
                            padding: '12px 6px',
                            color: depositStatusFilter === 'pending' ? '#FFFFFF' : (isLight ? '#0F172A' : '#FFFFFF'),
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                    >
                        <div style={{ fontSize: '11.5px', opacity: depositStatusFilter === 'pending' ? 0.9 : 0.7, marginBottom: '2px', fontWeight: '700' }}>{t('pending', 'انتظار')}</div>
                        <div style={{ fontSize: '18px', fontWeight: '900' }}>{depositStats.pending || 0}</div>
                    </button>

                    {/* Approved / Accepted */}
                    <button
                        onClick={() => {
                            setDepositStatusFilter('completed');
                            setCurrentPage(1);
                        }}
                        style={{
                            background: depositStatusFilter === 'completed'
                                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                                : (isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.08)'),
                            border: depositStatusFilter === 'completed' ? 'none' : (isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.1)'),
                            borderRadius: '16px',
                            padding: '12px 6px',
                            color: depositStatusFilter === 'completed' ? '#FFFFFF' : (isLight ? '#0F172A' : '#FFFFFF'),
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                    >
                        <div style={{ fontSize: '11.5px', opacity: depositStatusFilter === 'completed' ? 0.9 : 0.7, marginBottom: '2px', fontWeight: '700' }}>{t('accepted', 'مقبولة')}</div>
                        <div style={{ fontSize: '18px', fontWeight: '900' }}>{depositStats.approved || 0}</div>
                    </button>

                    {/* Rejected */}
                    <button
                        onClick={() => {
                            setDepositStatusFilter('rejected');
                            setCurrentPage(1);
                        }}
                        style={{
                            background: depositStatusFilter === 'rejected'
                                ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                                : (isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.08)'),
                            border: depositStatusFilter === 'rejected' ? 'none' : (isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.1)'),
                            borderRadius: '16px',
                            padding: '12px 6px',
                            color: depositStatusFilter === 'rejected' ? '#FFFFFF' : (isLight ? '#0F172A' : '#FFFFFF'),
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                    >
                        <div style={{ fontSize: '11.5px', opacity: depositStatusFilter === 'rejected' ? 0.9 : 0.7, marginBottom: '2px', fontWeight: '700' }}>{t('rejected', 'مرفوضة')}</div>
                        <div style={{ fontSize: '18px', fontWeight: '900' }}>{depositStats.rejected || 0}</div>
                    </button>
                </div>
            </div>

            {/* Subheader: Latest Orders & Refresh Button */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                marginBottom: '16px',
                padding: '0 4px',
            }}>
                <button
                    onClick={() => fetchDeposits(currentPage, depositStatusFilter)}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'rgba(56, 189, 248, 0.12)',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                        borderRadius: '12px',
                        padding: '8px 16px',
                        color: '#0284c7',
                        fontSize: '13px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                    }}
                >
                    <RefreshCw size={14} />
                    <span>{t('refresh', 'تحديث')}</span>
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ textAlign: isRtl ? 'right' : 'left' }}>
                        <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '900', color: 'var(--text-primary)' }}>
                            {t('latestRequests', 'طلباتك الأخيرة')}
                        </h3>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                            {t('showingRequests', 'عرض {count} طلب (آخر 5 أيام)').replace('{count}', deposits.length)}
                        </span>
                    </div>

                    <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: 'var(--bg-elevated)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--gold-400)',
                    }}>
                        <ReceiptText size={18} />
                    </div>
                </div>
            </div>

            {/* Deposits List */}
            {loadingDeposits ? (
                <div style={{ padding: '60px 0' }}>
                    <LoadingSpinner text={t('loadingTransfers', 'جاري تحميل سجل التحويلات والإيداعات...')} />
                </div>
            ) : deposits && deposits.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                    {deposits.map((dep) => (
                        <DepositCard key={dep.id} deposit={dep} />
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
                    title={t('noTransfersFound', 'لا توجد تحويلات مالية مسجلة')}
                    description={t('noTransfersDesc', 'لم يتم العثور على طلبات إضافة رصيد خلال آخر 5 أيام.')}
                    actionText={t('chargeBalanceNow', 'شحن رصيد الآن')}
                    onAction={() => window.location.href = '/deposit'}
                />
            )}
        </MainLayout>
    );
}

