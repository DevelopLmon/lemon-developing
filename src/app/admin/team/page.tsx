import { prisma } from "@/lib/prisma";
import { AddTeamMember, DeleteTeamMember } from "@/components/admin/TeamActions";

export default async function AdminTeam() {
  const members = await prisma.user.findMany({
    where: { role: "ADMIN" },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading font-black text-3xl text-white">Team</h1>
          <p className="text-sm mt-1" style={{ color: "#8892A4" }}>{members.length} Mitglied{members.length !== 1 ? "er" : ""}</p>
        </div>
        <AddTeamMember />
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        {members.length === 0 ? (
          <div className="p-12 text-center" style={{ color: "#8892A4" }}>Keine Team-Mitglieder vorhanden.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                {["Name", "Benutzername", "E-Mail", "Erstellt", ""].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-mono tracking-wider" style={{ color: "#8892A4" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                  className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                        style={{ background: "rgba(232,228,64,0.15)", color: "#E8E440" }}>
                        {(m.name ?? m.username ?? m.email)[0].toUpperCase()}
                      </div>
                      <span className="text-sm font-semibold text-white">{m.name ?? "—"}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-mono text-sm px-2.5 py-1 rounded-lg"
                      style={{ background: "rgba(232,228,64,0.08)", color: "#E8E440", border: "1px solid rgba(232,228,64,0.15)" }}>
                      @{m.username ?? "—"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm" style={{ color: "#8892A4" }}>{m.email}</td>
                  <td className="px-5 py-4 text-xs" style={{ color: "#8892A4" }}>
                    {new Date(m.createdAt).toLocaleDateString("de-DE")}
                  </td>
                  <td className="px-5 py-4">
                    <DeleteTeamMember id={m.id} name={m.name ?? m.username ?? m.email} />
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
