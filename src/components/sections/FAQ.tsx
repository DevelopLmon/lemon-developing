"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Wie lange dauert die Entwicklung einer Website?",
    a: "Je nach Umfang dauert ein Projekt zwischen 1 und 2 Tage. Im Erstgespräch legen wir gemeinsam einen realistischen Zeitplan fest.",
  },
  {
    q: "Was brauche ich, um loszulegen?",
    a: "Nur deine Idee und grobe Vorstellungen. Wir führen dich durch den gesamten Prozess — vom Briefing bis zum Launch. Texte, Bilder und Inhalte kannst du nach und nach liefern.",
  },
  {
    q: "Welche Technologien nutzt ihr?",
    a: "Wir setzen primär auf Next.js, React und TypeScript für das Frontend. Für Content-Management nutzen wir Headless CMS-Lösungen wie Sanity oder Contentful. Backend-seitig arbeiten wir mit Node.js, PostgreSQL und modernen Cloud-Infrastrukturen.",
  },
  {
    q: "Kann ich meine Website nach dem Launch selbst bearbeiten?",
    a: "Ja! Auf Wunsch integrieren wir ein benutzerfreundliches CMS, mit dem du Texte, Bilder und Inhalte selbst pflegen kannst — ganz ohne technisches Know-how.",
  },
  {
    q: "Bietet ihr auch Wartung und Support nach dem Launch an?",
    a: "Ja. Je nach Paket bieten wir 1 bis 12 Monate inkludierten Support. Darüber hinaus bieten wir monatliche Wartungsverträge an, die Updates, Sicherheits-Patches und kleinere Anpassungen abdecken.",
  },
  {
    q: "Wie funktioniert die Zusammenarbeit remote?",
    a: "Problemlos. Wir arbeiten vollständig remote und nutzen Tools wie Figma, Notion und Slack für die Kommunikation. Regelmäßige Video-Calls halten dich immer auf dem neuesten Stand.",
  },
  {
    q: "Was, wenn mir das Design nicht gefällt?",
    a: "In jedem Paket sind mindestens 2 Design-Revisionsrunden enthalten. Wir arbeiten iterativ und zeigen dir früh Zwischenstände, damit du Feedback geben kannst — bevor viel Arbeit in eine Richtung geflossen ist.",
  },
  {
    q: "Helft ihr auch bei SEO und Google-Rankings?",
    a: "Ja! SEO-Grundlagen sind in allen Paketen enthalten. Für tiefergehende SEO-Arbeit (Keyword-Strategie, technisches SEO, Content-Optimierung) bieten wir auch dedizierte SEO-Pakete an.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`glass rounded-xl overflow-hidden transition-all duration-300 ${
        open ? "border-lemon/25" : "border-white/12 hover:border-white/20"
      }`}
      style={{
        borderColor: open ? "rgba(232,228,64,0.25)" : undefined,
        boxShadow: open ? "0 0 20px rgba(232,228,64,0.06)" : undefined,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
      >
        <span className="font-heading font-semibold text-text-primary">{q}</span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
            open ? "bg-lemon text-bg-base" : "bg-white/10 text-text-muted"
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-5 text-text-muted leading-relaxed text-sm border-t border-white/8 pt-4">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-28 px-6 relative">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="font-mono text-lemon text-sm tracking-widest uppercase">
            Häufige Fragen
          </span>
          <h2 className="section-heading mt-3">
            FAQ
          </h2>
          <p className="section-subheading">
            Alles, was du wissen möchtest — auf einen Blick.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((item, i) => (
            <FAQItem key={item.q} q={item.q} a={item.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
