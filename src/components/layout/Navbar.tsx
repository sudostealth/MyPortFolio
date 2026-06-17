"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { Menu, X, Shield } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme";
import { navLinks } from "@/lib/data";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const backgroundGradient = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "linear-gradient(to right, var(--primary), var(--primary))",
      "linear-gradient(to right, var(--primary), var(--secondary))",
      "linear-gradient(to right, var(--primary), var(--secondary), var(--accent))"
    ]
  );

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Only show the navbar after scrolling past the new PortfolioHero (100vh - a small buffer)
      setIsVisible(window.scrollY > window.innerHeight - 100);

      // Update active section based on scroll position
      const sections = navLinks.map((link) => link.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.getElementById(href.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-lg shadow-primary/5"
          : "bg-transparent"
      } ${!isVisible ? "pointer-events-none" : ""}`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="#home"
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-2 group"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Shield className="w-8 h-8 text-primary" />
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            <span className="text-xl font-bold text-foreground">
              <span className="text-primary">&lt;</span>
              MD. SAZIB
              <span className="text-primary">/&gt;</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  activeSection === link.href.replace("#", "")
                    ? "text-primary"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                {link.name}
                {activeSection === link.href.replace("#", "") && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right side - Theme Switcher & Mobile Menu */}
          <div className="flex items-center gap-3">
            <ThemeSwitcher />

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-background-secondary border border-border hover:border-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2 border-t border-border">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleNavClick(link.href)}
                    className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeSection === link.href.replace("#", "")
                        ? "bg-primary/10 text-primary"
                        : "text-foreground-muted hover:bg-background-secondary hover:text-foreground"
                    }`}
                  >
                    <span className="text-primary mr-2">$</span>
                    {link.name.toLowerCase()}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[3px] md:h-[4px] origin-left z-50"
        style={{
          scaleX,
          background: backgroundGradient,
          boxShadow: "0 0 10px rgba(5, 150, 105, 0.5)",
        }}
      />
    </motion.header>
  );
}
