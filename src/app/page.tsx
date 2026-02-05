import { Navbar, Footer } from "@/components/layout";
import {
  Hero,
  About,
  Skills,
  Projects,
  Certificates,
  Badges,
  Thesis,
  Extracurriculars,
  Contact,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <About />
        <Certificates />
        <Thesis />
        <Badges />
        <Extracurriculars />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
