"use client";

import { ContainerScroll } from "@/components/ui/container-scroll";

// Mock website preview rendered inside the scroll card
function WebsitePreview() {
  return (
    <div className="w-full h-full bg-[#0A0A12] flex flex-col overflow-hidden font-sans">
      {/* Mock browser bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/8 bg-white/4 flex-shrink-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 mx-4 h-6 rounded-md bg-white/6 flex items-center px-3">
          <span className="text-white/30 text-xs font-mono">lemon-developing.de</span>
        </div>
      </div>

      {/* Mock page content */}
      <div className="flex-1 overflow-hidden relative">
        {/* Gradient bg */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(124,58,237,0.25) 0%, transparent 60%)",
          }}
        />

        {/* Navbar mock */}
        <div className="relative flex items-center justify-between px-8 py-4 border-b border-white/6">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black text-black"
              style={{ background: "linear-gradient(135deg,#E8E440,#B8B430)" }}
            >
              L
            </div>
            <span className="text-xs font-bold text-white/80">
              Lemon<span style={{ color: "#E8E440" }}>.</span>Developing
            </span>
          </div>
          <div className="flex gap-5">
            {["Services", "Portfolio", "Pakete"].map((l) => (
              <span key={l} className="text-white/40 text-xs">
                {l}
              </span>
            ))}
          </div>
          <div
            className="px-3 py-1 rounded-md text-[10px] font-bold text-black"
            style={{ background: "#E8E440" }}
          >
            Starten
          </div>
        </div>

        {/* Hero mock */}
        <div className="relative flex flex-col items-center justify-center py-10 px-8 text-center">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] mb-4 border"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderColor: "rgba(255,255,255,0.1)",
              color: "#8892A4",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#E8E440", boxShadow: "0 0 6px #E8E440" }}
            />
            Webdesign &amp; Development
          </div>
          <h1 className="text-2xl md:text-3xl font-black leading-tight mb-3">
            <span style={{ color: "#F0F0F8" }}>Wir bauen </span>
            <span
              style={{
                background: "linear-gradient(135deg,#E8E440,#B8B430)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              digitale
            </span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg,#9D5FF5,#7C3AED)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Erlebnisse.
            </span>
          </h1>
          <p className="text-white/40 text-xs mb-5 max-w-xs">
            Performante Websites · Beeindruckende UI/UX · Echte Ergebnisse
          </p>
          <div className="flex gap-3">
            <div
              className="px-4 py-2 rounded-lg text-xs font-bold text-black"
              style={{
                background: "linear-gradient(135deg,#E8E440,#B8B430)",
                boxShadow: "0 0 20px rgba(232,228,64,0.4)",
              }}
            >
              Jetzt starten
            </div>
            <div
              className="px-4 py-2 rounded-lg text-xs font-semibold border"
              style={{
                background: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.12)",
                color: "#F0F0F8",
              }}
            >
              Portfolio
            </div>
          </div>

          {/* Mock service cards */}
          <div className="mt-8 grid grid-cols-3 gap-3 w-full max-w-lg">
            {[
              { label: "Webdesign", icon: "□", color: "#E8E440" },
              { label: "Development", icon: "</>", color: "#9D5FF5" },
              { label: "SEO", icon: "↑", color: "#E8E440" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl p-3 text-center border"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                <div
                  className="text-lg font-bold mb-1"
                  style={{ color: s.color }}
                >
                  {s.icon}
                </div>
                <div className="text-white/60 text-[10px]">{s.label}</div>
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
          <div className="mb-6">
            <span className="font-mono text-lemon text-sm tracking-widest uppercase block mb-3">
              Was wir bauen
            </span>
            <h2 className="font-heading font-black text-4xl md:text-6xl text-text-primary leading-tight">
              Websites, die{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#E8E440,#9D5FF5)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                begeistern
              </span>
            </h2>
            <p className="text-text-muted mt-3 text-lg max-w-xl mx-auto">
              Modern, performant und auf den Punkt — so sehen unsere Projekte aus.
            </p>
          </div>
        }
      >
        <WebsitePreview />
      </ContainerScroll>
    </div>
  );
}
