"use client";

import { motion } from "framer-motion";
import { Users, Calendar, Trophy, Presentation } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { activities } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Calendar,
  Trophy,
  Presentation,
};

interface Activity {
  id: number;
  title: string;
  organization: string;
  period: string;
  description: string;
  icon: string;
}

export function Extracurriculars() {
  const activitiesList = activities as Activity[];

  return (
    <section id="activities" className="py-20 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="container-custom relative">
        <SectionHeading
          title="Activities"
          subtitle="ps aux - Leadership roles and extracurricular activities"
        />

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {activitiesList.map((activity: Activity, index: number) => {
            const Icon = iconMap[activity.icon] || Users;
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full group">
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                        <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      {/* Title & Organization */}
                      <h3 className="text-lg font-bold text-foreground mb-1">
                        {activity.title}
                      </h3>
                      <p className="text-primary text-sm font-medium mb-1">
                        {activity.organization}
                      </p>

                      {/* Period */}
                      <p className="text-xs text-foreground-muted mb-3 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {activity.period}
                      </p>

                      {/* Description */}
                      <p className="text-sm text-foreground-muted">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Achievement Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <div className="p-6 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-center">
            <Trophy className="w-10 h-10 text-primary mx-auto mb-3" />
            <p className="text-foreground font-medium mb-2">
              &quot;Leadership is not about being in charge. It&apos;s about taking care of 
              those in your charge.&quot;
            </p>
            <p className="text-sm text-foreground-muted font-mono">
              - <span className="text-primary">Simon Sinek</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
