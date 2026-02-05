"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, FileText, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Typewriter } from "@/components/ui/Typewriter";
import { Terminal } from "@/components/ui/Terminal";
import { personalInfo, typewriterPhrases } from "@/lib/data";

export function Hero() {
  const [thmStats, setThmStats] = useState<{ rank?: string | number }>({});

  useEffect(() => {
    const fetchThmStats = async () => {
      try {
        const res = await fetch("/api/thm");
        if (res.ok) {
          const data = await res.json();
          if (data.rankText) {
             setThmStats({ 
               rank: data.rankText
             });
          }
        }
      } catch (error) {
        console.error("Failed to load THM stats", error);
      }
    };

    fetchThmStats();
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 grid-pattern" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Available for opportunities
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Hi, I&apos;m{" "}
              <span className="gradient-text">{personalInfo.name}</span>
            </h1>

            {/* Typewriter Effect */}
            <div className="h-12 md:h-14 mb-6">
              <p className="text-xl md:text-2xl text-primary font-mono">
                <Typewriter
                  phrases={typewriterPhrases}
                  typingSpeed={80}
                  deletingSpeed={40}
                  pauseDuration={2500}
                />
              </p>
            </div>

            {/* Subtitle */}
            <p className="text-lg text-foreground-muted mb-8 max-w-xl mx-auto lg:mx-0">
              {personalInfo.subtitle}. 4th-year CSE student passionate about
              uncovering vulnerabilities and strengthening digital defenses.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                variant="primary"
                size="lg"
                leftIcon={<FileText className="w-5 h-5" />}
                onClick={() => window.open(personalInfo.resumeUrl, "_blank")}
              >
                View Resume
              </Button>
              <Button
                variant="outline"
                size="lg"
                leftIcon={<Mail className="w-5 h-5" />}
                onClick={scrollToContact}
              >
                Contact Me
              </Button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-8 mt-10 justify-center lg:justify-start"
            >
              {[
                { value: personalInfo.stats.ctfChallenges, label: "CTF Challenges" },
                { value: thmStats.rank || personalInfo.stats.tryhackmeRank, label: "TryHackMe Rank" },
                { value: personalInfo.stats.projects, label: "Projects" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {stat.value ? (
                       // If value is numeric and large, format it? Or just show as is.
                       // THM Rank is usually just a number like 23049. 
                       // Check if it's the string "Top 1%" from fallback.
                       stat.value
                    ) : (
                      <span className="animate-pulse">...</span>
                    )}
                  </p>
                  <p className="text-sm text-foreground-muted">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <Terminal />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1 },
            y: { duration: 1.5, repeat: Infinity },
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground-muted hover:text-primary transition-colors"
          aria-label="Scroll to About section"
        >
          <span className="text-sm">Scroll Down</span>
          <ArrowDown className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Mobile Terminal */}
      <div className="lg:hidden container-custom mt-12">
        <Terminal />
      </div>
    </section>
  );
}
