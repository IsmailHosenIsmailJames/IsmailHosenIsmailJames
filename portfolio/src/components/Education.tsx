"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import data from "@/data/portfolio.json";
import { PortfolioData } from "@/types";

export function Education() {
    const { education } = data as PortfolioData;

    return (
        <section id="education" className="py-20 bg-background">
            <div className="container mx-auto px-6">
                <div className="flex items-center gap-4 mb-10">
                    <GraduationCap className="text-primary-500" size={32} />
                    <h2 className="text-3xl md:text-4xl font-bold">Education</h2>
                </div>

                <div className="space-y-8">
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-6 rounded-2xl border border-primary-100 dark:border-primary-900/30 bg-primary-50/20 dark:bg-primary-900/5 hover:border-primary-500/50 transition-colors"
                        >
                            <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-2">
                                <h3 className="text-xl font-bold text-foreground">{edu.degree}</h3>
                                <span className="text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30 px-3 py-1 rounded-full whitespace-nowrap self-start md:self-auto">
                                    {edu.duration}
                                </span>
                            </div>
                            <h4 className="text-lg font-medium text-foreground/80">{edu.institution}</h4>
                            <p className="text-foreground/60 text-sm mt-1">{edu.location}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
