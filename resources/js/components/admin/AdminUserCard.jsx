import React from 'react';
import { Wallet, Eye } from 'lucide-react';

const AdminUserCard = React.memo(function AdminUserCard({ user, onOpenDetails, isLight }) {
    const isUserActive = user.status === 'active';
    const userBalance = Number(user.balance || 0).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
    const publicId = user.public_id || `usr_${user.id}`;
    const initial = user.name?.charAt(0)?.toUpperCase() || 'U';

    return (
        <div
            style={{
                backgroundColor: isLight ? '#FFFFFF' : 'rgba(11, 15, 25, 0.95)',
                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '20px',
                padding: '16px 20px',
                boxShadow: isLight ? '0 4px 15px rgba(0, 0, 0, 0.04)' : '0 8px 24px rgba(0, 0, 0, 0.45)',
                contain: 'content',
            }}
        >
            {/* Top Row: User Avatar & Info on Right, Balance Badge on Left */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '12px',
                    marginBottom: '14px',
                }}
            >
                {/* Right: Avatar + Name + Email + ID */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
                    {/* Avatar Circle */}
                    <div
                        style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '50%',
                            background: isLight ? '#E2E8F0' : 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                            border: '2px solid rgba(245, 158, 11, 0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            overflow: 'hidden',
                            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.25)',
                        }}
                    >
                        {user.avatar ? (
                            <img
                                src={user.avatar}
                                alt={user.name}
                                loading="lazy"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            <span style={{ fontSize: '18px', fontWeight: '900', color: '#FFFFFF' }}>
                                {initial}
                            </span>
                        )}
                    </div>

                    <div style={{ minWidth: 0 }}>
                        <h3
                            style={{
                                margin: '0 0 3px',
                                fontSize: '16px',
                                fontWeight: '900',
                                color: isLight ? '#0F172A' : '#FFFFFF',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {user.name}
                        </h3>
                        <p
                            style={{
                                margin: '0 0 3px',
                                fontSize: '12.5px',
                                color: isLight ? '#64748B' : '#94A3B8',
                                direction: 'ltr',
                                textAlign: 'right',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {user.email}
                        </p>
                        <span
                            style={{
                                fontSize: '11px',
                                fontFamily: 'monospace',
                                color: isLight ? '#94A3B8' : '#64748B',
                                display: 'block',
                                direction: 'ltr',
                                textAlign: 'right',
                            }}
                        >
                            ID: {publicId}
                        </span>
                    </div>
                </div>

                {/* Left: Balance Pill Badge (Gold) */}
                <div
                    style={{
                        backgroundColor: isLight ? '#FEF3C7' : 'rgba(212, 165, 55, 0.12)',
                        border: '1px solid rgba(212, 165, 55, 0.4)',
                        borderRadius: '12px',
                        padding: '6px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        flexShrink: 0,
                    }}
                >
                    <Wallet size={13} color="#D4A537" />
                    <span
                        style={{
                            fontSize: '13px',
                            fontWeight: '900',
                            color: isLight ? '#92400E' : '#F5D061',
                        }}
                    >
                        {user.active_currency || 'EGP'} {userBalance}
                    </span>
                </div>
            </div>

            {/* Bottom Row: عرض التفاصيل Button on Right, مفعل Status Badge on Left */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: isLight ? '1px solid #F1F5F9' : '1px solid rgba(255, 255, 255, 0.05)',
                }}
            >
                <button
                    type="button"
                    onClick={() => onOpenDetails(user)}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '7px 16px',
                        borderRadius: '12px',
                        backgroundColor: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.04)',
                        border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.15)',
                        color: isLight ? '#0F172A' : '#FFFFFF',
                        fontSize: '13px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        fontFamily: 'Cairo, sans-serif',
                    }}
                >
                    <Eye size={15} />
                    <span>عرض التفاصيل</span>
                </button>

                {/* Status Pill Badge */}
                <div
                    style={{
                        padding: '4px 14px',
                        borderRadius: '20px',
                        backgroundColor: isUserActive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        border: `1px solid ${isUserActive ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
                        color: isUserActive ? '#10B981' : '#EF4444',
                        fontSize: '12.5px',
                        fontWeight: '800',
                    }}
                >
                    {isUserActive ? 'مفعل' : user.status === 'banned' ? 'محظور' : 'معلق'}
                </div>
            </div>
        </div>
    );
});

export default AdminUserCard;

