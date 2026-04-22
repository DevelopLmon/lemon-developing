"use client";

import { ContainerScroll } from "@/components/ui/container-scroll";

function WebsitePreview() {
  return (
    <div className="w-full h-full bg-[#0A0A12] flex flex-col overflow-hidden font-sans">

      {/* Browser Bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/8 bg-white/4 flex-shrink-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 mx-4 h-6 rounded-md bg-white/6 flex items-center px-3">
          <span className="text-white/30 text-xs font-mono">www.coresites-studio.de</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative">

        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-purple-900/20" />

        {/* Hero */}
        <div className="relative flex flex-col items-center justify-center py-10 px-8 text-center">

          {/* Badge */}
          <div className="text-[10px] ##109de6 mb-3 tracking-widest uppercase">
            Webdesign für lokale Unternehmen
          </div>

          {/* Headline */}
          <h1 className="text-2xl md:text-3xl font-black leading-tight mb-3">
            Mehr Kunden für dein{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              lokales Business
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-white/50 text-xs mb-4 max-w-xs">
            Wir erstellen Websites für Restaurants, Friseure, Praxen & Co., die dir planbar neue Anfragen und Kunden bringen.
          </p>

          {/* TRUST */}
          <div className="flex gap-4 text-[10px] text-white/40 mb-5 flex-wrap justify-center">
            <span>✔ Mehr Anfragen</span>
            <span>✔ Lokal sichtbar</span>
            <span>✔ Conversion-optimiert</span>
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <a href="#kontakt" className="px-4 py-2 rounded-lg text-xs font-bold text-black bg-blue-400 shadow-lg hover:scale-105 transition">
              Kostenlose Analyse sichern
            </a>
            <a href="#portfolio" className="px-4 py-2 rounded-lg text-xs border border-white/10 text-white/70 hover:bg-white/5 transition">
              Beispiele ansehen
            </a>
          </div>

          {/* Zielgruppen */}
          <div className="mt-6 text-[10px] text-white/40 max-w-xs">
            Für Restaurants, Cafés, Friseure, Praxen, Handwerker, Fitnessstudios, Anwälte & lokale Unternehmen
          </div>

          {/* SERVICE CARDS */}
          <div className="mt-8 grid grid-cols-3 gap-3 w-full max-w-lg">
            {[
              { label: "Webdesign", color: "#109de6" },
              { label: "Development", color: "#9D5FF5" },
              { label: "Local SEO", color: "#109de6" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl p-3 text-center border border-white/10 bg-white/5 hover:scale-105 transition"
              >
                <div className="text-[10px]" style={{ color: s.color }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default function ScrollShowcase() {
  return (
    <div className="relative overflow-hidden bg-bg-base">
      <ContainerScroll
        titleComponent={
          <div className="mb-6 text-center">
            <h2 className="font-black text-4xl md:text-6xl text-white leading-tight">
              Websites, die{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                lokal Kunden bringen
              </span>
            </h2>

            <p className="text-white/50 mt-3 text-lg max-w-xl mx-auto">
              Für lokale Unternehmen entwickelt – damit du online sichtbar wirst und mehr Anfragen bekommst.
            </p>
          </div>
        }
      >
        <WebsitePreview />
      </ContainerScroll>
    </div>
  );
}