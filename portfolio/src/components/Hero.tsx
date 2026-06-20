"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import type { HeroData } from "@/types/portfolio";

export function Hero({ data }: { data: HeroData }) {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16" id="hero">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4">
            Hi, I&apos;m <span className="text-emerald-500">{data.name}</span>
          </h1>
          <h2 className="text-2xl sm:text-3xl text-gray-600 dark:text-gray-400 mb-6 font-medium">
            {data.role}
          </h2>
          <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {data.tagline}
          </p>

          <div className="flex justify-center space-x-6">
            {data.social?.github && (
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href={data.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:text-emerald-500 transition-colors"
              >
                <Github size={24} />
              </motion.a>
            )}
            {data.social?.linkedin && (
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href={data.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:text-emerald-500 transition-colors"
              >
                <Linkedin size={24} />
              </motion.a>
            )}
            {data.social?.twitter && (
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href={data.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:text-emerald-500 transition-colors"
              >
                <Twitter size={24} />
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
