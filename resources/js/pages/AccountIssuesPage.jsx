import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Send, CheckCircle2, ShieldAlert, ArrowLeft, ArrowRight, UserCheck } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function AccountIssuesPage() {
    const { user, isAuthenticated } = useAuth();
    const { isRtl } = useLanguage();

    const issueTypes = [
        'تسجيل الدخول',
        'تفعيل الحساب',
        'كلمة المرور',
        'بيانات الحساب',
        'حساب مرفوض',
        'مشاكل شحن المحفظة',
        'مشكلة في طلب شحن',
        'مشكلة في بيع التارجت',
        'أخرى',
    ];

    const [selectedType, setSelectedType] = useState(issueTypes[0]);
    const [details, setDetails] = useState('');
    const [userPhone, setUserPhone] = useState(user?.phone || '');
    const [userEmail, setUserEmail] = useState(user?.email || '');

    // WhatsApp Support Number (Configurable)
    const whatsappSupportNumber = '201000000000'; // Replace with actual support number

    // Live Message Construction
    const formattedMessage = `*رسالة دعم فني إلى إدارة منصة إمبراطور*
----------------------------------------
*نوع الشكوى:* ${selectedType}
*تفاصيل المشكلة:* ${details.trim() || 'لم تتم كتابة تفاصيل إضافية'}
*البريد الإلكتروني:* ${userEmail.trim() || (user?.email || 'غير محدد')}
*رقم الهاتف:* ${userPhone.trim() || (user?.phone || 'غير محدد')}
*معرّف الحساب:* ${user?.id ? `EMP-${user.id}` : 'زائر / غير مسجل'}
----------------------------------------
_مرسل عبر صفحة مشاكل الحساب الرسمية_`;

    const handleSendWhatsApp = (e) => {
        e.preventDefault();
        const encoded = encodeURIComponent(formattedMessage);
        const url = `https://wa.me/${whatsappSupportNumber}?text=${encoded}`;
        window.open(url, '_blank');
    };

    return (
        <MainLayout>
            <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '40px' }}>
                {/* Header Back Bar */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '24px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#8E8E98' }}>
                        <Link to="/" style={{ color: 'var(--gold-400)', textDecoration: 'none' }}>الرئيسية</Link>
                        <span>/</span>
                        <span style={{ color: '#CBD5E1' }}>مشاكل الحساب والشكاوى</span>
                    </div>

                    <Link
                        to="/"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#D1D1DB',
                            fontSize: '13px',
                            fontWeight: '600',
                            textDecoration: 'none',
                        }}
                    >
                        <span>العودة للرئيسية</span>
                        {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                    </Link>
                </div>

                <div className="responsive-grid-2col" style={{
                    gap: '24px',
                    alignItems: 'start',
                }}>
                    {/* Left Form: Select Issue & Input Details (Matches Screenshot 4) */}
                    <div style={{
                        background: 'linear-gradient(145deg, #14141A 0%, #0D0D12 100%)',
                        border: '1px solid rgba(212, 165, 55, 0.3)',
                        borderRadius: '24px',
                        padding: '28px',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '4px 12px',
                                borderRadius: '10px',
                                background: 'rgba(37, 211, 102, 0.12)',
                                border: '1px solid rgba(37, 211, 102, 0.3)',
                                color: '#25D366',
                                fontSize: '12px',
                                fontWeight: '700',
                            }}>
                                <MessageCircle size={14} />
                                <span>الشكاوى والتواصل السريع</span>
                            </div>
                        </div>

                        <h1 style={{
                            fontSize: '24px',
                            fontWeight: '900',
                            color: '#FFFFFF',
                            margin: '0 0 8px',
                        }}>
                            مشاكل الحساب
                        </h1>
                        <p style={{
                            color: '#9E9EA8',
                            fontSize: '13.5px',
                            margin: '0 0 24px',
                            lineHeight: '1.6',
                        }}>
                            اختر مشكلة الحساب، وسنجهز رسالة واضحة ومباشرة لإرسالها لإدارة المنصة عبر واتساب.
                        </p>

                        {/* Issue Type Chips */}
                        <div style={{ marginBottom: '22px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '13px',
                                fontWeight: '800',
                                color: 'var(--gold-400)',
                                marginBottom: '10px',
                            }}>
                                اختر نوع الشكوى
                            </label>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                                gap: '8px',
                            }}>
                                {issueTypes.map((type) => {
                                    const isSelected = selectedType === type;
                                    return (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setSelectedType(type)}
                                            style={{
                                                padding: '10px 12px',
                                                borderRadius: '12px',
                                                background: isSelected
                                                    ? 'rgba(212, 165, 55, 0.18)'
                                                    : 'rgba(255, 255, 255, 0.03)',
                                                border: `1.5px solid ${isSelected ? 'var(--gold-400)' : 'rgba(255, 255, 255, 0.08)'}`,
                                                color: isSelected ? 'var(--gold-100)' : '#CBD5E1',
                                                fontSize: '12.5px',
                                                fontWeight: isSelected ? '800' : '600',
                                                cursor: 'pointer',
                                                textAlign: 'center',
                                                transition: 'all 0.2s ease',
                                                fontFamily: 'var(--font-cairo)',
                                            }}
                                        >
                                            {type}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Details Textarea */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '13px',
                                fontWeight: '800',
                                color: 'var(--gold-400)',
                                marginBottom: '8px',
                            }}>
                                الشكوى أو تفاصيل الرسالة
                            </label>
                            <textarea
                                rows={4}
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                                placeholder="اكتب تفاصيل الشكوى أو المشكلة التي تواجهك داخل الموقع هنا..."
                                style={{
                                    width: '100%',
                                    background: '#0B0B0E',
                                    border: '1px solid rgba(255, 255, 255, 0.12)',
                                    borderRadius: '14px',
                                    padding: '14px',
                                    color: '#FFFFFF',
                                    fontSize: '13.5px',
                                    fontFamily: 'var(--font-cairo)',
                                    outline: 'none',
                                    resize: 'vertical',
                                    lineHeight: '1.6',
                                    boxSizing: 'border-box',
                                }}
                            />
                        </div>

                        {/* Optional Phone / Email Inputs if not logged in */}
                        {!isAuthenticated && (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '12px',
                                marginBottom: '20px',
                            }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', color: '#A0A0B0', marginBottom: '6px' }}>رقم هاتفك:</label>
                                    <input
                                        type="text"
                                        placeholder="010xxxxxxxx"
                                        value={userPhone}
                                        onChange={(e) => setUserPhone(e.target.value)}
                                        style={{
                                            width: '100%',
                                            background: '#0B0B0E',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            borderRadius: '10px',
                                            padding: '10px 12px',
                                            color: '#FFF',
                                            fontSize: '13px',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', color: '#A0A0B0', marginBottom: '6px' }}>البريد الإلكتروني:</label>
                                    <input
                                        type="email"
                                        placeholder="example@email.com"
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}
                                        style={{
                                            width: '100%',
                                            background: '#0B0B0E',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            borderRadius: '10px',
                                            padding: '10px 12px',
                                            color: '#FFF',
                                            fontSize: '13px',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="button"
                            onClick={handleSendWhatsApp}
                            className="emperor-btn-primary"
                            style={{
                                width: '100%',
                                padding: '14px',
                                borderRadius: '14px',
                                fontSize: '15px',
                                fontWeight: '800',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                            }}
                        >
                            <Send size={18} />
                            <span>إرسال الرسالة إلى إدارة الموقع</span>
                        </button>
                    </div>

                    {/* Right Side: Live Message Preview Card (Matches Screenshot 4) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{
                            background: 'linear-gradient(145deg, #121218 0%, #0A0A0E 100%)',
                            border: '1px solid rgba(212, 165, 55, 0.2)',
                            borderRadius: '24px',
                            padding: '24px',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '16px',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                                paddingBottom: '12px',
                            }}>
                                <h3 style={{
                                    margin: 0,
                                    fontSize: '16px',
                                    fontWeight: '800',
                                    color: 'var(--gold-200)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                }}>
                                    <span>معاينة الرسالة</span>
                                </h3>
                                <span style={{ fontSize: '11px', color: '#8E8E98' }}>تحديث لحظي أثناء الكتابة</span>
                            </div>

                            <p style={{
                                fontSize: '12.5px',
                                color: '#A0A0B0',
                                margin: '0 0 16px',
                                lineHeight: '1.6',
                            }}>
                                سيظهر النص بهذا الشكل لصاحب الموقع داخل واتساب:
                            </p>

                            {/* Message Box */}
                            <div style={{
                                background: '#050508',
                                border: '1px solid rgba(212, 165, 55, 0.25)',
                                borderRadius: '16px',
                                padding: '18px',
                                fontFamily: 'var(--font-cairo)',
                                fontSize: '13px',
                                color: '#E2E8F0',
                                lineHeight: '1.8',
                                whiteSpace: 'pre-line',
                            }}>
                                <div style={{ fontWeight: '800', color: 'var(--gold-300)', marginBottom: '8px' }}>
                                    رسالة إلى صاحب الموقع
                                </div>
                                <div style={{ color: '#CBD5E1' }}>
                                    <strong>نوع الشكوى:</strong> {selectedType}
                                </div>
                                <div style={{ color: '#CBD5E1', marginTop: '4px' }}>
                                    <strong>تفاصيل المشكلة:</strong> {details.trim() || '—'}
                                </div>
                                <div style={{ color: '#94A3B8', marginTop: '4px', fontSize: '12px' }}>
                                    <strong>بيانات الحساب:</strong> {user?.name ? `${user.name} (ID: EMP-${user.id})` : (userPhone || userEmail || 'زائر')}
                                </div>
                            </div>
                        </div>

                        {/* WhatsApp Dispatch Guarantee Card */}
                        <div style={{
                            background: 'rgba(37, 211, 102, 0.06)',
                            border: '1px solid rgba(37, 211, 102, 0.25)',
                            borderRadius: '20px',
                            padding: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px',
                        }}>
                            <div style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '14px',
                                background: 'rgba(37, 211, 102, 0.15)',
                                color: '#25D366',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                            }}>
                                <MessageCircle size={24} />
                            </div>
                            <div>
                                <h4 style={{ margin: '0 0 3px', fontSize: '14px', fontWeight: '800', color: '#FFFFFF' }}>
                                    سيتم فتح واتساب برسالة موجهة لصاحب الموقع
                                </h4>
                                <span style={{ fontSize: '12px', color: '#A0A0B0' }}>
                                    فريق الدعم الفني متواجد لمساعدتك وحل أي مشكلة تقنية فوراً
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
