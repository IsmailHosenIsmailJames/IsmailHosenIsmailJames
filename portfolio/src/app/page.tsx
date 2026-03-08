import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Achievements } from "@/components/Achievements";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Achievements />
      </main>

      <footer className="py-8 text-center text-foreground/50 text-sm border-t border-primary-100 dark:border-primary-900/20">
        <p>© {new Date().getFullYear()} Ismail Hossain. Built with Next.js & Tailwind CSS.</p>
      </footer>
    </div>
  );
}
