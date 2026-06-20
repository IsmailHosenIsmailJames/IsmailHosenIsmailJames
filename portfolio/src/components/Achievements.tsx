"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import type { AchievementData } from "@/types/portfolio";

export function Achievements({ data }: { data: AchievementData[] }) {
  return (
    <section id="achievements" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Achievements</h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-4 p-6 bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-colors group"
            >
              <div className="shrink-0 mt-1">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-full text-emerald-500 group-hover:scale-110 transition-transform">
                  <Award size={24} />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-emerald-500 transition-colors">
                  {achievement.title}
                </h3>
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 block mb-2">
                  {achievement.date}
                </span>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {achievement.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
