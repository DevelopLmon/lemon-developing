"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t px-6 py-6"
      style={{ borderColor: "rgba(255,255,255,0.08)", background: "#0A0A12" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        {/* Main row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-1.5">
            <span className="font-heading font-black text-lemon text-lg leading-none">
              Lemon
            </span>
            <span className="font-heading font-light text-text-muted text-base leading-none">
              Developing
            </span>
          </a>

          {/* Copyright */}
          <p className="text-text-muted text-sm text-center">
            © {year} Lemon-Developing. Alle Rechte vorbehalten.
          </p>

          {/* Legal links */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-text-muted text-sm hover:text-lemon transition-colors"
            >
              Impressum
            </a>
            <a
              href="#"
              className="text-text-muted text-sm hover:text-lemon transition-colors"
            >
              Datenschutz
            </a>
          </div>
        </div>

        {/* Address line */}
        <p className="text-center text-white/20 text-xs">
          Lemon-Developing · hello@lemon-developing.de
        </p>
      </div>
    </footer>
  );
}
