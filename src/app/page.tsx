import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { Projects } from "@/components/Projects"
import { Experience } from "@/components/Experience"
import { Achievements } from "@/components/Achievements"
import { Contact } from "@/components/Contact"
import portfolioData from "@/data/portfolio.json"

export default function Home() {
  return (
    <div className="space-y-12 pb-12">
      <Hero data={portfolioData.hero} />
      <About data={portfolioData.about} />
      <Projects data={portfolioData.projects} />
      <Experience data={portfolioData.experience} />
      <Achievements data={portfolioData.achievements} />
      <Contact data={portfolioData.contact} />
    </div>
  )
}
