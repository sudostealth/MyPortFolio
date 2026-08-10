"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, Link as LinkIcon, CheckCircle2, ChevronDown, TerminalSquare } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CipherText } from "@/components/ui/CipherText";
import { professional, ProfessionalExperience } from "@/lib/data";

export function ProfessionalExperienceSection() {
  const experiences = professional as ProfessionalExperience[];

  return (
    <section id="experience" className="py-20 md:py-32 relative bg-background-secondary/50 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container-custom relative">
        <SectionHeading
          title="Professional Experience"
          subtitle="cat /experience - Work history & roles"
        />

        <div className="max-w-4xl mx-auto relative pl-4 md:pl-0">
          {/* Vertical Timeline Path */}
          <div className="absolute left-[27px] md:left-[35px] top-6 bottom-0 w-[2px] bg-border z-0" />

          <div className="space-y-8 md:space-y-12">
            {experiences.map((exp, index) => {
              const isExpanded = exp.is_active;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                  className="relative group pl-10 md:pl-16"
                >
                  {/* Timeline Dot & Pulse */}
                  <div className="absolute left-0 md:left-2 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary z-10 flex items-center justify-center">
                    {exp.is_active ? (
                      <>
                        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75 duration-1000" />
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </>
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-foreground-muted" />
                    )}
                  </div>

                  {/* Timeline Pulse Line (Scroll Triggered) */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    whileInView={{ height: "100%", opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`absolute left-[27px] md:left-[35px] top-6 -translate-x-[1px] w-[2px] ${exp.is_active ? 'bg-gradient-to-b from-primary via-primary/50 to-transparent' : 'bg-primary/30'} z-0 origin-top`}
                  />

                  {/* Log Entry Card */}
                  <div className={`relative bg-[#0a0a0a]/90 backdrop-blur-md rounded-lg border transition-all duration-300 ${exp.is_active ? 'border-primary/50 shadow-[0_0_20px_rgba(34,255,136,0.1)]' : 'border-border hover:border-primary/30'}`}>

                    {/* Top Bar / Metadata */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-border/50 bg-[#0d0d0d]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-background border border-border flex items-center justify-center overflow-hidden shrink-0">
                          {exp.organization_logo ? (
                            <img src={exp.organization_logo} alt={exp.organization_name} className="w-5 h-5 object-contain" />
                          ) : (
                            <TerminalSquare className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-foreground font-bold leading-tight">{exp.organization_name}</h4>
                          <div className="text-[10px] uppercase font-mono text-primary/80 flex items-center gap-1.5 mt-0.5">
                            {exp.is_active ? (
                              <span className="flex items-center gap-1 text-primary">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                ACTIVE_SESSION
                              </span>
                            ) : (
                              <span className="text-foreground-muted">DISCONNECTED</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center text-xs text-foreground-muted font-mono mt-3 sm:mt-0 opacity-80">
                        <Calendar className="w-3.5 h-3.5 mr-1.5" />
                        {exp.start_date} - {exp.end_date}
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="p-4 md:p-6">
                      <div className="mb-4">
                        <span className="inline-block text-[10px] uppercase font-mono text-primary/70 mb-1">
                          [ROLE]
                        </span>
                        <h3 className="text-xl font-bold text-primary">
                          {exp.role_title}
                        </h3>
                      </div>

                      <p className="text-sm text-foreground-muted italic mb-5 pl-3 border-l-2 border-primary/30">
                        {exp.description}
                      </p>

                      <div className="mb-6">
                        <span className="inline-block text-[10px] uppercase font-mono text-primary/70 mb-2">
                          [EXECUTION_LOG]
                        </span>
                        <ul className="space-y-3">
                          {exp.key_responsibilities.map((resp, i) => (
                            <li key={i} className="text-sm text-foreground-muted flex items-start group/item">
                              <span className="text-primary mr-2.5 mt-1 font-mono">{">"}</span>
                              <div className="leading-relaxed">
                                {exp.is_active ? (
                                  resp
                                ) : (
                                  <CipherText text={resp} className="inline-block transition-colors group-hover/item:text-foreground" />
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Footer / Tools */}
                      <div className="mt-6 pt-4 border-t border-border/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-2 group/stack">
                          <span className="text-[10px] uppercase font-mono text-foreground-muted mr-1">Stack:</span>
                          {exp.technologies_used.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-[10px] font-mono rounded bg-primary/10 text-primary border border-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_10px_rgba(var(--primary),0.3)]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {exp.reference_links && exp.reference_links.length > 0 && (
                          <div className="flex flex-wrap gap-4">
                            {exp.reference_links.map((link, i) => (
                              <a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-mono text-foreground-muted hover:text-primary transition-colors"
                              >
                                <LinkIcon className="w-3.5 h-3.5" />
                                {link.title}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
