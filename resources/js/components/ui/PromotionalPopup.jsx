import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Sparkles, ExternalLink, ArrowRight, Crown } from 'lucide-react';
import { bannersApi } from '../../api/endpoints';

export default function PromotionalPopup() {
    const [popup, setPopup] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [dontShowAgain, setDontShowAgain] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        bannersApi.getBanners({ type: 'popup' })
            .then((res) => {
                if (!isMounted) return;
                const items = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
                if (items.length > 0) {
                    const activePopup = items[0];
                    const storageKey = `emperor_popup_dismissed_${activePopup.id}`;
                    
                    // Check if user dismissed it in this session or forever
                    const isDismissed = sessionStorage.getItem(storageKey) || localStorage.getItem(storageKey);
                    if (!isDismissed) {
                        setPopup(activePopup);
                        // Delay appearance slightly for a smooth, premium entrance
                        const timer = setTimeout(() => {
                            if (isMounted) setIsOpen(true);
                        }, 700);
                        return () => clearTimeout(timer);
                    }
                }
            })
            .catch((err) => {
                console.warn('Failed to load promotional popup:', err);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const handleClose = () => {
        if (!popup) return;
        const storageKey = `emperor_popup_dismissed_${popup.id}`;
        if (dontShowAgain) {
            localStorage.setItem(storageKey, 'true');
        } else {
            sessionStorage.setItem(storageKey, 'true');
        }
        setIsOpen(false);
    };

    const handleActionClick = () => {
        if (!popup) return;
        handleClose();

        if (!popup.link) return;

        const isExternal = popup.link.startsWith('http://') || popup.link.startsWith('https://');
        if (isExternal) {
            window.open(popup.link, '_blank', 'noopener,noreferrer');
        } else {
            navigate(popup.link);
        }
    };

    if (!isOpen || !popup) return null;

    const imageUrl = popup.image_url || popup.image;

    return (
        <div
            className="promotional-popup-backdrop"
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 99999,
                backgroundColor: 'rgba(5, 5, 8, 0.82)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                animation: 'fadeIn 0.25s ease-out',
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) handleClose();
            }}
        >
            <div
                className="promotional-popup-dialog"
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '460px',
                    borderRadius: '22px',
                    background: 'linear-gradient(180deg, rgba(24, 24, 34, 0.98) 0%, rgba(12, 12, 18, 0.99) 100%)',
                    border: '1.5px solid rgba(212, 165, 55, 0.55)',
                    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(212, 165, 55, 0.25)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    animation: 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    direction: 'rtl',
                }}
            >
                {/* Top Glowing Ambient Line */}
                <div style={{
                    height: '3px',
                    width: '100%',
                    background: 'linear-gradient(90deg, transparent 0%, #D4A537 50%, transparent 100%)',
                }} />

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    title="إغلاق النافذة"
                    style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        zIndex: 10,
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(0, 0, 0, 0.65)',
                        border: '1px solid rgba(212, 165, 55, 0.35)',
                        color: '#F5D061',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.backgroundColor = 'rgba(212, 165, 55, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.65)';
                    }}
                >
                    <X size={16} />
                </button>

                {/* Image Section (if provided) */}
                {imageUrl && (
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        height: '210px',
                        background: '#09090D',
                        overflow: 'hidden',
                        borderBottom: '1px solid rgba(212, 165, 55, 0.2)',
                    }}>
                        <img
                            src={imageUrl}
                            alt={popup.title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.5s ease',
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(12,12,18,0.9) 100%)',
                        }} />
                    </div>
                )}

                {/* Content Section */}
                <div style={{ padding: imageUrl ? '18px 22px 20px' : '28px 22px 20px', textAlign: 'center' }}>
                    {/* Crown / Badge */}
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        background: 'rgba(212, 165, 55, 0.15)',
                        border: '1px solid rgba(212, 165, 55, 0.35)',
                        color: '#F5D061',
                        fontSize: '11px',
                        fontWeight: '800',
                        marginBottom: '12px',
                    }}>
                        <Crown size={13} color="#F5D061" />
                        <span>إعلان مميز من إمبراطور</span>
                    </div>

                    {/* Title */}
                    <h3 style={{
                        fontSize: '19px',
                        fontWeight: '900',
                        color: '#FFFFFF',
                        margin: '0 0 8px',
                        lineHeight: 1.35,
                    }}>
                        {popup.title}
                    </h3>

                    {/* Subtitle / Description */}
                    {popup.subtitle && (
                        <p style={{
                            fontSize: '13px',
                            color: '#A0A0B0',
                            lineHeight: 1.6,
                            margin: '0 0 20px',
                        }}>
                            {popup.subtitle}
                        </p>
                    )}

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                        {popup.link && (
                            <button
                                onClick={handleActionClick}
                                style={{
                                    width: '100%',
                                    padding: '12px 18px',
                                    borderRadius: '13px',
                                    background: 'linear-gradient(135deg, #F5D061 0%, #D4A537 100%)',
                                    border: 'none',
                                    color: '#070709',
                                    fontSize: '14.5px',
                                    fontWeight: '900',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    boxShadow: '0 4px 18px rgba(212, 165, 55, 0.35)',
                                    transition: 'all 0.2s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 6px 24px rgba(212, 165, 55, 0.55)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 18px rgba(212, 165, 55, 0.35)';
                                }}
                            >
                                <span>عرض التفاصيل الآن</span>
                                <ArrowRight size={16} />
                            </button>
                        )}

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: '8px',
                            paddingTop: '10px',
                            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                            fontSize: '12px',
                            color: '#7E7E8E',
                        }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={dontShowAgain}
                                    onChange={(e) => setDontShowAgain(e.target.checked)}
                                    style={{
                                        accentColor: '#D4A537',
                                        cursor: 'pointer',
                                    }}
                                />
                                <span>عدم الإظهار مجدداً</span>
                            </label>

                            <button
                                onClick={handleClose}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#8E8E98',
                                    cursor: 'pointer',
                                    fontSize: '12px',
                                    fontWeight: '700',
                                    padding: '4px',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#F5D061'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#8E8E98'}
                            >
                                إغلاق
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
