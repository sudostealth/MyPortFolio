"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Crosshair, 
  Code, 
  Terminal, 
  Shield, 
  Cpu, 
  Globe, 
  Database, 
  Server, 
  Zap,
  Layers,
  Wrench
} from "lucide-react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { skillsCategories, SkillCategory, Skill } from "@/lib/data";

// Fallback icon map for categories
const categoryIcons: Record<string, any> = {
  offensive: Crosshair,
  programming: Code,
  tools: Terminal,
  redteam: Shield,
  defensive: Shield,
  networking: Globe,
  cloud: Server,
  default: Layers,
};

const getSlug = (name: string) => {
  // Custom mappings for common tricky ones
  const map: Record<string, string> = {
    "c/c++": "cplusplus",
    "c++": "cplusplus",
    "c#": "csharp",
    ".net": "dot-net",
    "golang": "go",
    "kali linux": "kalilinux",
    "bash scripting": "gnubash",
    "burp suite": "burpsuite",
  };

  const lower = name.toLowerCase();
  if (map[lower]) return map[lower];

  // Standard SimpleIcons slugification:
  // - Replace + with plus
  // - Replace . with dot
  // - Remove whitespace and other chars
  return lower
    .replace(/\+/g, "plus")
    .replace(/\./g, "dot")
    .replace(/[^a-z0-9]/g, "");
};

const SkillIcon = ({ name, categoryColor }: { name: string; categoryColor: string }) => {
  const [error, setError] = useState(false);
  const slug = getSlug(name);
  const iconUrl = `https://cdn.simpleicons.org/${slug}/${categoryColor.replace('text-', '').replace('-500', '')}`;

  if (error) {
    // Return a generic generated initial avatar if icon not found
    return (
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-background border border-border ${categoryColor} font-bold text-lg`}>
        {name.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <div className="w-10 h-10 relative flex items-center justify-center">
      {/* Try to load the icon from SimpleIcons CDN */}
      <img
        src={iconUrl}
        alt={`${name} logo`}
        className="w-8 h-8 object-contain filter drop-shadow-lg transition-transform hover:scale-110"
        onError={() => setError(true)}
        loading="lazy"
      />
    </div>
  );
};

export function Skills() {
  // Dynamically get all categories that are objects (excluding 'other' array)
  const categories = Object.entries(skillsCategories).filter(
    ([key, value]) => key !== "other" && typeof value === "object" && !Array.isArray(value)
  ) as [string, SkillCategory][];

  const otherSkills = (skillsCategories.other || []) as string[];

  return (
    <section id="skills" className="py-20 md:py-32 relative bg-background-secondary/50">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container-custom relative">
        <SectionHeading
          title="Skills"
          subtitle="cat /etc/toolkit - My arsenal of tools and technologies"
        />

        <div className="space-y-16">
          {categories.map(([key, category], index) => {
            // Determine category icon with fallback
            const IconComponent = categoryIcons[key.toLowerCase()] || 
                                (category.icon && categoryIcons[category.icon.toLowerCase()]) || 
                                categoryIcons.default;
            
            // Extract the color value (e.g., "text-red-500" -> "red") for border/glow effects
            const colorBase = category.color?.split("-")[1] || "gray";

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`p-3 rounded-xl bg-background border border-border/50 shadow-lg ${category.color} bg-opacity-10`}>
                    <IconComponent className={`w-8 h-8 ${category.color}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground capitalize">
                      {category.title || key}
                    </h3>
                    <div className="h-1 w-20 rounded-full bg-gradient-to-r from-primary to-transparent mt-2 opacity-50" />
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {category.skills.map((skill: Skill, skillIndex: number) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: index * 0.1 + skillIndex * 0.05,
                        type: "spring",
                        stiffness: 100 
                      }}
                      whileHover={{ 
                        y: -5,
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                      className="group"
                    >
                      <Card 
                        variant="default"
                        hover={false} 
                        className={`h-full flex flex-col items-center justify-center p-6 gap-4 text-center border-border/50 hover:border-${colorBase}-500/50 hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:hover:shadow-${colorBase}-500/10 transition-all duration-300`}
                      >
                        <div className="relative z-10 p-2 rounded-lg bg-background/50 group-hover:bg-background/80 transition-colors">
                          <SkillIcon name={skill.name} categoryColor={category.color} />
                        </div>
                        <span className="font-medium text-sm text-foreground-muted group-hover:text-foreground transition-colors">
                          {skill.name}
                        </span>
                        
                        {/* Hover glow effect */}
                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-${colorBase}-500/5 to-${colorBase}-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Skills Tags */}
        {otherSkills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-20 pt-10 border-t border-border/30 text-center"
          >
            <p className="text-foreground-muted mb-6 text-lg">
              <span className="text-primary font-mono mr-2">ls ./other-skills/</span>
              Technologies & Concepts
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {otherSkills.map((skill: string, index: number) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.03 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 rounded-full bg-background border border-border text-sm font-medium text-foreground-muted hover:border-primary hover:text-primary hover:bg-primary/5 transition-all cursor-default shadow-sm hover:shadow-md"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
