"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import Image from "next/image";
import data from "@/data/portfolio.json";

export function Achievements() {
    const { achievements } = data;

    return (
        <section id="achievements" className="py-20 bg-primary-50/50 dark:bg-primary-900/5">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-4 mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold">Achievements</h2>
                        <div className="flex-1 h-px bg-primary-500/20"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {achievements?.map((achievement, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="group relative bg-background rounded-2xl p-6 border border-primary-100 dark:border-primary-900/50 shadow-sm hover:shadow-md transition-all overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary-500 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>

                                <div className="flex flex-col h-full gap-4">
                                    <div className="flex items-start justify-between">
                                        <div className="p-3 bg-primary-50 text-primary-500 rounded-lg group-hover:scale-110 transition-transform">
                                            <Award size={24} />
                                        </div>
                                    </div>

                                    {achievement.image && achievement.image !== "" && (
                                        <div className="relative w-full h-40 rounded-lg overflow-hidden my-2">
                                            <Image
                                                src={achievement.image}
                                                alt={achievement.title}
                                                fill
                                                unoptimized
                                                className="object-cover transition-transform group-hover:scale-105"
                                            />
                                        </div>
                                    )}

                                    <h3 className="text-xl font-bold group-hover:text-primary-500 transition-colors">
                                        {achievement.title}
                                    </h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
