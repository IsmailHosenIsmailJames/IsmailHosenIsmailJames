"use client";

import { motion } from "framer-motion";
import { FolderGit2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import data from "@/data/portfolio.json";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ProjectType = (typeof data.projects)[number] & { logo?: string; shortDescription?: string; media?: any[]; links?: any[] };

function slugify(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

export function Projects() {
    const projects = data.projects as ProjectType[];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section id="projects" className="py-20 bg-primary-50/50 dark:bg-primary-900/5">
            <div className="container mx-auto px-6">
                <div className="flex items-center gap-4 mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
                    <div className="flex-1 h-px bg-primary-500/20"></div>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {projects.map((project, index) => {
                        const slug = slugify(project.title);
                        const hasMedia = project.media && project.media.filter(m => m.url).length > 0;

                        return (
                            <motion.div
                                key={index}
                                variants={item}
                            >
                                <Link
                                    href={`/projects/${slug}`}
                                    className="group bg-background rounded-2xl border border-primary-100 dark:border-primary-900/30 hover:border-primary-500/50 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 relative flex flex-col h-full overflow-hidden block"
                                >
                                    {/* Media preview strip */}
                                    {hasMedia && (
                                        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-900/10">
                                            <div className="absolute inset-0 flex gap-1 p-2">
                                                {project.media!
                                                    .filter(m => m.url)
                                                    .slice(0, 4)
                                                    .map((m, mIdx) => (
                                                        m.type === "mobile_screenshot" ? (
                                                            <div key={mIdx} className="relative flex-shrink-0 w-16 h-full">
                                                                <div className="w-full h-full bg-gray-900 rounded-lg p-0.5">
                                                                    <Image
                                                                        src={m.url}
                                                                        alt=""
                                                                        width={64}
                                                                        height={140}
                                                                        unoptimized
                                                                        className="w-full h-full object-cover rounded-md"
                                                                    />
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div key={mIdx} className="relative flex-1 min-w-0 h-full">
                                                                <Image
                                                                    src={m.url}
                                                                    alt=""
                                                                    width={200}
                                                                    height={140}
                                                                    unoptimized
                                                                    className="w-full h-full object-cover rounded-lg"
                                                                />
                                                            </div>
                                                        )
                                                    ))}
                                            </div>
                                            {/* Gradient overlay for smooth transition */}
                                            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent"></div>
                                            {/* Count badge */}
                                            {project.media!.filter(m => m.url).length > 4 && (
                                                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/50 backdrop-blur-sm rounded-full text-[10px] text-white font-medium">
                                                    +{project.media!.filter(m => m.url).length - 4} more
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Card content */}
                                    <div className="p-6 flex flex-col flex-1">
                                        {/* Logo/Icon + Title */}
                                        <div className="flex items-center gap-3 mb-4">
                                            {project.logo ? (
                                                <div className="w-10 h-10 rounded-lg overflow-hidden border border-primary-100 dark:border-primary-900/30 bg-white dark:bg-primary-900/20 p-0.5 flex-shrink-0 group-hover:shadow-lg group-hover:shadow-primary-500/10 transition-all duration-300">
                                                    <Image
                                                        src={project.logo}
                                                        alt={`${project.title} logo`}
                                                        width={40}
                                                        height={40}
                                                        unoptimized
                                                        className="w-full h-full object-contain rounded-md"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300 flex-shrink-0">
                                                    <FolderGit2 size={20} />
                                                </div>
                                            )}
                                            <h3 className="text-lg font-bold group-hover:text-primary-500 transition-colors line-clamp-1">
                                                {project.title}
                                            </h3>
                                        </div>

                                        {/* Short Description */}
                                        <p className="text-sm text-foreground/60 leading-relaxed mb-5 flex-1 line-clamp-2">
                                            {project.shortDescription || project.description}
                                        </p>

                                        {/* Tech Stack */}
                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {project.tech.slice(0, 4).map((t, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-[10px] font-mono font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-2 py-0.5 rounded-full"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                            {project.tech.length > 4 && (
                                                <span className="text-[10px] font-mono text-foreground/40 px-2 py-0.5">
                                                    +{project.tech.length - 4}
                                                </span>
                                            )}
                                        </div>

                                        {/* View Details link */}
                                        <div className="flex items-center gap-1.5 text-sm font-medium text-primary-500 group-hover:gap-3 transition-all duration-300">
                                            View Details
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
