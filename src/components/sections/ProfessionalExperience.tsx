"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, Link as LinkIcon, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { professional, ProfessionalExperience } from "@/lib/data";

export function ProfessionalExperienceSection() {
  const experiences = professional as ProfessionalExperience[];

  return (
    <section id="experience" className="py-20 md:py-32 relative bg-background-secondary/50">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container-custom relative">
        <SectionHeading
          title="Professional Experience"
          subtitle="cat /experience - Work history & roles"
        />

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical Timeline Spine */}
          <div className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-border hidden sm:block" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-0 sm:pl-24 md:pl-32 mb-12 last:mb-0 group"
            >
              {/* Organization Logo Node */}
              <div className="hidden sm:flex absolute left-0 md:left-6 -translate-x-1/2 w-12 h-12 rounded-full bg-background border-2 border-border group-hover:border-primary items-center justify-center overflow-hidden z-10 transition-colors shadow-sm">
                {exp.organization_logo ? (
                  <img src={exp.organization_logo} alt={exp.organization_name} className="w-8 h-8 object-contain" />
                ) : (
                  <Briefcase className="w-5 h-5 text-primary" />
                )}
              </div>

              <Card className="p-6 hover:shadow-lg hover:border-primary/30 transition-all">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-1">
                      {exp.role_title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-foreground">{exp.organization_name}</span>
                      {exp.is_active && (
                        <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-accent/20 text-accent border border-accent/30">
                          Active
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-background-secondary rounded-md text-foreground-muted border border-border">
                      {exp.category}
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-foreground-muted bg-background/50 px-3 py-1.5 rounded-full border border-border whitespace-nowrap">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    <span>{exp.start_date} - {exp.end_date}</span>
                  </div>
                </div>

                <p className="text-sm text-foreground-muted italic mb-4 border-l-2 border-primary/30 pl-3">
                  {exp.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-2">
                    {exp.key_responsibilities.map((resp, i) => (
                      <li key={i} className="text-sm text-foreground-muted flex items-start">
                        <span className="text-primary mr-2 mt-1">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-xs font-medium text-foreground mr-1">Tech & Tools:</span>
                  {exp.technologies_used.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {exp.reference_links && exp.reference_links.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-border">
                    {exp.reference_links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-foreground-muted hover:text-primary transition-colors"
                      >
                        <LinkIcon className="w-3.5 h-3.5" />
                        {link.title}
                      </a>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
