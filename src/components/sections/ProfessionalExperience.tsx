"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, Link as LinkIcon, CheckCircle2, ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { professional, ProfessionalExperience } from "@/lib/data";

export function ProfessionalExperienceSection() {
  const experiences = professional as ProfessionalExperience[];
  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="py-20 md:py-32 relative bg-background-secondary/50">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container-custom relative">
        <SectionHeading
          title="Professional Experience"
          subtitle="cat /experience - Work history & roles"
        />

        <div className="max-w-4xl mx-auto space-y-6">
          {experiences.map((exp, index) => {
            const isExpanded = expandedId === exp.id;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative group bg-[#0d0d0d] rounded-xl border transition-all duration-300 ${isExpanded ? 'border-primary/50 shadow-[0_0_20px_rgba(34,255,136,0.1)]' : 'border-border hover:border-primary/30'}`}
              >
                {/* Active Role Indicator */}
                {exp.is_active && (
                  <div className="absolute -left-1 -top-1 w-3 h-3 rounded-full bg-primary z-10 shadow-[0_0_10px_rgba(34,255,136,0.8)]">
                    <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                  </div>
                )}

                {/* Left Rail (Summary) - Clickable for accordion */}
                <div
                  className="flex flex-col md:flex-row md:items-stretch cursor-pointer p-5 md:p-0"
                  onClick={() => toggleExpand(exp.id)}
                >
                  <div className="md:w-1/3 md:p-6 md:border-r border-border/50 flex flex-col justify-between shrink-0">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center overflow-hidden shrink-0">
                          {exp.organization_logo ? (
                            <img src={exp.organization_logo} alt={exp.organization_name} className="w-6 h-6 object-contain" />
                          ) : (
                            <Briefcase className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-foreground font-bold leading-tight">{exp.organization_name}</h4>
                          <div className="text-[10px] uppercase font-mono text-primary/80 mt-1 flex items-center gap-1">
                            {exp.is_active && <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />}
                            {exp.is_active ? 'ACTIVE' : 'COMPLETED'}
                          </div>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-primary mb-2">
                        {exp.role_title}
                      </h3>

                      <span className="inline-block text-xs font-semibold px-2 py-1 bg-background-secondary rounded text-foreground-muted border border-border mb-4">
                        {exp.category}
                      </span>
                    </div>

                    <div className="flex items-center text-xs text-foreground-muted font-mono mt-auto pt-4 md:pt-0 border-t border-border/30 md:border-none">
                      <Calendar className="w-3.5 h-3.5 mr-1.5 opacity-70" />
                      {exp.start_date} - {exp.end_date}
                    </div>
                  </div>

                  {/* Right Panel Header (Mobile preview / Desktop expand indicator) */}
                  <div className="md:w-2/3 flex flex-col justify-center md:p-6 mt-4 md:mt-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm text-foreground-muted line-clamp-2 md:line-clamp-3 transition-opacity ${isExpanded ? 'opacity-0 hidden md:block md:invisible' : 'opacity-100'}`}>
                        {exp.description}
                      </p>
                      <div className="ml-4 shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-background-secondary border border-border group-hover:border-primary/50 transition-colors">
                        <ChevronDown className={`w-4 h-4 text-primary transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Panel Expanded Content (Accordion) */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden w-full md:w-2/3 md:absolute md:top-0 md:right-0"
                    >
                      <div className="p-5 md:p-6 md:pl-8 bg-[#0a0a0a]/95 backdrop-blur-sm h-full border-t md:border-t-0 border-border/50 md:border-l relative z-10 flex flex-col">
                        <p className="text-sm text-foreground-muted italic mb-5 pl-3 border-l-2 border-primary/30">
                          {exp.description}
                        </p>

                        <div className="mb-6 flex-grow">
                          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            Responsibilities & Impact
                          </h4>
                          <ul className="space-y-3">
                            {exp.key_responsibilities.map((resp, i) => (
                              <li key={i} className="text-sm text-foreground-muted flex items-start group/item">
                                <span className="text-primary mr-2.5 mt-1 opacity-70 group-hover/item:opacity-100 transition-opacity">▹</span>
                                <span className="leading-relaxed">{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-auto">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] uppercase font-mono text-foreground-muted mr-1">Stack:</span>
                            {exp.technologies_used.map((tech, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 text-[10px] font-mono rounded bg-primary/10 text-primary border border-primary/20"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {exp.reference_links && exp.reference_links.length > 0 && (
                            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border/30">
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
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
