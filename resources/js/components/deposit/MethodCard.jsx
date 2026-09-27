import React from 'react';
import { Check, CreditCard, Smartphone, Building, DollarSign } from 'lucide-react';

export default function MethodCard({ method, isSelected, onSelect }) {
    if (!method) return null;

    const getIconComponent = (type) => {
        switch (type) {
            case 'wallet':
            case 'vodafone_cash':
            case 'orange_cash':
            case 'etisalat_cash':
            case 'instapay':
                return Smartphone;
            case 'bank':
                return Building;
            case 'crypto':
            case 'usdt':
                return DollarSign;
            default:
                return CreditCard;
        }
    };

    const IconComp = getIconComponent(method.type || method.code);

    const minAmount = Number(method.min_amount || 10).toLocaleString('en-US');
    const maxAmount = Number(method.max_amount || 50000).toLocaleString('en-US');

    const hasFee = Number(method.fixed_fee || 0) > 0 || Number(method.percent_fee || 0) > 0;
    const feeText = hasFee
        ? `رسوم: ${method.percent_fee ? `${method.percent_fee}%` : ''} ${method.fixed_fee ? `+ ${method.fixed_fee} ج.م` : ''}`
        : 'بدون أي رسوم إضافية';

    return (
        <div
            onClick={() => onSelect(method)}
            style={{
                background: isSelected
                    ? 'linear-gradient(135deg, rgba(212, 165, 55, 0.2) 0%, rgba(170, 124, 17, 0.25) 100%)'
                    : 'rgba(26, 26, 36, 0.7)',
                border: `2px solid ${isSelected ? '#D4A537' : 'rgba(255, 255, 255, 0.1)'}`,
                borderRadius: '18px',
                padding: '20px 18px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                boxShadow: isSelected ? '0 10px 30px rgba(212, 165, 55, 0.2)' : '0 4px 15px rgba(0, 0, 0, 0.2)',
            }}
            onMouseEnter={(e) => {
                if (!isSelected) {
                    e.currentTarget.style.borderColor = 'rgba(212, 165, 55, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                }
            }}
            onMouseLeave={(e) => {
                if (!isSelected) {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                }
            }}
        >
            {isSelected && (
                <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: '#D4A537',
                    color: '#0D0D0F',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Check size={14} strokeWidth={3} />
                </div>
            )}

            {/* Top row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{
                    fontSize: '28px',
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                }}>
                    <IconComp size={22} color="#F5D061" />
                </div>

                <div>
                    <h4 style={{ margin: '0 0 2px', fontSize: '16px', fontWeight: '800', color: '#FFFFFF' }}>
                        {method.name}
                    </h4>
                    <span style={{ fontSize: '11px', color: '#D4A537', fontWeight: '600' }}>
                        {feeText}
                    </span>
                </div>
            </div>

            {/* Limits */}
            <div style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                paddingTop: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                color: '#8E8E98',
            }}>
                <span>الحد الأدنى: <strong style={{ color: '#E2E8F0' }}>{minAmount} ج.م</strong></span>
                <span>الحد الأقصى: <strong style={{ color: '#E2E8F0' }}>{maxAmount} ج.م</strong></span>
            </div>
        </div>
    );
}
