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
          <a href="#" className="flex items-center gap-2.5 group">
          <span className="font-heading font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent transition-colors">
            CoreSites<span className="text-white"> - </span>Studio
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
              className="text-text-muted text-sm hover:text-blue-400 transition-colors"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="text-text-muted text-sm hover:text-blue-400 transition-colors"
            >
              Datenschutz
            </Link>
          </div>
        </div>

        {/* Address line */}
        <p className="text-center text-white/20 text-xs">
          CoreSites-Studio · info@coresites-studio.de
        </p>
      </div>
    </footer>
  );
}
