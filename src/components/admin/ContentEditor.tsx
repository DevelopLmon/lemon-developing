"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContentEditor({ id, label, value }: { id: string; label: string; value: string }) {
  const router = useRouter();
  const [val, setVal] = useState(value);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const save = async () => {
    setLoading(true);
    await fetch(`/api/admin/inhalt/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: val }),
    });
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    router.refresh();
  };

  const multiline = value.includes("\n") || value.length > 80;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold" style={{ color: "#8892A4" }}>{label}</label>
      <div className="flex flex-col sm:flex-row gap-2 sm:items-start">
        {multiline ? (
          <textarea
            value={val}
            onChange={(e) => setVal(e.target.value)}
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none transition-all"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#F0F0F8" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(232,228,64,0.4)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
          />
        ) : (
          <input
            type="text"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#F0F0F8" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(232,228,64,0.4)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
          />
        )}
        <button onClick={save} disabled={loading || val === value}
          className="w-full sm:w-auto sm:flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40"
          style={{
            background: saved ? "rgba(34,197,94,0.15)" : "rgba(232,228,64,0.15)",
            color: saved ? "#22c55e" : "#E8E440",
            border: `1px solid ${saved ? "rgba(34,197,94,0.3)" : "rgba(232,228,64,0.2)"}`,
          }}>
          {loading ? "..." : saved ? "✓ Gespeichert" : "Speichern"}
        </button>
      </div>
    </div>
  );
}
