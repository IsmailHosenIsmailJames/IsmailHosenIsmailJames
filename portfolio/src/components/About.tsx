"use client";

import { motion } from "framer-motion";
import data from "@/data/portfolio.json";

export function About() {
    const { about, skills } = data;

    return (
        <section id="about" className="py-20 bg-primary-50/50 dark:bg-primary-900/5">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
                        <div className="flex-1 h-px bg-primary-500/20"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                                {about.summary}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                Tech Stack
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {skills.map((skill, index) => (
                                    <motion.span
                                        key={skill}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05, duration: 0.3 }}
                                        className="px-4 py-2 bg-background border border-primary-500/20 rounded-full text-sm font-medium hover:border-primary-500 hover:text-primary-500 hover:shadow-sm cursor-default transition-all"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
