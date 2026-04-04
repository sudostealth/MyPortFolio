"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, BookOpen, X, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { courses, CourseLevel } from "@/lib/data";

export function Courses() {
  const [activeLevel, setActiveLevel] = useState<CourseLevel | null>(null);

  const levels = [
    { key: "undergraduate", ...(courses.undergraduate as CourseLevel) },
    { key: "postgraduate", ...(courses.postgraduate as CourseLevel) },
    { key: "doctorate", ...(courses.doctorate as CourseLevel) },
  ];

  return (
    <section id="courses" className="py-20 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom relative">
        <SectionHeading
          title="Educational Courses"
          subtitle="cat /home/education/transcript - Academic journey and completed coursework"
        />

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
          {levels.map((level, index) => (
            <motion.div
              key={level.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <Card
                className="h-full flex flex-col group cursor-pointer border-border/50 hover:border-primary/50 relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(var(--primary),0.15)] bg-background/60 backdrop-blur-sm"
                onClick={() => setActiveLevel(level)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="p-8 flex flex-col items-center text-center relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 border border-border/50 shadow-inner">
                    <GraduationCap className="w-8 h-8 text-primary drop-shadow-md" />
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {level.title}
                  </h3>

                  <div className="mt-auto pt-6 flex items-center justify-center w-full">
                    <span className="text-sm font-medium text-foreground-muted flex items-center gap-2 group-hover:text-primary transition-colors">
                      {level.status === "completed" ? "View Courses" : "Coming Soon"}
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {activeLevel && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            >
              <div
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                onClick={() => setActiveLevel(null)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-4xl bg-background border border-border/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-border/50 bg-background-secondary/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{activeLevel.title}</h3>
                      <p className="text-sm text-foreground-muted font-mono">
                        {activeLevel.status === "completed" ? "Transcript Details" : "Pending Records"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveLevel(null)}
                    className="p-2 rounded-lg hover:bg-background-secondary transition-colors text-foreground-muted hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="overflow-y-auto p-6 flex-1 custom-scrollbar">
                  {activeLevel.status === "coming_soon" ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                        <GraduationCap className="w-10 h-10 text-secondary" />
                      </div>
                      <h4 className="text-2xl font-bold mb-2">Coming Soon</h4>
                      <p className="text-foreground-muted max-w-md">
                        Information for {activeLevel.title} will be updated once the degree is started or completed.
                      </p>
                    </div>
                  ) : (
                    <div className="w-full overflow-x-auto rounded-xl border border-border/50 bg-background-secondary/20">
                      <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="text-xs uppercase bg-background-secondary/50 text-foreground-muted border-b border-border/50 sticky top-0 backdrop-blur-md">
                          <tr>
                            <th className="px-6 py-4 font-semibold">Semester</th>
                            <th className="px-6 py-4 font-semibold">Course Code</th>
                            <th className="px-6 py-4 font-semibold w-full">Course Title</th>
                            <th className="px-6 py-4 font-semibold text-right">Credit</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                          {activeLevel.courses.map((course, idx) => (
                            <motion.tr
                              key={`${course.semester}-${course.code}-${idx}`}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.02 }}
                              className="hover:bg-primary/5 transition-colors group"
                            >
                              <td className="px-6 py-3 font-mono text-xs text-foreground-muted group-hover:text-primary transition-colors">
                                {course.semester}
                              </td>
                              <td className="px-6 py-3 font-mono font-medium text-foreground">
                                {course.code}
                              </td>
                              <td className="px-6 py-3 text-foreground whitespace-normal min-w-[250px]">
                                {course.title}
                              </td>
                              <td className="px-6 py-3 text-right font-mono text-primary font-semibold">
                                {course.credit}
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                {activeLevel.status === "completed" && (
                  <div className="p-4 border-t border-border/50 bg-background-secondary/30 text-right text-xs text-foreground-muted font-mono">
                    Total Courses: {activeLevel.courses.length}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
