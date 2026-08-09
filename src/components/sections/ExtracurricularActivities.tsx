"use client";

import { motion } from "framer-motion";
import { ExternalLink, Target, Trophy, Users, BookOpen, Lightbulb } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { extracurricular, ExtracurricularActivity } from "@/lib/data";

const categoryColors: Record<string, { bg: string, text: string, border: string }> = {
  "Tech Clubs & Departmental Societies": { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/20" },
  "Competitive Programming & Hackathons or CTF": { bg: "bg-green-500/10", text: "text-green-500", border: "border-green-500/20" },
  "Research & Collaborative Networks": { bg: "bg-purple-500/10", text: "text-purple-500", border: "border-purple-500/20" },
  "Workshops, Conferences & Continuous Learning": { bg: "bg-orange-500/10", text: "text-orange-500", border: "border-orange-500/20" },
  "Non-Technical ECAs (The \"Well-Rounded\" Factor)": { bg: "bg-pink-500/10", text: "text-pink-500", border: "border-pink-500/20" },
};

const getCategoryStyle = (category: string) => {
  return categoryColors[category] || { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20" };
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
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                {/* Card Header */}
                <div className="p-5 border-b border-border/50 flex items-start justify-between gap-4">
                  <div className="w-12 h-12 rounded-xl bg-background-secondary border border-border flex items-center justify-center shrink-0 overflow-hidden">
                    {activity.event_or_group_logo ? (
                      <img src={activity.event_or_group_logo} alt={activity.event_or_group_name} className="w-8 h-8 object-contain" />
                    ) : (
                      <Users className="w-6 h-6 text-foreground-muted" />
                    )}
                  </div>
                  <div className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full text-right ${getCategoryStyle(activity.category).bg} ${getCategoryStyle(activity.category).text} ${getCategoryStyle(activity.category).border} border`}>
                    {activity.category}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-grow">
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    {activity.event_or_group_name}
                  </h3>
                  <div className="text-sm font-medium text-primary mb-3">
                    {activity.role_title} <span className="text-foreground-muted mx-1">•</span> {activity.date_or_duration}
                  </div>

                  <p className="text-sm text-foreground-muted mb-4">
                    {activity.description}
                  </p>

                  <div className="space-y-2">
                    {activity.key_achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start text-sm text-foreground-muted">
                        <Trophy className="w-3.5 h-3.5 text-accent mr-2 mt-0.5 shrink-0" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                {activity.credential_or_proof_link && (
                  <div className="p-5 pt-0 mt-auto">
                    <a
                      href={activity.credential_or_proof_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full py-2.5 rounded-lg bg-background-secondary hover:bg-primary/10 text-sm font-medium text-foreground hover:text-primary transition-colors border border-border"
                    >
                      View Credential
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
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
