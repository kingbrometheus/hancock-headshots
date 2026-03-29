import Link from "next/link";
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
              Investment
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
                <div className="flex items-center justify-center gap-3 mb-3">
                  {/* Venmo logo */}
                  <svg className="h-5 w-auto" viewBox="0 0 512 126" fill="none">
                    <path d="M76.8 0c4.5 7.8 6.5 15.8 6.5 26.1 0 32.5-27.8 74.7-50.3 104.4H8.3L0 5.4l28.6-2.7 5.5 68.5c10.1-16.4 22.6-42.3 22.6-60 0-9.7-1.6-16.3-4-21.5L76.8 0z" fill="#3D95CE"/>
                    <path d="M119.2 48.8c4.7 0 16.3-2 16.3-13 0-4.9-3.4-7.3-7.1-7.3-6.8 0-14.5 8.3-16.1 20.3h6.9zm-7.5 21.7c0 13.8 7.3 19.3 17 19.3 10.5 0 19.5-3.1 29-8.5l-3.8 24c-7.5 3.8-19.1 6.8-30.8 6.8-29.4 0-38.9-18-38.9-40.4 0-30.1 18.3-55.5 48.6-55.5 17.8 0 28.2 10.1 28.2 24.8 0 21.3-23.6 29.5-49.3 29.5zm93.3-42c6.5 0 11.2 1 14.3 2.2l-4.9 25.3c-2.9-1.1-6-2-11.6-2-9.1 0-16.5 6.7-19.1 19.8l-4.7 36.6h-28l9.7-79.5h25.1l-1.6 13.8c5.8-9.7 13.4-16.2 20.8-16.2zm57.6-1c12.6 0 17.4 7.5 17.4 17.4 0 3.6-.5 9.1-1.4 13l-7.5 52.5h-28l7.1-49.9c.4-2.4.7-5.5.7-7.5 0-4.4-1.6-6.5-5.6-6.5-5.5 0-11.8 4.7-15.1 19.1l-6.2 44.8h-28l9.7-79.5h25.3l-1.3 10.5c7.1-7.6 15.1-13.9 24.9-13.9h8zm79 2.9c7.6-7.6 15.1-13.9 24.7-13.9s17.6 7.5 17.6 17.4c0 3.6-.5 9.1-1.4 13l-7.5 52.5h-28l7.1-49.3c.4-2.7.7-5.8.7-7.8 0-4.5-1.5-6.9-5.4-6.9-5.5 0-12 4.9-15.3 19.5l-6.2 44.5h-28l7.1-49.3c.4-2.7.7-5.8.7-7.8 0-4.5-1.5-6.9-5.4-6.9-5.6 0-11.8 4.7-15.3 19.5l-6 44.5h-28.2l9.7-79.5h25.1l-1.3 10.5c7.1-7.6 14.7-13.9 24.5-13.9 10.5 0 15.8 5.5 17.6 13.9zm66.6 44.5c0 11.8 4 16.1 10.8 16.1 7.5 0 15.1-6.5 18.1-22.2 0-12.8-3.2-17.8-10.5-17.8-8.5 0-15.7 6.9-18.4 23.9zm55.5-22.4c0 28.4-16.1 59.7-51.7 59.7-25.3 0-31.9-15.6-31.9-32.3 0-27.6 16.5-55.7 50.6-55.7 24.5-.2 33 13.8 33 28.3z" fill="#3D95CE"/>
                  </svg>
                </div>
                <p className="text-lg font-light text-zinc-900 mb-1">Lisa-Hancock-5</p>
                <p className="text-xs text-zinc-400">Venmo username</p>
              </div>
            </FadeIn>

            {/* Payment — Zelle */}
            <FadeIn delay={0.3}>
              <div className="bg-zinc-50 rounded-lg p-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  {/* Zelle logo */}
                  <svg className="h-5 w-auto" viewBox="0 0 360 100" fill="none">
                    <path d="M35.7 20h60.8L35.2 80h62.3v15.5H20.7L82 35.5H24.2V20h11.5z" fill="#6D1ED4"/>
                    <path d="M133.2 55.5c0-7.2-4.8-12.8-12.3-12.8-7.2 0-13.1 5.6-13.1 12.8 0 7.2 5.9 12.8 13.1 12.8 7.5 0 12.3-5.6 12.3-12.8zm-38.9 0c0-15.2 11.5-26.4 26.6-26.4 15.4 0 26.1 11.2 26.1 26.4 0 15.2-10.7 26.4-26.1 26.4-15.1 0-26.6-11.2-26.6-26.4zm72.4-37h13.5v63h-13.5v-63zm22.7 0h13.5v63h-13.5v-63zm36.7 37c0-7.2-4.8-12.8-12.3-12.8-7.2 0-13.1 5.6-13.1 12.8 0 7.2 5.9 12.8 13.1 12.8 7.5 0 12.3-5.6 12.3-12.8zm-38.9 0c0-15.2 11.5-26.4 26.6-26.4 15.4 0 26.1 11.2 26.1 26.4 0 15.2-10.7 26.4-26.1 26.4-15.1 0-26.6-11.2-26.6-26.4z" fill="#6D1ED4"/>
                    <path d="M273.4 80.5c-6.7 0-12.2-2.1-15.8-6.2v5.2h-13.1v-63h13.5v24.7c3.6-3.8 9-5.8 15.4-5.8 14.7 0 24.5 11.2 24.5 26.4-.1 12.5-9.8 18.7-24.5 18.7zm-3.6-38.2c-7.2 0-12.6 5.6-12.6 12.8s5.4 12.8 12.6 12.8c7.5 0 12.3-5.6 12.3-12.8s-4.8-12.8-12.3-12.8z" fill="#6D1ED4"/>
                  </svg>
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
