"use client";

import { motion } from "framer-motion";
import { AchievementData } from "@/types/portfolio";
import { Award } from "lucide-react";
import Image from "next/image";

export function Achievements({ data }: { data: AchievementData[] }) {
    if (!data || data.length === 0) return null;

    return (
        <section id="achievements" className="py-20 scroll-mt-20">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl font-bold mb-12 text-center md:text-left text-zinc-900 dark:text-zinc-100">
                    <span className="text-emerald-500">03.</span> Achievements
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.map((achievement, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="flex items-center gap-4 bg-zinc-100 dark:bg-zinc-900/50 p-4 rounded-xl border border-emerald-500/10 shadow-sm"
                        >
                            <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 overflow-hidden relative">
                                {achievement.image ? (
                                    <Image
                                        src={achievement.image}
                                        alt={achievement.title}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                ) : (
                                    <Award size={28} />
                                )}
                            </div>
                            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed">
                                {achievement.title}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
