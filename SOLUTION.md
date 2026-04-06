# Static Portfolio Website Built with Next.js & Framer Motion

Here are the execution steps to create the high-performance, animated personal portfolio website.

## 1. Setup Commands

Run the following commands in your terminal to initialize the Next.js project and install the necessary dependencies:

```bash
npx create-next-app@latest portfolio --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd portfolio
npm install framer-motion lucide-react react-hot-toast next-themes clsx tailwind-merge
```

## 2. portfolio.json Structure

Create a `src/data/portfolio.json` file with the following mock data:

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

## 3. Main Layout & Components

### `src/app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Portfolio",
  description: "Static Animated Personal Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-emerald-500 selection:text-white transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### `src/app/page.tsx`

```tsx
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Projects />
      </main>
    </div>
  );
}
```

### Example Animated Component: `src/components/Hero.tsx`

```tsx
"use client";
import { motion } from "framer-motion";
import portfolioData from "@/data/portfolio.json";
import Image from "next/image";

export function Hero() {
  const { name, title, description, avatar } = portfolioData.hero;

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {avatar && (
            <Image
              src={avatar}
              alt={name}
              width={128}
              height={128}
              unoptimized
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-emerald-500/20"
            />
          )}
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-5xl md:text-7xl font-bold mb-4"
        >
          Hi, I'm <span className="text-emerald-500">{name}</span>
        </motion.h1>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl md:text-3xl text-emerald-600 dark:text-emerald-400 mb-6 font-medium"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
```

## 4. Admin Page with Copy Functionality

### `src/app/admin/page.tsx`

```tsx
"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { Save } from "lucide-react";
import initialData from "@/data/portfolio.json";

export default function AdminPage() {
    const [data, setData] = useState(initialData);

    const handleCopyJson = () => {
        const jsonString = JSON.stringify(data, null, 2);

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(jsonString)
                .then(() => toast.success("JSON copied to clipboard!"))
                .catch(() => toast.error("Failed to copy JSON"));
        } else {
            // Fallback
            try {
                const textArea = document.createElement("textarea");
                textArea.value = jsonString;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);
                if (successful) {
                    toast.success("JSON copied to clipboard!");
                } else {
                    toast.error("Failed to copy JSON automatically.");
                }
            } catch {
                toast.error("Failed to copy JSON automatically.");
            }
        }
    };

    const handleHeroChange = (field: string, value: string) => {
        setData(prev => ({
            ...prev,
            hero: { ...prev.hero, [field]: value }
        }));
    };

    return (
        <div className="min-h-screen py-10 px-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8 pb-6 border-b">
                <h1 className="text-3xl font-bold">Portfolio Admin</h1>
                <button
                    onClick={handleCopyJson}
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-all"
                >
                    <Save size={20} />
                    Copy Updated JSON
                </button>
            </div>

            <section className="bg-white/50 dark:bg-gray-900/50 p-6 rounded-2xl border">
                <h2 className="text-xl font-bold mb-6 text-emerald-500">Hero Section</h2>
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <input
                            type="text"
                            value={data.hero.name}
                            onChange={(e) => handleHeroChange("name", e.target.value)}
                            className="w-full p-3 bg-transparent border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>
                    {/* Add remaining form fields similarly for contact, about, projects, etc. */}
                </div>
            </section>
        </div>
    );
}
```
