import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    footer,
    maxWidth = '520px',
}) {
    const { theme } = useTheme();
    const isLight = theme === 'light';

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                backgroundColor: isLight ? 'rgba(15, 23, 42, 0.65)' : 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(8px)',
                animation: 'fadeIn 0.2s ease-out',
                direction: 'rtl',
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: isLight
                        ? '#FFFFFF'
                        : 'linear-gradient(135deg, rgba(28, 28, 36, 0.98) 0%, rgba(18, 18, 24, 0.98) 100%)',
                    border: isLight ? '1.5px solid rgba(212, 165, 55, 0.45)' : '1px solid rgba(212, 165, 55, 0.25)',
                    borderRadius: '18px',
                    width: '100%',
                    maxWidth,
                    boxShadow: isLight
                        ? '0 20px 50px rgba(0, 0, 0, 0.15), 0 0 20px rgba(212, 165, 55, 0.1)'
                        : '0 20px 50px rgba(0, 0, 0, 0.7)',
                    overflow: 'hidden',
                    animation: 'slideIn 0.25s ease-out',
                    color: isLight ? '#0F172A' : '#FFFFFF',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {title && (
                    <div
                        style={{
                            padding: '18px 24px',
                            borderBottom: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: isLight ? '#9A7210' : '#D4A537' }}>
                            {title}
                        </h3>
                        <button
                            onClick={onClose}
                            style={{
                                background: isLight ? '#F1F5F9' : 'transparent',
                                border: isLight ? '1px solid #CBD5E1' : 'none',
                                borderRadius: isLight ? '8px' : '0',
                                color: isLight ? '#475569' : '#9E9EA8',
                                fontSize: '20px',
                                cursor: 'pointer',
                                padding: '4px',
                                lineHeight: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <X size={20} />
                        </button>
                    </div>
                )}
                <div style={{ padding: '24px', maxHeight: '75vh', overflowY: 'auto' }}>
                    {children}
                </div>
                {footer && (
                    <div
                        style={{
                            padding: '16px 24px',
                            borderTop: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            gap: '12px',
                            background: isLight ? '#F8FAFC' : 'rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}
