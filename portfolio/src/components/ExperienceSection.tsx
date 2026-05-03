"use client";

import { motion } from "framer-motion";
import { Experience } from "@/types/portfolio";
import { Briefcase } from "lucide-react";

export function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Experience</h2>

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 md:pl-0"
              >
                <div className="md:grid md:grid-cols-4 md:gap-8 items-start">
                  <div className="md:col-span-1 mb-4 md:mb-0 md:text-right text-muted-foreground font-medium pt-1">
                    {exp.duration}
                  </div>

                  <div className="md:col-span-3 relative bg-background rounded-2xl p-6 shadow-sm border border-border/50">
                    <div className="absolute -left-12 md:-left-4 top-6 md:top-1/2 md:-translate-y-1/2 w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center border-4 border-background z-10 md:hidden">
                       <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>

                    <h3 className="text-xl font-bold mb-1 text-emerald-600 dark:text-emerald-500">{exp.role}</h3>
                    <h4 className="text-lg font-medium mb-4">{exp.company}</h4>

                    <ul className="list-disc list-outside ml-4 space-y-2 text-muted-foreground">
                      {exp.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
