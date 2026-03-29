"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteContent } from "@/data/content";

const primaryLinks = [
  { href: "/actor-headshots", label: "Actors" },
  { href: "/professional-headshots", label: "Professionals" },
  { href: "/musicians", label: "Musicians" },
];

const secondaryLinks = [
  { href: "/about", label: "About" },
  { href: "/rates", label: "Rates" },
  { href: "/contact", label: "Contact" },
];

// Pool of all gallery images for menu decoration
const allMenuImages = [
  ...siteContent.galleries.actors.images,
  ...siteContent.galleries.professionals.images,
];

function pickRandomImages(count: number) {
  const shuffled = [...allMenuImages].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const menuVariants = {
  closed: {
    clipPath: "circle(0% at calc(100% - 40px) 32px)",
    transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] },
  },
  open: {
    clipPath: "circle(150% at calc(100% - 40px) 32px)",
    transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] },
  },
};

const linkVariants = {
  closed: { opacity: 0, x: -40 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.3 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const imageVariants = {
  closed: { opacity: 0, y: 40, rotate: 0 },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: i === 0 ? -4 : i === 1 ? 2 : -2,
    transition: { delay: 0.5 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  const [menuImages, setMenuImages] = useState(() => pickRandomImages(3));
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Pick new random images each time menu opens
  useEffect(() => {
    if (open) setMenuImages(pickRandomImages(3));
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav className="mx-auto flex w-[90vw] items-center justify-between py-4">
          <Link href="/" className="relative z-[60]">
            <Image
              src="https://images.squarespace-cdn.com/content/v1/5f7359b579e51a7d39e29bbf/d5269eeb-eda4-4683-960d-abdd77b9d702/Hancock-Headshots-Logos-cropforwebsite.png?format=750w"
              alt="Hancock Headshots"
              width={180}
              height={40}
              className={`h-8 w-auto transition-all duration-300 ${open ? "brightness-0 invert" : ""}`}
              priority
            />
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="relative z-[60] p-2 -mr-2"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <div className="flex flex-col items-end gap-[5px]">
              <motion.span
                animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0, width: 24 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="block h-[2px] rounded-full origin-center"
                style={{ backgroundColor: open ? "#fff" : "#18181b" }}
              />
              <motion.span
                animate={{ opacity: open ? 0 : 1, width: open ? 0 : 16 }}
                transition={{ duration: 0.2 }}
                className="block h-[2px] rounded-full"
                style={{ backgroundColor: open ? "#fff" : "#a1a1aa" }}
              />
              <motion.span
                animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0, width: open ? 24 : 20 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="block h-[2px] rounded-full origin-center"
                style={{ backgroundColor: open ? "#fff" : "#71717a" }}
              />
            </div>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 bg-zinc-950"
          >
            <div className="flex h-full w-full items-center justify-center">
              <div className="w-full max-w-5xl mx-auto px-8 md:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-center">
                  {/* Navigation */}
                  <div>
                    {/* Primary links — large */}
                    <ul className="space-y-1">
                      {primaryLinks.map((link, i) => (
                        <motion.li
                          key={link.href}
                          variants={linkVariants}
                          custom={i}
                          initial="closed"
                          animate="open"
                        >
                          <Link
                            href={link.href}
                            onClick={() => setOpen(false)}
                            onMouseEnter={() => setHoveredLink(i)}
                            onMouseLeave={() => setHoveredLink(null)}
                            className={`group flex items-center gap-4 py-1.5 transition-all duration-300 ${
                              pathname === link.href
                                ? "text-white"
                                : hoveredLink !== null && hoveredLink !== i
                                ? "text-zinc-700"
                                : "text-zinc-400 hover:text-white"
                            }`}
                          >
                            <span
                              className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight"
                              style={{ fontFamily: "var(--font-serif), serif" }}
                            >
                              {link.label}
                            </span>
                            <span className="hidden md:block h-[1px] bg-current w-0 group-hover:w-12 transition-all duration-500" />
                          </Link>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Secondary links — small, inline */}
                    <motion.div
                      variants={linkVariants}
                      custom={primaryLinks.length}
                      initial="closed"
                      animate="open"
                      className="mt-6 flex gap-6"
                    >
                      {secondaryLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={`text-sm tracking-[0.1em] uppercase transition-colors duration-300 ${
                            pathname === link.href
                              ? "text-white"
                              : "text-zinc-500 hover:text-white"
                          }`}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>

                    {/* Book button */}
                    <motion.div
                      variants={linkVariants}
                      custom={primaryLinks.length + 1}
                      initial="closed"
                      animate="open"
                      className="mt-8"
                    >
                      <Link
                        href="/contact"
                        onClick={() => setOpen(false)}
                        className="inline-block px-10 py-3.5 text-sm tracking-[0.15em] uppercase border border-white/20 text-white hover:bg-white hover:text-zinc-900 transition-all duration-300 rounded-sm"
                      >
                        Book a Session
                      </Link>
                    </motion.div>

                    {/* Bottom contact */}
                    <motion.div
                      variants={linkVariants}
                      custom={primaryLinks.length + 2}
                      initial="closed"
                      animate="open"
                      className="mt-10 pt-6 border-t border-zinc-800/50 flex flex-wrap gap-8 text-xs tracking-widest uppercase text-zinc-600"
                    >
                      <a href={`mailto:${siteContent.site.email}`} className="hover:text-white transition-colors">
                        Email
                      </a>
                      <a href={siteContent.site.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                        Instagram
                      </a>
                      <a href={`tel:${siteContent.site.phone}`} className="hover:text-white transition-colors">
                        {siteContent.site.phone}
                      </a>
                    </motion.div>
                  </div>

                  {/* Images — desktop only */}
                  <div className="hidden lg:flex flex-col gap-3 w-[150px]">
                    {menuImages.map((img, i) => (
                      <motion.div
                        key={img.src}
                        variants={imageVariants}
                        custom={i}
                        initial="closed"
                        animate="open"
                      >
                        <div
                          className="relative overflow-hidden rounded-lg"
                          style={{
                            width: "150px",
                            aspectRatio: "3 / 4",
                            boxShadow: "0 15px 30px -8px rgba(0,0,0,0.4)",
                          }}
                        >
                          <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="150px" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
        <div
          className="fixed top-0 left-0 right-0 h-16 z-40 pointer-events-none transition-all duration-300"
          style={{
            backgroundColor: scrolled ? "rgba(248, 247, 244, 0.8)" : "transparent",
            backdropFilter: scrolled ? "blur(12px)" : "none",
          }}
        />
      )}
    </>
  );
}
