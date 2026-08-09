"use client";

import { motion } from "framer-motion";
import { ExternalLink, Users, Gamepad2, Mic, Code2, Globe } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { extracurricular, ExtracurricularActivity } from "@/lib/data";

const getCategoryIcon = (category: string) => {
  if (category.toLowerCase().includes("tech")) return <Code2 className="w-5 h-5" />;
  if (category.toLowerCase().includes("programming") || category.toLowerCase().includes("ctf") || category.toLowerCase().includes("hackathon")) return <Gamepad2 className="w-5 h-5" />;
  if (category.toLowerCase().includes("research") || category.toLowerCase().includes("network")) return <Globe className="w-5 h-5" />;
  if (category.toLowerCase().includes("workshop") || category.toLowerCase().includes("conference")) return <Mic className="w-5 h-5" />;
  return <Users className="w-5 h-5" />;
};

export function ExtracurricularActivities() {
  const activities = extracurricular as ExtracurricularActivity[];

  return (
    <section id="activities" className="py-20 md:py-32 relative bg-background">
      <div className="container-custom relative">
        <SectionHeading
          title="Extracurricular Activities"
          subtitle="cat /activities - Communities, events & achievements"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full flex flex-col rounded-2xl bg-[#141414] border border-border/40 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] overflow-hidden">
                {/* Lobby/Discord style header */}
                <div className="bg-[#1a1a1a] p-4 flex items-center gap-3 border-b border-border/30 relative overflow-hidden">
                  {/* Subtle highlight */}
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                  <div className="w-10 h-10 rounded-full bg-[#2a2a2a] border border-border/50 flex items-center justify-center shrink-0 overflow-hidden relative">
                    {/* Online status indicator */}
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary rounded-full border-2 border-[#1a1a1a] z-10" />

                    {activity.event_or_group_logo ? (
                      <img src={activity.event_or_group_logo} alt={activity.event_or_group_name} className="w-6 h-6 object-contain" />
                    ) : (
                      <div className="text-primary/70">
                        {getCategoryIcon(activity.category)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                      {activity.event_or_group_name}
                    </h3>
                    <div className="text-[10px] text-foreground-muted uppercase tracking-wider font-mono">
                      {activity.category}
                    </div>
                  </div>
                </div>

                {/* Message Body */}
                <div className="p-5 flex-grow bg-[#111] relative">
                  {/* Chat bubble tail effect */}
                  <div className="absolute top-0 left-6 w-3 h-3 bg-[#1a1a1a] rotate-45 -translate-y-1/2 border-l border-t border-border/30" />

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded text-center border border-primary/20">
                      {activity.role_title}
                    </span>
                    <span className="text-[10px] text-foreground-muted font-mono">{activity.date_or_duration}</span>
                  </div>

                  <p className="text-sm text-foreground-muted/90 mb-4 leading-relaxed">
                    {activity.description}
                  </p>

                  {activity.key_achievements && activity.key_achievements.length > 0 && (
                    <div className="space-y-2 mt-4 pt-4 border-t border-border/20">
                      <div className="text-[10px] uppercase font-mono text-foreground-muted/60 mb-2">Highlights</div>
                      {activity.key_achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start text-xs text-foreground-muted">
                          <span className="text-primary/60 mr-2 font-mono">›</span>
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Action */}
                {activity.credential_or_proof_link && (
                  <div className="p-3 bg-[#0d0d0d] border-t border-border/30">
                    <a
                      href={activity.credential_or_proof_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full py-2 rounded bg-background/50 hover:bg-primary/10 text-xs font-mono text-foreground-muted hover:text-primary transition-colors border border-transparent hover:border-primary/20"
                    >
                      <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                      View_Reference
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
