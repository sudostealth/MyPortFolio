"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, LockOpen } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications } from "@/lib/data";

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

export function Certificates() {
  const certificationsList = certifications as Certification[];

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
          subtitle="cat /credentials - Professional certifications"
        />

        {/* Certifications Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {certificationsList.map((cert: Certification, index: number) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group h-full"
            >
              <div className="h-full flex flex-col p-4 bg-[#0a0a0a] rounded-xl border border-border group-hover:border-primary/60 group-hover:shadow-[0_0_15px_rgba(34,255,136,0.15)] transition-all duration-300 relative overflow-hidden z-10">
                {/* Subtle top glow on hover */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Certificate Image */}
                <div className="relative w-full aspect-square mx-auto mb-4 overflow-hidden rounded-lg bg-background-secondary flex items-center justify-center p-2 border border-border/50 group-hover:border-primary/30 transition-colors">
                  {cert.image ? (
                    <img
                      src={cert.image}
                      alt={cert.name}
                      className="w-full h-full object-contain filter drop-shadow-md group-hover:drop-shadow-[0_0_8px_rgba(34,255,136,0.3)] transition-all duration-300"
                    />
                  ) : (
                    <Award className="w-12 h-12 text-primary/50" />
                  )}
                  {/* Unlocked overlay */}
                  <div className="absolute top-2 right-2 bg-background/80 p-1.5 rounded-full backdrop-blur-sm border border-border group-hover:border-primary/50 transition-colors">
                    <LockOpen className="w-3 h-3 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow flex flex-col items-center text-center">
                  <h3 className="text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-foreground-muted mb-3 flex-grow line-clamp-2">
                    {cert.fullName}
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-3 border-t border-border/50 flex flex-col gap-2 items-center w-full">
                  <span className="text-[10px] text-foreground-muted font-mono uppercase tracking-wider">
                    {cert.issuer}
                  </span>

                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full py-1.5 text-[10px] font-medium text-primary bg-primary/5 hover:bg-primary/15 border border-primary/20 rounded-md transition-colors"
                    >
                      <ShieldCheck className="w-3 h-3 mr-1" />
                      Verify Badge
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
