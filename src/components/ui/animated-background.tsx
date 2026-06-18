"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const currentTheme = theme === "system" ? systemTheme : theme;

    // Use tailwind/css variable colors, typically primary is emerald for light, green/cyan for dark
    // For simplicity, we use the primary RGB representation, matched roughly to globals.css
    // Function to parse the CSS variable and convert it to RGB string
    const getPrimaryRgb = () => {
      if (typeof window === 'undefined') return '5, 150, 105'; // fallback

      // Create a temporary element to let the browser compute the exact RGB value of the variable
      const tempEl = document.createElement('div');
      tempEl.style.color = 'var(--primary)';
      tempEl.style.display = 'none';
      document.body.appendChild(tempEl);

      const computedColor = getComputedStyle(tempEl).color;
      document.body.removeChild(tempEl);

      // computedColor is reliably 'rgb(r, g, b)' or 'rgba(r, g, b, a)' in modern browsers
      const match = computedColor.match(/\d+/g);
      if (match && match.length >= 3) {
        return `${match[0]}, ${match[1]}, ${match[2]}`;
      }

      // Fallbacks matching the original global.css
      return currentTheme === "dark" ? "0, 255, 0" : "5, 150, 105";
    };

    const baseColor = getPrimaryRgb();

    const resize = () => {
      // Set actual size in memory (scaled to account for extra pixel density)
      const scale = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * scale;
      canvas.height = height * scale;
      ctx.scale(scale, scale);

      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
    };

    window.addEventListener('resize', resize);
    resize();

    // Line properties
    const lines = Array.from({ length: 5 }).map(() => ({
      yOffset: Math.random() * height,
      amplitude: 50 + Math.random() * 100,
      frequency: 0.001 + Math.random() * 0.002,
      phase: Math.random() * Math.PI * 2,
      speed: 0.0005 + Math.random() * 0.001,
    }));

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      lines.forEach((line, index) => {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 10) {
          // Complex wave: combination of two sines for more organic feel
          const y = line.yOffset
            + Math.sin(x * line.frequency + line.phase + time * line.speed) * line.amplitude
            + Math.sin(x * (line.frequency * 1.5) + line.phase + time * (line.speed * 1.2)) * (line.amplitude * 0.5);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        // Vary opacity per line for depth
        const opacity = 0.05 + (0.1 * (index / lines.length));
        ctx.strokeStyle = `rgba(${baseColor}, ${opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw(0);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, systemTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
