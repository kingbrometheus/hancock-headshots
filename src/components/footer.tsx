"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteContent } from "@/data/content";

const footerLinks = [
  { href: "/actor-headshots", label: "Actors" },
  { href: "/professional-headshots", label: "Professionals" },
  { href: "/musicians", label: "Musicians" },
  { href: "/about", label: "About" },
  { href: "/rates", label: "Rates" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const { site } = siteContent;

  return (
    <div className="mt-auto">
      {/* Main footer content */}
      <footer className="bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            <div className="md:col-span-4">
              <Image
                src="https://images.squarespace-cdn.com/content/v1/5f7359b579e51a7d39e29bbf/d5269eeb-eda4-4683-960d-abdd77b9d702/Hancock-Headshots-Logos-cropforwebsite.png?format=750w"
                alt="Hancock Headshots"
                width={200}
                height={44}
                className="h-9 w-auto brightness-0 invert mb-5"
              />
              <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
                {site.subtitle}. Brooklyn-based headshot photography for actors and
                professionals since 2006.
              </p>
            </div>

            <div className="md:col-span-3 md:col-start-6">
              <p className="text-xs tracking-[0.2em] uppercase text-zinc-600 mb-4">Navigate</p>
              <ul className="space-y-2.5">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-zinc-400 hover:text-white transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3 md:col-start-10">
              <p className="text-xs tracking-[0.2em] uppercase text-zinc-600 mb-4">Contact</p>
              <div className="space-y-2.5 mb-6">
                <a href={`mailto:${site.email}`} className="block text-sm text-zinc-400 hover:text-white transition-colors">{site.email}</a>
                <a href={`tel:${site.phone}`} className="block text-sm text-zinc-400 hover:text-white transition-colors">{site.phone}</a>
                <p className="text-sm text-zinc-500">{site.location}</p>
              </div>
              <div className="flex gap-4">
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-white transition-colors" aria-label="Instagram">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-white transition-colors" aria-label="Facebook">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                <a href={site.social.pinterest} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-white transition-colors" aria-label="Pinterest">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Reveal title */}
        <div className="bg-zinc-950 overflow-hidden px-6 pt-12 pb-4">
          <motion.h2
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[10vw] md:text-[7vw] font-light tracking-[0.04em] uppercase text-zinc-800 text-center whitespace-nowrap select-none"
            style={{ fontFamily: "var(--font-serif), serif" }}
          >
            Hancock Headshots
          </motion.h2>
        </div>
        <div className="bg-zinc-950 mx-auto max-w-7xl px-6 pb-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-zinc-700 tracking-wide">
            &copy; {new Date().getFullYear()} {site.name}. All Rights Reserved.
          </p>
          <p className="text-[11px] text-zinc-700 tracking-wide">
            Brooklyn, New York
          </p>
        </div>
      </footer>
    </div>
  );
}
