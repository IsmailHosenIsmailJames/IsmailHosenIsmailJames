"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Hero />
        <About />
        <Experience />
        <Projects />
      </motion.main>

      <footer className="py-8 text-center text-foreground/50 text-sm border-t border-primary-100 dark:border-primary-900/20">
        <p>© {new Date().getFullYear()} Ismail Hossain. Built with Next.js & Tailwind CSS.</p>
      </footer>
    </div>
  );
}
