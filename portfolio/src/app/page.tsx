import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { AchievementsSection } from "@/components/AchievementsSection";
import { Footer } from "@/components/Footer";
import portfolioDataRaw from "@/data/portfolio.json";
import { PortfolioData } from "@/types/portfolio";

const portfolioData = portfolioDataRaw as PortfolioData;

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection hero={portfolioData.hero} />
        <AboutSection about={portfolioData.about} skills={portfolioData.skills} />
        <ExperienceSection experience={portfolioData.experience} />
        <ProjectsSection projects={portfolioData.projects} />
        <AchievementsSection achievements={portfolioData.achievements} />
      </main>
      <Footer contact={portfolioData.contact} />
    </div>
  );
}
