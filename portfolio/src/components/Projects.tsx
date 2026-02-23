"use client";

import { motion } from "framer-motion";
import { FolderGit2, ExternalLink } from "lucide-react";
import data from "@/data/portfolio.json";

export function Projects() {
    const { projects } = data;

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
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
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            className="group bg-background rounded-2xl p-8 border border-primary-100 dark:border-primary-900/30 hover:border-primary-500/50 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300 relative flex flex-col h-full"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
                                    <FolderGit2 size={32} />
                                </div>
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-2 text-foreground/50 hover:text-primary-500 transition-colors"
                                    >
                                        <ExternalLink size={24} />
                                    </a>
                                )}
                            </div>

                            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary-500 transition-colors">
                                {project.title}
                            </h3>

                            <p className="text-foreground/70 leading-relaxed mb-8 flex-1">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tech.map((t, idx) => (
                                    <span
                                        key={idx}
                                        className="text-xs font-mono font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-3 py-1 rounded-full"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
