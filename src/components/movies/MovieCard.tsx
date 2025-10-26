import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import notFoun from '../../assets/not_found_image.svg'

interface MovieCardProps {
    imageUrl?: string;
    linkPreview?: string;
    title: string;
    description?: string;
    rating?: number;
}

export default function MovieCard({
    imageUrl,
    linkPreview,
    title,
    description = "No description available.",
    rating = 0,
}: MovieCardProps) {
    const [hover, setHover] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [hoverTimer, setHoverTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

    const size = 140;
    const strokeWidth = 10;
    const radius = (size / 2) - (strokeWidth / 2);
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(Math.max(rating, 0), 100);
    const offset = circumference - (progress / 100) * circumference;

    const ratingColor =
        rating >= 75 ? "#4ade80" : rating >= 50 ? "#facc15" : "#f87171";

    const poster = imageUrl || notFoun;

    const isYouTube = linkPreview?.includes("youtube.com") || linkPreview?.includes("youtu.be");

    const getYouTubeId = (url: string) => {
        const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[1] ? match[1] : "";
    };

    useEffect(() => {
        if (hover && linkPreview) {
            const timer = setTimeout(() => setShowPreview(true), 1000);
            setHoverTimer(timer);
        } else {
            setShowPreview(false);
            if (hoverTimer) clearTimeout(hoverTimer);
        }

        return () => {
            if (hoverTimer) clearTimeout(hoverTimer);
        };
    }, [hover, linkPreview]);

    return (
        <motion.div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => {
                setHover(false);
                setShowPreview(false);
            }}
            className="relative w-full max-w-[235px] h-[355px] rounded-md overflow-hidden bg-[#111] cursor-pointer group transition-all duration-300"
        >
            {showPreview && linkPreview ? (
                isYouTube ? (
                    <iframe
                        src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(linkPreview)}?autoplay=1&mute=1&controls=0&loop=1&playlist=${getYouTubeId(linkPreview)}`}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <video
                        src={linkPreview}
                        autoPlay
                        muted
                        loop
                        playsInline
                        crossOrigin="anonymous"
                        className="w-full h-full object-cover"
                    />
                )
            ) : (
                <img
                    src={poster}
                    alt={title}
                    className="w-full h-full object-cover transition-all duration-300"
                />
            )}

            {hover && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    <div className="relative w-[140px] h-[140px] flex items-center justify-center">
                        <svg
                            width={size}
                            height={size}
                            viewBox={`0 0 ${size} ${size}`}
                            className="absolute"
                        >
                            <circle
                                cx={size / 2}
                                cy={size / 2}
                                r={radius - strokeWidth / 2}
                                fill="rgba(0, 0, 0, 0.55)"
                            />
                            <circle
                                cx={size / 2}
                                cy={size / 2}
                                r={radius}
                                stroke="#1e1e1e"
                                strokeWidth={strokeWidth}
                                fill="none"
                            />
                            <motion.circle
                                cx={size / 2}
                                cy={size / 2}
                                r={radius}
                                stroke={ratingColor}
                                strokeWidth={strokeWidth}
                                fill="none"
                                strokeDasharray={circumference}
                                strokeDashoffset={circumference}
                                strokeLinecap="round"
                                animate={{ strokeDashoffset: offset }}
                                transition={{ duration: 1.2, ease: "easeInOut" }}
                            />
                        </svg>

                        <div className="absolute text-white text-3xl font-semibold select-none">
                            {Math.round(rating)}%
                        </div>
                    </div>
                </motion.div>
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 text-white transition-all duration-300">
                <h3 className="text-lg font-semibold">{title}</h3>
                {hover && (
                    <p className="text-sm text-gray-300 mt-1 line-clamp-2">{description}</p>
                )}
            </div>
        </motion.div>
    );
}
