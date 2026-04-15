"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import Image from "next/image";
import { HeroData, ContactData } from "@/types/portfolio";

export function Hero({ data, contact }: { data: HeroData, contact: ContactData }) {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center pt-20">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 text-center md:text-left space-y-6"
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                        Hi, I&apos;m <span className="text-emerald-500">{data.name}</span>
                    </h1>
                    <h2 className="text-2xl md:text-3xl text-zinc-600 dark:text-zinc-400 font-medium">
                        {data.title}
                    </h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto md:mx-0">
                        {data.description}
                    </p>

                    <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                        <a
                            href={`mailto:${contact.email}`}
                            className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-medium transition-transform hover:scale-105 shadow-md"
                        >
                            <Mail size={18} /> Contact Me
                        </a>
                        <div className="flex gap-4 items-center">
                            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-200 dark:bg-zinc-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-full transition-all hover:scale-110">
                                <Linkedin size={20} />
                            </a>
                            <a href={contact.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-200 dark:bg-zinc-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-full transition-all hover:scale-110">
                                <Github size={20} />
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-zinc-500 dark:text-zinc-400 pt-4">
                        <div className="flex items-center gap-1"><MapPin size={16} /> {contact.location}</div>
                        <div className="flex items-center gap-1"><Phone size={16} /> {contact.phone}</div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 flex justify-center"
                >
                    <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-emerald-500 shadow-xl">
                        {data.avatar ? (
                            <Image
                                src={data.avatar}
                                alt={data.name}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        ) : (
                            <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
                                No Avatar
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
