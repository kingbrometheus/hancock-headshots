"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimationControls } from "framer-motion";

interface CardDeckProps {
  images: { src: string; alt: string }[];
  onSelect: (index: number) => void;
  ready?: boolean;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function Card({
  image,
  index,
  total,
  collapse,
  ready,
  onClick,
}: {
  image: { src: string; alt: string };
  index: number;
  total: number;
  collapse: number;
  ready: boolean;
  onClick: () => void;
}) {
  const controls = useAnimationControls();
  const introComplete = useRef(false);
  const mid = (total - 1) / 2;
  const offset = index - mid;
  const distFromCenter = Math.abs(offset);

  const fanRotation = offset * 5.5 + offset * Math.abs(offset) * 1.5;
  const fanX = offset * 160;
  const fanY = Math.abs(offset) * Math.abs(offset) * 14;

  const zIndex = 10 + total - Math.abs(Math.round(offset));

  // Intro — waits for ready
  useEffect(() => {
    if (!ready) return;
    const introDelay = 0.1 + distFromCenter * 0.15;
    controls.start({
      opacity: 1,
      transition: { duration: 0.4, delay: introDelay * 0.5 },
    }).then(() => {
      return controls.start({
        x: fanX,
        y: fanY,
        rotateZ: fanRotation,
        transition: {
          type: "spring",
          stiffness: 80,
          damping: 18,
          mass: 1.2,
          delay: introDelay * 0.3,
        },
      });
    }).then(() => {
      introComplete.current = true;
    });
  }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps

  // Collapse on scroll
  useEffect(() => {
    if (!introComplete.current) return;

    const c = collapse;
    controls.start({
      x: lerp(fanX, offset * 4, c),
      y: lerp(fanY, 0, c),
      rotateZ: lerp(fanRotation, offset * 1, c),
      scale: 1,
      transition: { duration: 0.05, ease: "linear" },
    });
  }, [collapse]); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        zIndex,
        transformOrigin: "center bottom",
      }}
      initial={{ opacity: 0, y: 0, x: 0, rotateZ: 0, scale: 1 }}
      animate={controls}
      onClick={onClick}
    >
      <div
        className="relative rounded-lg overflow-hidden"
        style={{
          width: "clamp(180px, 24vw, 360px)",
          aspectRatio: "3 / 4",
          boxShadow: "0 10px 35px -5px rgba(0,0,0,0.15), 0 5px 15px -3px rgba(0,0,0,0.1)",
        }}
      >
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 180px, 360px"
          />
        </div>
      </div>
    </motion.div>
  );
}

export function CardDeck({ images, onSelect, ready = true }: CardDeckProps) {
  const [collapse, setCollapse] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      const bottomRatio = rect.bottom / viewH;
      const t = Math.max(0, Math.min(1, 1 - (bottomRatio - 0.2) / 0.4));
      setCollapse(t);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
    >
      {images.map((image, index) => (
        <Card
          key={image.src}
          image={image}
          index={index}
          total={images.length}
          collapse={collapse}
          ready={ready}
          onClick={() => onSelect(index)}
        />
      ))}
    </div>
  );
}
