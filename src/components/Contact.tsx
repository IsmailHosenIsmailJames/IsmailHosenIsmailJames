"use client"

import { motion } from "framer-motion"
import { Mail, MapPin } from "lucide-react"

interface ContactData {
  email: string
  location: string
}

export function Contact({ data }: { data: ContactData }) {
  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8 text-emerald-600 dark:text-emerald-400">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-8 mb-12">
            <div className="flex items-center justify-center gap-3 text-gray-700 dark:text-gray-300">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400">
                <Mail className="w-6 h-6" />
              </div>
              <a href={`mailto:${data.email}`} className="hover:text-emerald-500 transition-colors">
                {data.email}
              </a>
            </div>

            <div className="flex items-center justify-center gap-3 text-gray-700 dark:text-gray-300">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400">
                <MapPin className="w-6 h-6" />
              </div>
              <span>{data.location}</span>
            </div>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-500">
            © {new Date().getFullYear()} Ismail Hossain. All rights reserved.
          </div>
        </motion.div>
      </div>
    </section>
  )
}
