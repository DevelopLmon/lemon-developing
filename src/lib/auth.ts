import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { authConfig } from "@/lib/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        identifier: { label: "Benutzername / E-Mail", type: "text" },
        password: { label: "Passwort", type: "password" },
        loginType: { label: "Login-Typ", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) return null;

        const identifier = credentials.identifier as string;
        const loginType = credentials.loginType as string;

        let user;

        if (loginType === "admin") {
          user = await prisma.user.findFirst({
            where: { username: identifier, role: "ADMIN" },
          });
          if (!user) {
            user = await prisma.user.findFirst({
              where: { email: identifier, role: "ADMIN" },
            });
          }
        } else {
          user = await prisma.user.findUnique({
            where: { email: identifier },
          });
        }

        if (!user) return null;

        const valid = await bcrypt.compare(credentials.password as string, user.password);
        if (!valid) return null;

        return { id: user.id, email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
});
