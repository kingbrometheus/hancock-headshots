import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/fade-in";
import { siteContent } from "@/data/content";

export default function Rates() {
  const { rates } = siteContent;

  return (
    <main className="pt-24">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl mb-20">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase text-zinc-400 mb-4">
              Pricing
            </p>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-light mb-4"
              style={{ fontFamily: "var(--font-serif), serif", color: "#111" }}
            >
              {rates.heading}
            </h1>
            <p
              className="text-xl md:text-2xl italic text-zinc-400 font-light"
              style={{ fontFamily: "var(--font-serif), serif" }}
            >
              Sessions designed around you.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rates.packages.map((pkg, i) => (
            <FadeIn key={pkg.name} delay={i * 0.1}>
              <div
                className={`relative p-8 rounded-lg transition-all duration-300 h-full flex flex-col ${
                  pkg.featured
                    ? "bg-zinc-950 text-white"
                    : "bg-zinc-50 hover:bg-zinc-100"
                }`}
              >
                {pkg.featured && (
                  <span className="absolute -top-3 left-6 bg-white text-zinc-900 text-xs tracking-[0.15em] uppercase px-3 py-1 rounded-sm">
                    Most Popular
                  </span>
                )}

                <p className="text-xs tracking-[0.3em] uppercase text-zinc-400 mb-2">
                  {pkg.duration}
                </p>
                <h2
                  className="text-3xl font-light tracking-tight mb-1"
                  style={{ fontFamily: "var(--font-serif), serif" }}
                >
                  {pkg.name}
                </h2>
                <p className={`text-4xl font-light mb-4 ${pkg.featured ? "text-white" : "text-zinc-900"}`}>
                  {pkg.price}
                </p>
                <p className={`text-sm leading-relaxed mb-8 ${pkg.featured ? "text-zinc-400" : "text-zinc-400"}`}>
                  {pkg.description}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-3 text-sm ${pkg.featured ? "text-zinc-300" : "text-zinc-600"}`}
                    >
                      <span className={`mt-1.5 h-1 w-1 rounded-full shrink-0 ${pkg.featured ? "bg-zinc-500" : "bg-zinc-300"}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`block text-center py-3.5 text-sm tracking-[0.1em] uppercase rounded-sm transition-colors ${
                    pkg.featured
                      ? "bg-white text-zinc-900 hover:bg-zinc-200"
                      : "bg-zinc-900 text-white hover:bg-zinc-700"
                  }`}
                >
                  Book Session
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Payment & Booking Info */}
        <div className="mt-24">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase text-zinc-400 mb-8 text-center">
              Booking &amp; Payment
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Deposit */}
            <FadeIn delay={0.1}>
              <div className="bg-zinc-50 rounded-lg p-6 text-center">
                <p className="text-xs tracking-[0.2em] uppercase text-zinc-400 mb-2">Deposit</p>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  A non-refundable deposit is required to reserve your session. Balance due on shoot day.
                </p>
              </div>
            </FadeIn>

            {/* Payment — Venmo */}
            <FadeIn delay={0.2}>
              <div className="bg-zinc-50 rounded-lg p-6 text-center">
                <div className="flex items-center justify-center h-10 mb-3">
                  <Image src="/logos/venmo.svg" alt="Venmo" width={80} height={16} className="h-4 w-auto" />
                </div>
                <p className="text-lg font-light text-zinc-900 mb-1">Lisa-Hancock-5</p>
                <p className="text-xs text-zinc-400">Venmo username</p>
              </div>
            </FadeIn>

            {/* Payment — Zelle */}
            <FadeIn delay={0.3}>
              <div className="bg-zinc-50 rounded-lg p-6 text-center">
                <div className="flex items-center justify-center h-10 mb-3">
                  <Image src="/logos/zelle.svg" alt="Zelle" width={100} height={40} className="h-10 w-auto" />
                </div>
                <p className="text-lg font-light text-zinc-900 mb-1">(917) 628-8845</p>
                <p className="text-xs text-zinc-400">Zelle phone number</p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.4}>
            <p className="text-sm text-zinc-400 text-center mt-10">
              Additional retouching at $35/image. Custom pricing for teams, groups, fashion, music, or events.
            </p>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
