"use client";

import { motion } from "framer-motion";
import type { AboutData } from "@/types/portfolio";

export function About({ data }: { data: AboutData }) {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed text-center">
            <p>{data.description}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
