"use client";

import { useRef, useLayoutEffect, useState, ReactNode } from "react";

export function FitText({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(0);

  useLayoutEffect(() => {
    const resize = () => {
      const container = containerRef.current;
      const measure = measureRef.current;
      if (!container || !measure) return;

      measure.style.fontSize = "200px";
      const naturalWidth = measure.scrollWidth;
      const containerWidth = container.clientWidth;
      setFontSize((containerWidth / naturalWidth) * 200);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      {/* Hidden measurement element */}
      <span
        ref={measureRef}
        className="font-light tracking-[0.02em] uppercase leading-none whitespace-nowrap absolute opacity-0 pointer-events-none"
        style={{ fontFamily: "var(--font-serif), serif" }}
        aria-hidden="true"
      >
        {children}
      </span>
      <h1
        className="font-light tracking-[0.02em] uppercase text-zinc-800 leading-none whitespace-nowrap text-center"
        style={{
          fontFamily: "var(--font-serif), serif",
          fontSize: fontSize > 0 ? `${fontSize}px` : undefined,
          visibility: fontSize > 0 ? "visible" : "hidden",
        }}
      >
        {children}
      </h1>
    </div>
  );
}
