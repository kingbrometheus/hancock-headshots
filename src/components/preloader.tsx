"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";

const TEXT = "HANCOCK HEADSHOTS";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<"letters" | "reposition" | "settled" | "gone">("letters");
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [fontSize, setFontSize] = useState(100);
  const textRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  // Measure font size to fill 90vw
  useLayoutEffect(() => {
    const measure = () => {
      if (!measureRef.current) return;
      measureRef.current.style.fontSize = "200px";
      const naturalWidth = measureRef.current.scrollWidth;
      const containerWidth = window.innerWidth * 0.9;
      setFontSize((containerWidth / naturalWidth) * 200);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("preloaderShown")) {
      setStage("gone");
      onComplete();
      return;
    }
    sessionStorage.setItem("preloaderShown", "1");

    const t1 = setTimeout(() => {
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;

        // Hero title: pt-28 (112px) on mobile, pt-32 (128px) on md+
        const targetTop = window.innerWidth >= 768 ? 128 : 112;
        const targetCenterY = targetTop + rect.height / 2;

        setOffset({
          x: 0,
          y: targetCenterY - centerY,
        });
      }
      setStage("reposition");
    }, 1600);

    // Text has arrived at hero position — keep it there, start fading background
    const t2 = setTimeout(() => {
      setStage("settled");
      onComplete(); // trigger cards to fan out while text is still visible
    }, 2700);

    // Finally remove the preloader entirely
    const t3 = setTimeout(() => {
      setStage("gone");
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  if (stage === "gone") return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none overflow-hidden"
      style={{
        backgroundColor: stage === "settled" ? "transparent" : "#f8f7f4",
        transition: "background-color 0.5s ease",
      }}
    >
      <motion.div
        ref={textRef}
        animate={
          stage === "reposition" || stage === "settled"
            ? { x: offset.x, y: offset.y }
            : { x: 0, y: 0 }
        }
        transition={{
          duration: 1,
          ease: [0.65, 0, 0.35, 1],
        }}
        style={{
          opacity: stage === "settled" ? 0 : 1,
          transition: "opacity 0.4s ease 0.1s",
        }}
      >
        {/* Hidden measure element */}
        <span
          ref={measureRef}
          className="font-light tracking-[0.02em] uppercase leading-none whitespace-nowrap absolute opacity-0 pointer-events-none"
          style={{ fontFamily: "var(--font-serif), serif" }}
          aria-hidden="true"
        >
          {TEXT}
        </span>
        <h1
          className="font-light tracking-[0.02em] uppercase text-zinc-800 leading-none whitespace-nowrap w-[90vw] text-center"
          style={{
            fontFamily: "var(--font-serif), serif",
            fontSize: fontSize > 0 ? `${fontSize}px` : "7vw",
          }}
        >
          {TEXT.split("").map((char, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: "120%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            </span>
          ))}
        </h1>
      </motion.div>
    </div>
  );
}
