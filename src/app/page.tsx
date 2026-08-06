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

export default function Home() {
  return (
    <div className="relative w-full bg-background min-h-screen">
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
    </div>
  );
}
