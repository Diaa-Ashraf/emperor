import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    Users,
    Search,
    RefreshCw,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { adminApi } from '../../api/endpoints';
import { useToast } from '../../contexts/ToastContext';
import { useTheme } from '../../contexts/ThemeContext';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminUserCard from '../../components/admin/AdminUserCard';
import AdminUserDetailsModal from '../../components/admin/AdminUserDetailsModal';

export default function AdminUsersPage() {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const { toastError } = useToast();

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState({ data: [], current_page: 1, last_page: 1, total: 0 });
    
    // Search input state (local) and committed search term
    const [searchInput, setSearchInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [page, setPage] = useState(1);

    // Selected user for details modal
    const [selectedUser, setSelectedUser] = useState(null);

    // Request abort ref to prevent race conditions and lag
    const abortRef = useRef(null);

    const fetchUsers = useCallback(async (targetPage = page, targetSearch = searchTerm, targetStatus = statusFilter) => {
        try {
            if (abortRef.current) {
                abortRef.current.abort();
            }
            abortRef.current = new AbortController();

            setLoading(true);
            const res = await adminApi.getUsers({
                page: targetPage,
                search: targetSearch.trim() || undefined,
                status: targetStatus || undefined,
            });

            if (res) {
                const responseData = res.data?.data !== undefined ? res.data.data : (res.data || res);
                let rawList = [];
                if (Array.isArray(responseData)) {
                    rawList = responseData;
                } else if (Array.isArray(responseData?.data)) {
                    rawList = responseData.data;
                } else if (Array.isArray(res?.data)) {
                    rawList = res.data;
                }

                const currentPage = Number(responseData?.current_page || res?.data?.current_page || 1);
                const lastPage = Number(responseData?.last_page || res?.data?.last_page || 1);
                const totalCount = Number(responseData?.total ?? res?.data?.total ?? rawList.length);

                setUsers({
                    data: rawList,
                    current_page: currentPage,
                    last_page: lastPage,
                    total: totalCount,
                });
            }
        } catch (err) {
            if (err?.name !== 'CanceledError' && err?.code !== 'ERR_CANCELED') {
                console.error('Fetch users error:', err);
                toastError('فشل تحميل قائمة المستخدمين');
            }
        } finally {
            setLoading(false);
        }
    }, [page, searchTerm, statusFilter, toastError]);

    // Initial and dependencies-driven fetch
    useEffect(() => {
        fetchUsers(page, searchTerm, statusFilter);
    }, [page, searchTerm, statusFilter, fetchUsers]);

    // Handle search form submission (no duplicate fetch)
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchTerm(searchInput);
        setPage(1);
    };

    // Stable callback for opening modal
    const handleOpenDetails = useCallback((user) => {
        setSelectedUser(user);
    }, []);

    // Stable callback for closing modal
    const handleCloseDetails = useCallback(() => {
        setSelectedUser(null);
    }, []);

    // Refresh after updates
    const handleUserUpdated = useCallback(() => {
        fetchUsers(page, searchTerm, statusFilter);
    }, [fetchUsers, page, searchTerm, statusFilter]);

    return (
        <div
            style={{
                minHeight: '100vh',
                backgroundColor: isLight ? '#F8FAFC' : '#07090E',
                color: isLight ? '#0F172A' : '#FFFFFF',
                fontFamily: 'Cairo, sans-serif',
                direction: 'rtl',
                paddingBottom: '80px',
            }}
        >
            {/* Unified Admin Header */}
            <AdminHeader
                title="إدارة المستخدمين"
                badge="المستخدمين"
                onRefresh={() => fetchUsers(page, searchTerm, statusFilter)}
                refreshing={loading}
            />

            <div style={{ maxWidth: '820px', margin: '0 auto', padding: '0 14px' }}>
                {/* ═══ Search & Filters Bar ═══ */}
                <div
                    style={{
                        backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                        border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '20px',
                        padding: '16px 20px',
                        marginBottom: '20px',
                        boxShadow: isLight ? '0 4px 15px rgba(0, 0, 0, 0.04)' : '0 10px 25px rgba(0, 0, 0, 0.35)',
                    }}
                >
                    <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <div style={{ position: 'relative', flex: '1 1 240px' }}>
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="ابحث بالاسم، البريد، أو الـ ID..."
                                style={{
                                    width: '100%',
                                    padding: '11px 40px 11px 16px',
                                    borderRadius: '12px',
                                    backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.04)',
                                    border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(56, 189, 248, 0.25)',
                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                    fontSize: '13px',
                                    fontFamily: 'Cairo, sans-serif',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                }}
                            />
                            <Search
                                size={17}
                                color={isLight ? '#64748B' : '#38BDF8'}
                                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)' }}
                            />
                        </div>

                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                setPage(1);
                            }}
                            style={{
                                padding: '11px 14px',
                                borderRadius: '12px',
                                backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.04)',
                                border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                                color: isLight ? '#0F172A' : '#FFFFFF',
                                fontSize: '13px',
                                fontWeight: '700',
                                fontFamily: 'Cairo, sans-serif',
                                outline: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            <option value="">جميع الحالات</option>
                            <option value="active">مفعل</option>
                            <option value="banned">محظور / مرفوض</option>
                            <option value="suspended">معلق</option>
                        </select>

                        <button
                            type="submit"
                            style={{
                                padding: '11px 22px',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                color: '#07090E',
                                border: 'none',
                                fontSize: '13px',
                                fontWeight: '900',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontFamily: 'Cairo, sans-serif',
                            }}
                        >
                            <Search size={15} />
                            <span>بحث</span>
                        </button>
                    </form>
                </div>

                {/* ═══ User Cards List ═══ */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                    {loading && (!Array.isArray(users?.data) || (users?.data?.length || 0) === 0) ? (
                        <div
                            style={{
                                padding: '60px 20px',
                                textAlign: 'center',
                                backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                                borderRadius: '20px',
                                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                            }}
                        >
                            <RefreshCw className="animate-spin" size={32} color="#D4A537" style={{ margin: '0 auto 12px' }} />
                            <p style={{ margin: 0, fontSize: '14px', color: isLight ? '#64748B' : '#94A3B8' }}>جاري تحميل المستخدمين...</p>
                        </div>
                    ) : (!Array.isArray(users?.data) || (users?.data?.length || 0) === 0) ? (
                        <div
                            style={{
                                padding: '60px 20px',
                                textAlign: 'center',
                                backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                                borderRadius: '20px',
                                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                            }}
                        >
                            <Users size={40} color={isLight ? '#94A3B8' : '#334155'} style={{ margin: '0 auto 14px' }} />
                            <h3 style={{ margin: '0 0 6px', fontSize: '17px', fontWeight: '800' }}>لا يوجد مستخدمين مطابقين</h3>
                            <p style={{ margin: 0, fontSize: '13px', color: isLight ? '#64748B' : '#94A3B8' }}>جرّب تغيير كلمات البحث أو الفلاتر أعلاه.</p>
                        </div>
                    ) : (
                        (users?.data || []).map((u) => u && (
                            <AdminUserCard
                                key={u.id}
                                user={u}
                                onOpenDetails={handleOpenDetails}
                                isLight={isLight}
                            />
                        ))
                    )}
                </div>

                {/* ═══ Pagination Bar ═══ */}
                {Number(users?.total || 0) > 0 && (
                    <div
                        style={{
                            backgroundColor: isLight ? '#FFFFFF' : '#0B0F19',
                            border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '16px',
                            padding: '12px 18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '12px',
                            flexWrap: 'wrap',
                        }}
                    >
                        <span style={{ fontSize: '13px', color: isLight ? '#64748B' : '#94A3B8', fontWeight: '700' }}>
                            صفحة {users?.current_page || 1} من {users?.last_page || 1} — إجمالي {users?.total || 0} مستخدم
                        </span>

                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                                type="button"
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={(users?.current_page || 1) <= 1 || loading}
                                style={{
                                    padding: '7px 16px',
                                    borderRadius: '10px',
                                    backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                    border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.1)',
                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                    fontSize: '13px',
                                    fontWeight: '800',
                                    cursor: users.current_page <= 1 ? 'not-allowed' : 'pointer',
                                    opacity: users.current_page <= 1 ? 0.4 : 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    fontFamily: 'Cairo, sans-serif',
                                }}
                            >
                                <span>السابق</span>
                                <ChevronRight size={15} />
                            </button>

                            <button
                                type="button"
                                onClick={() => setPage((p) => Math.min(users?.last_page || 1, p + 1))}
                                disabled={(users?.current_page || 1) >= (users?.last_page || 1) || loading}
                                style={{
                                    padding: '7px 16px',
                                    borderRadius: '10px',
                                    backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                                    border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.1)',
                                    color: isLight ? '#0F172A' : '#FFFFFF',
                                    fontSize: '13px',
                                    fontWeight: '800',
                                    cursor: (users?.current_page || 1) >= (users?.last_page || 1) ? 'not-allowed' : 'pointer',
                                    opacity: (users?.current_page || 1) >= (users?.last_page || 1) ? 0.4 : 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    fontFamily: 'Cairo, sans-serif',
                                }}
                            >
                                <ChevronLeft size={15} />
                                <span>التالي</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* ═══ Isolated User Details Modal ═══ */}
            {selectedUser && (
                <AdminUserDetailsModal
                    user={selectedUser}
                    onClose={handleCloseDetails}
                    onUserUpdated={handleUserUpdated}
                    isLight={isLight}
                />
            )}
        </div>
    );
}
