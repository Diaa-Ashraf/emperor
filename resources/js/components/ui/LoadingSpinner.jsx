import React from 'react';

export default function LoadingSpinner({
    size = 'md', // sm, md, lg
    text = 'جاري التحميل...',
    fullScreen = false,
}) {
    const sizeMap = {
        sm: { width: '20px', height: '20px', border: '2px' },
        md: { width: '36px', height: '36px', border: '3px' },
        lg: { width: '56px', height: '56px', border: '4px' },
    };

    const currentSize = sizeMap[size] || sizeMap.md;

    const content = (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '24px',
            fontFamily: 'Cairo, sans-serif',
        }}>
            <div
                style={{
                    width: currentSize.width,
                    height: currentSize.height,
                    border: `${currentSize.border} solid rgba(212, 165, 55, 0.2)`,
                    borderTopColor: '#D4A537',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                }}
            />
            {text && (
                <span style={{ color: '#D4A537', fontSize: size === 'sm' ? '12px' : '14px', fontWeight: '600' }}>
                    {text}
                </span>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(13, 13, 15, 0.85)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
            }}>
                {content}
            </div>
        );
    }

    return content;
}
