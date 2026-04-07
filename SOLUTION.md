# Setup Instructions & Code For Portfolio Website

## Setup Commands
To start working on the project, run the following commands:
```bash
# Navigate to the portfolio directory
cd portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

## `portfolio.json` Structure
Create `src/data/portfolio.json` with the following structure:

```json
{
  "hero": {
    "name": "Ismail Hossain",
    "title": "Flutter & Kotlin Developer",
    "avatar": "https://avatars.githubusercontent.com/u/99122172?v=4",
    "description": "Mobile App Enthusiast | Building Apps for Impact | Open Source Contributor"
  },
  "contact": {
    "email": "md.ismailhosenismailjames@gmail.com",
    "phone": "+880174109533",
    "location": "Tangail Sadar, Tangail, Bangladesh",
    "linkedin": "https://www.linkedin.com/in/ismail-hossain-3756a4211/",
    "github": "https://github.com/IsmailHosenIsmailJames"
  },
  "about": {
    "summary": "Results-driven Mobile Application Developer with over 3 years of hands-on experience in Flutter, Kotlin, and Android development. Proven track record of building, publishing, and maintaining production-grade applications with 100k+ downloads and high user ratings."
  },
  "skills": [
    "Flutter",
    "Kotlin",
    "Android Studio",
    "Jetpack Compose",
    "Dart",
    "Python",
    "Firebase",
    "C++",
    "Arduino",
    "Git"
  ],
  "experience": [
    {
      "role": "Junior Flutter Developer",
      "company": "Impala Intech Limited, Radiant Pharmaceuticals",
      "duration": "March, 2024 - Present",
      "details": [
        "Developed & Maintaining ODMS (Outbound Delivery Management System) Android App using Flutter that is used by 3k+ Delivery Employees of Radiant.",
        "Developed an Islamic app (Mumin) with Quran, Translation, Recitation, Qibla Compass, Jakat Calculator, Hadith & more."
      ]
    },
    {
      "role": "Independent Mobile App Developer",
      "company": "Self-employed",
      "duration": "January 2023 – Present",
      "details": [
        "Developed & Actively Maintaining Quran's Tafsir, Audio & Prayer (105k+ Downloads on Google Play Store).",
        "Developed Rust Book app with Kotlin and Jetpack Compose (11.5k+ downloads, supports 18 languages)."
      ]
    }
  ],
  "projects": [
    {
      "title": "Al Quran Tafsir & Audio",
      "description": "A comprehensive Islamic app serving thousands of users. Features 69 Language Translations, Tafsir in 6 languages.",
      "tech": [
        "Flutter",
        "Dart"
      ],
      "link": "https://github.com/IsmailHosenIsmailJames/al_quran_v3",
      "image": ""
    },
    {
      "title": "Rust Book App",
      "description": "An educational app for learning the Rust programming language. Rust Book translation in 18 languages.",
      "tech": [
        "Kotlin",
        "Jetpack Compose"
      ],
      "link": "https://play.google.com/store/apps/details?id=com.rust_book.example",
      "image": ""
    }
  ],
  "achievements": [
    {
      "title": "Winner, National Skills Competition 2025 (Mobile App Development) - Organized by NSDA.",
      "image": ""
    },
    {
      "title": "Community Leader, Led programming workshops at TPI Programming Club.",
      "image": ""
    }
  ]
}
```

## Main Layout & Animated Components

### 1. Root Layout (`src/app/layout.tsx`)
```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "react-hot-toast";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ismail Hossain - Portfolio",
  description: "Flutter & Kotlin Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary-500 selection:text-white transition-colors duration-300`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AnimatedBackground />
          {children}
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 2. Animated Background Component (`src/components/AnimatedBackground.tsx`)
```tsx
"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function AnimatedBackground() {
    const [isHovering, setIsHovering] = useState(false);

    // Smooth trailing effect for the mouse
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const textX = useSpring(mouseX, springConfig);
    const textY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            setIsHovering(true);
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.body.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Interactive Mouse Glow */}
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full blur-[120px] bg-primary-500/10 dark:bg-primary-500/15"
                style={{
                    x: textX,
                    y: textY,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isHovering ? 1 : 0,
                    transition: "opacity 0.5s ease"
                }}
            />

            {/* Ambient Background Shapes */}
            <motion.div
                animate={{
                    x: [0, 50, -50, 0],
                    y: [0, 50, -50, 0],
                    scale: [1, 1.1, 0.9, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear"
                }}
                className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[100px] bg-emerald-300/10 dark:bg-emerald-800/20"
            />

            <motion.div
                animate={{
                    x: [0, -70, 70, 0],
                    y: [0, -70, 70, 0],
                    scale: [1, 1.2, 0.8, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear"
                }}
                className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] bg-teal-300/10 dark:bg-teal-900/10"
            />
        </div>
    );
}
```

### 3. Hero Component (`src/components/Hero.tsx`)
```tsx
"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import Image from "next/image";
import data from "@/data/portfolio.json";

export function Hero() {
    const { hero, contact } = data;

    return (
        <section className="min-h-[90vh] flex flex-col justify-center pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex-1 text-center md:text-left"
                    >
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-lg md:text-xl text-primary-500 font-medium mb-4"
                        >
                            Hi there, I&apos;m
                        </motion.h2>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="text-5xl md:text-7xl font-bold mb-6 text-foreground tracking-tight"
                        >
                            {hero.name}.
                        </motion.h1>

                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="text-2xl md:text-4xl font-bold text-foreground/70 mb-6"
                        >
                            {hero.title}.
                        </motion.h3>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="text-lg text-foreground/70 mb-8 max-w-2xl leading-relaxed"
                        >
                            {hero.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-10"
                        >
                            <a
                                href={contact.github}
                                target="_blank"
                                rel="noreferrer"
                                className="p-3 bg-secondary rounded-full hover:bg-primary-500 hover:text-white transition-all transform hover:scale-110 shadow-sm"
                            >
                                <Github size={24} />
                            </a>
                            <a
                                href={contact.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="p-3 bg-secondary rounded-full hover:bg-primary-500 hover:text-white transition-all transform hover:scale-110 shadow-sm"
                            >
                                <Linkedin size={24} />
                            </a>
                            <a
                                href={`mailto:${contact.email}`}
                                className="p-3 bg-secondary rounded-full hover:bg-primary-500 hover:text-white transition-all transform hover:scale-110 shadow-sm"
                            >
                                <Mail size={24} />
                            </a>

                            {/* Optional Resume Button */}
                            <a
                                href="#projects"
                                className="ml-4 px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 hover:-translate-y-1 transition-all shadow-lg hover:shadow-primary-500/30 flex items-center gap-2"
                            >
                                View My Work
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Avatar / Visuals */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                        className="flex-shrink-0 relative"
                    >
                        <div className="w-64 h-64 md:w-80 md:h-80 relative rounded-full overflow-hidden border-4 border-primary-500/20 shadow-2xl z-10">
                            <Image
                                src={hero.avatar}
                                alt={hero.name}
                                width={320}
                                height={320}
                                unoptimized
                                className="object-cover w-full h-full"
                            />
                        </div>

                        {/* Background decoration */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary-500/20 to-transparent rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
```

## Admin Panel State & Clipboard Logic (`src/app/admin/page.tsx`)

The admin page manages the state of the JSON data locally and provides a robust fallback for the copy-to-clipboard functionality across different contexts.

```tsx
"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { Save, Plus, Trash2, ArrowLeft, ArrowUp, ArrowDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import initialData from "@/data/portfolio.json";

export default function AdminPage() {
    const [data, setData] = useState(initialData);

    const handleCopyJson = () => {
        const jsonString = JSON.stringify(data, null, 2);

        // Fallback-friendly clipboard API usage
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(jsonString)
                .then(() => toast.success("JSON copied to clipboard! Paste it into src/data/portfolio.json"))
                .catch(() => toast.error("Failed to copy JSON"));
        } else {
            try {
                const textArea = document.createElement("textarea");
                textArea.value = jsonString;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                textArea.style.top = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();

                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);

                if (successful) {
                    toast.success("JSON copied to clipboard! Paste it into src/data/portfolio.json");
                } else {
                    toast.error("Failed to copy JSON automatically. Please check console.");
                }
            } catch {
                toast.error("Failed to copy JSON automatically.");
            }
        }
    };

    // Form inputs and list rendering omitted for brevity...

    return (
        <div>
           {/* Admin Form UI */}
           <button onClick={handleCopyJson}>Copy Updated JSON</button>
           {/* ... */}
        </div>
    );
}
```