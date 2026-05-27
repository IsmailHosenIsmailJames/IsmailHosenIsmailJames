"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Smartphone, Monitor, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export interface MediaItem {
    type: "screenshot" | "mobile_screenshot" | "video";
    url: string;
    caption: string;
}

interface MediaGalleryProps {
    media: MediaItem[];
    projectTitle: string;
}

function MediaTypeBadge({ type }: { type: MediaItem["type"] }) {
    const config = {
        screenshot: { label: "Screenshot", icon: Monitor, color: "bg-blue-500" },
        mobile_screenshot: { label: "Mobile", icon: Smartphone, color: "bg-purple-500" },
        video: { label: "Video", icon: Play, color: "bg-red-500" },
    };
    const { label, icon: Icon, color } = config[type];
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold text-white ${color}`}>
            <Icon size={10} />
            {label}
        </span>
    );
}



function Lightbox({
    media,
    currentIndex,
    onClose,
    onNext,
    onPrev,
}: {
    media: MediaItem[];
    currentIndex: number;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}) {
    const item = media[currentIndex];

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-white/70 hover:text-white bg-white/10 rounded-full backdrop-blur-sm transition-colors z-10"
                >
                    <X size={24} />
                </button>

                {/* Nav arrows */}
                {media.length > 1 && (
                    <>
                        <button
                            onClick={(e) => { e.stopPropagation(); onPrev(); }}
                            className="absolute left-4 md:left-8 p-3 text-white/70 hover:text-white bg-white/10 rounded-full backdrop-blur-sm transition-colors z-10"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onNext(); }}
                            className="absolute right-4 md:right-8 p-3 text-white/70 hover:text-white bg-white/10 rounded-full backdrop-blur-sm transition-colors z-10"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </>
                )}

                {/* Content */}
                <motion.div
                    key={currentIndex}
                    className="max-w-[90vw] max-h-[85vh] flex flex-col items-center gap-4"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {item.type === "video" ? (
                        <video
                            src={item.url}
                            controls
                            autoPlay
                            className="max-h-[75vh] rounded-xl shadow-2xl"
                        />
                    ) : item.type === "mobile_screenshot" ? (
                        <Image
                            src={item.url}
                            alt={item.caption || "Mobile screenshot"}
                            width={320}
                            height={640}
                            unoptimized
                            className="max-h-[75vh] w-auto rounded-xl shadow-2xl object-contain border border-primary-100/20 dark:border-primary-900/30"
                        />
                    ) : (
                        <Image
                            src={item.url}
                            alt={item.caption || "Screenshot"}
                            width={1200}
                            height={800}
                            unoptimized
                            className="max-h-[75vh] w-auto rounded-xl shadow-2xl object-contain"
                        />
                    )}

                    {/* Caption + counter */}
                    <div className="text-center">
                        {item.caption && (
                            <p className="text-white/80 text-sm">{item.caption}</p>
                        )}
                        <p className="text-white/40 text-xs mt-1">
                            {currentIndex + 1} / {media.length}
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export function MediaGallery({ media, projectTitle }: MediaGalleryProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    if (!media || media.length === 0) return null;

    const validMedia = media.filter((m) => m.url);
    if (validMedia.length === 0) return null;

    return (
        <>
            <div className="mt-6">
                <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-primary-300 dark:scrollbar-thumb-primary-800">
                    {validMedia.map((item, idx) => (
                        <motion.button
                            key={idx}
                            className="relative flex-shrink-0 rounded-xl overflow-hidden border-2 border-transparent hover:border-primary-500/50 transition-colors group cursor-pointer"
                            onClick={() => setLightboxIndex(idx)}
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            {item.type === "mobile_screenshot" ? (
                                <div className="w-24 h-44 bg-primary-50/30 dark:bg-primary-900/10 rounded-xl border border-primary-100 dark:border-primary-900/30 overflow-hidden flex items-center justify-center">
                                    <Image
                                        src={item.url}
                                        alt={item.caption || `${projectTitle} mobile screenshot`}
                                        width={96}
                                        height={176}
                                        unoptimized
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                            ) : item.type === "video" ? (
                                <div className="w-40 h-28 bg-black rounded-xl flex items-center justify-center relative overflow-hidden">
                                    <video
                                        src={item.url}
                                        muted
                                        className="w-full h-full object-cover absolute inset-0"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                            <Play size={20} className="text-white ml-0.5" />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-40 h-28 bg-primary-50/50 dark:bg-primary-900/20 rounded-xl overflow-hidden">
                                    <Image
                                        src={item.url}
                                        alt={item.caption || `${projectTitle} screenshot`}
                                        width={160}
                                        height={112}
                                        unoptimized
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                            )}

                            {/* Type badge */}
                            <div className="absolute top-1.5 left-1.5">
                                <MediaTypeBadge type={item.type} />
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <Lightbox
                    media={validMedia}
                    currentIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                    onNext={() => setLightboxIndex((prev) => (prev! + 1) % validMedia.length)}
                    onPrev={() => setLightboxIndex((prev) => (prev! - 1 + validMedia.length) % validMedia.length)}
                />
            )}
        </>
    );
}
