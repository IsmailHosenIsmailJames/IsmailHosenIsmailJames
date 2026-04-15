"use client";

import { motion } from "framer-motion";
import { AboutData } from "@/types/portfolio";

export function About({ data, skills }: { data: AboutData, skills: string[] }) {
    return (
        <section id="about" className="py-20 scroll-mt-20">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
            >
                <h2 className="text-3xl font-bold text-center md:text-left text-zinc-900 dark:text-zinc-100">
                    <span className="text-emerald-500">01.</span> About Me
                </h2>

                <div className="bg-zinc-100 dark:bg-zinc-900/50 p-8 rounded-2xl shadow-sm border border-emerald-500/10">
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
                        {data.summary}
                    </p>

                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-zinc-200">Technologies I Work With:</h3>
                        <div className="flex flex-wrap gap-3">
                            {skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 rounded-lg text-sm font-medium border border-emerald-500/20 shadow-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
