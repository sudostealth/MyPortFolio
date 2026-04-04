"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Folder, Lock } from "lucide-react";
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
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-background-secondary border border-border text-foreground-muted hover:border-primary hover:text-primary"
              }`}
            >
              {category === "all" ? "All Projects" : category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: Project, index: number) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="h-full flex flex-col group relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(var(--primary),0.2)] border-border/50 hover:border-primary/50 bg-background/60 backdrop-blur-sm cursor-default">
                  {/* Background glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Glass reflection effect */}
                  <div className="absolute -inset-1 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />

                  {/* Project Image */}
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-border/50">
                    {/* Cyberpunk grid overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-20 group-hover:opacity-40 transition-opacity duration-500 z-10" />

                    {/* Scan effect overlay */}
                    <div className="absolute left-0 right-0 h-1/2 bg-gradient-to-b from-transparent via-primary/20 to-transparent -translate-y-full group-hover:translate-y-[200%] transition-transform duration-[1.5s] ease-in-out z-10" />
                    
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      /* Placeholder content */
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center transform group-hover:scale-110 transition-transform duration-500">
                          <Folder className="w-12 h-12 text-primary/50 mx-auto mb-2 drop-shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                          <p className="text-xs text-foreground-muted font-mono tracking-wider">
                            [PROJECT_{project.id}]
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Image vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 z-20 transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
                      <Badge variant="primary" size="sm" className="shadow-[0_0_10px_rgba(var(--primary),0.3)] backdrop-blur-md bg-primary/80">
                        {project.category}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="flex-1 relative z-20 pt-6 px-6">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2 group-hover:text-primary transition-colors duration-300">
                      <Lock className="w-4 h-4 text-primary opacity-70 group-hover:opacity-100 transition-opacity" />
                      <span className="drop-shadow-sm">{project.title}</span>
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
                        className="flex-1 group/btn hover:border-primary hover:bg-primary/10 transition-all duration-300"
                        leftIcon={<Github className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />}
                        onClick={() => window.open(project.github!, "_blank")}
                      >
                        Code
                      </Button>
                    )}
                    {project.demo && (
                      <Button
                        variant="primary"
                        size="sm"
                        className="flex-1 group/btn shadow-[0_0_15px_rgba(var(--primary),0.2)] hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] transition-all duration-300"
                        leftIcon={<ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />}
                        onClick={() => window.open(project.demo!, "_blank")}
                      >
                        Demo
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
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
