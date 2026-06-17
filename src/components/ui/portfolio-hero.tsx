"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import personalData from "@/data/personal.json";
import { useTheme } from "next-themes";

// BlurText animation component
interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("");
  }, [text, animateBy]);

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView
              ? "translateY(0)"
              : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: `all 0.5s ease-out ${i * delay}ms`,
          }}
        >
          {segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
};

export default function PortfolioHero() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const menuItems = [
    { label: "HOME", href: "#", highlight: true },
    { label: "ABOUT", href: "#about" },
    { label: "PROJECTS", href: "#projects" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "EDUCATION", href: "#education" },
    { label: "CONTACT", href: "#contact" },
  ];

  const handleScrollDown = () => {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Safe checks for theme after mount
  const isDark = mounted && theme === "dark";

  // Split name for stacking
  const nameParts = personalData.name.split(" ");
  const firstName = nameParts[0] || "MD.";
  const lastName = nameParts.slice(1).join(" ") || "SAZIB";

  if (!mounted) {
    return null; // Return null on first render to avoid hydration mismatch
  }

  return (
    <div className="relative min-h-screen text-foreground transition-colors bg-background flex flex-col justify-between">
      {/* Grid Pattern Background to match theme */}
      <div className="absolute inset-0 grid-pattern opacity-50 pointer-events-none" />

      {/* Hero Section */}
      <main className="flex-1 relative flex flex-col justify-center items-center">
        {/* Centered Main Name */}
        <div className="w-full px-4 mt-10 z-10">
          <div className="relative text-center">
            <div>
              <BlurText
                text={firstName}
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] leading-[0.8] tracking-tighter uppercase justify-center whitespace-nowrap text-primary text-glow-primary"
                style={{ fontFamily: "var(--font-mono)" }}
              />
            </div>
            <div>
              <BlurText
                text={lastName}
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] leading-[0.8] tracking-tighter uppercase justify-center whitespace-nowrap text-primary text-glow-primary"
                style={{ fontFamily: "var(--font-mono)" }}
              />
            </div>

            {/* Profile Picture */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px] rounded-full overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-110 cursor-pointer border border-primary glow-primary">
                <img
                  src="https://avatars.githubusercontent.com/u/122990604?v=4"
                  alt="Profile"
                  className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="absolute bottom-24 sm:bottom-28 md:bottom-32 lg:bottom-40 left-1/2 -translate-x-1/2 w-full px-6 z-10">
          <div className="flex justify-center">
            <BlurText
              text={personalData.title}
              delay={150}
              animateBy="words"
              direction="top"
              className="text-[16px] sm:text-[18px] md:text-[22px] text-center transition-colors duration-300 text-foreground-muted terminal"
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          type="button"
          onClick={handleScrollDown}
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 transition-colors duration-300 z-10 animate-pulse-slow cursor-pointer"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-8 h-8 md:w-10 md:h-10 text-primary transition-colors duration-300" />
        </button>
      </main>
    </div>
  );
}
