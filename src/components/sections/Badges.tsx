"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import badgesData from "@/data/badges.json";
import Image from "next/image";

interface Badge {
  id: string;
  type: "iframe" | "image";
  src: string;
  title: string;
  width?: string;
  height?: string;
  url?: string;
}

export function Badges() {
  const badges = badgesData as Badge[];

  return (
    <section id="badges" className="py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      
      <div className="container-custom relative">
        <SectionHeading
          title="Badges & Achievements"
          subtitle="ls -la /badges"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {badges.map((badge, index) => (
            <ScrollReveal key={badge.id} mode="simple" delay={index * 0.1}>
              <div className="h-full group relative">
                {/* Glowing border effect on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl opacity-0 group-hover:opacity-75 blur transition duration-500" />
                
                <Card className="relative h-full flex flex-col bg-background-secondary border border-border p-0 overflow-hidden rounded-xl">
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between px-4 py-2 bg-background/50 border-b border-border">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="text-xs font-mono text-foreground-muted opacity-70">
                      {badge.title.toLowerCase().replace(/\s/g, "_")}.exe
                    </div>
                  </div>

                  {/* Badge Content Container */}
                  <div className="p-6 flex-grow flex items-center justify-center bg-grid-pattern relative">
                     {/* "Verified" Stamp */}
                     <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono bg-primary/10 text-primary border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity">
                        VERIFIED
                     </div>

                    {badge.type === "iframe" ? (
                      <div className="w-full flex justify-center overflow-hidden">
                        <iframe 
                          src={badge.src} 
                          style={{ border: "none", width: "100%", height: badge.height || "220px" }}
                          title={badge.title}
                          className="max-w-[400px]" // Limit width to prevent weird stretching
                        />
                      </div>
                    ) : (
                      <div className="relative w-full h-40 flex justify-center">
                         <div className="relative w-40 h-40">
                            <Image
                              src={badge.src}
                              alt={badge.title}
                              fill
                              className="object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
                            />
                         </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Footer Info */}
                  <div className="p-4 border-t border-border bg-background/30">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors text-center">
                      {badge.title}
                    </h3>
                  </div>
                </Card>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
