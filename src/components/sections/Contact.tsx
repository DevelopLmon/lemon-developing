"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const contactMethods = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.19h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: "+49 176 84066170",
    sub: "Mo bis So, 9 bis 22 Uhr",
    color: "#E8E440",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
    label: "WhatsApp",
    sub: "Sofortige Antwort",
    color: "#22c55e",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="2,4 12,13 22,4" />
      </svg>
    ),
    label: "support@coresites-studio.de",
    sub: "Antwort innerhalb von 24 Stunden",
    color: "#7C3AED",
  },
];

const nextSteps = [
  "Wir melden uns schnellstmöglich bei dir",
  "Kurzes Briefing über deine Wünsche & Anforderungen",
  "Du erhältst ein passgenaues Angebot",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "", message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/kontakt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    setSent(true);
  };

  return (
    <section id="kontakt" className="py-28 px-6 relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(232,228,64,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm text-text-muted mb-6"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#E8E440">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Kostenlos &amp; unverbindlich
          </span>
          <h2 className="font-heading font-black text-4xl md:text-6xl text-text-primary leading-tight">
            Bereit für deine neue
            <br />
            <span className="text-gradient-lemon">Website?</span>
          </h2>
          <p className="text-text-muted mt-4 text-lg max-w-xl mx-auto">
            Kontaktiere uns einfach per Nachricht oder ruf uns direkt an. Wir melden uns garantiert bei dir.
          </p>
        </motion.div>

        {/* Grid: form + sidebar */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-7"
          >
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-8 gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(232,228,64,0.15)", border: "1px solid rgba(232,228,64,0.3)" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8E440" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-xl text-text-primary">Nachricht gesendet!</h3>
                <p className="text-text-muted text-sm">Wir melden uns innerhalb von 24 Stunden bei dir.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-text-muted">
                      Name <span className="text-lemon">*</span>
                    </label>
                    <input
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Felix Mustermann"
                      className="w-full px-4 py-2.5 rounded-xl text-sm text-text-primary placeholder:text-white/25 outline-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(232,228,64,0.4)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                  {/* E-Mail */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-text-muted">
                      E-Mail <span className="text-lemon">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="felix@beispiel.de"
                      className="w-full px-4 py-2.5 rounded-xl text-sm text-text-primary placeholder:text-white/25 outline-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(232,228,64,0.4)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                  {/* Telefon */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-text-muted">Telefon</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+49 ..."
                      className="w-full px-4 py-2.5 rounded-xl text-sm text-text-primary placeholder:text-white/25 outline-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(232,228,64,0.4)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                  {/* Unternehmen */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-text-muted">Unternehmen</label>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Dein Unternehmen"
                      className="w-full px-4 py-2.5 rounded-xl text-sm text-text-primary placeholder:text-white/25 outline-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(232,228,64,0.4)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                </div>

                {/* Nachricht */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-text-muted">Nachricht</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Erzähl uns kurz, was du benötigst..."
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-text-primary placeholder:text-white/25 outline-none resize-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(232,228,64,0.4)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-heading font-bold text-sm text-bg-base transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(135deg, #E8E440, #B8B430)",
                    boxShadow: "0 0 30px rgba(232,228,64,0.35)",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Kostenlos &amp; direkt anfragen
                </button>
                <p className="text-center text-text-muted text-xs">
                  Wir antworten garantiert innerhalb von 24 Stunden. 
                </p>
              </form>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-4"
          >
            {/* Direct contact */}
            <div className="glass rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="font-heading font-bold text-text-primary">
                Oder schnell kontaktieren
              </h3>
              {contactMethods.map((m) => (
                <div key={m.label} className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${m.color}18`,
                      border: `1px solid ${m.color}30`,
                      color: m.color,
                    }}
                  >
                    {m.icon}
                  </div>
                  <div>
                    <p className="text-text-primary text-sm font-semibold">{m.label}</p>
                    <p className="text-text-muted text-xs mt-0.5">{m.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Next steps */}
            <div className="glass rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="font-heading font-bold text-text-primary">
                Was passiert danach?
              </h3>
              <div className="flex flex-col gap-3">
                {nextSteps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-bg-base flex-shrink-0 mt-0.5"
                      style={{
                        background: "linear-gradient(135deg, #E8E440, #B8B430)",
                        boxShadow: "0 0 10px rgba(232,228,64,0.3)",
                      }}
                    >
                      {i + 1}
                    </div>
                    <p className="text-text-muted text-sm leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
