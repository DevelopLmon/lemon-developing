import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  return session && (session.user as { role?: string }).role === "ADMIN" ? session : null;
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const { value } = await req.json();
  const content = await prisma.siteContent.update({ where: { id }, data: { value } });
  return NextResponse.json(content);
}
