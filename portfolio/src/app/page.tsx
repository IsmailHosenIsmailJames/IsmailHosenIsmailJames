import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Achievements } from "@/components/Achievements";
import portfolioData from "@/data/portfolio.json";
import { PortfolioData } from "@/types/portfolio";

export default function Home() {
  const data = portfolioData as PortfolioData;

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 md:px-8">
        <Hero data={data.hero} contact={data.contact} />
        <About data={data.about} skills={data.skills} />
        <Experience data={data.experience} />
        <Achievements data={data.achievements} />
        <Projects data={data.projects} />
      </main>

      <footer className="py-8 text-center text-zinc-500 dark:text-zinc-400 text-sm border-t border-emerald-500/20">
        <p>© {new Date().getFullYear()} {data.hero.name}. Built with Next.js & Tailwind CSS.</p>
      </footer>
    </div>
  );
}
