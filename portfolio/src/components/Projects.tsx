"use client";

import { motion } from "framer-motion";
import { ProjectData } from "@/types/portfolio";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

export function Projects({ data }: { data: ProjectData[] }) {
    return (
        <section id="projects" className="py-20 scroll-mt-20">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl font-bold mb-12 text-center md:text-left text-zinc-900 dark:text-zinc-100">
                    <span className="text-emerald-500">04.</span> Featured Projects
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {data.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-zinc-100 dark:bg-zinc-900/50 rounded-2xl overflow-hidden border border-emerald-500/10 shadow-sm flex flex-col group"
                        >
                            <div className="relative h-48 w-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                                {project.image ? (
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-zinc-400 font-medium">
                                        {project.title}
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-emerald-500/10 group-hover:bg-transparent transition-colors duration-300" />
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-emerald-500 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6 flex-1">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map((tech, i) => (
                                        <span key={i} className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4 mt-auto">
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                                        >
                                            {project.link.includes('github') ? <Github size={18} /> : <ExternalLink size={18} />}
                                            {project.link.includes('github') ? 'View Code' : 'Live Demo'}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
