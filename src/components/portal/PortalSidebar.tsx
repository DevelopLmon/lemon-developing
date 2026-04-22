"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  {
    href: "/portal",
    label: "Übersicht",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    href: "/portal/projekte",
    label: "Meine Projekte",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    href: "/portal/dokumente",
    label: "Dokumente",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  {
    href: "/portal/rechnungen",
    label: "Rechnungen",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
];

export default function PortalSidebar({ user, onNavigate }: { user: { name?: string | null; email?: string | null }; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="w-60 flex-shrink-0 flex flex-col min-h-full sticky top-0"
      style={{ background: "#0d0d18", borderRight: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="px-5 py-5 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center font-heading font-black text-lg flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #3a96ed, #308fb8)", color: "#0A0A12" }}>
          L
        </div>
        <div>
          <p className="font-heading font-bold text-sm text-white leading-none">Kundenportal</p>
          <p className="text-[10px] mt-0.5" style={{ color: "#8892A4" }}>CoreSites-Studio</p>
        </div>
      </div>

      {/* Back to Startseite */}
      <div className="px-3 pt-3">
        <Link href="/" onClick={onNavigate}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all duration-200 w-full"
          style={{ color: "#8892A4", border: "1px solid rgba(255,255,255,0.06)" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#3a96ed"; e.currentTarget.style.borderColor = "rgba(16,157,230,0.2)"; e.currentTarget.style.background = "rgba(16,157,230,0.05)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#8892A4"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "transparent"; }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M19 12H5M5 12l7 7M5 12l7-7" />
          </svg>
          Startseite
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const active = item.href === "/portal" ? pathname === "/portal" : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} onClick={onNavigate}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                background: active ? "rgba(16,157,230,0.1)" : "transparent",
                color: active ? "#3a96ed" : "#8892A4",
                border: active ? "1px solid rgba(16,157,230,0.2)" : "1px solid transparent",
              }}>
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="px-3 py-2 mb-2">
          <p className="text-xs font-semibold text-white truncate">{user.name ?? "Kunde"}</p>
          <p className="text-[10px] truncate" style={{ color: "#8892A4" }}>{user.email}</p>
        </div>
        <button onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors duration-200"
          style={{ color: "#8892A4" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#f87171"; e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#8892A4"; e.currentTarget.style.background = "transparent"; }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Ausloggen
        </button>
      </div>
    </aside>
  );
}
