
"use client";

import React, { useEffect, useRef } from "react";
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

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const newHeroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Pin the whole container over the top part of main-content
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => "+=" + (window.innerHeight),
        pin: true,
        scrub: 1,
        animation: gsap.to(newHeroRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          ease: "none"
        }),
        onLeave: (self) => {
          setTimeout(() => {
            if (newHeroRef.current) {
              newHeroRef.current.style.display = "none";
            }
            // Record current scroll position
            const currentScroll = window.scrollY;
            const spacerHeight = window.innerHeight;

            // Kill the ScrollTrigger and its pin spacer
            self.kill(true);

            // Restore the scroll position visually to avoid jumping
            window.scrollTo(0, currentScroll - spacerHeight);
          }, 0);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full bg-background min-h-screen">

      <div ref={containerRef} className="relative w-full z-10">

        {/* Main Content Wrapper - Flows naturally from top.
            We render it completely normally! */}
        <div id="main-content" className="relative w-full z-20 bg-background shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
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

        {/* New Hero - Top layer that clips out.
            It's absolutely positioned over the very top of main-content.
            GSAP will PIN this element, keeping it fixed over the viewport, while main-content scrolls up behind it! */}
        <div
          ref={newHeroRef}
          className="absolute top-0 left-0 w-full h-screen z-30 bg-background"
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        >
          <PortfolioHero />
        </div>
      </div>

    </div>
  );
}
