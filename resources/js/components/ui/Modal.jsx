import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    footer,
    maxWidth = '520px',
}) {
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
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(8px)',
                animation: 'fadeIn 0.2s ease-out',
                direction: 'rtl',
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: 'linear-gradient(135deg, rgba(28, 28, 36, 0.98) 0%, rgba(18, 18, 24, 0.98) 100%)',
                    border: '1px solid rgba(212, 165, 55, 0.25)',
                    borderRadius: '18px',
                    width: '100%',
                    maxWidth,
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
                    overflow: 'hidden',
                    animation: 'slideIn 0.25s ease-out',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {title && (
                    <div
                        style={{
                            padding: '18px 24px',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#D4A537' }}>
                            {title}
                        </h3>
                        <button
                            onClick={onClose}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#9E9EA8',
                                fontSize: '20px',
                                cursor: 'pointer',
                                padding: '4px',
                                lineHeight: 1,
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
                            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            gap: '12px',
                            background: 'rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}
