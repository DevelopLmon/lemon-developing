"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    href: "/admin/anfragen",
    label: "Anfragen",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    href: "/admin/kunden",
    label: "Kunden",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    href: "/admin/inhalt",
    label: "Inhalte",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    href: "/admin/team",
    label: "Team",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function AdminSidebar({ user, onNavigate }: { user: { name?: string | null; email?: string | null }; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="w-60 flex-shrink-0 flex flex-col h-screen sticky top-0 overflow-y-auto"
      style={{ background: "#0d0d18", borderRight: "1px solid rgba(255,255,255,0.07)" }}>
      {/* Logo */}
      <div className="px-5 py-5 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center font-heading font-black text-lg flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #109de6, #308fb8)", color: "#0A0A12" }}>
          L
        </div>
        <div>
          <p className="font-heading font-bold text-sm text-white leading-none">Admin</p>
          <p className="text-[10px] mt-0.5" style={{ color: "#8892A4" }}>CoreSites-Studio</p>
        </div>
      </div>

      {/* Nav */}
      {/* Back to Startseite */}
      <div className="px-3 pt-3">
        <Link href="/" onClick={onNavigate}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all duration-200 w-full"
          style={{ color: "#8892A4", border: "1px solid rgba(255,255,255,0.06)" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "##3a96ed"; e.currentTarget.style.borderColor = "rgba(16,157,230,0.2)"; e.currentTarget.style.background = "rgba(16,157,230,0.05)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#8892A4"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "transparent"; }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M19 12H5M5 12l7 7M5 12l7-7" />
          </svg>
          Startseite
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
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

      {/* User + logout */}
      <div className="px-3 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="px-3 py-2 mb-2">
          <p className="text-xs font-semibold text-white truncate">{user.name ?? "Admin"}</p>
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
