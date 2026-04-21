import Link from "next/link";

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
              CoreSites
            </span>
            <span className="font-heading font-light text-text-muted text-base leading-none">
              - Studio
            </span>
          </a>

          {/* Copyright */}
          <p className="text-text-muted text-sm text-center">
            © {year} CoreSites-Studio. Alle Rechte vorbehalten.
          </p>

          {/* Legal links */}
          <div className="flex items-center gap-6">
            <Link
              href="/impressum"
              className="text-text-muted text-sm hover:text-lemon transition-colors"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="text-text-muted text-sm hover:text-lemon transition-colors"
            >
              Datenschutz
            </Link>
          </div>
        </div>

        {/* Address line */}
        <p className="text-center text-white/20 text-xs">
          CoreSites-Studio · support@coresites-studio.de
        </p>
      </div>
    </footer>
  );
}
