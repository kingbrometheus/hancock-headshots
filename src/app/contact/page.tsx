import { FadeIn } from "@/components/fade-in";
import { siteContent } from "@/data/content";

export default function Contact() {
  const { site, contact } = siteContent;

  return (
    <main className="pt-24">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left: Heading */}
          <div>
            <FadeIn>
              <p className="text-xs tracking-[0.3em] uppercase text-zinc-400 mb-4">
                Contact
              </p>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-light mb-6"
                style={{ fontFamily: "var(--font-serif), serif", color: "#111" }}
              >
                {contact.heading}
              </h1>
              <p
                className="text-xl italic text-zinc-400 font-light max-w-md"
                style={{ fontFamily: "var(--font-serif), serif" }}
              >
                {contact.description}
              </p>
            </FadeIn>
          </div>

          {/* Right: Contact details */}
          <div className="md:pt-16">
            <div className="space-y-10">
              <FadeIn delay={0.1}>
                <a href={`mailto:${site.email}`} className="block group">
                  <p className="text-xs tracking-[0.2em] uppercase text-zinc-400 mb-2">Email</p>
                  <p className="text-2xl font-light text-zinc-900 group-hover:text-zinc-500 transition-colors">
                    {site.email}
                  </p>
                </a>
              </FadeIn>

              <FadeIn delay={0.2}>
                <a href={`tel:${site.phone}`} className="block group">
                  <p className="text-xs tracking-[0.2em] uppercase text-zinc-400 mb-2">Phone</p>
                  <p className="text-2xl font-light text-zinc-900 group-hover:text-zinc-500 transition-colors">
                    {site.phone}
                  </p>
                </a>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-zinc-400 mb-2">Studio</p>
                  <p className="text-2xl font-light text-zinc-900">
                    {site.location}
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-zinc-400 mb-3">Follow</p>
                  <div className="flex gap-6">
                    <a
                      href={site.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm tracking-[0.1em] uppercase text-zinc-400 hover:text-zinc-900 transition-colors"
                    >
                      Instagram
                    </a>
                    <a
                      href={site.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm tracking-[0.1em] uppercase text-zinc-400 hover:text-zinc-900 transition-colors"
                    >
                      Facebook
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
