import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

export function getRandomDelay(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate random "glitch" text effect
export function glitchText(text: string): string {
  const glitchChars = "!<>-_\\/[]{}—=+*^?#________";
  let result = "";
  for (let i = 0; i < text.length; i++) {
    if (Math.random() > 0.8 && text[i] !== " ") {
      result += glitchChars[Math.floor(Math.random() * glitchChars.length)];
    } else {
      result += text[i];
    }
  }
  return result;
}
