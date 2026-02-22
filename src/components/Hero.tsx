"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Facebook, Mail } from "lucide-react"
import Link from "next/link"

interface HeroData {
  name: string
  title: string
  description: string
  socialLinks: {
    linkedin: string
    github: string
    facebook: string
    email: string
  }
}

export function Hero({ data }: { data: HeroData }) {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center text-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-400 dark:from-emerald-400 dark:to-green-200">
          {data.name}
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6">
          {data.title}
        </h2>
        <p className="max-w-2xl text-lg text-gray-500 dark:text-gray-400 mb-8 mx-auto">
          {data.description}
        </p>
        <div className="flex justify-center space-x-6">
          <Link href={data.socialLinks.linkedin} target="_blank" className="text-gray-500 hover:text-emerald-500 transition-colors">
            <Linkedin className="w-8 h-8" />
          </Link>
          <Link href={data.socialLinks.github} target="_blank" className="text-gray-500 hover:text-emerald-500 transition-colors">
            <Github className="w-8 h-8" />
          </Link>
          <Link href={data.socialLinks.facebook} target="_blank" className="text-gray-500 hover:text-emerald-500 transition-colors">
            <Facebook className="w-8 h-8" />
          </Link>
          <Link href={data.socialLinks.email} className="text-gray-500 hover:text-emerald-500 transition-colors">
            <Mail className="w-8 h-8" />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
