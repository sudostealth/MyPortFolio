"use client";

import { motion, useInView, Variant } from "framer-motion";
import { useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  mode?: "simple" | "hacker" | "slide";
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  className?: string;
  viewportMargin?: string;
}

export const ScrollReveal = ({
  children,
  width = "fit-content",
  mode = "simple",
  direction = "up",
  delay = 0,
  className = "",
  viewportMargin = "-50px",
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const getDirectionOffset = (dir: string, amount: number) => {
    switch (dir) {
      case "left": return { x: amount, y: 0 };
      case "right": return { x: -amount, y: 0 };
      case "up": return { x: 0, y: amount };
      case "down": return { x: 0, y: -amount };
      default: return { x: 0, y: amount };
    }
  };

  const variants = {
    simple: {
      hidden: { opacity: 0, ...getDirectionOffset(direction, 30) },
      visible: { 
        opacity: 1, 
        x: 0, 
        y: 0,
        transition: { duration: 0.6, delay, ease: "easeOut" }
      },
    },
    slide: {
      hidden: { opacity: 0, ...getDirectionOffset(direction, 100) },
      visible: { 
        opacity: 1, 
        x: 0, 
        y: 0,
        transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1.0] } // Cubic bezier for smoothness
      },
    },
    hacker: {
      hidden: { 
        opacity: 0, 
        scale: 0.95,
        filter: "blur(10px)",
      },
      visible: { 
        opacity: 1, 
        scale: 1,
        filter: "blur(0px)",
        transition: { 
          duration: 0.5, 
          delay,
          type: "spring",
          stiffness: 120,
          damping: 20
        }
      },
    },
  };

  return (
    <div ref={ref} style={{ position: "relative", width }} className={className}>
      <motion.div
        variants={variants[mode] as { hidden: Variant; visible: Variant }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
      
      {/* Hacker Mode specific decoration: Scan line */}
      {mode === "hacker" && (
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.8, delay: delay + 0.2, ease: "circOut" }}
          className="absolute -bottom-2 left-0 w-full h-[1px] bg-primary/50"
          style={{ originX: 0 }}
        />
      )}
    </div>
  );
};
