import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { siteContent } from "@/data/content";

export default function About() {
  const { about } = siteContent;

  return (
    <main className="pt-24">
      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* Hero header */}
        <div className="max-w-3xl mb-20">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase text-zinc-400 mb-4">
              About
            </p>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-light mb-6"
              style={{ fontFamily: "var(--font-serif), serif", color: "#111" }}
            >
              Lisa Hancock
            </h1>
            <p
              className="text-xl md:text-2xl italic text-zinc-400 font-light"
              style={{ fontFamily: "var(--font-serif), serif" }}
            >
              NYC photographer, former actor, and lifelong observer of people.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Portrait */}
          <FadeIn>
            <div
              className="sticky top-28 rounded-lg bg-white p-[6px]"
              style={{
                rotate: "-2deg",
                boxShadow: "0 25px 50px -10px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.04)",
              }}
            >
              <Image
                src={about.portrait}
                alt="Lisa Hancock"
                width={600}
                height={750}
                className="rounded-md w-full h-auto"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </FadeIn>

          {/* Content */}
          <div className="md:pt-4">
            <div className="space-y-6">
              {about.bio.map((paragraph, i) => (
                <FadeIn key={i} delay={0.1 * (i + 1)}>
                  <p className="text-base md:text-lg text-zinc-500 leading-relaxed font-light">
                    {paragraph}
                  </p>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.4}>
              <div className="mt-14">
                <p className="text-base md:text-lg text-zinc-500 leading-relaxed font-light mb-8">
                  {about.cta}
                </p>
                <Link
                  href="/contact"
                  className="inline-block px-8 py-3.5 text-sm tracking-[0.1em] uppercase bg-zinc-900 text-white hover:bg-zinc-700 transition-colors rounded-sm"
                >
                  Contact Me
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </main>
  );
}
