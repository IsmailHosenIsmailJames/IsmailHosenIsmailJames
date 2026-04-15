"use client";

import { motion } from "framer-motion";
import { ExperienceData } from "@/types/portfolio";
import { Briefcase } from "lucide-react";

export function Experience({ data }: { data: ExperienceData[] }) {
    return (
        <section id="experience" className="py-20 scroll-mt-20">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl font-bold mb-12 text-center md:text-left text-zinc-900 dark:text-zinc-100">
                    <span className="text-emerald-500">02.</span> Experience
                </h2>

                <div className="space-y-8">
                    {data.map((job, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative pl-8 md:pl-0"
                        >
                            <div className="md:grid md:grid-cols-[1fr_3fr] gap-8 bg-zinc-100 dark:bg-zinc-900/50 p-6 md:p-8 rounded-2xl border border-emerald-500/10 shadow-sm hover:border-emerald-500/30 transition-colors">

                                {/* Timeline line for mobile */}
                                <div className="absolute left-0 top-0 bottom-0 w-px bg-emerald-500/20 md:hidden" />
                                <div className="absolute left-[-4px] top-10 w-2 h-2 rounded-full bg-emerald-500 md:hidden" />

                                <div className="mb-4 md:mb-0">
                                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-sm mb-2">
                                        <Briefcase size={16} />
                                        <span>{job.duration}</span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                                        {job.role}
                                    </h3>
                                    <p className="text-emerald-600 dark:text-emerald-500 font-medium mb-4">
                                        {job.company}
                                    </p>
                                    <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 text-sm">
                                        {job.details.map((detail, dIndex) => (
                                            <li key={dIndex} className="flex gap-2">
                                                <span className="text-emerald-500 mt-1">▹</span>
                                                <span>{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
