"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, FolderGit2, Monitor, Smartphone, Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LinkPreview } from "@/components/LinkPreview";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ProjectType = { title: string; shortDescription?: string; description: string; tech: string[]; link: string; image: string; logo?: string; media?: any[]; links?: any[] };

interface MediaItem {
    type: "screenshot" | "mobile_screenshot" | "video";
    url: string;
    caption: string;
}

function MediaTypeBadge({ type }: { type: MediaItem["type"] }) {
    const config = {
        screenshot: { label: "Screenshot", icon: Monitor, color: "bg-blue-500" },
        mobile_screenshot: { label: "Mobile", icon: Smartphone, color: "bg-purple-500" },
        video: { label: "Video", icon: Play, color: "bg-red-500" },
    };
    const { label, icon: Icon, color } = config[type];
    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-white ${color} shadow-sm`}>
            <Icon size={12} />
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
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all z-10"
                >
                    <X size={24} />
                </button>

                {media.length > 1 && (
                    <>
                        <button
                            onClick={(e) => { e.stopPropagation(); onPrev(); }}
                            className="absolute left-4 md:left-8 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all z-10"
                        >
                            <ChevronLeft size={28} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onNext(); }}
                            className="absolute right-4 md:right-8 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all z-10"
                        >
                            <ChevronRight size={28} />
                        </button>
                    </>
                )}

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
                            className="max-h-[75vh] rounded-2xl shadow-2xl"
                        />
                    ) : item.type === "mobile_screenshot" ? (
                        <Image
                            src={item.url}
                            alt={item.caption || "Mobile screenshot"}
                            width={360}
                            height={720}
                            unoptimized
                            className="max-h-[75vh] w-auto rounded-2xl shadow-2xl object-contain border border-primary-100/20 dark:border-primary-900/30"
                        />
                    ) : (
                        <Image
                            src={item.url}
                            alt={item.caption || "Screenshot"}
                            width={1200}
                            height={800}
                            unoptimized
                            className="max-h-[75vh] w-auto rounded-2xl shadow-2xl object-contain"
                        />
                    )}

                    <div className="text-center">
                        {item.caption && (
                            <p className="text-white/80 text-sm mb-1">{item.caption}</p>
                        )}
                        <p className="text-white/40 text-xs">
                            {currentIndex + 1} / {media.length}
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export function ProjectDetailClient({ project }: { project: ProjectType }) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const validMedia = (project.media || []).filter((m: MediaItem) => m.url) as MediaItem[];
    const mobileScreenshots = validMedia.filter(m => m.type === "mobile_screenshot");
    const screenshots = validMedia.filter(m => m.type === "screenshot");
    const videos = validMedia.filter(m => m.type === "video");

    const getGlobalIndex = (item: MediaItem) => validMedia.indexOf(item);

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Header */}
            <div className="relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-primary-50/30 dark:from-primary-900/20 dark:via-background dark:to-primary-900/10"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary-100)_0%,_transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary-900)_0%,_transparent_50%)] opacity-50"></div>

                <div className="relative container mx-auto px-6 pt-8 pb-16">
                    {/* Back button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Link
                            href="/#projects"
                            className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-primary-500 transition-colors mb-10 group"
                        >
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Projects
                        </Link>
                    </motion.div>

                    {/* Project header */}
                    <div className="flex flex-col md:flex-row items-start gap-6 max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            {project.logo ? (
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-primary-100 dark:border-primary-800 bg-white dark:bg-primary-900/20 p-1.5 shadow-xl shadow-primary-500/10">
                                    <Image
                                        src={project.logo}
                                        alt={`${project.title} logo`}
                                        width={96}
                                        height={96}
                                        unoptimized
                                        className="w-full h-full object-contain rounded-xl"
                                    />
                                </div>
                            ) : (
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-100 dark:border-primary-800 flex items-center justify-center text-primary-500 shadow-xl shadow-primary-500/10">
                                    <FolderGit2 size={40} />
                                </div>
                            )}
                        </motion.div>

                        <motion.div
                            className="flex-1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.15 }}
                        >
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
                                {project.title}
                            </h1>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tech.map((t, idx) => (
                                    <span
                                        key={idx}
                                        className="text-xs font-mono font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-3 py-1.5 rounded-full border border-primary-100 dark:border-primary-800"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>

                            {/* Primary action */}
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all duration-300 text-sm"
                                >
                                    <ExternalLink size={16} />
                                    View Project
                                </a>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-6xl mx-auto space-y-16">

                    {/* Description */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h2 className="text-lg font-semibold mb-4 text-foreground/80">About this project</h2>
                        <p className="text-foreground/70 leading-relaxed text-lg max-w-3xl whitespace-pre-line">
                            {project.description}
                        </p>
                    </motion.section>

                    {/* ═══════ Mobile Screenshots ═══════ */}
                    {mobileScreenshots.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <Smartphone size={20} className="text-purple-500" />
                                <h2 className="text-lg font-semibold text-foreground/80">Mobile Screenshots</h2>
                                <span className="text-xs text-foreground/40 bg-primary-50 dark:bg-primary-900/20 px-2 py-0.5 rounded-full">
                                    {mobileScreenshots.length}
                                </span>
                            </div>

                            <div className="flex gap-5 overflow-x-auto pb-6 scrollbar-thin snap-x snap-mandatory">
                                {mobileScreenshots.map((item, idx) => (
                                    <motion.button
                                        key={idx}
                                        className="flex-shrink-0 snap-center cursor-pointer group"
                                        onClick={() => setLightboxIndex(getGlobalIndex(item))}
                                        whileHover={{ y: -8 }}
                                        whileTap={{ scale: 0.97 }}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.05 * idx }}
                                    >
                                        <div className="relative overflow-hidden rounded-2xl border border-primary-100 dark:border-primary-900/30 bg-primary-50/30 dark:bg-primary-900/10 transition-shadow duration-300 group-hover:drop-shadow-2xl">
                                            <Image
                                                src={item.url}
                                                alt={item.caption || `Mobile screenshot ${idx + 1}`}
                                                width={180}
                                                height={360}
                                                unoptimized
                                                className="w-36 md:w-44 h-auto object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                            />
                                        </div>
                                        {item.caption && (
                                            <p className="text-xs text-foreground/50 mt-3 text-center max-w-[180px]">{item.caption}</p>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.section>
                    )}

                    {/* ═══════ Desktop Screenshots ═══════ */}
                    {screenshots.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.35 }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <Monitor size={20} className="text-blue-500" />
                                <h2 className="text-lg font-semibold text-foreground/80">Screenshots</h2>
                                <span className="text-xs text-foreground/40 bg-primary-50 dark:bg-primary-900/20 px-2 py-0.5 rounded-full">
                                    {screenshots.length}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {screenshots.map((item, idx) => (
                                    <motion.button
                                        key={idx}
                                        className="relative group cursor-pointer overflow-hidden rounded-2xl border border-primary-100 dark:border-primary-900/30 bg-primary-50/30 dark:bg-primary-900/10"
                                        onClick={() => setLightboxIndex(getGlobalIndex(item))}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.05 * idx }}
                                    >
                                        <Image
                                            src={item.url}
                                            alt={item.caption || `Screenshot ${idx + 1}`}
                                            width={600}
                                            height={400}
                                            unoptimized
                                            className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                        />
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium shadow-lg">
                                                Click to enlarge
                                            </div>
                                        </div>
                                        {item.caption && (
                                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                                <p className="text-white text-sm">{item.caption}</p>
                                            </div>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.section>
                    )}

                    {/* ═══════ Videos ═══════ */}
                    {videos.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <Play size={20} className="text-red-500" />
                                <h2 className="text-lg font-semibold text-foreground/80">Videos</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {videos.map((item, idx) => (
                                    <div key={idx} className="rounded-2xl overflow-hidden border border-primary-100 dark:border-primary-900/30 bg-black">
                                        <video
                                            src={item.url}
                                            controls
                                            className="w-full h-auto"
                                            poster=""
                                        />
                                        {item.caption && (
                                            <div className="p-3 bg-primary-50/30 dark:bg-primary-900/10">
                                                <p className="text-sm text-foreground/60">{item.caption}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    )}

                    {/* ═══════ Links ═══════ */}
                    {project.links && project.links.filter((l: { url: string }) => l.url).length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.45 }}
                        >
                            <h2 className="text-lg font-semibold mb-6 text-foreground/80">Links</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
                                {project.links
                                    .filter((l: { url: string }) => l.url)
                                    .map((link: { url: string; label: string }, idx: number) => (
                                        <LinkPreview key={idx} url={link.url} label={link.label} />
                                    ))}
                            </div>
                        </motion.section>
                    )}

                    {/* Bottom nav */}
                    <motion.div
                        className="border-t border-primary-100 dark:border-primary-900/20 pt-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <Link
                            href="/#projects"
                            className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-primary-500 transition-colors group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back to all projects
                        </Link>
                    </motion.div>
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
        </div>
    );
}
