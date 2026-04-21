import { prisma } from "@/lib/prisma";
import type { Inquiry } from "@prisma/client";
import InquiryActions from "@/components/admin/InquiryActions";

export default async function AdminAnfragen() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  const statusColor = (s: string) => {
    if (s === "NEU") return { bg: "rgba(232,228,64,0.1)", color: "#E8E440", border: "rgba(232,228,64,0.2)", label: "Neu" };
    if (s === "IN_BEARBEITUNG") return { bg: "rgba(124,58,237,0.1)", color: "#9D5FF5", border: "rgba(124,58,237,0.2)", label: "In Bearbeitung" };
    return { bg: "rgba(34,197,94,0.1)", color: "#22c55e", border: "rgba(34,197,94,0.2)", label: "Abgeschlossen" };
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-heading font-black text-3xl text-white">Anfragen</h1>
        <p className="text-sm mt-1" style={{ color: "#8892A4" }}>{inquiries.length} Anfrage{inquiries.length !== 1 ? "n" : ""} insgesamt</p>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        {inquiries.length === 0 ? (
          <div className="p-12 text-center" style={{ color: "#8892A4" }}>Noch keine Anfragen vorhanden.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                {["Name", "E-Mail", "Unternehmen", "Nachricht", "Status", "Datum", ""].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-mono tracking-wider" style={{ color: "#8892A4" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq: Inquiry) => {
                const s = statusColor(inq.status);
                return (
                  <tr key={inq.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                    className="transition-colors hover:bg-white/[0.02]">
                    <td className="px-5 py-4 text-sm font-semibold text-white">{inq.name}</td>
                    <td className="px-5 py-4 text-sm" style={{ color: "#8892A4" }}>{inq.email}</td>
                    <td className="px-5 py-4 text-sm" style={{ color: "#8892A4" }}>{inq.company ?? "—"}</td>
                    <td className="px-5 py-4 text-sm max-w-[200px]" style={{ color: "#8892A4" }}>
                      <span className="truncate block">{inq.message ?? "—"}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs px-2.5 py-1 rounded-full font-mono"
                        style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
                        {s.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs" style={{ color: "#8892A4" }}>
                      {new Date(inq.createdAt).toLocaleDateString("de-DE")}
                    </td>
                    <td className="px-5 py-4">
                      <InquiryActions id={inq.id} currentStatus={inq.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
