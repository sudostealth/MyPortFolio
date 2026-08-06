"use client";

import { useEffect, useState, useRef } from "react";

interface CipherTextProps {
  text: string;
  className?: string;
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?";

export function CipherText({ text, className = "" }: CipherTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const isHovered = useRef(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;
    let isActive = true;

    const animate = () => {
      if (!isActive) return;

      let iteration = 0;
      clearInterval(intervalId);

      intervalId = setInterval(() => {
        if (isHovered.current) {
          // If hovered, optionally pause or just keep animating if we wanted,
          // but usually it's fine to let it run or stop.
          // Let's just let it run if it's in the middle of animation.
        }

        setDisplayText((prevText) =>
          prevText
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(intervalId);
          // Wait 5 seconds before restarting the animation
          timeoutId = setTimeout(() => {
            if (isActive) {
              animate();
            }
          }, 5000);
        }

        iteration += 1 / 3;
      }, 30);
    };

    // Initial delay before starting the loop
    timeoutId = setTimeout(() => {
      animate();
    }, 1000);

    return () => {
      isActive = false;
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [text]);

  return (
    <span
      className={className}
      onMouseEnter={() => (isHovered.current = true)}
      onMouseLeave={() => (isHovered.current = false)}
    >
      {displayText}
    </span>
  );
}
