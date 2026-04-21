import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  if (pathname.startsWith("/admin")) {
    if (!session) return NextResponse.redirect(new URL("/login?type=admin", req.url));
    if ((session.user as { role?: string }).role !== "ADMIN") {
      return NextResponse.redirect(new URL("/portal", req.url));
    }
  }

  if (pathname.startsWith("/portal")) {
    if (!session) return NextResponse.redirect(new URL("/login?type=portal", req.url));
  }

  if (pathname === "/login" && session) {
    const role = (session.user as { role?: string }).role;
    const type = req.nextUrl.searchParams.get("type");
    if (type === "portal" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/portal", req.url));
    }
    if (!type || type === "admin") {
      return NextResponse.redirect(new URL(role === "ADMIN" ? "/admin" : "/portal", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/portal/:path*", "/login"],
};
