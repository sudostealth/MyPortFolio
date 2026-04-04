"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Wrench,
  X
} from "lucide-react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
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
    "c": "c",
    "c++": "cplusplus",
    "c#": "csharp",
    ".net": "dot-net",
    "golang": "go",
    "kali linux": "kalilinux",
    "bash scripting": "gnubash",
    "burp suite": "burpsuite",
    "vscode": "visualstudiocode",
    "linux": "linux",
    "wazuh": "wazuh",
    "wireshark": "wireshark",
    "docker": "docker"
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
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const slug = getSlug(name);

  useEffect(() => {
    // Some mapping for Devicon specific naming conventions
    const deviconMap: Record<string, string> = {
      "cplusplus": "cplusplus-plain",
      "c": "c-plain",
      "csharp": "csharp-plain",
      "go": "go-original-wordmark",
      "python": "python-original",
      "javascript": "javascript-plain",
      "html5": "html5-plain",
      "css3": "css3-plain",
      "bash": "bash-plain",
      "php": "php-plain",
      "docker": "docker-plain",
      "git": "git-plain",
      "github": "github-original",
      "linux": "linux-plain",
      "ubuntu": "ubuntu-plain",
      "windows": "windows8-original",
      "apple": "apple-original",
      "android": "android-plain",
      "mysql": "mysql-plain",
      "postgresql": "postgresql-plain",
      "mongodb": "mongodb-plain",
      "react": "react-original",
      "nextjs": "nextjs-original",
      "nodejs": "nodejs-plain",
      "express": "express-original",
      "visualstudiocode": "vscode-plain",
      "dot-net": "dot-net-plain-wordmark"
    };

    const deviconSlug = deviconMap[slug] || `${slug}-plain`;
    const deviconUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${deviconSlug}.svg`;

    // Test if Devicon exists, otherwise fallback to SimpleIcons
    const img = new window.Image();
    img.src = deviconUrl;
    img.onload = () => setImgSrc(deviconUrl);
    img.onerror = () => {
      // Fallback to simpleicons using the default brand color (by omitting the color parameter)
      const simpleIconUrl = `https://cdn.simpleicons.org/${slug}`;
      const simpleImg = new window.Image();
      simpleImg.src = simpleIconUrl;
      simpleImg.onload = () => setImgSrc(simpleIconUrl);
      simpleImg.onerror = () => setError(true);
    };
  }, [slug]);

  if (error || !imgSrc) {
    // Return a generic generated initial avatar if icon not found or while loading
    return (
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-background border border-border ${categoryColor} font-bold text-lg animate-pulse`}>
        {name.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <div className="w-10 h-10 relative flex items-center justify-center">
      <img
        src={imgSrc}
        alt={`${name} logo`}
        className="w-8 h-8 object-contain filter drop-shadow-lg transition-all duration-500 transform group-hover:scale-125 group-hover:-rotate-12 group-hover:drop-shadow-[0_0_8px_rgba(0,255,0,0.5)]"
        loading="lazy"
      />
    </div>
  );
};

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<{key: string, data: SkillCategory} | null>(null);

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
                  <div className="flex-1 flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground capitalize">
                        {category.title || key}
                      </h3>
                      <div className="h-1 w-20 rounded-full bg-gradient-to-r from-primary to-transparent mt-2 opacity-50" />
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCategory({key, data: category})}
                      className="hidden sm:flex text-sm"
                    >
                      View All
                    </Button>
                  </div>
                </div>

                {/* Skills Scrolling Effect Wrapper */}
                <div className="relative overflow-hidden w-full group/marquee pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                  <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-background-secondary/50 via-background-secondary/20 to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-background-secondary/50 via-background-secondary/20 to-transparent z-10 pointer-events-none" />

                  <motion.div
                    className="flex gap-4 sm:gap-6 min-w-max"
                    animate={{
                      x: ["0%", "-50%"]
                    }}
                    transition={{
                      duration: 25,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                    // Note: We duplicate the skills array to create a seamless infinite scroll loop
                  >
                    {[...category.skills, ...category.skills].map((skill: Skill, skillIndex: number) => (
                      <motion.div
                        key={`${skill.name}-${skillIndex}`}
                        className="w-32 sm:w-40 flex-shrink-0 group relative"
                        whileHover={{
                          y: -10,
                          scale: 1.05,
                          transition: { type: "spring", stiffness: 300 }
                        }}
                      >
                        <Card
                          variant="default"
                          hover={false}
                          className={`h-full flex flex-col items-center justify-center p-4 sm:p-6 gap-3 sm:gap-4 text-center border-border/50 hover:border-${colorBase}-500/60 bg-background/60 backdrop-blur-sm relative overflow-hidden transition-all duration-300`}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br from-${colorBase}-500/0 via-transparent to-${colorBase}-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500`} />

                          <div className={`absolute -inset-0.5 rounded-xl bg-gradient-to-br from-${colorBase}-500/0 to-${colorBase}-500/0 group-hover:from-${colorBase}-500/50 group-hover:to-transparent opacity-0 group-hover:opacity-100 blur-md transition-all duration-500`} />

                          <div className={`relative z-10 p-2 sm:p-3 rounded-xl bg-background/50 group-hover:bg-background/80 shadow-inner border border-transparent group-hover:border-${colorBase}-500/20 transition-all duration-300`}>
                            <SkillIcon name={skill.name} categoryColor={category.color} />
                          </div>

                          <span className={`relative z-10 font-bold text-xs sm:text-sm text-foreground-muted group-hover:text-${colorBase}-500 transition-colors duration-300 drop-shadow-sm`}>
                            {skill.name}
                          </span>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Mobile View All Button */}
                <div className="mt-4 flex justify-end sm:hidden">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCategory({key, data: category})}
                    className="text-sm"
                  >
                    View All
                  </Button>
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

      {/* Modal for View All */}
      <AnimatePresence>
        {selectedCategory && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCategory(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[85vh] bg-background-secondary border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/50">
                <div className="flex items-center gap-3">
                  {(() => {
                    const CatIcon = categoryIcons[selectedCategory.key.toLowerCase()] ||
                                (selectedCategory.data.icon && categoryIcons[selectedCategory.data.icon.toLowerCase()]) ||
                                categoryIcons.default;
                    return (
                      <div className={`p-2 rounded-lg bg-background border border-border/50 ${selectedCategory.data.color} bg-opacity-10`}>
                        <CatIcon className={`w-6 h-6 ${selectedCategory.data.color}`} />
                      </div>
                    );
                  })()}
                  <h3 className="text-2xl font-bold text-foreground capitalize">
                    {selectedCategory.data.title || selectedCategory.key} Skills
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="p-2 rounded-full hover:bg-background transition-colors text-foreground-muted hover:text-foreground"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content - Grid */}
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {selectedCategory.data.skills.map((skill: Skill, index: number) => {
                    const colorClassMap: Record<string, string> = {
                      red: "hover:border-red-500/60",
                      blue: "hover:border-blue-500/60",
                      green: "hover:border-green-500/60",
                      yellow: "hover:border-yellow-500/60",
                      purple: "hover:border-purple-500/60",
                      orange: "hover:border-orange-500/60",
                      cyan: "hover:border-cyan-500/60",
                      gray: "hover:border-gray-500/60"
                    };
                    const innerColorClassMap: Record<string, string> = {
                      red: "group-hover:border-red-500/20",
                      blue: "group-hover:border-blue-500/20",
                      green: "group-hover:border-green-500/20",
                      yellow: "group-hover:border-yellow-500/20",
                      purple: "group-hover:border-purple-500/20",
                      orange: "group-hover:border-orange-500/20",
                      cyan: "group-hover:border-cyan-500/20",
                      gray: "group-hover:border-gray-500/20"
                    };
                    const colorBase = selectedCategory.data.color?.split("-")[1] || "gray";
                    const hoverBorderClass = colorClassMap[colorBase] || colorClassMap.gray;
                    const innerHoverBorderClass = innerColorClassMap[colorBase] || innerColorClassMap.gray;
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card
                          variant="default"
                          className={`h-full flex flex-col items-center justify-center p-4 gap-3 text-center border-border/50 ${hoverBorderClass} bg-background/60 transition-all duration-300 group`}
                        >
                          <div className={`p-3 rounded-xl bg-background shadow-inner border border-transparent ${innerHoverBorderClass} transition-all duration-300`}>
                            <SkillIcon name={skill.name} categoryColor={selectedCategory.data.color} />
                          </div>
                          <span className="font-bold text-sm text-foreground-muted group-hover:text-foreground transition-colors duration-300">
                            {skill.name}
                          </span>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
