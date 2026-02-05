"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import thesisData from "@/data/thesis.json";
import { BookOpen, Loader2, CheckCircle2, User, Calendar, Tag } from "lucide-react";

interface ThesisProject {
  id: string;
  title: string;
  description: string;
  role: string;
  institution: string;
  status: string;
  supervisor: string;
  startDate: string;
  endDate?: string;
  tags: string[];
  link?: string;
}

export function Thesis() {
  const { ongoing, completed } = thesisData as { ongoing: ThesisProject[], completed: ThesisProject[] };

  return (
    <section id="thesis" className="py-20 relative">
      <div className="container-custom relative">
        <SectionHeading
          title="Research & Thesis"
          subtitle="grep -r 'Research' ."
        />

        {/* Ongoing Section */}
        {ongoing.length > 0 && (
          <div className="mb-16">
            <ScrollReveal mode="simple">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                   <Loader2 className="w-6 h-6 animate-spin-slow" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Current Research</h3>
              </div>
            </ScrollReveal>

            <div className="grid gap-6">
              {ongoing.map((project, index) => (
                <ScrollReveal key={project.id} mode="simple" delay={index * 0.1}>
                  <Card className="p-6 md:p-8 border-l-4 border-l-primary flex flex-col md:flex-row gap-6 hover:shadow-lg transition-all">
                    <div className="flex-1 space-y-4">
                      <div>
                         <div className="flex items-center gap-2 text-primary font-mono text-xs mb-2">
                            <span className="px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
                              {project.status}
                            </span>
                            <span>{project.startDate} - Present</span>
                         </div>
                         <h4 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                           {project.title}
                         </h4>
                         <p className="text-foreground-muted leading-relaxed">
                           {project.description}
                         </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-xs px-2 py-1 rounded-md bg-secondary/10 text-secondary border border-secondary/20">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="md:w-64 flex flex-col gap-3 text-sm text-foreground-muted bg-background/50 p-4 rounded-lg border border-border h-fit">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        <span>{project.role}</span>
                      </div>
                       <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <span>{project.institution}</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <User className="w-4 h-4 text-primary" />
                         <span className="text-xs">Supervisor: {project.supervisor}</span>
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* Completed Section (Conditionally Rendered) */}
        {completed.length > 0 && (
          <div>
            <ScrollReveal mode="simple" delay={0.2}>
              <div className="flex items-center gap-3 mb-8">
                 <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                   <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Published / Completed</h3>
              </div>
            </ScrollReveal>

            <div className="grid gap-6">
              {completed.map((project, index) => (
                <ScrollReveal key={project.id} mode="simple" delay={0.3 + (index * 0.1)}>
                   <Card className="p-6 opacity-80 hover:opacity-100 transition-opacity">
                      <h4 className="text-xl font-bold text-foreground">{project.title}</h4>
                      <p className="text-sm text-foreground-muted mt-2">{project.description}</p>
                   </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
