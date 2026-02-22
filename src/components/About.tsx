"use client"

import { motion } from "framer-motion"

interface AboutData {
  title: string
  description: string
}

export function About({ data }: { data: AboutData }) {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-emerald-600 dark:text-emerald-400">
            {data.title}
          </h2>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {data.description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
