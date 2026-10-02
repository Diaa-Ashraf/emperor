import { useEffect, useRef } from 'react';
import videoSource from '../../../../video/VideoBackgroundStock(720P_HD).mp4';
import "../../../css/videoBackground.css";

export default function VideoBackground({ children }) {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;

        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play();
                    observer.disconnect();
                    video.currentTime = 0;
                }
            },
            {
                threshold: 0.3,
            }
        );

        observer.observe(video);

        return () => observer.disconnect();
    }, []);
    return (
        <div className="video-background">
            <video ref={videoRef} autoPlay muted playsInline aria-hidden="true" tabIndex={-1}>
                <source src={videoSource} type="video/mp4" />
            </video>
            <div className="video-overlay" />
            <div className="video-content">
                {children}
            </div>
        </div>
    );
}