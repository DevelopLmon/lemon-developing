"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const projects = [
  {
    title: "Bademühlen",
    category: "Dorf",
    location: "Zeven",
    description:
      "Eine wunderschöne Website für das idyllische Dorf Bademühlen, mit Veranstaltungskalender, Ortsgeschichte und interaktiver Karte.",
    accent: "#3a96ed",
    href: "https://www.bademuehlen.com",
    image: "/portfolio/bademuehlen.jpg",
  },
  {
    title: "Pizzeria Allegria",
    category: "Italienisches Restaurant",
    location: "Zeven",
    description:
      "Stimmungsvolles und authentisches Design mit Speisekarte und Kontaktinformationen zum Restaurant selbst.",
    accent: "#3a96ed",
    href: "https://pizzeria-allegria.vercel.app/",
    image: "/portfolio/allegria.jpg",
  },
  {
    title: "Deine Seite",
    category: "Dein Unternehmen",
    location: "Dein Ort",
    description:
      "Hier könnte deine Website stehen — individuell gestaltet, schnell gebaut, und genau auf dein Unternehmen zugeschnitten.",
    accent: "#3a96ed",
    href: "#kontakt",
    image: null,
  },
];

export default function Portfolio() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="portfolio" className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-black text-4xl md:text-5xl text-text-primary leading-tight">
            Was unsere Kunden{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                bekommen
              </span>
          </h2>
          <p className="text-text-muted mt-4 text-base max-w-xl mx-auto">
            Keine Templates, keine Lösungen von der Stange. Jede Website entsteht individuell und passgenau für das jeweilige Unternehmen – hier sind zwei ausgewählte Beispiele.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.href}
              target={project.href.startsWith("http") ? "_blank" : undefined}
              rel={project.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              className="group relative rounded-2xl overflow-hidden flex flex-col no-underline"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${hovered === i ? `${project.accent}50` : "rgba(255,255,255,0.1)"}`,
                boxShadow: hovered === i
                  ? `0 0 40px ${project.accent}20, 0 8px 32px rgba(0,0,0,0.5)`
                  : "0 8px 32px rgba(0,0,0,0.4)",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              {/* Screenshot area */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                {/* Browser chrome */}
                <div
                  className="absolute top-0 left-0 right-0 z-10 flex items-center gap-1.5 px-3 py-2"
                  style={{ background: "rgba(20,20,28,0.95)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="w-2 h-2 rounded-full bg-red-400/70" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400/70" />
                  <div className="w-2 h-2 rounded-full bg-green-400/70" />
                  <div className="flex-1 mx-3 h-3 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }} />
                </div>

                {/* Image or placeholder */}
                {project.image ? (
                  <div className="absolute inset-0 pt-7">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* subtle dark overlay on hover to keep LIVE badge readable */}
                    <div
                      className="absolute inset-0 transition-opacity duration-300"
                      style={{ background: "rgba(0,0,0,0.1)", opacity: hovered === i ? 1 : 0 }}
                    />
                  </div>
                ) : (
                  /* Placeholder for "Deine Seite" */
                  <div
                    className="absolute inset-0 pt-7 flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #0f0f18 0%, #1a1528 100%)" }}
                  >
                    <div className="text-center">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3"
                        style={{ background: "rgba(58,150,237,0.1)", border: "1px solid rgba(58,150,237,0.2)" }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3a96ed" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </div>
                      <p className="text-white/30 text-xs font-mono tracking-widest">DEIN PROJEKT</p>
                    </div>
                  </div>
                )}

                {/* LIVE badge — only for real projects */}
                {project.image && (
                  <div
                    className="absolute top-8 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider"
                    style={{ background: "linear-gradient(135deg, #bababa, #bababa)", color: "#0A0A12" }}
                  >
                    <span className="relative flex w-1.5 h-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75" />
                      <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-green-500" />
                    </span>
                    LIVE
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className="font-heading font-bold text-lg transition-colors duration-300"
                    style={{ color: hovered === i ? project.accent : "#F0F0F8" }}
                  >
                    {project.title}
                  </h3>
                  <span
                    className="mt-0.5 flex-shrink-0 transition-all duration-300"
                    style={{
                      color: hovered === i ? project.accent : "rgba(255,255,255,0.3)",
                      transform: hovered === i ? "translate(2px, -2px)" : "translate(0,0)",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </span>
                </div>
                <p className="text-xs font-mono" style={{ color: project.accent }}>
                  {project.category} · {project.location}
                </p>
                <p className="text-text-muted text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-text-muted text-sm mt-10"
        >
          ... und viele weitere. Jede Website ist ein Unikat — gebaut mit viel Liebe und Sorgfalt.
        </motion.p>
      </div>
    </section>
  );
}
