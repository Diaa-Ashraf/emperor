import React from 'react';
import "../../../css/videoBackground.css";

export default function VideoBackground({ children, className = '' }) {
    return (
        <div className={`emperor-static-hero-bg ${className}`}>
            <div className="emperor-bg-glow" />
            <div className="video-content">
                {children}
            </div>
        </div>
    );
}