"use client";

import { motion } from "framer-motion";
import { Terminal, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education } from "@/lib/data";

interface Education {
  id: number;
  degree: string;
  institution: string;
  location: string;
  year: string;
  description: string;
  gpa: string;
}

export function Education() {
  const educationList = education as Education[];

  return (
    <section id="education" className="py-20 md:py-32 relative bg-background">
      <div className="container-custom relative">
        <SectionHeading
          title="Education"
          subtitle="cat /education.log - Academic background"
        />

        <div className="max-w-4xl mx-auto">
          {/* Terminal Window Container */}
          <div className="rounded-xl overflow-hidden border border-border bg-[#0a0a0a] shadow-2xl">
            {/* Terminal Header Bar */}
            <div className="bg-[#1a1a1a] px-4 py-3 flex items-center border-b border-border/50">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="flex-1 flex justify-center items-center text-xs text-foreground-muted font-mono opacity-60">
                <Terminal className="w-3 h-3 mr-1.5" />
                education.log
              </div>
            </div>

            {/* Terminal Content (Log style) */}
            <div className="p-6 md:p-8 font-mono text-sm relative">
              <div className="mb-6 text-foreground-muted">
                <span className="text-primary">root@portfolio</span>:<span className="text-blue-400">~</span>$ cat education.log
              </div>

              <div className="relative pl-6 space-y-12">
                {/* Vertical Spine (Log connector) */}
                <div className="absolute top-2 bottom-0 left-[11px] w-px bg-border/40" />

                {educationList.map((edu: Education, index: number) => {
                  const isFirst = index === 0;
                  return (
                    <motion.div
                      key={edu.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 }}
                      className="relative"
                    >
                      {/* Connector Dot */}
                      <motion.div
                        className={`absolute -left-[30px] top-1.5 w-[9px] h-[9px] rounded-full border border-[#0a0a0a] ${isFirst ? 'bg-primary' : 'bg-foreground-muted/40'}`}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: index * 0.15 + 0.2, type: 'spring' }}
                      />

                      {/* Log Block */}
                      <div className="flex flex-col group">
                        {/* Timestamp Row */}
                        <div className="flex items-center text-xs text-foreground-muted mb-2 opacity-70">
                          <span className="mr-3">[{edu.year}]</span>
                          <span className="hidden sm:inline-flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {edu.location}
                          </span>
                        </div>

                        {/* Content Row */}
                        <div className="pl-4 border-l-2 border-primary/20 group-hover:border-primary/60 transition-colors py-1">
                          <div className="text-primary font-bold text-base mb-1 flex items-center">
                            {edu.degree}
                            {isFirst && (
                              <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="inline-block w-2 h-4 bg-primary ml-2"
                              />
                            )}
                          </div>

                          <div className="text-foreground font-semibold mb-2">
                            @ {edu.institution}
                          </div>

                          <p className="text-foreground-muted/80 text-xs sm:text-sm max-w-2xl leading-relaxed mb-3">
                            {edu.description}
                          </p>

                          {edu.gpa && (
                            <div className="text-xs">
                              <span className="text-primary/70">GPA:</span> <span className="text-foreground">{edu.gpa}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* End of log prompt */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: educationList.length * 0.15 + 0.3 }}
                className="mt-8 text-foreground-muted"
              >
                <span className="text-primary">root@portfolio</span>:<span className="text-blue-400">~</span>$ <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2 h-4 bg-foreground-muted align-middle" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
