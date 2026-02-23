"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Github, Download } from "lucide-react";
import data from "@/data/portfolio.json";

export function Hero() {
    const { hero, contact } = data;

    return (
        <section className="min-h-[90vh] flex flex-col justify-center pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex-1 text-center md:text-left"
                    >
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-lg md:text-xl text-primary-500 font-medium mb-4"
                        >
                            Hi there, I'm
                        </motion.h2>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="text-5xl md:text-7xl font-bold mb-6 text-foreground tracking-tight"
                        >
                            {hero.name}.
                        </motion.h1>

                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="text-2xl md:text-4xl font-bold text-foreground/70 mb-6"
                        >
                            {hero.title}.
                        </motion.h3>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="text-lg text-foreground/70 mb-8 max-w-2xl leading-relaxed"
                        >
                            {hero.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-10"
                        >
                            <a
                                href={contact.github}
                                target="_blank"
                                rel="noreferrer"
                                className="p-3 bg-secondary rounded-full hover:bg-primary-500 hover:text-white transition-all transform hover:scale-110 shadow-sm"
                            >
                                <Github size={24} />
                            </a>
                            <a
                                href={contact.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="p-3 bg-secondary rounded-full hover:bg-primary-500 hover:text-white transition-all transform hover:scale-110 shadow-sm"
                            >
                                <Linkedin size={24} />
                            </a>
                            <a
                                href={`mailto:${contact.email}`}
                                className="p-3 bg-secondary rounded-full hover:bg-primary-500 hover:text-white transition-all transform hover:scale-110 shadow-sm"
                            >
                                <Mail size={24} />
                            </a>

                            {/* Optional Resume Button */}
                            <a
                                href="#projects"
                                className="ml-4 px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 hover:-translate-y-1 transition-all shadow-lg hover:shadow-primary-500/30 flex items-center gap-2"
                            >
                                View My Work
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Avatar / Visuals */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                        className="flex-shrink-0 relative"
                    >
                        <div className="w-64 h-64 md:w-80 md:h-80 relative rounded-full overflow-hidden border-4 border-primary-500/20 shadow-2xl z-10">
                            <img
                                src={hero.avatar}
                                alt={hero.name}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        {/* Background decoration */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary-500/20 to-transparent rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
