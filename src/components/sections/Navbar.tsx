"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Ablauf", href: "#ablauf" },
  { label: "Pakete", href: "#pakete" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-white/10 shadow-glass"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <span className="font-heading font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent transition-colors">
            CoreSites<span className="text-white"> - </span>Studio
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-text-muted hover:text-blue-400 transition-colors text-sm font-medium relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-blue-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* CTA button — desktop */}
        <div className="hidden md:flex items-center">
          <a
            href="#kontakt"
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{
              background: "rgba(16,157,230,0.1)",
              border: "1px solid rgba(16,157,230,0.25)",
              color: "#3a96ed",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(16,157,230,0.18)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(16,157,230,0.1)"; }}
          >
            Jetzt anfragen
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass border-t border-white/10 px-6 py-4 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-text-muted hover:text-blue-400 transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-white/10">
            <a
              href="#kontakt"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold"
              style={{ background: "rgba(16,157,230,0.1)", border: "1px solid rgba(16,157,230,0.25)", color: "#3a96ed" }}
            >
              Jetzt anfragen
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
