import React from 'react';

export default function Button({
    children,
    type = 'button',
    variant = 'primary', // primary, secondary, outline, danger, ghost
    size = 'md', // sm, md, lg
    disabled = false,
    loading = false,
    icon: Icon,
    iconPosition = 'start',
    onClick,
    className = '',
    style = {},
    ...props
}) {
    const baseStyles = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontWeight: '700',
        borderRadius: '10px',
        border: 'none',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled || loading ? 0.65 : 1,
        transition: 'all 0.2s ease',
        textDecoration: 'none',
        outline: 'none',
        fontFamily: 'Cairo, sans-serif',
    };

    const sizeStyles = {
        sm: { padding: '6px 12px', fontSize: '13px' },
        md: { padding: '10px 20px', fontSize: '15px' },
        lg: { padding: '14px 28px', fontSize: '17px' },
    };

    const variantStyles = {
        primary: {
            background: 'linear-gradient(135deg, #F3E5AB 0%, #D4A537 50%, #AA7C11 100%)',
            color: '#0D0D0F',
            boxShadow: '0 4px 15px rgba(212, 165, 55, 0.3)',
        },
        secondary: {
            background: '#24242E',
            color: '#FFFFFF',
            border: '1px solid #333340',
        },
        outline: {
            background: 'transparent',
            color: '#D4A537',
            border: '1px solid rgba(212, 165, 55, 0.4)',
        },
        danger: {
            background: 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)',
            color: '#FFFFFF',
            boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)',
        },
        ghost: {
            background: 'transparent',
            color: '#A0A0A8',
        },
    };

    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            style={{
                ...baseStyles,
                ...(sizeStyles[size] || sizeStyles.md),
                ...(variantStyles[variant] || variantStyles.primary),
                ...style,
            }}
            className={className}
            {...props}
        >
            {loading ? (
                <span style={{
                    width: '18px',
                    height: '18px',
                    border: '2px solid currentColor',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 0.6s linear infinite',
                    display: 'inline-block',
                }} />
            ) : (
                <>
                    {Icon && iconPosition === 'start' && <Icon size={size === 'sm' ? 16 : 18} />}
                    {children}
                    {Icon && iconPosition === 'end' && <Icon size={size === 'sm' ? 16 : 18} />}
                </>
            )}
        </button>
    );
}
