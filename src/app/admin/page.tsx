import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const [inquiryCount, customerCount, newInquiries] = await Promise.all([
    prisma.inquiry.count(),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.inquiry.count({ where: { status: "NEU" } }),
  ]);

  const recentInquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const stats = [
    { label: "Neue Anfragen", value: newInquiries, color: "#E8E440", icon: "💬" },
    { label: "Kunden gesamt", value: customerCount, color: "#7C3AED", icon: "👤" },
    { label: "Anfragen gesamt", value: inquiryCount, color: "#22c55e", icon: "📋" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-heading font-black text-3xl text-white">Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: "#8892A4" }}>Übersicht über alle Aktivitäten</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="font-heading font-black text-3xl text-white">{stat.value}</div>
            <div className="text-sm mt-1" style={{ color: "#8892A4" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent inquiries */}
      <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading font-bold text-white">Neueste Anfragen</h2>
          <Link href="/admin/anfragen" className="text-sm transition-colors" style={{ color: "#E8E440" }}>
            Alle anzeigen →
          </Link>
        </div>

        {recentInquiries.length === 0 ? (
          <p className="text-sm" style={{ color: "#8892A4" }}>Noch keine Anfragen vorhanden.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {recentInquiries.map((inq) => (
              <div key={inq.id} className="flex items-center justify-between py-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div>
                  <p className="text-sm font-semibold text-white">{inq.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#8892A4" }}>{inq.email} {inq.company ? `· ${inq.company}` : ""}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs px-2.5 py-1 rounded-full font-mono"
                    style={{
                      background: inq.status === "NEU" ? "rgba(232,228,64,0.1)" : inq.status === "IN_BEARBEITUNG" ? "rgba(124,58,237,0.1)" : "rgba(34,197,94,0.1)",
                      color: inq.status === "NEU" ? "#E8E440" : inq.status === "IN_BEARBEITUNG" ? "#9D5FF5" : "#22c55e",
                      border: `1px solid ${inq.status === "NEU" ? "rgba(232,228,64,0.2)" : inq.status === "IN_BEARBEITUNG" ? "rgba(124,58,237,0.2)" : "rgba(34,197,94,0.2)"}`,
                    }}>
                    {inq.status === "NEU" ? "Neu" : inq.status === "IN_BEARBEITUNG" ? "In Bearbeitung" : "Abgeschlossen"}
                  </span>
                  <span className="text-xs" style={{ color: "#8892A4" }}>
                    {new Date(inq.createdAt).toLocaleDateString("de-DE")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
