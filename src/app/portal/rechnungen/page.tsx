import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const statusStyle: Record<string, { bg: string; color: string; border: string; label: string }> = {
  OFFEN: { bg: "rgba(232,160,48,0.1)", color: "#E8A030", border: "rgba(232,160,48,0.2)", label: "Offen" },
  BEZAHLT: { bg: "rgba(34,197,94,0.1)", color: "#22c55e", border: "rgba(34,197,94,0.2)", label: "Bezahlt" },
  UEBERFAELLIG: { bg: "rgba(239,68,68,0.1)", color: "#f87171", border: "rgba(239,68,68,0.2)", label: "Überfällig" },
};

export default async function PortalRechnungen() {
  const session = await auth();
  const userId = session!.user!.id as string;

  const projects = await prisma.project.findMany({
    where: { customerId: userId },
    include: { invoices: { orderBy: { createdAt: "desc" } } },
  });

  const allInvoices = projects.flatMap((p) =>
    p.invoices.map((i) => ({ ...i, projectTitle: p.title }))
  );

  const totalOpen = allInvoices.filter((i) => i.status === "OFFEN").reduce((s, i) => s + i.amount, 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-heading font-black text-3xl text-white">Rechnungen</h1>
        <p className="text-sm mt-1" style={{ color: "#8892A4" }}>{allInvoices.length} Rechnung{allInvoices.length !== 1 ? "en" : ""} gesamt</p>
      </div>

      {totalOpen > 0 && (
        <div className="rounded-2xl p-5 mb-6 flex items-center justify-between"
          style={{ background: "rgba(232,160,48,0.08)", border: "1px solid rgba(232,160,48,0.2)" }}>
          <div>
            <p className="text-sm font-semibold" style={{ color: "#E8A030" }}>Offener Betrag</p>
            <p className="text-xs mt-0.5" style={{ color: "#8892A4" }}>Bitte begleiche offene Rechnungen</p>
          </div>
          <span className="font-heading font-black text-2xl" style={{ color: "#E8A030" }}>
            {totalOpen.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}
          </span>
        </div>
      )}

      {allInvoices.length === 0 ? (
        <div className="rounded-2xl p-12 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-white font-semibold">Noch keine Rechnungen vorhanden.</p>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                {["Rechnungsnr.", "Projekt", "Betrag", "Fällig am", "Status"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-mono tracking-wider" style={{ color: "#8892A4" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allInvoices.map((inv) => {
                const s = statusStyle[inv.status] ?? statusStyle.OFFEN;
                return (
                  <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <td className="px-5 py-4 text-sm font-mono font-semibold text-white">{inv.number}</td>
                    <td className="px-5 py-4 text-sm" style={{ color: "#8892A4" }}>{inv.projectTitle}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-white">
                      {inv.amount.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}
                    </td>
                    <td className="px-5 py-4 text-xs" style={{ color: "#8892A4" }}>
                      {new Date(inv.dueDate).toLocaleDateString("de-DE")}
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs px-2.5 py-1 rounded-full font-mono"
                        style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
                        {s.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
