"use client"

import { motion } from "framer-motion"
import { ExternalLink, Folder } from "lucide-react"
import Link from "next/link"

interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  link: string
  stats: string
}

export function Projects({ data }: { data: Project[] }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <section id="projects" className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-emerald-600 dark:text-emerald-400">
          Featured Projects
        </h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {data.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-800 flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <Folder className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                {project.link !== "#" && (
                  <Link href={project.link} target="_blank" className="text-gray-400 hover:text-emerald-500 transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </Link>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                {project.description}
              </p>
              <div className="mb-4">
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  {project.stats}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
