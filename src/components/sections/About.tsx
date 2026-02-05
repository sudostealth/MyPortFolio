"use client";

import { motion } from "framer-motion";
import { MapPin, GraduationCap, Target, Code } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { personalInfo } from "@/lib/data";

export function About() {
  const highlights = [
    {
      icon: GraduationCap,
      title: "4th Year CSE Student",
      description: "Pursuing B.Sc. in Computer Science & Engineering",
    },
    {
      icon: Target,
      title: "Red Team Focus",
      description: "Specialized in offensive security and penetration testing",
    },
    {
      icon: Code,
      title: "Security Researcher",
      description: "Active bug bounty hunter and CTF competitor",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="container-custom relative">
        <SectionHeading
          title="About Me"
          subtitle="whoami - A glimpse into my journey"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Avatar & Quick Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Terminal-style frame */}
            <div className="relative rounded-xl overflow-hidden border border-border bg-background-secondary">
              {/* Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-background border-b border-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs text-foreground-muted font-mono">
                  about.sh
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Avatar Image */}
                <div className="aspect-square max-w-xs mx-auto mb-6 rounded-lg overflow-hidden border border-border relative">
                  <img 
                    src={personalInfo.avatar} 
                    alt={personalInfo.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Quick Info */}
                <div className="space-y-3 font-mono text-sm">
                  <p className="text-foreground-muted">
                    <span className="text-primary">$ </span>
                    <span className="text-secondary">echo</span> $NAME
                  </p>
                  <p className="text-foreground pl-4">{personalInfo.name}</p>

                  <p className="text-foreground-muted">
                    <span className="text-primary">$ </span>
                    <span className="text-secondary">echo</span> $ROLE
                  </p>
                  <p className="text-foreground pl-4">{personalInfo.title}</p>

                  <p className="text-foreground-muted flex items-center gap-2">
                    <span className="text-primary">$ </span>
                    <span className="text-secondary">location</span>
                    <MapPin className="w-4 h-4 text-primary" />
                  </p>
                  <p className="text-foreground pl-4">{personalInfo.location}</p>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -z-10 -top-10 -right-10 w-40 h-40 border border-primary/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -z-10 -bottom-10 -left-10 w-60 h-60 border border-secondary/20 rounded-full"
            />
          </motion.div>

          {/* Right - Bio & Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Bio */}
            <div className="prose prose-invert max-w-none">
              <p className="text-foreground-muted leading-relaxed text-lg">
                {personalInfo.bio}
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid gap-4 mt-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start gap-4 p-4 rounded-lg bg-background-secondary/50 border border-border hover:border-primary/50 transition-colors group"
                >
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-foreground-muted">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Fun Fact */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="p-4 rounded-lg border border-primary/30 bg-primary/5"
            >
              <p className="text-sm text-foreground-muted">
                <span className="text-primary font-mono">/* </span>
                Fun Fact: I once spent 48 hours straight solving a CTF challenge. 
                Coffee is my primary fuel for vulnerability hunting.
                <span className="text-primary font-mono"> */</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
