"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AddTeamMember() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error); return; }
    setOpen(false);
    setForm({ name: "", username: "", email: "", password: "" });
    router.refresh();
  };

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
        style={{ background: "linear-gradient(135deg, #3a96ed, #308fb8)", color: "#0A0A12" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
        Mitglied hinzufügen
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setOpen(false)}>
          <div className="w-full max-w-md rounded-2xl p-7" onClick={(e) => e.stopPropagation()}
            style={{ background: "#0d0d18", border: "1px solid rgba(255,255,255,0.1)" }}>
            <h2 className="font-heading font-bold text-xl text-white mb-5">Team-Mitglied hinzufügen</h2>
            <form onSubmit={submit} className="flex flex-col gap-4">
              {[
                { label: "Name", key: "name", placeholder: "Felix Mustermann", required: false },
                { label: "Benutzername", key: "username", placeholder: "felix", required: true },
                { label: "E-Mail", key: "email", placeholder: "felix@firma.de", required: true },
                { label: "Passwort", key: "password", placeholder: "Dein Passwort", required: true },
              ].map(({ label, key, placeholder, required }) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold tracking-widest" style={{ color: "#8892A4" }}>{label.toUpperCase()}</label>
                  <input
                    type={key === "password" ? "password" : "text"}
                    required={required}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#F0F0F8" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(16,157,230,0.4)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>
              ))}
              {error && <p className="text-sm px-3 py-2 rounded-xl" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>{error}</p>}
              <div className="flex gap-3 mt-1">
                <button type="button" onClick={() => setOpen(false)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ background: "rgba(255,255,255,0.06)", color: "#8892A4", border: "1px solid rgba(255,255,255,0.1)" }}>
                  Abbrechen
                </button>
                <button type="submit" disabled={loading}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50"
                  style={{ background: "linear-gradient(135deg, #3a96ed, #308fb8)", color: "#0A0A12" }}>
                  {loading ? "Wird erstellt..." : "Erstellen"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export function DeleteTeamMember({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const del = async () => {
    if (!confirm(`${name} wirklich entfernen?`)) return;
    setLoading(true);
    await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
    setLoading(false);
    router.refresh();
  };

  return (
    <button onClick={del} disabled={loading}
      className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-40"
      style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
      {loading ? "..." : "Entfernen"}
    </button>
  );
}
