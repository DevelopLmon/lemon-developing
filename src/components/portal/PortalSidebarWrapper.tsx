"use client";

import { useState, useEffect } from "react";
import PortalSidebar from "@/components/portal/PortalSidebar";

export default function PortalSidebarWrapper({ user }: { user: { name?: string | null; email?: string | null } }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Mobile top bar */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center gap-3 px-4 h-14"
        style={{ background: "#07070f", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <button
          onClick={() => setOpen(true)}
          className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-xl"
          style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
          aria-label="Menü öffnen"
        >
          <span className="block w-4 h-0.5 bg-white/80 rounded-full" />
          <span className="block w-3 h-0.5 bg-white/80 rounded-full" />
          <span className="block w-4 h-0.5 bg-white/80 rounded-full" />
        </button>
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center font-heading font-black text-sm"
            style={{ background: "linear-gradient(135deg, #3a96ed, #308fb8)", color: "#0A0A12" }}
          >
            L
          </div>
          <span className="font-heading font-bold text-sm text-white">Kundenportal</span>
        </div>
      </div>

      {/* Dark overlay */}
      <div
        className={`md:hidden fixed inset-0 z-50 bg-black/70 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar drawer */}
      <div
        className={`md:static fixed inset-y-0 left-0 z-[60] transition-transform duration-300 ease-in-out md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <PortalSidebar user={user} onNavigate={() => setOpen(false)} />
      </div>

      {/* Desktop: reserve sidebar width */}
      <div className="hidden md:block w-60 flex-shrink-0" />
    </>
  );
}
