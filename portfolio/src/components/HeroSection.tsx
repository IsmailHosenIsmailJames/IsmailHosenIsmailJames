"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Hero } from "@/types/portfolio";

export function HeroSection({ hero }: { hero: Hero }) {
  return (
    <section className="min-h-[80vh] flex items-center justify-center py-20">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          {hero.avatar ? (
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-emerald-500 shadow-xl">
              <Image
                src={hero.avatar}
                alt={hero.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div className="w-40 h-40 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center border-4 border-emerald-500 shadow-xl">
              <span className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                {hero.name.charAt(0)}
              </span>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Hi, I&apos;m <span className="text-emerald-600 dark:text-emerald-500">{hero.name}</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-muted-foreground mb-6 font-medium">
            {hero.title}
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground mx-auto">
            {hero.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
