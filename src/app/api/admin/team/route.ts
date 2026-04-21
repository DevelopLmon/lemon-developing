import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function requireAdmin() {
  const session = await auth();
  return session && (session.user as { role?: string }).role === "ADMIN" ? session : null;
}

export async function POST(req: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, username, email, password } = await req.json();
  if (!username || !password || !email) {
    return NextResponse.json({ error: "Benutzername, E-Mail und Passwort erforderlich." }, { status: 400 });
  }

  const existing = await prisma.user.findFirst({
    where: { OR: [{ username }, { email }] },
  });
  if (existing) return NextResponse.json({ error: "Benutzername oder E-Mail bereits vergeben." }, { status: 409 });

  const hashed = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { name, username, email, password: hashed, role: "ADMIN" },
  });

  return NextResponse.json({ id: user.id, username: user.username });
}
