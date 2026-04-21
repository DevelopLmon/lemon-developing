"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminSidebarWrapper({ user }: { user: { name?: string | null; email?: string | null } }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar with hamburger */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center gap-3 px-4 py-3"
        style={{ background: "#07070f", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <button
          onClick={() => setOpen(true)}
          className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg transition-colors"
          style={{ background: "rgba(255,255,255,0.06)" }}
          aria-label="Menü öffnen"
        >
          <span className="block w-4 h-0.5 bg-white/70 rounded-full" />
          <span className="block w-4 h-0.5 bg-white/70 rounded-full" />
          <span className="block w-4 h-0.5 bg-white/70 rounded-full" />
        </button>
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center font-heading font-black text-sm"
            style={{ background: "linear-gradient(135deg, #E8E440, #B8B430)", color: "#0A0A12" }}
          >
            L
          </div>
          <span className="font-heading font-bold text-sm text-white">Admin</span>
        </div>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar — always visible on desktop, slide-in on mobile */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-50 transition-transform duration-300 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminSidebar user={user} onNavigate={() => setOpen(false)} />
      </div>

      {/* Spacer so content doesn't hide behind mobile top bar */}
      <div className="md:hidden w-0 flex-shrink-0" style={{ height: "53px" }} />
    </>
  );
}
