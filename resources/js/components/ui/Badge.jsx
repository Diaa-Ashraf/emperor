import React from 'react';

export default function Badge({
    children,
    variant = 'default', // success, danger, warning, info, gold, default
    size = 'md', // sm, md
    style = {},
    className = '',
}) {
    const variantStyles = {
        success: {
            background: 'rgba(34, 197, 94, 0.12)',
            color: '#4ADE80',
            border: '1px solid rgba(34, 197, 94, 0.3)',
        },
        danger: {
            background: 'rgba(239, 68, 68, 0.12)',
            color: '#F87171',
            border: '1px solid rgba(239, 68, 68, 0.3)',
        },
        warning: {
            background: 'rgba(245, 158, 11, 0.12)',
            color: '#FBBF24',
            border: '1px solid rgba(245, 158, 11, 0.3)',
        },
        info: {
            background: 'rgba(59, 130, 246, 0.12)',
            color: '#60A5FA',
            border: '1px solid rgba(59, 130, 246, 0.3)',
        },
        gold: {
            background: 'rgba(212, 165, 55, 0.14)',
            color: '#F3E5AB',
            border: '1px solid rgba(212, 165, 55, 0.4)',
        },
        default: {
            background: 'rgba(255, 255, 255, 0.08)',
            color: '#D1D5DB',
            border: '1px solid rgba(255, 255, 255, 0.12)',
        },
    };

    const sizeStyles = {
        sm: { padding: '3px 8px', fontSize: '11px', borderRadius: '6px' },
        md: { padding: '5px 12px', fontSize: '13px', borderRadius: '8px' },
    };

    return (
        <span
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontWeight: '700',
                lineHeight: 1,
                fontFamily: 'Cairo, sans-serif',
                ...(sizeStyles[size] || sizeStyles.md),
                ...(variantStyles[variant] || variantStyles.default),
                ...style,
            }}
            className={className}
        >
            {children}
        </span>
    );
}
