import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import PortalSidebar from "@/components/portal/PortalSidebar";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/login?from=portal");

  return (
    <div className="min-h-screen flex" style={{ background: "#07070f" }}>
      <PortalSidebar user={session.user!} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
