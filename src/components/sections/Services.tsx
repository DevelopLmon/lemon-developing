"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

const services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: "Webdesign & UI/UX",
    description:
      "Interfaces, die begeistern — nicht nur funktionieren. Wir entwerfen visuell starke, nutzerfreundliche Designs, die deine Marke perfekt repräsentieren.",
    tags: ["Figma", "Prototyping", "Design System", "WCAG"],
    accent: "lemon" as const,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Web-Development",
    description:
      "Next.js, React, TypeScript — skalierbar und performance-first. Wir bauen moderne Web-Apps, die schnell laden und sicher laufen.",
    tags: ["Next.js", "TypeScript", "REST/GraphQL", "CI/CD"],
    accent: "violet" as const,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "SEO & Performance",
    description:
      "Gefunden werden. Core Web Vitals. Echte Ergebnisse. Wir optimieren deine Website für maximale Sichtbarkeit und Ladegeschwindigkeit.",
    tags: ["Core Web Vitals", "Technical SEO", "Analytics", "Lighthouse"],
    accent: "lemon" as const,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Services() {
  return (
    <section id="services" className="py-28 px-6 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-lemon text-sm tracking-widest uppercase">
            Was wir bieten
          </span>
          <h2 className="section-heading mt-3">
            Unsere <span className="text-gradient-mixed">Leistungen</span>
          </h2>
          <p className="section-subheading">
            Von der ersten Idee bis zum Launch — wir begleiten dich durch jeden
            Schritt deines digitalen Projekts.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={cardVariants}>
              <GlassCard
                className="p-8 h-full flex flex-col gap-5"
                glowColor={service.accent}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    service.accent === "lemon"
                      ? "text-lemon bg-lemon/10"
                      : "text-violet-bright bg-violet/10"
                  }`}
                >
                  {service.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-xl text-text-primary mb-3">
                    {service.title}
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 text-text-muted border border-white/8"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
