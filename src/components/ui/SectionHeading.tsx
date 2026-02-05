"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
        <span className="text-primary">&lt;</span>
        {title}
        <span className="text-primary">/&gt;</span>
      </h2>
      {subtitle && (
        <p className="text-foreground-muted max-w-2xl mx-auto">
          <span className="text-primary font-mono">// </span>
          {subtitle}
        </p>
      )}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "100px" }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={cn(
          "h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-4",
          align === "center" && "mx-auto"
        )}
      />
    </motion.div>
  );
}
