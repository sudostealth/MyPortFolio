"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap, ExternalLink, Calendar, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { certifications, education } from "@/lib/data";

interface Certification {
  id: number;
  name: string;
  fullName: string;
  issuer: string;
  date: string;
  image: string;
  url: string;
  description: string;
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  location: string;
  year: string;
  description: string;
  gpa: string;
}

export function Certificates() {
  const certificationsList = certifications as Certification[];
  const educationList = education as Education[];

  return (
    <section
      id="certifications"
      className="py-20 md:py-32 relative bg-background-secondary/50"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container-custom relative">
        <SectionHeading
          title="Certifications"
          subtitle="cat /credentials - Professional certifications and education"
        />

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {certificationsList.map((cert: Certification, index: number) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full text-center group">
                {/* Certificate Image */}
                <div className="relative w-full max-w-[240px] mx-auto mb-5 aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-border group-hover:border-primary transition-colors">
                  {cert.image ? (
                    <img
                      src={cert.image}
                      alt={cert.name}
                      className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Award className="w-16 h-16 text-primary/50" />
                    </div>
                  )}
                </div>

                {/* Certificate Name */}
                <h3 className="text-xl font-bold text-primary mb-1">
                  {cert.name}
                </h3>
                <p className="text-sm text-foreground mb-2">{cert.fullName}</p>

                {/* Issuer & Date */}
                <p className="text-xs text-foreground-muted mb-1">
                  {cert.issuer}
                </p>
                <p className="text-xs text-foreground-muted flex items-center justify-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {cert.date}
                </p>

                {/* Description */}
                <p className="text-xs text-foreground-muted mt-3 line-clamp-2">
                  {cert.description}
                </p>

                {/* Verify Link */}
                {cert.url && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(cert.url, "_blank")}
                    className="mt-4 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Verify
                  </motion.button>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Education Section */}
        <div className="mt-16">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-center text-foreground mb-8"
          >
            <GraduationCap className="inline-block w-8 h-8 text-primary mr-2" />
            Education
          </motion.h3>

          <div className="max-w-3xl mx-auto">
            {educationList.map((edu: Education, index: number) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 pb-8 last:pb-0"
              >
                {/* Timeline line */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
                
                {/* Timeline dot */}
                <div className="absolute left-0 top-0 w-2 h-2 -translate-x-1/2 rounded-full bg-primary ring-4 ring-background" />

                <Card variant="glass" className="ml-4">
                  {/* Degree */}
                  <h4 className="text-xl font-bold text-foreground mb-2">
                    {edu.degree}
                  </h4>

                  {/* Institution */}
                  <p className="text-primary font-medium mb-2">
                    {edu.institution}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 text-sm text-foreground-muted mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {edu.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {edu.year}
                    </span>
                    {edu.gpa && (
                      <span className="text-primary font-mono">
                        GPA: {edu.gpa}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-foreground-muted">
                    {edu.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
