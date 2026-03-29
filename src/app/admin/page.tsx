"use client";

import { useState } from "react";
import { siteContent } from "@/data/content";
import { Pencil, Plus, Trash2, Save, Image as ImageIcon, X } from "lucide-react";

type Tab = "about" | "actors" | "professionals" | "rates" | "site";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("about");
  const [content, setContent] = useState(structuredClone(siteContent));
  const [saved, setSaved] = useState(false);

  const tabs: { key: Tab; label: string }[] = [
    { key: "site", label: "Site Info" },
    { key: "about", label: "About" },
    { key: "actors", label: "Actor Gallery" },
    { key: "professionals", label: "Pro Gallery" },
    { key: "rates", label: "Rates" },
  ];

  function handleSave() {
    // In production, this would POST to an API that writes to Vercel Blob or a database
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    console.log("Content to save:", JSON.stringify(content, null, 2));
  }

  return (
    <main className="pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light tracking-tight">Content Manager</h1>
            <p className="text-sm text-zinc-400 mt-1">Edit your site content below</p>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white text-sm rounded-sm hover:bg-zinc-700 transition-colors"
          >
            <Save className="h-4 w-4" />
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-zinc-200 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm transition-colors border-b-2 -mb-px ${
                activeTab === tab.key
                  ? "border-zinc-900 text-zinc-900"
                  : "border-transparent text-zinc-400 hover:text-zinc-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Site Info */}
        {activeTab === "site" && (
          <div className="space-y-6">
            <Field label="Site Name" value={content.site.name} onChange={(v) => setContent({ ...content, site: { ...content.site, name: v } })} />
            <Field label="Tagline" value={content.site.tagline} onChange={(v) => setContent({ ...content, site: { ...content.site, tagline: v } })} />
            <Field label="Subtitle" value={content.site.subtitle} onChange={(v) => setContent({ ...content, site: { ...content.site, subtitle: v } })} />
            <Field label="Phone" value={content.site.phone} onChange={(v) => setContent({ ...content, site: { ...content.site, phone: v } })} />
            <Field label="Email" value={content.site.email} onChange={(v) => setContent({ ...content, site: { ...content.site, email: v } })} />
            <Field label="Location" value={content.site.location} onChange={(v) => setContent({ ...content, site: { ...content.site, location: v } })} />
          </div>
        )}

        {/* About */}
        {activeTab === "about" && (
          <div className="space-y-6">
            <Field label="Portrait URL" value={content.about.portrait} onChange={(v) => setContent({ ...content, about: { ...content.about, portrait: v } })} />
            {content.about.bio.map((para, i) => (
              <div key={i} className="relative">
                <TextArea
                  label={`Bio Paragraph ${i + 1}`}
                  value={para}
                  onChange={(v) => {
                    const bio = [...content.about.bio];
                    bio[i] = v;
                    setContent({ ...content, about: { ...content.about, bio } });
                  }}
                />
                {content.about.bio.length > 1 && (
                  <button
                    onClick={() => {
                      const bio = content.about.bio.filter((_, idx) => idx !== i);
                      setContent({ ...content, about: { ...content.about, bio } });
                    }}
                    className="absolute top-0 right-0 p-1 text-zinc-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => setContent({ ...content, about: { ...content.about, bio: [...content.about.bio, ""] } })}
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-900 transition-colors"
            >
              <Plus className="h-4 w-4" /> Add Paragraph
            </button>
            <TextArea label="CTA Text" value={content.about.cta} onChange={(v) => setContent({ ...content, about: { ...content.about, cta: v } })} />
          </div>
        )}

        {/* Gallery editors */}
        {(activeTab === "actors" || activeTab === "professionals") && (
          <GalleryEditor
            gallery={activeTab === "actors" ? content.galleries.actors : content.galleries.professionals}
            onChange={(gallery) =>
              setContent({
                ...content,
                galleries: {
                  ...content.galleries,
                  [activeTab === "actors" ? "actors" : "professionals"]: gallery,
                },
              })
            }
          />
        )}

        {/* Rates */}
        {activeTab === "rates" && (
          <div className="space-y-8">
            {content.rates.packages.map((pkg, i) => (
              <div key={i} className="border border-zinc-200 rounded-sm p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <Pencil className="h-3 w-3 text-zinc-400" />
                    Package {i + 1}
                  </h3>
                  {pkg.featured && (
                    <span className="text-xs bg-zinc-100 px-2 py-0.5 rounded">Featured</span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Name" value={pkg.name} onChange={(v) => {
                    const packages = [...content.rates.packages];
                    packages[i] = { ...packages[i], name: v };
                    setContent({ ...content, rates: { ...content.rates, packages } });
                  }} />
                  <Field label="Price" value={pkg.price} onChange={(v) => {
                    const packages = [...content.rates.packages];
                    packages[i] = { ...packages[i], price: v };
                    setContent({ ...content, rates: { ...content.rates, packages } });
                  }} />
                </div>
                <Field label="Duration" value={pkg.duration} onChange={(v) => {
                  const packages = [...content.rates.packages];
                  packages[i] = { ...packages[i], duration: v };
                  setContent({ ...content, rates: { ...content.rates, packages } });
                }} />
                <TextArea label="Description" value={pkg.description} onChange={(v) => {
                  const packages = [...content.rates.packages];
                  packages[i] = { ...packages[i], description: v };
                  setContent({ ...content, rates: { ...content.rates, packages } });
                }} />
              </div>
            ))}
            <TextArea label="Note" value={content.rates.note} onChange={(v) => setContent({ ...content, rates: { ...content.rates, note: v } })} />
          </div>
        )}
      </div>
    </main>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs text-zinc-400 mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-zinc-200 rounded-sm text-sm focus:outline-none focus:border-zinc-400 transition-colors"
      />
    </div>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs text-zinc-400 mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full px-3 py-2 border border-zinc-200 rounded-sm text-sm focus:outline-none focus:border-zinc-400 transition-colors resize-y"
      />
    </div>
  );
}

interface GalleryData {
  title: string;
  subtitle: string;
  images: { src: string; alt: string }[];
}

function GalleryEditor({ gallery, onChange }: { gallery: GalleryData; onChange: (g: GalleryData) => void }) {
  return (
    <div className="space-y-6">
      <Field label="Gallery Title" value={gallery.title} onChange={(v) => onChange({ ...gallery, title: v })} />
      <Field label="Subtitle" value={gallery.subtitle} onChange={(v) => onChange({ ...gallery, subtitle: v })} />

      <div>
        <p className="text-xs text-zinc-400 mb-3">Images ({gallery.images.length})</p>
        <div className="space-y-3">
          {gallery.images.map((img, i) => (
            <div key={i} className="flex items-center gap-3 border border-zinc-200 rounded-sm p-3">
              <ImageIcon className="h-4 w-4 text-zinc-300 shrink-0" />
              <input
                type="text"
                value={img.src}
                onChange={(e) => {
                  const images = [...gallery.images];
                  images[i] = { ...images[i], src: e.target.value };
                  onChange({ ...gallery, images });
                }}
                placeholder="Image URL"
                className="flex-1 text-xs text-zinc-600 bg-transparent focus:outline-none truncate"
              />
              <input
                type="text"
                value={img.alt}
                onChange={(e) => {
                  const images = [...gallery.images];
                  images[i] = { ...images[i], alt: e.target.value };
                  onChange({ ...gallery, images });
                }}
                placeholder="Alt text"
                className="w-32 text-xs text-zinc-400 bg-transparent focus:outline-none"
              />
              <button
                onClick={() => {
                  const images = gallery.images.filter((_, idx) => idx !== i);
                  onChange({ ...gallery, images });
                }}
                className="text-zinc-300 hover:text-red-500 transition-colors shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => onChange({ ...gallery, images: [...gallery.images, { src: "", alt: "" }] })}
          className="mt-3 flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-900 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Image
        </button>
      </div>
    </div>
  );
}
