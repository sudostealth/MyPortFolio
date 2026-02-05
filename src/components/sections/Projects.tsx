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
                <Card className="h-full flex flex-col group">
                  {/* Project Image */}
                  <div className="relative h-48 rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-primary/10 to-secondary/10 border border-border group-hover:border-primary transition-colors">
                    {/* Scan effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 z-10" />
                    
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      /* Placeholder content */
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Folder className="w-12 h-12 text-primary/50 mx-auto mb-2" />
                          <p className="text-xs text-foreground-muted font-mono">
                            [PROJECT_{project.id}]
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-3 right-3 z-20">
                      <Badge variant="primary" size="sm">
                        {project.category}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="flex-1">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-primary" />
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-foreground-muted text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag: string) => (
                        <Badge key={tag} variant="outline" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter>
                    {project.github && (
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<Github className="w-4 h-4" />}
                        onClick={() => window.open(project.github!, "_blank")}
                      >
                        Code
                      </Button>
                    )}
                    {project.demo && (
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<ExternalLink className="w-4 h-4" />}
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
