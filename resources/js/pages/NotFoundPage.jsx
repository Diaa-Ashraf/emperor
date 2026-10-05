import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, Gamepad2, ArrowRight } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
    return (
        <MainLayout>
            <div style={{
                maxWidth: '680px',
                margin: '40px auto 80px',
                textAlign: 'center',
                padding: 'clamp(20px, 4vw, 48px) 20px',
                background: 'linear-gradient(145deg, rgba(22, 22, 30, 0.95) 0%, rgba(12, 12, 16, 0.98) 100%)',
                border: '1.5px solid rgba(212, 165, 55, 0.3)',
                borderRadius: '28px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(212, 165, 55, 0.1)',
            }}>
                <div style={{
                    fontSize: 'clamp(60px, 12vw, 100px)',
                    fontWeight: '900',
                    background: 'linear-gradient(135deg, #F8E8B8 0%, #D4A537 50%, #AA7C11 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: '1',
                    marginBottom: '16px',
                    fontFamily: 'Outfit, Cairo, sans-serif',
                    textShadow: '0 10px 30px rgba(212, 165, 55, 0.2)',
                }}>
                    404
                </div>

                <h1 style={{
                    fontSize: 'clamp(22px, 4vw, 30px)',
                    fontWeight: '900',
                    color: '#FFFFFF',
                    margin: '0 0 12px',
                }}>
                    الصفحة غير موجودة
                </h1>

                <p style={{
                    fontSize: '15px',
                    color: '#9E9EA8',
                    maxWidth: '440px',
                    margin: '0 auto 32px',
                    lineHeight: '1.6',
                }}>
                    عذراً، يبدو أن الرابط الذي طلبته غير متوفر أو تم نقله. يمكنك العودة للصفحة الرئيسية وتصفح خدمات الشحن.
                </p>

                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '14px',
                }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Button variant="primary" size="lg" icon={Home}>
                            الرئيسية
                        </Button>
                    </Link>

                    <Link to="/category/games" style={{ textDecoration: 'none' }}>
                        <Button variant="secondary" size="lg" icon={Gamepad2}>
                            شحن الألعاب
                        </Button>
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
}
