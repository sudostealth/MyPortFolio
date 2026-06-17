"use client";

import React from "react";
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
    <div className="relative w-full bg-background min-h-screen">

      {/* Top-level hero component acting as landing view */}
      <div className="relative w-full min-h-screen z-10 bg-background">
        <PortfolioHero />
      </div>

      {/* Main Content Wrapper - Flows naturally below the hero */}
      <div id="main-content" className="relative w-full z-20 bg-background border-t border-primary/20 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
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
    </div>
  );
}
