"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import { CardDeck } from "@/components/card-deck";
import { Preloader } from "@/components/preloader";
import { FitText } from "@/components/fit-text";
import { siteContent } from "@/data/content";

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function Home() {
  const { site, galleries } = siteContent;
  const allImages = [...galleries.actors.images, ...galleries.professionals.images];
  const [featured] = useState(() => pickRandom(allImages, 7));

  const [lightbox, setLightbox] = useState<number | null>(null);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const handlePreloaderComplete = useCallback(() => setPreloaderDone(true), []);

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(
    () => setLightbox((i) => (i !== null ? (i - 1 + featured.length) % featured.length : null)),
    [featured.length]
  );
  const next = useCallback(
    () => setLightbox((i) => (i !== null ? (i + 1) % featured.length : null)),
    [featured.length]
  );

  const heroRef = useRef<HTMLElement>(null);
  const [titleVisible, setTitleVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 200) {
        setTitleVisible(false);
      } else {
        setTitleVisible(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      <Preloader onComplete={handlePreloaderComplete} />
      {/* Hero — 3D Card Deck */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col">
        {/* Title — fixed, fades out as cards scroll over it */}
        <motion.div
          className="fixed top-0 left-0 right-0 z-0 pt-28 md:pt-32 pb-2 pointer-events-none flex justify-center"
          animate={{ opacity: titleVisible ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="w-[90vw]">
            <FitText>Hancock Headshots</FitText>
          </div>
        </motion.div>

        {/* Card deck — centered in viewport */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none pt-16">
          <div className="w-full h-[60vh] pointer-events-auto">
            <CardDeck images={featured} onSelect={setLightbox} ready={preloaderDone} />
          </div>
        </div>

        {/* Spacer to push content below */}
        <div className="h-[85vh]" />

        {/* Mission statement */}
        <div className="py-12 md:py-16 text-center px-6">
          <FadeIn delay={0.5}>
            <p
              className="text-xl md:text-3xl lg:text-5xl italic font-light max-w-4xl mx-auto leading-snug md:leading-tight"
              style={{ fontFamily: "var(--font-serif), serif", color: "#111111" }}
            >
              A Brooklyn-based studio rooted in documentary photography and a deep
              understanding of performers. Honest, grounded portraits that let
              personality speak — never overly posed, always authentically you.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Brief About */}
      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6 items-center">
            {/* Angled portrait with shadow */}
            <FadeIn>
              <div className="relative md:ml-auto md:mr-8 md:max-w-sm">
                <div
                  className="rounded-lg bg-white p-[6px]"
                  style={{
                    rotate: "-3deg",
                    boxShadow:
                      "0 30px 60px -10px rgba(0,0,0,0.18), 0 18px 36px -6px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)",
                  }}
                >
                  <Image
                    src={siteContent.about.portrait}
                    alt="Lisa Hancock"
                    width={500}
                    height={625}
                    className="rounded-md w-full h-auto"
                    sizes="(max-width: 768px) 80vw, 350px"
                  />
                </div>
                <div
                  className="absolute -bottom-4 right-[-20px] bg-white px-4 py-2 rounded-sm"
                  style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
                >
                  <p className="text-xs tracking-[0.2em] uppercase text-zinc-400">Est. 2006</p>
                  <p className="text-xs text-zinc-300">Brooklyn, NY</p>
                </div>
              </div>
            </FadeIn>

            {/* Text */}
            <div>
              <FadeIn delay={0.15}>
                <p
                  className="text-xs tracking-[0.3em] uppercase text-zinc-400 mb-4"
                >
                  The Photographer
                </p>
                <h2
                  className="text-3xl md:text-4xl font-light mb-6"
                  style={{ fontFamily: "var(--font-serif), serif", color: "#111" }}
                >
                  Lisa Hancock
                </h2>
              </FadeIn>
              <FadeIn delay={0.25}>
                <p className="text-base md:text-lg text-zinc-500 font-light leading-relaxed mb-4">
                  A NYC photographer with roots in documentary work and a background
                  in acting — Lisa brings a rare understanding of what it means to be
                  in front of the camera.
                </p>
                <p className="text-base md:text-lg text-zinc-500 font-light leading-relaxed mb-8">
                  Her approach is calm, collaborative, and designed to draw out the
                  real you. No stiff poses, no forced smiles — just authentic portraits
                  that book the part.
                </p>
              </FadeIn>
              <FadeIn delay={0.35}>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm tracking-wide text-zinc-900 border-b border-zinc-900 pb-1 hover:text-zinc-500 hover:border-zinc-500 transition-colors"
                >
                  Read Full Bio
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zinc-950 text-white -mt-44 relative z-0">
        <div className="mx-auto max-w-7xl px-6 pt-60 md:pt-72 pb-32 md:pb-40 text-center">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase text-zinc-600 mb-6">
              Book a Session
            </p>
            <h2
              className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6"
              style={{ fontFamily: "var(--font-serif), serif" }}
            >
              Ready to Book?
            </h2>
            <p className="text-lg md:text-xl text-zinc-500 mb-12 max-w-lg mx-auto font-light">
              Every session starts with a complimentary 30-minute consultation.
            </p>
            <Link
              href="/contact"
              className="inline-block px-12 py-4 text-sm tracking-[0.15em] uppercase border border-white/20 hover:bg-white hover:text-zinc-900 transition-all duration-300 rounded-sm"
            >
              Get in Touch
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={close}
          >
            <button
              onClick={(e) => { e.stopPropagation(); close(); }}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 md:left-8 text-white/40 hover:text-white transition-colors z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 md:right-8 text-white/40 hover:text-white transition-colors z-10"
              aria-label="Next"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-[90vw] max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={featured[lightbox].src}
                alt={featured[lightbox].alt}
                width={1200}
                height={1500}
                className="max-h-[85vh] w-auto object-contain rounded-sm"
                sizes="90vw"
                priority
              />
            </motion.div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest font-mono">
              {lightbox + 1} / {featured.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
