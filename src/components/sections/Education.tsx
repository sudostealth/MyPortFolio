"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
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
          subtitle="cat /education - Academic background"
        />

        <div className="max-w-4xl mx-auto">
          {educationList.map((edu: Education, index: number) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 md:pl-0 mb-12 last:mb-0"
            >
              {/* Desktop Timeline Line */}
              <div className="hidden md:block absolute left-[50%] top-0 bottom-[-3rem] w-px bg-border last:bottom-0" />

              <div className={`md:flex items-center justify-between w-full ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-[50%] md:-translate-x-1/2 w-6 h-6 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center z-10 mt-1.5 md:mt-0">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>

                {/* Content Card */}
                <div className={`md:w-[45%] ${index % 2 === 0 ? "md:pl-8" : "md:pr-8"}`}>
                  <Card className="p-6 hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-3 mb-2 text-primary">
                      <GraduationCap className="w-5 h-5" />
                      <h3 className="text-xl font-bold">{edu.degree}</h3>
                    </div>

                    <h4 className="text-lg font-semibold text-foreground mb-3">{edu.institution}</h4>

                    <div className="flex flex-wrap gap-4 text-sm text-foreground-muted mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{edu.year}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{edu.location}</span>
                      </div>
                    </div>

                    <p className="text-sm text-foreground-muted mb-4">
                      {edu.description}
                    </p>

                    {edu.gpa && (
                      <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                        CGPA: {edu.gpa}
                      </div>
                    )}
                  </Card>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
