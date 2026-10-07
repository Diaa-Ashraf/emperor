import React from 'react';
import { Package } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export default function EmptyState({
    icon: Icon,
    title = 'لا توجد بيانات حالياً',
    description,
    action,
    actionText,
    onAction,
    style = {},
}) {
    const { theme } = useTheme();
    const isLight = theme === 'light';

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '48px 24px',
                background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.02)',
                borderRadius: '16px',
                border: isLight ? '1px dashed #CBD5E1' : '1px dashed rgba(255, 255, 255, 0.12)',
                height: "64%",
                boxShadow: isLight ? '0 4px 16px rgba(0,0,0,0.03)' : 'none',
                ...style,
            }}
        >
            <div
                style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: isLight ? 'rgba(212, 165, 55, 0.12)' : 'rgba(212, 165, 55, 0.1)',
                    border: isLight ? '1px solid rgba(212, 165, 55, 0.35)' : '1px solid rgba(212, 165, 55, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    color: '#D4A537',
                }}
            >
                {Icon ? <Icon size={28} /> : <Package size={28} />}
            </div>
            <h4 style={{
                margin: '0 0 8px',
                fontSize: '17px',
                fontWeight: '800',
                color: isLight ? '#0F172A' : '#FFFFFF',
            }}>
                {title}
            </h4>
            {description && (
                <p style={{
                    margin: '0 0 20px',
                    fontSize: '14px',
                    color: isLight ? '#475569' : '#CBD5E1',
                    maxWidth: '360px',
                    lineHeight: '1.6',
                    fontWeight: '600',
                }}>
                    {description}
                </p>
            )}
            {action && <div>{action}</div>}
            {!action && actionText && onAction && (
                <button
                    type="button"
                    onClick={onAction}
                    style={{
                        background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                        color: '#0A0A0E',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '10px 22px',
                        fontSize: '14px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(212, 165, 55, 0.3)',
                    }}
                >
                    {actionText}
                </button>
            )}
        </div>
    );
}
