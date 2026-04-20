"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    title: "SaaS Dashboard",
    category: "Web-App",
    description: "Komplexes Analytics-Dashboard mit Echtzeit-Daten und dark UI",
    tags: ["Next.js", "TypeScript", "Recharts"],
    gradient: "from-violet/30 to-transparent",
    accent: "#7C3AED",
  },
  {
    title: "E-Commerce Relaunch",
    category: "Web-Development",
    description: "Performance-First Shop mit 98/100 Lighthouse Score",
    tags: ["Next.js", "Shopify API", "Tailwind"],
    gradient: "from-lemon/20 to-transparent",
    accent: "#E8E440",
  },
  {
    title: "Agentur-Website",
    category: "Webdesign",
    description: "Moderne Portfolio-Site mit Scroll-Animationen und 3D-Elementen",
    tags: ["Next.js", "Framer Motion", "Three.js"],
    gradient: "from-blue-500/20 to-transparent",
    accent: "#3B82F6",
  },
  {
    title: "Fitness-App UI",
    category: "UI/UX",
    description: "Mobile-first Interface für eine Fitness-Tracking-App",
    tags: ["Figma", "React Native", "Design System"],
    gradient: "from-emerald-500/20 to-transparent",
    accent: "#10B981",
  },
  {
    title: "Immobilien-Portal",
    category: "Web-Development",
    description: "Vollständiges Immobilienportal mit Such- und Filterfunktionen",
    tags: ["Next.js", "PostgreSQL", "Mapbox"],
    gradient: "from-orange-500/20 to-transparent",
    accent: "#F59E0B",
  },
  {
    title: "Corporate Website",
    category: "Webdesign",
    description: "Professioneller Unternehmensauftritt mit CMS-Integration",
    tags: ["Next.js", "Sanity CMS", "SEO"],
    gradient: "from-pink-500/20 to-transparent",
    accent: "#EC4899",
  },
];

export default function Portfolio() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="portfolio" className="py-28 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-lemon text-sm tracking-widest uppercase">
            Unsere Arbeiten
          </span>
          <h2 className="section-heading mt-3">
            Ausgewählte <span className="text-gradient-lemon">Projekte</span>
          </h2>
          <p className="section-subheading">
            Jedes Projekt ist einzigartig — hier sind einige Beispiele unserer
            Arbeit.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              className="group relative glass rounded-2xl overflow-hidden cursor-pointer"
              style={{
                borderColor:
                  hovered === i ? `${project.accent}40` : "rgba(255,255,255,0.12)",
                boxShadow:
                  hovered === i
                    ? `0 0 30px ${project.accent}25`
                    : "0 8px 32px rgba(0,0,0,0.4)",
                transition: "all 0.3s ease",
              }}
            >
              {/* Mock preview area */}
              <div
                className={`h-44 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Faux browser chrome */}
                  <div className="w-4/5 glass rounded-lg overflow-hidden">
                    <div className="flex gap-1.5 px-3 py-2 border-b border-white/10">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
                    </div>
                    <div className="p-3 space-y-1.5">
                      <div
                        className="h-2 rounded-full w-3/4"
                        style={{ background: `${project.accent}40` }}
                      />
                      <div className="h-2 rounded-full w-1/2 bg-white/10" />
                      <div className="h-2 rounded-full w-2/3 bg-white/10" />
                    </div>
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 right-3">
                  <span
                    className="text-xs font-mono px-2 py-1 rounded-md"
                    style={{
                      background: `${project.accent}20`,
                      color: project.accent,
                      border: `1px solid ${project.accent}40`,
                    }}
                  >
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-heading font-bold text-lg text-text-primary mb-2">
                  {project.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover overlay link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hovered === i ? 1 : 0 }}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: "rgba(10,10,18,0.5)",
                  backdropFilter: "blur(4px)",
                }}
              >
                <span
                  className="font-heading font-semibold text-sm px-4 py-2 rounded-lg"
                  style={{
                    background: project.accent,
                    color: "#0A0A12",
                  }}
                >
                  Projekt ansehen →
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
