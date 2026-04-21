import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebarWrapper from "@/components/admin/AdminSidebarWrapper";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    redirect("/login?from=admin");
  }

  return (
    <div className="min-h-screen flex" style={{ background: "#07070f" }}>
      <AdminSidebarWrapper user={session.user!} />
      <main className="flex-1 overflow-auto min-w-0 pt-[53px] md:pt-0">
        {children}
      </main>
    </div>
  );
}
