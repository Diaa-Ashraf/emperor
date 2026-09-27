import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

export default function FileUpload({
    label,
    error,
    helperText = 'الصيغ المدعومة: PNG, JPG, WEBP (الحد الأقصى 4MB)',
    accept = 'image/*',
    onChange,
    value,
    previewUrl: initialPreview,
}) {
    const [preview, setPreview] = useState(initialPreview || null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            if (onChange) {
                onChange(file);
            }
        }
    };

    const handleClear = (e) => {
        e.stopPropagation();
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        if (onChange) {
            onChange(null);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
            {label && (
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#E2E8F0' }}>
                    {label}
                </label>
            )}

            <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                    border: error ? '2px dashed #EF4444' : '2px dashed rgba(212, 165, 55, 0.35)',
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: preview ? 'rgba(212, 165, 55, 0.04)' : 'rgba(255, 255, 255, 0.02)',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                }}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />

                {preview ? (
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <img
                            src={preview}
                            alt="Preview"
                            style={{
                                maxHeight: '140px',
                                maxWidth: '100%',
                                borderRadius: '8px',
                                border: '1px solid rgba(212, 165, 55, 0.3)',
                                objectFit: 'cover',
                            }}
                        />
                        <button
                            type="button"
                            onClick={handleClear}
                            style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                background: '#EF4444',
                                color: '#FFF',
                                border: 'none',
                                borderRadius: '50%',
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                            }}
                        >
                            <X size={14} />
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            background: 'rgba(212, 165, 55, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#D4A537',
                        }}>
                            <Upload size={22} />
                        </div>
                        <span style={{ fontSize: '14px', fontWeight: '700', color: '#D4A537' }}>
                            اضغط لاختيار صورة الإيصال / الملف
                        </span>
                    </div>
                )}
            </div>

            {error && (
                <span style={{ fontSize: '12px', color: '#EF4444', fontWeight: '600' }}>
                    {Array.isArray(error) ? error[0] : error}
                </span>
            )}
            {helperText && !error && (
                <span style={{ fontSize: '12px', color: '#8E8E98' }}>
                    {helperText}
                </span>
            )}
        </div>
    );
}
