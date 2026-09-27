import React from 'react';
import { Check } from 'lucide-react';

export default function DepositStepper({ currentStep = 1 }) {
    const steps = [
        { number: 1, title: 'طريقة الدفع' },
        { number: 2, title: 'المبلغ والتحويل' },
        { number: 3, title: 'إثبات الدفع' },
        { number: 4, title: 'تأكيد الإيداع' },
    ];

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            marginBottom: '36px',
            padding: '0 10px',
        }}>
            {/* Connecting background line */}
            <div style={{
                position: 'absolute',
                top: '20px',
                right: '40px',
                left: '40px',
                height: '2px',
                background: 'rgba(255, 255, 255, 0.1)',
                zIndex: 0,
            }} />

            {/* Active connecting progress line */}
            <div style={{
                position: 'absolute',
                top: '20px',
                right: '40px',
                height: '2px',
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                background: 'linear-gradient(90deg, #D4A537, #AA7C11)',
                zIndex: 0,
                transition: 'width 0.4s ease',
            }} />

            {steps.map((step) => {
                const isCompleted = step.number < currentStep;
                const isCurrent = step.number === currentStep;

                return (
                    <div
                        key={step.number}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px',
                            zIndex: 1,
                        }}
                    >
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: isCompleted || isCurrent
                                ? 'linear-gradient(135deg, #F3E5AB 0%, #D4A537 100%)'
                                : '#1E1E28',
                            border: `2px solid ${isCurrent ? '#FFFFFF' : isCompleted ? '#D4A537' : 'rgba(255, 255, 255, 0.15)'}`,
                            color: isCompleted || isCurrent ? '#0D0D0F' : '#8E8E98',
                            fontWeight: '800',
                            fontSize: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: isCurrent ? '0 0 15px rgba(212, 165, 55, 0.5)' : 'none',
                            transition: 'all 0.3s ease',
                        }}>
                            {isCompleted ? <Check size={18} strokeWidth={3} /> : step.number}
                        </div>

                        <span style={{
                            fontSize: '12px',
                            fontWeight: isCurrent ? '800' : '600',
                            color: isCurrent ? '#D4A537' : isCompleted ? '#FFFFFF' : '#8E8E98',
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                        }}>
                            {step.title}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
