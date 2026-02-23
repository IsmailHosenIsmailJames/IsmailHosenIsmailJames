"use client";

import { motion } from "framer-motion";
import { Briefcase, Award } from "lucide-react";
import data from "@/data/portfolio.json";

export function Experience() {
    const { experience, achievements } = data;

    return (
        <section id="experience" className="py-20">
            <div className="container mx-auto px-6">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Experience Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-3 mb-10">
                            <Briefcase className="text-primary-500" size={32} />
                            <h2 className="text-3xl md:text-4xl font-bold">Experience</h2>
                        </div>

                        <div className="space-y-12">
                            {experience.map((exp, index) => (
                                <div key={index} className="relative pl-8 border-l-2 border-primary-500/20 group hover:border-primary-500 transition-colors">
                                    <div className="absolute top-0 -left-[9px] w-4 h-4 bg-background border-2 border-primary-500 rounded-full group-hover:bg-primary-500 transition-colors shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>

                                    <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                        <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                                        <span className="text-sm font-medium text-primary-500 bg-primary-500/10 px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-auto">
                                            {exp.duration}
                                        </span>
                                    </div>

                                    <h4 className="text-lg font-medium text-foreground/80 mb-4">{exp.company}</h4>

                                    <ul className="space-y-3">
                                        {exp.details.map((detail, idx) => (
                                            <li key={idx} className="flex gap-2 text-foreground/70">
                                                <span className="mt-1.5 w-1.5 h-1.5 bg-primary-500/50 rounded-full flex-shrink-0"></span>
                                                <span className="leading-relaxed">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Achievements Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="flex items-center gap-3 mb-10">
                            <Award className="text-primary-500" size={32} />
                            <h2 className="text-3xl md:text-4xl font-bold">Achievements</h2>
                        </div>

                        <div className="bg-primary-50/50 dark:bg-primary-900/5 rounded-2xl p-8 border border-primary-100 dark:border-primary-900/30">
                            <ul className="space-y-6">
                                {achievements.map((achievement, index) => (
                                    <li key={index} className="flex gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                                            <Award size={20} />
                                        </div>
                                        <p className="pt-2 text-foreground/80 leading-relaxed font-medium">
                                            {achievement}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
