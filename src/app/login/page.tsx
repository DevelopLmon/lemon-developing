"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const type = params.get("type") === "portal" ? "portal" : "admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);

    if (res?.error) {
      setError("E-Mail oder Passwort falsch.");
      return;
    }

    const sessionRes = await fetch("/api/auth/session");
    const session = await sessionRes.json();
    const role = session?.user?.role;

    router.push(role === "ADMIN" ? "/admin" : "/portal");
  };

  const isAdmin = type === "admin";

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ background: "#0A0A12" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: isAdmin
          ? "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(232,228,64,0.07) 0%, transparent 70%)"
          : "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(124,58,237,0.08) 0%, transparent 70%)" }} />

      <div className="relative w-full max-w-sm flex flex-col items-center gap-6">

        {/* Back to Startseite */}
        <a href="/"
          className="self-start flex items-center gap-1.5 text-xs transition-colors"
          style={{ color: "#8892A4" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#E8E440")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#8892A4")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M19 12H5M5 12l7 7M5 12l7-7" />
          </svg>
          Startseite
        </a>

        {/* Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold"
          style={{
            background: isAdmin ? "rgba(232,228,64,0.1)" : "rgba(255,255,255,0.07)",
            border: isAdmin ? "1px solid rgba(232,228,64,0.25)" : "1px solid rgba(255,255,255,0.12)",
            color: isAdmin ? "#E8E440" : "#F0F0F8",
          }}>
          {isAdmin ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Team-Bereich
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              Kundenportal
            </>
          )}
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1 className="font-heading font-black text-4xl leading-tight"
            style={{ color: isAdmin ? "#E8E440" : "#F0F0F8" }}>
            {isAdmin ? "CoreSites Studio" : "Mein Portal"}
          </h1>
          <p className="text-sm mt-2" style={{ color: "#8892A4" }}>
            {isAdmin ? "Sales Operating System" : "Melde dich an, um dein Projekt einzusehen"}
          </p>
        </div>

        {/* Card */}
        <div className="w-full rounded-2xl p-7"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="mb-5">
            <h2 className="font-heading font-bold text-lg text-white">
              {isAdmin ? "Willkommen zurück" : "Kunden-Login"}
            </h2>
            <p className="text-xs mt-1" style={{ color: "#8892A4" }}>
              {isAdmin
                ? "Melde dich an, um fortzufahren"
                : "Verwende die Zugangsdaten aus deiner Einladungs-E-Mail"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold tracking-widest" style={{ color: "#8892A4" }}>
                E-MAIL
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isAdmin ? "name@unternehmen.de" : "ihre@email.de"}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#F0F0F8",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = isAdmin ? "rgba(232,228,64,0.4)" : "rgba(124,58,237,0.4)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold tracking-widest" style={{ color: "#8892A4" }}>
                PASSWORT
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#F0F0F8",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = isAdmin ? "rgba(232,228,64,0.4)" : "rgba(124,58,237,0.4)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "#8892A4" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#F0F0F8")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#8892A4")}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="px-4 py-2.5 rounded-xl text-sm"
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171" }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-heading font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 mt-1 disabled:opacity-50"
              style={isAdmin
                ? { background: "linear-gradient(135deg, #E8E440, #B8B430)", color: "#0A0A12", boxShadow: "0 0 20px rgba(232,228,64,0.2)" }
                : { background: "#F0F0F8", color: "#0A0A12" }
              }
            >
              {loading ? "Wird geprüft..." : "Anmelden"}
              {!loading && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </form>
        </div>

        {/* Switch link */}
        <p className="text-xs" style={{ color: "#8892A4" }}>
          {isAdmin ? (
            <>
              Du bist Kunde?{" "}
              <a href="/login?type=portal" style={{ color: "#E8E440" }}
                className="font-semibold hover:underline">
                Kundenportal-Login →
              </a>
            </>
          ) : (
            <>
              Du bist Teammitglied?{" "}
              <a href="/login?type=admin" style={{ color: "#E8E440" }}
                className="font-semibold hover:underline">
                Team-Login →
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
