import React from 'react';
import { User, Calendar, DollarSign, CheckCircle2 } from 'lucide-react';

export default function InvitedUserItem({ invitedUser }) {
    if (!invitedUser) return null;

    const commissionEarned = Number(invitedUser.total_commission_generated || 0).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    let formattedDate = invitedUser.created_at || '';
    try {
        if (invitedUser.created_at) {
            const d = new Date(invitedUser.created_at);
            formattedDate = d.toLocaleDateString('ar-EG', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });
        }
    } catch (e) {
        formattedDate = invitedUser.created_at;
    }

    // First letter of name
    const initial = (invitedUser.name || 'U').charAt(0).toUpperCase();

    return (
        <div style={{
            background: 'rgba(26, 26, 36, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '16px 20px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(212, 165, 55, 0.35)';
            e.currentTarget.style.background = 'rgba(26, 26, 36, 0.9)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.background = 'rgba(26, 26, 36, 0.7)';
        }}
        >
            {/* Left: Avatar & Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #F3E5AB 0%, #D4A537 100%)',
                    color: '#0D0D0F',
                    fontWeight: '900',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(212, 165, 55, 0.2)',
                    flexShrink: 0,
                }}>
                    {initial}
                </div>

                <div>
                    <h4 style={{ margin: '0 0 2px', fontSize: '15px', fontWeight: '800', color: '#FFFFFF' }}>
                        {invitedUser.name || 'مستخدم إمبراطور'}
                    </h4>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#8E8E98' }}>
                        <span>انضم بتاريخ: {formattedDate}</span>
                    </div>
                </div>
            </div>

            {/* Right: Commission Generated */}
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ fontSize: '11px', color: '#9E9EA8', marginBottom: '2px' }}>
                    إجمالي أرباحك منه
                </span>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                    <strong style={{ fontSize: '17px', color: '#4ADE80', fontWeight: '900' }}>
                        +{commissionEarned}
                    </strong>
                    <span style={{ fontSize: '11px', color: '#4ADE80', fontWeight: '700' }}>
                        ج.م
                    </span>
                </div>
            </div>
        </div>
    );
}
