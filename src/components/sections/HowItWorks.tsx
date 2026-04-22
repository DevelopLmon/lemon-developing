"use client";

import React from "react";
import { motion } from "framer-motion";

const steps: { number: string; title: string; description: string; icon: React.ReactNode; badge?: string }[] = [
  {
    number: "01",
    badge: "GRATIS",
    title: "Kostenloses Briefing",
    description:
      "Wir lernen dein Projekt kennen. In einem kostenlosen Erstgespräch besprechen wir deine Ziele, Zielgruppe und Vorstellungen.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Konzept & Design",
    description:
      "Bevor du dich entscheidest, entwickeln wir bereits einen ersten Entwurf für dich. So kannst du sehen wie deine neue Seite aussehen könnte.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Entwicklung & Go-Live",
    description:
      "Dein Feedback setzen wir um, finalisieren alles und kümmern uns um die Domain – schon ist deine neue Website online.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Optional: Pflege-Paket",
    description:
      "Wenn du möchtest, übernehmen wir auch langfristig die Pflege und Anpassungen deiner Website. So bleibt sie immer aktuell und sicher.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="ablauf" className="py-28 px-6 relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(16,157,230,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading mt-3">
            So läuft&apos;s bei{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                uns
              </span>
          </h2>
          <p className="section-subheading">
            Transparent, strukturiert und auf Augenhöhe — von Anfang an.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-[3.5rem] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                <div className="glass rounded-2xl p-6 h-full glass-hover flex flex-col gap-4">
                  {/* Number + icon */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-bg-base flex-shrink-0"
                      style={{
                        background: "linear-gradient(135deg, #3a96ed, #308fb8)",
                        boxShadow: "0 0 20px rgba(16,157,230,0.3)",
                      }}
                    >
                      {step.icon}
                    </div>
                    <span className="font-mono text-3xl font-black text-blue-400/20">
                      {step.number}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-heading font-bold text-lg text-text-primary">
                      {step.title}
                    </h3>
                    {step.badge && (
                      <span
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-mono font-bold"
                        style={{
                          background: "rgba(34,197,94,0.15)",
                          border: "1px solid rgba(34,197,94,0.3)",
                          color: "#22c55e",
                        }}
                      >
                        <span className="relative flex w-1.5 h-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                          <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-green-500" />
                        </span>
                        {step.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
