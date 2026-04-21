import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const typeIcon: Record<string, string> = { VERTRAG: "📜", DESIGN: "🎨", DATEI: "📄" };

export default async function PortalDokumente() {
  const session = await auth();
  const userId = session!.user!.id as string;

  const projects = await prisma.project.findMany({
    where: { customerId: userId },
    include: { documents: { orderBy: { createdAt: "desc" } } },
  });

  const allDocs = projects.flatMap((p) =>
    p.documents.map((d) => ({ ...d, projectTitle: p.title }))
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-heading font-black text-3xl text-white">Dokumente</h1>
        <p className="text-sm mt-1" style={{ color: "#8892A4" }}>{allDocs.length} Dokument{allDocs.length !== 1 ? "e" : ""} gesamt</p>
      </div>

      {allDocs.length === 0 ? (
        <div className="rounded-2xl p-12 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-white font-semibold">Noch keine Dokumente vorhanden.</p>
          <p className="text-sm mt-2" style={{ color: "#8892A4" }}>Dokumente werden von deinem Betreuer hochgeladen.</p>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                {["Dokument", "Projekt", "Typ", "Datum", ""].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-mono tracking-wider" style={{ color: "#8892A4" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-white/[0.02] transition-colors"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{typeIcon[doc.type] ?? "📄"}</span>
                      <span className="text-sm font-semibold text-white">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm" style={{ color: "#8892A4" }}>{doc.projectTitle}</td>
                  <td className="px-5 py-4">
                    <span className="text-xs px-2.5 py-1 rounded-full font-mono"
                      style={{ background: "rgba(124,58,237,0.1)", color: "#9D5FF5", border: "1px solid rgba(124,58,237,0.2)" }}>
                      {doc.type}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs" style={{ color: "#8892A4" }}>
                    {new Date(doc.createdAt).toLocaleDateString("de-DE")}
                  </td>
                  <td className="px-5 py-4">
                    <a href={doc.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs transition-colors"
                      style={{ color: "#E8E440" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Herunterladen
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
