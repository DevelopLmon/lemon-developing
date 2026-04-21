import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import PortalSidebarWrapper from "@/components/portal/PortalSidebarWrapper";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/login?from=portal");

  return (
    <div className="min-h-screen flex" style={{ background: "#07070f" }}>
      <PortalSidebarWrapper user={session.user!} />
      <main className="flex-1 overflow-auto min-w-0 pt-14 md:pt-0">
        {children}
      </main>
    </div>
  );
}
