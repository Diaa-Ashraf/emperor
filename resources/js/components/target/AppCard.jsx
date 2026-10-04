import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Sparkles, ChevronLeft, ArrowLeft, ShieldCheck, Zap, Smartphone } from 'lucide-react';
import Button from '../ui/Button';
import { formatImageUrl } from '../../utils/imageHelper';

export default function AppCard({ app }) {
    if (!app) return null;

    const rates = app.rates || [];
    const bestRate = rates.length > 0 ? rates[0] : null;

    return (
        <div style={{
            background: 'linear-gradient(135deg, rgba(26, 26, 36, 0.9) 0%, rgba(18, 18, 26, 0.95) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '20px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.35)',
            transition: 'all 0.25s ease',
            position: 'relative',
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.borderColor = '#38BDF8';
            e.currentTarget.style.boxShadow = '0 12px 35px rgba(56, 189, 248, 0.25)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.25)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.35)';
        }}
        >
            {/* Top Media */}
            <div style={{
                position: 'relative',
                height: '130px',
                background: 'linear-gradient(135deg, #09122C 0%, #15173D 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}>
                {(() => {
                    const imgSrc = formatImageUrl(app.image_url || app.image);
                    return imgSrc ? (
                        <img
                            src={imgSrc}
                            alt={app.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Smartphone size={40} color="#38BDF8" strokeWidth={1.8} />
                        </div>
                    );
                })()}

                {/* Instant Cash Badge */}
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(9, 18, 44, 0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                    color: '#38BDF8',
                    padding: '3px 8px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                }}>
                    <Zap size={12} />
                    <span>سحب كاش فوري</span>
                </div>
            </div>

            {/* Content Body */}
            <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                    <h4 style={{ margin: '0 0 6px', fontSize: '17px', fontWeight: '800', color: '#FFFFFF' }}>
                        {app.name}
                    </h4>

                    <p style={{
                        margin: '0 0 14px',
                        fontSize: '13px',
                        color: '#9E9EA8',
                        lineHeight: '1.4',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}>
                        {app.description || 'بيع كوينز وتارجت التطبيق بأعلى سعر كاش وتحويل فوري'}
                    </p>
                </div>

                {/* Bottom Action & Agency info */}
                <div style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingTop: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <div>
                        <span style={{ fontSize: '11px', color: '#8E8E98', display: 'block' }}>
                            الوكالة المعتمدة
                        </span>
                        <strong style={{ fontSize: '13px', color: '#38BDF8' }}>
                            {app.agency_id || 'وكالة إمبراطور'}
                        </strong>
                    </div>

                    <Link to={`/target/sell?app_id=${app.id}`} style={{ textDecoration: 'none' }}>
                        <Button
                            variant="primary"
                            size="sm"
                            icon={DollarSign}
                            style={{
                                background: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
                                color: '#FFFFFF',
                                border: 'none',
                                boxShadow: '0 4px 15px rgba(56, 189, 248, 0.3)',
                            }}
                        >
                            بيع التارجت
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
