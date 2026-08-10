"use client";

import { motion, useInView } from "framer-motion";
import { Heart, Github, Linkedin, Twitter, Shield, Box, ArrowUp, Mail, MapPin } from "lucide-react";
import { socialLinks, personalInfo } from "@/lib/data";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useState, useEffect, useRef } from "react";
import { Typewriter } from "@/components/ui/Typewriter";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Linkedin,
  Twitter,
  Shield,
  Box,
};

export function Footer() {
  const [uptime, setUptime] = useState("00:00:00");
  const terminalRef = useRef(null);
  const isInView = useInView(terminalRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const diff = Math.floor((Date.now() - startTime) / 1000);
      const hours = Math.floor(diff / 3600).toString().padStart(2, '0');
      const minutes = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
      const seconds = (diff % 60).toString().padStart(2, '0');
      setUptime(`${hours}:${minutes}:${seconds}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background border-t border-border overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 bg-scanline pointer-events-none opacity-5 animate-scan-sweep" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="relative container-custom pt-32 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="md:col-span-5">
            <ScrollReveal mode="slide" direction="left">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground tracking-tight">
                    {personalInfo.name}
                  </h2>
                  <p className="text-sm text-primary font-mono">{personalInfo.title}</p>
                </div>
              </div>
              <p className="text-foreground-muted leading-relaxed mb-8 max-w-sm">
                Specializing in Offensive Security, Red Teaming, and Full Stack Development. 
                Building secure, resilient, and scalable digital solutions.
              </p>
              
              <div className="flex gap-3">
                {socialLinks.map((link, index) => {
                  const Icon = iconMap[link.icon] || Shield;
                  return (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={link.name === "GitHub" ? { y: -3, scale: 1.05 } : { y: -3, scale: 1.05 }}
                      className="group relative p-3 rounded-lg bg-background-secondary border border-border text-foreground-muted hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all shadow-sm overflow-hidden"
                      aria-label={link.name}
                    >
                      {/* Custom Hover Effects based on platform */}
                      {link.name === "GitHub" && (
                         <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity" />
                      )}
                      {(link.name === "LinkedIn" || link.name === "Twitter") && (
                         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-700 ease-in-out pointer-events-none" />
                      )}
                      {link.name === "TryHackMe" && (
                         <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg z-0" />
                      )}

                      <Icon className="w-5 h-5 relative z-10" />
                    </motion.a>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6">
            <ScrollReveal mode="simple" delay={0.2} width="100%">
              <h3 className="font-bold text-foreground mb-6">Navigate</h3>
              <ul className="space-y-4">
                <li><a href="#about" className="text-foreground-muted hover:text-primary transition-colors text-sm">About</a></li>
                <li><a href="#skills" className="text-foreground-muted hover:text-primary transition-colors text-sm">Skills</a></li>
                <li><a href="#projects" className="text-foreground-muted hover:text-primary transition-colors text-sm">Projects</a></li>
                <li><a href="#contact" className="text-foreground-muted hover:text-primary transition-colors text-sm">Contact</a></li>
              </ul>
            </ScrollReveal>

            <ScrollReveal mode="simple" delay={0.3} width="100%">
              <div
                ref={terminalRef}
                className="rounded-lg bg-black/80 border border-primary/20 p-4 font-mono text-xs h-40 overflow-hidden relative"
              >
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                 <div className="absolute inset-0 bg-scanline pointer-events-none opacity-10" />
                 
                 <div className="space-y-1.5 text-primary/80">
                    {isInView ? (
                      <>
                        <Typewriter
                          phrases={["./init_footer.sh"]}
                          typingSpeed={40}
                          className="text-blue-400"
                        />
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1 }}
                        >
                          <p className="text-green-500">✓ Loading assets... Done</p>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.5 }}
                        >
                          <p className="text-green-500">✓ Establishing secure connection...</p>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2 }}
                        >
                          <p className="opacity-70">Detecting user agent... [Confirmed]</p>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2.5 }}
                        >
                          <p className="opacity-70">Optimizing animations... [OK]</p>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 3 }}
                          className="flex items-center gap-1 mt-2"
                        >
                          <span className="text-blue-400">root@portfolio</span>:<span className="text-white">~</span>$
                          <motion.div
                             animate={{ opacity: [0, 1, 0] }}
                             transition={{ duration: 1, repeat: Infinity }}
                             className="w-2 h-4 bg-primary inline-block align-middle ml-1"
                          />
                        </motion.div>
                      </>
                    ) : (
                      <p>
                        <span className="text-blue-400">root@portfolio</span>:<span className="text-white">~</span>$
                      </p>
                    )}
                 </div>
              </div>
            </ScrollReveal>

            <ScrollReveal mode="simple" delay={0.4} width="100%">
              <h3 className="font-bold text-foreground mb-6">Contact</h3>
              <ul className="space-y-4">
                <li>
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 text-foreground-muted hover:text-primary transition-colors text-sm group">
                    <Mail className="w-4 h-4 group-hover:animate-bounce" />
                    <span>Email Me</span>
                  </a>
                </li>
                <li className="flex items-center gap-2 text-foreground-muted text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{personalInfo.location || "Remote"}</span>
                </li>
              </ul>
            </ScrollReveal>
          </div>
        </div>

        {/* Footer Bottom */}
        <ScrollReveal mode="simple" delay={0.5} width="100%">
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-foreground-muted text-sm">
                &copy; {currentYear} {personalInfo.name}. All rights reserved.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <p className="hidden md:flex items-center gap-2 text-xs font-mono text-primary/70 bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                UPTIME: [{uptime}]
              </p>
              
              <motion.button
                onClick={scrollToTop}
                whileHover={{ y: -3, backgroundColor: "var(--primary)", color: "#ffffff", borderColor: "var(--primary)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background border border-border text-foreground-muted transition-colors text-sm font-medium shadow-sm"
              >
                <span>Top</span>
                <ArrowUp className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
