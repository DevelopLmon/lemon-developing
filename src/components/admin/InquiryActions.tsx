"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUSES = [
  { value: "NEU", label: "Neu" },
  { value: "IN_BEARBEITUNG", label: "In Bearbeitung" },
  { value: "ABGESCHLOSSEN", label: "Abgeschlossen" },
];

export default function InquiryActions({ id, currentStatus }: { id: string; currentStatus: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const updateStatus = async (status: string) => {
    setLoading(true);
    await fetch(`/api/admin/anfragen/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setLoading(false);
    router.refresh();
  };

  const deleteInquiry = async () => {
    if (!confirm("Anfrage wirklich löschen?")) return;
    setLoading(true);
    await fetch(`/api/admin/anfragen/${id}`, { method: "DELETE" });
    setLoading(false);
    router.refresh();
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={currentStatus}
        disabled={loading}
        onChange={(e) => updateStatus(e.target.value)}
        className="text-xs px-2 py-1.5 rounded-lg outline-none cursor-pointer"
        style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#F0F0F8" }}
      >
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value} style={{ background: "#0A0A12" }}>{s.label}</option>
        ))}
      </select>
      <button onClick={deleteInquiry} disabled={loading}
        className="p-1.5 rounded-lg transition-colors"
        style={{ color: "#8892A4" }}
        onMouseEnter={(e) => { e.currentTarget.style.color = "#f87171"; e.currentTarget.style.background = "rgba(239,68,68,0.1)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "#8892A4"; e.currentTarget.style.background = "transparent"; }}
        title="Löschen">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
        </svg>
      </button>
    </div>
  );
}
