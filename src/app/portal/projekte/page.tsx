import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const statusSteps = ["BRIEFING", "DESIGN", "ENTWICKLUNG", "REVIEW", "LIVE"];
const statusLabel: Record<string, string> = {
  BRIEFING: "Briefing", DESIGN: "Design", ENTWICKLUNG: "Entwicklung", REVIEW: "Review", LIVE: "Live 🎉",
};
const statusColor: Record<string, string> = {
  BRIEFING: "#8892A4", DESIGN: "#7C3AED", ENTWICKLUNG: "#3a96ed", REVIEW: "#E8A030", LIVE: "#22c55e",
};

export default async function PortalProjekte() {
  const session = await auth();
  const userId = session!.user!.id as string;

  const projects = await prisma.project.findMany({
    where: { customerId: userId },
    include: { documents: true, invoices: true },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-heading font-black text-3xl text-white">Meine Projekte</h1>
        <p className="text-sm mt-1" style={{ color: "#8892A4" }}>{projects.length} Projekt{projects.length !== 1 ? "e" : ""}</p>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-2xl p-12 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-white font-semibold">Noch keine Projekte vorhanden.</p>
          <p className="text-sm mt-2" style={{ color: "#8892A4" }}>Dein Betreuer legt dein erstes Projekt für dich an.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {projects.map((project) => {
            const stepIdx = statusSteps.indexOf(project.status);
            return (
              <div key={project.id} className="rounded-2xl p-6"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="font-heading font-bold text-xl text-white">{project.title}</h2>
                    {project.description && <p className="text-sm mt-1.5" style={{ color: "#8892A4" }}>{project.description}</p>}
                    <p className="text-xs mt-2 font-mono" style={{ color: "#8892A4" }}>
                      Erstellt am {new Date(project.createdAt).toLocaleDateString("de-DE")} · Zuletzt aktualisiert {new Date(project.updatedAt).toLocaleDateString("de-DE")}
                    </p>
                  </div>
                  <span className="text-xs px-3 py-1.5 rounded-full font-mono font-bold flex-shrink-0"
                    style={{ background: `${statusColor[project.status]}18`, color: statusColor[project.status], border: `1px solid ${statusColor[project.status]}30` }}>
                    {statusLabel[project.status]}
                  </span>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-5 gap-2">
                  {statusSteps.map((step, i) => (
                    <div key={step} className="flex flex-col gap-2">
                      <div className="h-1.5 rounded-full"
                        style={{ background: i <= stepIdx ? statusColor[project.status] : "rgba(255,255,255,0.08)" }} />
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            background: i < stepIdx ? statusColor[project.status] : i === stepIdx ? `${statusColor[project.status]}25` : "rgba(255,255,255,0.05)",
                            border: `1px solid ${i <= stepIdx ? statusColor[project.status] : "rgba(255,255,255,0.1)"}`,
                          }}>
                          {i < stepIdx && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><path d="M20 6 9 17l-5-5" /></svg>}
                          {i === stepIdx && <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: statusColor[project.status] }} />}
                        </div>
                        <span className="text-[10px] font-mono" style={{ color: i <= stepIdx ? statusColor[project.status] : "#8892A4" }}>
                          {statusLabel[step].replace(" 🎉", "")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
