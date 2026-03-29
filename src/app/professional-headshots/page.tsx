import { Gallery } from "@/components/gallery";
import { FadeIn } from "@/components/fade-in";
import { siteContent } from "@/data/content";

export default function ProfessionalHeadshots() {
  const { professionals } = siteContent.galleries;

  return (
    <main className="pt-24">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl mb-20">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase text-zinc-400 mb-4">
              Portfolio
            </p>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-light mb-4"
              style={{ fontFamily: "var(--font-serif), serif", color: "#111" }}
            >
              {professionals.title}
            </h1>
            <p
              className="text-xl md:text-2xl italic text-zinc-400 font-light"
              style={{ fontFamily: "var(--font-serif), serif" }}
            >
              {professionals.subtitle}
            </p>
          </FadeIn>
        </div>

        <Gallery images={professionals.images} />
      </div>
    </main>
  );
}
