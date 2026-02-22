"use client"

import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"

interface Experience {
  id: string
  company: string
  role: string
  duration: string
  description: string
}

export function Experience({ data }: { data: Experience[] }) {
  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-emerald-600 dark:text-emerald-400">
          Work Experience
        </h2>
        <div className="relative border-l-2 border-emerald-200 dark:border-emerald-900 ml-4 md:ml-8 space-y-12">
          {data.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative pl-8 md:pl-12"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white dark:border-gray-950 shadow-sm" />
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-emerald-500" />
                    {exp.role}
                  </h3>
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full w-fit mt-2 md:mt-0">
                    {exp.duration}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {exp.company}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
