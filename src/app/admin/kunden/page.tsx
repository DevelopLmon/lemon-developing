import { prisma } from "@/lib/prisma";
import CustomerActions from "@/components/admin/CustomerActions";

export default async function AdminKunden() {
  const customers = await prisma.user.findMany({
    where: { role: "CUSTOMER" },
    include: { projects: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading font-black text-3xl text-white">Kunden</h1>
          <p className="text-sm mt-1" style={{ color: "#8892A4" }}>{customers.length} Kund{customers.length !== 1 ? "en" : "e"} registriert</p>
        </div>
        <CustomerActions mode="create" />
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        {customers.length === 0 ? (
          <div className="p-12 text-center" style={{ color: "#8892A4" }}>Noch keine Kunden angelegt.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                {["Name", "E-Mail", "Projekte", "Registriert", ""].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-mono tracking-wider" style={{ color: "#8892A4" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                  className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                        style={{ background: "rgba(124,58,237,0.2)", color: "#9D5FF5" }}>
                        {(c.name ?? c.email)[0].toUpperCase()}
                      </div>
                      <span className="text-sm font-semibold text-white">{c.name ?? "—"}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm" style={{ color: "#8892A4" }}>{c.email}</td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-mono" style={{ color: c.projects.length > 0 ? "#3a96ed" : "#8892A4" }}>
                      {c.projects.length} Projekt{c.projects.length !== 1 ? "e" : ""}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs" style={{ color: "#8892A4" }}>
                    {new Date(c.createdAt).toLocaleDateString("de-DE")}
                  </td>
                  <td className="px-5 py-4">
                    <CustomerActions mode="manage" customerId={c.id} customerName={c.name ?? c.email} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
