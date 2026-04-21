import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const statusSteps = ["BRIEFING", "DESIGN", "ENTWICKLUNG", "REVIEW", "LIVE"];
const statusLabel: Record<string, string> = {
  BRIEFING: "Briefing", DESIGN: "Design", ENTWICKLUNG: "Entwicklung", REVIEW: "Review", LIVE: "Live 🎉",
};
const statusColor: Record<string, string> = {
  BRIEFING: "#8892A4", DESIGN: "#7C3AED", ENTWICKLUNG: "#E8E440", REVIEW: "#E8A030", LIVE: "#22c55e",
};

export default async function PortalDashboard() {
  const session = await auth();
  const userId = session!.user!.id as string;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      projects: {
        include: { documents: true, invoices: true },
        orderBy: { updatedAt: "desc" },
      },
    },
  });

  const projects = user?.projects ?? [];
  const openInvoices = projects.flatMap((p) => p.invoices).filter((i) => i.status === "OFFEN");

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-heading font-black text-3xl text-white">
          Hallo, {user?.name ?? "Kunde"} 👋
        </h1>
        <p className="text-sm mt-1" style={{ color: "#8892A4" }}>Hier siehst du den aktuellen Stand deiner Projekte.</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Projekte", value: projects.length, color: "#E8E440" },
          { label: "Dokumente", value: projects.flatMap((p) => p.documents).length, color: "#7C3AED" },
          { label: "Offene Rechnungen", value: openInvoices.length, color: openInvoices.length > 0 ? "#E8A030" : "#22c55e" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="font-heading font-black text-3xl" style={{ color: s.color }}>{s.value}</div>
            <div className="text-sm mt-1" style={{ color: "#8892A4" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Projects */}
      {projects.length === 0 ? (
        <div className="rounded-2xl p-12 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-white font-semibold mb-2">Noch kein Projekt vorhanden</p>
          <p className="text-sm" style={{ color: "#8892A4" }}>Dein Projektbetreuer legt dein erstes Projekt für dich an.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {projects.map((project) => {
            const stepIdx = statusSteps.indexOf(project.status);
            return (
              <div key={project.id} className="rounded-2xl p-6"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h3 className="font-heading font-bold text-white text-lg">{project.title}</h3>
                    {project.description && <p className="text-sm mt-1" style={{ color: "#8892A4" }}>{project.description}</p>}
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full font-mono font-bold"
                    style={{ background: `${statusColor[project.status]}18`, color: statusColor[project.status], border: `1px solid ${statusColor[project.status]}30` }}>
                    {statusLabel[project.status]}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="flex items-center gap-0 mb-2">
                  {statusSteps.map((step, i) => (
                    <div key={step} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <div className="w-full h-1.5 rounded-full"
                          style={{ background: i <= stepIdx ? statusColor[project.status] : "rgba(255,255,255,0.1)" }} />
                        <span className="text-[9px] mt-1.5 font-mono" style={{ color: i <= stepIdx ? statusColor[project.status] : "#8892A4" }}>
                          {statusLabel[step].replace(" 🎉", "")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 mt-4 text-xs" style={{ color: "#8892A4" }}>
                  <Link href="/portal/dokumente" className="hover:text-white transition-colors">
                    📄 {project.documents.length} Dokument{project.documents.length !== 1 ? "e" : ""}
                  </Link>
                  <Link href="/portal/rechnungen" className="hover:text-white transition-colors">
                    💳 {project.invoices.length} Rechnung{project.invoices.length !== 1 ? "en" : ""}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
