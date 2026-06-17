"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!heroWrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the PortfolioHero for 100vh of scrolling, while it's "pulled up"
      // Note: Because we want Option B (Original website fixed, Hero slides UP like a curtain)
      // The Hero wrapper should be normal document flow but we clip-path it like CinematicFooter
    }, heroWrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full bg-background min-h-screen">

      {/*
        The "Curtain" Wrapper:
        It sits in standard flow. Because it has clip-path, its contents
        are ONLY visible within its bounding box.
        It naturally scrolls up out of view.
      */}
      <div
        ref={heroWrapperRef}
        className="relative h-screen w-full z-50 shadow-2xl bg-background"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <div className="fixed top-0 left-0 h-screen w-full">
          <PortfolioHero />
        </div>
      </div>

      {/* Main Content Wrapper - Revealed underneath */}
      <div id="main-content" className="relative w-full z-20 bg-background border-t border-primary/20">
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
