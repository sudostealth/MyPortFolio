"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Folder, Lock, Unlock, Terminal as TerminalIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { projects } from "@/lib/data";

type ProjectCategory = "all" | "Security Tool" | "Web Application" | "Documentation";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string | null;
  demo: string | null;
  category: string;
  isFeatured?: boolean;
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");

  const categories: ProjectCategory[] = [
    "all",
    "Security Tool",
    "Web Application",
    "Documentation",
  ];

  const projectsList = projects as Project[];

  const filteredProjects =
    activeCategory === "all"
      ? projectsList
      : projectsList.filter((p: Project) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="container-custom relative">
        <SectionHeading
          title="Projects"
          subtitle="ls -la /operations - My security projects and tools"
        />

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12 font-mono"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;
            const flagName = category === "all" ? "--all" : `--${category.toLowerCase().replace(" ", "-")}`;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-4 py-2 text-xs md:text-sm transition-all duration-300 overflow-hidden ${
                  isActive
                    ? "text-primary border-b-2 border-primary bg-primary/5"
                    : "text-foreground-muted hover:text-primary border-b-2 border-transparent"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-primary/10 animate-pulse" />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {isActive ? `[x] ${flagName}` : `[ ] ${flagName}`}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: Project, index: number) => {
              // We'll treat the first project as featured if no explicit flag is set,
              // for demonstration purposes if `isFeatured` isn't in JSON yet.
              const isFeatured = project.isFeatured || (index === 0 && activeCategory === "all");
              const slugifiedTitle = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

              return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.1, type: "spring", stiffness: 100 }}
                className={`${isFeatured ? 'md:col-span-2 lg:col-span-2' : ''}`}
              >
                <Card className={`h-full flex flex-col group relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(var(--primary),0.15)] border-border/50 hover:border-primary/50 bg-[#0a0a0a]/80 backdrop-blur-md cursor-default ${isFeatured ? 'border-l-4 border-l-primary/70' : ''}`}>
                  {/* Background glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Glass reflection effect */}
                  <div className="absolute -inset-1 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />

                  {/* Project Image */}
                  <div className={`relative ${isFeatured ? 'h-64 md:h-72' : 'h-56'} overflow-hidden bg-gradient-to-br from-background to-background-secondary border-b border-border/50`}>

                    {/* Terminal Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/80 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 font-mono text-xs pointer-events-none">
                      <div className="text-primary/70 mb-1">$ ./execute_preview.sh</div>
                      <div className="text-green-400 mb-1">{`> cat ${slugifiedTitle}.py`}</div>
                      <div className="text-foreground-muted opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                         Extracting visual assets... [OK]
                      </div>
                      <motion.div
                         animate={{ opacity: [0, 1, 0] }}
                         transition={{ duration: 1, repeat: Infinity }}
                         className="w-2 h-3 bg-primary mt-1"
                      />
                    </div>

                    {/* Cyberpunk grid overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-20 group-hover:opacity-10 transition-opacity duration-500 z-10" />

                    {/* Scan effect overlay */}
                    <div className="absolute left-0 right-0 h-[20%] bg-gradient-to-b from-transparent via-primary/20 to-transparent -translate-y-full group-hover:translate-y-[500%] transition-transform duration-[2s] ease-in-out z-10" />
                    
                    {project.image ? (
                      <div className="w-full h-full p-6 md:p-8 relative z-0">
                         <div className="w-full h-full relative rounded-md overflow-hidden border border-border/30 shadow-2xl">
                           <img
                             src={project.image}
                             alt={project.title}
                             className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[0.2] group-hover:grayscale-0"
                           />
                           {/* Tint overlay */}
                           <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500" />
                         </div>
                      </div>
                    ) : (
                      /* Placeholder content */
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center transform group-hover:scale-110 transition-transform duration-500">
                          <TerminalIcon className="w-12 h-12 text-primary/30 mx-auto mb-2" />
                          <p className="text-xs text-foreground-muted font-mono tracking-wider">
                            [{slugifiedTitle.toUpperCase()}]
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Image vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />

                    {/* Classification Badges */}
                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                       {isFeatured && (
                         <span className="px-2 py-1 bg-primary/20 text-primary border border-primary/30 text-[10px] font-mono uppercase tracking-wider rounded backdrop-blur-md shadow-[0_0_10px_rgba(var(--primary),0.2)]">
                            [FLAGSHIP]
                         </span>
                       )}
                       <span className="px-2 py-1 bg-black/60 text-foreground-muted border border-border text-[10px] font-mono uppercase tracking-wider rounded backdrop-blur-md">
                          CLASS: {project.category.split(' ')[0]}
                       </span>
                    </div>
                  </div>

                  <CardContent className="flex-1 relative z-20 pt-6 px-6">
                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 flex items-center gap-2 group-hover:text-primary transition-colors duration-300">
                      <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
                         <Lock className="absolute inset-0 w-5 h-5 text-primary opacity-70 group-hover:opacity-0 group-hover:scale-50 transition-all duration-300" />
                         <Unlock className="absolute inset-0 w-5 h-5 text-primary opacity-0 scale-150 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 delay-100" />
                      </div>
                      <span className="drop-shadow-sm font-mono tracking-tight">{project.title}</span>
                    </h3>

                    {/* Description */}
                    <p className="text-foreground-muted text-sm mb-6 line-clamp-3 group-hover:text-foreground/80 transition-colors duration-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag: string) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          size="sm"
                          className="group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="px-6 pb-6 relative z-20 flex gap-3">
                    {project.github && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 group/btn relative overflow-hidden hover:border-primary hover:bg-primary/5 transition-all duration-300 font-mono text-xs"
                        leftIcon={<Github className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />}
                        onClick={() => window.open(project.github!, "_blank")}
                      >
                        <span className="relative z-10 group-hover/btn:hidden block">Source</span>
                        <span className="relative z-10 hidden group-hover/btn:block text-primary">git clone</span>
                        <div className="absolute inset-0 bg-primary/10 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300 ease-out" />
                      </Button>
                    )}
                    {project.demo && (
                      <Button
                        variant="primary"
                        size="sm"
                        className="flex-1 group/btn relative overflow-hidden shadow-[0_0_15px_rgba(var(--primary),0.2)] hover:shadow-[0_0_25px_rgba(var(--primary),0.4)] transition-all duration-300 font-mono text-xs"
                        leftIcon={<ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />}
                        onClick={() => window.open(project.demo!, "_blank")}
                      >
                        <span className="relative z-10 group-hover/btn:hidden block">Deploy</span>
                        <span className="relative z-10 hidden group-hover/btn:block">./run</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            rightIcon={<ExternalLink className="w-5 h-5" />}
            onClick={() =>
              window.open("https://github.com/yourusername", "_blank")
            }
          >
            View All on GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
