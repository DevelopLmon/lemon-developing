"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props =
  | { mode: "create" }
  | { mode: "manage"; customerId: string; customerName: string };

export default function CustomerActions(props: Props) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const createCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/admin/kunden", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (!res.ok) {
      const d = await res.json();
      setError(d.error ?? "Fehler beim Erstellen.");
      return;
    }
    setShowModal(false);
    setForm({ name: "", email: "", password: "" });
    router.refresh();
  };

  const deleteCustomer = async () => {
    if (!confirm(`Kunden "${(props as { customerName: string }).customerName}" wirklich löschen?`)) return;
    setLoading(true);
    await fetch(`/api/admin/kunden/${(props as { customerId: string }).customerId}`, { method: "DELETE" });
    setLoading(false);
    router.refresh();
  };

  if (props.mode === "create") {
    return (
      <>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
          style={{ background: "linear-gradient(135deg, #E8E440, #B8B430)", color: "#0A0A12" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Kunde anlegen
        </button>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}>
            <div className="w-full max-w-sm rounded-2xl p-7"
              style={{ background: "#0f0f1a", border: "1px solid rgba(255,255,255,0.12)" }}>
              <h3 className="font-heading font-bold text-white text-lg mb-5">Neuen Kunden anlegen</h3>
              <form onSubmit={createCustomer} className="flex flex-col gap-4">
                {[
                  { name: "name", label: "Name", placeholder: "Max Mustermann", type: "text" },
                  { name: "email", label: "E-Mail", placeholder: "max@beispiel.de", type: "email" },
                  { name: "password", label: "Passwort", placeholder: "Sicheres Passwort", type: "password" },
                ].map((f) => (
                  <div key={f.name} className="flex flex-col gap-1.5">
                    <label className="text-xs" style={{ color: "#8892A4" }}>{f.label}</label>
                    <input type={f.type} required placeholder={f.placeholder}
                      value={form[f.name as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                      className="px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#F0F0F8" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(232,228,64,0.4)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")} />
                  </div>
                ))}
                {error && <p className="text-xs" style={{ color: "#f87171" }}>{error}</p>}
                <div className="flex gap-3 mt-1">
                  <button type="button" onClick={() => setShowModal(false)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                    style={{ background: "rgba(255,255,255,0.06)", color: "#8892A4", border: "1px solid rgba(255,255,255,0.1)" }}>
                    Abbrechen
                  </button>
                  <button type="submit" disabled={loading}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50"
                    style={{ background: "linear-gradient(135deg, #E8E440, #B8B430)", color: "#0A0A12" }}>
                    {loading ? "Wird erstellt..." : "Anlegen"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <button onClick={deleteCustomer} disabled={loading}
      className="p-1.5 rounded-lg transition-colors"
      style={{ color: "#8892A4" }}
      onMouseEnter={(e) => { e.currentTarget.style.color = "#f87171"; e.currentTarget.style.background = "rgba(239,68,68,0.1)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = "#8892A4"; e.currentTarget.style.background = "transparent"; }}
      title="Kunden löschen">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
      </svg>
    </button>
  );
}
