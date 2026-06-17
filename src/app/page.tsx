import { Navbar, Footer } from "@/components/layout";
import {
  Hero,
  About,
  Skills,
  Projects,
  Certificates,
  Badges,
  Thesis,
  Courses,
  Extracurriculars,
  Contact,
} from "@/components/sections";
import PortfolioHero from "@/components/ui/portfolio-hero";

export default function Home() {
  return (
    <>
      {/* New top-level hero component acting as landing view */}
      <PortfolioHero />

      {/* Main Content Wrapper - target for the scroll down arrow */}
      <div id="main-content" className="relative w-full z-20 bg-background border-t border-primary/20 shadow-2xl">
        <Navbar />
        <main className="min-h-screen">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Courses />
          <Certificates />
          <Thesis />
          <Badges />
          <Extracurriculars />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
