import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Achievements } from "@/components/Achievements";
import portfolioData from "@/data/portfolio.json";
import { PortfolioData } from "@/types/portfolio";

export default function Home() {
  const data = portfolioData as PortfolioData;

  return (
    <main className="min-h-screen">
      <Hero data={data.hero} />
      <About data={data.about} />
      <Projects data={data.projects} />
      <Experience data={data.experience} />
      <Achievements data={data.achievements} />

      <footer className="py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} {data.hero.name}. All rights reserved.</p>
      </footer>
    </main>
  );
}
